/* ============================================================
   ORG CHART — Agentic org chart, canvas showpiece
   CEO → department leads → colored agent bubbles, with live
   "flow & connection" motion (traveling pulses + orbiting dots).
   ============================================================ */
(function () {
  const stage = document.getElementById("orgStage");
  const canvas = document.getElementById("orgCanvas");
  if (!stage || !canvas) return;
  const ctx = canvas.getContext("2d");

  /* ---- palette (vibrant agents on navy) ---- */
  const COL = {
    blue:    [76, 184, 232],
    sky:     [56, 189, 250],
    teal:    [22, 196, 178],
    green:   [42, 200, 140],
    violet:  [139, 120, 246],
    magenta: [236, 96, 168],
    amber:   [240, 176, 80],
    red:     [240, 96, 96],
    ghost:   [142, 180, 212],
  };
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const WHITE = [230, 242, 252];

  // person icon (humans) — head + shoulders silhouette
  function iconPerson(x, y, s, a) {
    ctx.fillStyle = rgba(WHITE, a);
    ctx.beginPath(); ctx.arc(x, y - s * 0.32, s * 0.30, 0, 7); ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x, y + s * 0.44, s * 0.46, s * 0.40, 0, Math.PI, 2 * Math.PI);
    ctx.fill();
  }
  // star icon (AI agents) — 4-point sparkle
  function iconStar(x, y, s, a) {
    ctx.beginPath();
    const spikes = 4, outer = s, inner = s * 0.40;
    for (let i = 0; i < spikes * 2; i++) {
      const rr = i % 2 ? inner : outer;
      const ang = -Math.PI / 2 + (i * Math.PI) / spikes;
      const px = x + Math.cos(ang) * rr, py = y + Math.sin(ang) * rr;
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = rgba(WHITE, a);
    ctx.fill();
  }

  /* ---- structure (4 departments for readability) ---- */
  const DEPT = [
    { label: "Vendas", lead: "VP", role: "VP Sales", agents: [
      { l: "S", cap: "SDR Agent", c: COL.green, base: 3120 },
      { l: "C", cap: "CRM Agent", c: COL.teal, base: 2040 },
      { l: "P", cap: "Proposal", c: COL.sky, base: 760 },
    ]},
    { label: "Marketing", lead: "CMO", role: "CMO", agents: [
      { l: "C", cap: "Content", c: COL.amber, base: 1840 },
      { l: "B", cap: "Benchmark", c: COL.magenta, base: 610 },
    ]},
    { label: "Pessoas", lead: "RH", role: "CHRO", agents: [
      { l: "R", cap: "Recruiter", c: COL.violet, base: 540 },
      { l: "O", cap: "Onboarding", c: COL.teal, base: 612 },
      { l: "C", cap: "Cultura", c: COL.magenta, base: 430 },
    ]},
    { label: "Produto", lead: "CTO", role: "CTO", agents: [
      { l: "Q", cap: "QA Agent", c: COL.red, base: 5290 },
      { l: "M", cap: "Monitor", c: COL.blue, base: 2140 },
    ]},
  ];

  /* ---- logical canvas coords ---- */
  const W = 1480, H = 740;
  let dpr = 1, cssW = 0, cssH = 0, scale = 1, logW = W;
  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const frozen = () => reduceMQ.matches || document.body.classList.contains("no-motion");

  let nodes = [], edges = [], ceo = null;

  function layout() {
    const padX = 58, padR = 58;
    const usable = logW - padX - padR;
    const colW = usable / DEPT.length;
    nodes = []; edges = [];

    ceo = { x: logW / 2, y: 112, r: 42, app: 0, label: "CEO", isCeo: true, c: COL.blue, sat: Math.random() * 6.28 };

    DEPT.forEach((dep, di) => {
      const x = padX + colW * (di + 0.5);
      const lead = {
        x, y: 300, r: 33, app: 0.12 + di * 0.025, label: dep.lead, role: dep.role,
        deptLabel: dep.label, isLead: true, c: COL.ghost, sat: Math.random() * 6.28,
      };
      nodes.push(lead);
      // CEO -> lead
      edges.push(makeEdge(ceo.x, ceo.y + ceo.r, x, lead.y - lead.r, 0.16 + di * 0.02, COL.blue, true, 0.55 + di * 0.07));

      let prev = lead;
      const startY = 432, gap = 130;
      dep.agents.forEach((ag, ai) => {
        const ny = startY + gap * ai;
        const node = {
          x, y: ny, r: 30, app: 0.4 + ai * 0.12 + di * 0.015,
          label: ag.l, cap: ag.cap, c: ag.c, base: ag.base, _count: ag.base,
          active: true, isAgent: true, sat: Math.random() * 6.28,
        };
        nodes.push(node);
        edges.push(makeEdge(prev.x, prev.y + prev.r, x, ny - node.r, node.app - 0.05, ag.c, true, 0.7 + ai * 0.1));
        prev = node;
      });
    });
  }

  function makeEdge(x0, y0, x1, y1, app, c, lit, speed) {
    return { x0, y0, x1, y1, app, c, lit, speed, off: Math.random() };
  }

  function resize() {
    const r = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = Math.max(1, r.width);
    // Mobile: use half the logical width so nodes render 2× larger
    logW = cssW < 640 ? W / 2 : W;
    scale = cssW / logW;
    cssH = scale * H;
    canvas.style.height = cssH + "px";
    canvas.width  = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
    layout(); // recalculate positions using current logW
  }

  /* ---- entrance ---- */
  let startT = null, vis = false;
  function progress(now) {
    if (frozen()) return 1;
    if (startT == null) return 0;
    return clamp((now - startT) / 1900, 0, 1);
  }
  const appAlpha = (app, p) => easeOut(clamp((p - app) / 0.2, 0, 1));

  /* ---- draw helpers ---- */
  function drawEdge(e, p, t) {
    const a = appAlpha(e.app, p);
    if (a <= 0) return;
    const dx = e.x1 - e.x0, dy = e.y1 - e.y0;
    const fr = a; // draw-in fraction follows alpha
    const ex = e.x0 + dx * fr, ey = e.y0 + dy * fr;
    ctx.strokeStyle = rgba(e.c, 0.22 * a);
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(e.x0, e.y0); ctx.lineTo(ex, ey); ctx.stroke();

    // traveling pulse (flow) once fully drawn
    if (p > 0.98 && !frozen()) {
      const f = (t * e.speed * 0.42 + e.off) % 1;
      const px = e.x0 + dx * f, py = e.y0 + dy * f;
      const g = ctx.createRadialGradient(px, py, 0, px, py, 9);
      g.addColorStop(0, rgba(e.c, 0.9));
      g.addColorStop(1, rgba(e.c, 0));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(px, py, 9, 0, 7); ctx.fill();
      ctx.fillStyle = rgba([255, 255, 255], 0.85);
      ctx.beginPath(); ctx.arc(px, py, 1.8, 0, 7); ctx.fill();
    }
  }

  function drawNode(n, p, t) {
    const a = appAlpha(n.app, p);
    if (a <= 0) return;
    const c = n.c || COL.ghost;
    const pulse = frozen() ? 1 : 1 + 0.04 * Math.sin(t * 0.9 + n.sat);
    const r = n.r * (0.82 + 0.18 * easeOut(a)) * pulse;

    if (n.isAgent || n.isCeo) {
      // glow halo
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.3);
      g.addColorStop(0, rgba(c, 0.42 * a));
      g.addColorStop(1, rgba(c, 0));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(n.x, n.y, r * 2.3, 0, 7); ctx.fill();
      // disc
      ctx.fillStyle = rgba([8, 18, 34], 0.85 * a);
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 7); ctx.fill();
      // ring
      ctx.strokeStyle = rgba(c, 0.95 * a);
      ctx.lineWidth = 2.1;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 7); ctx.stroke();
    } else {
      // lead: thin ghost ring
      ctx.fillStyle = rgba([10, 22, 40], 0.7 * a);
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 7); ctx.fill();
      ctx.strokeStyle = rgba(COL.ghost, 0.5 * a);
      ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 7); ctx.stroke();
    }

    // orbiting satellite dot
    if (a > 0.4) {
      const ang = (frozen() ? n.sat : n.sat + t * 0.35);
      const ox = n.x + Math.cos(ang) * (r + 6);
      const oy = n.y + Math.sin(ang) * (r + 6);
      ctx.fillStyle = rgba(c, 0.9 * a);
      ctx.beginPath(); ctx.arc(ox, oy, 2.4, 0, 7); ctx.fill();
    }

    // glyph: person for humans (CEO + leads), star for AI agents
    if (n.isAgent) {
      iconStar(n.x, n.y, r * 0.6, a);
    } else {
      iconPerson(n.x, n.y, r * 0.92, a);
    }

    ctx.globalAlpha = a;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    // CEO caption
    if (n.isCeo) {
      ctx.fillStyle = rgba(COL.ghost, 0.9);
      ctx.font = `600 13px "JetBrains Mono", monospace`;
      ctx.fillText("CEO", n.x, n.y + n.r + 20);
    }
    // dept label + role for leads
    if (n.isLead) {
      ctx.fillStyle = rgba(COL.ghost, 0.85);
      ctx.font = `600 13px "JetBrains Mono", monospace`;
      ctx.fillText(n.deptLabel, n.x, n.y - n.r - 26);
      ctx.fillStyle = rgba(COL.ghost, 0.6);
      ctx.font = `500 12px "JetBrains Mono", monospace`;
      ctx.fillText(n.role, n.x, n.y + n.r + 18);
    }
    // caption for agents
    if (n.isAgent) {
      ctx.fillStyle = rgba(COL.ghost, 0.72);
      ctx.font = `500 12.5px "JetBrains Mono", monospace`;
      ctx.fillText(n.cap, n.x, n.y + n.r + 17);
    }
    ctx.globalAlpha = 1;
  }

  function frame(now) {
    const t = (now) / 1000;
    const p = progress(now);
    ctx.clearRect(0, 0, W, H);

    // top-left system label
    ctx.textAlign = "left"; ctx.textBaseline = "alphabetic";
    edges.forEach((e) => drawEdge(e, p, t));
    nodes.forEach((n) => drawNode(n, p, t));
    drawNode(ceo, p, t);

    requestAnimationFrame(frame);
  }

  /* ---- live ticker ---- */
  let lang = (function () { try { return localStorage.getItem("dl_lang") || "pt"; } catch (e) { return "pt"; } })();
  const fmt = (n) => n.toLocaleString(lang === "pt" ? "pt-BR" : "en-US");
  const tickerEl = document.getElementById("orgTickerVal");
  let tickerTotal = 0;
  function initTicker() {
    tickerTotal = nodes.filter((n) => n.isAgent).reduce((s, n) => s + n.base, 0);
    if (tickerEl) tickerEl.textContent = fmt(tickerTotal);
  }
  function tick() {
    if (!vis) return;
    let added = 0;
    nodes.forEach((n) => {
      if (n.isAgent && Math.random() < 0.5) {
        const inc = 1 + Math.floor(Math.random() * 6);
        n._count += inc; added += inc;
      }
    });
    tickerTotal += added;
    if (tickerEl) tickerEl.textContent = fmt(tickerTotal);
  }

  /* ---- boot ---- */
  function boot() {
    resize();
    layout();
    initTicker();

    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        vis = e.isIntersecting;
        if (vis && startT == null) startT = performance.now();
      });
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    io.observe(stage);

    let rz;
    window.addEventListener("resize", () => {
      clearTimeout(rz);
      rz = setTimeout(() => { resize(); layout(); }, 150);
    });
    window.addEventListener("langchange", (e) => {
      lang = e.detail.lang;
      if (tickerEl) tickerEl.textContent = fmt(tickerTotal);
    });

    setInterval(tick, 1100);
    setTimeout(() => { if (startT == null) startT = performance.now(); }, 3500);
    requestAnimationFrame(frame);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
