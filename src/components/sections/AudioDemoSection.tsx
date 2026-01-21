import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';
import spotifyLogo from '@/assets/tech/spotify-logo.png';

const AudioDemoSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-6 md:py-8 bg-[#101823]"
    >
      <div className="container-main max-w-4xl">
        {/* Main Card with title, subtitle, Spotify logo and embed all inside */}
        <div 
          className={`relative rounded-2xl p-6 md:p-8 ${revealClasses(isVisible)}`}
          style={{ backgroundColor: '#F5F3F0' }}
        >

          {/* Title and Subtitle inside the card */}
          <div className="mb-4 md:mb-6 pr-12">
            <h2 className="font-inter font-bold text-lg md:text-xl lg:text-2xl text-[#1A232F] leading-tight mb-1 md:mb-2">
              Confira nosso podcast no Spotify
            </h2>
            <p className="font-inter text-xs md:text-sm text-[#1A232F]/70">
              Conversas com nossos fundadores sobre IA, empreendedorismo e inovação.
            </p>
          </div>

          {/* Spotify Embed - hide album art on mobile */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <iframe 
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/episode/6VzyyF8zIzsB5oecGUjWIY?utm_source=generator&theme=0" 
              width="100%" 
              height="152"
              frameBorder="0" 
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="md:h-[232px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioDemoSection;
