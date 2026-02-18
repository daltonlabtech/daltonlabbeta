import { motion } from 'framer-motion';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';

const INDUSTRIES: { label: string; bg: string; text: string; border: string }[] = [
  { label: 'Agro', bg: 'rgba(34,197,94,0.12)', text: '#15803d', border: 'rgba(34,197,94,0.25)' },
  { label: 'Tecnologia', bg: 'rgba(59,130,246,0.12)', text: '#1d4ed8', border: 'rgba(59,130,246,0.25)' },
  { label: 'Saúde', bg: 'rgba(239,68,68,0.12)', text: '#b91c1c', border: 'rgba(239,68,68,0.25)' },
  { label: 'Varejo', bg: 'rgba(245,158,11,0.12)', text: '#b45309', border: 'rgba(245,158,11,0.25)' },
  { label: 'Advocacia', bg: 'rgba(139,92,246,0.12)', text: '#6d28d9', border: 'rgba(139,92,246,0.25)' },
];

const HIGHLIGHT_COLOR = '#3B82F6';

// Dot grid world map - each entry is [col, row] on a ~72x36 grid
// The grid maps to viewBox 0 0 720 360
const LAND_DOTS: [number, number][] = [];

// Simple land mask using a bitmap approach
// 1 = land, encoded per row as ranges of columns
const LAND_ROWS: Record<number, number[][]> = {
  // Row format: [[startCol, endCol], ...] — 0-indexed, grid cols 0-71
  // Greenland & Arctic
  2: [[35,38],[55,60]],
  3: [[16,20],[35,40],[55,62]],
  4: [[14,22],[34,42],[54,64]],
  5: [[13,23],[33,43],[53,66]],
  // North America + Europe + Russia
  6: [[5,8],[12,24],[33,40],[43,46],[52,68]],
  7: [[4,9],[11,25],[32,36],[38,40],[43,47],[51,69]],
  8: [[3,10],[10,26],[32,36],[38,41],[43,48],[50,70]],
  9: [[3,25],[32,36],[38,42],[44,49],[50,71]],
  10: [[2,24],[32,37],[39,43],[45,50],[52,71]],
  11: [[2,23],[33,37],[40,44],[46,52],[54,70]],
  12: [[3,22],[34,38],[41,45],[47,53],[56,68]],
  13: [[4,21],[34,38],[41,46],[48,55],[57,67]],
  // North America lower + Mediterranean + Middle East + Asia
  14: [[5,20],[35,38],[42,47],[49,56],[58,66]],
  15: [[6,19],[35,39],[43,48],[50,57],[59,65]],
  16: [[7,18],[36,39],[43,49],[51,58],[60,65]],
  17: [[8,17],[36,40],[44,50],[52,59],[61,64]],
  // Central America + Africa + South/SE Asia
  18: [[9,16],[37,40],[44,51],[53,60],[62,64]],
  19: [[10,15],[37,41],[44,52],[54,60],[63,65]],
  20: [[11,14],[38,41],[44,53],[55,59],[63,66]],
  21: [[12,14],[38,42],[44,53],[56,58],[64,66]],
  22: [[13,15],[38,42],[44,53],[57,58],[64,67]],
  // South America + Africa
  23: [[14,18],[39,42],[44,53],[65,67]],
  24: [[15,20],[39,42],[44,52],[65,68]],
  25: [[16,21],[39,42],[45,52],[66,68]],
  26: [[17,22],[40,42],[45,51]],
  27: [[18,22],[40,42],[46,51]],
  28: [[18,22],[41,42],[46,50]],
  29: [[18,21],[47,50]],
  30: [[18,20],[47,49]],
  31: [[17,19],[48,49]],
  32: [[16,18]],
  33: [[15,17]],
  34: [[14,16]],
  // Australia
  35: [[60,67]],
  36: [[59,68]],
  37: [[59,68]],
  38: [[60,67]],
  39: [[61,66]],
  // New Zealand
  40: [[68,69]],
  41: [[68,69]],
};

// Build dot array from land rows
Object.entries(LAND_ROWS).forEach(([rowStr, ranges]) => {
  const row = parseInt(rowStr);
  ranges.forEach(([start, end]) => {
    for (let col = start; col <= end; col++) {
      LAND_DOTS.push([col, row]);
    }
  });
});

// Highlighted region dots (blue) — specific areas within continents
// Brazil region: cols ~15-22, rows ~23-34
const isBrazilRegion = (col: number, row: number) =>
  col >= 15 && col <= 22 && row >= 23 && row <= 34;

// Portugal: col ~35, row ~14-15
const isPortugalRegion = (col: number, row: number) =>
  col >= 35 && col <= 36 && row >= 14 && row <= 16;

// Angola: col ~41-43, row ~26-29
const isAngolaRegion = (col: number, row: number) =>
  col >= 41 && col <= 43 && row >= 26 && row <= 29;

// South Korea: col ~63-64, row ~13-14
const isKoreaRegion = (col: number, row: number) =>
  col >= 63 && col <= 65 && row >= 12 && row <= 14;

