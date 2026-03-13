import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
const heroVideoWebm = '/hero-background.webm';
const heroVideoMp4 = '/hero-background.mp4';
import { useTrackSection } from '@/hooks/useTrackSection';
import { trackCtaClick } from '@/lib/analytics';

const heroPoster = '/hero-poster.webp';

const HomeHeroSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [regionIndex, setRegionIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useTrackSection('hero');

  const regions = t('hero.regions', { returnObjects: true }) as string[];

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegionIndex((prev) => (prev + 1) % regions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [regions.length]);

  const handleCtaClick = () => {
    trackCtaClick(t('hero.cta'), 'hero', 'https://formulario.daltonlab.ai/');
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: '#101823' }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroPoster}
          alt="Dalton Lab"
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
          muted
          loop
          playsInline
          preload="none"
          poster={heroPoster}
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-60' : 'opacity-0'
          }`}
        >
          <source src={heroVideoWebm} type="video/webm" />
          <source src={heroVideoMp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center container mx-auto px-5 md:px-12 lg:px-20 pt-16 md:pt-24">
        <div className="text-center max-w-4xl">
          <div
            className={`mb-4 md:mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span
              className="inline-flex items-center gap-2 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: 'rgba(245, 243, 240, 0.5)' }}
            >
              {t('hero.poweredBy')}
              <span
                key={regionIndex}
                className="inline-block animate-fade-in font-semibold"
                style={{ color: 'rgba(245, 243, 240, 0.8)' }}
              >
                {regions[regionIndex]}
              </span>
            </span>
          </div>

          <h1
            className={`font-inter tracking-tight leading-[1.1] transition-transform duration-700 delay-100 opacity-100 ${
              isVisible ? 'translate-y-0' : 'translate-y-8'
            }`}
            style={{ color: '#F5F3F0', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            <span className="block sm:hidden text-[22px] font-bold leading-[1.15]">
              {t('hero.titleLine1')}
            </span>
            <span className="block sm:hidden text-[22px] font-bold leading-[1.15] mt-0.5">
              {t('hero.titleLine2')}
            </span>
            <span className="hidden sm:block text-4xl md:text-[52px] font-bold leading-[1.1]">
              {t('hero.titleLine1')}
            </span>
            <span className="hidden sm:block text-4xl md:text-[52px] font-bold leading-[1.1] mt-1">
              {t('hero.titleLine2')}
            </span>
          </h1>

          <div
            className={`mt-6 md:mt-10 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="https://formulario.daltonlab.ai/"
              onClick={handleCtaClick}
              className="font-medium text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center"
              style={{ backgroundColor: '#F5F3F0', color: '#000000' }}
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;