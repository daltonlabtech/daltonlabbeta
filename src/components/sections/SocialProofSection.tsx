import { ArrowRight } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import cliente1 from '@/assets/logos/cliente-1.webp';
import cliente2 from '@/assets/logos/cliente-2.webp';
import cliente3 from '@/assets/logos/cliente-3.webp';

const testimonials = [
  {
    logo: cliente1,
    quote: "Você vai de reunião em reunião e depois fica preso ao acompanhamento. Seguir adiante é muito desafiador.",
    author: "Siva",
    role: "fundadora da Tyfone",
    metric: "10x",
    metricLabel: "aumento em leads"
  },
  {
    logo: cliente2,
    quote: "Em 3 meses, triplicamos o número de reuniões agendadas sem aumentar a equipe. O ROI foi impressionante.",
    author: "Marina Santos",
    role: "CEO da Vendas Plus",
    metric: "3x",
    metricLabel: "mais pipeline"
  },
  {
    logo: cliente3,
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
      className="section-padding bg-[#101823]"
    >
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-[#F5F3F0] text-center ${revealClasses(isVisible)}`}
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
                <div className="mb-6">
                  <img src={testimonial.logo} alt="Logo cliente" className="h-10 object-contain brightness-0" />
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
      </div>
    </section>
  );
};

export default SocialProofSection;