import { useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';

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

interface Capability {
  key: string;
  defaultTitle: string;
  defaultDesc: string;
}

/**
 * Capacidades por área — porta o intent dos setores do ProspectionSection original
 * (vendas, marketing, financeiro, atendimento, operações) para cards navy bg-white/5.
 */
const CAPABILITIES: Capability[] = [
  {
    key: 'vendas',
    defaultTitle: 'Vendas',
    defaultDesc: 'Qualificação de leads, follow-up automático e condução do fechamento — sua equipe foca apenas nas oportunidades quentes.',
  },
  {
    key: 'marketing',
    defaultTitle: 'Marketing',
    defaultDesc: 'Geração e nutrição de demanda com agentes que personalizam a jornada de cada lead em escala.',
  },
  {
    key: 'financeiro',
    defaultTitle: 'Financeiro',
    defaultDesc: 'Cobrança inteligente, conciliação e relatórios automáticos que reduzem inadimplência e trabalho manual.',
  },
  {
    key: 'atendimento',
    defaultTitle: 'Atendimento',
    defaultDesc: 'Suporte 24/7 com agentes que resolvem dúvidas, abrem chamados e escalam apenas o que precisa de humano.',
  },
  {
    key: 'operacoes',
    defaultTitle: 'Operações',
    defaultDesc: 'Automação de processos repetitivos e integração entre sistemas para uma operação verdadeiramente AI-first.',
  },
];

export default function ProdutoCapabilities() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="capabilities"
      className="reveal"
      style={{ paddingBlock: 'var(--section-y, 64px)', background: 'transparent' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <div style={{ marginBottom: 40 }}>
          <span className="eyebrow">{t('produto.cap.tag', 'O que automatizamos')}</span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 200,
              letterSpacing: '-0.03em',
              lineHeight: 1.06,
              fontSize: 'clamp(1.75rem, 6vw, 3.4rem)',
              marginTop: 16,
            }}
          >
            <Trans i18nKey="produto.cap.title" components={{ b: <b style={serifStrong} /> }}>
              {'Agentes para cada área da sua <b>operação comercial</b>'}
            </Trans>
          </h2>
          <span
            aria-hidden="true"
            className="block"
            style={{ width: 60, height: 2, marginTop: 22, background: 'var(--cyan-deep)', borderRadius: 2 }}
          />
        </div>

        <div className="dl-cap-grid">
          {CAPABILITIES.map((c) => (
            <article key={c.key} className="dl-cap-card">
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 200,
                  letterSpacing: '-0.03em',
                  color: 'var(--text)',
                }}
              >
                {t(`produto.cap.items.${c.key}.title`, c.defaultTitle)}
              </h3>
              <p style={{ marginTop: 12, fontSize: '.98rem', lineHeight: 1.6, color: 'var(--text-dim)' }}>
                {t(`produto.cap.items.${c.key}.desc`, c.defaultDesc)}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .dl-cap-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        .dl-cap-card {
          padding: 28px 26px;
          border: 1px solid var(--border-navy);
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          transition: transform .4s var(--ease), border-color .4s, box-shadow .4s;
        }
        .dl-cap-card:hover {
          transform: translateY(-4px);
          border-color: rgba(143,230,255,0.40);
          box-shadow: 0 16px 40px rgba(6,13,26,0.45);
        }
        @media (min-width: 720px) {
          .dl-cap-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1000px) {
          .dl-cap-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
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
