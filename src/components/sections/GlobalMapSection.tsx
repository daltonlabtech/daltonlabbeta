import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
import worldMapDots from '@/assets/world-map-dots.png';

const INDUSTRIES: { label: string; bg: string; text: string; border: string }[] = [
  { label: 'Agro', bg: 'rgba(34,197,94,0.12)', text: '#15803d', border: 'rgba(34,197,94,0.25)' },
  { label: 'Tecnologia', bg: 'rgba(59,130,246,0.12)', text: '#1d4ed8', border: 'rgba(59,130,246,0.25)' },
  { label: 'Saúde', bg: 'rgba(239,68,68,0.12)', text: '#b91c1c', border: 'rgba(239,68,68,0.25)' },
  { label: 'Varejo', bg: 'rgba(245,158,11,0.12)', text: '#b45309', border: 'rgba(245,158,11,0.25)' },
  { label: 'Advocacia', bg: 'rgba(139,92,246,0.12)', text: '#6d28d9', border: 'rgba(139,92,246,0.25)' },
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

      <div className={`w-full max-w-7xl mx-auto px-4 ${revealClasses(isVisible)}`}>
        <img
          src={worldMapDots}
          alt="Mapa mundi pontilhado mostrando presença global do Dalton Lab"
          className="w-full h-auto"
        />
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
