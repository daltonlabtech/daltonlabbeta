const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle texture */}
      <div className="absolute inset-0 bg-background">
        {/* Subtle radial gradient for glow effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, hsl(271 76% 53% / 0.1), transparent 70%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-main text-center max-w-[800px]">
        {/* Headline */}
        <h1 
          className="font-inter font-extrabold text-5xl md:text-7xl lg:text-[96px] text-white leading-[1.1] opacity-0 animate-fade-in-up"
        >
          Funcionarios Artificiais. Resultados Reais.
        </h1>

        {/* Subheadline */}
        <p 
          className="mt-8 font-inter font-normal text-lg md:text-xl text-dalton-gray-light opacity-0 animate-fade-in-up animation-delay-100"
        >
          O Squad de Vendas Essencial para Aumentar o Faturamento da Sua Empresa.
        </p>

        {/* Description */}
        <p 
          className="mt-6 font-inter font-normal text-base text-dalton-gray max-w-[600px] mx-auto opacity-0 animate-fade-in-up animation-delay-200"
        >
          Enquanto o mercado foca em apenas uma parte do funil, nosso time de 4 agentes de IA executa as tarefas repetitivas do seu processo comercial, liberando seu time humano para o que mais importa: estrategia e relacionamento.
        </p>

        {/* CTA Button */}
        <div className="mt-12 opacity-0 animate-fade-in-up animation-delay-300">
          <button className="btn-cta text-base md:text-lg">
            Entenda o Impacto no seu Faturamento
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
