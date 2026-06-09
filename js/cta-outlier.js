/* ============================================================
   FINAL CTA — "Outlier" bell-curve visualization
   The great mass under a Gaussian, one glowing outlier apart.
   ============================================================ */
(function () {
  const canvas = document.getElementById("outlierCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const C = { cyan: [76, 184, 232], soft: [94, 200, 240], deep: [58, 159, 213], dim: [142, 180, 212] };
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const frozen = () => reduceMQ.matches || document.body.classList.contains("no-motion");

  let w = 0, h = 0, dpr = 1, dots = [], geo = {}, visible = true, start = performance.now();

  function gauss(x) {
    return geo.baseline - geo.peak * Math.exp(-((x - geo.cx) ** 2) / (2 * geo.sigma ** 2));
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.max(1, r.width); h = Math.max(1, r.height);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    geo.baseline = h * 0.82;
    geo.peak = h * 0.58;
    geo.cx = w * 0.60;
    geo.sigma = w * 0.12;
    geo.x0 = w * 0.34;
    geo.x1 = w * 0.88;
    geo.ox = w * 0.90;
    geo.oy = h * 0.40;

    // scatter "the great mass" dots under the curve
    dots = [];
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
  }

  function draw(now) {
    const t = frozen() ? 2.2 : (now - start) / 1000;
    ctx.clearRect(0, 0, w, h);

    // baseline
    ctx.strokeStyle = rgba(C.dim, 0.22);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(geo.x0, geo.baseline + 0.5); ctx.lineTo(w * 0.96, geo.baseline + 0.5); ctx.stroke();

    // bell curve fill
    ctx.beginPath();
    ctx.moveTo(geo.x0, geo.baseline);
    for (let x = geo.x0; x <= geo.x1; x += 2) ctx.lineTo(x, gauss(x));
    ctx.lineTo(geo.x1, geo.baseline);
    ctx.closePath();
    const fg = ctx.createLinearGradient(0, geo.baseline - geo.peak, 0, geo.baseline);
    fg.addColorStop(0, rgba(C.cyan, 0.14));
    fg.addColorStop(1, rgba(C.cyan, 0.01));
    ctx.fillStyle = fg; ctx.fill();

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
    for (const d of dots) {
      const a = 0.35 + 0.35 * (0.5 + 0.5 * Math.sin(t * d.sp + d.ph));
      ctx.fillStyle = rgba(C.soft, a);
      ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7); ctx.fill();
    }

    // the outlier — glowing node with pulsing rings
    const ox = geo.ox, oy = geo.oy;
    const halo = ctx.createRadialGradient(ox, oy, 0, ox, oy, 46);
    halo.addColorStop(0, rgba(C.cyan, 0.55));
    halo.addColorStop(1, rgba(C.cyan, 0));
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(ox, oy, 46, 0, 7); ctx.fill();

    for (let i = 0; i < 2; i++) {
      const rp = ((t * 0.5 + i * 0.5) % 1);
      ctx.strokeStyle = rgba(C.soft, 0.55 * (1 - rp));
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(ox, oy, 10 + rp * 30, 0, 7); ctx.stroke();
    }
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(ox, oy, 9, 0, 7); ctx.fill();
    ctx.fillStyle = rgba(C.soft, 0.95);
    ctx.beginPath(); ctx.arc(ox, oy, 6, 0, 7); ctx.fill();

    requestAnimationFrame(draw);
  }

  function boot() {
    resize();
    const io = new IntersectionObserver((e) => (visible = e[0].isIntersecting), { threshold: 0 });
    io.observe(canvas);
    let rz;
    window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(resize, 150); });
    requestAnimationFrame(draw);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
