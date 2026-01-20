import { Play } from "lucide-react";
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const metrics = [
  { value: '10x', label: 'aumento em leads' },
  { value: '2x', label: 'contratos assinados' },
  { value: '80%', label: 'aumento na taxa de conversão' },
];

const AudioDemoSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-[#19212E]"
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
                História do cliente
              </p>

              {/* Title */}
              <h2 
                className={`mt-4 font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A232F] leading-tight ${revealClasses(isVisible)}`}
                style={getStaggerDelay(2)}
              >
                Como o Tyfone 10x melhorou a produtividade com o Dalton
              </h2>

              {/* Quote */}
              <p 
                className={`mt-6 font-inter font-normal text-base md:text-lg text-[#1A232F]/80 leading-relaxed ${revealClasses(isVisible)}`}
                style={getStaggerDelay(3)}
              >
                "Você vai de reunião em reunião e depois fica preso ao acompanhamento. Seguir adiante é muito desafiador."
              </p>

              {/* Attribution */}
              <p 
                className={`mt-4 font-inter font-medium text-sm text-[#1A232F] ${revealClasses(isVisible)}`}
                style={getStaggerDelay(4)}
              >
                -Siva, fundadora da Tyfone
              </p>

              {/* Metrics */}
              <div 
                className={`mt-8 flex flex-wrap gap-3 ${revealClasses(isVisible)}`}
                style={getStaggerDelay(5)}
              >
                {metrics.map((metric, index) => (
                  <div 
                    key={index}
                    className="bg-[#1A232F] rounded-xl px-5 py-4 flex items-center gap-3"
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

            {/* Right Content - Video */}
            <div 
              className={`order-1 lg:order-2 ${revealClasses(isVisible)}`}
              style={getStaggerDelay(2)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#1A232F]">
                {/* Video Placeholder with YouTube style */}
                <div className="aspect-video relative">
                  {/* Placeholder Image Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4D2CF] to-[#C8C6C3] flex items-center justify-center">
                    {/* Person silhouette placeholder */}
                    <div className="w-32 h-32 rounded-full bg-[#1A232F]/10 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#1A232F]/20" />
                    </div>
                  </div>
                  
                  {/* YouTube Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-2xl flex items-center justify-center hover:bg-red-700 transition-colors duration-300 shadow-lg hover:scale-105 active:scale-95">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </button>
                  </div>

                  {/* Corner decorations - like in reference */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
                  <div className="absolute bottom-12 left-4 w-12 h-12 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
                  <div className="absolute bottom-12 right-4 w-12 h-12 border-r-2 border-b-2 border-white/30 rounded-br-lg" />

                  {/* YouTube bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#1A232F]/90 flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-white/70 text-xs font-inter">Assistir no</span>
                      <span className="text-white text-xs font-inter font-bold">YouTube</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioDemoSection;