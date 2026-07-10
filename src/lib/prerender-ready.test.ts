// src/lib/prerender-ready.test.ts
import { describe, it, expect } from 'vitest'
import { isReady } from './prerender-ready'

describe('isReady', () => {
  it('pronto quando não há fetch em voo', () => {
    expect(isReady(0)).toBe(true)
  })
  it('não pronto se há fetch em voo', () => {
    expect(isReady(1)).toBe(false)
  })
})
