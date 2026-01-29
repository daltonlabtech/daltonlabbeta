import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';

const AudioDemoSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="py-6 md:py-8 pb-2 md:pb-4 bg-[#F5F3F0] relative overflow-hidden"
    >
      <div className="container-main max-w-4xl relative z-10">
        {/* Main Card with title, subtitle and embed all inside */}
        <div 
          className={`relative rounded-2xl p-6 md:p-8 ${revealClasses(isVisible)}`}
          style={{ backgroundColor: '#F5F3F0' }}
        >

          {/* Title and Subtitle inside the card */}
          <div className="mb-4 md:mb-6 pr-12">
            <h2 className="font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A232F] leading-tight mb-2 md:mb-3">
              Confira nosso podcast no Spotify
            </h2>
            <p className="font-inter text-sm md:text-base text-[#1A232F]/70">
              Conversas com nossos fundadores sobre IA, empreendedorismo e inovação.
            </p>
          </div>

          {/* Spotify Embed - larger height */}
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
              className="md:h-[232px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioDemoSection;
