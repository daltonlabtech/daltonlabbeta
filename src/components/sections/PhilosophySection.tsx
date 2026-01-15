import { Bot, Users } from 'lucide-react';

const comparisonRows = [
  {
    criteria: "Consistência",
    ai: "100% padronizado, sem variação",
    human: "Pode variar dependendo do contexto"
  },
  {
    criteria: "Velocidade",
    ai: "Milhares de leads em segundos",
    human: "Foco em qualidade sobre quantidade"
  },
  {
    criteria: "Disponibilidade",
    ai: "24/7 sem pausas ou férias",
    human: "Horário comercial"
  },
  {
    criteria: "Memória",
    ai: "Lembra cada interação",
    human: "Prioriza informações estratégicas"
  },
  {
    criteria: "Julgamento",
    ai: "Segue regras e padrões",
    human: "Avalia situações com contexto"
  },
  {
    criteria: "Relacionamento",
    ai: "Comunicação eficiente",
    human: "Conexões genuínas e duradouras"
  },
  {
    criteria: "Negociação",
    ai: "Propostas e termos padrão",
    human: "Adapta estratégias em tempo real"
  },
  {
    criteria: "Fechamento",
    ai: "Prepara contratos e docs",
    human: "Fecha deals com persuasão"
  }
];

const PhilosophySection = () => {
  return (
    <section className="section-padding bg-dalton-dark">
      <div className="container-main max-w-[1000px]">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          IA + Humanos = Mais Vendas
        </h2>

        {/* Description */}
        <p className="mt-6 font-inter font-normal text-lg text-dalton-gray-light text-center leading-relaxed max-w-[700px] mx-auto">
          A combinação perfeita: IA executa o operacional, humanos focam em relacionar e fechar.
        </p>

        {/* Comparison Table */}
        <div className="mt-12 rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b border-white/10">
            <div className="p-4 md:p-6 bg-white/5">
              <span className="font-inter font-semibold text-sm md:text-base text-dalton-gray-light uppercase tracking-wide">
                Critério
              </span>
            </div>
            <div className="p-4 md:p-6 bg-dalton-blue/10 border-l border-white/10">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-dalton-blue flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="font-inter font-bold text-sm md:text-lg text-white">Squad de IA</span>
              </div>
            </div>
            <div className="p-4 md:p-6 bg-dalton-purple/10 border-l border-white/10">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-dalton-purple flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="font-inter font-bold text-sm md:text-lg text-white">Seu Time</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          {comparisonRows.map((row, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-3 ${index !== comparisonRows.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors`}
            >
              <div className="p-4 md:p-5 flex items-center">
                <span className="font-inter font-semibold text-sm md:text-base text-white">
                  {row.criteria}
                </span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/5 flex items-center">
                <span className="font-inter text-sm text-dalton-blue">
                  {row.ai}
                </span>
              </div>
              <div className="p-4 md:p-5 border-l border-white/5 flex items-center">
                <span className="font-inter text-sm text-dalton-purple">
                  {row.human}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button className="group bg-white text-zinc-900 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
            <span>Quero conhecer o Squad</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;