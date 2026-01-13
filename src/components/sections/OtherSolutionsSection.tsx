const OtherSolutionsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-main max-w-[800px] text-center">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white">
          Precisa de especialistas para outras areas?
        </h2>

        {/* Description */}
        <p className="mt-8 font-inter font-normal text-lg text-dalton-gray-light">
          Alem do time de vendas, temos agentes especializados para atendimento ao cliente, RH, financeiro e outras areas. Explore nosso marketplace de solucoes.
        </p>

        {/* CTA Button */}
        <div className="mt-12">
          <button className="btn-cta">
            Explorar Marketplace
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OtherSolutionsSection;
