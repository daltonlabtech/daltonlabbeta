const logos = [
  { name: "Company 1", placeholder: "Logo 1" },
  { name: "Company 2", placeholder: "Logo 2" },
  { name: "Company 3", placeholder: "Logo 3" },
  { name: "Company 4", placeholder: "Logo 4" },
  { name: "Company 5", placeholder: "Logo 5" },
  { name: "Company 6", placeholder: "Logo 6" }
];

const SocialProofSection = () => {
  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-4xl md:text-5xl lg:text-[56px] text-white text-center">
          Marcas que confiam em nosso trabalho
        </h2>

        {/* Logo Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-20 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <div className="font-inter font-medium text-dalton-gray text-lg">
                {logo.placeholder}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="mt-20 max-w-[750px] mx-auto border-l-4 border-primary pl-10">
          <blockquote className="font-inter font-normal text-[22px] text-dalton-text italic leading-relaxed">
            "A implementacao dos agentes de IA da Dalton Lab transformou completamente nosso processo comercial. Aumentamos a taxa de conversao em 40% e nosso time agora foca apenas em fechamento."
          </blockquote>
          <div className="mt-6">
            <p className="font-inter font-semibold text-base text-white">
              Carlos Silva
            </p>
            <p className="font-inter font-normal text-sm text-dalton-gray">
              Diretor Comercial, TechCorp Brasil
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
