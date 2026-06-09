import { useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import AgenticOrgChart from '@/components/redesign/canvas/AgenticOrgChart';
import AgentPlatform from '@/components/redesign/home/AgentPlatform';

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
 * Dobra 5 — Organograma Agêntico. Eyebrow + título (com strike "maior" + serif "agêntica")
 * sobre o `<AgenticOrgChart/>`, que é autônomo (canvas + ticker ao vivo internos).
 * Porta `.org` do index.html original.
 */
export default function OrgChartSection() {
  const { t, i18n } = useTranslation();
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="org"
      className="reveal"
      style={{ paddingBlock: 'var(--section-y, 64px)', background: 'transparent' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <div className="text-center" style={{ marginBottom: 14 }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            {t('org.tag', 'Organograma Agêntico')}
          </span>
          <h2
            className="headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              fontSize: 'clamp(1.75rem, 6vw, 3.4rem)',
              marginTop: 18,
            }}
          >
            <Trans i18nKey="org.title" components={{ s: <span className="strike" />, b: <b style={serifStrong} /> }}>
              {'Sua estrutura operacional <s>maior</s> <b>agêntica</b>'}
            </Trans>
          </h2>
          <span
            aria-hidden="true"
            className="block"
            style={{ width: 60, height: 2, margin: '26px auto 0', background: 'var(--cyan-deep)', borderRadius: 2 }}
          />
        </div>

        {/* AgenticOrgChart é self-contained: renderiza seu próprio org-stage (aspect-ratio)
            e ticker ao vivo. Não precisa de wrapper dimensionado.
            Canvas só no desktop (≥1000px) — no mobile a Plataforma Agêntica abaixo
            substitui o organograma, espelhando o mobile.html. */}
        <div className="hidden lg:block">
          <AgenticOrgChart lang={i18n.language} />
        </div>

        {/* Plataforma Agêntica — catálogo de 17 agentes por departamento (mobile + desktop). */}
        <AgentPlatform />
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
