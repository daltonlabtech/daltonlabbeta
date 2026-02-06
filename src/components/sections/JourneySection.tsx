import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

interface Pillar {
  number: string;
  title: string;
  summary: string;
  details: string;
}

const PillarCard = ({ pillar, index, isVisible }: { pillar: Pillar; index: number; isVisible: boolean }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`p-4 md:p-8 rounded-xl md:rounded-2xl transition-all duration-700 ${revealClasses(isVisible)}`}
      style={{ 
        ...getStaggerDelay(index + 1),
        backgroundColor: '#E8E6E3',
      }}
    >
      {/* Number */}
      <span
        className="font-inter text-xs md:text-sm font-medium block mb-2 md:mb-4"
        style={{ color: 'rgba(16, 24, 35, 0.4)' }}
      >
        {pillar.number}
      </span>

      {/* Title */}
      <h3
        className="font-inter font-bold text-base md:text-2xl mb-2 md:mb-3"
        style={{ color: '#101824' }}
      >
        {pillar.title}
      </h3>

      {/* Summary */}
      <p
        className="text-sm md:text-base leading-relaxed mb-3 md:mb-4"
        style={{ color: 'rgba(16, 24, 35, 0.7)' }}
      >
        {pillar.summary}
      </p>

      {/* Expandable details */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isExpanded ? '300px' : '0',
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <p
          className="text-xs md:text-base leading-relaxed pb-2"
          style={{ color: 'rgba(16, 24, 35, 0.6)' }}
        >
          {pillar.details}
        </p>
      </div>

      {/* See more/less toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-1 text-xs md:text-sm font-medium transition-colors duration-200 mt-1 md:mt-2"
        style={{ color: '#101824' }}
      >
        {isExpanded ? t('home.journey.seeLess') : t('home.journey.seeMore')}
        <ChevronDown
          className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
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
        {/* Header */}
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

        {/* Pillars */}
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
