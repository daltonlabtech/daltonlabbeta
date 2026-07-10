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
