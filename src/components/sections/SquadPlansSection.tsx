import { Zap, Users, Rocket, ArrowRight, Check, X } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

// All agents available (matching new names from AIEmployeesSection)
const allAgents = [
  { key: 'qualificacao', label: 'Qualificação de Lead' },
  { key: 'investigador', label: 'Investigador de Leads' },
  { key: 'whatsapp', label: 'Vendedor no WhatsApp' },
  { key: 'gestor', label: 'Gestor Comercial' },
  { key: 'propostas', label: 'Propostas Comerciais' },
  { key: 'aquecimento', label: 'Aquecimento da Lead' },
  { key: 'followup', label: 'Follow-Up Automático' },
  { key: 'contrato', label: 'Contrato Assinado' },
];

// All features in a unified order for comparison
const allFeatures = [
  { key: 'support', label: 'Suporte prioritário' },
  { key: 'reports', label: 'Relatórios avançados' },
  { key: 'dedicated', label: 'Suporte dedicado' },
  { key: 'consulting', label: 'Consultoria estratégica' },
  { key: 'customization', label: 'Customização total' },
];

const plans = [
  {
    name: "Time Start",
    tagline: "Teste o poder da IA",
    description: "Para quem quer testar agentes de IA na sua força de vendas",
    icon: Zap,
    color: "dalton-blue",
    agents: {
      qualificacao: true,
      investigador: true,
      whatsapp: true,
      gestor: false,
      propostas: false,
      aquecimento: false,
      followup: false,
      contrato: false,
    },
    features: {
      support: false,
      reports: false,
      dedicated: false,
      consulting: false,
      customization: false,
    }
  },
  {
    name: "Time Pro",
    tagline: "Escale sua operação",
    description: "Para quem quer agentes de IA trabalhando integrados ao seu time",
    icon: Users,
    color: "dalton-purple",
    agents: {
      qualificacao: true,
      investigador: true,
      whatsapp: true,
      gestor: true,
      propostas: true,
      aquecimento: true,
      followup: false,
      contrato: false,
    },
    features: {
      support: true,
      reports: true,
      dedicated: false,
      consulting: false,
      customization: false,
    },
    highlighted: true
  },
  {
    name: "Time Full",
    tagline: "Vibe Selling completo",
    description: "Modelo de Vibe Selling de ponta a ponta na sua operação comercial",
    icon: Rocket,
    color: "dalton-orange",
    agents: {
      qualificacao: true,
      investigador: true,
      whatsapp: true,
      gestor: true,
      propostas: true,
      aquecimento: true,
      followup: true,
      contrato: true,
    },
    features: {
      support: true,
      reports: true,
      dedicated: true,
      consulting: true,
      customization: true,
    }
  }
];

const SquadPlansSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
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
    "dalton-orange": { 
      bg: "bg-dalton-orange/10", 
      bgSolid: "bg-dalton-orange",
      border: "border-dalton-orange/30", 
      text: "text-dalton-orange",
      gradient: "from-dalton-orange/20 to-transparent"
    },
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-[#19212E]"
    >
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center ${revealClasses(isVisible)}`}
        >
          Escolha Seu Time
        </h2>

        {/* Subtitle */}
        <p 
          className={`mt-4 font-inter font-normal text-lg text-dalton-gray-light text-center max-w-2xl mx-auto ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          Planos flexíveis para cada estágio da sua jornada com IA
        </p>

        {/* Plans Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 max-w-[1100px] mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const colors = colorClasses[plan.color];
            const isHighlighted = plan.highlighted;

            return (
              <div 
                key={plan.name}
                className={`relative p-8 flex flex-col ${revealClasses(isVisible)} ${
                  isHighlighted 
                    ? 'bg-gradient-to-b from-dalton-purple/20 to-dalton-purple/5 border-2 border-dalton-purple/50 rounded-2xl md:-my-4 z-10' 
                    : 'bg-[#111111] border border-white/10 md:first:rounded-l-2xl md:last:rounded-r-2xl'
                }`}
                style={getStaggerDelay(index + 2)}
              >
                {/* Popular Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-dalton-purple text-white text-xs font-semibold px-4 py-1 rounded-full">
                      MAIS POPULAR
                    </span>
                  </div>
                )}

                {/* Icon & Decorative Elements */}
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-xl ${colors.bgSolid} flex items-center justify-center`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Decorative Lines */}
                  <div className="flex flex-col gap-1.5 opacity-40">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full ${colors.bgSolid}`}
                        style={{ width: `${40 - i * 6}px` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className={`mt-6 font-inter font-bold text-2xl text-white`}>
                  {plan.name}
                </h3>

                {/* Tagline */}
                <p className={`mt-1 font-inter font-medium text-sm ${colors.text}`}>
                  {plan.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 font-inter font-normal text-sm text-dalton-gray-light leading-relaxed">
                  {plan.description}
                </p>

                {/* Agents List as bullet points */}
                <div className="mt-6">
                  <p className="font-inter font-semibold text-xs text-white/60 uppercase tracking-wider mb-3">
                    Agentes incluídos:
                  </p>
                  <ul className="space-y-2">
                    {allAgents.map((agent) => {
                      const isIncluded = plan.agents[agent.key as keyof typeof plan.agents];
                      return (
                        <li key={agent.key} className="flex items-center gap-2">
                          {isIncluded ? (
                            <div className={`w-4 h-4 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                              <Check className={`w-2.5 h-2.5 ${colors.text}`} />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                              <X className="w-2.5 h-2.5 text-dalton-gray" />
                            </div>
                          )}
                          <span className={`font-inter text-xs ${isIncluded ? 'text-dalton-gray-light' : 'text-dalton-gray line-through'}`}>
                            {agent.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Features List - Same order for all plans */}
                <div className="mt-6">
                  <p className="font-inter font-semibold text-xs text-white/60 uppercase tracking-wider mb-3">
                    Recursos:
                  </p>
                  <ul className="space-y-2">
                    {allFeatures.map((feature) => {
                      const isIncluded = plan.features[feature.key as keyof typeof plan.features];
                      return (
                        <li key={feature.key} className="flex items-center gap-2">
                          {isIncluded ? (
                            <div className={`w-4 h-4 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                              <Check className={`w-2.5 h-2.5 ${colors.text}`} />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                              <X className="w-2.5 h-2.5 text-dalton-gray" />
                            </div>
                          )}
                          <span className={`font-inter text-xs ${isIncluded ? 'text-dalton-gray-light' : 'text-dalton-gray line-through'}`}>
                            {feature.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* CTA Button */}
                <button 
                  className={`mt-8 w-full py-3.5 rounded-xl font-inter font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    isHighlighted 
                      ? `${colors.bgSolid} text-white hover:opacity-90` 
                      : `bg-white/5 border ${colors.border} ${colors.text} hover:bg-white/10`
                  }`}
                >
                  Saiba mais
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SquadPlansSection;
