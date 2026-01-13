const aiTasks = [
  { term: "Consistencia:", definition: "Executa processos padronizados sem variacao." },
  { term: "Velocidade:", definition: "Processa milhares de leads em segundos." },
  { term: "Memoria:", definition: "Lembra de cada interacao e detalhe." },
  { term: "Execucao 24/7:", definition: "Trabalha sem parar, sem ferias." }
];

const humanTasks = [
  { term: "Julgamento:", definition: "Avalia situacoes complexas com contexto." },
  { term: "Relacionamento:", definition: "Cria conexoes genuinas com clientes." },
  { term: "Estrategia:", definition: "Define abordagens criativas e personalizadas." },
  { term: "Fechamento:", definition: "Negocia e fecha deals importantes." }
];

const PhilosophySection = () => {
  return (
    <section className="section-padding">
      <div className="container-main max-w-[960px]">
        {/* Title */}
        <h2 className="font-inter font-bold text-4xl md:text-5xl lg:text-[56px] text-white text-center">
          IA para promover, nao demitir.
        </h2>

        {/* Description */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light text-center leading-relaxed max-w-[800px] mx-auto">
          Nossa filosofia e clara: a IA executa, os humanos se relacionam. Automatizamos as tarefas repetitivas para que seu time possa focar no que realmente importa - construir relacionamentos e fechar negocios.
        </p>

        {/* Comparison Columns */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* AI Column */}
          <div className="opacity-0 animate-fade-in-up">
            <h3 className="font-inter font-semibold text-2xl text-white mb-6">
              O que a IA faz
            </h3>
            <ul className="space-y-4">
              {aiTasks.map((task, index) => (
                <li key={index} className="flex flex-wrap gap-2">
                  <span className="font-inter font-semibold text-dalton-cyan">{task.term}</span>
                  <span className="font-inter font-normal text-dalton-gray-light">{task.definition}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Human Column */}
          <div className="opacity-0 animate-fade-in-up animation-delay-200">
            <h3 className="font-inter font-semibold text-2xl text-white mb-6">
              O que seu time faz
            </h3>
            <ul className="space-y-4">
              {humanTasks.map((task, index) => (
                <li key={index} className="flex flex-wrap gap-2">
                  <span className="font-inter font-semibold text-dalton-cyan">{task.term}</span>
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
