import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCanvasAnimation } from '@/hooks/useCanvasAnimation';

/* ============================================================
   AGENTIC ORG CHART — canvas showpiece + live ticker
   Faithful React/TS port of the vanilla-JS `orgchart.js`.

   The ORIGINAL is a pure-<canvas> render: CEO at top → 4 leads
   (Vendas / Marketing / Pessoas / Produto) → colored agent
   bubbles in a grid, with a staggered entrance, traveling
   "flow" pulses along the connector edges, orbiting satellite
   dots and a breathing pulse on each node. A separate DOM
   element (#orgTickerVal) shows a live, incrementing task count.

   FIDELITY NOTE (read me): the project's CSS still ships dead
   rules for an `.org-links` SVG overlay and DOM `.agent`/`.node`
   elements with `.active/.warn/.off` states + `data-anim`/
   `data-density` — but those belong to an EARLIER DOM-based
   version. The shipped `orgchart.js` (the source of truth) draws
   ALL of it — nodes, edges AND the dasharray-style traveling
   pulses — inside the canvas. To preserve the actual visual
   result we keep the connectors + pulses on the canvas (no SVG
   overlay), and reproduce the entrance, density and orbit motion
   verbatim. Agent state (active/warn/off) is still modeled as
   data and tints the canvas colors + glow, matching the legend
   palette (--cyan / --orange / --offline).
   ============================================================ */

/* ---- palette (vibrant agents on navy) — verbatim from source ---- */
const COL = {
  blue: [143,230,255],
  sky: [56, 189, 250],
  teal: [22, 196, 178],
  green: [42, 200, 140],
  violet: [139, 120, 246],
  magenta: [236, 96, 168],
  amber: [240, 176, 80],
  red: [240, 96, 96],
  ghost: [142, 180, 212],
} as const;

// Agent-state accents (mirror the CSS legend: --cyan / --orange / --offline)
const WARN_C: number[] = [240, 160, 76]; // --orange
const OFF_C: number[] = [74, 96, 125]; // --offline

const WHITE: number[] = [230, 242, 252];

const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* ---- logical canvas coords (verbatim) ---- */
const W = 1480;
const H = 740;
const ENTRANCE_MS = 1900;

type AgentState = 'active' | 'warn' | 'off';

interface AgentSpec {
  l: string;
  cap: string;
  c: readonly number[];
  base: number;
  /** state drives color/glow + whether it bubbles tasks (off = idle) */
  state?: AgentState;
}
interface DeptSpec {
  label: string;
  lead: string;
  role: string;
  agents: AgentSpec[];
}

/* ---- structure (4 departments for readability) — verbatim ---- */
const DEFAULT_DEPTS: DeptSpec[] = [
  {
    label: 'Vendas',
    lead: 'VP',
    role: 'VP Sales',
    agents: [
      { l: 'S', cap: 'SDR Agent', c: COL.green, base: 3120, state: 'active' },
      { l: 'C', cap: 'CRM Agent', c: COL.teal, base: 2040, state: 'active' },
      { l: 'P', cap: 'Proposal', c: COL.sky, base: 760, state: 'active' },
    ],
  },
  {
    label: 'Marketing',
    lead: 'CMO',
    role: 'CMO',
    agents: [
      { l: 'C', cap: 'Content', c: COL.amber, base: 1840, state: 'active' },
      { l: 'B', cap: 'Benchmark', c: COL.magenta, base: 610, state: 'active' },
    ],
  },
  {
    label: 'Pessoas',
    lead: 'RH',
    role: 'CHRO',
    agents: [
      { l: 'R', cap: 'Recruiter', c: COL.violet, base: 540, state: 'active' },
      { l: 'O', cap: 'Onboarding', c: COL.teal, base: 612, state: 'active' },
      { l: 'C', cap: 'Cultura', c: COL.magenta, base: 430, state: 'active' },
    ],
  },
  {
    label: 'Produto',
    lead: 'CTO',
    role: 'CTO',
    agents: [
      { l: 'Q', cap: 'QA Agent', c: COL.red, base: 5290, state: 'active' },
      { l: 'M', cap: 'Monitor', c: COL.blue, base: 2140, state: 'active' },
    ],
  },
];

/* ---- scene model (mirrors source layout()) ---- */
interface Node {
  x: number;
  y: number;
  r: number;
  app: number;
  label: string;
  c: readonly number[];
  sat: number;
  isCeo?: boolean;
  isLead?: boolean;
  isAgent?: boolean;
  role?: string;
  deptLabel?: string;
  cap?: string;
  base?: number;
  state?: AgentState;
}
interface Edge {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  app: number;
  c: readonly number[];
  speed: number;
  off: number;
}

