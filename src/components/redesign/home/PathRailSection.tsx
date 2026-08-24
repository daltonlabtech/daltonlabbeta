import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ease, lerp } from '@/components/redesign/canvas/choreoScene';

/**
 * Dobra 4 — "IA por último": trilho de 3 estações (Processos → Pessoas → IA)
 * com pulso viajante. Horizontal no desktop, vertical no mobile.
 * Com prefers-reduced-motion, todas as estações ficam acesas e o pulso para na última.
 */
export default function PathRailSection() {
  const { t } = useTranslation();
  const railRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const [horizontal, setHorizontal] = useState(
    () => typeof window === 'undefined' || window.matchMedia('(min-width: 760px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 760px)');
    const onChange = () => setHorizontal(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const pulse = pulseRef.current;
    if (!rail || !pulse) return;
    const stns = Array.from(rail.querySelectorAll<HTMLElement>('.stn'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setLit = (lit: number) => stns.forEach((s, i) => s.classList.toggle('lit', i < lit));

    const POS = [16.667, 50, 83.333]; // % no trilho horizontal
    const dotYs = () => {
      const railTop = rail.getBoundingClientRect().top;
      return stns.map((s) => s.getBoundingClientRect().top - railTop + 7);
    };

    if (reduced) {
      setLit(3);
      if (horizontal) pulse.style.left = `${POS[2]}%`;
      else {
        pulse.style.left = '6px';
        pulse.style.top = `${dotYs()[2]}px`;
      }
      return;
    }

    const CY = 6000;
    const STOP = 1680;
    const RUN = 480;
    let raf = 0;
    const frame = (now: number) => {
      const m = now % CY;
      let f: number;
      let lit: number;
      if (m < STOP) {
        f = 0;
        lit = 1;
      } else if (m < STOP + RUN) {
        f = ease((m - STOP) / RUN) * 0.5;
        lit = 1;
      } else if (m < 2 * STOP + RUN) {
        f = 0.5;
        lit = 2;
      } else if (m < 2 * STOP + 2 * RUN) {
        f = 0.5 + ease((m - 2 * STOP - RUN) / RUN) * 0.5;
        lit = 2;
      } else {
        f = 1;
        lit = 3;
      }
      if (horizontal) {
        pulse.style.top = '11px';
        pulse.style.left = `${lerp(POS[0], POS[2], f)}%`;
      } else {
        const ys = dotYs();
        pulse.style.left = '6px';
        pulse.style.top = `${lerp(ys[0], ys[2], f)}px`;
      }
      setLit(lit);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [horizontal]);

  const stations = [
    { name: t('path.s1.name', 'Processos'), head: t('path.s1.head', 'Processos primeiro.') },
    { name: t('path.s2.name', 'Pessoas'), head: t('path.s2.head', 'Pessoas depois.') },
    { name: t('path.s3.name', 'IA'), head: t('path.s3.head', 'Agentes de IA por último.') },
  ];

  return (
    <section id="path" className="void-fold" style={{ position: 'relative' }}>
      <style>{`
        .void-fold { padding: 48px 22px; scroll-margin-top: 92px; }
        .void-inner { max-width: 1120px; margin: 0 auto; }
        @media (min-width: 760px) { .void-fold { padding: 56px 40px; } }
        /* Só esta dobra sobe: no desktop a coreografia termina com muito respiro
           em tela. A regra é presa ao #path — .void-fold é compartilhada com a
           dobra seguinte, que não deve se mover. */
        @media (min-width: 760px) { #path { margin-top: -10vh; padding-top: 24px; } }
        .path-rail .stn-name { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .26em; text-transform: uppercase; color: var(--ink3); transition: color .4s; }
        .path-rail .stn-head { margin-top: 8px; font-weight: 200; font-size: 17px; color: var(--ink3); transition: color .4s; }
        .path-rail .stn.lit .stn-name, .path-rail .stn.lit .stn-head { color: var(--ink); }
        .path-rail .stn::before { content: ""; position: absolute; width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--line); background: var(--void); transition: border-color .4s, box-shadow .4s; }
        .path-rail .stn.lit::before { border-color: var(--accent); box-shadow: 0 0 12px rgba(143,230,255,.5); }
        .path-pulse { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 16px rgba(143,230,255,.9); transform: translate(-50%,-50%); }
        /* vertical (mobile) */
        .path-rail { position: relative; margin-top: 28px; padding-left: 44px; }
        .path-rail .rail-line { position: absolute; left: 5px; top: 6px; bottom: 6px; width: 2px; background: var(--line-soft); }
        .path-rail .stn { position: relative; padding-bottom: 32px; }
        .path-rail .stn:last-child { padding-bottom: 0; }
        .path-rail .stn::before { left: -44px; top: 2px; }
        /* horizontal (desktop) */
        @media (min-width: 760px) {
          .path-rail { display: grid; grid-template-columns: repeat(3, 1fr); padding-left: 0; }
          .path-rail .rail-line { left: 10%; right: 10%; top: 10px; bottom: auto; width: auto; height: 2px; }
          .path-rail .stn { text-align: center; padding: 30px 4% 0; }
          .path-rail .stn::before { left: 50%; top: 6px; transform: translateX(-50%); }
          .path-rail .stn-name { font-size: 10px; letter-spacing: .4em; }
          .path-rail .stn-head { margin-top: 12px; }
        }
      `}</style>
      <div className="void-inner">
        <h2 className="h-fold na" style={{ textAlign: horizontal ? 'center' : 'left' }}>
          <Trans i18nKey="path.title" components={{ s: <s />, em: <em /> }}>
            <s>IA primeiro.</s> IA por <em>último</em>.
          </Trans>
        </h2>
        <div
          className="path-rail"
          ref={railRef}
          role="img"
          aria-label={t('path.aria', 'Trilho do processo: Processos, depois Pessoas, IA por último')}
        >
          <div className="rail-line" />
          <div className="path-pulse" ref={pulseRef} />
          {stations.map((s) => (
            <div className="stn" key={s.name}>
              <div className="stn-name">{s.name}</div>
              <div className="stn-head">{s.head}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
