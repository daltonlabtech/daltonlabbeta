import { useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

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

/** Contexto de mercado — tese Service-as-a-Software + citação Sequoia. Porta o slide "Contexto de Mercado". */
export default function MarketSection() {
  const ref = useReveal<HTMLElement>();
  const { t } = useTranslation();

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
          {t('market.tag', 'Contexto de mercado')}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            maxWidth: '20ch',
            margin: '0 0 24px',
          }}
        >
          <Trans i18nKey="market.title" components={{ b: <b style={serifStrong} /> }}>
            {'Software as a Service está morrendo. <b>Service as a Software</b> está nascendo.'}
          </Trans>
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'var(--text-dim)',
            maxWidth: '60ch',
          }}
        >
          {t(
            'market.body',
            'O modelo SaaS foi construído para escalar software. O próximo ciclo escala serviço — entregue por agentes de IA que operam 24/7, aprendem com o contexto da empresa e executam com a precisão de um sistema e o julgamento de uma equipe.'
          )}
        </p>

        <figure
          style={{
            marginTop: 40,
            paddingLeft: 24,
            borderLeft: '2px solid var(--cyan-deep)',
            maxWidth: '52ch',
          }}
        >
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 3vw, 1.6rem)',
              lineHeight: 1.4,
              color: 'var(--text)',
              margin: 0,
            }}
          >
            “{t('market.quote', 'the biggest shift in how value is delivered since the cloud.')}”
          </blockquote>
          <figcaption
            style={{
              marginTop: 14,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--label)',
            }}
          >
            {t('market.quoteSource', 'Sequoia Capital, 2024')}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const serifStrong: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontStyle: 'italic',
  color: 'var(--cyan)',
  WebkitTextFillColor: 'var(--cyan)',
};
