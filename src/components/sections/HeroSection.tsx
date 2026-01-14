import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          background: 'radial-gradient(circle at 50% 50%, hsl(261 83% 65% / 0.08), transparent 60%)'
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
      <div className="relative z-10 container mx-auto px-4 pt-6 md:pt-10 pb-3 md:pb-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 
            className={`font-space-grotesk font-bold tracking-tight uppercase text-xl md:text-3xl lg:text-4xl mb-3 md:mb-4 text-foreground transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Funcionarios Artificiais.{' '}
            <span className="text-primary">Resultados Reais.</span>
          </h1>

          {/* Description Line 1 */}
          <p 
            className={`text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-2 text-foreground font-semibold transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            O squad de vendas completo para{' '}
            <span className="text-primary font-bold">aumentar o faturamento</span>{' '}
            da sua empresa
          </p>

          {/* Description Line 2 */}
          <p 
            className={`text-sm md:text-base max-w-2xl mx-auto mb-5 md:mb-6 text-muted-foreground transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            com Inteligencia Artificial.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Primary CTA */}
            <button className="group bg-white text-zinc-900 font-medium px-8 py-3 md:px-10 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.05] active:scale-[0.98] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <span className="group-hover:tracking-wider transition-all duration-300">
                Agendar Reuniao
              </span>
              <ArrowRight className="inline-block ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>

            {/* Secondary CTA */}
            <button className="text-foreground/80 hover:text-foreground font-medium px-6 py-3 text-sm md:text-base hover:underline underline-offset-4 transition-all duration-300">
              Ver todos os agentes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
