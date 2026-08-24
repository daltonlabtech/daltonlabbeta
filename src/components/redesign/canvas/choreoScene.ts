/**
 * Cena da coreografia do organograma (dobras 1–3 da home) — port fiel do
 * script do protótipo (design-reference/site-novo/desktop.html).
 *
 * Um organograma hierárquico é revelado, "floresce" agentes de IA em torno de
 * cada pessoa e termina no zoom sobre o time de uma pessoa só. O progresso P
 * (0–1) vem do scroll (useScrollScrub); tudo é desenhado em canvas 2D.
 */

export interface ChoreoLabels {
  /** Rótulos das 4 áreas (ex.: "Diretor de RH", "Marketing", "VP de CS", "Jurídico") */
  areas: string[];
  /** Nomes dos 4 agentes do foco (ex.: "Recrutamento", "Onboarding"…) */
  focusAgents: string[];
}

interface Person {
  lvl: number;
  area: number;
  parent?: number;
  label: string | null;
  x: number;
  y: number;
  focus?: boolean;
}

interface AgentDot {
  host: number;
  k: number;
  n: number;
  color: string;
  name: string | null;
}

const PASTEL = ['#c9b8ff', '#a8f0cf', '#ffb8d9', '#ff9e9e'];
const TOP_COLOR = '#a8d8ff';
const MONO_FONT = '"JetBrains Mono","Cascadia Code","SF Mono",monospace';

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}
function seg(P: number, a: number, b: number) {
  return clamp((P - a) / (b - a), 0, 1);
}
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function drawPerson(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  alpha: number,
  ring: boolean,
) {
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 6.2832);
  ctx.lineWidth = ring ? 1.4 : 1;
  ctx.strokeStyle = ring ? 'rgba(143,230,255,.85)' : 'rgba(195,210,226,.42)';
  if (ring) {
    ctx.shadowColor = 'rgba(143,230,255,.7)';
    ctx.shadowBlur = 14;
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
  const g = r * 0.42;
  ctx.strokeStyle = ring ? 'rgba(230,244,252,.95)' : 'rgba(195,210,226,.55)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(x, y - g * 0.5, g * 0.46, 0, 6.2832);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y + g * 1.05, g * 0.86, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string,
  alpha: number,
) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  const k = r * 0.26;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x + k, y - k, x + r, y);
  ctx.quadraticCurveTo(x + k, y + k, x, y + r);
  ctx.quadraticCurveTo(x - k, y + k, x - r, y);
  ctx.quadraticCurveTo(x - k, y - k, x, y - r);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  y: number,
  text: string,
  color: string,
  alpha: number,
  size: number,
  W: number,
  anchorX: number,
  gap: number,
) {
  if (alpha <= 0.03) return;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.font = `${size}px ${MONO_FONT}`;
  ctx.textBaseline = 'middle';
  const w = ctx.measureText(text).width;
  if (anchorX + gap + w > W * 0.97) {
    ctx.textAlign = 'right';
    ctx.fillText(text, anchorX - gap, y);
  } else {
    ctx.textAlign = 'left';
    ctx.fillText(text, anchorX + gap, y);
  }
  ctx.textAlign = 'left';
  ctx.globalAlpha = 1;
}

