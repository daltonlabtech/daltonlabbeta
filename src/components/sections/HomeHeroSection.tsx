import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
// Videos served from /public to avoid bundler processing
const heroVideoWebm = '/hero-background.webm';
const heroVideoMp4 = '/hero-background.mp4';
import { useTrackSection } from '@/hooks/useTrackSection';
import { trackCtaClick } from '@/lib/analytics';

const heroPoster = '/hero-poster.webp';

const HomeHeroSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useTrackSection('hero');

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    // Delay video play to avoid blocking LCP
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 1500);
    return () => clearTimeout(timer);
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
        {/* Dark overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center container mx-auto px-5 md:px-12 lg:px-20 pt-16 md:pt-24">
        <div className="text-center max-w-4xl">
          {/* Title */}
          <h1
            className={`font-inter tracking-tight leading-[1.1] transition-transform duration-700 delay-100 opacity-100 ${
              isVisible ? 'translate-y-0' : 'translate-y-8'
            }`}
            style={{ 
              color: '#F5F3F0',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {/* Mobile */}
            <span className="block sm:hidden text-[28px] font-normal leading-[1.15]">
              {t('hero.titleLine1')}
            </span>
            <span className="block sm:hidden text-[28px] font-normal leading-[1.15] mt-0.5">
              {t('hero.titleLine2Mobile')}
            </span>
            <span className="block sm:hidden text-[28px] font-normal leading-[1.15] mt-0.5">
              {t('hero.titleLine3Mobile')}
            </span>
            {/* Desktop */}
            <span className="hidden sm:block text-4xl md:text-[52px] font-normal leading-[1.1]">
              {t('hero.titleLine1')}
            </span>
            <span className="hidden sm:block text-4xl md:text-[52px] font-normal leading-[1.1] mt-1">
              {t('hero.titleLine2')}
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className={`mt-4 md:mt-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p
              className="text-xs md:text-base lg:text-lg font-light"
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
            className={`mt-6 md:mt-10 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="https://chat.daltonlab.ai/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className="font-medium text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center"
              style={{
                backgroundColor: '#F5F3F0',
                color: '#000000',
              }}
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
