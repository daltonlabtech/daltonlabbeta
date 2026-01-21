import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const AudioDemoSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-8 md:py-12 bg-[#101823]"
    >
      <div className="container-main">
        {/* Main Card */}
        <div 
          className={`bg-[#E8E6E3] rounded-3xl p-8 md:p-12 lg:p-16 ${revealClasses(isVisible)}`}
        >
          {/* Two-column layout: Text left, Spotify right */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            {/* Left side: Text */}
            <div className="flex-1">
              <h2 
                className={`font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A232F] leading-tight mb-4 ${revealClasses(isVisible)}`}
                style={getStaggerDelay(1)}
              >
                Ouça o Dalton Lab no Spotify
              </h2>
              <p 
                className={`font-inter text-base md:text-lg text-[#1A232F]/70 ${revealClasses(isVisible)}`}
                style={getStaggerDelay(2)}
              >
                Conversas com nossos fundadores sobre IA, empreendedorismo e inovação.
              </p>
            </div>

            {/* Right side: Spotify Embed */}
            <div 
              className={`flex-1 ${revealClasses(isVisible)}`}
              style={getStaggerDelay(3)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-xl lg:ml-auto">
                <iframe 
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/episode/6VzyyF8zIzsB5oecGUjWIY?utm_source=generator&theme=0" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioDemoSection;