export function createChoreoScene(labels: ChoreoLabels) {
  let people: Person[] = [];
  let agents: AgentDot[] = [];
  let families: Record<number, number[]> = {};
  let W = 0;
  let H = 0;
  let portrait = false;
  const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);

  function buildModel(isPortrait: boolean) {
    people = [];
    agents = [];
    people.push({ lvl: 0, area: -1, label: null, x: 0.5, y: 0.15 });
    if (!isPortrait) {
      const xs = [0.17, 0.39, 0.61, 0.83];
      for (let a = 0; a < 4; a++)
        people.push({ lvl: 1, area: a, parent: 0, label: labels.areas[a], x: xs[a], y: 0.46 });
      for (let b = 0; b < 4; b++) {
        people.push({ lvl: 2, area: b, parent: 1 + b, label: null, x: xs[b] - 0.075, y: 0.8 });
        people.push({ lvl: 2, area: b, parent: 1 + b, label: null, x: xs[b] + 0.075, y: 0.8 });
      }
      people[0].x = 0.5;
      people[0].y = 0.15;
    } else {
      const mx = [0.1, 0.37, 0.63, 0.9];
      people[0].x = 0.5;
      people[0].y = 0.12;
      for (let m = 0; m < 4; m++)
        people.push({ lvl: 1, area: m, parent: 0, label: labels.areas[m], x: mx[m], y: 0.44 });
      for (let d = 0; d < 4; d++) {
        people.push({ lvl: 2, area: d, parent: 1 + d, label: null, x: mx[d] - 0.055, y: 0.78 });
        people.push({ lvl: 2, area: d, parent: 1 + d, label: null, x: mx[d] + 0.055, y: 0.78 });
      }
    }
    people[1].focus = true;
    people.forEach((p, idx) => {
      const n = p.focus ? 4 : 3;
      for (let k = 0; k < n; k++) {
        agents.push({
          host: idx,
          k,
          n,
          color: p.focus ? PASTEL[k] : p.area < 0 ? TOP_COLOR : PASTEL[p.area],
          name: p.focus ? labels.focusAgents[k] : null,
        });
      }
    });
    families = {};
    people.forEach((p, i) => {
      if (p.parent === undefined) return;
      (families[p.parent] = families[p.parent] || []).push(i);
    });
  }

  function radiusOf(p: Person, S: number) {
    if (p.lvl === 0) return clamp(0.036 * S, 11, 30);
    if (p.lvl === 1) return clamp(0.03 * S, 10, 26);
    return clamp(0.024 * S, 8, 22);
  }

  /** Redimensiona o canvas (DPR-aware). Retorna true se as medidas mudaram. */
  function measure(cvs: HTMLCanvasElement): boolean {
    const r = cvs.getBoundingClientRect();
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    const was = portrait;
    portrait = w < 760;
    if (w === W && h === H && was === portrait) return false;
    W = w;
    H = h;
    cvs.width = Math.max(1, W * DPR);
    cvs.height = Math.max(1, H * DPR);
    const ctx = cvs.getContext('2d');
    if (ctx) ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (was !== portrait || !people.length) buildModel(portrait);
    return true;
  }

  function render(cvs: HTMLCanvasElement, P: number) {
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    if (W < 2 || H < 2) {
      if (!measure(cvs)) return;
    }
    ctx.clearRect(0, 0, W, H);

    const S = Math.min(W, H);
    const reveal = ease(seg(P, 0.0, 0.3));
    const bloom = ease(seg(P, 0.22, 0.62));
    const curve = ease(seg(P, 0.28, 0.68));
    const zoom = ease(seg(P, 0.7, 1.0));

    const padX = W * 0.06;
    const padY = H * 0.08;
    const usableH = (portrait ? 0.8 : 0.72) * H;
    const camS = lerp(1.5, 1.0, reveal);
    const camY = lerp(portrait ? 0.5 : 0.44, 0, reveal) * H;
    const colX = (portrait ? 0.34 : 0.3) * W;
    // Portrait: coluna comprimida para o 4º agente ficar ~0.58H (acima do
    // terço de baixo, onde vive o t3). Desktop segue a escala original.
    const colY = (portrait ? [0.18, 0.32, 0.46, 0.6] : [0.3, 0.475, 0.65, 0.825]).map(
      (f) => padY + f * usableH * 1.05,
    );

    function pos(p: Person): [number, number] {
      let x = padX + p.x * (W - 2 * padX);
      let y = padY + p.y * usableH;
      x = W / 2 + (x - W / 2) * camS;
      y = y * camS + camY;
      if (zoom > 0) {
        let tx: number, ty: number;
        if (p.focus) {
          tx = colX;
          ty = padY + 0.1 * usableH;
        } else {
          tx = W / 2 + (x - W / 2) * 1.1;
          ty = y * 1.06 - H * 0.03;
        }
        x = lerp(x, tx, zoom);
        y = lerp(y, ty, zoom);
      }
      return [x, y];
    }
    const PT = people.map(pos);

    /* linhas de reporte por família: ortogonais → orgânicas em crossfade */
    const GAP = 3;
    const nearest = PT.map((a, i) => {
      let best = 1e9;
      PT.forEach((b, j) => {
        if (i === j) return;
        const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
        if (d < best) best = d;
      });
      return best;
    });

    function family(pi: number) {
      const kids = families[pi];
      const pp = PT[pi];
      const pr = radiusOf(people[pi], S) + GAP;
      const ks = kids.map((i) => ({
        x: PT[i][0],
        y: PT[i][1],
        r: radiusOf(people[i], S) + GAP,
      }));
      const topKid = Math.min(...ks.map((k) => k.y - k.r));
      return { px: pp[0], py: pp[1] + pr, busY: (pp[1] + pr + topKid) / 2, ks };
    }

    function drawOrtho(alpha: number) {
      ctx.strokeStyle = `rgba(174,192,216,${alpha.toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.lineJoin = 'round';
      Object.keys(families).forEach((pk) => {
        const g = family(+pk);
        const ks = g.ks;
        ctx.beginPath();
        ctx.moveTo(g.px, g.py);
        ctx.lineTo(g.px, g.busY);
        ctx.stroke();
        if (ks.length === 1) {
          ctx.beginPath();
          ctx.moveTo(ks[0].x, g.busY);
          ctx.lineTo(ks[0].x, ks[0].y - ks[0].r);
          ctx.stroke();
          return;
        }
        const L = ks.reduce((a, b) => (b.x < a.x ? b : a));
        const R = ks.reduce((a, b) => (b.x > a.x ? b : a));
        const rad = Math.max(
          0,
          Math.min(12, Math.abs(R.x - L.x) / 2, Math.abs(L.y - L.r - g.busY) * 0.8),
        );
        ctx.beginPath();
        ctx.moveTo(L.x, L.y - L.r);
        ctx.lineTo(L.x, g.busY + rad);
        ctx.quadraticCurveTo(L.x, g.busY, L.x + rad, g.busY);
        ctx.lineTo(R.x - rad, g.busY);
        ctx.quadraticCurveTo(R.x, g.busY, R.x, g.busY + rad);
        ctx.lineTo(R.x, R.y - R.r);
        ctx.stroke();
        ks.forEach((k) => {
          if (k === L || k === R) return;
          ctx.beginPath();
          ctx.moveTo(k.x, g.busY);
          ctx.lineTo(k.x, k.y - k.r);
          ctx.stroke();
        });
      });
    }

    function drawOrganic(alpha: number) {
      ctx.strokeStyle = `rgba(162,182,206,${alpha.toFixed(3)})`;
      ctx.lineWidth = 1;
      people.forEach((p, i) => {
        if (p.parent === undefined) return;
        const a = PT[p.parent];
        const b = PT[i];
        const ar = radiusOf(people[p.parent], S) + GAP;
        const br = radiusOf(p, S) + GAP;
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const ax = a[0] + (dx / d) * ar;
        const ay = a[1] + (dy / d) * ar;
        const bx = b[0] - (dx / d) * br;
        const by = b[1] - (dy / d) * br;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo((ax + bx) / 2, (ay + by) / 2 + 24, bx, by);
        ctx.stroke();
      });
    }

    const baseA = 1 - zoom;
    const aOrtho = (1 - curve) * 0.4 * baseA;
    const aOrganic = curve * 0.3 * baseA;
    if (aOrtho > 0.012) drawOrtho(aOrtho);
    if (aOrganic > 0.012) drawOrganic(aOrganic);

    /* espinha vertical do estágio 3 */
    if (zoom > 0.25) {
      ctx.globalAlpha = ((zoom - 0.25) / 0.75) * 0.5;
      ctx.strokeStyle = 'rgba(162,182,206,.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(colX, PT[1][1]);
      ctx.lineTo(colX, colY[3]);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    /* agentes */
    agents.forEach((g) => {
      const host = people[g.host];
      const hp = PT[g.host];
      const alpha = bloom * (host.focus ? 1 : 1 - zoom);
      if (alpha <= 0.05) return;

      const hostR = radiusOf(host, S);
      const near = nearest[g.host];
      const fan = Math.max(Math.min(hostR * 2.6 + 10, near * 0.45), hostR + 6);
      const spread = clamp(near / (hostR * 7), 0.4, 1);
      const a0 = -Math.PI * (0.5 + 0.45 * spread);
      const a1 = -Math.PI * (0.5 - 0.45 * spread);
      const ang = g.n === 1 ? -Math.PI / 2 : a0 + (a1 - a0) * (g.k / (g.n - 1));
      let x = hp[0] + Math.cos(ang) * fan * bloom;
      let y = hp[1] + Math.sin(ang) * fan * bloom;
      let r = clamp(hostR * 0.42 * (0.6 + 0.4 * bloom), 2, 7);

      if (host.focus && zoom > 0) {
        const bigR = clamp(0.052 * S, 16, 30);
        x = lerp(x, colX, zoom);
        y = lerp(y, colY[g.k], zoom);
        r = lerp(r, bigR, zoom);
      }

      ctx.globalAlpha = alpha * (0.5 + 0.4 * zoom);
      ctx.strokeStyle = `rgba(162,182,206,${host.focus && zoom > 0.3 ? 0.42 : 0.22})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hp[0], hp[1]);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (r > 9) {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 6.2832);
        ctx.strokeStyle = g.color;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = g.color;
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        drawSparkle(ctx, x, y, r * 0.42, g.color, alpha);
        if (g.name)
          drawLabel(
            ctx,
            y,
            g.name,
            'rgba(230,237,244,.88)',
            alpha * zoom,
            portrait ? 12 : 13,
            W,
            x + r,
            14,
          );
      } else {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1.6, r), 0, 6.2832);
        ctx.fillStyle = g.color;
        ctx.shadowColor = g.color;
        ctx.shadowBlur = 9;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    });

    /* humanos: por último, sempre por cima */
    people.forEach((p, i) => {
      const pp = PT[i];
      const faded = zoom > 0 && !p.focus;
      const alpha = faded ? lerp(1, 0, zoom) : 1;
      if (alpha <= 0.01) return;
      const r = radiusOf(p, S) * (p.focus ? lerp(1, 1.5, zoom) : 1);
      drawPerson(ctx, pp[0], pp[1], r, alpha, bloom > 0.35);
      if (p.label) {
        const la = p.focus ? zoom : 0;
        drawLabel(
          ctx,
          pp[1],
          p.label,
          p.focus ? 'rgba(240,248,255,.95)' : 'rgba(125,136,152,.9)',
          la,
          p.focus ? (portrait ? 11 : 12) : portrait ? 10 : 11,
          W,
          pp[0] + r,
          13,
        );
      }
    });
  }

  return { measure, render };
}

export { seg, ease, lerp, clamp };
