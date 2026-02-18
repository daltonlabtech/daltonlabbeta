import { motion } from 'framer-motion';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
import worldMap from '@/assets/world-map.webp';

const INDUSTRIES: { label: string; bg: string; text: string; border: string }[] = [
  { label: 'Agro', bg: 'rgba(34,197,94,0.12)', text: '#15803d', border: 'rgba(34,197,94,0.25)' },
  { label: 'Tecnologia', bg: 'rgba(59,130,246,0.12)', text: '#1d4ed8', border: 'rgba(59,130,246,0.25)' },
  { label: 'Saúde', bg: 'rgba(239,68,68,0.12)', text: '#b91c1c', border: 'rgba(239,68,68,0.25)' },
  { label: 'Varejo', bg: 'rgba(245,158,11,0.12)', text: '#b45309', border: 'rgba(245,158,11,0.25)' },
  { label: 'Advocacia', bg: 'rgba(139,92,246,0.12)', text: '#6d28d9', border: 'rgba(139,92,246,0.25)' },
];

const HIGHLIGHT_COLOR = '#3B82F6';

// Positions as percentages of the map image (left%, top%)
const HIGHLIGHTS: { left: number; top: number; label: string }[] = [
  // Brazil
  { left: 28, top: 58, label: 'São Paulo' },
  { left: 30, top: 54, label: 'Rio de Janeiro' },
  { left: 27, top: 50, label: 'Belo Horizonte' },
  { left: 25, top: 52, label: 'Brasília' },
  { left: 22, top: 42, label: 'Manaus' },
  { left: 31, top: 46, label: 'Recife' },
  { left: 28, top: 63, label: 'Curitiba' },
  { left: 30, top: 48, label: 'Salvador' },
  { left: 25, top: 55, label: 'Goiânia' },
  { left: 26, top: 67, label: 'Porto Alegre' },
  // Portugal
  { left: 44, top: 28, label: 'Portugal' },
  // South Korea
  { left: 82, top: 26, label: 'Coreia do Sul' },
  // Angola
  { left: 50, top: 60, label: 'Angola' },
];

const REGION_LABELS: { label: string; left: number; top: number }[] = [
  { label: 'América do Sul', left: 18, top: 72 },
  { label: 'Europa', left: 46, top: 14 },
  { label: 'África', left: 50, top: 42 },
  { label: 'Ásia', left: 75, top: 14 },
];

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
      </div>

      {/* Full-width Map */}
      <div className={`relative w-full max-w-7xl mx-auto px-4 ${revealClasses(isVisible)}`}>
        <img
          src={worldMap}
          alt="World map showing Dalton Lab global presence"
          className="w-full h-auto rounded-2xl"
        />

        {/* Region labels overlay */}
        {REGION_LABELS.map((rl) => (
          <div
            key={rl.label}
            className="absolute px-3 py-1 rounded-full text-white font-inter font-medium text-[9px] md:text-[11px] pointer-events-none"
            style={{
              left: `${rl.left}%`,
              top: `${rl.top}%`,
              backgroundColor: 'rgba(15,23,41,0.75)',
              border: `1px solid rgba(59,130,246,0.5)`,
            }}
          >
            {rl.label}
          </div>
        ))}

        {/* Animated highlight dots */}
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={`${h.label}-${i}`}
            className="absolute"
            style={{
              left: `${h.left}%`,
              top: `${h.top}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 12,
                height: 12,
                left: -6,
                top: -6,
                border: `1.5px solid ${HIGHLIGHT_COLOR}`,
              }}
              initial={{ opacity: 0, scale: 1 }}
              animate={
                isVisible
                  ? { opacity: [0.6, 0], scale: [1, 2.5] }
                  : {}
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
            {/* Solid dot */}
            <motion.div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: HIGHLIGHT_COLOR,
                boxShadow: `0 0 6px ${HIGHLIGHT_COLOR}`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
            />
          </div>
        ))}
      </div>

      <div className="container-main">
        {/* Subtitle with CTA */}
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
