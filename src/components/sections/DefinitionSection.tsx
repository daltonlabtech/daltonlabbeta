import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

interface StatItem {
  number: number;
  prefix: string;
  suffix: string;
  description: string;
}

const useCountUp = (target: number, isVisible: boolean, duration = 1500) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return count;
};

const StatCard = ({ item, isVisible, index }: { item: StatItem; isVisible: boolean; index: number }) => {
  const count = useCountUp(item.number, isVisible);

  return (
    <div
      className="text-left transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${(index + 2) * 200}ms`,
      }}
    >
      <p
        className="font-inter leading-none mb-1 md:mb-2 text-[40px] md:text-[64px]"
        style={{ fontWeight: 800, color: '#101824' }}
      >
        {item.prefix}{count}{item.suffix}
      </p>
      <p
        className="text-xs md:text-base font-medium"
        style={{ color: 'rgba(16, 24, 35, 0.6)' }}
      >
        {item.description}
      </p>
    </div>
  );
};

const DefinitionSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const stats = t('home.stats.items', { returnObjects: true }) as StatItem[];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-10 md:py-[100px]"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        {/* Title */}
        <h2
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight text-center mb-6 md:mb-16 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          {t('home.definition.title')}
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
          {/* Left: Text */}
          <div className={`space-y-4 md:space-y-6 ${revealClasses(isVisible)}`} style={getStaggerDelay(1)}>
            <p
              className="text-sm md:text-lg leading-relaxed text-justify"
              style={{ color: 'rgba(16, 24, 35, 0.7)' }}
            >
              {t('home.definition.paragraph1')}
            </p>
            <p
              className="text-sm md:text-lg leading-relaxed text-justify"
              style={{ color: 'rgba(16, 24, 35, 0.7)' }}
            >
              {t('home.definition.paragraph2')}
            </p>
            <p
              className="text-sm md:text-lg leading-relaxed text-justify"
              style={{ color: 'rgba(16, 24, 35, 0.7)' }}
            >
              {t('home.definition.paragraph3')}
            </p>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col gap-8 lg:gap-10 lg:pl-8">
            {stats.map((item, index) => (
              <StatCard key={index} item={item} isVisible={isVisible} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefinitionSection;
