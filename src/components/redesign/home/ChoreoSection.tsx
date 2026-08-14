import { useEffect, useMemo, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';
import { createChoreoScene, seg } from '@/components/redesign/canvas/choreoScene';
import { useScrollScrub } from '@/hooks/useScrollScrub';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

/**
 * Dobras 1–3 da home: coreografia do organograma dirigida pelo scroll.
 * Container de 320vh com viewport sticky; o canvas desenha o organograma
 * que floresce agentes e termina no time de uma pessoa só. Três camadas de
 * texto (t1 hero, t2, t3) fazem fade conforme o progresso.
 */
export default function ChoreoSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const t3Ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const scene = useMemo(
    () =>
      createChoreoScene({
        areas: [
          t('choreo.areas.1', 'Diretor de RH'),
          t('choreo.areas.2', 'Marketing'),
          t('choreo.areas.3', 'VP de CS'),
          t('choreo.areas.4', 'Jurídico'),
        ],
        focusAgents: [
          t('choreo.agents.1', 'Recrutamento'),
          t('choreo.agents.2', 'Onboarding'),
          t('choreo.agents.3', 'Pulso de Cultura'),
          t('choreo.agents.4', 'Preparo de 1:1'),
        ],
      }),
    [t],
  );

  const paint = (P: number) => {
    progressRef.current = P;
    const cvs = canvasRef.current;
    if (cvs) scene.render(cvs, P);
    fade(t1Ref.current, 1 - seg(P, 0.1, 0.24));
    fade(t2Ref.current, seg(P, 0.3, 0.42) * (1 - seg(P, 0.6, 0.7)));
    fade(t3Ref.current, seg(P, 0.76, 0.88));
  };

  useScrollScrub(containerRef, paint);

  // Redesenha em resize do canvas e quando as fontes terminam de carregar
  // (as labels do canvas usam JetBrains Mono).
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const redraw = () => {
      if (scene.measure(cvs)) scene.render(cvs, progressRef.current);
    };
    redraw();
    const ro = new ResizeObserver(redraw);
    ro.observe(cvs);
    document.fonts?.ready.then(() => scene.render(cvs, progressRef.current)).catch(() => {});
    return () => ro.disconnect();
  }, [scene]);

  const na = { s: <s />, em: <em /> };

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '320vh' }}>
      <style>{`
        .choreo-layer { position: absolute; inset: 0; padding: 0 22px; display: flex; pointer-events: none; }
        .choreo-layer > div { pointer-events: auto; }
        .choreo-t1 { align-items: center; justify-content: center; }
        .choreo-t1 > div { max-width: 760px; width: 100%; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .choreo-t1 h1 { font-weight: 200; font-size: clamp(26px, 7.8vw, 31px); line-height: 1.08; letter-spacing: -0.012em; color: var(--ink); text-wrap: balance; }
        .choreo-t1 .hero-sub { margin: 12px auto 0; font-size: 15px; line-height: 1.5; color: var(--ink2); max-width: 32ch; }
        .choreo-btns { display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%; margin-top: 22px; }
        .choreo-btns .btn-p, .choreo-btns .btn-s { width: 100%; max-width: 320px; }
        .choreo-t2 { align-items: flex-end; justify-content: center; opacity: 0; }
        /* Longe do organograma: 15vh encostava na última fileira. */
        .choreo-t2 > div { text-align: center; margin-bottom: 6vh; }
        .choreo-t3 { align-items: flex-end; justify-content: center; opacity: 0; }
        .choreo-t3 > div { max-width: 100%; text-align: center; margin-bottom: 18vh; }
        .choreo-t3 .body { margin: 22px auto 0; font-size: 15px; line-height: 1.55; color: var(--ink2); max-width: 34ch; }
        @media (min-width: 760px) {
          .choreo-layer { padding: 0 40px; }
          .choreo-t1 h1 { font-size: clamp(30px, 3.4vw, 46px); line-height: 1.06; }
          .choreo-t1 .hero-sub { margin-top: 14px; font-size: 16px; max-width: 48ch; }
          .choreo-btns { flex-direction: row; justify-content: center; margin-top: 26px; width: auto; }
          .choreo-btns .btn-p, .choreo-btns .btn-s { width: auto; max-width: none; }
          .choreo-t2 > div { max-width: 1100px; margin-bottom: 9vh; } /* desktop segue como estava */
          .choreo-t3 { align-items: center; justify-content: flex-end; padding-right: 110px; }
          .choreo-t3 > div { max-width: 40%; text-align: right; margin-bottom: 0; }
          .choreo-t3 .body { margin: 14px 0 0 auto; max-width: 38ch; }
        }
      `}</style>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          aria-label={t(
            'choreo.aria',
            'Organograma hierárquico que se transforma em estrutura com agentes de IA e termina no detalhe de um time de uma pessoa só',
          )}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
        <div className="choreo-layer choreo-t1 na" ref={t1Ref}>
          <div>
            <h1>
              <Trans i18nKey="choreo.t1.h" components={na}>
                <s>Not bigger.</s> <em>Agentic.</em>
              </Trans>
            </h1>
            {/* Sem destaque: o subtítulo fica todo na mesma fonte (o par
                riscado/serifado vive só no h1 acima). */}
            <p className="hero-sub">
              {t('choreo.t1.sub', 'As empresas do futuro não serão maiores. Serão agênticas.')}
            </p>
            <div className="choreo-btns">
              <a
                className="btn-p"
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick(t('hero.cta1', 'Fale com um especialista'), 'hero', CONTACT_URL)}
              >
                {t('hero.cta1', 'Fale com um especialista')}
              </a>
              <a className="btn-s" href="#solutions">
                {t('hero.cta2', 'Explore nossa metodologia')}
              </a>
            </div>
          </div>
        </div>
        <div className="choreo-layer choreo-t2 na" ref={t2Ref}>
          <div>
            <p className="h-fold">
              <Trans i18nKey="choreo.t2" components={na}>
                Sua estrutura operacional <s>maior</s> <em>agêntica</em>
              </Trans>
            </p>
          </div>
        </div>
        <div className="choreo-layer choreo-t3 na" ref={t3Ref}>
          <div>
            <p className="h-fold">
              <Trans i18nKey="choreo.t3.h" components={na}>
                Time de <em>uma pessoa só</em>.
              </Trans>
            </p>
            <p className="body">
              {t('choreo.t3.body', 'Uma pessoa ampliada por agentes entrega o que antes exigia uma equipe.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function fade(el: HTMLElement | null, v: number) {
  if (!el) return;
  el.style.opacity = v.toFixed(3);
  el.style.transform = `translateY(${((1 - v) * 14).toFixed(1)}px)`;
  el.style.pointerEvents = v > 0.5 ? '' : 'none';
}
