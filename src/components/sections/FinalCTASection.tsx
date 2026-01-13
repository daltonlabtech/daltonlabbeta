const FinalCTASection = () => {
  return (
    <section className="py-[150px]">
      <div className="container-main max-w-[850px] text-center">
        {/* Title */}
        <h2 className="font-inter font-extrabold text-4xl md:text-5xl lg:text-[64px] text-white leading-tight">
          Vamos desenhar o futuro da sua area comercial?
        </h2>

        {/* Description */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light max-w-[600px] mx-auto">
          Agende uma analise gratuita e descubra como nossos agentes de IA podem transformar seus resultados de vendas.
        </p>

        {/* CTA Button with animated glow */}
        <div className="mt-12 relative inline-block">
          {/* Animated glow behind button */}
          <div className="absolute inset-0 bg-primary rounded-lg blur-xl opacity-50 animate-pulse-glow" />
          
          <button className="relative btn-cta text-lg px-10 py-5">
            Agendar Analise Gratuita
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
