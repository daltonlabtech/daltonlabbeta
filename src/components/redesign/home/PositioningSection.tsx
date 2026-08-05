import { useEffect, useRef } from 'react';
import { Trans } from 'react-i18next';

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
 * Dobra 4 — Positioning. Frase única de valor com termos serif/cyan (<b>).
 * Porta `.positioning` do index.html original (com glow top-left).
 */
export default function PositioningSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative text-center"
      style={{ paddingBlock: 'clamp(36px, 8vw, 120px)', isolation: 'isolate' }}
    >
      {/* glow top-left (porta .glow-tl::before) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '-8%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          maxWidth: 640,
          maxHeight: 640,
          background: 'radial-gradient(circle at 30% 30%, rgba(143,230,255,0.16), transparent 62%)',
          filter: 'blur(40px)',
          zIndex: -1,
        }}
      />
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <span
          aria-hidden="true"
          className="block"
          style={{
            width: 60,
            height: 2,
            margin: '0 auto 30px',
            background: 'var(--cyan-deep)',
            borderRadius: 2,
          }}
        />
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.25rem, 4.5vw, 4.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            overflowWrap: 'break-word',
            textWrap: 'pretty',
          }}
        >
          <Trans i18nKey="pos.line" components={{ b: <b style={posStrong} /> }}>
            {'Somos a startup <b>Service-as-a-Software</b> que transforma sua operação em uma <b>Organização Agêntica</b>'}
          </Trans>
        </h2>
        <span
          aria-hidden="true"
          className="block"
          style={{
            width: 60,
            height: 2,
            margin: '26px auto 0',
            background: 'var(--cyan-deep)',
            borderRadius: 2,
          }}
        />
      </div>
    </section>
  );
}

const posStrong: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontStyle: 'italic',
  color: 'var(--cyan)',
  WebkitTextFillColor: 'var(--cyan)',
};
