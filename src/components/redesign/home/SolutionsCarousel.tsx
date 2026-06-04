import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import SolutionCanvas, { type SolutionVariant } from '@/components/redesign/canvas/SolutionCanvas';

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

interface SolCard {
  variant: SolutionVariant;
  num: string;
  nameKey: string;
  nameDefault: string;
  descKey: string;
  descDefault: string;
}

const CARDS: SolCard[] = [
  {
    variant: 'immersion',
    num: '01',
    nameKey: 'sol.1.name',
    nameDefault: 'Imersão Agêntica',
    descKey: 'sol.1.desc',
    descDefault: 'Visão executiva de onde a IA gera valor. Mapeamento de oportunidades e roteiro de implementação para o seu negócio.',
  },
  {
    variant: 'sprint',
    num: '02',
    nameKey: 'sol.2.name',
    nameDefault: 'Sprint Agêntico',
    descKey: 'sol.2.desc',
    descDefault: 'Agentes de IA desenvolvidos para gerar vantagem competitiva e reduzir custos operacionais com segurança.',
  },
  {
    variant: 'operation',
    num: '03',
    nameKey: 'sol.3.name',
    nameDefault: 'Operação Agêntica',
    descKey: 'sol.3.desc',
    descDefault: 'Arquitetura, governança e expansão para escalar IA em toda a empresa com autonomia.',
  },
  {
    variant: 'culture',
    num: '04',
    nameKey: 'sol.4.name',
    nameDefault: 'Cultura Agêntica',
    descKey: 'sol.4.desc',
    descDefault: 'Capacitação e treinamento que transformam IA em valor real e duradouro para a organização.',
  },
];

/**
 * Dobra 6 — Metodologia. Carrossel horizontal de 4 cards, cada um com SolutionCanvas.
 * Porta a lógica de `initCarousel` + `makeDraggable` do main.js para handlers React:
 *  - setas avançam por largura de card; ficam disabled nos limites
 *  - drag-to-scroll só com mouse; click suprimido após arrastar > 8px
 */
export default function SolutionsCarousel() {
  const { t } = useTranslation();
  const reveal = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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
  }, [updateArrows]);

  const step = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '20') || 20;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.85;
  };

  const scrollByDir = (dir: number) => {
    trackRef.current?.scrollBy({ left: step() * dir, behavior: 'smooth' });
  };

  // ---- drag-to-scroll (porta makeDraggable do main.js) ----
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false, pid: -1 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return; // touch usa scroll nativo
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
  // suprime o click que segue um drag real (captura)
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
      id="solutions"
      className="reveal relative"
      style={{ paddingBlock: 'var(--section-y, 64px)', isolation: 'isolate' }}
    >
      {/* glow top-left */}
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
          background: 'radial-gradient(circle at 30% 30%, rgba(76,184,232,0.16), transparent 62%)',
          filter: 'blur(40px)',
          zIndex: -1,
        }}
      />
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        {/* head: título + setas */}
        <div className="flex items-end justify-between" style={{ gap: 24 }}>
          <div>
            <span className="eyebrow">{t('sol.tag', 'Nossa Metodologia')}</span>
            <h2
              className="headline"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.04,
                fontSize: 'clamp(1.75rem, 6vw, 3.4rem)',
                marginTop: 16,
              }}
            >
              <Trans i18nKey="sol.title" components={{ b: <b style={serifStrong} /> }}>
                {'A jornada <b>agêntica</b>'}
              </Trans>
            </h2>
            <span
              aria-hidden="true"
              className="block"
              style={{ width: 60, height: 2, marginTop: 22, background: 'var(--cyan-deep)', borderRadius: 2 }}
            />
          </div>
          <div className="flex" style={{ gap: 10, flex: 'none' }}>
            <ArrowBtn dir={-1} disabled={atStart} onClick={() => scrollByDir(-1)} label="Anterior" />
            <ArrowBtn dir={1} disabled={atEnd} onClick={() => scrollByDir(1)} label="Próximo" />
          </div>
        </div>

        {/* carousel */}
        <div style={{ marginTop: 40 }}>
          <div
            ref={trackRef}
            className="dl-sol-track"
            onScroll={() => requestAnimationFrame(updateArrows)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            onDragStart={(e) => e.preventDefault()}
          >
            {CARDS.map((c) => (
              <article key={c.variant} className="dl-sol-card">
                <div className="dl-sol-viz">
                  <SolutionCanvas variant={c.variant} className="absolute inset-0" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '24px 24px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: 'var(--cyan)',
                      }}
                    >
                      {c.num}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.35rem, 4vw, 1.7rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.08,
                    }}
                  >
                    {t(c.nameKey, c.nameDefault)}
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '1rem', textWrap: 'pretty' }}>
                    {t(c.descKey, c.descDefault)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dl-sol-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding-bottom: 6px;
          cursor: grab;
        }
        .dl-sol-track::-webkit-scrollbar { display: none; }
        .dl-sol-track.dragging {
          cursor: grabbing;
          scroll-snap-type: none;
          scroll-behavior: auto;
          user-select: none;
        }
        .dl-sol-track.dragging a, .dl-sol-track.dragging img, .dl-sol-track.dragging canvas { pointer-events: none; }
        .dl-sol-card {
          flex: 0 0 78%;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-navy);
          border-radius: 16px;
          background: var(--surface);
          overflow: hidden;
          transition: border-color .4s var(--ease), transform .4s var(--ease), box-shadow .4s;
        }
        .dl-sol-card:hover { border-color: rgba(76,184,232,0.40); transform: translateY(-3px); box-shadow: 0 22px 46px rgba(0,0,0,0.34); }
        .dl-sol-viz {
          position: relative;
          height: 130px;
          border-bottom: 1px solid var(--border-navy-2);
          background: radial-gradient(120% 120% at 50% 0%, rgba(76,184,232,0.08), transparent 60%), #0A1628;
          overflow: hidden;
        }
        @media (min-width: 720px) { .dl-sol-card { flex-basis: calc((100% - 20px) / 2); } }
        @media (min-width: 1000px) {
          .dl-sol-card { flex-basis: calc((100% - 40px) / 3); }
          .dl-sol-viz { height: 200px; }
        }
      `}</style>
    </section>
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
        e.currentTarget.style.background = 'rgba(76,184,232,0.08)';
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

const serifStrong: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontStyle: 'italic',
  color: 'var(--cyan)',
  WebkitTextFillColor: 'var(--cyan)',
};
