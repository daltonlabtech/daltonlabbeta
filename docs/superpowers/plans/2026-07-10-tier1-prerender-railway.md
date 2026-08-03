# Tier 1 — Prerender por snapshot + migração Railway — Implementation Plan

> **For agentic workers:** Execute segundo o modelo de ondas em **Paralelização (waves)** abaixo — Onda 1 via `superpowers:dispatching-parallel-agents` (2 agentes em worktrees isoladas), Onda 2 sequencial (`superpowers:subagent-driven-development` ou `executing-plans`). Steps usam checkbox (`- [ ]`) para tracking.

**Goal:** Servir o conteúdo de cada rota pública (foco: artigos) como HTML estático sem JS — para crawlers de LLM, bingbot e preview social — via snapshot headless no build, hospedado na Railway.

**Architecture:** `vite build` gera o SPA; um passo de snapshot (Playwright/Chromium) visita cada rota num preview local e grava `dist/<rota>/index.html`; um servidor Express serve o `dist/` com fallback SPA, headers de cache e redirect apex→www. Empacotado num Docker multi-stage (build com Chromium, runtime enxuto). Cutover de DNS reversível para produção.

**Tech Stack:** Vite 5, React 18, Playwright (`@playwright/test` já instalado), Express (novo), Node 20, Docker multi-stage, Railway.

## Global Constraints

- Host canônico: `https://www.daltonlab.ai` (copiado de `scripts/generate-sitemap.mjs` → `SITE_URL`).
- Idioma do snapshot: **pt-BR** (uma URL por rota; sem prefixo de idioma).
- Escopo de rotas = `STATIC_ROUTES` (6) + `/artigos/<slug>` (todos). **Fora:** `/newton`, `/casos`, `/casos/:slug`, `/artigos/insight/:id`, `*`.
- Guard-rail herdado: Sanity falha/0 artigos → build falha (nunca escrever saída vazia).
- Não reintroduzir tags estáticas de canonical/meta no `index.html` (Helmet é dono único).
- Env vars necessárias **no build**: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.
- TDD, DRY, YAGNI, commits frequentes.

## Paralelização (waves)

| Wave | Stream | Tasks | Skill de execução | Toca |
|---|---|---|---|---|
| 1 | A — prerender | A1, A2, A3 | **superpowers:dispatching-parallel-agents** (1 agente, worktree isolada) | `scripts/*`, `src/*` |
| 1 | B — servidor | B1 | **superpowers:dispatching-parallel-agents** (1 agente, worktree isolada) | `server.mjs`, testes |
| 2 | Integração | C1, C2, C3 | sequencial (subagent-driven-development / inline) | `Dockerfile`, `railway.json`, `package.json` |

**Onda 1 — usar `superpowers:dispatching-parallel-agents`:** despachar **exatamente 2 agentes** no mesmo turno (um por Stream), cada um em worktree isolada (`isolation: "worktree"`), com prompt autocontido apontando só para as tasks do seu Stream. Domínios independentes, arquivos disjuntos (A não adiciona dependência; B adiciona `express`) → sem conflito. Cada agente segue TDD e retorna um resumo do que fez.

**Onda 2 — NÃO usar a skill de agentes paralelos:** é sequencial e integra o resultado de A+B (estado compartilhado: `Dockerfile`, `package.json`). Rodar após o merge das duas streams.

## File Structure

- `scripts/generate-sitemap.mjs` — MODIFY: exportar `fetchArticleSlugs()` e `getPrerenderRoutes(slugs)` (fonte única de rotas, reusada pelo prerender).
- `scripts/prerender.mjs` — CREATE: orquestra o snapshot Playwright + helpers puros `outputPathForRoute`, `htmlHasContent`.
- `scripts/prerender.helpers.test.mjs` — CREATE: testa os helpers puros e `getPrerenderRoutes`.
- `src/lib/prerender-ready.ts` — CREATE: hook que seta `window.__PRERENDER_READY__` quando não há fetch em voo.
- `src/lib/prerender-ready.test.ts` — CREATE: testa o predicado puro `isReady`.
- `src/App.tsx` — MODIFY: montar o sinal de pronto.
- `server.mjs` — CREATE: servidor Express (fallback SPA, headers, trailing-slash, 308 apex→www).
- `server.test.mjs` — CREATE: supertest do servidor.
- `Dockerfile`, `.dockerignore`, `railway.json` — CREATE.
- `package.json` — MODIFY: scripts `postbuild`/`start` + deps.

