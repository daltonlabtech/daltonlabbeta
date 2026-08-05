import { useEffect, useRef, type RefObject } from 'react';

/**
 * Progresso de scroll (0–1) de um container alto (ex.: 320vh) com sticky interno,
 * suavizado a 0.09 por frame como no protótipo. Com prefers-reduced-motion o
 * progresso acompanha o scroll diretamente (sem inércia) — o scrub continua
 * guiado pelo usuário, portanto não é animação autônoma.
 *
 * O callback só dispara quando o progresso muda de fato (ou após scroll/resize),
 * então os frames intermediários são no-ops baratos.
 */
export function useScrollScrub(
  containerRef: RefObject<HTMLElement>,
  onProgress: (p: number) => void,
) {
  const cbRef = useRef(onProgress);
  cbRef.current = onProgress;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let P = 0;
    let target = 0;
    let needsDraw = true;
    let raf = 0;
    let running = true;

    const targetFromScroll = () => {
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const v = -r.top / (total || 1);
      return v < 0 ? 0 : v > 1 ? 1 : v;
    };

    const frame = () => {
      if (!running) return;
      target = targetFromScroll();
      if (reduced) P = target;
      else P += (target - P) * 0.09;
      if (Math.abs(target - P) > 0.0004 || needsDraw) {
        cbRef.current(P);
        needsDraw = false;
      }
      raf = requestAnimationFrame(frame);
    };

    const markDirty = () => {
      needsDraw = true;
    };

    window.addEventListener('scroll', markDirty, { passive: true });
    window.addEventListener('resize', markDirty);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', markDirty);
      window.removeEventListener('resize', markDirty);
    };
  }, [containerRef]);
}
