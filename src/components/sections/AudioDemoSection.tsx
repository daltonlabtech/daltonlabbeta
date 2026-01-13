import { Play, Pause } from "lucide-react";
import { useState } from "react";

const AudioDemoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="section-padding">
      <div className="container-main max-w-[800px]">
        {/* Title with Badge */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <h2 className="font-inter font-bold text-4xl md:text-5xl lg:text-[56px] text-white text-center">
            Ouca a IA em acao.
          </h2>
          <span className="px-3 py-1 bg-dalton-cyan text-dalton-dark font-inter font-semibold text-sm rounded-full uppercase">
            Novo
          </span>
        </div>

        {/* Subtitle */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light text-center">
          Escute uma demonstracao real de como Nina inicia uma conversa com um lead.
        </p>

        {/* Description */}
        <p className="mt-4 font-inter font-normal text-base text-dalton-gray text-center">
          A voz e natural, o tom e profissional e a abordagem e personalizada para cada contato.
        </p>

        {/* Audio Player Card */}
        <div className="mt-16 glass-card p-10">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            {/* Left: Label */}
            <div>
              <p className="font-inter font-semibold text-xl text-white">
                Ouca Nina
              </p>
              <p className="mt-1 font-inter font-normal text-sm text-dalton-gray">
                Demonstracao de contato inicial
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
                      isPlaying ? 'bg-dalton-cyan' : 'bg-dalton-gray'
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
