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
