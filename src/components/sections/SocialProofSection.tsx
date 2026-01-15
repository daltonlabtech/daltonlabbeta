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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
          {/* Featured Logo */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center">
            <img src={cliente1} alt="Cliente" className="h-16 md:h-20 w-auto object-contain opacity-90" />
          </div>

          {/* Testimonial Card - spans 2 columns */}
          <div className="col-span-2 bg-dalton-purple/10 border border-dalton-purple/30 rounded-2xl p-8">
            <blockquote className="font-inter text-base md:text-lg text-white leading-relaxed">
              "A implementação dos agentes de IA da Dalton Lab transformou completamente nosso processo comercial. Nosso time agora foca apenas em fechamento."
            </blockquote>
            <div className="mt-5">
              <p className="font-inter font-semibold text-base text-dalton-blue">Carlos Silva</p>
              <p className="font-inter text-sm text-dalton-gray-light">Diretor Comercial, TechCorp Brasil</p>
            </div>
          </div>

          {/* Logo Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center hover:bg-white/10 transition-colors">
            <img 
              src={cliente2} 
              alt="Cliente 2"
              className="h-16 md:h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Logo Cards Row 2 */}
          {clientLogos.slice(2, 6).map((logo, index) => (
            <div 
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <img 
                src={logo} 
                alt={`Cliente ${index + 3}`}
                className="h-14 md:h-18 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Bottom Logos Row */}
        <div className="mt-6 grid grid-cols-3 gap-6 max-w-[825px] mx-auto">
          {clientLogos.slice(6).map((logo, index) => (
            <div 
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <img 
                src={logo} 
                alt={`Cliente ${index + 7}`}
                className="h-14 md:h-18 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;