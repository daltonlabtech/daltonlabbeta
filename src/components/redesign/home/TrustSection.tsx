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
 * Trust / Segurança — credibilidade enterprise antes dos Casos (espelha a ordem
 * do `mobile.html` da Isabel: setores → trust → casos). Métricas de segurança +
 * faixa de resultados agregados (aprovadas). Paleta azul/ciano.
 */
export default function TrustSection() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();

  const security = [
    { v: '256-bit', k: 'trust.sec.crypto', d: 'Criptografia End-to-End' },
    { v: '100%', k: 'trust.sec.lgpd', d: 'Conformidade LGPD' },
    { v: '99.9%', k: 'trust.sec.uptime', d: 'Uptime Garantido' },
  ];

  const results = [
    { v: '63+', k: 'trust.res.companies', d: 'empresas' },
    { v: 'R$ 48M', k: 'trust.res.saved', d: 'economizados' },
    { v: '4.2x', k: 'trust.res.roi', d: 'ROI médio' },
  ];

  return (
    <section
      ref={ref}
      id="trust"
      className="reveal relative"
      style={{ paddingBlock: 'var(--section-y, 64px)', isolation: 'isolate' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <div className="text-center" style={{ marginBottom: 40 }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            {t('trust.tag', 'Plataforma')}
          </span>
          <h2
            className="headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              fontSize: 'clamp(1.6rem, 5.2vw, 3rem)',
              marginTop: 18,
            }}
          >
            {t('trust.title', 'Segurança enterprise, resultados auditáveis')}
          </h2>
          <p
            style={{
              maxWidth: '60ch',
              margin: '16px auto 0',
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'var(--text-dim)',
            }}
          >
            {t('trust.sub', 'Conformidade total com LGPD e padrões globais de privacidade — cada decisão rastreável.')}
          </p>
        </div>

        <div className="dl-trust-grid">
          {security.map((s) => (
            <div key={s.v} className="dl-trust-card">
              <div className="dl-trust-v">{s.v}</div>
              <div className="dl-trust-l">{t(s.k, s.d)}</div>
            </div>
          ))}
        </div>

        <div className="dl-trust-results">
          {results.map((r) => (
            <div key={r.v} className="dl-trust-result">
              <span className="dl-trust-result-v">{r.v}</span>
              <span className="dl-trust-result-l">{t(r.k, r.d)}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dl-trust-grid { display: grid; grid-template-columns: 1fr; gap: 14px; max-width: 760px; margin: 0 auto; }
        @media (min-width: 720px) { .dl-trust-grid { grid-template-columns: repeat(3, 1fr); } }
        .dl-trust-card { text-align: center; padding: 28px 20px; border: 1px solid var(--border); border-radius: var(--radius, 16px); background: var(--surface); }
        .dl-trust-v { font-family: var(--font-display); font-size: clamp(1.6rem, 5vw, 2rem); font-weight: 800; letter-spacing: -0.04em; color: var(--text); }
        .dl-trust-l { font-size: 13px; font-weight: 600; color: var(--text-dim); margin-top: 6px; }
        .dl-trust-results {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 14px 40px;
          max-width: 760px; margin: 36px auto 0; padding-top: 30px;
          border-top: 1px solid var(--border);
        }
        .dl-trust-result { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .dl-trust-result-v { font-family: var(--font-display); font-size: clamp(1.5rem, 5vw, 1.9rem); font-weight: 800; letter-spacing: -0.03em; color: var(--cyan); }
        .dl-trust-result-l { font-size: 11px; color: var(--text-dim); }
      `}</style>
    </section>
  );
}
