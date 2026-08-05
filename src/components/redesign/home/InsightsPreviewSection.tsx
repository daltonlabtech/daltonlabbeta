import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useArticles } from '@/hooks/useSanity';
import { L, PRESS_HIGHLIGHTS, type Bi } from '@/data/insightsContent';

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

/** Schema assumption: `useArticles` returns objects with `_id`, `title`, `slug.current`,
 *  `author`, `publishedAt`. No `category` field exists, so press/media items are hardcoded
 *  (CNN, Veja) and all Sanity items are typed as "Artigo". */
interface SanityArticle {
  _id: string;
  title: string;
  slug?: { current?: string };
  author?: string;
  publishedAt?: string;
}

interface MediaCard {
  href: string;
  img?: string;
  art?: string;
  type: string;
  date: string;
  title: Bi;
  src: string;
}

const MEDIA_CARDS: MediaCard[] = [
  ...PRESS_HIGHLIGHTS.map(
    (p): MediaCard => ({
      href: p.href,
      img: p.img,
      type: 'Mídia',
      date: 'Jun 2026',
      title: p.title,
      src: p.src,
    })
  ),
  {
    href: 'https://www.cnnbrasil.com.br/infra/ia-promete-reduzir-custos-e-acelerar-projetos-em-infraestrutura/',
    img: '/novo/assets/media/cnn-preview.png',
    type: 'Mídia',
    date: 'Mai 2026',
    title: {
      pt: 'IA promete reduzir custos e acelerar projetos em infraestrutura',
      en: 'AI promises to cut costs and accelerate infrastructure projects',
    },
    src: 'CNN Brasil',
  },
  {
    href: 'https://veja.abril.com.br/coluna/radar-economico/o-aporte-de-um-socio-do-atacadista-mundial-mix-em-uma-startup-de-ia/',
    img: '/novo/assets/media/veja-preview.webp',
    type: 'Mídia',
    date: 'Fev 2026',
    title: {
      pt: 'O aporte de um sócio do atacadista Mundial Mix em uma startup de IA',
      en: "A Mundial Mix partner's investment in an AI startup",
    },
    src: 'Veja Negócios',
  },
];

const ART_BG = ['dl-art-1', 'dl-art-2', 'dl-art-3', 'dl-art-4'];

function fmtDate(iso?: string, lang?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' });
}

/**
 * Dobra 9 — Insights preview. Carrossel de até 8 cards mesclando cards de mídia/imprensa
 * (CNN, Veja) com artigos do Sanity (useArticles, top N). Porta `.insights` do original.
 */
