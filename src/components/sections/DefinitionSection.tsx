import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

interface StatItem {
  number: number;
  prefix: string;
  suffix: string;
  description: string;
}

const useCountUp = (target: number, isVisible: boolean, duration = 5000) => {
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
  const count = useCountUp(item.number, isVisible, 4000);

  return (
    <div
      className="text-center transition-all duration-700"
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
        <h2
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight md:leading-snug text-center mb-6 md:mb-10 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          <span className="block">{t('home.definition.titleLine1')}</span>
          <span className="block">{t('home.definition.titleLine2')}</span>
        </h2>

        <div
          className={`w-full max-w-4xl mx-auto mb-10 md:mb-16 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/Xo4xvR7v0l4"
              title="Dalton Lab - Transformação Agêntica"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-8 md:mb-12">
          {stats.map((item, index) => (
            <StatCard key={index} item={item} isVisible={isVisible} index={index} />
          ))}
        </div>

        <div
          className={`text-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(3)}
        >
          <a
            href="https://formulario.daltonlab.ai/"
            className="inline-flex items-center justify-center font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-3.5 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: '#101824', color: '#F5F3F0' }}
          >
            {t('nav.startTransformation')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default DefinitionSection;