import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

// Lazy load images with proper imports
const rodrigoPhoto = new URL('@/assets/founders/rodrigo.webp', import.meta.url).href;
const marceloPhoto = new URL('@/assets/founders/marcelo.webp', import.meta.url).href;
const julioPhoto = new URL('@/assets/founders/julio.png', import.meta.url).href;
const foundersPhoto = new URL('@/assets/about/founders-photo.jpg', import.meta.url).href;
const teamFullPhoto = new URL('@/assets/about/team-photo.jpg', import.meta.url).href;

const founders = [
  {
    name: "Rodrigo Spínola",
    role: "Fundador e CEO",
    description: "Foi CEO da maior operação comercial da Serasa para PMEs no Brasil. Liderou e formou +500 vendedores de alta performance. Recebeu diversos prêmios nacionais e internacionais (Paris 2018, Hawaii 2019, Montevideo 2019 e USA 2020). Hoje lidera o Dalton Lab na transformação de empresas em Organizações Agênticas. Embaixador da Escola de IA da Pós PUC/PR. Obcecado por cultura, resultado e crescimento.",
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
    image: julioPhoto,
    socials: {
      instagram: null,
      linkedin: "https://www.linkedin.com/in/julio-cesar-lohn-6b63b231/",
      youtube: null
    }
  }
];

const AboutSection = () => {
  const { ref: photosRef, isVisible: photosVisible } = useScrollReveal();

  return (
    <section className="bg-[#F5F3F0] pt-24 md:pt-32">
      {/* Fundadores e equipe - Hero Title */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6 md:py-10">
        <h1 className="font-inter text-4xl md:text-5xl lg:text-6xl text-[#1A232F] font-light text-center">
          Fundadores e equipe
        </h1>
      </div>

      {/* Photos Section - After Title */}
      <div className="w-full py-4 md:py-6" ref={photosRef as React.RefObject<HTMLDivElement>}>
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex gap-4 md:gap-6">
            <div 
              className={`w-1/2 ${revealClasses(photosVisible)}`}
              style={getStaggerDelay(0)}
            >
              <img 
                src={foundersPhoto} 
                alt="Fundadores do Dalton Lab - Rodrigo, Marcelo e Julio reunidos discutindo estratégias de IA" 
                className="w-full h-[180px] md:h-[280px] lg:h-[350px] object-cover rounded-lg"
                loading="lazy"
                decoding="async"
                width={600}
                height={350}
              />
            </div>
            <div 
              className={`w-1/2 ${revealClasses(photosVisible)}`}
              style={getStaggerDelay(1)}
            >
              <img 
                src={teamFullPhoto} 
                alt="Equipe completa do Dalton Lab - Time de especialistas em IA e vendas" 
                className="w-full h-[180px] md:h-[280px] lg:h-[350px] object-cover rounded-lg"
                loading="lazy"
                decoding="async"
                width={600}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Empresa Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-inter text-2xl md:text-3xl text-white font-normal mb-6">
            Empresa
          </h2>
          <div className="font-inter text-base md:text-lg text-dalton-gray-light/80 leading-relaxed space-y-4 text-justify">
            <p>
              Somos uma startup brasileira pioneira no modelo Agents-as-a-Service (AaaS). Nossa missão é transformar empresas convencionais em organizações agênticas, onde agentes de IA executam tarefas operacionais complexas e humanos tomam decisões estratégicas.
            </p>
            <p>
              Enquanto o mercado debate o potencial da IA, nós já vivemos essa realidade. Somos 11 profissionais operando lado a lado com mais de 30 agentes de IA proprietários.
            </p>
            <p>
              Essa configuração híbrida define a nova era do trabalho: agentes executam em volume e mantêm operações 24/7, enquanto humanos focam em estratégia, relacionamentos e liderança.
            </p>
            <p>
              Praticamos o que vendemos: escala infinita através de organizações agênticas.
            </p>
          </div>
        </div>
      </div>

      {/* Fundadores Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-inter text-2xl md:text-3xl text-white font-normal mb-8 md:mb-12">
            Fundadores
          </h2>
        </div>

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
                  <img 
                    src={founder.image} 
                    alt={`Foto de ${founder.name}, ${founder.role} do Dalton Lab`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={144}
                    height={144}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-dalton-blue/30 to-dalton-purple/30 flex items-center justify-center">
                    <span className="font-inter font-bold text-3xl text-white/50">
                      {founder.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="relative z-10 flex-1">
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
                <div className="mt-4 flex items-center gap-3">
                  {founder.socials.instagram && (
                    <a href={founder.socials.instagram} className="text-white/50 hover:text-white transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {founder.socials.linkedin && (
                    <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {founder.socials.youtube && (
                    <a href={founder.socials.youtube} className="text-white/50 hover:text-white transition-colors">
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
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
