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

/** 6 logos do grid "Alguns de nossos clientes". Alturas por marca portadas do CSS original. */
const CLIENTS: { src: string; alt: string; h: number; hLg: number }[] = [
  { src: 'rumo.png', alt: 'Rumo', h: 34, hLg: 52 },
  { src: 'mundial-mix.png', alt: 'Grupo Mundial Mix', h: 34, hLg: 52 },
  { src: 'imperatriz.png', alt: 'Supermercados Imperatriz', h: 34, hLg: 52 },
  { src: 'neogrid.png', alt: 'Neogrid', h: 34, hLg: 65 },
  { src: 'accesstage.png', alt: 'Accesstage', h: 26, hLg: 48 },
  { src: 'jeisys.png', alt: 'Jeisys', h: 30, hLg: 55 },
];

/**
 * Dobra 4B — Clientes. Grid de 6 logos (2 col mobile, 3 col desktop), monocromáticos.
 * Porta `.clients` do index.html original.
 */
export default function ClientsSection() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal text-center" style={{ paddingBlock: 'clamp(48px, 8vw, 80px)' }}>
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <h2
          className="flex items-center justify-center"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--cyan)',
            marginBottom: 40,
            gap: 8,
          }}
        >
          <span
            aria-hidden="true"
            style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', flex: 'none' }}
          />
          {t('clients.title', 'Alguns de nossos clientes')}
        </h2>

        <div className="dl-clients-grid">
          {CLIENTS.map((c) => (
            <div key={c.alt} className="flex w-full items-center justify-center" style={{ padding: 8 }}>
              <img
                src={`/novo/assets/logos/${c.src}`}
                alt={c.alt}
                className="dl-client-logo"
                style={
                  {
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.72,
                    transition: 'opacity .3s',
                    '--h': `${c.h}px`,
                    '--h-lg': `${c.hLg}px`,
                  } as React.CSSProperties
                }
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dl-clients-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 26px 24px;
          align-items: center;
          justify-items: center;
          max-width: 340px;
          margin: 0 auto;
        }
        .dl-client-logo { height: var(--h); }
        .dl-client-logo:hover { opacity: 1 !important; }
        @media (min-width: 1000px) {
          .dl-clients-grid {
            grid-template-columns: repeat(3, 1fr);
            width: min(980px, calc(100vw - 64px));
            max-width: none;
            margin-left: 50%;
            transform: translateX(-50%);
            gap: 65px 40px;
          }
          .dl-client-logo { height: var(--h-lg); }
        }
      `}</style>
    </section>
  );
}
