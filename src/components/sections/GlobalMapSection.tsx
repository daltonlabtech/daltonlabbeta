import { motion } from 'framer-motion';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';

const INDUSTRIES = ['Agro', 'Tecnologia', 'Saúde', 'Varejo', 'Advocacia'];

// Simplified continent SVG paths (viewBox 1000x500)
const CONTINENTS = [
  // North America
  'M 60 60 L 120 40 L 180 50 L 220 70 L 240 100 L 230 130 L 200 150 L 170 160 L 140 170 L 120 180 L 100 170 L 80 140 L 60 120 Z',
  // Central America
  'M 120 180 L 140 170 L 155 185 L 150 200 L 140 210 L 130 205 L 120 195 Z',
  // South America
  'M 150 210 L 180 200 L 210 210 L 230 230 L 240 260 L 245 290 L 240 320 L 230 350 L 210 380 L 195 395 L 185 390 L 175 370 L 170 340 L 165 310 L 160 280 L 155 250 L 150 230 Z',
  // Europe
  'M 440 50 L 470 40 L 510 45 L 530 60 L 540 80 L 535 100 L 520 115 L 500 120 L 480 125 L 460 120 L 445 105 L 440 80 Z',
  // Africa
  'M 450 140 L 480 130 L 520 135 L 550 150 L 560 180 L 565 210 L 560 250 L 550 280 L 535 310 L 515 330 L 500 335 L 485 325 L 470 300 L 460 270 L 455 240 L 450 210 L 445 180 Z',
  // Middle East
  'M 540 100 L 580 90 L 610 100 L 620 120 L 615 140 L 600 150 L 575 145 L 555 135 L 545 120 Z',
  // Asia (main)
  'M 530 40 L 600 30 L 680 35 L 750 45 L 800 55 L 830 70 L 840 90 L 835 110 L 820 130 L 790 145 L 760 150 L 730 148 L 700 140 L 670 135 L 640 130 L 620 120 L 610 100 L 580 90 L 550 70 Z',
  // Southeast Asia / Indonesia
  'M 730 160 L 760 155 L 790 160 L 810 170 L 800 185 L 780 190 L 755 185 L 735 175 Z',
  'M 790 190 L 820 185 L 845 195 L 840 210 L 820 215 L 800 208 Z',
  // Japan / Korea
  'M 820 70 L 840 65 L 855 75 L 850 95 L 840 105 L 825 100 Z',
  // Australia
  'M 760 270 L 810 260 L 860 270 L 880 290 L 875 320 L 855 345 L 830 355 L 800 350 L 775 335 L 760 310 L 755 290 Z',
];

// Highlight points with region colors
const HIGHLIGHTS: { cx: number; cy: number; label: string; region: string }[] = [
  // Brazil
  { cx: 210, cy: 250, label: 'São Paulo', region: 'south-america' },
  { cx: 220, cy: 240, label: 'Rio de Janeiro', region: 'south-america' },
  { cx: 205, cy: 235, label: 'Belo Horizonte', region: 'south-america' },
  { cx: 195, cy: 240, label: 'Brasília', region: 'south-america' },
  { cx: 175, cy: 220, label: 'Manaus', region: 'south-america' },
  { cx: 220, cy: 225, label: 'Recife', region: 'south-america' },
  { cx: 205, cy: 260, label: 'Curitiba', region: 'south-america' },
  { cx: 215, cy: 230, label: 'Salvador', region: 'south-america' },
  { cx: 190, cy: 245, label: 'Goiânia', region: 'south-america' },
  { cx: 195, cy: 270, label: 'Porto Alegre', region: 'south-america' },
  // Portugal
  { cx: 440, cy: 105, label: 'Portugal', region: 'europe' },
  // South Korea
  { cx: 830, cy: 90, label: 'Coreia do Sul', region: 'asia' },
  // Angola
  { cx: 475, cy: 270, label: 'Angola', region: 'africa' },
];

const REGION_COLORS: Record<string, string> = {
  'south-america': '#10B981',
  'europe': '#8B5CF6',
  'africa': '#EC4899',
  'asia': '#EF4444',
};

const REGION_LABELS: { label: string; region: string; x: number; y: number }[] = [
  { label: 'América do Sul', region: 'south-america', x: 160, y: 200 },
  { label: 'Europa', region: 'europe', x: 455, y: 55 },
  { label: 'África', region: 'africa', x: 490, y: 170 },
  { label: 'Ásia', region: 'asia', x: 780, y: 60 },
];

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
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight text-center mb-4 md:mb-6 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          Dalton Lab é global. E está crescendo.
        </h2>

        {/* Industry Tags */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-14 ${revealClasses(isVisible)}`}>
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="font-inter text-xs md:text-sm px-4 py-1.5 rounded-full border"
              style={{
                color: 'rgba(16,24,35,0.6)',
                borderColor: 'rgba(16,24,35,0.12)',
                backgroundColor: 'rgba(16,24,35,0.03)',
              }}
            >
              {industry}
            </span>
          ))}
        </div>

        {/* Map Container */}
        <div
          className={`w-full max-w-5xl mx-auto mb-8 md:mb-12 rounded-2xl overflow-hidden ${revealClasses(isVisible)}`}
          style={{ backgroundColor: '#0F1729' }}
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Continent shapes */}
            {CONTINENTS.map((d, i) => (
              <path key={i} d={d} fill="#1E293B" />
            ))}

            {/* Region labels */}
            {REGION_LABELS.map((rl) => (
              <g key={rl.label}>
                <rect
                  x={rl.x - 2}
                  y={rl.y - 10}
                  width={rl.label.length * 7.5 + 12}
                  height={18}
                  rx={9}
                  fill="rgba(15,23,41,0.7)"
                  stroke={REGION_COLORS[rl.region]}
                  strokeWidth={1}
                />
                <text
                  x={rl.x + 4}
                  y={rl.y + 2}
                  fill="white"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                >
                  {rl.label}
                </text>
              </g>
            ))}

            {/* Highlight dots with pulse */}
            {HIGHLIGHTS.map((h, i) => {
              const color = REGION_COLORS[h.region];
              return (
                <g key={`${h.label}-${i}`}>
                  <motion.circle
                    cx={h.cx}
                    cy={h.cy}
                    r={5}
                    fill="none"
                    stroke={color}
                    strokeWidth={1}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={
                      isVisible
                        ? { opacity: [0.6, 0], scale: [1, 3] }
                        : {}
                    }
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: `${h.cx}px ${h.cy}px` }}
                  />
                  <motion.circle
                    cx={h.cx}
                    cy={h.cy}
                    r={4}
                    fill={color}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                    style={{ transformOrigin: `${h.cx}px ${h.cy}px` }}
                  />
                </g>
              );
            })}
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
