import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
import worldMapSolid from '@/assets/world-map-solid.png';
import { motion } from 'framer-motion';

const INDUSTRIES: { label: string; bg: string; text: string; border: string }[] = [
  { label: 'Agro', bg: 'rgba(34,197,94,0.12)', text: '#15803d', border: 'rgba(34,197,94,0.25)' },
  { label: 'Tecnologia', bg: 'rgba(59,130,246,0.12)', text: '#1d4ed8', border: 'rgba(59,130,246,0.25)' },
  { label: 'Saúde', bg: 'rgba(239,68,68,0.12)', text: '#b91c1c', border: 'rgba(239,68,68,0.25)' },
  { label: 'Varejo', bg: 'rgba(245,158,11,0.12)', text: '#b45309', border: 'rgba(245,158,11,0.25)' },
  { label: 'Advocacia', bg: 'rgba(139,92,246,0.12)', text: '#6d28d9', border: 'rgba(139,92,246,0.25)' },
];

const PULSE_POINTS = [
  { name: 'Manaus', left: '26%', top: '55%', size: 8, delay: 0 },
  { name: 'Fortaleza', left: '31%', top: '57%', size: 8, delay: 0.3 },
  { name: 'Recife', left: '32%', top: '60%', size: 8, delay: 0.6 },
  { name: 'Salvador', left: '31%', top: '63%', size: 8, delay: 0.9 },
  { name: 'Belo Horizonte', left: '30%', top: '66%', size: 8, delay: 1.2 },
  { name: 'São Paulo', left: '29%', top: '69%', size: 11, delay: 1.5 },
  { name: 'Rio de Janeiro', left: '30.5%', top: '68%', size: 8, delay: 1.8 },
  { name: 'Portugal', left: '45%', top: '33%', size: 8, delay: 0.4 },
  { name: 'Coreia do Sul', left: '83%', top: '31%', size: 8, delay: 0.7 },
  { name: 'Angola', left: '50%', top: '62%', size: 8, delay: 1.0 },
];

const REGION_LABELS = [
  { label: 'América do Sul', left: '25%', top: '64%' },
  { label: 'Europa', left: '48%', top: '25%' },
  { label: 'África', left: '52%', top: '52%' },
  { label: 'Ásia', left: '75%', top: '25%' },
];

const PulsePoint = ({ left, top, size, delay }: { left: string; top: string; size: number; delay: number }) => (
  <div
    className="absolute"
    style={{ left, top, transform: 'translate(-50%, -50%)' }}
  >
    {/* Pulse ring */}
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size * 2.5,
        height: size * 2.5,
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%',
        border: '2px solid #3B82F6',
      }}
      animate={{ opacity: [0.6, 0], scale: [1, 2.5] }}
      transition={{ duration: 2.5, repeat: Infinity, delay, ease: 'easeOut' }}
    />
    {/* Solid dot */}
    <div
      className="rounded-full relative"
      style={{
        width: size,
        height: size,
        backgroundColor: '#3B82F6',
        boxShadow: '0 0 8px rgba(59,130,246,0.5)',
      }}
    />
  </div>
);

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

      <div className={`w-full max-w-7xl mx-auto px-4 ${revealClasses(isVisible)}`}>
        <div className="relative">
          <img
            src={worldMapSolid}
            alt="Mapa mundi mostrando presença global do Dalton Lab"
            className="w-full h-auto"
          />

          {/* Continent labels */}
          {REGION_LABELS.map((label) => (
            <span
              key={label.label}
              className="absolute font-inter text-[10px] md:text-xs font-medium px-2 py-0.5 md:px-3 md:py-1 rounded-full pointer-events-none"
              style={{
                left: label.left,
                top: label.top,
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255,255,255,0.7)',
                color: '#374151',
                border: '1px solid rgba(0,0,0,0.08)',
                backdropFilter: 'blur(4px)',
              }}
            >
              {label.label}
            </span>
          ))}

          {/* Pulse points */}
          {PULSE_POINTS.map((point) => (
            <PulsePoint
              key={point.name}
              left={point.left}
              top={point.top}
              size={point.size}
              delay={point.delay}
            />
          ))}
        </div>
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
