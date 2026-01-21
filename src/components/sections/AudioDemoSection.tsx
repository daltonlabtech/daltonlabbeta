import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const metrics = [
  { value: '10x', label: 'aumento em leads' },
  { value: '2x', label: 'contratos assinados' },
];

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Label */}
              <p 
                className={`font-inter font-normal text-sm text-[#1A232F]/60 ${revealClasses(isVisible)}`}
                style={getStaggerDelay(1)}
              >
                Podcast Dalton Lab
              </p>

              {/* Title */}
              <h2 
                className={`mt-4 font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A232F] leading-tight ${revealClasses(isVisible)}`}
                style={getStaggerDelay(2)}
              >
                Ouça nosso podcast sobre IA e Vendas
              </h2>

              {/* Description */}
              <p 
                className={`mt-6 font-inter font-normal text-base md:text-lg text-[#1A232F]/80 leading-relaxed ${revealClasses(isVisible)}`}
                style={getStaggerDelay(3)}
              >
                Descubra insights, estratégias e cases de sucesso no mundo de agentes de IA para vendas.
              </p>

              {/* Metrics */}
              <div 
                className={`mt-8 flex flex-wrap gap-3 ${revealClasses(isVisible)}`}
                style={getStaggerDelay(4)}
              >
                {metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className="bg-[#1A232F] rounded-xl px-5 py-4 flex items-center gap-3 min-w-[160px]"
                  >
                    <span className="font-inter font-bold text-2xl md:text-3xl text-white">
                      {metric.value}
                    </span>
                    <span className="font-inter font-normal text-xs text-white/70 max-w-[80px] leading-tight">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Spotify Embed */}
            <div 
              className={`order-1 lg:order-2 ${revealClasses(isVisible)}`}
              style={getStaggerDelay(2)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
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
