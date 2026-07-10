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
