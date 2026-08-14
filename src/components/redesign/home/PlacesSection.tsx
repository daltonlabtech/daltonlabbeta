import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

/**
 * Cada marca tem proporção e respiro interno próprios, então a altura é
 * calibrada por logo (não uma largura fixa) para que todas tenham peso visual
 * parecido na faixa. Onde existe versão `-trim` (sem margem interna), ela é
 * usada. A Jeisys é preta na origem — só ela recebe o filtro que a torna branca.
 */
const LOGOS: Array<{ src: string; alt: string; h: number; white?: boolean }> = [
  { src: '/novo/assets/logos/accesstage.png', alt: 'Accesstage', h: 22 },
  { src: '/novo/assets/logos/billion-dollar-boy-trim.png', alt: 'Billion Dollar Boy', h: 32 },
  { src: '/novo/assets/logos/fialdini-trim.png', alt: 'Fialdini', h: 30 },
  { src: '/novo/assets/logos/jeisys-trim.png', alt: 'Jeisys', h: 26, white: true },
  { src: '/novo/assets/logos/mundial-mix.png', alt: 'Grupo Mundial Mix', h: 24 },
  { src: '/novo/assets/logos/neogrid.png', alt: 'Neogrid', h: 26 },
  { src: '/novo/assets/logos/practical-center-trim.png', alt: 'Practical Center', h: 26 },
  { src: '/novo/assets/logos/rumo.png', alt: 'Rumo', h: 24 },
  { src: '/novo/assets/logos/smartrisk-trim.png', alt: 'Smartrisk', h: 30 },
  { src: '/novo/assets/logos/vero.png', alt: 'Vero', h: 32 },
];

/**
 * Dobra 6 — "Agentic Places to Work": faixa de logos de clientes + CTA para /casos.
 * id="places" (não "cases"): /#cases redireciona para /casos na Index.
 */
export default function PlacesSection() {
  const { t } = useTranslation();

  return (
    <section id="places" className="void-fold" style={{ padding: '48px 22px', scrollMarginTop: 92 }}>
      <style>{`
        .places-title { font-weight: 200; font-size: 23px; line-height: 1.12; letter-spacing: -0.01em; color: var(--ink); text-align: center; text-wrap: balance; }
        .logo-strip { margin: 22px auto 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px 18px; justify-items: center; align-items: center; padding: 24px 18px; background: rgba(16,20,27,.45); border: 1px solid var(--line-soft); border-radius: 14px; }
        .logo-strip img { width: auto; max-width: 100%; object-fit: contain; opacity: .9; }
        .logo-strip img.white { filter: brightness(0) invert(1); }
        .places-cta { display: flex; justify-content: center; margin-top: 22px; }
        @media (min-width: 760px) {
          .places-title { font-size: clamp(24px, 2.2vw, 34px); line-height: 1.08; }
          .logo-strip { max-width: 920px; grid-template-columns: repeat(5, 1fr); gap: 30px 32px; padding: 30px 40px; border-radius: 16px; backdrop-filter: blur(8px); margin-top: 28px; }
          .places-cta { margin-top: 26px; }
        }
      `}</style>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <h2 className="places-title na">
          <Trans i18nKey="places.title" components={{ em: <em /> }}>
            <em>Agentic</em> Places to Work
          </Trans>
        </h2>
        <div className="logo-strip" aria-label={t('places.aria', 'Logos de clientes')}>
          {LOGOS.map((l) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className={l.white ? 'white' : undefined}
              style={{ height: l.h }}
              loading="lazy"
            />
          ))}
        </div>
        <div className="places-cta">
          <Link className="btn-s" to="/casos">
            {t('places.cta', 'Conheça nossos casos →')}
          </Link>
        </div>
      </div>
    </section>
  );
}
