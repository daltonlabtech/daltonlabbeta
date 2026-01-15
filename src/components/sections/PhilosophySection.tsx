import { Bot, Users } from 'lucide-react';

const aiTasks = [
  { term: "Consistência:", definition: "Executa processos padronizados sem variação." },
  { term: "Velocidade:", definition: "Processa milhares de leads em segundos." },
  { term: "Memória:", definition: "Lembra de cada interação e detalhe." },
  { term: "Execução 24/7:", definition: "Trabalha sem parar, sem férias." }
];

const humanTasks = [
  { term: "Julgamento:", definition: "Avalia situações complexas com contexto." },
  { term: "Relacionamento:", definition: "Cria conexões genuínas com clientes." },
  { term: "Estratégia:", definition: "Define abordagens criativas e personalizadas." },
  { term: "Fechamento:", definition: "Negocia e fecha deals importantes." }
];

const PhilosophySection = () => {
  return (
    <section className="section-padding bg-dalton-dark">
      <div className="container-main max-w-[1100px]">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          IA para promover, não demitir.
        </h2>

        {/* Description */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light text-center leading-relaxed max-w-[800px] mx-auto">
          Nossa filosofia é clara: a IA executa, os humanos se relacionam. Automatizamos as tarefas repetitivas para que seu time possa focar no que realmente importa — construir relacionamentos e fechar negócios.
        </p>

        {/* Comparison Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Card */}
          <div className="glass-card p-8 rounded-2xl opacity-0 animate-fade-in-up border-dalton-blue/20 hover:border-dalton-blue/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-dalton-blue flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-inter font-semibold text-2xl text-white">
                O que a IA faz
              </h3>
            </div>
            <ul className="space-y-5">
              {aiTasks.map((task, index) => (
                <li key={index} className="flex flex-col gap-1">
                  <span className="font-inter font-semibold text-dalton-blue">{task.term}</span>
                  <span className="font-inter font-normal text-dalton-gray-light">{task.definition}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Human Card */}
          <div className="glass-card p-8 rounded-2xl opacity-0 animate-fade-in-up animation-delay-200 border-dalton-purple/20 hover:border-dalton-purple/40 transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-dalton-purple flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-inter font-semibold text-2xl text-white">
                O que seu time faz
              </h3>
            </div>
            <ul className="space-y-5">
              {humanTasks.map((task, index) => (
                <li key={index} className="flex flex-col gap-1">
                  <span className="font-inter font-semibold text-dalton-purple">{task.term}</span>
                  <span className="font-inter font-normal text-dalton-gray-light">{task.definition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
