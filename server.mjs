import express from 'express'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname } from 'node:path'
import { SITE_URL } from './shared/site.mjs'

const WWW = SITE_URL // host canônico (fonte única em shared/site.mjs)
const APEX = new URL(WWW).host.replace(/^www\./, '')

/** Rotas SPA-only (existem no React, sem snapshot prerender). */
function isSpaOnlyRoute(cleanPath) {
  if (cleanPath === '/newton') return true
  if (cleanPath === '/casos' || cleanPath.startsWith('/casos/')) return true
  if (cleanPath.startsWith('/artigos/insight/')) return true
  return false
}

const FALLBACK_404_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8"/>
  <meta name="robots" content="noindex, nofollow"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>404 - Página não encontrada | Dalton Lab</title>
</head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0D1218;color:#F5F3F0;font-family:system-ui,sans-serif">
  <main style="text-align:center;padding:2rem">
    <h1 style="font-size:2.5rem;margin:0 0 1rem">404</h1>
    <p style="opacity:.7;margin:0 0 1.5rem">Página não encontrada.</p>
    <a href="/" style="color:#3B82F6">Voltar para a home</a>
  </main>
</body>
</html>`

export function createApp({ distDir }) {
  const app = express()

  // 308 apex -> www (o host é dono do redirect; Cloudflare fica DNS-only)
  app.use((req, res, next) => {
    const host = (req.headers.host || '').split(':')[0]
    if (host === APEX) return res.redirect(308, `${WWW}${req.originalUrl}`)
    next()
  })

  // /index.html é duplicata da home — 301 canônico (antes do static)
  app.use((req, res, next) => {
    if (req.path === '/index.html') return res.redirect(301, '/')
    next()
  })

  // Assets e mídia: imutáveis por 1 ano
  app.use('/assets', express.static(join(distDir, 'assets'), { immutable: true, maxAge: '1y' }))
  app.use(express.static(distDir, {
    index: false,
    redirect: false,
    setHeaders: (res, path) => {
      if (/\.(webp|mp4|webm|png)$/.test(path)) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    },
  }))

  // HTML prerenderizado por rota (sem barra final, coerente com o canonical)
  app.get('*', (req, res) => {
    const clean = req.path.replace(/\/$/, '') || '/'
    const candidate = clean === '/' ? join(distDir, 'index.html') : join(distDir, clean, 'index.html')

    res.setHeader('Cache-Control', 'no-cache, must-revalidate')

    if (existsSync(candidate)) {
      return res.sendFile(candidate)
    }

    // Rotas client-only: shell SPA pra humano; crawlers devem respeitar noindex da página
    if (isSpaOnlyRoute(clean)) {
      return res.sendFile(join(distDir, 'index.html'))
    }

    // Rota desconhecida / legado: 404 real (mata soft 404 + identical title/meta)
    const notFoundFile = join(distDir, '404.html')
    if (existsSync(notFoundFile)) {
      return res.status(404).sendFile(notFoundFile)
    }
    return res.status(404).type('html').send(FALLBACK_404_HTML)
  })

  return app
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const distDir = resolve(dirname(fileURLToPath(import.meta.url)), 'dist')
  const port = process.env.PORT || 8080
  createApp({ distDir }).listen(port, () => console.log(`[server] :${port}`))
}
