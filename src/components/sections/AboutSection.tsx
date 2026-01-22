import { Instagram, Linkedin, Youtube } from 'lucide-react';
import rodrigoPhoto from '@/assets/founders/rodrigo.webp';
import marceloPhoto from '@/assets/founders/marcelo.webp';
import foundersPhoto from '@/assets/about/founders-photo.jpg';
import teamFullPhoto from '@/assets/about/team-photo.jpg';

const founders = [
  {
    name: "Rodrigo Spínola",
    role: "Fundador e CEO",
    description: "Foi CEO da Rede Ok, onde liderou +500 vendedores e preparou a empresa para M&A. Reconhecido como Top 1% mundial em vendas (MDRT). Hoje lidera o Dalton Lab na transformação de empresas em Organizações Agênticas. Embaixador da Escola de IA da Pós PUC/PR. Obcecado por cultura, resultado e crescimento.",
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
    description: "Gerenciou mais de 120 projetos de iniciativas digitais no mercado de Saúde e Educação, gerando +7000 clientes em seu primeiro empreendimento, aos 21 anos. Tendo experiência em multinacionais como Deloitte, hoje desenha a arquitetura operacional que transforma estratégia em execução no Dalton Lab.",
    image: marceloPhoto,
    socials: {
      instagram: "#",
      linkedin: "#",
      youtube: "#"
    }
  },
  {
    name: "Julio Lohn",
    role: "Sócio-conselheiro",
    description: "Diretor Comercial e Marketing do Grupo Mundial Mix, que controla Brasil Atacadista e Supermercados Imperatriz, uma das maiores redes do varejo alimentar de Santa Catarina. Presidente do Conselho da Rede Brasil - RBSM. +13 anos liderando estratégia comercial e inovação no setor.",
    image: null,
    socials: {
      instagram: "#",
      linkedin: "#",
      youtube: "#"
    }
  }
];

const AboutSection = () => {
  return (
    <section className="bg-[#101823] pt-24 md:pt-32">
      {/* Fundadores e equipe - Hero Title */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6 md:py-10">
        <h1 className="font-inter text-4xl md:text-5xl lg:text-6xl text-[#F5F3F0] font-light text-center">
          Fundadores e equipe
        </h1>
      </div>

      {/* Photos Section - After Title */}
      <div className="w-full py-4 md:py-6">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex gap-4 md:gap-6">
            <div className="w-1/2">
              <img 
                src={foundersPhoto} 
                alt="Fundadores Dalton Lab" 
                className="w-full h-[180px] md:h-[280px] lg:h-[350px] object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2">
              <img 
                src={teamFullPhoto} 
                alt="Time Dalton Lab" 
                className="w-full h-[180px] md:h-[280px] lg:h-[350px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Empresa Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-32 items-start">
          <h2 className="font-inter text-2xl md:text-3xl text-white font-normal flex-shrink-0">
            Empresa
          </h2>
          <p className="font-inter text-base md:text-lg text-dalton-gray-light/80 leading-relaxed max-w-2xl">
            O Dalton Lab transforma empresas em organizações agênticas. Somos <span className="text-white">(apenas) 11 pessoas trabalhando lado a lado com mais de 20 agentes de IA internos.</span> Nascemos com um propósito claro: acelerar a transição das empresas para um modelo em que humanos e agentes de IA trabalham juntos. Humanos decidem, se relacionam e lideram. Agentes executam, escalam e mantêm a operação em movimento.
          </p>
        </div>
      </div>

      {/* Fundadores Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <h2 className="font-inter text-2xl md:text-3xl text-white font-normal mb-8 md:mb-12">
          Fundadores
        </h2>

        {/* Founders Cards - Dark Theme */}
        <div className="space-y-4 max-w-[900px] mx-auto">
          {founders.map((founder, index) => (
            <div 
              key={index}
              className={`relative flex flex-col md:flex-row items-start gap-6 p-6 rounded-2xl overflow-hidden border border-white/10 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
              style={{ backgroundColor: '#1A232F' }}
            >
              {/* Photo */}
              <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden flex-shrink-0">
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-dalton-blue/30 to-dalton-purple/30 flex items-center justify-center">
                    <span className="font-inter font-bold text-3xl text-white/50">
                      {founder.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className={`relative z-10 flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                <h3 className="font-inter font-bold text-xl text-white">
                  {founder.name}
                </h3>
                <p className="font-inter font-medium text-sm text-dalton-blue">
                  {founder.role}
                </p>
                <p className="mt-3 font-inter text-sm text-white/70 leading-relaxed">
                  {founder.description}
                </p>
                
                {/* Social Icons */}
                <div className={`mt-4 flex items-center gap-3 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                  <a href={founder.socials.instagram} className="text-white/50 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href={founder.socials.linkedin} className="text-white/50 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={founder.socials.youtube} className="text-white/50 hover:text-white transition-colors">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
