import { useState, useEffect, useRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import heroVideoWebm from '@/assets/hero-background.webm';
import heroVideoMp4 from '@/assets/hero-background.mp4';
import { useTrackSection } from '@/hooks/useTrackSection';
import { trackCtaClick } from '@/lib/analytics';

const heroPoster = '/hero-poster.webp';

const techLogos = [
  { name: 'OpenAI', src: () => import('@/assets/tech/openai.webp') },
  { name: 'Claude', src: () => import('@/assets/tech/claude-logo.png') },
  { name: 'Manus', src: () => import('@/assets/tech/manus-logo.png') },
];

const TechLogoBadge = memo(({ currentIndex }: { currentIndex: number }) => {
  const [logos, setLogos] = useState<{ name: string; src: string }[]>([]);

  useEffect(() => {
    Promise.all(
      techLogos.map(async (logo) => ({
        name: logo.name,
        src: (await logo.src()).default,
      }))
    ).then(setLogos);
  }, []);

  if (logos.length === 0) return null;

  return (
    <div className="relative w-12 h-4 overflow-hidden">
      {logos.map((logo, index) => (
        <img
          key={logo.name}
          src={logo.src}
          alt={`Powered by ${logo.name}`}
          width={48}
          height={16}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
            index === currentIndex
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ filter: 'brightness(0)' }}
        />
      ))}
    </div>
  );
});

TechLogoBadge.displayName = 'TechLogoBadge';

const HomeHeroSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useTrackSection('hero');

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % techLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCtaClick = () => {
    trackCtaClick(t('hero.cta'), 'hero', 'https://chat.daltonlab.ai/');
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#101823' }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPoster}
          alt="Dalton Lab - Organizações Agênticas"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-0' : 'opacity-60'
          }`}
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroPoster}
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-60' : 'opacity-0'
          }`}
        >
          <source src={heroVideoWebm} type="video/webm" />
          <source src={heroVideoMp4} type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center container mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-24">
        <div className="text-center max-w-4xl">
          {/* Powered By Badge */}
          <div
            className={`inline-flex items-center gap-1.5 backdrop-blur-sm border border-zinc-700/50 rounded-full px-2.5 py-1 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ backgroundColor: 'rgba(245, 243, 240, 0.7)' }}
          >
            <span className="text-zinc-900/70 text-[10px] font-medium">{t('hero.poweredBy')}</span>
            <TechLogoBadge currentIndex={currentLogoIndex} />
          </div>

          {/* Title */}
          <h1
            className={`font-inter tracking-tight leading-[1.1] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ 
              color: '#F5F3F0',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {/* Mobile */}
            <span className="block sm:hidden text-[48px] font-normal leading-[1.1]">
              {t('hero.titleLine1')}
            </span>
            <span className="block sm:hidden text-[48px] font-normal leading-[1.1] mt-1">
              {t('hero.titleLine2Mobile')}
            </span>
            <span className="block sm:hidden text-[48px] font-normal leading-[1.1] mt-1">
              {t('hero.titleLine3Mobile')}
            </span>
            {/* Desktop */}
            <span className="hidden sm:block text-5xl md:text-[64px] font-normal leading-[1.1]">
              {t('hero.titleLine1')}
            </span>
            <span className="hidden sm:block text-5xl md:text-[64px] font-normal leading-[1.1] mt-1">
              {t('hero.titleLine2')}
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className={`mt-6 md:mt-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p
              className="text-sm md:text-base lg:text-lg font-light"
              style={{ 
                color: 'rgba(245, 243, 240, 0.75)',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              {t('hero.subtitle1')}
            </p>
          </div>

          {/* CTA */}
          <div
            className={`mt-8 md:mt-10 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="https://chat.daltonlab.ai/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className="font-medium text-sm px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#F5F3F0',
                color: '#000000',
              }}
            >
              {t('hero.cta')}
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
