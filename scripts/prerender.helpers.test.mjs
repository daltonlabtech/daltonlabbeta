// scripts/prerender.helpers.test.mjs
import { describe, it, expect } from 'vitest'
import { getPrerenderRoutes } from './generate-sitemap.mjs'
import { outputPathForRoute, htmlHasContent } from './prerender.mjs'

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
