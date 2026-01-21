import { Instagram, Linkedin, Youtube } from 'lucide-react';
import rodrigoPhoto from '@/assets/founders/rodrigo.webp';
import marceloPhoto from '@/assets/founders/marcelo.webp';
import foundersPhoto from '@/assets/about/founders-photo.jpg';
import teamFullPhoto from '@/assets/about/team-photo.jpg';

const founders = [
  {
    name: "Rodrigo Spínola",
    role: "Fundador e CEO",
    description: "Empreendedor e líder de times de alta performance. Especialista em arquitetura de go-to-market. Obcecado por cultura, resultado e crescimento.",
    image: rodrigoPhoto,
    socials: {
      instagram: "#",
      linkedin: "#",
      youtube: "#"
    }
  },
  {
    name: "Marcelo Ramos",
    role: "Fundador e COO",
    description: "Gerenciou mais de 120 projetos de iniciativas digitais no mercado de Saúde e Educação, gerando +7000 clientes. Obcecado por arquitetura operacional.",
    image: marceloPhoto,
    socials: {
      instagram: "#",
      linkedin: "#",
      youtube: "#"
    }
  }
];

const AboutSection = () => {
  return (
    <section className="bg-background pt-24 md:pt-32">
      {/* Empresa Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-20">
          <h2 className="font-inter text-2xl md:text-3xl text-white font-normal flex-shrink-0">
            Empresa
          </h2>
          <p className="font-inter text-base md:text-lg text-dalton-gray-light leading-relaxed">
            O Dalton Lab transforma empresas em organizações agênticas. Somos 11 pessoas trabalhando lado a lado com mais de 20 agentes de IA internos. Nascemos com um propósito claro: acelerar a transição das empresas para um modelo em que humanos e agentes de IA trabalham juntos. Humanos decidem, se relacionam e lideram. Agentes executam, escalam e mantêm a operação em movimento.
          </p>
        </div>
      </div>

      {/* Fundadores Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <h2 className="font-inter text-2xl md:text-3xl text-white font-normal mb-8 md:mb-12">
          Fundadores
        </h2>

        {/* Founders Cards */}
        <div className="space-y-6 max-w-[900px]">
          {founders.map((founder, index) => (
            <div 
              key={index}
              className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Photo */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-dalton-blue/20 to-dalton-purple/20 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-inter font-bold text-3xl text-white/30">
                    {founder.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                <h3 className="font-inter font-bold text-xl text-white">
                  {founder.name}
                </h3>
                <p className="font-inter font-medium text-sm text-dalton-blue">
                  {founder.role}
                </p>
                <p className="mt-3 font-inter text-sm text-dalton-gray-light leading-relaxed">
                  {founder.description}
                </p>
                
                {/* Social Icons */}
                <div className={`mt-4 flex items-center gap-3 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  <a href={founder.socials.instagram} className="text-dalton-gray-light hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href={founder.socials.linkedin} className="text-dalton-gray-light hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={founder.socials.youtube} className="text-dalton-gray-light hover:text-white transition-colors">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photos Section - Before Footer */}
      <div className="w-full bg-[#101823] py-8 md:py-12 mt-12 md:mt-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex gap-4 md:gap-6 lg:gap-8">
            <div className="w-1/2">
              <img 
                src={foundersPhoto} 
                alt="Fundadores Dalton Lab" 
                className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <img 
                src={teamFullPhoto} 
                alt="Time Dalton Lab" 
                className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
