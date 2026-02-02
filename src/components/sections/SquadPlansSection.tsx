import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useTrackSection } from '@/hooks/useTrackSection';
import { trackCtaClick } from '@/lib/analytics';

const SquadPlansSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const sectionRef = useTrackSection('squad_plans');

  const plans = [
    {
      key: 'vendas',
      name: t('plans.vendas.name'),
      description: t('plans.vendas.description'),
      listTitle: t('plans.vendas.listTitle'),
      items: t('plans.vendas.items', { returnObjects: true }) as string[],
      ctaText: t('plans.vendas.cta'),
      ctaLink: "https://chat.daltonlab.ai/",
    },
    {
      key: 'enterprise',
      name: t('plans.enterprise.name'),
      description: t('plans.enterprise.description'),
      listTitle: t('plans.enterprise.listTitle'),
      items: t('plans.enterprise.items', { returnObjects: true }) as string[],
      ctaText: t('plans.enterprise.cta'),
      ctaLink: "https://chat.daltonlab.ai/",
    }
  ];

  const handleCtaClick = (planKey: string, ctaText: string, ctaLink: string) => {
    const location = planKey === 'vendas' ? 'squad_vendas' : 'squad_enterprise';
    trackCtaClick(ctaText, location, ctaLink);
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
      className="section-padding relative overflow-hidden bg-[#101823]"
    >
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      <div className="container-main relative z-10">
        {/* Plans Grid - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {plans.map((plan, index) => {
            return (
              <div 
                key={plan.key}
                className={`relative p-8 flex flex-col bg-[#F5F3F0] rounded-2xl min-h-[400px]
                  transform transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}
                style={{
                  transitionDelay: `${(index + 1) * 150}ms`,
                }}
              >
                {/* Plan Name - Title size, centered */}
                <h3 className="font-inter font-bold text-2xl md:text-3xl lg:text-[32px] text-[#1A232F] text-center">
                  {plan.name}
                </h3>

                {/* Description - Smaller text */}
                <p className="mt-3 font-inter font-normal text-sm md:text-base text-[#1A232F]/70 leading-relaxed text-center">
                  {plan.description}
                </p>

                {/* Items List - Check icon only, no checkbox, larger text */}
                <div className="mt-8">
                  <p className="font-inter font-semibold text-sm text-[#1A232F]/50 uppercase tracking-wider mb-4">
                    {plan.listTitle}
                  </p>
                  <ul className="space-y-3">
                    {plan.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-[#1A232F] flex-shrink-0" strokeWidth={2.5} />
                        <span className="font-inter text-base text-[#1A232F]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-grow" />

                {/* CTA Button - Rounded like header button */}
                <a 
                  href={plan.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick(plan.key, plan.ctaText, plan.ctaLink)}
                  className="mt-8 w-full py-3.5 rounded-full font-inter font-semibold text-base flex items-center justify-center transition-all duration-300 bg-[#101823] text-white hover:bg-[#1a2533]"
                >
                  {plan.ctaText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SquadPlansSection;
