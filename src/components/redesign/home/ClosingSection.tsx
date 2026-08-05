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

/** Fecho — frase final de impacto, porta o slide de encerramento do deck. */
export default function ClosingSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative text-center"
      style={{ paddingBlock: 'clamp(56px, 11vw, 160px)', isolation: 'isolate' }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '40vw',
          maxWidth: 720,
          maxHeight: 420,
          background: 'radial-gradient(circle at 50% 50%, rgba(143,230,255,0.12), transparent 65%)',
          filter: 'blur(50px)',
          zIndex: -1,
        }}
      />
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 5.5vw, 3.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            maxWidth: '16ch',
            margin: '0 auto',
            textWrap: 'balance',
          }}
        >
          <Trans i18nKey="closing.quote" components={{ b: <b style={serifStrong} /> }}>
            {'Organização Agêntica não é destino. <b>É decisão.</b>'}
          </Trans>
        </p>
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