const isHighlighted = (col: number, row: number) =>
  isBrazilRegion(col, row) || isPortugalRegion(col, row) ||
  isAngolaRegion(col, row) || isKoreaRegion(col, row);

// Big pulse points (main cities/countries)
const PULSE_POINTS: { x: number; y: number; label: string }[] = [
  // Brazil cities
  { x: 19 * 10, y: 26 * 10, label: 'São Paulo' },
  { x: 20 * 10, y: 25 * 10, label: 'Rio de Janeiro' },
  { x: 18 * 10, y: 24 * 10, label: 'Belo Horizonte' },
  { x: 17 * 10, y: 25 * 10, label: 'Brasília' },
  { x: 16 * 10, y: 23 * 10, label: 'Manaus' },
  { x: 21 * 10, y: 24 * 10, label: 'Recife' },
  { x: 19 * 10, y: 28 * 10, label: 'Curitiba' },
  { x: 20 * 10, y: 24 * 10, label: 'Salvador' },
  { x: 17 * 10, y: 26 * 10, label: 'Goiânia' },
  { x: 18 * 10, y: 30 * 10, label: 'Porto Alegre' },
  // Portugal
  { x: 35 * 10, y: 15 * 10, label: 'Portugal' },
  // South Korea
  { x: 64 * 10, y: 13 * 10, label: 'Coreia do Sul' },
  // Angola
  { x: 42 * 10, y: 27 * 10, label: 'Angola' },
];

const REGION_LABELS: { label: string; x: number; y: number }[] = [
  { label: 'América do Sul', x: 12 * 10, y: 22 * 10 },
  { label: 'Europa', x: 37 * 10, y: 8 * 10 },
  { label: 'África', x: 43 * 10, y: 22 * 10 },
  { label: 'Ásia', x: 60 * 10, y: 8 * 10 },
];

const DOT_SPACING = 10;
const DOT_R = 2;
const DOT_R_HIGHLIGHT = 2.5;

const GlobalMapSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-10 md:py-14"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        {/* Title */}
        <h2
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight text-center mb-4 md:mb-6 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          O Dalton Lab é global. E está crescendo.
        </h2>

        {/* Industry Tags */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10 ${revealClasses(isVisible)}`}>
          {INDUSTRIES.map((industry) => (
            <span
              key={industry.label}
              className="font-inter text-xs md:text-sm font-medium px-4 py-1.5 rounded-full border"
              style={{
                color: industry.text,
                borderColor: industry.border,
                backgroundColor: industry.bg,
              }}
            >
              {industry.label}
            </span>
          ))}
        </div>
      </div>

      {/* Full-width Dot Map */}
      <div className={`w-full max-w-6xl mx-auto px-4 ${revealClasses(isVisible)}`}>
        <svg
          viewBox="0 0 720 420"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base land dots (gray) */}
          {LAND_DOTS.map(([col, row]) => {
            const highlighted = isHighlighted(col, row);
            return (
              <circle
                key={`${col}-${row}`}
                cx={col * DOT_SPACING}
                cy={row * DOT_SPACING}
                r={highlighted ? DOT_R_HIGHLIGHT : DOT_R}
                fill={highlighted ? HIGHLIGHT_COLOR : 'rgba(16,24,35,0.15)'}
              />
            );
          })}

          {/* Region labels */}
          {REGION_LABELS.map((rl) => (
            <g key={rl.label}>
              <rect
                x={rl.x - 4}
                y={rl.y - 11}
                width={rl.label.length * 6.5 + 14}
                height={18}
                rx={9}
                fill="rgba(245,243,240,0.85)"
                stroke="rgba(16,24,35,0.12)"
                strokeWidth={0.8}
              />
              <text
                x={rl.x + 3}
                y={rl.y + 2}
                fill="#101824"
                fontSize="8"
                fontFamily="Inter, sans-serif"
                fontWeight="600"
                opacity={0.6}
              >
                {rl.label}
              </text>
            </g>
          ))}

          {/* Pulse points */}
          {PULSE_POINTS.map((p, i) => (
            <g key={`pulse-${p.label}-${i}`}>
              {/* Outer pulse ring */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={6}
                fill="none"
                stroke={HIGHLIGHT_COLOR}
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 1 }}
                animate={
                  isVisible
                    ? { opacity: [0.5, 0], scale: [1, 3] }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: 'easeOut',
                }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
              {/* Solid dot */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={5}
                fill={HIGHLIGHT_COLOR}
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
              {/* Glow */}
              <circle
                cx={p.x}
                cy={p.y}
                r={8}
                fill={HIGHLIGHT_COLOR}
                opacity={0.12}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="container-main">
        <p
          className={`text-center text-sm md:text-lg mt-6 md:mt-10 ${revealClasses(isVisible)}`}
          style={{ color: 'rgba(16,24,35,0.7)' }}
        >
          Seu país ainda não está no mapa? Você pode{' '}
          <a
            href="https://formulario.daltonlab.ai/"
            className="font-semibold underline underline-offset-4 transition-colors duration-200"
            style={{ color: '#101824' }}
          >
            liderar o caminho.
          </a>
        </p>
      </div>
    </section>
  );
};

export default GlobalMapSection;
