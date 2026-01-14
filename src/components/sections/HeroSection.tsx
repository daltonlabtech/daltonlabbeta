import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #05070B 0%, #0A0F17 50%, #05070B 100%)'
        }}
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Radial Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(5,7,11,0.85) 100%)'
        }}
      />

      {/* Subtle Purple Glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 50%, hsl(261 83% 65% / 0.06), transparent 50%)'
        }}
      />

      {/* Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #05070B 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="max-w-5xl">
          {/* Heading - Much larger like 11x */}
          <h1 
            className={`font-inter font-extrabold tracking-tight text-foreground leading-[0.95] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Funcionários
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Artificiais,
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Resultados
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Reais.
            </span>
          </h1>

          {/* Separator Line */}
          <div 
            className={`w-24 md:w-32 h-[1px] bg-foreground/30 my-6 md:my-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          />

          {/* Subtitle */}
          <p 
            className={`text-base sm:text-lg md:text-xl text-foreground/70 font-normal max-w-lg transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            O squad de vendas completo para aumentar o faturamento da sua empresa com Inteligência Artificial.
          </p>

          {/* CTA Button */}
          <div 
            className={`mt-8 md:mt-10 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button className="group bg-white text-zinc-900 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <span>Agendar Reunião</span>
              <ArrowRight className="inline-block ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
