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
  writeFileSync(join(dist, '404.html'), '<html><body>not found page</body></html>')
  mkdirSync(join(dist, 'quem-somos'))
  writeFileSync(join(dist, 'quem-somos', 'index.html'), '<html><body>quem somos prerender</body></html>')
  app = createApp({ distDir: dist })
})

describe('server', () => {
  it('serve a rota prerenderizada sem barra final', async () => {
    const r = await request(app).get('/quem-somos')
    expect(r.status).toBe(200)
    expect(r.text).toContain('quem somos prerender')
  })
  it('index.html sai com no-cache', async () => {
    const r = await request(app).get('/')
    expect(r.headers['cache-control']).toMatch(/no-cache/)
  })
  it('rota desconhecida responde 404 real (não fallback home)', async () => {
    const r = await request(app).get('/rota-que-nao-existe')
    expect(r.status).toBe(404)
    expect(r.text).toContain('not found page')
    expect(r.text).not.toContain('home')
  })
  it('legado /agente/* responde 404', async () => {
    const r = await request(app).get('/agente/newspilot')
    expect(r.status).toBe(404)
  })
  it('/index.html redireciona 301 para /', async () => {
    const r = await request(app).get('/index.html')
    expect(r.status).toBe(301)
    expect(r.headers.location).toBe('/')
  })
  it('legado /produto redireciona 301 para /', async () => {
    const r = await request(app).get('/produto')
    expect(r.status).toBe(301)
    expect(r.headers.location).toBe('/')
  })
  it('legado /newton redireciona 301 para /', async () => {
    const r = await request(app).get('/newton')
    expect(r.status).toBe(301)
    expect(r.headers.location).toBe('/')
  })
  it('rota SPA-only (/casos) ainda serve shell', async () => {
    const r = await request(app).get('/casos')
    expect(r.status).toBe(200)
    expect(r.text).toContain('home')
  })
  it('rota SPA-only (/artigos/insight/:id) ainda serve shell', async () => {
    const r = await request(app).get('/artigos/insight/abc')
    expect(r.status).toBe(200)
    expect(r.text).toContain('home')
  })
  it('redireciona apex -> www com 308', async () => {
    const r = await request(app).get('/quem-somos').set('Host', 'daltonlab.ai')
    expect(r.status).toBe(308)
    expect(r.headers.location).toBe('https://www.daltonlab.ai/quem-somos')
  })
})

/**
 * Sintoma Railway: postbuild visita rota antes do snapshot existir.
 * Sem spaFallback → 404 → prerender falha. Com spaFallback → shell SPA (home).
 */
describe('server spaFallback (modo prerender)', () => {
  let prerenderApp
  let prodApp
  beforeAll(() => {
    const dist = mkdtempSync(join(tmpdir(), 'dist-pre-'))
    writeFileSync(join(dist, 'index.html'), '<html><body>home</body></html>')
    writeFileSync(join(dist, '404.html'), '<html><body>not found page</body></html>')
    // Sem dist/artigos/index.html — estado no meio do postbuild
    prerenderApp = createApp({ distDir: dist, spaFallback: true })
    prodApp = createApp({ distDir: dist })
  })

  it('com spaFallback: rota ainda sem snapshot serve shell (200 + home)', async () => {
    const r = await request(prerenderApp).get('/artigos')
    expect(r.status).toBe(200)
    expect(r.text).toContain('home')
  })

  it('sem spaFallback (prod): mesma rota sem snapshot continua 404', async () => {
    const r = await request(prodApp).get('/artigos')
    expect(r.status).toBe(404)
    expect(r.text).toContain('not found page')
    expect(r.text).not.toContain('home')
  })
})
