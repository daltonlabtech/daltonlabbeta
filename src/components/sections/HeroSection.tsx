import { useState, useEffect, useRef } from 'react';
import heroVideo from '@/assets/hero-background.mp4';
import openaiLogo from '@/assets/tech/openai.webp';
import claudeLogo from '@/assets/tech/claude-logo.png';
import manusLogo from '@/assets/tech/manus-logo.png';

const techLogos = [
  { name: 'OpenAI', src: openaiLogo },
  { name: 'Claude', src: claudeLogo },
  { name: 'Manus', src: manusLogo },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % techLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#101823' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101823]/30 via-transparent to-[#101823]/80" />
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center container mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-24">
        <div className="text-center max-w-4xl">
          {/* Badge above H1 - Smaller */}
          <div
            className={`inline-flex items-center gap-1.5 backdrop-blur-sm border border-zinc-700/50 rounded-full px-2.5 py-1 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ backgroundColor: 'rgba(245, 243, 240, 0.7)' }}
          >
            <span className="text-zinc-900/70 text-[10px] font-medium">Powered by</span>
            <div className="relative w-12 h-4 overflow-hidden">
              {techLogos.map((logo, index) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
                    index === currentLogoIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  } ${logo.name === 'Meta' ? 'scale-75' : ''}`}
                  style={{ filter: 'brightness(0)' }}
                />
              ))}
            </div>
          </div>

          {/* Heading - Centered */}
          <h1
            className={`font-inter tracking-tight leading-[1.1] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ color: '#F5F3F0' }}
          >
            {/* Mobile: 3 lines */}
            <span className="block sm:hidden text-4xl font-normal">
              Do lead à venda
            </span>
            <span className="block sm:hidden text-4xl font-light mt-1">
              com
            </span>
            <span className="block sm:hidden text-4xl font-light mt-1">
              Agentes de IA
            </span>
            {/* Desktop: 2 lines */}
            <span className="hidden sm:block text-5xl md:text-6xl lg:text-7xl font-normal">
              Do lead à venda
            </span>
            <span className="hidden sm:block text-5xl md:text-6xl lg:text-7xl font-light mt-1">
              com Agentes de IA
            </span>
          </h1>

          {/* Subtitle - Centered */}
          <div
            className={`mt-6 md:mt-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p
              className="text-sm md:text-base lg:text-lg font-light"
              style={{ color: 'rgba(245, 243, 240, 0.75)' }}
            >
              Escale a receita da sua empresa.
            </p>
            <p
              className="text-sm md:text-base lg:text-lg font-light"
              style={{ color: 'rgba(245, 243, 240, 0.75)' }}
            >
              Em menos tempo. Com menos custo.
            </p>
          </div>

          {/* CTA Button - Centered & Smaller */}
          <div
            className={`mt-8 md:mt-10 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              className="font-medium text-sm px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#F5F3F0',
                color: '#000000',
              }}
            >
              Fale com o Dalton
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
