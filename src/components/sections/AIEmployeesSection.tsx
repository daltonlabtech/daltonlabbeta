const agents = [
  {
    name: "Lucas",
    role: "Agente de Qualificacao",
    description: "Analisa 100% dos seus leads e identifica as melhores oportunidades de negocio.",
    avatar: "L"
  },
  {
    name: "Nina",
    role: "Agente de Contato",
    description: "Inicia o contato de forma personalizada, aquecendo o lead para a primeira conversa.",
    avatar: "N"
  },
  {
    name: "Bruno",
    role: "Agente de Follow-up",
    description: "Garante que nenhum lead seja esquecido, fazendo o acompanhamento no tempo certo.",
    avatar: "B"
  },
  {
    name: "Clara",
    role: "Agente de Reuniao",
    description: "Grava e resume as reunioes de vendas, capturando os pontos-chave para a proposta.",
    avatar: "C"
  }
];

const AgentCard = ({ agent, index }: { agent: typeof agents[0]; index: number }) => {
  return (
    <div 
      className="glass-card p-8 transition-all duration-400 ease-out hover:-translate-y-2.5 hover:border-dalton-purple/50 group opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Avatar */}
      <div className="w-[100px] h-[100px] rounded-full border-2 border-dalton-cyan flex items-center justify-center bg-dalton-surface mx-auto">
        <span className="font-inter font-bold text-3xl text-dalton-cyan">{agent.avatar}</span>
      </div>

      {/* Name */}
      <h3 className="mt-6 font-inter font-semibold text-[22px] text-white text-center">
        {agent.name}
      </h3>

      {/* Role */}
      <p className="mt-1 font-inter font-medium text-sm text-dalton-cyan text-center">
        {agent.role}
      </p>

      {/* Description */}
      <p className="mt-3 font-inter font-normal text-[15px] text-dalton-gray-light leading-relaxed text-center">
        {agent.description}
      </p>

      {/* CTA Button */}
      <div className="mt-8 text-center">
        <button className="btn-outline">
          Contratar {agent.name}
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
};

const AIEmployeesSection = () => {
  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-4xl md:text-5xl lg:text-[56px] text-white text-center">
          Conheça seu Squad de Vendas em IA
        </h2>

        {/* Subtitle */}
        <p className="mt-12 font-inter font-normal text-lg text-dalton-gray-light text-center max-w-[800px] mx-auto leading-relaxed">
          Um time de agentes especializados que executa o trabalho operacional do seu comercial.
        </p>
        <p className="mt-4 font-inter font-normal text-lg text-dalton-gray-light text-center max-w-[800px] mx-auto leading-relaxed">
          Da prospecção ao follow-up, 24 horas por dia, enquanto seu time humano foca em negociar e fechar.
        </p>

        {/* Agent Cards Grid */}
        <div className="mt-[120px] grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1000px] mx-auto">
          {agents.map((agent, index) => (
            <AgentCard key={agent.name} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIEmployeesSection;
