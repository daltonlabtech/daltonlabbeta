import { useCallback, useRef } from 'react';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';

/* ============================================================
   HERO VIZ — Mobile-first agentic org motion
   Port of the vanilla-JS `hero-merge.js` canvas loop.
   Phase 1: 5 rows × 4 columns of person icons (straight grid)
   Phase 2: All icons converge into a single person (hub) + cyan halo
   Phase 3: A single vertical line + AI star icons appear below hub
   Loops continuously (~12s). Honors prefers-reduced-motion by
   freezing inside phase 2 (ph = 0.85).
   ============================================================ */

// --- color palette (verbatim from source) ---
const GHOST: number[] = [142, 180, 212];
const CYAN: number[] = [143,230,255];
const SOFT: number[] = [94, 200, 240];
const WHITE: number[] = [226, 240, 252];
const STAR_C: number[][] = [
  [143,230,255],
  [56, 189, 250],
  [94, 200, 240],
  [143,230,255],
  [56, 189, 250],
];

// --- math helpers (verbatim from source) ---
const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const CYCLE = 12; // seconds per full loop
const FROZEN_PH = 0.85; // phase position used when motion is reduced

interface GridPoint {
  x: number;
  y: number;
  ph: number;
}
interface Hub {
  x: number;
  y: number;
}
interface Star {
  x: number;
  y: number;
  col: number[];
  appear: number;
}

interface HeroMergeCanvasProps {
  /** optional className passed to the <canvas> element */
  className?: string;
}

