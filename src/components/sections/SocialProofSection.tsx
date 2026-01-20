import { ArrowRight } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const testimonials = [
  {
    logo: '▲',
    logoText: 'TYFONE',
    quote: "Você vai de reunião em reunião e depois fica preso ao acompanhamento. Seguir adiante é muito desafiador.",
    author: "Siva",
    role: "fundadora da Tyfone",
    metric: "10x",
    metricLabel: "aumento em leads"
  },
  {
    logo: '◆',
    logoText: 'VENDAS+',
    quote: "Em 3 meses, triplicamos o número de reuniões agendadas sem aumentar a equipe. O ROI foi impressionante.",
    author: "Marina Santos",
    role: "CEO da Vendas Plus",
    metric: "3x",
    metricLabel: "mais pipeline"
  },
  {
    logo: '●',
    logoText: 'GROWTH',
    quote: "Os agentes trabalham 24/7 e nunca esquecem um follow-up. Nosso pipeline nunca esteve tão cheio.",
    author: "Ricardo Mendes",
    role: "Head de Vendas, Growth",
    metric: "-40%",
    metricLabel: "custo por lead"
  }
];

const SocialProofSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-[#F5F3F0]"
    >
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A232F] text-center ${revealClasses(isVisible)}`}
        >
          Marcas que confiam em nosso trabalho
        </h2>

        {/* Testimonials Cards */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-[#E8E6E3] rounded-2xl p-8 flex flex-col ${revealClasses(isVisible)}`}
                style={getStaggerDelay(index + 1)}
              >
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl text-[#1A232F]">{testimonial.logo}</span>
                  <span className="font-inter font-bold text-lg text-[#1A232F]">{testimonial.logoText}</span>
                </div>

                {/* Quote */}
                <blockquote className="font-inter text-base text-[#1A232F]/80 leading-relaxed flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <p className="mt-6 font-inter font-medium text-sm text-[#1A232F]">
                  -{testimonial.author}, {testimonial.role}
                </p>

                {/* Metric Badge */}
                <div className="mt-6 inline-flex items-center gap-3 bg-[#1A232F] rounded-xl px-5 py-4 self-start">
                  <span className="font-inter font-bold text-2xl text-white">{testimonial.metric}</span>
                  <span className="font-inter font-normal text-xs text-white/70 max-w-[80px] leading-tight">
                    {testimonial.metricLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div 
          className={`mt-16 text-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(5)}
        >
          <button className="group bg-[#101823] text-white font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#1A232F] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
            <span>Fale com o Dalton</span>
            <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;