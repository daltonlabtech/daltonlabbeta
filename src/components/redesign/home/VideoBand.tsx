import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { L, PRESS_HIGHLIGHTS } from '@/data/insightsContent';

const YT_ID = 'UH8qo-ZU5jI';

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
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isPt = lang === 'pt';
  const ref = useReveal<HTMLElement>();
  const [playing, setPlaying] = useState(false);

  const playLabel = isPt ? 'Reproduzir vídeo do pitch' : 'Play pitch video';
  const videoTitle = isPt
    ? 'Dalton Lab — Pitch vencedor do Web Summit Rio 2026'
    : 'Dalton Lab — Winning pitch at Web Summit Rio 2026';

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
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.08,
            fontSize: 'clamp(1.6rem, 5vw, 2.6rem)',
            textWrap: 'balance',
            textAlign: 'center',
            color: 'var(--text)',
            maxWidth: 820,
            margin: '0 auto 28px',
          }}
        >
          {isPt ? 'Dalton Lab é a ' : 'Dalton Lab is the '}
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontStyle: 'italic',
              color: 'var(--cyan)',
              WebkitTextFillColor: 'var(--cyan)',
            }}
          >
            {isPt ? 'vencedora' : 'winner'}
          </span>
          {isPt ? ' do PITCH no Web Summit Rio 2026' : ' of the PITCH at Web Summit Rio 2026'}
        </h2>

        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: 16,
            border: '1px solid var(--border-navy)',
            background:
              'radial-gradient(120% 120% at 50% 0%, rgba(143,230,255,0.16), transparent 55%), linear-gradient(160deg, #0F2440, #0A1628)',
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
                aria-label={playLabel}
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
              title={videoTitle}
              src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, zIndex: 3 }}
            />
          )}
        </div>

        <div className="press-cards">
          {PRESS_HIGHLIGHTS.map((c) => (
            <a
              key={c.href}
              className="press-card"
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="press-card-img">
                <img src={c.img} alt={c.src} loading="lazy" />
              </div>
              <div className="press-card-body">
                <span className="press-card-src">{c.src}</span>
                <span className="press-card-title">{L(c.title, lang)}</span>
                <span className="press-card-cta" aria-hidden="true">
                  {isPt ? 'Ler matéria →' : 'Read article →'}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .press-cards {
          display: flex;
          gap: 16px;
          margin-top: 28px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 4px;
        }
        .press-cards::-webkit-scrollbar { display: none; }
        .press-card {
          flex: 0 0 82%;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-navy);
          border-radius: 16px;
          background: var(--surface);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: transform .3s var(--ease, ease), border-color .3s, box-shadow .3s;
        }
        @media (min-width: 700px) { .press-card { flex: 0 0 calc((100% - 16px) / 2); } }
        @media (min-width: 1000px) { .press-card { flex: 0 0 calc((100% - 48px) / 4); } }
        .press-card:hover { transform: translateY(-3px); border-color: rgba(143,230,255,0.40); box-shadow: 0 20px 44px rgba(0,0,0,0.34); }
        .press-card-img { height: 128px; flex: none; border-bottom: 1px solid var(--border-navy-2); background: #0b0b0b; overflow: hidden; }
        .press-card-img img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .press-card-body { display: flex; flex-direction: column; gap: 12px; padding: 22px; flex: 1; }
        .press-card-src { font-family: var(--font-mono); font-size: 10.5px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cyan); }
        .press-card-title { font-family: var(--font-display); font-size: 1.05rem; font-weight: 500; letter-spacing: -0.02em; line-height: 1.25; color: var(--text); text-wrap: pretty; flex: 1; }
        .press-card-cta { font-family: var(--font-mono); font-size: 11px; font-weight: 500; color: var(--text-dim); transition: transform .3s; }
        .press-card:hover .press-card-cta { color: var(--cyan); }
      `}</style>
    </section>
  );
}