---

## Wave 1 · Stream A — Pipeline de prerender

### Task A1: Fonte única de rotas (refactor do gerador de sitemap)

**Files:**
- Modify: `scripts/generate-sitemap.mjs`
- Test: `scripts/prerender.helpers.test.mjs`

**Interfaces:**
- Consumes: `STATIC_ROUTES`, `fetchArticles` (já no arquivo).
- Produces: `fetchArticleSlugs(): Promise<string[]>`; `getPrerenderRoutes(slugs: string[]): string[]` → lista de paths (ex.: `['/', '/produto', ..., '/artigos/<slug>']`).

- [ ] **Step 1: Write the failing test**

```js
// scripts/prerender.helpers.test.mjs
import { describe, it, expect } from 'vitest'
import { getPrerenderRoutes } from './generate-sitemap.mjs'

describe('getPrerenderRoutes', () => {
  it('inclui as rotas estáticas e um path por slug de artigo', () => {
    const routes = getPrerenderRoutes(['meu-artigo', 'outro'])
    expect(routes).toContain('/')
    expect(routes).toContain('/produto')
    expect(routes).toContain('/artigos/meu-artigo')
    expect(routes).toContain('/artigos/outro')
  })
  it('não inclui rotas fora de escopo', () => {
    const routes = getPrerenderRoutes([])
    expect(routes).not.toContain('/newton')
    expect(routes).not.toContain('/casos')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run scripts/prerender.helpers.test.mjs`
Expected: FAIL — `getPrerenderRoutes is not a function`.

- [ ] **Step 3: Implement `getPrerenderRoutes` + export `fetchArticleSlugs`**

Adicionar ao final de `scripts/generate-sitemap.mjs` (antes do bloco `if (import.meta.url === ...)`):

```js
/** Slugs publicados, reusando a mesma query do sitemap. */
export async function fetchArticleSlugs() {
  const articles = await fetchArticles()
  assertArticles(articles)
  return articles.map((a) => a.slug)
}

/** Lista de paths a prerenderizar: rotas estáticas + 1 por artigo. */
export function getPrerenderRoutes(slugs = []) {
  return [
    ...STATIC_ROUTES.map((r) => r.path),
    ...slugs.map((slug) => `/artigos/${slug}`),
  ]
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run scripts/prerender.helpers.test.mjs`
Expected: PASS (2 testes).

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-sitemap.mjs scripts/prerender.helpers.test.mjs
git commit -m "feat(prerender): fonte única de rotas reusando a query do sitemap"
```

### Task A2: Sinal de "pronto" no app

**Files:**
- Create: `src/lib/prerender-ready.ts`, `src/lib/prerender-ready.test.ts`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `isReady(inFlight: number, mounted: boolean): boolean`; `usePrerenderReady(): void` (efeito que seta `window.__PRERENDER_READY__`). O snapshot (Task A3) espera por `window.__PRERENDER_READY__ === true`.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/prerender-ready.test.ts
import { describe, it, expect } from 'vitest'
import { isReady } from './prerender-ready'

describe('isReady', () => {
  it('pronto quando montado e sem fetch em voo', () => {
    expect(isReady(0, true)).toBe(true)
  })
  it('não pronto se há fetch em voo', () => {
    expect(isReady(1, true)).toBe(false)
  })
  it('não pronto antes de montar', () => {
    expect(isReady(0, false)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/prerender-ready.test.ts`
Expected: FAIL — módulo não encontrado.

- [ ] **Step 3: Implement**

```ts
// src/lib/prerender-ready.ts
import { useEffect } from 'react'
import { useIsFetching } from '@tanstack/react-query'

/** Predicado puro: pronto = montado e nenhuma query em voo. */
export function isReady(inFlight: number, mounted: boolean): boolean {
  return mounted && inFlight === 0
}

/**
 * Sinaliza ao prerenderer que a rota terminou de carregar seus dados.
 * Seta window.__PRERENDER_READY__ = true quando não há mais fetch em voo.
 */
export function usePrerenderReady(): void {
  const inFlight = useIsFetching()
  useEffect(() => {
    if (isReady(inFlight, true)) {
      ;(window as unknown as Record<string, unknown>).__PRERENDER_READY__ = true
    } else {
      ;(window as unknown as Record<string, unknown>).__PRERENDER_READY__ = false
    }
  }, [inFlight])
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/prerender-ready.test.ts`
Expected: PASS (3 testes).

