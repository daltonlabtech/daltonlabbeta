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
      className="py-6 md:py-[40px]"
      style={{
        backgroundColor: '#121823',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '120px 120px'
      }}
    >
      <div className="container-main text-center">
        {/* Title */}
        <h2
          className={`font-inter font-bold text-base md:text-xl lg:text-2xl leading-tight ${revealClasses(isVisible)}`}
          style={{ color: '#F5F3F0' }}
        >
          {t('home.finalCta.title')}{t('home.finalCta.titleLine2') ? ` ${t('home.finalCta.titleLine2')}` : ''}
        </h2>

        {/* Subtitle */}
        <p
          className={`mt-2 md:mt-4 text-xs md:text-base max-w-xl mx-auto ${revealClasses(isVisible)}`}
          style={{ 
            color: 'rgba(245, 243, 240, 0.7)',
            ...getStaggerDelay(1)
          }}
        >
          {t('home.finalCta.subtitle')}
        </p>

        {/* CTA Button - Outline Style */}
        <div
          className={`mt-4 md:mt-8 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(2)}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center font-medium text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-[#F5F3F0] text-[#F5F3F0] hover:bg-[#F5F3F0]/10 transition-all duration-300"
          >
            {t('home.finalCta.cta')}
          </button>
          <p
            className="mt-3 text-[10px] md:text-xs"
            style={{ color: 'rgba(245, 243, 240, 0.5)' }}
          >
            {t('home.finalCta.disclaimer')}
          </p>
        </div>

        <WaitlistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formLocation="final_cta_meetup_sp"
          product="Meetup SP"
        />
      </div>
    </section>
  );
};

export default HomeFinalCTASection;
