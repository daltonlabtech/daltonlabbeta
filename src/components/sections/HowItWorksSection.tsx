import { useRef } from 'react';
import { BarChart3, FileText, Rocket, ArrowRight } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const steps = [
  {
    number: 1,
    title: "Análise",
    highlight: "Potencial de Faturamento",
    description: "Em uma reunião de 30 minutos, nossos especialistas analisam seu processo e mostram o potencial de aumento de receita com a implementação de um Time de IA.",
    icon: BarChart3,
    color: "dalton-blue"
  },
  {
    number: 2,
    title: "Plano",
    highlight: "Aumento de Vendas",
    description: "Você recebe um plano claro mostrando quais agentes serão implementados e qual o impacto esperado no seu faturamento mensal.",
    icon: FileText,
    color: "dalton-purple"
  },
  {
    number: 3,
    title: "Implementação",
    highlight: "Resultados",
    description: "Implementamos seu Time de Vendas em até 25 dias. Você acompanha o aumento de reuniões e propostas em um painel de controle focado em resultados.",
    icon: Rocket,
    color: "dalton-orange"
  }
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, isVisible } = useScrollReveal();
  
  // Assign ref to section
  if (ref.current === null) {
    (ref as React.MutableRefObject<HTMLElement | null>).current = sectionRef.current;
  }

  const colorClasses: Record<string, { bg: string; text: string }> = {
    "dalton-blue": { bg: "bg-dalton-blue", text: "text-dalton-blue" },
    "dalton-purple": { bg: "bg-dalton-purple", text: "text-dalton-purple" },
    "dalton-orange": { bg: "bg-dalton-orange", text: "text-dalton-orange" },
  };

  return (
    <section ref={(el) => {
      (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    }} className="section-padding bg-dalton-dark">
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center ${revealClasses(isVisible)}`}
        >
          O Método Dalton
        </h2>
        
        {/* Subtitle */}
        <p 
          className={`mt-4 font-inter font-light text-lg tracking-[0.15em] uppercase text-dalton-gray-light text-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          TRÊS PASSOS
        </p>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const colors = colorClasses[step.color];
            
            return (
              <div 
                key={step.number}
                className={`glass-card p-8 rounded-2xl text-center ${revealClasses(isVisible)}`}
                style={getStaggerDelay(index + 2)}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center mx-auto`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Title with highlighted word */}
                <h3 className="mt-6 font-inter font-semibold text-lg text-white leading-snug">
                  {step.title}{" "}
                  <span className="text-dalton-gray-light">|</span>{" "}
                  <span className={`${colors.text}`}>{step.highlight}</span>
                </h3>

                {/* Description */}
                <p className="mt-4 font-inter font-normal text-[15px] text-dalton-gray-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div 
          className={`mt-12 text-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(5)}
        >
          <button className="group bg-white text-zinc-900 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
            <span>Quero conhecer</span>
            <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
