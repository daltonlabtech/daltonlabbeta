import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
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
      className="section-padding bg-[#101823] overflow-hidden"
    >
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-[#F5F3F0] text-center ${revealClasses(isVisible)}`}
        >
          Marcas que confiam em nosso trabalho
        </h2>

        {/* Testimonials Cards - Horizontal Marquee on Desktop */}
        <div className="mt-16">
          {/* Mobile: Static Grid */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-[#E8E6E3] rounded-2xl p-8 flex flex-col"
              >
                <div className="mb-6">
                  <img src={testimonial.logo} alt="Logo cliente" className="h-24 object-contain brightness-0" />
                </div>
                <blockquote className="font-inter text-base text-[#1A232F]/80 leading-relaxed flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <p className="mt-6 font-inter font-medium text-sm text-[#1A232F]">
                  -{testimonial.author}, {testimonial.role}
                </p>
                <div className="mt-6 inline-flex items-center gap-3 bg-[#1A232F] rounded-xl px-5 py-4 self-start">
                  <span className="font-inter font-bold text-2xl text-white">{testimonial.metric}</span>
                  <span className="font-inter font-normal text-xs text-white/70 max-w-[80px] leading-tight">
                    {testimonial.metricLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal Marquee */}
          <div className="hidden md:block overflow-hidden">
            <div className="flex animate-marquee-testimonials">
              {/* First set */}
              {testimonials.map((testimonial, index) => (
                <div 
                  key={`first-${index}`}
                  className="flex-shrink-0 w-[380px] mx-3 bg-[#E8E6E3] rounded-2xl p-8 flex flex-col hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="mb-6">
                    <img src={testimonial.logo} alt="Logo cliente" className="h-24 object-contain brightness-0" />
                  </div>
                  <blockquote className="font-inter text-base text-[#1A232F]/80 leading-relaxed flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="mt-6 font-inter font-medium text-sm text-[#1A232F]">
                    -{testimonial.author}, {testimonial.role}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-3 bg-[#1A232F] rounded-xl px-5 py-4 self-start">
                    <span className="font-inter font-bold text-2xl text-white">{testimonial.metric}</span>
                    <span className="font-inter font-normal text-xs text-white/70 max-w-[80px] leading-tight">
                      {testimonial.metricLabel}
                    </span>
                  </div>
                </div>
              ))}
              {/* Second set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <div 
                  key={`second-${index}`}
                  className="flex-shrink-0 w-[380px] mx-3 bg-[#E8E6E3] rounded-2xl p-8 flex flex-col hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="mb-6">
                    <img src={testimonial.logo} alt="Logo cliente" className="h-24 object-contain brightness-0" />
                  </div>
                  <blockquote className="font-inter text-base text-[#1A232F]/80 leading-relaxed flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="mt-6 font-inter font-medium text-sm text-[#1A232F]">
                    -{testimonial.author}, {testimonial.role}
                  </p>
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
      </div>
    </section>
  );
};

export default SocialProofSection;