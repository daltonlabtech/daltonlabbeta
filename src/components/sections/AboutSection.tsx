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
    <section className="bg-background">
      {/* Hero Photo Section - Full Width with spacing */}
      <div className="w-full bg-[#101823] pt-20">
        <div className="bg-[#101823] py-8 md:py-12">
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
      </div>

      {/* Content Section */}
      <div className="section-padding">
        <div className="container-main max-w-[900px]">
          {/* Founders Title */}
          <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center uppercase tracking-wide">
            Fundadores
          </h2>

          {/* Founders Cards */}
          <div className="mt-12 space-y-6">
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
      </div>
    </section>
  );
};

export default AboutSection;
