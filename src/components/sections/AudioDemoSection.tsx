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
          {/* Title above Spotify embed */}
          <h2 
            className={`font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A232F] leading-tight mb-8 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(1)}
          >
            Dalton Lab no Spotify
          </h2>

          {/* Spotify Embed */}
          <div 
            className={`${revealClasses(isVisible)}`}
            style={getStaggerDelay(2)}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-2xl">
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
    </section>
  );
};

export default AudioDemoSection;
