import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

interface Pillar {
  number: string;
  title: string;
  summary: string;
  details: string;
}

const PillarCard = ({ pillar, index, isVisible }: { pillar: Pillar; index: number; isVisible: boolean }) => {
  return (
    <div
      className={`p-4 md:p-8 rounded-xl md:rounded-2xl transition-all duration-700 ${revealClasses(isVisible)}`}
      style={{ 
        ...getStaggerDelay(index + 1),
        backgroundColor: '#E8E6E3',
      }}
    >
      <span
        className="font-inter text-xs md:text-sm font-medium block mb-2 md:mb-4"
        style={{ color: 'rgba(16, 24, 35, 0.4)' }}
      >
        {pillar.number}
      </span>

      <h3
        className="font-inter font-bold text-base md:text-2xl mb-2 md:mb-3 whitespace-pre-line"
        style={{ color: '#101824' }}
      >
        {pillar.title}
      </h3>

      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ color: 'rgba(16, 24, 35, 0.7)' }}
      >
        {pillar.summary}
      </p>
    </div>
  );
};

const JourneySection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const pillars = t('home.journey.pillars', { returnObjects: true }) as Pillar[];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="journey"
      className="py-10 md:py-[100px]"
      style={{ backgroundColor: '#E8E6E3' }}
    >
      <div className="container-main">
        <div className={`text-center mb-6 md:mb-16 ${revealClasses(isVisible)}`}>
          <h2
            className="font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight mb-2 md:mb-4"
            style={{ color: '#101824' }}
          >
            {t('home.journey.title')}
          </h2>
          <p
            className="text-sm md:text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(16, 24, 35, 0.7)' }}
          >
            {t('home.journey.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.number}
              pillar={pillar}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
