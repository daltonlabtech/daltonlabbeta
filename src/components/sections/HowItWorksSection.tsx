import { Map, Bot, Play } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: "Mostramos ",
    highlight: "Onde",
    titleEnd: " a IA Entra no Seu Negócio",
    description: "Mapeamos seu fluxo de trabalho e identificamos quais funções podem ser executadas por agentes. Você sabe exatamente onde colocar cada um.",
    icon: Map,
    color: "dalton-blue"
  },
  {
    number: 2,
    title: "Selecionamos e ",
    highlight: "Treinamos",
    titleEnd: " os Agentes Certos",
    description: "Escolhemos os melhores agentes para as suas necessidades. Treinamos cada um para o seu contexto específico. Prontos para operar.",
    icon: Bot,
    color: "dalton-purple"
  },
  {
    number: 3,
    title: "Colocamos Seus Agentes Para ",
    highlight: "Trabalhar",
    titleEnd: "",
    description: "Colocamos seus Agentes para trabalhar integrados aos seus novos processos e ao seu time atual.",
    icon: Play,
    color: "dalton-orange"
  }
];

const HowItWorksSection = () => {
  const colorClasses: Record<string, { bg: string; text: string }> = {
    "dalton-blue": { bg: "bg-dalton-blue", text: "text-dalton-blue" },
    "dalton-purple": { bg: "bg-dalton-purple", text: "text-dalton-purple" },
    "dalton-orange": { bg: "bg-dalton-orange", text: "text-dalton-orange" },
  };

  return (
    <section className="section-padding bg-dalton-dark">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Como Funciona
        </h2>
        
        {/* Subtitle */}
        <p className="mt-4 font-inter font-light text-lg tracking-[0.15em] uppercase text-dalton-gray-light text-center">
          TRÊS PASSOS
        </p>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const colors = colorClasses[step.color];
            
            return (
              <div 
                key={step.number}
                className="glass-card p-8 rounded-2xl opacity-0 animate-fade-in-up text-center"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center mx-auto`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Title with highlighted word */}
                <h3 className="mt-6 font-inter font-semibold text-lg text-white leading-snug">
                  {step.title}
                  <span className={`${colors.text} italic`}>{step.highlight}</span>
                  {step.titleEnd}
                </h3>

                {/* Description */}
                <p className="mt-4 font-inter font-normal text-[15px] text-dalton-gray-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
