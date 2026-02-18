import { motion } from 'framer-motion';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';

const INDUSTRIES: { label: string; bg: string; text: string; border: string }[] = [
  { label: 'Agro', bg: 'rgba(34,197,94,0.12)', text: '#15803d', border: 'rgba(34,197,94,0.25)' },
  { label: 'Tecnologia', bg: 'rgba(59,130,246,0.12)', text: '#1d4ed8', border: 'rgba(59,130,246,0.25)' },
  { label: 'Saúde', bg: 'rgba(239,68,68,0.12)', text: '#b91c1c', border: 'rgba(239,68,68,0.25)' },
  { label: 'Varejo', bg: 'rgba(245,158,11,0.12)', text: '#b45309', border: 'rgba(245,158,11,0.25)' },
  { label: 'Advocacia', bg: 'rgba(139,92,246,0.12)', text: '#6d28d9', border: 'rgba(139,92,246,0.25)' },
];

// Realistic world map continent paths (viewBox 0 0 1000 500)
const CONTINENTS = [
  // North America
  'M 45 120 Q 50 105 70 95 Q 90 80 115 70 Q 140 60 165 55 Q 175 50 185 48 Q 195 55 210 60 Q 220 55 235 52 Q 245 58 250 65 Q 240 68 235 75 Q 230 82 225 88 Q 235 92 240 100 Q 245 108 248 115 Q 250 125 245 132 Q 238 140 230 148 Q 222 155 215 160 Q 208 165 200 168 Q 192 172 185 175 Q 178 178 170 180 Q 162 182 155 183 Q 148 180 140 178 Q 132 175 128 170 Q 122 165 118 158 Q 112 150 108 142 Q 100 135 92 130 Q 82 128 72 125 Q 60 122 50 120 Z',
  // Greenland
  'M 210 38 Q 225 32 240 35 Q 250 38 255 45 Q 252 55 245 58 Q 238 55 230 52 Q 222 48 215 42 Z',
  // Central America
  'M 128 170 Q 135 175 140 180 Q 148 185 152 192 Q 148 198 145 205 Q 140 210 135 212 Q 130 208 128 202 Q 125 195 122 188 Q 120 182 125 175 Z',
  // South America
  'M 145 215 Q 155 210 168 212 Q 180 215 190 220 Q 200 225 208 232 Q 215 240 220 250 Q 225 260 228 272 Q 230 285 228 298 Q 225 312 220 325 Q 215 338 208 350 Q 200 362 192 372 Q 185 380 178 385 Q 172 388 168 382 Q 165 375 162 365 Q 158 352 155 338 Q 152 322 150 305 Q 148 288 147 270 Q 146 252 145 235 Z',
  // Europe
  'M 430 55 Q 440 48 455 45 Q 468 42 480 45 Q 492 48 502 52 Q 510 58 518 62 Q 525 68 530 75 Q 532 82 530 90 Q 526 98 520 105 Q 512 110 502 115 Q 492 118 482 120 Q 472 118 462 115 Q 452 110 445 105 Q 438 98 435 90 Q 432 82 430 72 Z',
  // Scandinavia
  'M 468 28 Q 475 22 485 25 Q 492 30 495 38 Q 492 45 488 42 Q 482 38 478 35 Q 472 32 468 28 Z',
  // UK
  'M 425 58 Q 430 52 435 55 Q 438 62 435 68 Q 430 65 425 62 Z',
  // Africa
  'M 445 130 Q 458 125 475 128 Q 490 130 505 135 Q 518 142 528 152 Q 535 162 540 175 Q 545 190 548 208 Q 548 225 545 242 Q 540 258 532 275 Q 522 290 510 305 Q 498 315 488 320 Q 478 322 468 318 Q 458 312 450 302 Q 442 290 438 275 Q 435 258 432 240 Q 430 222 432 205 Q 435 188 438 172 Q 440 155 442 140 Z',
  // Madagascar
  'M 555 285 Q 560 280 562 288 Q 562 298 558 305 Q 555 298 555 290 Z',
  // Middle East
  'M 530 95 Q 545 88 560 92 Q 572 98 582 108 Q 588 118 585 128 Q 580 138 572 145 Q 562 148 552 142 Q 542 135 535 125 Q 530 115 528 105 Z',
  // Russia / Central Asia
  'M 520 30 Q 545 22 575 25 Q 605 28 635 32 Q 665 35 695 38 Q 720 42 745 45 Q 760 48 770 52 Q 778 58 780 65 Q 775 72 765 75 Q 750 72 735 68 Q 718 65 700 62 Q 680 60 660 58 Q 640 55 620 55 Q 600 58 585 62 Q 570 68 558 75 Q 548 68 540 60 Q 532 52 525 42 Z',
  // India
  'M 615 120 Q 628 115 640 122 Q 648 130 652 142 Q 655 155 652 168 Q 648 178 640 185 Q 632 182 625 175 Q 618 165 615 152 Q 612 140 612 130 Z',
  // Sri Lanka
  'M 642 192 Q 648 190 650 195 Q 648 200 645 198 Z',
  // China / East Asia
  'M 680 55 Q 700 50 720 52 Q 740 55 758 62 Q 772 68 782 78 Q 788 88 790 100 Q 788 112 782 122 Q 772 130 760 135 Q 748 138 735 135 Q 720 130 708 125 Q 695 118 685 110 Q 678 100 675 88 Q 672 75 675 65 Z',
  // Southeast Asia
  'M 720 148 Q 735 142 748 148 Q 758 155 762 165 Q 758 172 750 178 Q 740 180 732 175 Q 725 168 722 158 Z',
  // Indonesia
  'M 738 188 Q 752 185 768 188 Q 782 192 795 198 Q 802 205 798 212 Q 788 215 775 212 Q 762 208 750 205 Q 740 200 738 195 Z',
  'M 800 195 Q 812 192 822 198 Q 825 205 820 210 Q 812 208 805 205 Q 800 200 800 195 Z',
  // Japan
  'M 798 72 Q 805 65 812 70 Q 815 78 812 88 Q 808 95 802 92 Q 798 85 798 78 Z',
  // Korea
  'M 788 78 Q 792 72 796 78 Q 796 85 792 90 Q 788 85 788 80 Z',
  // Philippines
  'M 775 155 Q 780 150 782 158 Q 780 165 778 170 Q 775 165 775 160 Z',
  // Australia
  'M 760 280 Q 778 272 798 275 Q 818 278 835 285 Q 848 295 855 308 Q 858 322 852 335 Q 842 348 828 355 Q 812 358 795 355 Q 778 348 765 338 Q 755 325 752 310 Q 752 295 755 285 Z',
  // New Zealand
  'M 870 348 Q 875 342 878 348 Q 878 358 875 365 Q 872 358 870 352 Z',
];

