import { useEffect, useRef, useState } from 'react';
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

const SECTORS = [
  'Manufatura', 'Financeiro', 'Saúde', 'Varejo', 'Agronegócio', 'Logística',
  'Tecnologia', 'Energia', 'Educação', 'Governo', 'Mineração', 'Seguros', 'Telecomunicações',
];

/**
 * Setores — atuação da Dalton Lab nos principais setores. Título com setor em
 * destaque rotativo (respeita prefers-reduced-motion) + grade de setores.
 * Conteúdo portado do `mobile.html` (Isabel), na paleta azul/ciano.
 */
export default function SetoresSection() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % SECTORS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      id="setores"
      className="reveal relative"
      style={{ paddingBlock: 'var(--section-y, 64px)', isolation: 'isolate' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <div className="text-center" style={{ marginBottom: 40 }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            {t('setores.tag', 'Setores')}
          </span>
          <h2
            className="headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              fontSize: 'clamp(1.75rem, 6vw, 3.4rem)',
              marginTop: 18,
            }}
          >
            {t('setores.title', 'Atuação nos principais setores da')}{' '}
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontWeight: 500,
                color: 'var(--cyan)',
                WebkitTextFillColor: 'var(--cyan)',
              }}
            >
              {SECTORS[idx]}
            </span>
          </h2>
        </div>

        <div className="dl-setores-grid">
          {SECTORS.map((s, i) => (
            <span key={s} className={`dl-setor${i === idx ? ' is-active' : ''}`}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .dl-setores-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .dl-setor {
          padding: 11px 18px; border-radius: 999px; font-size: 14px; font-weight: 600;
          border: 1px solid var(--border); background: var(--surface); color: var(--text-dim);
          transition: border-color .3s, color .3s, background .3s;
        }
        .dl-setor.is-active { border-color: var(--cyan); color: var(--cyan); background: rgba(76,184,232,0.08); }
      `}</style>
    </section>
  );
}
