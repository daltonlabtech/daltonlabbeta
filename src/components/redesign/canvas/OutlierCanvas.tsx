import { useCallback, useRef } from 'react';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';

/* ============================================================
   FINAL CTA — "Outlier" bell-curve visualization
   The great mass under a Gaussian, one glowing outlier apart.
   Ported VERBATIM (geometry/math/constants) from the original
   vanilla-JS `js/cta-outlier.js`.

   NOTE on coordinate space:
   - useCanvasAnimation passes `w`/`h` as DEVICE-PIXEL dims
     (canvas.width/height, already × dpr) and does NOT ctx.scale.
   - The original draws in CSS pixels with ctx.setTransform(dpr,...).
   - To keep the constants identical, we derive CSS dims (w/dpr,
     h/dpr) for all geometry and apply the dpr transform ourselves
     at the start of each frame.
   - The hook's `t` is in MILLISECONDS; the original used SECONDS,
     so we convert with t / 1000. The reduced-motion freeze value
     was 2.2s in the original → reducedMotionFreezeAt: 2200 (ms).
   ============================================================ */

const C = {
  cyan: [143,230,255],
  soft: [94, 200, 240],
  deep: [58, 159, 213],
  dim: [142, 180, 212],
} as const;

type RGB = readonly [number, number, number];
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

interface Dot {
  x: number;
  y: number;
  r: number;
  ph: number;
  sp: number;
}

interface Geo {
  baseline: number;
  peak: number;
  cx: number;
  sigma: number;
  x0: number;
  x1: number;
  ox: number;
  oy: number;
}

export default function OutlierCanvas({ className }: { className?: string }) {
  // Per-instance state lives in refs so it survives across frames.
  // `dots`/`geo` are rebuilt whenever the CSS dimensions change.
  const geoRef = useRef<Geo>({
    baseline: 0,
    peak: 0,
    cx: 0,
    sigma: 0,
    x0: 0,
    x1: 0,
    ox: 0,
    oy: 0,
  });
  const dotsRef = useRef<Dot[]>([]);
  const sizeRef = useRef<{ w: number; h: number }>({ w: -1, h: -1 });

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      tMs: number,
      { w: dw, h: dh, dpr }: { w: number; h: number; dpr: number },
    ) => {
      // Work in CSS pixels (the space the original constants assume).
      const w = dw / dpr;
      const h = dh / dpr;

      // Apply the dpr transform ourselves (hook does not scale).
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const geo = geoRef.current;

      // Rebuild geometry + scattered dots when the (CSS) size changes.
      if (sizeRef.current.w !== w || sizeRef.current.h !== h) {
        sizeRef.current = { w, h };

        geo.baseline = h * 0.82;
        geo.peak = h * 0.58;
        geo.cx = w * 0.6;
        geo.sigma = w * 0.12;
        geo.x0 = w * 0.34;
        geo.x1 = w * 0.88;
        geo.ox = w * 0.9;
        geo.oy = h * 0.4;

        const gauss = (x: number) =>
          geo.baseline - geo.peak * Math.exp(-((x - geo.cx) ** 2) / (2 * geo.sigma ** 2));

        // scatter "the great mass" dots under the curve
        const dots: Dot[] = [];
        let seed = 7;
        const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
        const N = Math.round(w / 9);
        for (let i = 0; i < N; i++) {
          const gx = geo.cx + (rnd() - 0.5) * geo.sigma * 4.4;
          if (gx < geo.x0 || gx > geo.x1) continue;
          const top = gauss(gx);
          const gy = top + (geo.baseline - top) * (0.08 + rnd() * 0.9);
          dots.push({ x: gx, y: gy, r: 1.3 + rnd() * 2.2, ph: rnd() * 6.28, sp: 0.6 + rnd() * 1.4 });
        }
        dotsRef.current = dots;
      }

      const gauss = (x: number) =>
        geo.baseline - geo.peak * Math.exp(-((x - geo.cx) ** 2) / (2 * geo.sigma ** 2));

      // The hook already freezes at reducedMotionFreezeAt (2200ms) for
      // prefers-reduced-motion (single static frame). Convert ms → s.
      const t = tMs / 1000;

      ctx.clearRect(0, 0, w, h);

      // baseline
      ctx.strokeStyle = rgba(C.dim, 0.22);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(geo.x0, geo.baseline + 0.5);
      ctx.lineTo(w * 0.96, geo.baseline + 0.5);
      ctx.stroke();

      // bell curve fill
      ctx.beginPath();
      ctx.moveTo(geo.x0, geo.baseline);
      for (let x = geo.x0; x <= geo.x1; x += 2) ctx.lineTo(x, gauss(x));
      ctx.lineTo(geo.x1, geo.baseline);
      ctx.closePath();
      const fg = ctx.createLinearGradient(0, geo.baseline - geo.peak, 0, geo.baseline);
      fg.addColorStop(0, rgba(C.cyan, 0.14));
      fg.addColorStop(1, rgba(C.cyan, 0.01));
      ctx.fillStyle = fg;
      ctx.fill();

      // bell curve stroke (glow)
      ctx.beginPath();
      ctx.moveTo(geo.x0, gauss(geo.x0));
      for (let x = geo.x0; x <= geo.x1; x += 2) ctx.lineTo(x, gauss(x));
      ctx.strokeStyle = rgba(C.soft, 0.85);
      ctx.lineWidth = 2;
      ctx.shadowColor = rgba(C.cyan, 0.7);
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // the great mass — scattered dots, gentle twinkle
      for (const d of dotsRef.current) {
        const a = 0.35 + 0.35 * (0.5 + 0.5 * Math.sin(t * d.sp + d.ph));
        ctx.fillStyle = rgba(C.soft, a);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 7);
        ctx.fill();
      }

      // the outlier — glowing node with pulsing rings
      const ox = geo.ox;
      const oy = geo.oy;
      const halo = ctx.createRadialGradient(ox, oy, 0, ox, oy, 46);
      halo.addColorStop(0, rgba(C.cyan, 0.55));
      halo.addColorStop(1, rgba(C.cyan, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(ox, oy, 46, 0, 7);
      ctx.fill();

      for (let i = 0; i < 2; i++) {
        const rp = (t * 0.5 + i * 0.5) % 1;
        ctx.strokeStyle = rgba(C.soft, 0.55 * (1 - rp));
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ox, oy, 10 + rp * 30, 0, 7);
        ctx.stroke();
      }
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(ox, oy, 9, 0, 7);
      ctx.fill();
      ctx.fillStyle = rgba(C.soft, 0.95);
      ctx.beginPath();
      ctx.arc(ox, oy, 6, 0, 7);
      ctx.fill();
    },
    [],
  );

  const ref = useCanvasAnimation(draw, { reducedMotionFreezeAt: 2200 });

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
