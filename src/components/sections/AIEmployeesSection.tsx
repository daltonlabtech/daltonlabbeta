import { useState } from 'react';
import { Search, Database, Mail, MessageSquare, Clock, BookOpen, FileAudio, FileText, FileSignature, FileCheck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const agents = [
  {
    name: "Leo",
    role: "Agente de Prospecção",
    description: "Encontra novas empresas e contatos que se encaixam no perfil de cliente ideal (ICP).",
    icon: Search,
    color: "dalton-blue",
    phase: "Prospecção"
  },
  {
    name: "Sofia",
    role: "Agente de Enriquecimento",
    description: "Busca e valida dados dos leads (cargo, e-mail, tamanho da empresa) para garantir a qualidade da prospecção.",
    icon: Database,
    color: "dalton-purple",
    phase: "Prospecção"
  },
  {
    name: "André",
    role: "Agente de Outreach",
    description: "Envia as sequências de e-mail iniciais, de forma personalizada e no tempo certo.",
    icon: Mail,
    color: "dalton-cyan",
    phase: "Conexão"
  },
  {
    name: "Bia",
    role: "Agente de WhatsApp",
    description: "Inicia a conversa via WhatsApp, enviando a primeira mensagem de áudio ou texto para criar uma conexão mais próxima.",
    icon: MessageSquare,
    color: "dalton-orange",
    phase: "Conexão"
  },
  {
    name: "Pedro",
    role: "Agente de Follow-up",
    description: "Garante que nenhum lead seja esquecido, enviando lembretes e acompanhamentos automáticos.",
    icon: Clock,
    color: "dalton-blue",
    phase: "Conexão"
  },
  {
    name: "Laura",
    role: "Agente de Nutrição",
    description: "Envia conteúdos relevantes (cases, artigos) para manter o lead engajado ao longo do tempo.",
    icon: BookOpen,
    color: "dalton-purple",
    phase: "Nutrição"
  },
  {
    name: "Tomás",
    role: "Agente de Transcrição",
    description: "Grava e transcreve 100% das reuniões de vendas, criando um registro fiel da conversa.",
    icon: FileAudio,
    color: "dalton-cyan",
    phase: "Reunião"
  },
  {
    name: "Íris",
    role: "Agente de Resumo",
    description: "Analisa a transcrição e resume os pontos-chave, dores do cliente e próximos passos combinados.",
    icon: FileText,
    color: "dalton-orange",
    phase: "Reunião"
  },
  {
    name: "Arthur",
    role: "Agente de Proposta",
    description: "Usa o resumo da reunião para gerar uma proposta comercial personalizada e alinhada com as necessidades do cliente.",
    icon: FileSignature,
    color: "dalton-blue",
    phase: "Fechamento"
  },
  {
    name: "Helena",
    role: "Agente de Contrato",
    description: "Prepara o contrato final com os termos acordados e o envia para assinatura eletrônica, acelerando o fechamento.",
    icon: FileCheck,
    color: "dalton-purple",
    phase: "Fechamento"
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

const colorClasses: Record<string, { bg: string; bgSolid: string; border: string; text: string; ring: string }> = {
  "dalton-blue": { 
    bg: "bg-dalton-blue/10", 
    bgSolid: "bg-dalton-blue",
    border: "border-dalton-blue/30", 
    text: "text-dalton-blue",
    ring: "ring-dalton-blue/50"
  },
  "dalton-purple": { 
    bg: "bg-dalton-purple/10", 
    bgSolid: "bg-dalton-purple",
    border: "border-dalton-purple/30", 
    text: "text-dalton-purple",
    ring: "ring-dalton-purple/50"
  },
  "dalton-cyan": { 
    bg: "bg-dalton-cyan/10", 
    bgSolid: "bg-dalton-cyan",
    border: "border-dalton-cyan/30", 
    text: "text-dalton-cyan",
    ring: "ring-dalton-cyan/50"
  },
  "dalton-orange": { 
    bg: "bg-dalton-orange/10", 
    bgSolid: "bg-dalton-orange",
    border: "border-dalton-orange/30", 
    text: "text-dalton-orange",
    ring: "ring-dalton-orange/50"
  },
};

const AgentCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextAgent = () => {
    setActiveIndex((prev) => (prev + 1) % agents.length);
  };

  const prevAgent = () => {
    setActiveIndex((prev) => (prev - 1 + agents.length) % agents.length);
  };

  const activeAgent = agents[activeIndex];
  const IconComponent = activeAgent.icon;
  const colors = colorClasses[activeAgent.color];

  return (
    <div className="mt-16 max-w-[1200px] mx-auto">
      {/* Main Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Agent Timeline - Left Side */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-dalton-blue via-dalton-purple to-dalton-orange opacity-30" />
          
          <div className="space-y-2">
            {agents.map((agent, index) => {
              const agentColors = colorClasses[agent.color];
              const AgentIcon = agent.icon;
              const isActive = index === activeIndex;
              
              return (
                <button
                  key={agent.name}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-300 text-left ${
                    isActive 
                      ? `${agentColors.bg} ${agentColors.border} border ring-2 ${agentColors.ring}` 
                      : 'hover:bg-white/5'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? agentColors.bgSolid : 'bg-white/10'
                  }`}>
                    <AgentIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-dalton-gray-light'}`} />
                  </div>

                  {/* Agent Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-inter font-semibold text-sm ${isActive ? 'text-white' : 'text-dalton-gray-light'}`}>
                        {agent.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${agentColors.bg} ${agentColors.text}`}>
                        {agent.phase}
                      </span>
                    </div>
                    <p className={`font-inter text-xs truncate ${isActive ? agentColors.text : 'text-dalton-gray'}`}>
                      {agent.role}
                    </p>
                  </div>

                  {/* Number */}
                  <span className={`font-inter font-bold text-sm ${isActive ? agentColors.text : 'text-dalton-gray'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Agent Card - Right Side */}
        <div className={`relative p-8 rounded-3xl border-2 ${colors.border} ${colors.bg} overflow-hidden`}>
          {/* Background Glow */}
          <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full ${colors.bgSolid} opacity-10 blur-3xl`} />
          
          {/* Number Badge */}
          <div className={`absolute top-6 right-6 w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
            <span className={`font-inter font-bold text-2xl ${colors.text}`}>
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Icon */}
          <div className={`w-20 h-20 rounded-2xl ${colors.bgSolid} flex items-center justify-center`}>
            <IconComponent className="w-10 h-10 text-white" />
          </div>

          {/* Phase Badge */}
          <div className={`mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border`}>
            <div className={`w-2 h-2 rounded-full ${colors.bgSolid}`} />
            <span className={`font-inter text-xs font-medium ${colors.text}`}>{activeAgent.phase}</span>
          </div>

          {/* Name & Role */}
          <h3 className="mt-4 font-inter font-bold text-3xl text-white">
            {activeAgent.name}
          </h3>
          <p className={`mt-1 font-inter font-semibold text-lg ${colors.text}`}>
            {activeAgent.role}
          </p>

          {/* Description */}
          <p className="mt-6 font-inter text-base text-dalton-gray-light leading-relaxed">
            {activeAgent.description}
          </p>

          {/* CTA */}
          <button className={`mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl ${colors.bgSolid} text-white font-inter font-semibold text-sm transition-all hover:opacity-90 group`}>
            Contratar {activeAgent.name}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Navigation */}
          <div className="absolute bottom-8 right-8 flex items-center gap-2">
            <button 
              onClick={prevAgent}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={nextAgent}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BulletMarquee = () => {
  return (
    <div className="mt-20 overflow-hidden">
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
          Um time de <span className="text-dalton-blue font-semibold">10 agentes especializados</span> que executa o trabalho operacional do seu comercial. 
          Da prospecção ao follow-up, 24 horas por dia, enquanto seu time humano foca em negociar e fechar.
        </p>

        {/* Interactive Agent Carousel */}
        <AgentCarousel />

        {/* Bullet Points Marquee */}
        <BulletMarquee />
      </div>
    </section>
  );
};

export default AIEmployeesSection;