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

/**
 * Dobra 7 — Casos. Case Jeisys em destaque (49 processos), foto + métrica.
 * Porta `.cases`/`.case-jeisys` do index.html original.
 * NOTA: o original usa o web component <image-slot> (ferramenta de design) — aqui
 * substituído por uma <img> simples, conforme instrução do plano (Task 9).
 */
export default function CasesSection() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="cases"
      className="reveal"
      style={{ paddingBlock: 'var(--section-y, 64px)', background: 'transparent' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <div style={{ marginBottom: 40 }}>
          <span className="eyebrow">{t('cases.tag', 'Casos')}</span>
          <h2
            className="headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              fontSize: 'clamp(1.75rem, 6vw, 3.4rem)',
              marginTop: 16,
            }}
          >
            <Trans i18nKey="cases.title" components={{ b: <b style={serifStrong} /> }}>
              {'Quem já opera com estrutura <b>agêntica</b>'}
            </Trans>
          </h2>
          <span
            aria-hidden="true"
            className="block"
            style={{ width: 60, height: 2, marginTop: 22, background: 'var(--cyan-deep)', borderRadius: 2 }}
          />
        </div>

        <article className="dl-case-jeisys">
          <div className="dl-case-photo">
            <img
              src="/novo/assets/foto-jeisys.jpg"
              alt="Jeisys"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="dl-case-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                }}
              >
                Jeisys
              </span>
              <span className="dl-case-sector">{t('cases.1.sector', 'Indústria Global')}</span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: 'var(--cyan)',
                fontSize: 'clamp(2.6rem, 13vw, 4.2rem)',
                marginTop: 4,
              }}
            >
              {t('cases.1.metric', '49 processos')}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginTop: -4,
              }}
            >
              {t('cases.1.metric.sub', 'redesenhados com IA')}
            </div>
          </div>
        </article>
      </div>

      <style>{`
        .dl-case-jeisys {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid var(--border-navy);
          border-radius: 16px;
          background: var(--surface);
          overflow: hidden;
          transition: transform .4s var(--ease), border-color .4s, box-shadow .4s;
        }
        .dl-case-jeisys:hover { border-color: rgba(76,184,232,0.40); }
        .dl-case-photo {
          position: relative;
          display: block;
          width: 100%;
          height: 220px;
        }
        .dl-case-photo::after {
          content: "";
          position: absolute; inset: 0;
          background: rgba(8,14,28,0.40);
          pointer-events: none;
          z-index: 3;
        }
        .dl-case-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 26px 24px 28px;
        }
        .dl-case-sector {
          font-family: var(--font-mono);
          font-size: 10.5px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-dim);
        }
        .dl-case-sector::before { content: "·"; color: var(--cyan); margin-right: 8px; font-weight: 700; }
        @media (min-width: 720px) {
          .dl-case-jeisys { flex-direction: row; align-items: stretch; }
          .dl-case-photo { width: 50%; height: auto; min-height: 320px; }
          .dl-case-body { width: 50%; justify-content: center; padding: 44px; }
        }
        @media (min-width: 1000px) {
          .dl-case-photo { width: 54%; }
          .dl-case-body { width: 46%; padding: 56px; }
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
