import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import { trackCtaClick } from '@/lib/analytics';

const HomeFinalCTASection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  const handleCtaClick = () => {
    trackCtaClick(t('home.finalCta.cta'), 'final_cta', 'https://chat.daltonlab.ai/');
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[60px] md:py-[80px]"
      style={{ backgroundColor: '#121823' }}
    >
      <div className="container-main text-center">
        {/* Title */}
        <h2
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-[48px] leading-tight ${revealClasses(isVisible)}`}
          style={{ color: '#F5F3F0' }}
        >
          {t('home.finalCta.title')}
          <br />
          {t('home.finalCta.titleLine2')}
        </h2>

        {/* Subtitle */}
        <p
          className={`mt-6 text-base md:text-lg max-w-2xl mx-auto ${revealClasses(isVisible)}`}
          style={{ 
            color: 'rgba(245, 243, 240, 0.7)',
            ...getStaggerDelay(1)
          }}
        >
          {t('home.finalCta.subtitle')}
        </p>

        {/* CTA Button - Outline Style */}
        <div
          className={`mt-8 md:mt-10 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(2)}
        >
          <a
            href="https://chat.daltonlab.ai/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center font-medium text-sm px-6 py-3 rounded-full border hover:bg-[#F5F3F0] hover:text-[#101823] transition-all duration-300"
            style={{
              borderColor: '#F5F3F0',
              color: '#F5F3F0',
            }}
          >
            {t('home.finalCta.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeFinalCTASection;