- [ ] **Step 5: Montar no App**

Em `src/App.tsx`, criar um componente interno dentro do `BrowserRouter` (irmão de `<PageViewTracker />`) e montá-lo:

```tsx
// no topo do arquivo:
import { usePrerenderReady } from "@/lib/prerender-ready";

// componente (perto de PageViewTracker):
const PrerenderReady = () => {
  usePrerenderReady();
  return null;
};

// dentro de <BrowserRouter>, ao lado de <PageViewTracker />:
<PrerenderReady />
```

- [ ] **Step 6: Verify build compila**

Run: `npm run build`
Expected: build conclui sem erro de tipos.

- [ ] **Step 7: Commit**

```bash
git add src/lib/prerender-ready.ts src/lib/prerender-ready.test.ts src/App.tsx
git commit -m "feat(prerender): sinal de pronto baseado em react-query in-flight"
```

### Task A3: Script de snapshot (Playwright)

**Files:**
- Create: `scripts/prerender.mjs`
- Test: `scripts/prerender.helpers.test.mjs` (estende com os helpers puros)

**Interfaces:**
- Consumes: `getPrerenderRoutes`, `fetchArticleSlugs` (Task A1); `window.__PRERENDER_READY__` (Task A2).
- Produces: helpers puros `outputPathForRoute(route: string): string` e `htmlHasContent(html: string): boolean`; e `main()` que grava `dist/<rota>/index.html`.

- [ ] **Step 1: Write the failing test (helpers puros)**

Adicionar em `scripts/prerender.helpers.test.mjs`:

```js
import { outputPathForRoute, htmlHasContent } from './prerender.mjs'

describe('outputPathForRoute', () => {
  it('mapeia / para dist/index.html', () => {
    expect(outputPathForRoute('/')).toBe('index.html')
  })
  it('mapeia /produto para dist/produto/index.html', () => {
    expect(outputPathForRoute('/produto')).toBe('produto/index.html')
  })
  it('mapeia artigo aninhado', () => {
    expect(outputPathForRoute('/artigos/x')).toBe('artigos/x/index.html')
  })
})

describe('htmlHasContent', () => {
  it('rejeita HTML sem <title> preenchido', () => {
    expect(htmlHasContent('<html><head></head><body></body></html>')).toBe(false)
  })
  it('aceita HTML com title e body', () => {
    expect(htmlHasContent('<html><head><title>Oi | Dalton Lab</title></head><body><main>texto</main></body></html>')).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run scripts/prerender.helpers.test.mjs`
Expected: FAIL — `outputPathForRoute is not a function`.

- [ ] **Step 3: Implement `scripts/prerender.mjs`**

```js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run scripts/prerender.helpers.test.mjs`
Expected: PASS (todos).

- [ ] **Step 5: Garantir o Chromium local (uma vez)**

Run: `npx playwright install chromium`
Expected: baixa o Chromium (ou "already installed").

- [ ] **Step 6: Commit**

```bash
git add scripts/prerender.mjs scripts/prerender.helpers.test.mjs
git commit -m "feat(prerender): script de snapshot headless com guard-rail de conteúdo"
```

---

## Wave 1 · Stream B — Servidor estático

### Task B1: Servidor Express (fallback, headers, trailing-slash, apex→www)

**Files:**
- Create: `server.mjs`, `server.test.mjs`
- Modify: `package.json` (add `express`, devDep `supertest`)

**Interfaces:**
- Produces: `createApp({ distDir }): express.Express` — exportado para teste; middleware de 308 apex→www; estáticos com cache; fallback SPA.

- [ ] **Step 1: Add deps**

Run: `npm i express@^4 && npm i -D supertest@^7`
Expected: instala sem erro.

- [ ] **Step 2: Write the failing test**

```js
// server.test.mjs
import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createApp } from './server.mjs'

let app
beforeAll(() => {
  const dist = mkdtempSync(join(tmpdir(), 'dist-'))
  writeFileSync(join(dist, 'index.html'), '<html><body>home</body></html>')
  mkdirSync(join(dist, 'produto'))
  writeFileSync(join(dist, 'produto', 'index.html'), '<html><body>produto prerender</body></html>')
  app = createApp({ distDir: dist })
})

describe('server', () => {
  it('serve a rota prerenderizada sem barra final', async () => {
    const r = await request(app).get('/produto')
    expect(r.status).toBe(200)
    expect(r.text).toContain('produto prerender')
  })
  it('index.html sai com no-cache', async () => {
    const r = await request(app).get('/')
    expect(r.headers['cache-control']).toMatch(/no-cache/)
  })
  it('rota desconhecida cai no fallback SPA (index.html)', async () => {
    const r = await request(app).get('/rota-que-nao-existe')
    expect(r.status).toBe(200)
    expect(r.text).toContain('home')
  })
  it('redireciona apex -> www com 308', async () => {
    const r = await request(app).get('/produto').set('Host', 'daltonlab.ai')
    expect(r.status).toBe(308)
    expect(r.headers.location).toBe('https://www.daltonlab.ai/produto')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run server.test.mjs`
