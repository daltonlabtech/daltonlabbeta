import { useEffect, useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CASES } from '@/data/cases';

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
 * Dobra 7 — Casos. Carrossel de 4 cards (Jeisys com foto; SmartRisk/Unymus/Fialdini
 * com logo), drag-to-scroll + setas. "Ver todos" e cada card levam para /casos.
 * Porta `.cases`/`.case-cards`/`.ccard` do index.html do redesign.
 */
export default function CasesSection() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'pt').startsWith('en') ? 'en' : 'pt';
  const ref = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ down: false, moved: false, startX: 0, startScroll: 0, pid: -1 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = () => {
    const tr = trackRef.current;
    if (!tr) return;
    const max = tr.scrollWidth - tr.clientWidth;
    setAtStart(tr.scrollLeft <= 2);
    setAtEnd(tr.scrollLeft >= max - 2);
  };
  useEffect(() => {
    updateArrows();
  }, []);

  const scrollByCard = (dir: number) => {
    const tr = trackRef.current;
    if (!tr) return;
    const card = tr.querySelector<HTMLElement>('.ccard');
    const amount = card ? card.offsetWidth + 16 : 320;
    tr.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { down: true, moved: false, startX: e.clientX, startScroll: e.currentTarget.scrollLeft, pid: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) {
      d.moved = true;
      e.currentTarget.classList.add('dragging');
      e.currentTarget.setPointerCapture(d.pid);
    }
    if (d.moved) e.currentTarget.scrollLeft = d.startScroll - dx;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.down = false;
    e.currentTarget.classList.remove('dragging');
    updateArrows();
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section
      ref={ref}
      id="cases"
      className="reveal"
      style={{ paddingBlock: 'var(--section-y, 64px)', background: 'transparent' }}
    >
      <div
        className="mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', boxSizing: 'border-box' }}
      >
        <div className="cases-head">
          <div className="cases-head-l">
            <span className="eyebrow">{t('cases.tag', 'Casos')}</span>
            <h2
              className="headline"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                letterSpacing: '-0.035em',
                lineHeight: 1.03,
                fontSize: 'clamp(2.2rem, 8vw, 3.4rem)',
                textWrap: 'balance',
                marginTop: 16,
              }}
            >
              <Trans i18nKey="cases.title" components={{ b: <b style={serifStrong} /> }}>
                {'Quem já opera com estrutura <b>agêntica</b>'}
              </Trans>
            </h2>
          </div>
          <div className="cases-head-r">
            <Link to="/casos" className="cases-all">
              <span>{t('cases.all', 'Ver todos')}</span>
              <span aria-hidden="true">→</span>
            </Link>
            <div className="cases-controls">
              <button className="cases-arrow" onClick={() => scrollByCard(-1)} disabled={atStart} aria-label="Anterior" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              <button className="cases-arrow" onClick={() => scrollByCard(1)} disabled={atEnd} aria-label="Próximo" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="case-cards"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onScroll={updateArrows}
          onClickCapture={onClickCapture}
        >
          {CASES.map((c) => (
            <Link key={c.slug} to={`/casos/${c.slug}`} className="ccard">
              {c.photo ? (
                <div className="ccard-img">
                  <img className="ccard-photo" src={c.photo} alt={c.name} />
                </div>
              ) : (
                <div className="ccard-img ccard-img--logo">
                  <img className={`ccard-logo${c.logoSquare ? ' ccard-logo--sq' : ''}`} src={c.logo} alt={c.name} />
                </div>
              )}
              <div className="ccard-body">
                <div className="ccard-name">{c.name}</div>
                <div className="ccard-tag">{c.sector[lang]}</div>
                <div className="ccard-metric">{c.metric[lang]}</div>
                <div className="ccard-metric-sub">{c.metricSub[lang]}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .cases-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 36px; }
        .cases-head-l { display: flex; flex-direction: column; align-items: flex-start; flex: 1 1 300px; }
        .cases-head-r { display: flex; align-items: center; gap: 14px; flex: 1 1 100%; justify-content: space-between; }
        @media (min-width: 600px) { .cases-head-r { flex: none; justify-content: flex-end; margin-left: auto; } }
        .cases-all { display: inline-flex; align-items: center; gap: 8px; color: var(--cyan); font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-decoration: none; }
        .cases-all:hover { opacity: .8; }
        .cases-controls { display: flex; gap: 10px; }
        .cases-arrow { width: 40px; height: 40px; border-radius: 999px; border: 1px solid var(--border-navy); background: transparent; color: var(--text); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color .2s, opacity .2s; }
        .cases-arrow svg { width: 18px; height: 18px; }
        .cases-arrow:hover:not(:disabled) { border-color: rgba(143,230,255,0.40); }
        .cases-arrow:disabled { opacity: .35; cursor: default; }
        .case-cards { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; -ms-overflow-style: none; scrollbar-width: none; cursor: grab; padding-bottom: 4px; }
        .case-cards::-webkit-scrollbar { display: none; }
        .case-cards.dragging { cursor: grabbing; scroll-snap-type: none; user-select: none; }
        .case-cards.dragging a, .case-cards.dragging img { pointer-events: none; }
        .ccard { flex: 0 0 86%; scroll-snap-align: start; display: flex; flex-direction: column; border: 1px solid var(--border-navy); border-radius: 16px; overflow: hidden; background: var(--surface); text-decoration: none; color: inherit; transition: transform .3s var(--ease, ease), border-color .3s, box-shadow .3s; }
        .ccard:hover { transform: translateY(-3px); border-color: rgba(143,230,255,0.40); box-shadow: 0 20px 44px rgba(0,0,0,0.34); }
        .ccard-img { position: relative; height: 188px; overflow: hidden; flex: none; border-bottom: 1px solid var(--border-navy); }
        .ccard-photo { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ccard-img--logo { display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); }
        .ccard-logo { position: relative; z-index: 1; height: 34px; width: auto; max-width: 62%; object-fit: contain; filter: brightness(0) invert(1); }
        .ccard-logo--sq { height: 52px; }
        .ccard-body { padding: 22px 22px 26px; display: flex; flex-direction: column; gap: 9px; }
        .ccard-name { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; letter-spacing: -0.035em; color: var(--text); line-height: 1; }
        .ccard-tag { font-family: var(--font-mono); font-size: 10.5px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); }
        .ccard-metric { font-family: var(--font-display); font-size: clamp(1.5rem, 4.4vw, 1.95rem); font-weight: 800; letter-spacing: -0.025em; line-height: 1.08; color: var(--cyan); margin-top: 6px; }
        .ccard-metric-sub { font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); margin-top: 7px; }
        @media (min-width: 680px) { .ccard { flex: 0 0 calc((100% - 16px) / 2); } }
        @media (min-width: 1000px) { .ccard { flex: 0 0 calc((100% - 48px) / 4); } }
      `}</style>
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
