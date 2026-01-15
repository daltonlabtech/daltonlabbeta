import { Bot, Users } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const comparisonRows = [
  {
    criteria: "Função no sistema",
    ai: "Execução contínua e previsível",
    human: "Decisão e direção"
  },
  {
    criteria: "Consistência",
    ai: "Executa do mesmo jeito, sempre",
    human: "Ajusta quando o contexto muda"
  },
  {
    criteria: "Velocidade",
    ai: "Mantém ritmo alto sem desgaste",
    human: "Atua com profundidade"
  },
  {
    criteria: "Disponibilidade",
    ai: "Opera 24/7",
    human: "Atua nos momentos-chave"
  },
  {
    criteria: "Relacionamento",
    ai: "Garante presença constante",
    human: "Cria vínculos reais"
  },
  {
    criteria: "Negociação",
    ai: "Prepara o terreno",
    human: "Fecha o jogo"
  }
];

const PhilosophySection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-dalton-dark"
    >
      <div className="container-main max-w-[800px]">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center ${revealClasses(isVisible)}`}
        >
          IA + Humanos = Mais Vendas
        </h2>

        {/* Description */}
        <p 
          className={`mt-6 font-inter font-normal text-lg text-dalton-gray-light text-center leading-relaxed max-w-[600px] mx-auto ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          A combinação perfeita: IA executa o operacional, humanos focam em relacionar e fechar.
        </p>

        {/* Comparison Table - Minimal & Elegant */}
        <div 
          className={`mt-12 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02] ${revealClasses(isVisible)}`}
          style={getStaggerDelay(2)}
        >
          {/* Table Header */}
          <div className="grid grid-cols-3">
            <div className="p-4 md:p-5" />
            <div className="p-4 md:p-5 border-l border-white/[0.08] flex items-center justify-center gap-2">
              <Bot className="w-4 h-4 text-dalton-blue" />
              <span className="font-inter font-semibold text-sm text-dalton-blue">Squad de IA</span>
            </div>
            <div className="p-4 md:p-5 border-l border-white/[0.08] flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-dalton-purple" />
              <span className="font-inter font-semibold text-sm text-dalton-purple">Seu Time</span>
            </div>
          </div>

          {/* Table Body */}
          {comparisonRows.map((row, index) => (
            <div 
              key={index} 
              className="grid grid-cols-3 border-t border-white/[0.05]"
            >
              <div className="p-4 md:p-5 flex items-center">
                <span className="font-inter font-medium text-sm text-white">
                  {row.criteria}
                </span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/[0.05] flex items-center justify-start">
                <span className="font-inter text-sm text-dalton-gray-light">
                  {row.ai}
                </span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/[0.05] flex items-center justify-start">
                <span className="font-inter text-sm text-dalton-gray-light">
                  {row.human}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-10 text-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(3)}
        >
          <button className="group bg-white text-zinc-900 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
            <span>Quero conhecer o Squad</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