Expected: FAIL — `createApp` não existe.

- [ ] **Step 4: Implement `server.mjs`**

```js
import express from 'express'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname } from 'node:path'

const APEX = 'daltonlab.ai'
const WWW = 'https://www.daltonlab.ai'

export function createApp({ distDir }) {
  const app = express()

  // 308 apex -> www (o host é dono do redirect; Cloudflare fica DNS-only)
  app.use((req, res, next) => {
    const host = (req.headers.host || '').split(':')[0]
    if (host === APEX) return res.redirect(308, `${WWW}${req.originalUrl}`)
    next()
  })

  // Assets e mídia: imutáveis por 1 ano
  app.use('/assets', express.static(join(distDir, 'assets'), { immutable: true, maxAge: '1y' }))
  app.use(express.static(distDir, {
    index: false,
    setHeaders: (res, path) => {
      if (/\.(webp|mp4|webm|png)$/.test(path)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    },
  }))

  // HTML prerenderizado por rota (sem barra final, coerente com o canonical)
  app.get('*', (req, res) => {
    const clean = req.path.replace(/\/$/, '') || '/'
    const candidate = clean === '/' ? join(distDir, 'index.html') : join(distDir, clean, 'index.html')
    const file = existsSync(candidate) ? candidate : join(distDir, 'index.html') // fallback SPA
    res.setHeader('Cache-Control', 'no-cache, must-revalidate')
    res.sendFile(file)
  })

  return app
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const distDir = resolve(dirname(fileURLToPath(import.meta.url)), 'dist')
  const port = process.env.PORT || 8080
  createApp({ distDir }).listen(port, () => console.log(`[server] :${port}`))
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run server.test.mjs`
Expected: PASS (4 testes).

- [ ] **Step 6: Commit**

```bash
git add server.mjs server.test.mjs package.json package-lock.json
git commit -m "feat(server): Express estático com fallback SPA, cache e 308 apex->www"
```

---

## Wave 2 · Integração (sequencial, após merge de A + B)

### Task C1: Wiring dos scripts npm

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Adicionar scripts**

Em `package.json`, no bloco `scripts`, adicionar:

```json
"postbuild": "node scripts/prerender.mjs",
"start": "node server.mjs"
```

(`prebuild` do sitemap continua; a ordem vira: prebuild → build → postbuild.)

- [ ] **Step 2: Verificar build local completo**

Run: `npm run build`
Expected: sitemap gerado → vite build → prerender grava `dist/artigos/<slug>/index.html` para cada artigo; log `[prerender] OK`.

- [ ] **Step 3: Verificar conteúdo sem JS**

Run: `node -e "const fs=require('fs');const f=fs.readdirSync('dist/artigos')[0];const h=fs.readFileSync('dist/artigos/'+f+'/index.html','utf8');console.log(/<title>[^<]+<\/title>/.test(h), /rel=\"canonical\"/.test(h), h.length)"`
Expected: `true true <n>` — title + canonical presentes no HTML gravado.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "feat(build): wiring postbuild (prerender) e start (server)"
```

### Task C2: Docker multi-stage + config Railway

**Files:**
- Create: `Dockerfile`, `.dockerignore`, `railway.json`

- [ ] **Step 1: Criar `Dockerfile`**

```dockerfile
# --- build: imagem oficial do Playwright (Chromium embutido) ---
FROM mcr.microsoft.com/playwright:v1.57.0-jammy AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# VITE_* precisam existir no build (Railway build args / env)
RUN npm run build

# --- runtime: enxuto, só serve dist/ (sem Chromium) ---
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server.mjs ./
EXPOSE 8080
CMD ["node", "server.mjs"]
```

- [ ] **Step 2: Criar `.dockerignore`**

```
node_modules
dist
.git
docs
*.md
```

- [ ] **Step 3: Criar `railway.json`**

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": { "builder": "DOCKERFILE", "dockerfilePath": "Dockerfile" },
  "deploy": { "startCommand": "node server.mjs", "healthcheckPath": "/", "restartPolicyType": "ON_FAILURE" }
}
```

