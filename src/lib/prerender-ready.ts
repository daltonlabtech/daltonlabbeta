// src/lib/prerender-ready.ts
import { useEffect } from 'react'
import { useIsFetching } from '@tanstack/react-query'

declare global {
  interface Window {
    __PRERENDER_READY__?: boolean
  }
}

/** Predicado puro: pronto = nenhuma query em voo. */
export function isReady(inFlight: number): boolean {
  return inFlight === 0
}

/**
 * Sinaliza ao prerenderer que a rota terminou de carregar seus dados.
 * Seta window.__PRERENDER_READY__ conforme haja ou não fetch em voo.
 */
export function usePrerenderReady(): void {
  const inFlight = useIsFetching()
  useEffect(() => {
    window.__PRERENDER_READY__ = isReady(inFlight)
  }, [inFlight])
}
