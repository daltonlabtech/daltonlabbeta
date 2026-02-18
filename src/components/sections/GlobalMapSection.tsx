import { motion } from 'framer-motion';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
import worldMapDots from '@/assets/world-map-dots.png';

const INDUSTRIES: { label: string; bg: string; text: string; border: string }[] = [
  { label: 'Agro', bg: 'rgba(34,197,94,0.12)', text: '#15803d', border: 'rgba(34,197,94,0.25)' },
  { label: 'Tecnologia', bg: 'rgba(59,130,246,0.12)', text: '#1d4ed8', border: 'rgba(59,130,246,0.25)' },
  { label: 'Saúde', bg: 'rgba(239,68,68,0.12)', text: '#b91c1c', border: 'rgba(239,68,68,0.25)' },
  { label: 'Varejo', bg: 'rgba(245,158,11,0.12)', text: '#b45309', border: 'rgba(245,158,11,0.25)' },
  { label: 'Advocacia', bg: 'rgba(139,92,246,0.12)', text: '#6d28d9', border: 'rgba(139,92,246,0.25)' },
];

const HIGHLIGHT_COLOR = '#3B82F6';

// Pulse points as percentage positions on the map image
const PULSE_POINTS: { left: number; top: number; label: string }[] = [
  // Brazil (10 cities)
  { left: 30.5, top: 62, label: 'São Paulo' },
  { left: 32, top: 59, label: 'Rio de Janeiro' },
  { left: 29, top: 56, label: 'Belo Horizonte' },
  { left: 27.5, top: 58, label: 'Brasília' },
  { left: 24, top: 48, label: 'Manaus' },
  { left: 33, top: 51, label: 'Recife' },
  { left: 30, top: 66, label: 'Curitiba' },
  { left: 32, top: 53, label: 'Salvador' },
  { left: 27, top: 60, label: 'Goiânia' },
  { left: 29, top: 70, label: 'Porto Alegre' },
  // Portugal
  { left: 45, top: 33, label: 'Portugal' },
  // South Korea
  { left: 83, top: 30, label: 'Coreia do Sul' },
  // Angola
  { left: 54, top: 60, label: 'Angola' },
];

// Continent labels as percentage positions
const REGION_LABELS: { label: string; left: number; top: number }[] = [
  { label: 'América do Sul', left: 22, top: 50 },
  { label: 'Europa', left: 48, top: 20 },
  { label: 'África', left: 55, top: 48 },
  { label: 'Ásia', left: 78, top: 18 },
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
        <h2
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight text-center mb-4 md:mb-6 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          O Dalton Lab é global. E está crescendo.
        </h2>

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

      {/* Map with overlay */}
      <div className={`w-full max-w-7xl mx-auto px-4 relative ${revealClasses(isVisible)}`}>
        <img
          src={worldMapDots}
          alt="Mapa mundi pontilhado mostrando presença global do Dalton Lab"
          className="w-full h-auto"
        />

        {/* Region labels */}
        {REGION_LABELS.map((rl) => (
          <div
            key={rl.label}
            className="absolute font-inter text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full border pointer-events-none"
            style={{
              left: `${rl.left}%`,
              top: `${rl.top}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(245,243,240,0.9)',
              borderColor: 'rgba(16,24,35,0.15)',
              color: 'rgba(16,24,35,0.6)',
            }}
          >
            {rl.label}
          </div>
        ))}

        {/* Pulse points */}
        {PULSE_POINTS.map((p, i) => (
          <div
            key={`pulse-${p.label}-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 24,
                height: 24,
                top: -12,
                left: -12,
                border: `2px solid ${HIGHLIGHT_COLOR}`,
              }}
              initial={{ opacity: 0, scale: 1 }}
              animate={isVisible ? { opacity: [0.6, 0], scale: [1, 2.5] } : {}}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeOut',
              }}
            />
            {/* Glow */}
            <div
              className="absolute rounded-full"
              style={{
                width: 16,
                height: 16,
                top: -8,
                left: -8,
                backgroundColor: HIGHLIGHT_COLOR,
                opacity: 0.15,
              }}
            />
            {/* Solid dot */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 8,
                height: 8,
                top: -4,
                left: -4,
                backgroundColor: HIGHLIGHT_COLOR,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
            />
          </div>
        ))}
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
