import { useState, useRef, useEffect } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import agent images
import agent01 from '@/assets/agents/agent-01-investigador.webp';
import agent02 from '@/assets/agents/agent-02-followup.webp';
import agent03 from '@/assets/agents/agent-03-gestor.webp';
import agent04 from '@/assets/agents/agent-04-propostas.webp';
import agent05 from '@/assets/agents/agent-05-aquecimento.webp';
import agent06 from '@/assets/agents/agent-06-contrato.webp';
import agent07 from '@/assets/agents/agent-07-qualificacao.webp';
import agent08 from '@/assets/agents/agent-08-whatsapp.webp';

const agents = [
  {
    id: 1,
    name: "Investigador de Leads",
    image: agent01,
    description: "Encontra novas empresas e contatos que se encaixam no perfil de cliente ideal (ICP). Vasculha bases de dados, redes sociais e fontes públicas para identificar oportunidades.",
    benefits: [
      "Prospecção ativa 24/7",
      "Filtros inteligentes de ICP",
      "Enriquecimento automático de dados"
    ]
  },
  {
    id: 2,
    name: "Follow-Up Automático",
    image: agent02,
    description: "Garante que nenhum lead seja esquecido. Envia lembretes, acompanhamentos e mensagens personalizadas no momento certo para manter a conversa ativa.",
    benefits: [
      "Sequências automatizadas",
      "Timing inteligente de envio",
      "Personalização por contexto"
    ]
  },
  {
    id: 3,
    name: "Gestor Comercial",
    image: agent03,
    description: "Gerencia todo o pipeline de vendas, acompanha métricas e KPIs, e fornece insights para melhorar a performance do time comercial.",
    benefits: [
      "Dashboards em tempo real",
      "Alertas de oportunidades",
      "Relatórios automatizados"
    ]
  },
  {
    id: 4,
    name: "Propostas Comerciais",
    image: agent04,
    description: "Gera propostas comerciais personalizadas e alinhadas com as necessidades do cliente, acelerando o ciclo de vendas.",
    benefits: [
      "Templates inteligentes",
      "Precificação dinâmica",
      "Envio automatizado"
    ]
  },
  {
    id: 5,
    name: "Aquecimento da Lead",
    image: agent05,
    description: "Envia conteúdos relevantes (cases, artigos, vídeos) para manter o lead engajado e preparado para a próxima etapa do funil.",
    benefits: [
      "Nutrição personalizada",
      "Score de engajamento",
      "Conteúdo contextualizado"
    ]
  },
  {
    id: 6,
    name: "Contrato Assinado",
    image: agent06,
    description: "Prepara o contrato final e o envia para assinatura eletrônica, acompanhando todo o processo até o fechamento.",
    benefits: [
      "Geração automática de contratos",
      "Integração com e-sign",
      "Tracking de assinaturas"
    ]
  },
  {
    id: 7,
    name: "Qualificação de Lead",
    image: agent07,
    description: "Avalia e pontua cada lead com base em critérios como fit, timing e interesse, priorizando os que têm maior potencial de conversão.",
    benefits: [
      "Lead scoring inteligente",
      "Qualificação BANT automática",
      "Priorização do pipeline"
    ]
  },
  {
    id: 8,
    name: "Vendedor no WhatsApp",
    image: agent08,
    description: "Inicia e mantém conversas via WhatsApp, enviando mensagens personalizadas para criar conexão e avançar a negociação.",
    benefits: [
      "Respostas instantâneas",
      "Conversas naturais",
      "Integração com CRM"
    ]
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

interface AgentModalProps {
  agent: typeof agents[0] | null;
  onClose: () => void;
}

const AgentModal = ({ agent, onClose }: AgentModalProps) => {
  if (!agent) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-dalton-dark border border-white/10 rounded-3xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2">
            <img 
              src={agent.image} 
              alt={agent.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <span className="text-dalton-blue text-sm font-medium uppercase tracking-wider">
              Agente #{String(agent.id).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-inter font-bold text-2xl md:text-3xl text-white">
              {agent.name}
            </h3>
            <p className="mt-4 text-dalton-gray-light leading-relaxed">
              {agent.description}
            </p>

            {/* Benefits */}
            <ul className="mt-6 space-y-2">
              {agent.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-dalton-blue flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="mt-8 group bg-white text-zinc-900 font-medium text-sm px-6 py-3 rounded-full hover:bg-zinc-100 transition-all inline-flex items-center justify-center w-fit">
              <span>Quero esse agente</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
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
  const [selectedAgent, setSelectedAgent] = useState<typeof agents[0] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    setDragDistance(Math.abs(walk));
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    setDragDistance(Math.abs(walk));
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleCardClick = (agent: typeof agents[0]) => {
    // Only open modal if it wasn't a drag
    if (dragDistance < 10) {
      setSelectedAgent(agent);
    }
  };

  const scrollBookshelf = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedAgent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedAgent]);

  return (
    <section className="section-padding bg-dalton-dark overflow-hidden">
      <div className="container-main">
        {/* Subtitle */}
        <p className="font-inter font-normal text-sm tracking-[0.2em] uppercase text-dalton-gray-light text-center">
          POR QUE O DALTON LAB
        </p>
        
        {/* Title */}
        <h2 className="mt-4 font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-white text-center">
          Conheça seu Squad de Vendas de IA
        </h2>

        {/* Description */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light text-center max-w-[800px] mx-auto leading-relaxed">
          Um time de <span className="text-dalton-blue font-semibold">8 agentes especializados</span> que executa o trabalho operacional do seu comercial. 
          Da prospecção ao follow-up, 24 horas por dia, enquanto seu time humano foca em negociar e fechar.
        </p>
      </div>

      {/* Bookshelf Carousel */}
      <div className="relative mt-12">
        {/* Navigation Arrows */}
        <button 
          onClick={() => scrollBookshelf('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={() => scrollBookshelf('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hidden md:flex"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dalton-dark to-transparent z-[5] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dalton-dark to-transparent z-[5] pointer-events-none" />

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
          className={`flex gap-6 overflow-x-auto scrollbar-hide px-8 md:px-16 py-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              onClick={() => handleCardClick(agent)}
              className="group relative flex-shrink-0 w-[200px] md:w-[240px] transition-all duration-500 ease-out hover:scale-105 select-none"
              style={{
                transform: `perspective(1000px) rotateY(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Card Shadow/Shelf Effect */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/40 blur-lg rounded-full" />
              
              {/* Agent Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/30 group-hover:shadow-dalton-blue/20">
                {/* Number Badge */}
                <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="font-inter font-bold text-sm text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Image */}
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  draggable={false}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex items-center gap-2 text-white font-medium text-sm">
                    <span>Ver detalhes</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Hint */}
        <p className="text-center text-dalton-gray-light/60 text-sm mt-4 md:hidden">
          ← Arraste para explorar →
        </p>
      </div>

      <div className="container-main">
        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="group bg-white text-zinc-900 font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
            <span>Quero conhecer o Squad</span>
            <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>

        {/* Bullet Points Marquee */}
        <BulletMarquee />
      </div>

      {/* Agent Detail Modal */}
      <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
    </section>
  );
};

export default AIEmployeesSection;
