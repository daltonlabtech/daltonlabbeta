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

/** Metodologia "AI Last, not AI First" — 3 princípios (processos → pessoas → ferramentas). */
export default function MethodologySection() {
  const ref = useReveal<HTMLElement>();
  const { t } = useTranslation();

  const items = ['1', '2', '3'].map((n, i) => ({
    number: String(i + 1).padStart(2, '0'),
    name: t(`ailast.${n}.name`, ''),
    desc: t(`ailast.${n}.desc`, ''),
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
          {t('ailast.tag', 'Metodologia')}
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5.5vw, 3.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            margin: '0 0 44px',
          }}
        >
          <Trans i18nKey="ailast.title" components={{ b: <b style={serifStrong} /> }}>
            {'<b>AI Last</b>, not AI First.'}
          </Trans>
        </h2>

        <div
          style={{
            display: 'grid',
            gap: 20,
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          {items.map((it) => (
            <div
              key={it.number}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius, 16px)',
                padding: '28px 24px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--cyan)',
                }}
              >
                {it.number}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  margin: '12px 0 10px',
                }}
              >
                {it.name}
              </h3>
              <p style={{ fontSize: '.95rem', lineHeight: 1.55, color: 'var(--text-dim)', margin: 0 }}>
                {it.desc}
              </p>
            </div>
          ))}
        </div>
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
