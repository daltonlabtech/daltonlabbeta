import { Search, Database, Mail, MessageSquare, Clock, BookOpen, FileAudio, FileText, FileSignature, FileCheck, ArrowRight } from 'lucide-react';

const agents = [
  {
    name: "Leo",
    role: "Agente de Prospecção",
    description: "Encontra novas empresas e contatos que se encaixam no perfil de cliente ideal (ICP).",
    icon: Search,
    color: "dalton-blue"
  },
  {
    name: "Sofia",
    role: "Agente de Enriquecimento",
    description: "Busca e valida dados dos leads (cargo, e-mail, tamanho da empresa) para garantir a qualidade da prospecção.",
    icon: Database,
    color: "dalton-purple"
  },
  {
    name: "André",
    role: "Agente de Outreach",
    description: "Envia as sequências de e-mail iniciais, de forma personalizada e no tempo certo.",
    icon: Mail,
    color: "dalton-cyan"
  },
  {
    name: "Bia",
    role: "Agente de WhatsApp",
    description: "Inicia a conversa via WhatsApp, enviando a primeira mensagem de áudio ou texto para criar uma conexão mais próxima.",
    icon: MessageSquare,
    color: "dalton-orange"
  },
  {
    name: "Pedro",
    role: "Agente de Follow-up",
    description: "Garante que nenhum lead seja esquecido, enviando lembretes e acompanhamentos automáticos.",
    icon: Clock,
    color: "dalton-blue"
  },
  {
    name: "Laura",
    role: "Agente de Nutrição",
    description: "Envia conteúdos relevantes (cases, artigos) para manter o lead engajado ao longo do tempo.",
    icon: BookOpen,
    color: "dalton-purple"
  },
  {
    name: "Tomás",
    role: "Agente de Transcrição",
    description: "Grava e transcreve 100% das reuniões de vendas, criando um registro fiel da conversa.",
    icon: FileAudio,
    color: "dalton-cyan"
  },
  {
    name: "Íris",
    role: "Agente de Resumo",
    description: "Analisa a transcrição e resume os pontos-chave, dores do cliente e próximos passos combinados.",
    icon: FileText,
    color: "dalton-orange"
  },
  {
    name: "Arthur",
    role: "Agente de Proposta",
    description: "Usa o resumo da reunião para gerar uma proposta comercial personalizada e alinhada com as necessidades do cliente.",
    icon: FileSignature,
    color: "dalton-blue"
  },
  {
    name: "Helena",
    role: "Agente de Contrato",
    description: "Prepara o contrato final com os termos acordados e o envia para assinatura eletrônica, acelerando o fechamento.",
    icon: FileCheck,
    color: "dalton-purple"
  }
];

const bulletPoints = [
  "Agentes que trabalham por você",
  "Execução comercial 24/7",
  "Follow-ups consistentes",
  "Assinatura de contratos automatizada",
  "Envio de propostas comerciais personalizadas",
  "Mais controle sobre o funil, sem aumentar equipe"
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
      className={`glass-card p-6 transition-all duration-400 ease-out hover:-translate-y-2 hover:${colors.border} group opacity-0 animate-fade-in-up rounded-2xl flex flex-col`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}>
        <IconComponent className="w-5 h-5 text-white" />
      </div>

      {/* Name & Role */}
      <h3 className="mt-4 font-inter font-semibold text-lg text-white">
        {agent.name}
      </h3>
      <p className={`mt-1 font-inter font-medium text-sm ${colors.text}`}>
        {agent.role}
      </p>

      {/* Description */}
      <p className="mt-3 font-inter font-normal text-sm text-dalton-gray-light leading-relaxed flex-grow">
        {agent.description}
      </p>

      {/* CTA */}
      <button className={`mt-4 inline-flex items-center gap-2 font-inter font-medium text-sm ${colors.text} hover:underline group/btn`}>
        Contratar {agent.name}
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </div>
  );
};

const BulletMarquee = () => {
  return (
    <div className="mt-16 overflow-hidden">
      <div className="flex animate-marquee-slow">
        {[...bulletPoints, ...bulletPoints, ...bulletPoints].map((point, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 px-5 py-3 mx-2 bg-white/5 border border-white/10 rounded-full whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-sm bg-dalton-blue flex-shrink-0" />
            <span className="font-inter text-sm text-dalton-gray-light">{point}</span>
          </div>
        ))}
      </div>
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
        <h2 className="mt-4 font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-white text-center">
          Conheça seu Squad de Vendas em IA
        </h2>

        {/* Description */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light text-center max-w-[800px] mx-auto leading-relaxed">
          Um time de agentes especializados que executa o trabalho operacional do seu comercial. 
          Da prospecção ao follow-up, 24 horas por dia, enquanto seu time humano foca em negociar e fechar.
        </p>

        {/* Agent Cards Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-[1400px] mx-auto">
          {agents.map((agent, index) => (
            <AgentCard key={agent.name} agent={agent} index={index} />
          ))}
        </div>

        {/* Bullet Points Marquee */}
        <BulletMarquee />
      </div>
    </section>
  );
};

export default AIEmployeesSection;