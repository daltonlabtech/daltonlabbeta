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
  const count = useCountUp(item.number, isVisible);

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
        {/* Title */}
        <h2
          className={`font-inter font-bold text-xl md:text-4xl lg:text-[48px] leading-tight text-center mb-6 md:mb-10 ${revealClasses(isVisible)}`}
          style={{ color: '#101824' }}
        >
          <span className="block mb-2 md:mb-4">{t('home.definition.titleLine1')}</span>
          <span className="block">{t('home.definition.titleLine2')}</span>
        </h2>

        {/* Text content replacing video */}
        <div
          className={`w-full max-w-4xl mx-auto mb-10 md:mb-16 space-y-4 md:space-y-6 text-left ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          <p
            className="text-sm md:text-base lg:text-lg leading-relaxed"
            style={{ color: 'rgba(16, 24, 35, 0.75)' }}
          >
            Empresas no mundo inteiro investiram bilhões em IA. A maioria não viu retorno. O motivo é simples: tentaram substituir pessoas, jogaram tecnologia em cima de processos desorganizados e esperaram resultados automáticos. Mas os que tiveram resultado fizeram diferente.
          </p>
          <p
            className="text-sm md:text-base lg:text-lg leading-relaxed"
            style={{ color: 'rgba(16, 24, 35, 0.75)' }}
          >
            No Dalton Lab, identificamos o processo certo, colocamos IA para trabalhar nele, e liberamos as pessoas para fazer o que só gente faz: estratégia, relacionamento, decisão. Atuamos no tripé completo: IA, processos e pessoas.
          </p>
          <p
            className="text-sm md:text-base lg:text-lg leading-relaxed"
            style={{ color: 'rgba(16, 24, 35, 0.75)' }}
          >
            Construímos organizações agênticas onde humanos fazem trabalho humano e agentes fazem trabalho operacional. Operações mais eficientes, times em alta performance e ROI concreto.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {stats.map((item, index) => (
            <StatCard key={index} item={item} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DefinitionSection;
