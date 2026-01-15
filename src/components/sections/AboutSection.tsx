import { Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import rodrigoPhoto from '@/assets/founders/rodrigo.webp';
import marceloPhoto from '@/assets/founders/marcelo.webp';
import teamPhoto from '@/assets/team/dalton-team.webp';

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
    <section className="section-padding bg-background pt-32">
      <div className="container-main max-w-[900px]">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-dalton-blue/10 border border-dalton-blue/30 text-dalton-blue font-inter font-medium text-xs uppercase tracking-wider">
            Quem Somos
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-6 font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center uppercase tracking-wide">
          Bem-vindo ao Dalton Lab
        </h2>

        {/* Subtitle */}
        <p className="mt-4 font-inter font-normal text-lg text-dalton-gray-light text-center">
          O laboratório que transforma empresas em organizações agênticas.
        </p>

        {/* Team Photo */}
        <div className="mt-10 relative rounded-2xl overflow-hidden border border-white/10">
          <img 
            src={teamPhoto} 
            alt="Time Dalton Lab" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        {/* Team Count Text */}
        <p className="mt-6 font-inter font-semibold text-xl md:text-2xl text-white text-center">
          Somos um time de <span className="text-dalton-blue">11 pessoas</span>... e mais de <span className="text-dalton-purple">20 agentes de IA</span> internos.
        </p>

        {/* Description */}
        <div className="mt-10 space-y-4 text-center md:text-left">
          <p className="font-inter text-base text-dalton-gray-light leading-relaxed">
            O Dalton Lab nasceu com um propósito claro: acelerar a transição de empresas para um modelo onde humanos e agentes de IA trabalham juntos.
          </p>
          <p className="font-inter text-base text-white leading-relaxed font-medium">
            Humanos decidem, se relacionam e lideram. Agentes executam, escalam e mantêm a operação rodando.
          </p>
          <p className="font-inter text-base text-dalton-gray-light leading-relaxed">
            Hoje, já atendemos empresas nos mais diversos mercados espalhados em <span className="text-dalton-blue font-semibold">4 continentes</span>.
          </p>
        </div>

        {/* Founders Cards */}
        <div className="mt-12 space-y-6">
          {founders.map((founder, index) => (
            <div 
              key={index}
              className={`flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-white/[0.03] border border-white/10 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Photo Placeholder */}
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

        {/* CTA Link */}
        <div className="mt-10 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 font-inter font-medium text-dalton-blue hover:text-dalton-blue/80 transition-colors"
          >
            Conheça os 10 princípios do Dalton Lab
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;