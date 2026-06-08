/* ============================================================
   HERO VIZ — Mobile-first agentic org motion
   Phase 1: 6 aligned rows × 4 columns of person icons (straight grid)
   Phase 2: All icons converge into a single person (hub)
   Phase 3: A single vertical line + AI star icons appear below hub
   Loops continuously.
   ============================================================ */
(function () {
  const canvas = document.getElementById("heroViz");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const GHOST  = [142, 180, 212];
  const CYAN   = [76,  184, 232];
  const SOFT   = [94,  200, 240];
  const WHITE  = [226, 240, 252];
  const STAR_C = [[76,184,232],[56,189,250],[94,200,240],[76,184,232],[56,189,250]];

  const rgba    = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const clamp   = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const lerp    = (a, b, t) => a + (b - a) * t;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO  = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;

  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const frozen   = () => reduceMQ.matches || document.body.classList.contains("no-motion");

  let dpr = 1, w = 0, h = 0;
  let grid = [], hub = {}, stars = [];
  let start = performance.now();

  /* ---- draw helpers ---- */
  function drawPerson(x, y, s, col, a) {
    if (a <= 0.01) return;
    ctx.fillStyle = rgba(col, a);
    // head
    ctx.beginPath();
    ctx.arc(x, y - s * 0.36, s * 0.28, 0, Math.PI * 2);
    ctx.fill();
    // shoulders
    ctx.beginPath();
    ctx.ellipse(x, y + s * 0.40, s * 0.44, s * 0.38, 0, Math.PI, 2 * Math.PI);
    ctx.fill();
  }

  function drawStar(x, y, r, col, a) {
    if (a <= 0.01) return;
    // 4-point sparkle
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const ang  = -Math.PI / 2 + (i * Math.PI) / 4;
      const rad  = i % 2 === 0 ? r : r * 0.38;
      const px   = x + Math.cos(ang) * rad;
      const py   = y + Math.sin(ang) * rad;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = rgba(col, a);
    ctx.fill();
    // glow
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
    g.addColorStop(0, rgba(col, 0.30 * a));
    g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---- layout ---- */
  function build() {
    const COLS = 4, ROWS = 5;
    const cellW = w / COLS;
    const cellH = h / ROWS;

    // Hub: center-x, first-row center y
    hub = { x: w * 0.50, y: cellH * 0.5 };

    // Grid: straight aligned rows and columns
    grid = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        grid.push({
          x:  cellW * (c + 0.5),   // exact column center — perfectly straight
          y:  cellH * (r + 0.5),
          ph: (r * COLS + c) / (ROWS * COLS),  // stagger phase for breathing
        });
      }
    }

    // Stars: single vertical column below hub
    const N_STARS  = 4;
    const starGap  = cellH * 0.85;
    const lineStart = hub.y + cellH * 0.72; // start of line below hub
    stars = [];
    for (let i = 0; i < N_STARS; i++) {
      stars.push({
        x:      hub.x,
        y:      lineStart + starGap * i,
        col:    STAR_C[i % STAR_C.length],
        appear: 0.46 + i * 0.04,
      });
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w   = Math.max(1, rect.width);
    h   = Math.max(1, rect.height);
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  /* ---- render ---- */
  function draw(now) {
    const CYCLE = 12;                     // seconds per full loop
    const ph    = frozen() ? 0.85 : (((now - start) / 1000) % CYCLE) / CYCLE;

    ctx.clearRect(0, 0, w, h);

    // icon size — fills ~4 per row width
    const s = (w / 4) * 0.62;

    // overall scene fade-out before reset
    const sceneFade = ph > 0.90 ? (1 - (ph - 0.90) / 0.10) : 1;

    // --- Phase 1: grid of person icons ---
    // fade in: 0→0.04  |  display: 0.04→0.18  |  converge: 0.18→0.34
    const moveP  = easeIO(clamp((ph - 0.18) / 0.16, 0, 1));
    const fadeIn = clamp(ph / 0.04, 0, 1);

    for (const p of grid) {
      const bx = frozen() ? 0 : Math.sin(now / 1000 * 0.3 + p.ph * 6.28) * 2;
      const by = frozen() ? 0 : Math.cos(now / 1000 * 0.25 + p.ph * 6.28) * 2;

      const x = lerp(p.x + bx, hub.x, moveP);
      const y = lerp(p.y + by, hub.y, moveP);

      let a = fadeIn;
      a *= 1 - clamp((moveP - 0.55) / 0.45, 0, 1);
      a *= sceneFade;

      drawPerson(x, y, s, GHOST, 0.52 * a);
    }

    // --- Phase 2: merged hub person ---
    const hubA = easeOut(clamp((ph - 0.32) / 0.10, 0, 1)) * sceneFade;
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
    const lineProg = easeOut(clamp((ph - 0.40) / 0.22, 0, 1));
    if (hubA > 0.1 && lineProg > 0 && stars.length > 0) {
      const lineEnd = stars[stars.length - 1].y;
      const lineTop = hub.y + s * 0.78;
      const curEnd  = lerp(lineTop, lineEnd, lineProg);

      ctx.strokeStyle = rgba(CYAN, 0.40 * sceneFade);
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(hub.x, lineTop);
      ctx.lineTo(hub.x, curEnd);
      ctx.stroke();

      if (!frozen() && lineProg > 0.2) {
        const f  = ((now / 1000) * 0.30) % 1;
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

    requestAnimationFrame(draw);
  }

  function boot() {
    resize();
    let rz;
    window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(resize, 150); });
    requestAnimationFrame(draw);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
