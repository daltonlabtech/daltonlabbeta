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

/** Manifesto — citação de visão centrada, porta o slide "Manifesto" do deck. */
export default function ManifestoSection() {
  const ref = useReveal<HTMLElement>();
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      className="reveal relative text-center"
      style={{ paddingBlock: 'clamp(48px, 10vw, 140px)', isolation: 'isolate' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <span className="eyebrow" style={{ marginBottom: 28 }}>
          {t('manifesto.tag', 'Manifesto')}
        </span>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 5vw, 3.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.14,
            maxWidth: '18ch',
            margin: '0 auto',
            textWrap: 'balance',
          }}
        >
          <Trans i18nKey="manifesto.quote" components={{ b: <b style={serifStrong} /> }}>
            {'Em 5 anos toda empresa será <b>agêntica</b>. Algumas decidirão antes.'}
          </Trans>
        </p>
        <span
          style={{
            display: 'block',
            marginTop: 28,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--muted-navy, #5d7da3)',
          }}
        >
          {t('manifesto.source', 'Dalton Lab, 2026')}
        </span>
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
