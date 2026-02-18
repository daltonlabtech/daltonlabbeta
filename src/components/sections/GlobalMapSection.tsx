import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
import { useTypewriter } from '@/hooks/useTypewriter';
import worldMapHighlighted from '@/assets/world-map-highlighted.png';

const SECTORS = [
  { word: 'Agro', color: '#15803d' },
  { word: 'Tecnologia', color: '#b45309' },
  { word: 'Saúde', color: '#b91c1c' },
  { word: 'Varejo', color: '#b45309' },
  { word: 'Advocacia', color: '#6d28d9' },
];

const REGION_LABELS = [
  { label: 'América do Sul', left: '25%', top: '64%' },
  { label: 'Europa', left: '48%', top: '25%' },
  { label: 'África', left: '52%', top: '54%' },
  { label: 'Ásia', left: '77%', top: '25%' },
];

const GlobalMapSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { displayText, wordIndex } = useTypewriter({
    words: SECTORS.map((s) => s.word),
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-10 md:py-14"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        <h2
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight text-center mb-8 md:mb-10 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          Atuação global nos setores de{' '}
          <span style={{ color: SECTORS[wordIndex].color }}>{displayText}</span>
          <span className="animate-pulse" style={{ color: SECTORS[wordIndex].color }}>|</span>
        </h2>
      </div>

      <div className={`w-full max-w-7xl mx-auto px-4 ${revealClasses(isVisible)}`}>
        <div className="relative">
          <img
            src={worldMapHighlighted}
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