export default function HeroMergeCanvas({ className }: HeroMergeCanvasProps) {
  // Per-instance scene state, rebuilt whenever CSS dimensions change.
  const layoutRef = useRef<{
    w: number;
    h: number;
    grid: GridPoint[];
    hub: Hub;
    stars: Star[];
  }>({ w: 0, h: 0, grid: [], hub: { x: 0, y: 0 }, stars: [] });

  // Detect reduced motion once for the closure (the hook draws a single
  // static frame in that case; we also need it to zero out the breathing
  // wobble and the travelling dot — matching the original `frozen()`).
  const reducedRef = useRef<boolean>(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  /* ---- layout (verbatim constants from source `build()`) ---- */
  const build = useCallback((w: number, h: number) => {
    const COLS = 4;
    const ROWS = 5;
    const cellW = w / COLS;
    const cellH = h / ROWS;

    // Hub: center-x, first-row center y
    const hub: Hub = { x: w * 0.5, y: cellH * 0.5 };

    // Grid: straight aligned rows and columns
    const grid: GridPoint[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        grid.push({
          x: cellW * (c + 0.5), // exact column center — perfectly straight
          y: cellH * (r + 0.5),
          ph: (r * COLS + c) / (ROWS * COLS), // stagger phase for breathing
        });
      }
    }

    // Stars: single vertical column below hub
    const N_STARS = 4;
    const starGap = cellH * 0.85;
    const lineStart = hub.y + cellH * 0.72; // start of line below hub
    const stars: Star[] = [];
    for (let i = 0; i < N_STARS; i++) {
      stars.push({
        x: hub.x,
        y: lineStart + starGap * i,
        col: STAR_C[i % STAR_C.length],
        appear: 0.46 + i * 0.04,
      });
    }

    layoutRef.current = { w, h, grid, hub, stars };
  }, []);

  const draw = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      t: number,
      dims: { w: number; h: number; dpr: number }
    ) => {
      const { dpr } = dims;
      // The hook hands us DEVICE-PIXEL backing dimensions and does NOT scale
      // the context. The original worked in CSS pixels with a one-time
      // ctx.setTransform(dpr,...). We reproduce that here so every constant
      // below stays in CSS-pixel space, verbatim.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = dims.w / dpr;
      const h = dims.h / dpr;

      // (Re)build layout when CSS size changes.
      const layout = layoutRef.current;
      if (layout.w !== w || layout.h !== h) {
        build(w, h);
      }
      const { grid, hub, stars } = layoutRef.current;

      const frozen = reducedRef.current;
      // Original uses its own clock `now` (ms). Here `t` is ms since first
      // frame; `now/1000` -> `t/1000`.
      const now = t;
      const ph = frozen ? FROZEN_PH : ((now / 1000) % CYCLE) / CYCLE;

      ctx.clearRect(0, 0, w, h);

      // icon size — fills ~4 per row width
      const s = (w / 4) * 0.62;

      /* ---- draw helpers (closures over ctx) ---- */
      const drawPerson = (x: number, y: number, size: number, col: number[], a: number) => {
        if (a <= 0.01) return;
        ctx.fillStyle = rgba(col, a);
        // head
        ctx.beginPath();
        ctx.arc(x, y - size * 0.36, size * 0.28, 0, Math.PI * 2);
        ctx.fill();
        // shoulders
        ctx.beginPath();
        ctx.ellipse(x, y + size * 0.4, size * 0.44, size * 0.38, 0, Math.PI, 2 * Math.PI);
        ctx.fill();
      };

      const drawStar = (x: number, y: number, r: number, col: number[], a: number) => {
        if (a <= 0.01) return;
        // 4-point sparkle
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const ang = -Math.PI / 2 + (i * Math.PI) / 4;
          const rad = i % 2 === 0 ? r : r * 0.38;
          const px = x + Math.cos(ang) * rad;
          const py = y + Math.sin(ang) * rad;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = rgba(col, a);
        ctx.fill();
        // glow
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
        g.addColorStop(0, rgba(col, 0.3 * a));
        g.addColorStop(1, rgba(col, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
        ctx.fill();
      };

      // overall scene fade-out before reset
      const sceneFade = ph > 0.9 ? 1 - (ph - 0.9) / 0.1 : 1;

      // --- Phase 1: grid of person icons ---
      // fade in: 0→0.04 | display: 0.04→0.18 | converge: 0.18→0.34
      const moveP = easeIO(clamp((ph - 0.18) / 0.16, 0, 1));
      const fadeIn = clamp(ph / 0.04, 0, 1);

      for (const p of grid) {
        const bx = frozen ? 0 : Math.sin((now / 1000) * 0.3 + p.ph * 6.28) * 2;
        const by = frozen ? 0 : Math.cos((now / 1000) * 0.25 + p.ph * 6.28) * 2;

        const x = lerp(p.x + bx, hub.x, moveP);
        const y = lerp(p.y + by, hub.y, moveP);

        let a = fadeIn;
        a *= 1 - clamp((moveP - 0.55) / 0.45, 0, 1);
        a *= sceneFade;

        drawPerson(x, y, s, GHOST, 0.52 * a);
      }

      // --- Phase 2: merged hub person ---
      const hubA = easeOut(clamp((ph - 0.32) / 0.1, 0, 1)) * sceneFade;
      if (hubA > 0) {
        const halo = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, s * 2.8);
        halo.addColorStop(0, rgba(CYAN, 0.28 * hubA));
        halo.addColorStop(1, rgba(CYAN, 0));
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, s * 2.8, 0, Math.PI * 2);
        ctx.fill();

        drawPerson(hub.x, hub.y, s * 1.15, WHITE, hubA);
      }

      // --- Phase 3: single vertical line + stars ---
      const lineProg = easeOut(clamp((ph - 0.4) / 0.22, 0, 1));
      if (hubA > 0.1 && lineProg > 0 && stars.length > 0) {
        const lineEnd = stars[stars.length - 1].y;
        const lineTop = hub.y + s * 0.78;
        const curEnd = lerp(lineTop, lineEnd, lineProg);

        ctx.strokeStyle = rgba(CYAN, 0.4 * sceneFade);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(hub.x, lineTop);
        ctx.lineTo(hub.x, curEnd);
        ctx.stroke();

        if (!frozen && lineProg > 0.2) {
          const f = ((now / 1000) * 0.3) % 1;
          const py = lerp(lineTop, curEnd, f);
          ctx.fillStyle = rgba(SOFT, 0.85 * sceneFade);
          ctx.beginPath();
          ctx.arc(hub.x, py, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        const starR = s * 0.48;
        for (const st of stars) {
          const a = easeOut(clamp((ph - st.appear) / 0.08, 0, 1)) * sceneFade;
          if (a > 0) drawStar(st.x, st.y, starR, st.col, a);
        }
      }
    },
    [build]
  );

  // Freeze inside phase 2: ph = 0.85 -> 0.85 * 12s = 10.2s = 10200ms.
  const ref = useCanvasAnimation(draw, { reducedMotionFreezeAt: FROZEN_PH * CYCLE * 1000 });

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
