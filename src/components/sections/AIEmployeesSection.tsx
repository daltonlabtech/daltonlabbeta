import { Search, Database, MessageSquare, Clock, BookOpen, FileText, FileSignature, FileCheck, ArrowRight } from 'lucide-react';

const agents = [
  {
    name: "Leo",
    role: "Prospecção",
    description: "Encontra novas empresas e contatos que se encaixam no perfil de cliente ideal (ICP).",
    icon: Search,
    color: "dalton-blue",
  },
  {
    name: "Sofia",
    role: "Enriquecimento",
    description: "Busca e valida dados dos leads (cargo, e-mail, tamanho da empresa) para garantir a qualidade.",
    icon: Database,
    color: "dalton-purple",
  },
  {
    name: "Bia",
    role: "WhatsApp",
    description: "Inicia a conversa via WhatsApp, enviando mensagens personalizadas para criar conexão.",
    icon: MessageSquare,
    color: "dalton-cyan",
  },
  {
    name: "Pedro",
    role: "Follow-up",
    description: "Garante que nenhum lead seja esquecido, enviando lembretes e acompanhamentos automáticos.",
    icon: Clock,
    color: "dalton-orange",
  },
  {
    name: "Laura",
    role: "Nutrição",
    description: "Envia conteúdos relevantes (cases, artigos) para manter o lead engajado ao longo do tempo.",
    icon: BookOpen,
    color: "dalton-blue",
  },
  {
    name: "Íris",
    role: "Resumo",
    description: "Analisa conversas e resume os pontos-chave, dores do cliente e próximos passos combinados.",
    icon: FileText,
    color: "dalton-purple",
  },
  {
    name: "Arthur",
    role: "Proposta",
    description: "Gera propostas comerciais personalizadas e alinhadas com as necessidades do cliente.",
    icon: FileSignature,
    color: "dalton-cyan",
  },
  {
    name: "Helena",
    role: "Contrato",
    description: "Prepara o contrato final e o envia para assinatura eletrônica, acelerando o fechamento.",
    icon: FileCheck,
    color: "dalton-orange",
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

const colorClasses: Record<string, { bg: string; bgSolid: string; border: string; text: string; gradient: string }> = {
  "dalton-blue": { 
    bg: "bg-dalton-blue/10", 
    bgSolid: "bg-dalton-blue",
    border: "border-dalton-blue/30", 
    text: "text-dalton-blue",
    gradient: "from-dalton-blue/20 to-transparent"
  },
  "dalton-purple": { 
    bg: "bg-dalton-purple/10", 
    bgSolid: "bg-dalton-purple",
    border: "border-dalton-purple/30", 
    text: "text-dalton-purple",
    gradient: "from-dalton-purple/20 to-transparent"
  },
  "dalton-cyan": { 
    bg: "bg-dalton-cyan/10", 
    bgSolid: "bg-dalton-cyan",
    border: "border-dalton-cyan/30", 
    text: "text-dalton-cyan",
    gradient: "from-dalton-cyan/20 to-transparent"
  },
  "dalton-orange": { 
    bg: "bg-dalton-orange/10", 
    bgSolid: "bg-dalton-orange",
    border: "border-dalton-orange/30", 
    text: "text-dalton-orange",
    gradient: "from-dalton-orange/20 to-transparent"
  },
};

const AgentCard = ({ agent, index }: { agent: typeof agents[0]; index: number }) => {
  const IconComponent = agent.icon;
  const colors = colorClasses[agent.color];

  return (
    <div className="group relative">
      {/* Card */}
      <div className={`relative h-full p-6 rounded-2xl border ${colors.border} bg-gradient-to-b ${colors.gradient} backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-opacity-60 hover:scale-[1.02]`}>
        {/* Number Badge */}
        <span className={`absolute top-4 right-4 font-inter font-bold text-4xl ${colors.text} opacity-20`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${colors.bgSolid} flex items-center justify-center mb-4`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>

        {/* Name & Role */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-inter font-bold text-xl text-white">
            {agent.name}
          </h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
            {agent.role}
          </span>
        </div>

        {/* Description */}
        <p className="font-inter text-sm text-dalton-gray-light leading-relaxed mb-4">
          {agent.description}
        </p>

        {/* CTA */}
        <button className={`inline-flex items-center gap-1.5 text-sm font-inter font-medium ${colors.text} group/btn`}>
          Contratar {agent.name}
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
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
          Um time de <span className="text-dalton-blue font-semibold">8 agentes especializados</span> que executa o trabalho operacional do seu comercial. 
          Da prospecção ao follow-up, 24 horas por dia, enquanto seu time humano foca em negociar e fechar.
        </p>

        {/* Agents Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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