// All highlights use blue (#3B82F6)
const HIGHLIGHT_COLOR = '#3B82F6';

const HIGHLIGHTS: { cx: number; cy: number; label: string; region: string }[] = [
  // Brazil
  { cx: 195, cy: 265, label: 'São Paulo', region: 'south-america' },
  { cx: 205, cy: 255, label: 'Rio de Janeiro', region: 'south-america' },
  { cx: 190, cy: 248, label: 'Belo Horizonte', region: 'south-america' },
  { cx: 180, cy: 252, label: 'Brasília', region: 'south-america' },
  { cx: 168, cy: 228, label: 'Manaus', region: 'south-america' },
  { cx: 208, cy: 238, label: 'Recife', region: 'south-america' },
  { cx: 192, cy: 280, label: 'Curitiba', region: 'south-america' },
  { cx: 202, cy: 242, label: 'Salvador', region: 'south-america' },
  { cx: 178, cy: 258, label: 'Goiânia', region: 'south-america' },
  { cx: 185, cy: 290, label: 'Porto Alegre', region: 'south-america' },
  // Portugal
  { cx: 432, cy: 98, label: 'Portugal', region: 'europe' },
  // South Korea
  { cx: 792, cy: 82, label: 'Coreia do Sul', region: 'asia' },
  // Angola
  { cx: 470, cy: 280, label: 'Angola', region: 'africa' },
];

const REGION_LABELS: { label: string; region: string; x: number; y: number }[] = [
  { label: 'América do Sul', region: 'south-america', x: 100, y: 310 },
  { label: 'Europa', region: 'europe', x: 420, y: 42 },
  { label: 'África', region: 'africa', x: 470, y: 168 },
  { label: 'Ásia', region: 'asia', x: 720, y: 42 },
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
          O Dalton Lab é global. E está crescendo.
        </h2>

        {/* Industry Tags - Pastel Colors */}
        <div className={`flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-14 ${revealClasses(isVisible)}`}>
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

        {/* Map Container */}
        <div
          className={`w-full max-w-5xl mx-auto mb-8 md:mb-12 rounded-2xl overflow-hidden ${revealClasses(isVisible)}`}
          style={{ backgroundColor: '#0F1729' }}
        >
          <svg
            viewBox="0 0 1000 420"
            className="w-full h-auto p-4 md:p-8"
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
                  x={rl.x - 4}
                  y={rl.y - 11}
                  width={rl.label.length * 7.5 + 16}
                  height={20}
                  rx={10}
                  fill="rgba(15,23,41,0.75)"
                  stroke={HIGHLIGHT_COLOR}
                  strokeWidth={0.8}
                  strokeOpacity={0.6}
                />
                <text
                  x={rl.x + 4}
                  y={rl.y + 3}
                  fill="white"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  fontWeight="500"
                >
                  {rl.label}
                </text>
              </g>
            ))}

            {/* Highlight dots with pulse - all blue */}
            {HIGHLIGHTS.map((h, i) => (
              <g key={`${h.label}-${i}`}>
                <motion.circle
                  cx={h.cx}
                  cy={h.cy}
                  r={5}
                  fill="none"
                  stroke={HIGHLIGHT_COLOR}
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
                  fill={HIGHLIGHT_COLOR}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  style={{ transformOrigin: `${h.cx}px ${h.cy}px` }}
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
