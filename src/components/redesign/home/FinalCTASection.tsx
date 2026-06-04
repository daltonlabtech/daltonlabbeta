import { useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import OutlierCanvas from '@/components/redesign/canvas/OutlierCanvas';
import { trackCtaClick } from '@/lib/analytics';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

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
 * Dobra 8 — CTA final. "Seja uma Organização Agêntica" + CTA (trackCtaClick) sobre
 * o OutlierCanvas (curva de sino + outlier). Porta `.final`/`.final-outlier` do original.
 * O canvas é absolute inset:0 → o container `.dl-final-outlier` é relative e tem altura mínima.
 */
export default function FinalCTASection() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="final"
      className="reveal relative overflow-hidden"
      style={{ paddingBlock: 'clamp(28px, 6vw, 100px)', background: 'transparent' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <div className="dl-final-outlier">
          {/* canvas full-bleed atrás do conteúdo */}
          <OutlierCanvas className="dl-outlier-canvas" />

          <div className="dl-final-copy">
            <span className="eyebrow" style={{ marginBottom: 16 }}>
              {t('final.tag', 'O próximo nível')}
            </span>
            <h2
              className="headline"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.04,
                fontSize: 'clamp(2rem, 8vw, 3.4rem)',
              }}
            >
              <Trans i18nKey="final.title" components={{ b: <b style={serifStrong} /> }}>
                {'Seja uma <b>Organização Agêntica</b>'}
              </Trans>
            </h2>
            <p style={{ marginTop: 14, fontSize: '.95rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
              {t('final.sub', 'Confie em quem te guia da forma correta pela transformação.')}
            </p>
            <div className="dl-final-ctas">
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick(t('final.cta1', 'Fale com um especialista'), 'final-cta', CONTACT_URL)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 9,
                  padding: '15px 26px',
                  borderRadius: 100,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  minHeight: 48,
                  background: 'var(--cyan)',
                  color: 'var(--accent-ink)',
                  transition: 'transform .3s var(--ease), box-shadow .3s var(--ease)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 34px rgba(76,184,232,0.38)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {t('final.cta1', 'Fale com um especialista')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dl-final-outlier {
          position: relative;
          display: flex;
          align-items: flex-start;
          isolation: isolate;
          min-height: 360px;
        }
        .dl-outlier-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          z-index: 0;
        }
        .dl-final-copy { position: relative; z-index: 2; max-width: 100%; }
        .dl-final-ctas {
          display: flex; flex-direction: column; gap: 12px;
          margin-top: 28px;
          align-items: stretch;
        }
        .dl-final-ctas a { width: 100%; max-width: 100%; }
        @media (min-width: 1000px) {
          .dl-final-outlier { align-items: center; justify-content: center; min-height: 460px; padding: clamp(56px, 6vw, 80px); }
          .dl-final-copy { max-width: 48rem; margin: 0 auto; text-align: center; }
          .dl-final-copy h2 { font-size: clamp(3.2rem, 4.4vw, 4.4rem); }
          .dl-final-ctas { align-items: center; justify-content: center; }
          .dl-final-ctas a { width: auto; max-width: 320px; }
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
