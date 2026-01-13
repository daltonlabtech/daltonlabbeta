const steps = [
  {
    number: 1,
    title: "Analise de Potencial de Faturamento",
    description: "Avaliamos seu processo comercial atual e identificamos oportunidades de otimizacao com IA."
  },
  {
    number: 2,
    title: "Plano de Aumento de Vendas",
    description: "Criamos um plano personalizado com os agentes ideais para maximizar seus resultados."
  },
  {
    number: 3,
    title: "Implementacao e Resultados",
    description: "Configuramos e integramos os agentes ao seu fluxo, acompanhando metricas e ajustando estrategias."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-4xl md:text-5xl lg:text-[56px] text-white text-center">
          Como Funciona
        </h2>

        {/* Steps */}
        <div className="mt-16 max-w-[800px] mx-auto relative">
          {/* Vertical dotted line */}
          <div className="absolute left-[30px] top-[60px] bottom-[60px] w-px border-l-2 border-dashed border-dalton-gray/30 hidden md:block" />

          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="flex gap-8 mb-12 last:mb-0 opacity-0 animate-fade-in-right"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Number */}
              <div className="flex-shrink-0 w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center relative z-10">
                <span className="font-inter font-bold text-2xl text-white">{step.number}</span>
              </div>

              {/* Content */}
              <div className="pt-2">
                <h3 className="font-inter font-semibold text-[22px] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 font-inter font-normal text-base text-dalton-gray-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