- [ ] **Step 4: Commit**

```bash
git add Dockerfile .dockerignore railway.json
git commit -m "feat(deploy): Docker multi-stage (Playwright build + runtime slim) e config Railway"
```

### Task C3: Teste E2E + spike do Chromium (validação de viabilidade)

**Files:** nenhum novo (validação via Docker).

- [ ] **Step 1: Build da imagem com as env vars de build**

Run:
```bash
docker build \
  --build-arg VITE_SANITY_PROJECT_ID=ss6d4h78 \
  --build-arg VITE_SANITY_DATASET=production \
  -t daltonlab-web .
```
Expected: build conclui; logs mostram `[prerender] OK — N rotas` (prova que o Chromium roda no build).
> Nota: se o Vite não ler as env como build-args, passá-las como `ENV`/secrets no Railway. Ajuste registrado se necessário.

- [ ] **Step 2: Rodar o container**

Run: `docker run --rm -p 8080:8080 daltonlab-web`

- [ ] **Step 3: Verificar conteúdo sem JS (simulando bot)**

Run (outro terminal):
```bash
SLUG=$(curl -s localhost:8080/sitemap.xml | grep -o '/artigos/[^<]*' | head -1)
curl -s "localhost:8080$SLUG" | grep -Eo '<title>[^<]+|rel="canonical"|<main' | head
```
Expected: título do artigo + `rel="canonical"` + `<main` presentes no HTML cru (sem executar JS).

- [ ] **Step 4: Verificar redirect apex→www**

Run: `curl -sI localhost:8080/produto -H "Host: daltonlab.ai" | grep -iE "^(HTTP|location)"`
Expected: `308` + `location: https://www.daltonlab.ai/produto`.

- [ ] **Step 5: Registrar resultado do spike**

Se o Chromium não rodar no build da imagem (tempo/memória), este é o ponto de decisão documentado no spec (seção 8). Anotar tempo de build e nº de rotas no PR.

---

## Funil de qualidade (após a implementação, no diff integrado)

1. `/simplify` — passe de reuso/simplificação no diff.
2. `/security-review` — revisão de segurança do diff (atenção a: server servindo arquivos, headers, redirect, exposição de env).

---

## Fase 2 — Cutover para produção (runbook de ops; NÃO é TDD)

Executar só com a Fase 1 verde em staging da Railway e validada pelo Diego.

- [ ] Deploy na Railway em domínio temporário; validar rotas com conteúdo sem-JS, headers, redirect, `robots.txt`/`sitemap.xml`, smoke JS-off.
- [ ] Setar as 6 env `VITE_*` no ambiente de build da Railway.
- [ ] Configurar previews por PR na Railway.
- [ ] Baixar TTL do DNS no Cloudflare.
- [ ] Apontar `www` (CNAME) → Railway e apex (CNAME flattening) → Railway; SSL Railway. **Vercel intacta.**
- [ ] Configurar webhook Sanity (on publish/update de `article`) → deploy hook da Railway.
- [ ] Verificar prod: canonical/sitemap; re-inspecionar GSC + Bing; reenviar sitemap.
- [ ] Soak alguns dias → remover `@vercel/speed-insights` de `src/App.tsx` + dep, remover `vercel.json`, decommissionar Vercel.
- [ ] **Rollback (se preciso):** repontar CNAME `www`/apex de volta para a Vercel.

---

## Self-Review (feito pós-escrita)

- **Cobertura do spec:** prerender (A3), sinal de pronto (A2), fonte de rotas/escopo (A1), servidor+headers+apex→www (B1), Docker/Railway (C2), frescor/webhook + cutover (Fase 2 runbook), guard-rails (A1/A3), env vars (Global + C3), testes (A1/A2/A3/B1 + E2E C3). Sem lacunas.
- **Placeholders:** nenhum passo com TODO/TBD; todo passo de código tem código.
- **Consistência de tipos:** `getPrerenderRoutes`/`fetchArticleSlugs` (A1) usados por A3; `outputPathForRoute`/`htmlHasContent` (A3) testados em A1-file; `createApp({distDir})` (B1) usado no teste e no bootstrap; `window.__PRERENDER_READY__` produzido em A2, consumido em A3.
