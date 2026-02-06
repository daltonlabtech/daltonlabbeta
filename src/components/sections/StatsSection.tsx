import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

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
      // Ease-out cubic
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
      className="text-center transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 200}ms`,
      }}
    >
      <p
        className="font-inter leading-none mb-4"
        style={{ fontSize: '80px', fontWeight: 800, color: '#101824' }}
      >
        {item.prefix}{count}{item.suffix}
      </p>
      <p
        className="text-base md:text-lg font-medium"
        style={{ color: 'rgba(16, 24, 35, 0.6)' }}
      >
        {item.description}
      </p>
    </div>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [handleIntersection]);

  const stats = t('home.stats.items', { returnObjects: true }) as StatItem[];

  return (
    <section
      ref={ref}
      className="py-[60px] md:py-[100px]"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((item, index) => (
            <StatCard key={index} item={item} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
