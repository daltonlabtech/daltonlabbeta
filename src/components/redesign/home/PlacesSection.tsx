import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

const LOGOS: Array<{ src: string; alt: string; w: number }> = [
  { src: '/novo/assets/logos/accesstage.png', alt: 'Accesstage', w: 108 },
  { src: '/novo/assets/logos/billion-dollar-boy.png', alt: 'Billion Dollar Boy', w: 41 },
  { src: '/novo/assets/logos/fialdini.png', alt: 'Fialdini', w: 38 },
  { src: '/novo/assets/logos/jeisys.png', alt: 'Jeisys', w: 82 },
  { src: '/novo/assets/logos/mundial-mix.png', alt: 'Grupo Mundial Mix', w: 108 },
  { src: '/novo/assets/logos/neogrid.png', alt: 'Neogrid', w: 98 },
  { src: '/novo/assets/logos/practical-center.png', alt: 'Practical Center', w: 90 },
  { src: '/novo/assets/logos/rumo.png', alt: 'Rumo', w: 107 },
  { src: '/novo/assets/logos/smartrisk.png', alt: 'Smartrisk', w: 108 },
  { src: '/novo/assets/logos/vero.png', alt: 'Vero', w: 32 },
];

/**
 * Dobra 6 — "Agentic Places to Work": faixa de logos de clientes + CTA para /casos.
 * Mantém o id="cases" usado pelos links de hash.
 */
export default function PlacesSection() {
  const { t } = useTranslation();

  return (
    <section id="cases" className="void-fold" style={{ padding: '48px 22px', scrollMarginTop: 92 }}>
      <style>{`
        .places-title { font-weight: 200; font-size: 23px; line-height: 1.12; letter-spacing: -0.01em; color: var(--ink); text-align: center; text-wrap: balance; }
        .logo-strip { margin: 22px auto 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px 18px; justify-items: center; align-items: center; padding: 24px 18px; background: rgba(16,20,27,.45); border: 1px solid var(--line-soft); border-radius: 14px; }
        .logo-strip img { height: auto; opacity: .9; max-width: 100%; }
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
            <img key={l.alt} src={l.src} alt={l.alt} width={l.w} loading="lazy" />
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
