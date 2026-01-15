import { Play, Pause } from "lucide-react";
import { useState } from "react";

const AudioDemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--dalton-gray)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--dalton-gray)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Corner accent - left */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-20 h-40 border-l-2 border-t-2 border-dalton-orange/40 rounded-tl-3xl" />
        {/* Subtle radial gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-dalton-purple/5 via-transparent to-transparent" />
      </div>

      <div className="container-main max-w-[800px] relative z-10">
        {/* Title with Badge */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
            Ouça a IA em ação.
          </h2>
          <span className="px-3 py-1 bg-dalton-blue text-dalton-dark font-inter font-semibold text-sm rounded-full uppercase">
            Novo
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light text-center">
          Escute uma demonstração real de como Bruno inicia uma conversa com um lead.
        </p>

        {/* Description */}
        <p className="mt-4 font-inter font-normal text-base text-dalton-gray text-center">
          A voz é natural, o tom é profissional e a abordagem é personalizada para cada contato.
        </p>

        {/* Audio Player Card */}
        <div className="mt-16 glass-card p-10 relative">
          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-2xl border border-dalton-blue/20" />
          
          <div className="flex items-center justify-between gap-6 flex-wrap relative z-10">
            {/* Left: Label */}
            <div>
              <p className="font-inter font-semibold text-xl text-white">
                Ouça Bruno
              </p>
              <p className="mt-1 font-inter font-normal text-sm text-dalton-gray">
                Demonstração de contato inicial
              </p>
            </div>

            {/* Right: Play button and waveform */}
            <div className="flex items-center gap-4">
              {/* Waveform visualization */}
              <div className="flex items-center gap-1 h-10">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlaying ? 'bg-dalton-blue' : 'bg-dalton-gray'
                    }`}
                    style={{
                      height: `${Math.random() * 24 + 8}px`,
                      animation: isPlaying ? `waveform 0.5s ease-in-out ${i * 0.05}s infinite alternate` : 'none'
                    }}
                  />
                ))}
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 hover:scale-110 glow-purple"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes waveform {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(1.5); }
        }
      `}</style>
    </section>
  );
};

export default AudioDemoSection;