function makeEdge(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  app: number,
  c: readonly number[],
  speed: number
): Edge {
  return { x0, y0, x1, y1, app, c, speed, off: Math.random() };
}

// Resolve an agent's effective color from its state (verbatim palette → legend tint).
const agentColor = (a: AgentSpec): readonly number[] => {
  if (a.state === 'warn') return WARN_C;
  if (a.state === 'off') return OFF_C;
  return a.c;
};

/**
 * Build the node/edge scene in LOGICAL coordinates (W×H), keyed to the
 * current logical width `logW` (which encodes the responsive density:
 * desktop = W, mobile = W/2 so everything renders 2× larger).
 */
function buildScene(depts: DeptSpec[], logW: number) {
  const padX = 58;
  const padR = 58;
  const usable = logW - padX - padR;
  const colW = usable / depts.length;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const ceo: Node = {
    x: logW / 2,
    y: 112,
    r: 42,
    app: 0,
    label: 'CEO',
    isCeo: true,
    c: COL.blue,
    sat: Math.random() * 6.28,
  };

  depts.forEach((dep, di) => {
    const x = padX + colW * (di + 0.5);
    const lead: Node = {
      x,
      y: 300,
      r: 33,
      app: 0.12 + di * 0.025,
      label: dep.lead,
      role: dep.role,
      deptLabel: dep.label,
      isLead: true,
      c: COL.ghost,
      sat: Math.random() * 6.28,
    };
    nodes.push(lead);
    // CEO -> lead
    edges.push(
      makeEdge(ceo.x, ceo.y + ceo.r, x, lead.y - lead.r, 0.16 + di * 0.02, COL.blue, 0.55 + di * 0.07)
    );

    let prev: Node = lead;
    const startY = 432;
    const gap = 130;
    dep.agents.forEach((ag, ai) => {
      const ny = startY + gap * ai;
      const c = agentColor(ag);
      const node: Node = {
        x,
        y: ny,
        r: 30,
        app: 0.4 + ai * 0.12 + di * 0.015,
        label: ag.l,
        cap: ag.cap,
        c,
        base: ag.base,
        state: ag.state ?? 'active',
        isAgent: true,
        sat: Math.random() * 6.28,
      };
      nodes.push(node);
      edges.push(makeEdge(prev.x, prev.y + prev.r, x, ny - node.r, node.app - 0.05, c, 0.7 + ai * 0.1));
      prev = node;
    });
  });

  return { ceo, nodes, edges };
}

interface AgenticOrgChartProps {
  /** Override the department/agent structure (defaults to the verbatim source data). */
  depts?: DeptSpec[];
  /** Locale for the ticker number formatting (pt → pt-BR, otherwise en-US). */
  lang?: string;
  className?: string;
}

export default function AgenticOrgChart({
  depts = DEFAULT_DEPTS,
  lang = 'pt',
  className,
}: AgenticOrgChartProps) {
  const reducedRef = useRef<boolean>(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Responsive density: < 640px CSS width uses half the logical width, so
  // nodes render 2× larger (source: `logW = cssW < 640 ? W/2 : W`). We track
  // it in state because it also flips the canvas aspect-ratio.
  const [isDense, setIsDense] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const logW = isDense ? W / 2 : W;

  useEffect(() => {
    const onResize = () => setIsDense(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Scene is rebuilt whenever the structure or density changes. Kept in a ref
  // so the memoized draw closure always reads the latest without re-creating
  // the RAF loop on every frame.
  const sceneRef = useRef(buildScene(depts, logW));
  useEffect(() => {
    sceneRef.current = buildScene(depts, logW);
  }, [depts, logW]);

  /* ---- entrance clock ---- */
  // Source latches `startT` on first intersection and clamps progress over
  // 1900ms. The canvas hook already gates the RAF loop on visibility, so the
  // first frame `t` (ms since first frame) is effectively "time since visible"
  // — we reuse it directly as the entrance clock.
  const progress = useCallback((t: number) => {
    if (reducedRef.current) return 1;
    return clamp(t / ENTRANCE_MS, 0, 1);
  }, []);
  const appAlpha = (app: number, p: number) => easeOut(clamp((p - app) / 0.2, 0, 1));

  /* ---- person / star glyphs (verbatim from source) ---- */
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, tMs: number, dims: { w: number; h: number; dpr: number }) => {
      // The hook gives DEVICE-PIXEL backing dims and does NOT scale the ctx.
      // The original drew in a fixed logical space (W×H) via a single
      // setTransform(dpr*scale, ...), where scale = cssW / logW. The backing
      // width here already equals cssW * dpr, so scale = backingW / logW maps
      // logical coords → device pixels AND folds in dpr in one transform.
      const scale = dims.w / logW;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      const frozen = reducedRef.current;
      const t = tMs / 1000; // seconds, matches source `now/1000`
      const p = progress(tMs);
      const { ceo, nodes, edges } = sceneRef.current;

      // clearRect in logical space (the transform handles the rest)
      ctx.clearRect(0, 0, logW, H);

      const iconPerson = (x: number, y: number, s: number, a: number) => {
        ctx.fillStyle = rgba(WHITE, a);
        ctx.beginPath();
        ctx.arc(x, y - s * 0.32, s * 0.3, 0, 7);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x, y + s * 0.44, s * 0.46, s * 0.4, 0, Math.PI, 2 * Math.PI);
        ctx.fill();
      };
      const iconStar = (x: number, y: number, s: number, a: number) => {
        ctx.beginPath();
        const spikes = 4;
        const outer = s;
        const inner = s * 0.4;
        for (let i = 0; i < spikes * 2; i++) {
          const rr = i % 2 ? inner : outer;
          const ang = -Math.PI / 2 + (i * Math.PI) / spikes;
          const px = x + Math.cos(ang) * rr;
          const py = y + Math.sin(ang) * rr;
          if (i) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = rgba(WHITE, a);
        ctx.fill();
      };

      const drawEdge = (e: Edge) => {
        const a = appAlpha(e.app, p);
        if (a <= 0) return;
        const dx = e.x1 - e.x0;
        const dy = e.y1 - e.y0;
        const fr = a; // draw-in fraction follows alpha
        const ex = e.x0 + dx * fr;
        const ey = e.y0 + dy * fr;
        ctx.strokeStyle = rgba(e.c, 0.22 * a);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(e.x0, e.y0);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        // traveling pulse (flow) once fully drawn — the canvas equivalent of
        // the legacy CSS stroke-dasharray "draw" + traveling highlight.
        if (p > 0.98 && !frozen) {
          const f = (t * e.speed * 0.42 + e.off) % 1;
          const px = e.x0 + dx * f;
          const py = e.y0 + dy * f;
          const g = ctx.createRadialGradient(px, py, 0, px, py, 9);
          g.addColorStop(0, rgba(e.c, 0.9));
          g.addColorStop(1, rgba(e.c, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, 9, 0, 7);
          ctx.fill();
          ctx.fillStyle = rgba([255, 255, 255], 0.85);
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, 7);
          ctx.fill();
        }
      };

      const drawNode = (n: Node) => {
        const a = appAlpha(n.app, p);
        if (a <= 0) return;
        const c = n.c || COL.ghost;
        // 'off' agents read dimmer overall (mirrors `.agent.off { opacity:.48 }`)
        const stateMul = n.state === 'off' ? 0.48 : 1;
        const pulse = frozen ? 1 : 1 + 0.04 * Math.sin(t * 0.9 + n.sat);
        const r = n.r * (0.82 + 0.18 * easeOut(a)) * pulse;
        const aa = a * stateMul;

        if (n.isAgent || n.isCeo) {
          // glow halo
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.3);
          g.addColorStop(0, rgba(c, 0.42 * aa));
          g.addColorStop(1, rgba(c, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 2.3, 0, 7);
          ctx.fill();
          // disc
          ctx.fillStyle = rgba([8, 18, 34], 0.85 * aa);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, 7);
          ctx.fill();
          // ring
          ctx.strokeStyle = rgba(c, 0.95 * aa);
          ctx.lineWidth = 2.1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, 7);
          ctx.stroke();
        } else {
          // lead: thin ghost ring
          ctx.fillStyle = rgba([10, 22, 40], 0.7 * aa);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, 7);
          ctx.fill();
          ctx.strokeStyle = rgba(COL.ghost, 0.5 * aa);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, 7);
          ctx.stroke();
        }

        // orbiting satellite dot
        if (a > 0.4) {
          const ang = frozen ? n.sat : n.sat + t * 0.35;
          const ox = n.x + Math.cos(ang) * (r + 6);
          const oy = n.y + Math.sin(ang) * (r + 6);
          ctx.fillStyle = rgba(c, 0.9 * aa);
          ctx.beginPath();
          ctx.arc(ox, oy, 2.4, 0, 7);
          ctx.fill();
        }

        // glyph: star for AI agents, person for humans (CEO + leads)
        if (n.isAgent) iconStar(n.x, n.y, r * 0.6, aa);
        else iconPerson(n.x, n.y, r * 0.92, aa);

        ctx.globalAlpha = aa;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (n.isCeo) {
          ctx.fillStyle = rgba(COL.ghost, 0.9);
          ctx.font = '600 13px "JetBrains Mono", monospace';
          ctx.fillText('CEO', n.x, n.y + n.r + 20);
        }
        if (n.isLead) {
          ctx.fillStyle = rgba(COL.ghost, 0.85);
          ctx.font = '600 13px "JetBrains Mono", monospace';
          ctx.fillText(n.deptLabel ?? '', n.x, n.y - n.r - 26);
          ctx.fillStyle = rgba(COL.ghost, 0.6);
          ctx.font = '500 12px "JetBrains Mono", monospace';
          ctx.fillText(n.role ?? '', n.x, n.y + n.r + 18);
        }
        if (n.isAgent) {
          ctx.fillStyle = rgba(COL.ghost, 0.72);
          ctx.font = '500 12.5px "JetBrains Mono", monospace';
          ctx.fillText(n.cap ?? '', n.x, n.y + n.r + 17);
        }
        ctx.globalAlpha = 1;
      };

      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      edges.forEach(drawEdge);
      nodes.forEach(drawNode);
      drawNode(ceo);
    },
    [logW, progress]
  );

  // Freeze a fully-entered, mid-motion frame under prefers-reduced-motion.
  const canvasRef = useCanvasAnimation(draw, { reducedMotionFreezeAt: ENTRANCE_MS });

  /* ---- live ticker (DOM, React state) ---- */
  const fmt = useMemo(() => {
    const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
    return (n: number) => n.toLocaleString(locale);
  }, [lang]);

  // Per-agent live counts; flattened in render order so the total is stable.
  const initialCounts = useMemo(
    () => depts.flatMap((d) => d.agents.map((a) => ({ base: a.base, state: a.state ?? 'active' }))),
    [depts]
  );
  const initialTotal = useMemo(
    () => initialCounts.reduce((s, a) => s + a.base, 0),
    [initialCounts]
  );
  const [tickerTotal, setTickerTotal] = useState<number>(initialTotal);

  // Keep total in sync if the structure changes.
  useEffect(() => {
    setTickerTotal(initialTotal);
  }, [initialTotal]);

  useEffect(() => {
    // Reduced motion: show the static total, never tick.
    if (reducedRef.current) return;
    const counts = initialCounts.map((a) => ({ ...a }));
    const id = setInterval(() => {
      let added = 0;
      counts.forEach((a) => {
        // 'off' agents are idle and never bubble tasks; others 50% chance.
        if (a.state !== 'off' && Math.random() < 0.5) {
          added += 1 + Math.floor(Math.random() * 6);
        }
      });
      if (added) setTickerTotal((prev) => prev + added);
    }, 1100);
    return () => clearInterval(id);
  }, [initialCounts]);

  // Match the source's responsive logical aspect ratio so the canvas element
  // reserves the right height (the hook reads getBoundingClientRect()).
  const aspectRatio = `${logW} / ${H}`;

  return (
    <div className={className}>
      <div className="org-stage" style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          className="org-canvas"
          style={{ display: 'block', width: '100%', height: 'auto', aspectRatio }}
          aria-hidden="true"
        />
      </div>

      <div
        className="org-ticker-live"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginTop: 22,
          fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", monospace',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: 'rgba(245, 243, 240, 0.6)',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#3B82F6',
            boxShadow: '0 0 10px #3B82F6',
            animation: reducedRef.current ? 'none' : 'orgTickerBlink 1.6s ease-in-out infinite',
          }}
        />
        <span>Operação ao vivo —</span>
        <b style={{ color: '#F5F3F0', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {fmt(tickerTotal)}
        </b>
        <span>tarefas processadas hoje</span>
      </div>

      {/* keyframes for the ticker pulse (scoped, no global CSS dependency) */}
      <style>{`@keyframes orgTickerBlink { 0%,100%{opacity:1} 50%{opacity:.25} } @media (max-width: 640px){ .org-ticker-live{ display:none !important; } }`}</style>
    </div>
  );
}

export type { AgentSpec, DeptSpec, AgentState };
