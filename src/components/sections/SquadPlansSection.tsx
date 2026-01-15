import { Zap, Users, Rocket, ArrowRight, Check } from 'lucide-react';

const plans = [
  {
    name: "Squad Start",
    tagline: "Teste o poder da IA",
    description: "Para quem quer testar agentes de IA na sua força de vendas",
    icon: Zap,
    color: "dalton-blue",
    features: ["3 agentes à escolha", "Integração CRM básica", "Suporte por e-mail"]
  },
  {
    name: "Squad Pro",
    tagline: "Escale sua operação",
    description: "Para quem quer agentes de IA trabalhando integrados ao seu time de humanos",
    icon: Users,
    color: "dalton-purple",
    features: ["6 agentes integrados", "Integração CRM avançada", "Suporte prioritário", "Relatórios mensais"],
    highlighted: true
  },
  {
    name: "Squad Full",
    tagline: "Vibe Selling completo",
    description: "Para quem quer um modelo de Vibe Selling de ponta a ponta na sua operação comercial agêntica",
    icon: Rocket,
    color: "dalton-orange",
    features: ["10 agentes completos", "Integrações ilimitadas", "Suporte dedicado", "Consultoria estratégica", "Customização total"]
  }
];

const SquadPlansSection = () => {
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
    <section className="section-padding bg-[#0A0A0A]">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Escolha Seu Squad
        </h2>

        {/* Subtitle */}
        <p className="mt-4 font-inter font-normal text-lg text-dalton-gray-light text-center max-w-2xl mx-auto">
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
                className={`relative p-8 flex flex-col opacity-0 animate-fade-in-up ${
                  isHighlighted 
                    ? 'bg-gradient-to-b from-dalton-purple/20 to-dalton-purple/5 border-2 border-dalton-purple/50 rounded-2xl md:-my-4 z-10' 
                    : 'bg-[#111111] border border-white/10 md:first:rounded-l-2xl md:last:rounded-r-2xl'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
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

                {/* Features */}
                <ul className="mt-6 space-y-3 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Check className={`w-3 h-3 ${colors.text}`} />
                      </div>
                      <span className="font-inter text-sm text-dalton-gray-light">{feature}</span>
                    </li>
                  ))}
                </ul>

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