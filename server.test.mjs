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
