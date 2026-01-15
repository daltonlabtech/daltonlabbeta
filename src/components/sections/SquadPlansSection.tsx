import { Zap, Users, Rocket } from 'lucide-react';

const plans = [
  {
    name: "Squad Start",
    description: "Para quem quer testar agentes de IA na sua força de vendas",
    icon: Zap,
    color: "dalton-blue"
  },
  {
    name: "Squad Pro",
    description: "Para quem quer agentes de IA trabalhando integrados ao seu time de humanos",
    icon: Users,
    color: "dalton-purple"
  },
  {
    name: "Squad Full",
    description: "Para quem quer um modelo de Vibe Selling de ponta a ponta na sua operação comercial agêntica",
    icon: Rocket,
    color: "dalton-orange"
  }
];

const SquadPlansSection = () => {
  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    "dalton-blue": { bg: "bg-dalton-blue/10", border: "border-dalton-blue/40", text: "text-dalton-blue" },
    "dalton-purple": { bg: "bg-dalton-purple/10", border: "border-dalton-purple/40", text: "text-dalton-purple" },
    "dalton-orange": { bg: "bg-dalton-orange/10", border: "border-dalton-orange/40", text: "text-dalton-orange" },
  };

  return (
    <section className="section-padding bg-dalton-dark">
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
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const colors = colorClasses[plan.color];

            return (
              <div 
                key={plan.name}
                className={`${colors.bg} border ${colors.border} rounded-2xl p-8 text-center opacity-0 animate-fade-in-up hover:scale-105 transition-transform duration-300`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center mx-auto`}>
                  <IconComponent className={`w-8 h-8 ${colors.text}`} />
                </div>

                {/* Plan Name */}
                <h3 className={`mt-6 font-inter font-bold text-xl ${colors.text}`}>
                  {plan.name}
                </h3>

                {/* Description */}
                <p className="mt-4 font-inter font-normal text-base text-dalton-gray-light leading-relaxed">
                  {plan.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SquadPlansSection;