export default function InsightsPreviewSection() {
  const { t, i18n } = useTranslation();
  const reveal = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { data } = useArticles();

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const articles: SanityArticle[] = Array.isArray(data) ? data : [];
  const articleCards = articles.slice(0, Math.max(0, 8 - MEDIA_CARDS.length));

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth - 2;
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= max);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows, articleCards.length]);

  const step = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '16') || 16;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.85;
  };
  const scrollByDir = (dir: number) => trackRef.current?.scrollBy({ left: step() * dir, behavior: 'smooth' });

  // drag-to-scroll (porta makeDraggable do main.js)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false, pid: -1 });
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { down: true, moved: false, startX: e.clientX, startScroll: e.currentTarget.scrollLeft, pid: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 8) {
      d.moved = true;
      e.currentTarget.classList.add('dragging');
      try {
        e.currentTarget.setPointerCapture(d.pid);
      } catch {
        /* noop */
      }
    }
    if (d.moved) e.currentTarget.scrollLeft = d.startScroll - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    e.currentTarget.classList.remove('dragging');
    try {
      if (d.pid !== -1) e.currentTarget.releasePointerCapture(d.pid);
    } catch {
      /* noop */
    }
    d.pid = -1;
  };
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section
      ref={reveal}
      id="insights"
      className="reveal relative"
      style={{ paddingBlock: 'var(--section-y, 64px)', isolation: 'isolate' }}
    >
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
        {/* head */}
        <div className="flex items-center justify-between" style={{ gap: 20, marginBottom: 28 }}>
          <div className="flex flex-col items-start" style={{ gap: 12 }}>
            <span className="eyebrow">{t('ins.tag', 'Conteúdos')}</span>
            <Link
              to="/artigos"
              className="inline-flex items-center"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: 'var(--cyan)', gap: 7, whiteSpace: 'nowrap' }}
            >
              <span>{t('ins.all', 'Ver todos')}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="flex items-center" style={{ gap: 8, flex: 'none' }}>
            <ArrowBtn dir={-1} disabled={atStart} onClick={() => scrollByDir(-1)} label="Anterior" />
            <ArrowBtn dir={1} disabled={atEnd} onClick={() => scrollByDir(1)} label="Próximo" />
          </div>
        </div>

        {/* carousel */}
        <div
          ref={trackRef}
          className="dl-ins-grid"
          onScroll={() => requestAnimationFrame(updateArrows)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
        >
          {MEDIA_CARDS.map((m) => (
            <a key={m.href} className="dl-ins-card" href={m.href} target="_blank" rel="noopener noreferrer">
              {m.img ? (
                <div className="dl-i-art dl-i-art-cover">
                  <img src={m.img} alt={m.src} />
                </div>
              ) : (
                <div className={`dl-i-art ${m.art ?? 'dl-art-1'}`} />
              )}
              <Body type={m.type} date={m.date} title={L(m.title, i18n.language)} src={m.src} />
            </a>
          ))}

          {articleCards.map((a, i) => {
            const slug = a.slug?.current;
            const to = slug ? `/artigos/${slug}` : '/artigos';
            return (
              <Link key={a._id} className="dl-ins-card" to={to}>
                <div className={`dl-i-art ${ART_BG[i % ART_BG.length]}`} />
                <Body
                  type={t('ins.1.type', 'Artigo')}
                  date={fmtDate(a.publishedAt, i18n.language)}
                  title={a.title}
                  src={a.author || 'Dalton Lab'}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .dl-ins-grid {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 4px;
          cursor: grab;
        }
        .dl-ins-grid::-webkit-scrollbar { display: none; }
        .dl-ins-grid.dragging { cursor: grabbing; scroll-snap-type: none; scroll-behavior: auto; user-select: none; }
        .dl-ins-grid.dragging a, .dl-ins-grid.dragging img { pointer-events: none; }
        .dl-ins-card {
          flex: 0 0 78%;
          scroll-snap-align: start;
          display: flex; flex-direction: column;
          border: 1px solid var(--border-navy);
          border-radius: 16px;
          background: var(--surface);
          overflow: hidden;
          transition: transform .4s var(--ease), border-color .4s;
        }
        .dl-ins-card:hover { transform: translateY(-3px); border-color: rgba(143,230,255,0.38); }
        .dl-i-art { height: 128px; position: relative; flex: none; border-bottom: 1px solid var(--border-navy-2); }
        .dl-i-art-cover { background: #0b0b0b; }
        .dl-i-art-cover img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
        .dl-art-1 { background: radial-gradient(120% 140% at 0% 0%, #8fe6ff 0%, transparent 45%), radial-gradient(120% 140% at 100% 100%, #8fe6ff 0%, transparent 50%), #0A1628; }
        .dl-art-2 { background: radial-gradient(130% 130% at 100% 0%, #8fe6ff 0%, transparent 48%), radial-gradient(120% 120% at 0% 100%, #1A3A5C 0%, transparent 52%), #0A1628; }
        .dl-art-3 { background: radial-gradient(120% 130% at 20% 20%, #8fe6ff 0%, transparent 42%), radial-gradient(120% 130% at 90% 90%, #8fe6ff 0%, transparent 46%), radial-gradient(140% 140% at 60% 0%, #1A3A5C 0%, transparent 55%), #0A1628; }
        .dl-art-4 { background: radial-gradient(120% 140% at 50% 0%, #1A3A5C 0%, transparent 55%), radial-gradient(120% 120% at 100% 100%, #8fe6ff 0%, transparent 42%), #060D1A; }
        .dl-i-body { display: flex; flex-direction: column; gap: 18px; padding: 22px; flex: 1; min-height: 150px; }
        .dl-i-meta { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 10.5px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted-navy); }
        .dl-i-meta .dl-i-type { color: var(--cyan); }
        .dl-i-meta .dl-sep { width: 4px; height: 4px; border-radius: 50%; background: var(--border-navy); }
        .dl-i-title { font-family: var(--font-display); margin-top: auto; font-size: 1.16rem; font-weight: 500; letter-spacing: -0.02em; line-height: 1.2; text-wrap: pretty; }
        .dl-i-src { font-family: var(--font-mono); font-size: 11px; font-weight: 500; color: var(--text-dim); display: flex; align-items: center; gap: 7px; }
        .dl-i-src::after { content: "→"; color: var(--muted-navy); transition: transform .3s; }
        .dl-ins-card:hover .dl-i-src::after { transform: translateX(4px); }
        @media (min-width: 1000px) { .dl-ins-card { flex: 0 0 calc((100% - 48px) / 4); } }
      `}</style>
    </section>
  );
}

function Body({ type, date, title, src }: { type: string; date: string; title: string; src: string }) {
  return (
    <div className="dl-i-body">
      <div className="dl-i-meta">
        <span className="dl-i-type">{type}</span>
        {date && <span className="dl-sep" />}
        {date && <span>{date}</span>}
      </div>
      <div className="dl-i-title">{title}</div>
      <div className="dl-i-src">{src}</div>
    </div>
  );
}

function ArrowBtn({ dir, disabled, onClick, label }: { dir: number; disabled: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: 36,
        height: 36,
        border: '1px solid var(--border-navy)',
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--text)',
        background: 'rgba(26,58,92,0.20)',
        opacity: disabled ? 0.32 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        transition: 'border-color .3s, color .3s, background .3s, transform .2s var(--ease), opacity .3s',
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.borderColor = 'var(--cyan)';
        e.currentTarget.style.color = 'var(--cyan)';
        e.currentTarget.style.background = 'rgba(143,230,255,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-navy)';
        e.currentTarget.style.color = 'var(--text)';
        e.currentTarget.style.background = 'rgba(26,58,92,0.20)';
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
        {dir < 0 ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
