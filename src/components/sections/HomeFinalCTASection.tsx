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

        {/* CTA Button */}
        <div
          className={`mt-8 md:mt-10 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          <a
            href="https://chat.daltonlab.ai/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-2 font-medium text-sm px-6 py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            style={{
              backgroundColor: '#F5F3F0',
              color: '#101823',
            }}
          >
            {t('home.finalCta.cta')}
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeFinalCTASection;
