import { Users, MessageSquare, Clock, Video } from 'lucide-react';

const agents = [
  {
    name: "Lucas",
    role: "Agente de Qualificação",
    description: "Analisa 100% dos seus leads e identifica as melhores oportunidades de negócio.",
    icon: Users,
    color: "dalton-blue"
  },
  {
    name: "Nina",
    role: "Agente de Contato",
    description: "Inicia o contato de forma personalizada, aquecendo o lead para a primeira conversa.",
    icon: MessageSquare,
    color: "dalton-purple"
  },
  {
    name: "Bruno",
    role: "Agente de Follow-up",
    description: "Garante que nenhum lead seja esquecido, fazendo o acompanhamento no tempo certo.",
    icon: Clock,
    color: "dalton-cyan"
  },
  {
    name: "Clara",
    role: "Agente de Reunião",
    description: "Grava e resume as reuniões de vendas, capturando os pontos-chave para a proposta.",
    icon: Video,
    color: "dalton-orange"
  }
];

const AgentCard = ({ agent, index }: { agent: typeof agents[0]; index: number }) => {
  const IconComponent = agent.icon;
  
  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    "dalton-blue": { 
      bg: "bg-dalton-blue", 
      border: "border-dalton-blue/30", 
      text: "text-dalton-blue" 
    },
    "dalton-purple": { 
      bg: "bg-dalton-purple", 
      border: "border-dalton-purple/30", 
      text: "text-dalton-purple" 
    },
    "dalton-cyan": { 
      bg: "bg-dalton-cyan", 
      border: "border-dalton-cyan/30", 
      text: "text-dalton-cyan" 
    },
    "dalton-orange": { 
      bg: "bg-dalton-orange", 
      border: "border-dalton-orange/30", 
      text: "text-dalton-orange" 
    },
  };

  const colors = colorClasses[agent.color];

  return (
    <div 
      className={`glass-card p-8 transition-all duration-400 ease-out hover:-translate-y-2.5 hover:${colors.border} group opacity-0 animate-fade-in-up rounded-2xl`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center mx-auto`}>
        <IconComponent className="w-7 h-7 text-white" />
      </div>

      {/* Name & Role */}
      <h3 className="mt-6 font-inter font-semibold text-xl text-white text-center">
        {agent.name}
      </h3>
      <p className={`mt-1 font-inter font-medium text-sm ${colors.text} text-center`}>
        {agent.role}
      </p>

      {/* Description */}
      <p className="mt-4 font-inter font-normal text-[15px] text-dalton-gray-light leading-relaxed text-center">
        {agent.description}
      </p>
    </div>
  );
};

const AIEmployeesSection = () => {
  return (
    <section className="section-padding bg-dalton-dark">
      <div className="container-main">
        {/* Subtitle */}
        <p className="font-inter font-normal text-sm tracking-[0.2em] uppercase text-dalton-gray-light text-center">
          POR QUE O DALTON LAB
        </p>
        
        {/* Title */}
        <h2 className="mt-4 font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Conheça seu Squad de Vendas em IA
        </h2>

        {/* Description */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light text-center max-w-[800px] mx-auto leading-relaxed">
          Um time de agentes especializados que executa o trabalho operacional do seu comercial. 
          Da prospecção ao follow-up, 24 horas por dia, enquanto seu time humano foca em negociar e fechar.
        </p>

        {/* Agent Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {agents.map((agent, index) => (
            <AgentCard key={agent.name} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIEmployeesSection;
