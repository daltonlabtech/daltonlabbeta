import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PRESS_ITEMS } from '@/data/mediaContent';

/**
 * Dobra 8 — Conteúdos: carrossel com as 6 primeiras matérias de mídia.
 * Mantém o id="insights" usado pelos links de hash; "Ver todos" → /artigos.
 */
export default function PressSection() {
  const { t, i18n } = useTranslation();
  const lang: 'pt' | 'en' = i18n.language?.startsWith('en') ? 'en' : 'pt';
  const carRef = useRef<HTMLDivElement>(null);

  const items = PRESS_ITEMS.slice(0, 6);

  const scrollBy = (dir: number) => {
    const car = carRef.current;
    const card = car?.querySelector<HTMLElement>('.press-card');
    if (!car || !card) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    car.scrollBy({ left: (card.getBoundingClientRect().width + 16) * dir, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section id="insights" style={{ padding: '0 0 48px', scrollMarginTop: 92 }}>
      <style>{`
        .press-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding: 0 22px; }
        .press-all { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .14em; color: var(--ink3); }
        .press-all:hover { color: var(--ink); }
        .press-car { display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; margin-top: 28px; scrollbar-width: none; padding: 0 22px 4px; }
        .press-car::-webkit-scrollbar { display: none; }
        .press-card { flex: 0 0 80%; scroll-snap-align: center; background: rgba(16,20,27,.55); border: 1px solid var(--line-soft); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: border-color .3s, transform .3s; }
        .press-card:hover { border-color: var(--line); transform: translateY(-3px); }
        .press-img { height: 96px; background-size: cover; background-position: center; }
        .press-body { padding: 14px 16px 18px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .press-tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: .26em; color: var(--ink3); text-transform: uppercase; }
        .press-title { font-weight: 400; font-size: 13.5px; line-height: 1.4; color: var(--ink); }
        .press-src { margin-top: auto; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .06em; color: var(--ink3); }
        .press-arrows { display: flex; gap: 20px; justify-content: flex-end; margin-top: 10px; padding: 0 22px; }
        .press-arrow { background: none; border: 0; color: var(--ink3); font: 200 24px/1 var(--font-sans); cursor: pointer; padding: 10px 12px; }
        .press-arrow:hover { color: var(--ink); }
        @media (min-width: 760px) {
          .press-wrap { max-width: 1120px; margin: 0 auto; padding: 0 40px; }
          .press-head { padding: 0; }
          .press-all { font-size: 11px; }
          .press-car { gap: 16px; margin-top: 24px; padding: 0 0 4px; }
          .press-card { flex: 0 0 calc((100% - 48px) / 4); scroll-snap-align: start; border-radius: 14px; }
          .press-img { height: 88px; }
          .press-tag { font-size: 9px; letter-spacing: .3em; }
          .press-src { font-size: 10px; letter-spacing: .08em; }
          .press-arrows { gap: 22px; margin-top: 14px; padding: 0; }
          .press-arrow { padding: 6px 10px; }
        }
      `}</style>
      <div className="press-wrap">
        <div className="press-head">
          <h2 className="h-fold">{t('press.title', 'Conteúdos')}</h2>
          <Link to="/artigos" className="press-all">
            {t('press.seeAll', 'Ver todos →')}
          </Link>
        </div>
        <div className="press-car" ref={carRef}>
          {items.map((m) => (
            <a className="press-card" key={m.id} href={m.url} target="_blank" rel="noopener noreferrer">
              <div className="press-img" style={{ backgroundImage: `url('${m.img}')` }} />
              <div className="press-body">
                <div className="press-tag">
                  {t('press.tag', 'Mídia')} • {m.data[lang]}
                </div>
                <h3 className="press-title">{m.titulo[lang]}</h3>
                <div className="press-src">{m.veiculo} →</div>
              </div>
            </a>
          ))}
        </div>
        <div className="press-arrows">
          <button className="press-arrow" type="button" aria-label={t('journey.prev', 'Card anterior')} onClick={() => scrollBy(-1)}>
            ‹
          </button>
          <button className="press-arrow" type="button" aria-label={t('journey.next', 'Próximo card')} onClick={() => scrollBy(1)}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
