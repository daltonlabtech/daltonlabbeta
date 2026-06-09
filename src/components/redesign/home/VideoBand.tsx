import { useEffect, useRef, useState } from 'react';

const YT_ID = 'Xo4xvR7v0l4';

/** Hook de scroll-reveal local (porta `.reveal`/`.in` do main.js para React). */
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
 * Dobra 3 — Vídeo institucional. Poster do YouTube; ao clicar injeta um iframe
 * youtube-nocookie via estado React (sem manipular DOM, ao contrário do main.js).
 */
export default function VideoBand() {
  const ref = useReveal<HTMLElement>();
  const [playing, setPlaying] = useState(false);

  return (
    <section
      ref={ref}
      className="reveal"
      style={{ paddingBlock: 'var(--section-y, 64px)', background: 'transparent' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: 16,
            border: '1px solid var(--border-navy)',
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(76,184,232,0.16), transparent 55%), linear-gradient(160deg, #0F2440, #0A1628)',
            aspectRatio: '16 / 10',
            cursor: playing ? 'default' : 'pointer',
          }}
          onClick={() => !playing && setPlaying(true)}
        >
          {!playing && (
            <>
              <img
                className="poster"
                src={`https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`}
                alt=""
                loading="lazy"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.src = `https://i.ytimg.com/vi/${YT_ID}/hqdefault.jpg`;
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.42,
                }}
              />
              <button
                type="button"
                aria-label="Reproduzir vídeo institucional"
                className="group"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    border: '1px solid var(--border-navy)',
                    background: 'color-mix(in oklab, var(--bg) 50%, transparent)',
                    backdropFilter: 'blur(8px)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--text)',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            </>
          )}

          {playing && (
            <iframe
              title="Dalton Lab — Vídeo institucional"
              src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, zIndex: 3 }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
