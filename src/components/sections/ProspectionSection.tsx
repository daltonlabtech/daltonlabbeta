import { useState } from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import { useTrackSection } from '@/hooks/useTrackSection';
import { trackCtaClick, trackTabChange } from '@/lib/analytics';

type SectorTab = 'vendas' | 'marketing' | 'financeiro' | 'atendimento' | 'operacoes';

const TABS: SectorTab[] = ['vendas', 'marketing', 'financeiro', 'atendimento', 'operacoes'];

const ProspectionSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const sectionRef = useTrackSection('prospection');
  const [activeTab, setActiveTab] = useState<SectorTab>('vendas');

  const getSectorContent = (tab: SectorTab) => ({
    title: t(`home.prospection.${tab}.title`),
    description: t(`home.prospection.${tab}.description`),
    features: t(`home.prospection.${tab}.features`, { returnObjects: true }) as string[],
  });

  const currentSector = getSectorContent(activeTab);

  const handleTabChange = (tab: SectorTab) => {
    setActiveTab(tab);
    trackTabChange(tab, 'prospection');
  };

  const handleCtaClick = () => {
    trackCtaClick(t('home.prospection.cta'), `prospection_${activeTab}`, 'https://chat.daltonlab.ai/');
    window.open('https://chat.daltonlab.ai/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={(el) => {
        if (ref && 'current' in ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        }
        if (sectionRef && 'current' in sectionRef) {
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
      }}
      className="py-[60px] md:py-[100px]"
      style={{ backgroundColor: '#E8E6E3' }}
    >
      <div className="container-main">
        {/* Header */}
        <div className={`text-center mb-8 md:mb-10 ${revealClasses(isVisible)}`}>
          <h2
            className="font-inter font-bold text-3xl md:text-4xl lg:text-[48px] leading-tight mb-3"
            style={{ color: '#101824' }}
          >
            {t('home.prospection.title')}
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(16, 24, 35, 0.7)' }}
          >
            {t('home.prospection.subtitle')}
          </p>
        </div>

        {/* Content Box */}
        <div
          className="rounded-3xl p-6 md:p-10 lg:p-12"
          style={{ backgroundColor: '#F5F3F0' }}
        >
          {/* Tabs */}
          <div className={`flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10 ${revealClasses(isVisible)}`}>
            {TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`
                    px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-900'
                    }
                  `}
                  style={{
                    backgroundColor: isActive ? '#101824' : 'transparent',
                  }}
                >
                  {t(`home.prospection.tabs.${tab}`)}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className={`max-w-2xl ${revealClasses(isVisible)}`} style={getStaggerDelay(1)}>
            <h3
              className="font-inter font-bold text-xl md:text-2xl lg:text-3xl leading-tight mb-4"
              style={{ color: '#101824' }}
            >
              {currentSector.title}
            </h3>

            <p
              className="text-sm md:text-base leading-relaxed mb-6"
              style={{ color: 'rgba(16, 24, 35, 0.6)' }}
            >
              {currentSector.description}
            </p>

            <ul className="space-y-3 mb-8">
              {currentSector.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#101824' }} strokeWidth={2.5} />
                  <span
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: 'rgba(16, 24, 35, 0.7)' }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-2 font-medium text-sm px-6 py-3 rounded-full transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: '#101824',
                color: '#F5F3F0',
              }}
            >
              {t('home.prospection.cta')}
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
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProspectionSection;
