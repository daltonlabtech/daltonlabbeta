// scripts/prerender.helpers.test.mjs
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import { getPrerenderRoutes } from './generate-sitemap.mjs'
import { outputPathForRoute, htmlHasContent } from './prerender.mjs'

const pt = JSON.parse(
  readFileSync(
    resolve(dirname(fileURLToPath(import.meta.url)), '..', 'src/locales/pt/translation.json'),
    'utf8',
  ),
)

describe('getPrerenderRoutes', () => {
  it('inclui as rotas estáticas e um path por slug de artigo', () => {
    const routes = getPrerenderRoutes(['meu-artigo', 'outro'])
    expect(routes).toContain('/')
    expect(routes).toContain('/quem-somos')
    expect(routes).toContain('/artigos/meu-artigo')
    expect(routes).toContain('/artigos/outro')
  })
  it('não inclui rotas fora de escopo', () => {
    const routes = getPrerenderRoutes([])
    expect(routes).not.toContain('/newton')
    expect(routes).not.toContain('/produto')
    expect(routes).not.toContain('/casos')
  })
})

describe('outputPathForRoute', () => {
  it('mapeia / para dist/index.html', () => {
    expect(outputPathForRoute('/')).toBe('index.html')
  })
  it('mapeia /quem-somos para dist/quem-somos/index.html', () => {
    expect(outputPathForRoute('/quem-somos')).toBe('quem-somos/index.html')
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
  it('rejeita snapshot em estado de carregamento/erro (sentinela da tradução pt)', () => {
    const shell = (body) => `<html><head><title>Dalton Lab</title></head><body><main>${body}</main></body></html>`
    expect(htmlHasContent(shell(pt.insp.loading))).toBe(false)
    expect(htmlHasContent(shell(pt.insp.notfound))).toBe(false)
    expect(htmlHasContent(shell(pt.insp.empty))).toBe(false)
  })
})
