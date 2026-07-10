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
    redirect: false,
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
