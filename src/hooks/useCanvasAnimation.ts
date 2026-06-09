import { useEffect, useRef } from 'react';

type DrawFn = (ctx: CanvasRenderingContext2D, t: number, dims: { w: number; h: number; dpr: number }) => void;

interface Options {
  /** roda mesmo fora da viewport (default: false) */
  alwaysRun?: boolean;
  /** frame estático a desenhar quando prefers-reduced-motion (em ms) */
  reducedMotionFreezeAt?: number;
}

/**
 * Monta um <canvas> responsivo (DPR-aware), roda `draw` num loop de RAF
 * apenas enquanto visível (IntersectionObserver) e respeita prefers-reduced-motion.
 * Retorna a ref a anexar ao <canvas>.
 */
export function useCanvasAnimation(draw: DrawFn, options: Options = {}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const { alwaysRun = false, reducedMotionFreezeAt } = options;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let start = 0;
    let visible = alwaysRun;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    const frame = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      draw(ctx, t, { w: canvas.width, h: canvas.height, dpr });
      raf = requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (raf) return;
      if (reduced) {
        // desenha um único frame estático
        draw(ctx, reducedMotionFreezeAt ?? 0, { w: canvas.width, h: canvas.height, dpr });
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    const stopLoop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startLoop();
        else stopLoop();
      },
      { rootMargin: '0px' }
    );
    if (!alwaysRun) io.observe(canvas);
    if (alwaysRun || visible) startLoop();

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
    };
  }, [draw, alwaysRun, reducedMotionFreezeAt]);

  return ref;
}
