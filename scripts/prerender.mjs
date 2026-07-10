#!/usr/bin/env node
/**
 * Snapshot headless: serve dist/ localmente, visita cada rota com Chromium,
 * espera window.__PRERENDER_READY__ e grava dist/<rota>/index.html.
 * Guard-rail: se qualquer rota não render conteúdo válido, sai != 0.
 */
import { chromium } from '@playwright/test'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, dirname, join, extname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { getPrerenderRoutes, fetchArticleSlugs } from './generate-sitemap.mjs'

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const PORT = 4173
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' }

/** Caminho de saída (relativo a dist/) para uma rota. */
export function outputPathForRoute(route) {
  if (route === '/') return 'index.html'
  return `${route.replace(/^\//, '')}/index.html`
}

/** Valida que o snapshot tem título preenchido e algum corpo. */
export function htmlHasContent(html) {
  const title = /<title>([^<]+)<\/title>/i.exec(html)?.[1]?.trim()
  const hasBody = /<(main|article)[\s>]/i.test(html) || /<body[^>]*>[\s\S]{200,}<\/body>/i.test(html)
  return Boolean(title) && hasBody
}

/** Servidor estático mínimo do dist/ (SPA fallback para index.html). */
function startStaticServer() {
  const server = createServer(async (req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0])
    let filePath = join(DIST, url)
    if (!extname(filePath)) filePath = join(DIST, 'index.html') // SPA fallback (pré-snapshot)
    try {
      const buf = await readFile(filePath)
      res.setHeader('Content-Type', MIME[extname(filePath)] || 'application/octet-stream')
      res.end(buf)
    } catch {
      res.statusCode = 404
      res.end('not found')
    }
  })
  return new Promise((res) => server.listen(PORT, () => res(server)))
}

async function main() {
  const slugs = await fetchArticleSlugs() // herda o guard-rail (falha se Sanity cair/0 artigos)
  const routes = getPrerenderRoutes(slugs)
  const server = await startStaticServer()
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const failures = []

  for (const route of routes) {
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' })
    await page.waitForFunction('window.__PRERENDER_READY__ === true', { timeout: 15000 }).catch(() => {})
    const html = '<!doctype html>\n' + (await page.content()).replace(/^<!doctype html>/i, '')
    if (!htmlHasContent(html)) { failures.push(route); continue }
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
