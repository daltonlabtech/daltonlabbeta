import { Instagram, Linkedin, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const rodrigoPhoto = new URL('@/assets/founders/rodrigo.webp', import.meta.url).href;
const marceloPhoto = new URL('@/assets/founders/marcelo.webp', import.meta.url).href;
const julioPhoto = new URL('@/assets/founders/julio.webp', import.meta.url).href;
const foundersPhoto = new URL('@/assets/about/founders-photo.webp', import.meta.url).href;
const teamFullPhoto = new URL('@/assets/about/team-photo.webp', import.meta.url).href;

interface FounderTranslation {
  role: string;
  description: string;
}

const foundersData = [
  {
    name: "Rodrigo Spínola",
    image: rodrigoPhoto,
    socials: { instagram: "#", linkedin: "#", youtube: "#" }
  },
  {
    name: "Marcelo Ramos",
    image: marceloPhoto,
    socials: { instagram: "#", linkedin: "#", youtube: "#" }
  },
  {
    name: "Julio Lohn",
    image: julioPhoto,
    socials: {
      instagram: null as string | null,
      linkedin: "https://www.linkedin.com/in/julio-cesar-lohn-6b63b231/",
      youtube: null as string | null
    }
  }
];

const AboutSection = () => {
  const { t } = useTranslation();
  const { ref: photosRef, isVisible: photosVisible } = useScrollReveal();
  const companyParagraphs = t('about.companyParagraphs', { returnObjects: true }) as string[];
  const foundersTranslations = t('about.founders', { returnObjects: true }) as FounderTranslation[];

  return (
    <section className="bg-[#101823] pt-24 md:pt-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6 md:py-10">
        <h1 className="font-inter text-4xl md:text-5xl lg:text-6xl text-[#F5F3F0] font-light text-center">
          {t('about.pageTitle')}
        </h1>
      </div>

      <div className="w-full py-4 md:py-6" ref={photosRef as React.RefObject<HTMLDivElement>}>
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className={`w-full md:w-1/2 ${revealClasses(photosVisible)}`} style={getStaggerDelay(0)}>
              <img 
                src={foundersPhoto} 
                alt={`${t('about.foundersTitle')} - Dalton Lab`}
                className="w-full h-[200px] md:h-auto md:aspect-[16/10] lg:h-[350px] lg:aspect-auto object-cover rounded-lg"
                loading="lazy" decoding="async" width={600} height={350}
              />
            </div>
            <div className={`w-full md:w-1/2 ${revealClasses(photosVisible)}`} style={getStaggerDelay(1)}>
              <img 
                src={teamFullPhoto} 
                alt="Dalton Lab Team"
                className="w-full h-[200px] md:h-auto md:aspect-[16/10] lg:h-[350px] lg:aspect-auto object-cover rounded-lg"
                loading="lazy" decoding="async" width={600} height={350}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-inter text-2xl md:text-3xl text-[#F5F3F0] font-normal mb-6">
            {t('about.companyTitle')}
          </h2>
          <div className="font-inter text-sm md:text-lg text-[#F5F3F0]/80 leading-relaxed space-y-3 md:space-y-4 text-left">
            {companyParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-inter text-2xl md:text-3xl text-[#F5F3F0] font-normal mb-8 md:mb-12">
            {t('about.foundersTitle')}
          </h2>
        </div>

        <div className="space-y-4 max-w-[900px] mx-auto">
          {foundersData.map((founder, index) => {
            const translation = foundersTranslations[index];
            return (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row items-start gap-6 p-6 rounded-2xl overflow-hidden border border-[#F5F3F0]/10 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                style={{ backgroundColor: '#1a2533' }}
              >
                <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden flex-shrink-0">
                  {founder.image ? (
                    <img 
                      src={founder.image} 
                      alt={`${founder.name}, ${translation?.role}`}
                      className="w-full h-full object-cover"
                      loading="lazy" decoding="async" width={144} height={144}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-dalton-blue/30 to-dalton-purple/30 flex items-center justify-center">
                      <span className="font-inter font-bold text-3xl text-white/50">{founder.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="font-inter font-bold text-xl text-[#F5F3F0]">{founder.name}</h3>
                  <p className="font-inter font-medium text-sm text-dalton-blue">{translation?.role}</p>
                  <p className="mt-3 font-inter text-sm text-[#F5F3F0]/70 leading-relaxed">{translation?.description}</p>
                  
                  <div className="mt-4 flex items-center gap-3">
                    {founder.socials.instagram && (
                      <a href={founder.socials.instagram} className="text-[#F5F3F0]/50 hover:text-[#F5F3F0] transition-colors">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {founder.socials.linkedin && (
                      <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#F5F3F0]/50 hover:text-[#F5F3F0] transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {founder.socials.youtube && (
                      <a href={founder.socials.youtube} className="text-[#F5F3F0]/50 hover:text-[#F5F3F0] transition-colors">
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;