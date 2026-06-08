import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
    return () => io.disconnect();
  }, []);
  return ref;
}

/**
 * Propriedade intelectual — Dalton Lab OS (4 pilares) + Dalton Compass.
 * Porta os slides de PI/Governança do deck.
 */
export default function PlatformSection() {
  const ref = useReveal<HTMLElement>();
  const { t } = useTranslation();

  const pillars = ['1', '2', '3', '4'].map((n) => ({
    name: t(`os.${n}.name`, ''),
    desc: t(`os.${n}.desc`, ''),
  }));

  return (
    <section
      ref={ref}
      className="reveal relative"
      style={{ paddingBlock: 'clamp(40px, 9vw, 120px)', isolation: 'isolate' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <span className="eyebrow" style={{ marginBottom: 24 }}>
          {t('os.tag', 'Propriedade intelectual')}
        </span>

        {/* Dalton Lab OS */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            margin: '0 0 12px',
          }}
        >
          {t('os.title', 'Dalton Lab OS')}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.6vw, 1.4rem)',
            color: 'var(--cyan)',
            margin: '0 0 16px',
          }}
        >
          {t('os.sub', 'O sistema operacional da transformação agêntica.')}
        </p>
        <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: '62ch', margin: 0 }}>
          {t(
            'os.body',
            'Infraestrutura proprietária que orquestra agentes, processos e pessoas dentro da operação do cliente. Não é um software genérico — é construído sobre a metodologia da Dalton Lab.'
          )}
        </p>

        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            marginTop: 32,
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius, 16px)',
                padding: '24px 22px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  margin: '0 0 8px',
                }}
              >
                {p.name}
              </h3>
              <p style={{ fontSize: '.9rem', lineHeight: 1.5, color: 'var(--text-dim)', margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dalton Compass */}
        <div
          style={{
            marginTop: 28,
            background: 'var(--surface-2, var(--surface))',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius, 16px)',
            padding: 'clamp(24px, 4vw, 40px)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 10px',
            }}
          >
            {t('compass.title', 'Dalton Compass')}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)',
              color: 'var(--cyan)',
              margin: '0 0 14px',
            }}
          >
            {t('compass.sub', 'O instrumento que mapeia onde a IA pode operar na sua empresa.')}
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-dim)', maxWidth: '62ch', margin: 0 }}>
            {t(
              'compass.body',
              'Framework de diagnóstico de maturidade agêntica. Identifica processos prontos para agentes, lacunas de adoção e prioridades de implementação.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
