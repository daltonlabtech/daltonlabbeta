/* ============================================================
   SOLUTIONS — per-card canvas motions
   immersion · sprint · operation · culture
   Honors prefers-reduced-motion and body.no-motion.
   ============================================================ */
(function () {
  const C = {
    cyan: [76, 184, 232],
    soft: [94, 200, 240],
    deep: [58, 159, 213],
    dim:  [142, 180, 212],
    warm: [240, 160, 76],
  };
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const frozen = () => reduceMQ.matches || document.body.classList.contains("no-motion");

  const insts = [];

  function makeInst(card) {
    const canvas = card.querySelector(".sol-canvas");
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    const inst = { card, canvas, ctx, type: card.dataset.motion, w: 0, h: 0, dpr: 1, visible: true };

    inst.resize = function () {
      const r = canvas.getBoundingClientRect();
      inst.dpr = Math.min(window.devicePixelRatio || 1, 2);
      inst.w = Math.max(1, r.width);
      inst.h = Math.max(1, r.height);
      canvas.width = Math.round(inst.w * inst.dpr);
      canvas.height = Math.round(inst.h * inst.dpr);
      ctx.setTransform(inst.dpr, 0, 0, inst.dpr, 0, 0);
      initLayout(inst);
    };
    inst.resize();
    return inst;
  }

  /* ---------- layouts (recomputed on resize) ---------- */
  function initLayout(inst) {
    const { w, h, type } = inst;
    if (type === "immersion") {
      const defs = [
        [0.16, 0.70, 16, C.cyan, 1, true],
        [0.30, 0.48, 22, C.soft, 1, false],
        [0.27, 0.80, 11, C.deep, 1, false],
        [0.44, 0.62, 14, C.cyan, 1, false],
        [0.40, 0.30, 12, C.warm, 1, false],
        [0.55, 0.45, 26, C.soft, 1, true],
        [0.58, 0.74, 13, C.cyan, 1, false],
        [0.70, 0.34, 15, C.deep, 1, false],
        [0.72, 0.60, 19, C.cyan, 1, false],
        [0.84, 0.52, 12, C.soft, 1, false],
        [0.86, 0.74, 10, C.deep, 1, false],
        [0.20, 0.36, 9,  C.cyan, 1, false],
      ];
      inst.bubbles = defs.map(([x, y, r, col, , ring], i) => ({
        x, y, r: r * (Math.min(w, h * 1.6) / 200), col, ring,
        ph: i * 1.7, sp: 0.5 + (i % 3) * 0.18,
      }));
    } else if (type === "sprint") {
      const cols = 6, rows = 4;
      const padX = w * 0.12, padY = h * 0.18;
      const gx = (w - padX * 2) / (cols - 1);
      const gy = (h - padY * 2) / (rows - 1);
      const dots = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({ x: padX + c * gx, y: padY + r * gy, order: r * cols + c });
      // urgent → less urgent: light from bottom-left fanning out (priority shuffle)
      dots.sort((a, b) => (a.order * 0.6 + (a.x / w) * 4) - (b.order * 0.6 + (b.x / w) * 4));
      dots.forEach((d, i) => (d.k = i));
      inst.dots = dots;
      inst.dotR = clamp(Math.min(gx, gy) * 0.22, 3, 7);
    } else if (type === "operation") {
      inst.cx = w * 0.5;
      inst.cy = h * 0.54;
      inst.R = Math.min(w, h) * 0.30;
    } else if (type === "culture") {
      inst.cx = w * 0.5;
      inst.cy = h * 0.5;
      const n = 5, R = Math.min(w, h) * 0.34;
      inst.sats = [];
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        inst.sats.push({ x: inst.cx + Math.cos(a) * R, y: inst.cy + Math.sin(a) * R, ph: i / n });
      }
    }
  }

  /* ---------- draws ---------- */
  function drawImmersion(inst, t) {
    const { ctx, w, h } = inst;
    ctx.clearRect(0, 0, w, h);
    for (const b of inst.bubbles) {
      const fx = b.x * w + Math.sin(t * b.sp + b.ph) * 6;
      const fy = b.y * h + Math.cos(t * b.sp * 0.8 + b.ph) * 5;
      const r = b.r * (1 + 0.07 * Math.sin(t * 1.4 + b.ph));
      const g = ctx.createRadialGradient(fx, fy, 0, fx, fy, r * 1.7);
      g.addColorStop(0, rgba(b.col, 0.5));
      g.addColorStop(1, rgba(b.col, 0));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(fx, fy, r * 1.7, 0, 7); ctx.fill();
      ctx.fillStyle = rgba(b.col, 0.92);
      ctx.beginPath(); ctx.arc(fx, fy, r * 0.42, 0, 7); ctx.fill();
      if (b.ring) {
        const rp = ((t * 0.45 + b.ph) % 1);
        ctx.strokeStyle = rgba(b.col, 0.5 * (1 - rp));
        ctx.lineWidth = 1.3;
        ctx.beginPath(); ctx.arc(fx, fy, r * 0.5 + rp * r * 1.5, 0, 7); ctx.stroke();
      }
    }
  }

  function drawSprint(inst, t) {
    const { ctx, w, h, dots, dotR } = inst;
    ctx.clearRect(0, 0, w, h);
    const L = 4.2;
    const p = (t % L) / L;            // cycle progress
    const ramp = 0.72;                 // fraction of cycle used to light all
    const n = dots.length;
    for (const d of dots) {
      const onAt = (d.k / n) * ramp;
      let lit = clamp((p - onAt) / 0.06, 0, 1);
      if (p > 0.92) lit *= (1 - (p - 0.92) / 0.08); // fade out before reset
      // base dot
      ctx.fillStyle = rgba(C.dim, 0.16);
      ctx.beginPath(); ctx.arc(d.x, d.y, dotR, 0, 7); ctx.fill();
      if (lit > 0.01) {
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, dotR * 4);
        g.addColorStop(0, rgba(C.cyan, 0.45 * lit));
        g.addColorStop(1, rgba(C.cyan, 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(d.x, d.y, dotR * 4, 0, 7); ctx.fill();
        ctx.fillStyle = rgba(C.soft, 0.55 + 0.45 * lit);
        ctx.beginPath(); ctx.arc(d.x, d.y, dotR, 0, 7); ctx.fill();
      }
    }
  }

  function drawOperation(inst, t) {
    const { ctx, w, h, cx, cy, R } = inst;
    ctx.clearRect(0, 0, w, h);
    const L = 5;
    const p = (t % L) / L;
    const target = 0.73;
    let val = target * easeOut(clamp(p / 0.45, 0, 1));
    if (p > 0.5) val = target + 0.015 * Math.sin((t) * 2.2); // gentle live flutter
    const a0 = Math.PI * 0.75, span = Math.PI * 1.5;
    // track
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(7, R * 0.16);
    ctx.strokeStyle = rgba(C.dim, 0.14);
    ctx.beginPath(); ctx.arc(cx, cy, R, a0, a0 + span); ctx.stroke();
    // value arc with gradient
    const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
    grad.addColorStop(0, rgba(C.deep, 0.95));
    grad.addColorStop(1, rgba(C.soft, 0.95));
    ctx.strokeStyle = grad;
    ctx.beginPath(); ctx.arc(cx, cy, R, a0, a0 + span * val); ctx.stroke();
    // glow head
    const ha = a0 + span * val;
    const hx = cx + Math.cos(ha) * R, hy = cy + Math.sin(ha) * R;
    const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * 0.4);
    hg.addColorStop(0, rgba(C.soft, 0.6)); hg.addColorStop(1, rgba(C.soft, 0));
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(hx, hy, R * 0.4, 0, 7); ctx.fill();
    // center readout
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#fff";
    ctx.font = `800 ${Math.round(R * 0.62)}px "DM Sans", sans-serif`;
    ctx.fillText(Math.round(val * 100) + "%", cx, cy + R * 0.18);
    ctx.fillStyle = rgba(C.dim, 0.85);
    ctx.font = `600 ${Math.round(R * 0.16)}px "JetBrains Mono", monospace`;
    ctx.fillText("ÍNDICE AGÊNTICO", cx, cy + R * 0.5);
  }

  function drawCulture(inst, t) {
    const { ctx, w, h, cx, cy, sats } = inst;
    ctx.clearRect(0, 0, w, h);
    const L = 6;
    const p = (t % L) / L;
    // links + traveling particles + satellite fill
    sats.forEach((s, i) => {
      ctx.strokeStyle = rgba(C.cyan, 0.16);
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(s.x, s.y); ctx.stroke();
      // fill level ramps in, staggered per satellite
      const lvl = clamp((p - i * 0.12) / 0.5, 0, 1);
      const sr = Math.min(w, h) * 0.07;
      // satellite ring
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = rgba(C.dim, 0.2);
      ctx.beginPath(); ctx.arc(s.x, s.y, sr, 0, 7); ctx.stroke();
      ctx.strokeStyle = rgba(C.soft, 0.9);
      ctx.beginPath(); ctx.arc(s.x, s.y, sr, -Math.PI / 2, -Math.PI / 2 + lvl * Math.PI * 2); ctx.stroke();
      // satellite core
      ctx.fillStyle = rgba(C.cyan, 0.25 + 0.6 * lvl);
      ctx.beginPath(); ctx.arc(s.x, s.y, sr * 0.5, 0, 7); ctx.fill();
      // particle traveling core → satellite
      const frac = ((t * 0.5 + s.ph) % 1);
      const px = lerp(cx, s.x, frac), py = lerp(cy, s.y, frac);
      ctx.fillStyle = rgba(C.soft, 0.9 * (1 - frac) + 0.2);
      ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 7); ctx.fill();
    });
    // central core
    const pr = 1 + 0.08 * Math.sin(t * 2.2);
    const coreR = Math.min(w, h) * 0.085 * pr;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.2);
    g.addColorStop(0, rgba(C.cyan, 0.55)); g.addColorStop(1, rgba(C.cyan, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, coreR * 2.2, 0, 7); ctx.fill();
    ctx.fillStyle = rgba(C.soft, 0.95);
    ctx.beginPath(); ctx.arc(cx, cy, coreR * 0.7, 0, 7); ctx.fill();
  }

  const DRAW = { immersion: drawImmersion, sprint: drawSprint, operation: drawOperation, culture: drawCulture };

  /* ---------- loop ---------- */
  let start = performance.now();
  function frame(now) {
    const t = frozen() ? 3.4 : (now - start) / 1000;
    for (const inst of insts) {
      if (!inst.visible) continue;
      const fn = DRAW[inst.type];
      if (fn) fn(inst, t);
    }
    requestAnimationFrame(frame);
  }

  function boot() {
    document.querySelectorAll(".sol-card").forEach((card) => {
      const inst = makeInst(card);
      if (inst) insts.push(inst);
    });
    if (!insts.length) return;

    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => {
        const inst = insts.find((i) => i.card === e.target);
        if (inst) inst.visible = e.isIntersecting;
      }),
      { threshold: 0 }
    );
    insts.forEach((i) => io.observe(i.card));

    let rz;
    window.addEventListener("resize", () => {
      clearTimeout(rz);
      rz = setTimeout(() => insts.forEach((i) => i.resize()), 150);
    });

    requestAnimationFrame(frame);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
