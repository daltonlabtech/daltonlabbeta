import { useState } from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import { useTrackSection } from '@/hooks/useTrackSection';
import { trackCtaClick, trackTabChange } from '@/lib/analytics';

type SectorTab = 'vendas' | 'marketing' | 'financeiro' | 'atendimento' | 'operacoes';

const TABS: SectorTab[] = ['vendas', 'marketing', 'financeiro', 'atendimento', 'operacoes'];

const TAB_COLORS: Record<SectorTab, string> = {
  vendas: '#D4E8D0',
  marketing: '#D0D8E8',
  financeiro: '#E8E0D0',
  atendimento: '#E0D0E8',
  operacoes: '#E8D0D0',
};

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
    trackCtaClick(t('home.prospection.cta'), `prospection_${activeTab}`, 'mailto:administrativo@daltonlab.ai');
    window.location.href = 'mailto:administrativo@daltonlab.ai';
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
      className="py-4 md:py-[35px]"
      style={{ backgroundColor: '#E8E6E3' }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-6 lg:gap-12 items-center">
          {/* Left: Fixed title */}
          <div className={`${revealClasses(isVisible)}`}>
            <h2
              className="font-inter font-normal text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight"
              style={{ color: '#101824' }}
            >
              Reimagine seus setores AI-first
            </h2>
          </div>

          {/* Right: Card with tabs + content */}
          <div
            className={`rounded-xl md:rounded-3xl p-4 md:p-8 lg:p-10 ${revealClasses(isVisible)}`}
            style={{ backgroundColor: '#F5F3F0', ...getStaggerDelay(1) }}
          >
            {/* Tabs */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
              {TABS.map(tab => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`
                      px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap
                      ${isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}
                    `}
                    style={{
                      backgroundColor: isActive ? TAB_COLORS[tab] : 'transparent',
                    }}
                  >
                    {t(`home.prospection.tabs.${tab}`)}
                  </button>
                );
              })}
            </div>

            {/* Sector content */}
            <h3
              className="font-inter font-bold text-base md:text-xl lg:text-2xl leading-tight mb-2 md:mb-3"
              style={{ color: '#101824' }}
            >
              {currentSector.title}
            </h3>

            <p
              className="text-xs md:text-sm leading-relaxed mb-4 md:mb-5"
              style={{ color: 'rgba(16, 24, 35, 0.6)' }}
            >
              {currentSector.description}
            </p>

            <ul className="space-y-2 md:space-y-3 mb-5 md:mb-6">
              {currentSector.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 md:gap-3">
                  <Check className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" style={{ color: '#101824' }} strokeWidth={2.5} />
                  <span
                    className="text-xs md:text-sm leading-relaxed"
                    style={{ color: 'rgba(16, 24, 35, 0.7)' }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center font-medium text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: '#101824',
                color: '#F5F3F0',
              }}
            >
              {t('home.prospection.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProspectionSection;
