import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import spotifyLogo from '@/assets/tech/spotify-logo.png';

const AudioDemoSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-6 md:py-8 bg-[#101823]"
    >
      <div className="container-main max-w-4xl">
        {/* Title and Subtitle above the card */}
        <div className={`mb-6 ${revealClasses(isVisible)}`}>
          <h2 
            className={`font-inter font-bold text-xl md:text-2xl lg:text-3xl text-[#1A232F] leading-tight mb-2 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(1)}
          >
            Ouça o Dalton Lab no Spotify
          </h2>
          <p 
            className={`font-inter text-sm md:text-base text-[#1A232F]/70 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(2)}
          >
            Conversas com nossos fundadores sobre IA, empreendedorismo e inovação.
          </p>
        </div>

        {/* Main Card with Spotify embed */}
        <div 
          className={`relative bg-[#E8E6E3] rounded-2xl p-4 md:p-6 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(3)}
        >
          {/* Spotify Logo in top right */}
          <img 
            src={spotifyLogo} 
            alt="Spotify" 
            className="absolute top-4 right-4 w-8 h-8 md:w-10 md:h-10 z-10"
          />

          {/* Spotify Embed */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <iframe 
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/episode/6VzyyF8zIzsB5oecGUjWIY?utm_source=generator&theme=0" 
              width="100%" 
              height="232" 
              frameBorder="0" 
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioDemoSection;
