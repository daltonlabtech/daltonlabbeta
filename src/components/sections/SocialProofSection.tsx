import { useState, useRef, useEffect } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(Math.floor(testimonials.length / 2)); // Start at center card
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Handle scroll to update active index
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / testimonials.length;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), testimonials.length - 1));
  };

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.scrollWidth / testimonials.length;
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // Initialize to center card
      if (!hasInitialized) {
        setTimeout(() => {
          const cardWidth = container.scrollWidth / testimonials.length;
          const centerIndex = Math.floor(testimonials.length / 2);
          container.scrollLeft = cardWidth * centerIndex; // Scroll to center
          setHasInitialized(true);
        }, 100);
      }
      
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [hasInitialized]);

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

      </div>

      {/* Carousel Container */}
      <div className="mt-8 px-4">
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing pb-4"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left spacer for centering first card */}
          <div className="flex-shrink-0 w-[5%] md:w-[20%]" />
          
          {testimonials.map((testimonial, index) => {
            const isActive = index === activeIndex;
            const distance = Math.abs(index - activeIndex);
            
            return (
              <div 
                key={index}
                className="flex-shrink-0"
                style={{ 
                  scrollSnapAlign: 'center',
                  width: 'min(85vw, 360px)',
                }}
              >
                <div 
                  className="bg-[#F5F3F0] rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500 select-none shadow-lg"
                  style={{
                    height: '300px',
                    width: '100%',
                  }}
                >
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
          
          {/* Right spacer for centering last card */}
          <div className="flex-shrink-0 w-[5%] md:w-[20%]" />
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-[#F5F3F0] w-6' 
                  : 'bg-[#F5F3F0]/30 hover:bg-[#F5F3F0]/50 w-2'
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
