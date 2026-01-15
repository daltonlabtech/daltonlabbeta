import cliente1 from '@/assets/logos/cliente-1.webp';
import cliente2 from '@/assets/logos/cliente-2.webp';
import cliente3 from '@/assets/logos/cliente-3.webp';
import cliente4 from '@/assets/logos/cliente-4.webp';
import cliente5 from '@/assets/logos/cliente-5.webp';
import cliente6 from '@/assets/logos/cliente-6.webp';
import cliente7 from '@/assets/logos/cliente-7.webp';
import cliente8 from '@/assets/logos/cliente-8.webp';
import cliente9 from '@/assets/logos/cliente-9.webp';

const clientLogos = [
  cliente1, cliente2, cliente3, cliente4, cliente5, cliente6, cliente7, cliente8, cliente9
];

const SocialProofSection = () => {
  return (
    <section className="section-padding bg-dalton-dark">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Marcas que confiam em nosso trabalho
        </h2>

        {/* Grid Layout */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1100px] mx-auto">
          {/* Stat Card */}
          <div className="bg-dalton-blue/10 border border-dalton-blue/30 rounded-2xl p-6 flex flex-col justify-center items-center">
            <span className="font-inter font-bold text-4xl md:text-5xl text-white">+40%</span>
            <span className="mt-2 font-inter text-sm text-dalton-gray-light text-center">em taxa de conversão</span>
          </div>

          {/* Featured Logo */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center">
            <img src={cliente1} alt="Cliente" className="h-12 w-auto object-contain opacity-80" />
          </div>

          {/* Testimonial Card - spans 2 columns */}
          <div className="col-span-2 bg-dalton-purple/10 border border-dalton-purple/30 rounded-2xl p-6">
            <blockquote className="font-inter text-base md:text-lg text-white italic leading-relaxed">
              "A implementação dos agentes de IA da Dalton Lab transformou completamente nosso processo comercial. Aumentamos a taxa de conversão em 40% e nosso time agora foca apenas em fechamento."
            </blockquote>
            <div className="mt-4">
              <p className="font-inter font-semibold text-sm text-dalton-blue">Carlos Silva</p>
              <p className="font-inter text-xs text-dalton-gray-light">Diretor Comercial, TechCorp Brasil</p>
            </div>
          </div>

          {/* Logo Cards */}
          {clientLogos.slice(1, 5).map((logo, index) => (
            <div 
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <img 
                src={logo} 
                alt={`Cliente ${index + 2}`}
                className="h-10 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Bottom Logos Row */}
        <div className="mt-4 grid grid-cols-4 gap-4 max-w-[1100px] mx-auto">
          {clientLogos.slice(5).map((logo, index) => (
            <div 
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <img 
                src={logo} 
                alt={`Cliente ${index + 6}`}
                className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
