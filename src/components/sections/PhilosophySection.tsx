import { Bot, Users, Check, X } from 'lucide-react';

const comparisonCategories = [
  {
    category: "Consistência",
    ai: "Executa processos 100% padronizados, sem variação",
    human: "Pode variar dependendo do dia ou contexto"
  },
  {
    category: "Velocidade",
    ai: "Processa milhares de leads em segundos",
    human: "Foco em qualidade sobre quantidade"
  },
  {
    category: "Disponibilidade",
    ai: "Opera 24/7 sem pausas ou férias",
    human: "Trabalha em horário comercial"
  },
  {
    category: "Memória",
    ai: "Lembra cada interação e detalhe",
    human: "Prioriza informações estratégicas"
  },
  {
    category: "Julgamento",
    ai: "Segue regras e padrões definidos",
    human: "Avalia situações complexas com contexto"
  },
  {
    category: "Relacionamento",
    ai: "Comunicação eficiente e objetiva",
    human: "Cria conexões genuínas e duradouras"
  },
  {
    category: "Negociação",
    ai: "Apresenta propostas e termos padrão",
    human: "Adapta estratégias em tempo real"
  },
  {
    category: "Fechamento",
    ai: "Prepara contratos e documentação",
    human: "Fecha deals importantes com persuasão"
  }
];

const PhilosophySection = () => {
  return (
    <section className="section-padding bg-dalton-dark">
      <div className="container-main max-w-[1200px]">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          IA + Humanos = Mais Vendas
        </h2>

        {/* Description */}
        <p className="mt-6 font-inter font-normal text-lg text-dalton-gray-light text-center leading-relaxed max-w-[700px] mx-auto">
          A combinação perfeita: IA executa o operacional, humanos focam em relacionar e fechar.
        </p>

        {/* Comparison Table */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Column */}
          <div className="rounded-2xl border border-dalton-blue/30 bg-gradient-to-b from-dalton-blue/10 to-transparent overflow-hidden">
            <div className="bg-dalton-blue/20 border-b border-dalton-blue/30 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-dalton-blue flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-inter font-bold text-xl text-white">Squad de IA</h3>
                <p className="font-inter text-sm text-dalton-blue">Excelente em...</p>
              </div>
            </div>
            <ul className="p-6 space-y-4">
              {comparisonCategories.slice(0, 4).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-dalton-blue/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-dalton-blue" />
                  </div>
                  <div>
                    <span className="font-inter font-semibold text-white">{item.category}:</span>
                    <span className="font-inter text-dalton-gray-light ml-2">{item.ai}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Human Column */}
          <div className="rounded-2xl border border-dalton-purple/30 bg-gradient-to-b from-dalton-purple/10 to-transparent overflow-hidden">
            <div className="bg-dalton-purple/20 border-b border-dalton-purple/30 p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-dalton-purple flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-inter font-bold text-xl text-white">Seu Time</h3>
                <p className="font-inter text-sm text-dalton-purple">Excelente em...</p>
              </div>
            </div>
            <ul className="p-6 space-y-4">
              {comparisonCategories.slice(4).map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-dalton-purple/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-dalton-purple" />
                  </div>
                  <div>
                    <span className="font-inter font-semibold text-white">{item.category}:</span>
                    <span className="font-inter text-dalton-gray-light ml-2">{item.human}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button className="group bg-white text-zinc-900 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            <span>Quero conhecer o Squad</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
