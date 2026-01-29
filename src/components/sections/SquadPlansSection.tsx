import { Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const plans = [
  {
    name: "Agente de Vendas",
    description: "Para empresas que querem escalar seu ciclo comercial",
    listTitle: "O Dalton será responsável por:",
    items: [
      'Qualificar oportunidades',
      'Fazer follow-up',
      'Agendar reuniões',
      'Fechar vendas',
      'Enviar reports via WhatsApp',
    ],
    ctaText: "Fale com o Dalton",
    ctaLink: "https://chat.daltonlab.ai/",
  },
  {
    name: "Consultoria Enterprise",
    description: "Não sabe por onde começar? Descubra o que automatizar e o que manter com humanos.",
    listTitle: "Incluso na consultoria:",
    items: [
      'Diagnóstico estratégico',
      'Organograma agêntico',
      'Agentes de IA personalizados',
      'Acompanhamento contínuo',
    ],
    ctaText: "Agende uma reunião",
    ctaLink: "https://chat.daltonlab.ai/",
  }
];

const SquadPlansSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-[#101823] relative overflow-hidden"
    >
      {/* Checkered Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #F5F3F0 1px, transparent 1px),
            linear-gradient(to bottom, #F5F3F0 1px, transparent 1px)
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
                key={plan.name}
                className={`relative p-8 flex flex-col bg-[#F5F3F0] rounded-2xl min-h-[400px]
                  transform transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}
                style={{
                  transitionDelay: `${(index + 1) * 150}ms`,
                }}
              >
                {/* Plan Name */}
                <h3 className="font-inter font-bold text-2xl text-[#1A232F]">
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="mt-4 font-inter font-normal text-sm text-[#1A232F]/70 leading-relaxed">
                  {plan.description}
                </p>

                {/* Items List - Check icon only, no checkbox */}
                <div className="mt-6">
                  <p className="font-inter font-semibold text-xs text-[#1A232F]/50 uppercase tracking-wider mb-3">
                    {plan.listTitle}
                  </p>
                  <ul className="space-y-2">
                    {plan.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#1A232F] flex-shrink-0" strokeWidth={2.5} />
                        <span className="font-inter text-xs text-[#1A232F]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-grow" />

                {/* CTA Button - Dark blue, no arrow */}
                <a 
                  href={plan.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-3.5 rounded-xl font-inter font-semibold text-sm flex items-center justify-center transition-all duration-300 bg-[#101823] text-white hover:bg-[#1a2533]"
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
