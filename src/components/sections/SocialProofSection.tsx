import { useState, useRef, useEffect } from 'react';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
import useEmblaCarousel from 'embla-carousel-react';
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
  },
  {
    logo: cliente1,
    quote: "A automação de follow-ups nos permitiu focar no que realmente importa: fechar negócios.",
    author: "Carlos Lima",
    role: "Diretor Comercial, SalesMax",
    metric: "2x",
    metricLabel: "taxa de conversão"
  },
  {
    logo: cliente2,
    quote: "Nunca imaginei que poderíamos escalar vendas sem contratar mais vendedores. O Dalton fez isso acontecer.",
    author: "Ana Paula",
    role: "CMO, GrowthTech",
    metric: "+85%",
    metricLabel: "leads qualificados"
  },
];

const SocialProofSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 md:py-20 bg-[#101823] overflow-hidden"
    >
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-[#F5F3F0] text-center ${revealClasses(isVisible)}`}
        >
          Marcas que confiam em nosso trabalho
        </h2>

        {/* Scroll hint */}
        <p className="text-center text-[#F5F3F0]/50 text-sm mt-4 mb-8">
          ← Arraste para explorar →
        </p>
      </div>

      {/* Carousel Container */}
      <div className="mt-8">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => {
              const isActive = index === selectedIndex;
              const distance = Math.abs(index - selectedIndex);
              const isAdjacent = distance === 1 || distance === testimonials.length - 1;
              
              return (
                <div 
                  key={index}
                  className="flex-shrink-0 px-3 md:px-4"
                  style={{ 
                    flexBasis: '85%',
                    maxWidth: '380px',
                  }}
                >
                  <div 
                    className={`bg-[#E8E6E3] rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500 ${
                      isActive 
                        ? 'scale-100 opacity-100 shadow-2xl' 
                        : isAdjacent 
                          ? 'scale-95 opacity-60 blur-[1px]' 
                          : 'scale-90 opacity-40 blur-[2px]'
                    }`}
                    style={{
                      minHeight: '360px',
                    }}
                  >
                    <div className="mb-6">
                      <img 
                        src={testimonial.logo} 
                        alt="Logo cliente" 
                        className="h-20 md:h-24 object-contain brightness-0" 
                      />
                    </div>
                    <blockquote className="font-inter text-sm md:text-base text-[#1A232F]/80 leading-relaxed flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="mt-6 font-inter font-medium text-sm text-[#1A232F]">
                      -{testimonial.author}, {testimonial.role}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 bg-[#1A232F] rounded-xl px-5 py-4 self-start">
                      <span className="font-inter font-bold text-xl md:text-2xl text-white">
                        {testimonial.metric}
                      </span>
                      <span className="font-inter font-normal text-xs text-white/70 max-w-[80px] leading-tight">
                        {testimonial.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'bg-[#F5F3F0] w-6' 
                  : 'bg-[#F5F3F0]/30 hover:bg-[#F5F3F0]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
