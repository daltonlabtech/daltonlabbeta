/**
 * Artes estáticas dos cards da jornada agêntica (dobra 5) — port do drawArts()
 * do protótipo. Desenho único por resize; sem loop de animação.
 *
 * 1 = nuvem difusa de pontos (Imersão) · 2 = grade com colunas acesas (Sprint)
 * 3 = medidor em arco "72" (Operação) · 4 = nó central com satélites (Cultura)
 */
export type JourneyArtVariant = 1 | 2 | 3 | 4;

export function drawJourneyArt(
  c: HTMLCanvasElement,
  variant: JourneyArtVariant,
) {
  const r = c.getBoundingClientRect();
  if (r.width < 2) return;
  const d = Math.min(window.devicePixelRatio || 1, 2);
  c.width = Math.round(r.width * d);
  c.height = Math.round(r.height * d);
  const x = c.getContext('2d');
  if (!x) return;
  x.setTransform(d, 0, 0, d, 0, 0);
  const w = r.width;
  const h = r.height;

  if (variant === 1) {
    let s = 7;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    for (let i = 0; i < 34; i++) {
      const px = w * (0.08 + 0.84 * rnd());
      const py = h * (0.14 + 0.7 * rnd());
      const pr = 0.8 + 2.6 * rnd();
      x.beginPath();
      x.arc(px, py, pr, 0, 7);
      x.fillStyle = `rgba(201,184,255,${(0.14 + 0.38 * rnd()).toFixed(2)})`;
      x.fill();
    }
    x.shadowColor = '#8fe6ff';
    x.shadowBlur = 14;
    x.fillStyle = '#8fe6ff';
    x.beginPath();
    x.arc(w * 0.62, h * 0.42, 4.4, 0, 7);
    x.fill();
    x.shadowBlur = 0;
  } else if (variant === 2) {
    const cols = 12;
    const rows = 5;
    for (let i = 0; i < cols; i++)
      for (let j = 0; j < rows; j++) {
        const gx = w * 0.08 + i * ((w * 0.84) / (cols - 1));
        const gy = h * 0.2 + j * ((h * 0.6) / (rows - 1));
        x.beginPath();
        x.arc(gx, gy, 2.2, 0, 7);
        if (i < 4) {
          x.shadowColor = '#a8f0cf';
          x.shadowBlur = 6;
          x.fillStyle = 'rgba(168,240,207,.95)';
        } else {
          x.shadowBlur = 0;
          x.fillStyle = 'rgba(162,182,206,.22)';
        }
        x.fill();
      }
    x.shadowBlur = 0;
  } else if (variant === 3) {
    const cxp = w / 2;
    const cyp = h * 0.62;
    const R = Math.min(w, h) * 0.42;
    const A0 = Math.PI * 0.8;
    const A1 = Math.PI * 2.2;
    x.lineWidth = 2;
    x.strokeStyle = 'rgba(162,182,206,.18)';
    x.beginPath();
    x.arc(cxp, cyp, R, A0, A1);
    x.stroke();
    x.strokeStyle = '#ffb8d9';
    x.shadowColor = '#ffb8d9';
    x.shadowBlur = 10;
    x.beginPath();
    x.arc(cxp, cyp, R, A0, A0 + (A1 - A0) * 0.72);
    x.stroke();
    x.shadowBlur = 0;
    x.fillStyle = '#e6edf4';
    x.font = '200 26px Manrope,sans-serif';
    x.textAlign = 'center';
    x.fillText('72', cxp, cyp + 8);
  } else {
    const cx2 = w / 2;
    const cy2 = h * 0.52;
    const R2 = Math.min(w, h) * 0.36;
    const cl = ['#c9b8ff', '#a8f0cf', '#ffb8d9', '#ff9e9e', '#a8d8ff', '#c9b8ff', '#a8f0cf', '#ffb8d9'];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const px = cx2 + Math.cos(a) * R2 * 1.15;
      const py = cy2 + Math.sin(a) * R2 * 0.82;
      x.strokeStyle = 'rgba(162,182,206,.22)';
      x.lineWidth = 1;
      x.shadowBlur = 0;
      x.beginPath();
      x.moveTo(cx2, cy2);
      x.lineTo(px, py);
      x.stroke();
      x.fillStyle = cl[i];
      x.shadowColor = cl[i];
      x.shadowBlur = 6;
      x.beginPath();
      x.arc(px, py, 3.2, 0, 7);
      x.fill();
      x.shadowBlur = 0;
    }
    x.strokeStyle = 'rgba(230,237,244,.85)';
    x.lineWidth = 1.2;
    x.beginPath();
    x.arc(cx2, cy2, 6, 0, 7);
    x.stroke();
  }
}
