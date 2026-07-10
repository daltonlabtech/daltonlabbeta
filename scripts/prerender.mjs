#!/usr/bin/env node
/**
 * Snapshot headless: serve dist/ localmente, visita cada rota com Chromium,
 * espera window.__PRERENDER_READY__ e grava dist/<rota>/index.html.
 *
 * Prontidão (determinística, route-specific): como o servidor serve o fallback
 * SPA (a home renderizada) para rotas ainda não gravadas, o `__PRERENDER_READY__`
 * sozinho não basta — ele fica `true` também antes de o React Router trocar de
 * rota, e um snapshot cedo fotografaria a home (que passa no htmlHasContent).
 * Por isso esperamos o canonical do <Seo> no DOM bater com SITE_URL+route (prova
 * que ESTA rota renderizou) E o flag de pronto (dados resolvidos). Se não bater
 * no tempo, a rota é FALHA e o build falha — nunca grava casco/home errada.
 *
 * Detalhes de integração (por que não é só "abrir a página"):
 *  - Idioma: força pt-BR setando localStorage['i18nextLng']='pt' antes do app
 *    bootar (primeiro na ordem de detecção do i18n); sem isso o headless cai
 *    em inglês (navigator.language do Chromium).
 *  - CORS: o browser busca o Sanity a partir de http://localhost, origem que
 *    não está na allowlist de CORS do projeto. Interceptamos as chamadas ao
 *    Sanity e injetamos `access-control-allow-origin`, mantendo o prerender
 *    self-contained (sem depender de config manual no dashboard do Sanity).
 */
import { chromium } from '@playwright/test'
import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { getPrerenderRoutes, fetchArticleSlugs } from './generate-sitemap.mjs'
import { createApp } from '../server.mjs'
import { SITE_URL } from '../shared/site.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
const PORT = 4173

/**
 * Marcadores de página que não terminou de carregar dados, lidos da tradução
 * pt (fonte única) — se o snapshot ainda os contém, é casco vazio e o build
 * falha. Derivar da tradução evita divergir silenciosamente quando o texto
 * visível muda.
 */
const pt = JSON.parse(readFileSync(resolve(ROOT, 'src/locales/pt/translation.json'), 'utf8'))
export const EMPTY_SENTINELS = [pt.insp?.notfound, pt.insp?.empty, pt.insp?.loading].filter(Boolean)

/** Caminho de saída (relativo a dist/) para uma rota. */
export function outputPathForRoute(route) {
  if (route === '/') return 'index.html'
  return `${route.replace(/^\//, '')}/index.html`
}

/**
 * Valida que o snapshot tem título preenchido, algum corpo e não exibe um
 * estado de carregamento/erro (sentinela de dados não resolvidos).
 */
export function htmlHasContent(html) {
  const title = /<title>([^<]+)<\/title>/i.exec(html)?.[1]?.trim()
  const hasBody = /<(main|article)[\s>]/i.test(html) || /<body[^>]*>[\s\S]{200,}<\/body>/i.test(html)
  const isEmptyState = EMPTY_SENTINELS.some((s) => html.includes(s))
  return Boolean(title) && hasBody && !isEmptyState
}

/**
 * Faz o browser do prerender conseguir ler o Sanity a partir de localhost
 * (origem fora da allowlist de CORS do projeto). O CDN do Sanity bloqueia
 * origens desconhecidas com 403, então o replay remove Origin/Referer para
 * ser tratado como request server-side (igual ao gerador de sitemap, que já
 * lê sem token), e a resposta volta com `access-control-allow-origin`.
 * Preflight OPTIONS é respondido direto.
 */
async function bypassSanityCors(context) {
  await context.route(/\bsanity\.io\//, async (route) => {
    const request = route.request()
    if (request.method() === 'OPTIONS') {
      return route.fulfill({
        status: 204,
        headers: {
          'access-control-allow-origin': '*',
          'access-control-allow-methods': 'GET,POST,OPTIONS',
          'access-control-allow-headers': '*',
        },
      })
    }
    try {
      const headers = { ...request.headers() }
      delete headers['origin']
      delete headers['referer']
      const response = await route.fetch({ headers })
      await route.fulfill({
        response,
        headers: { ...response.headers(), 'access-control-allow-origin': '*' },
      })
    } catch {
      await route.continue()
    }
  })
}

async function main() {
  const slugs = await fetchArticleSlugs() // herda o guard-rail (falha se Sanity cair/0 artigos)
  const routes = getPrerenderRoutes(slugs)
  // Reusa o mesmo servidor do runtime (server.mjs) para o snapshot rodar no
  // ambiente que produção serve. Antes do snapshot, todas as rotas caem no
  // fallback SPA (index.html), que boota e renderiza a rota no cliente.
  const server = await new Promise((res) => {
    const s = createApp({ distDir: DIST }).listen(PORT, () => res(s))
  })
  const browser = await chromium.launch()
  const context = await browser.newContext({ locale: 'pt-BR' })
  // Força pt-BR: localStorage é o 1º da ordem de detecção do i18n.
  await context.addInitScript(() => {
    try {
      localStorage.setItem('i18nextLng', 'pt')
    } catch {
      /* noop */
    }
  })
  await bypassSanityCors(context)
  const page = await context.newPage()
  const failures = []

  for (const route of routes) {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' })
    // Sinal route-specific e determinístico: espera o React Router realmente
    // renderizar ESTA rota (canonical do <Seo> == SITE_URL+route) E os dados
    // resolverem (__PRERENDER_READY__). Sem isso, um snapshot cedo demais pode
    // fotografar o fallback SPA (home) antes da troca de rota — que passaria no
    // htmlHasContent (tem título/main) e gravaria a home no arquivo da rota.
    // Se não bater no tempo, é FALHA (build falha alto, não grava casco).
    let settled = true
    await page
      .waitForFunction(
        (expected) =>
          window.__PRERENDER_READY__ === true &&
          document.querySelector('link[rel="canonical"]')?.getAttribute('href') === expected,
        `${SITE_URL}${route}`,
        { timeout: 15000 },
      )
      .catch(() => {
        settled = false
      })
    const html = '<!doctype html>\n' + (await page.content()).replace(/^<!doctype html>/i, '')
    if (!settled || !htmlHasContent(html)) { failures.push(route); continue }
    const out = resolve(DIST, outputPathForRoute(route))
    if (!existsSync(dirname(out))) await mkdir(dirname(out), { recursive: true })
    await writeFile(out, html, 'utf8')
    console.log(`[prerender] ${route} -> ${outputPathForRoute(route)}`)
  }

  await browser.close()
  server.close()

  if (failures.length) {
    console.error(`[prerender] FALHA — rotas sem conteúdo: ${failures.join(', ')}`)
    process.exit(1)
  }
  console.log(`[prerender] OK — ${routes.length} rotas.`)
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) main()
