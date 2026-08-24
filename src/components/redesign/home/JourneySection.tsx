import { useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { drawJourneyArt, type JourneyArtVariant } from '@/components/redesign/canvas/journeyArts';

/**
 * Dobra 5 — "A jornada agêntica": carrossel de 4 cards (Imersão, Sprint,
 * Operação, Cultura), cada um com uma arte estática em canvas.
 * Mantém o id="solutions" usado pela nav e pelos links de hash.
 */
export default function JourneySection() {
  const { t } = useTranslation();
  const carRef = useRef<HTMLDivElement>(null);

  const cards: Array<{ num: string; variant: JourneyArtVariant; name: string; desc: string; aria: string }> = [
    {
      num: '01',
      variant: 1,
      name: t('sol.1.name', 'Imersão Agêntica'),
      desc: t('sol.1.desc', 'Mapeamos onde a IA gera valor e o roteiro de implementação para o seu negócio.'),
      aria: t('journey.aria.1', 'Nuvem difusa de pontos, um deles aceso'),
    },
    {
      num: '02',
      variant: 2,
      name: t('sol.2.name', 'Sprint Agêntico'),
      desc: t('sol.2.desc', 'Desenvolvemos e implementamos agentes de IA para gerar vantagem competitiva e reduzir custos.'),
      aria: t('journey.aria.2', 'Grade de pontos com as primeiras colunas acesas'),
    },
    {
      num: '03',
      variant: 3,
      name: t('sol.3.name', 'Operação Agêntica'),
      desc: t('sol.3.desc', 'Escalamos IA em toda a empresa com arquitetura, governança e autonomia.'),
      aria: t('journey.aria.3', 'Medidor em arco com percentual'),
    },
    {
      num: '04',
      variant: 4,
      name: t('sol.4.name', 'Cultura Agêntica'),
      desc: t('sol.4.desc', 'Treinamos seu time para usar IA com autonomia e ganhar produtividade.'),
      aria: t('journey.aria.4', 'Nó central com satélites em anel ligados por linhas finas'),
    },
  ];

  const scrollBy = (dir: number) => {
    const car = carRef.current;
    const card = car?.querySelector<HTMLElement>('.j-card');
    if (!car || !card) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    car.scrollBy({ left: (card.getBoundingClientRect().width + 16) * dir, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section id="solutions" className="void-fold" style={{ padding: '48px 0', scrollMarginTop: 92 }}>
      <style>{`
        .j-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; padding: 0 22px; }
        .j-car { display: flex; gap: 14px; overflow-x: auto; scroll-snap-type: x mandatory; margin-top: 28px; scrollbar-width: none; padding: 0 22px 4px; }
        .j-car::-webkit-scrollbar { display: none; }
        .j-card { flex: 0 0 80%; scroll-snap-align: center; background: rgba(16,20,27,.55); border: 1px solid var(--line-soft); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: border-color .3s, transform .3s; }
        .j-card:hover { border-color: var(--line); transform: translateY(-3px); }
        .j-art { width: 100%; height: 96px; display: block; }
        .j-body { padding: 15px 17px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
        .j-num { font-family: var(--font-mono); font-size: 10px; letter-spacing: .26em; color: var(--ink3); }
        .j-title { font-weight: 200; font-size: 15.5px; color: var(--ink); }
        .j-desc { font-size: 13px; line-height: 1.5; color: var(--ink2); }
        .j-arrows { display: flex; gap: 20px; justify-content: flex-end; margin-top: 10px; padding: 0 22px; }
        .j-arrow { background: none; border: 0; color: var(--ink3); font: 200 24px/1 var(--font-sans); cursor: pointer; padding: 10px 12px; }
        .j-arrow:hover { color: var(--ink); }
        @media (min-width: 760px) {
          .j-head { padding: 0; }
          .j-car { gap: 16px; margin-top: 24px; padding: 0 0 4px; }
          .j-card { flex: 0 0 calc((100% - 48px) / 4); scroll-snap-align: start; border-radius: 14px; }
          .j-art { height: 80px; }
          .j-body { padding: 14px 16px 18px; gap: 7px; }
          .j-num { font-size: 10px; letter-spacing: .3em; }
          .j-desc { font-size: 12.5px; }
          .j-arrows { gap: 22px; margin-top: 14px; padding: 0; }
          .j-arrow { padding: 6px 10px; }
          .j-wrap { max-width: 1120px; margin: 0 auto; padding: 0 40px; }
        }
      `}</style>
      <div className="j-wrap">
        <div className="j-head">
          <h2 className="h-fold na">
            <Trans i18nKey="journey.title" components={{ em: <em /> }}>
              A jornada <em>agêntica</em>
            </Trans>
          </h2>
        </div>
        <div className="j-car" ref={carRef}>
          {cards.map((c) => (
            <article className="j-card" key={c.num}>
              <JourneyArt variant={c.variant} ariaLabel={c.aria} />
              <div className="j-body">
                <div className="j-num">{c.num}</div>
                <h3 className="j-title">{c.name}</h3>
                <p className="j-desc">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="j-arrows">
          <button className="j-arrow" type="button" aria-label={t('journey.prev', 'Card anterior')} onClick={() => scrollBy(-1)}>
            ‹
          </button>
          <button className="j-arrow" type="button" aria-label={t('journey.next', 'Próximo card')} onClick={() => scrollBy(1)}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function JourneyArt({ variant, ariaLabel }: { variant: JourneyArtVariant; ariaLabel: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    const redraw = () => drawJourneyArt(cvs, variant);
    redraw();
    const ro = new ResizeObserver(redraw);
    ro.observe(cvs);
    // O medidor "72" usa Manrope 200 — redesenha quando as fontes carregarem.
    document.fonts?.ready.then(redraw).catch(() => {});
    return () => ro.disconnect();
  }, [variant]);

  return <canvas ref={ref} className="j-art" aria-label={ariaLabel} />;
}
