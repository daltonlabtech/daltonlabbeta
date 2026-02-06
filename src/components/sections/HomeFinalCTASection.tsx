import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import WaitlistModal from '@/components/ui/WaitlistModal';

const HomeFinalCTASection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[30px] md:py-[40px]"
      style={{ backgroundColor: '#121823' }}
    >
      <div className="container-main text-center">
        {/* Title */}
        <h2
          className={`font-inter font-bold text-lg md:text-xl lg:text-2xl leading-tight ${revealClasses(isVisible)}`}
          style={{ color: '#F5F3F0' }}
        >
          {t('home.finalCta.title')} {t('home.finalCta.titleLine2')}
        </h2>

        {/* Subtitle */}
        <p
          className={`mt-4 text-sm md:text-base max-w-xl mx-auto ${revealClasses(isVisible)}`}
          style={{ 
            color: 'rgba(245, 243, 240, 0.7)',
            ...getStaggerDelay(1)
          }}
        >
          {t('home.finalCta.subtitle')}
        </p>

        {/* CTA Button - Outline Style */}
        <div
          className={`mt-6 md:mt-8 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(2)}
        >
          <a
            href="https://chat.daltonlab.ai/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center font-medium text-xs md:text-sm px-5 py-2.5 rounded-full border hover:bg-[#F5F3F0] hover:text-[#101823] transition-all duration-300"
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
