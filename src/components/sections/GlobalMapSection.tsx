import { motion } from 'framer-motion';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';

// Dot-based world map coordinates (col, row) on a 72x36 grid
// Each dot = ~5° of longitude/latitude
const BASE_DOTS: [number, number][] = [];

// Helper to define continent shapes as ranges
const continentRanges: { rows: [number, number]; cols: (row: number) => [number, number][] }[] = [
  // North America
  {
    rows: [3, 14],
    cols: (r) => {
      if (r <= 4) return [[8, 18]];
      if (r <= 6) return [[5, 20]];
      if (r <= 8) return [[4, 21]];
      if (r <= 10) return [[5, 22]];
      if (r <= 12) return [[7, 20]];
      return [[8, 18]];
    },
  },
  // Central America
  {
    rows: [14, 17],
    cols: (r) => {
      if (r <= 15) return [[9, 15]];
      return [[10, 14]];
    },
  },
  // South America
  {
    rows: [17, 30],
    cols: (r) => {
      if (r <= 18) return [[13, 20]];
      if (r <= 20) return [[13, 22]];
      if (r <= 22) return [[12, 22]];
      if (r <= 24) return [[13, 21]];
      if (r <= 26) return [[14, 20]];
      if (r <= 28) return [[15, 19]];
      return [[16, 18]];
    },
  },
  // Europe
  {
    rows: [3, 13],
    cols: (r) => {
      if (r <= 4) return [[34, 40]];
      if (r <= 6) return [[32, 42]];
      if (r <= 8) return [[33, 43]];
      if (r <= 10) return [[34, 42]];
      return [[35, 41]];
    },
  },
  // Africa
  {
    rows: [12, 28],
    cols: (r) => {
      if (r <= 14) return [[33, 42]];
      if (r <= 16) return [[33, 43]];
      if (r <= 18) return [[34, 44]];
      if (r <= 20) return [[34, 43]];
      if (r <= 22) return [[35, 42]];
      if (r <= 24) return [[36, 41]];
      if (r <= 26) return [[37, 40]];
      return [[38, 39]];
    },
  },
  // Asia
  {
    rows: [3, 18],
    cols: (r) => {
      if (r <= 4) return [[42, 68]];
      if (r <= 6) return [[40, 70]];
      if (r <= 8) return [[42, 70]];
      if (r <= 10) return [[44, 68]];
      if (r <= 12) return [[45, 66]];
      if (r <= 14) return [[48, 64]];
      if (r <= 16) return [[50, 62]];
      return [[52, 60]];
    },
  },
  // Australia
  {
    rows: [22, 29],
    cols: (r) => {
      if (r <= 24) return [[58, 66]];
      if (r <= 26) return [[57, 66]];
      if (r <= 28) return [[58, 64]];
      return [[60, 62]];
    },
  },
];

// Build base dots
continentRanges.forEach(({ rows, cols }) => {
  for (let r = rows[0]; r <= rows[1]; r++) {
    const ranges = cols(r);
    ranges.forEach(([cStart, cEnd]) => {
      for (let c = cStart; c <= cEnd; c++) {
        BASE_DOTS.push([c, r]);
      }
    });
  }
});

// Highlighted locations (col, row) — approximate positions on the 72x36 grid
const HIGHLIGHTS: { cx: number; cy: number; label: string }[] = [
  // Brazil cities
  { cx: 18, cy: 21, label: 'São Paulo' },
  { cx: 19, cy: 20, label: 'Rio de Janeiro' },
  { cx: 18, cy: 19, label: 'Belo Horizonte' },
  { cx: 17, cy: 20, label: 'Brasília' },
  { cx: 15, cy: 18, label: 'Manaus' },
  { cx: 18, cy: 18, label: 'Recife' },
  { cx: 17, cy: 22, label: 'Curitiba' },
  { cx: 19, cy: 19, label: 'Salvador' },
  { cx: 16, cy: 19, label: 'Goiânia' },
  { cx: 16, cy: 23, label: 'Porto Alegre' },
  // Portugal
  { cx: 33, cy: 10, label: 'Portugal' },
  // South Korea
  { cx: 61, cy: 10, label: 'Coreia do Sul' },
  // Angola
  { cx: 37, cy: 21, label: 'Angola' },
];

const GRID_SPACING = 12;
const DOT_R = 1.8;
const HIGHLIGHT_R = 3.5;
const SVG_W = 72 * GRID_SPACING;
const SVG_H = 36 * GRID_SPACING;

const highlightSet = new Set(HIGHLIGHTS.map((h) => `${h.cx},${h.cy}`));

const GlobalMapSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-10 md:py-20"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        {/* Title */}
        <h2
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight text-center mb-8 md:mb-14 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          Dalton Lab é global. E está crescendo.
        </h2>

        {/* Dotted World Map */}
        <div className={`w-full max-w-5xl mx-auto mb-8 md:mb-12 ${revealClasses(isVisible)}`}>
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base continent dots */}
            {BASE_DOTS.map(([c, r]) => {
              const key = `${c},${r}`;
              if (highlightSet.has(key)) return null;
              return (
                <circle
                  key={key}
                  cx={c * GRID_SPACING}
                  cy={r * GRID_SPACING}
                  r={DOT_R}
                  fill="rgba(16,24,35,0.13)"
                />
              );
            })}

            {/* Highlight dots with pulse */}
            {HIGHLIGHTS.map((h, i) => (
              <g key={h.label}>
                {/* Pulse ring */}
                <motion.circle
                  cx={h.cx * GRID_SPACING}
                  cy={h.cy * GRID_SPACING}
                  r={HIGHLIGHT_R}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth={1}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={
                    isVisible
                      ? {
                          opacity: [0.6, 0],
                          scale: [1, 3],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeOut',
                  }}
                  style={{ transformOrigin: `${h.cx * GRID_SPACING}px ${h.cy * GRID_SPACING}px` }}
                />
                {/* Solid dot */}
                <motion.circle
                  cx={h.cx * GRID_SPACING}
                  cy={h.cy * GRID_SPACING}
                  r={HIGHLIGHT_R}
                  fill="#3B82F6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  style={{ transformOrigin: `${h.cx * GRID_SPACING}px ${h.cy * GRID_SPACING}px` }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Subtitle with CTA */}
        <p
          className={`text-center text-sm md:text-lg ${revealClasses(isVisible)}`}
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
