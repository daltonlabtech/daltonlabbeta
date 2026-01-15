import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import LogoMarquee from '@/components/LogoMarquee';
import heroVideo from '@/assets/hero-background.mp4';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen h-screen flex flex-col overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay Mask */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Subtle Purple Glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 50%, hsl(261 83% 65% / 0.08), transparent 50%)'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center container mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-24">
        <div className="max-w-5xl">
          {/* Heading - Much larger like 11x */}
          <h1 
            className={`font-inter font-extrabold tracking-tight text-foreground leading-[0.95] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Funcionários Artificiais,
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Vendas Reais
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
            className={`text-base sm:text-lg md:text-xl text-foreground/70 font-normal max-w-xl transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            O futuro está aqui. Conheça o squad de vendas de Inteligência Artificial completo para colocar o seu processo comercial no próximo nível.
          </p>

          {/* CTA Button */}
          <div 
            className={`mt-8 md:mt-10 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button className="group bg-white text-zinc-900 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
              <span>Quero conhecer o Squad</span>
              <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Logo Marquee at bottom - same background, no border */}
      <div 
        className={`relative z-10 pb-8 transition-all duration-700 delay-[600ms] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <LogoMarquee />
      </div>
    </section>
  );
};

export default HeroSection;
