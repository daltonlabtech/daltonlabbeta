import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import teamPhoto from '@/assets/team/dalton-team.webp';

const DefinitionSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[60px] md:py-[100px]"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        {/* Title */}
        <h2
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-[48px] leading-tight text-center mb-10 md:mb-16 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          {t('home.definition.title')}
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className={`space-y-6 ${revealClasses(isVisible)}`} style={getStaggerDelay(1)}>
            <p
              className="text-base md:text-lg leading-relaxed text-justify"
              style={{ color: 'rgba(16, 24, 35, 0.7)' }}
            >
              {t('home.definition.paragraph1')}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed text-justify"
              style={{ color: 'rgba(16, 24, 35, 0.7)' }}
            >
              {t('home.definition.paragraph2')}
            </p>
            <p
              className="text-base md:text-lg leading-relaxed text-justify"
              style={{ color: 'rgba(16, 24, 35, 0.7)' }}
            >
              {t('home.definition.paragraph3')}
            </p>
          </div>

          {/* Right: Image */}
          <div className={`${revealClasses(isVisible, 'right')}`} style={getStaggerDelay(2)}>
            <img
              src={teamPhoto}
              alt="Organograma agêntico - Dalton Lab"
              className="w-full rounded-2xl object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefinitionSection;
