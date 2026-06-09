import { useTranslation, Trans } from 'react-i18next';
import HeroMergeCanvas from '@/components/redesign/canvas/HeroMergeCanvas';
import { trackCtaClick } from '@/lib/analytics';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

/** Destaque cyan/serif para palavras em <b> — mesmo tratamento do FinalCTASection. */
const serifStrong: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontStyle: 'italic',
  color: 'var(--cyan)',
  WebkitTextFillColor: 'var(--cyan)',
};

/** Logos do marquee — porta a ordem do `.hero-logos` do index.html original. */
const MARQUEE_LOGOS: { src: string; alt: string; height: number; maxWidth: number }[] = [
  { src: 'jeisys.png', alt: 'Jeisys', height: 44, maxWidth: 120 },
  { src: 'rumo.png', alt: 'Rumo', height: 26, maxWidth: 130 },
  { src: 'mundial-mix.png', alt: 'Grupo Mundial Mix', height: 26, maxWidth: 140 },
  { src: 'neogrid.png', alt: 'Neogrid', height: 32, maxWidth: 140 },
  { src: 'imperatriz.png', alt: 'Supermercados Imperatriz', height: 28, maxWidth: 130 },
  { src: 'accesstage.png', alt: 'Accesstage', height: 28, maxWidth: 130 },
  { src: 'billion-dollar-boy.png', alt: 'Billion Dollar Boy', height: 132, maxWidth: 300 },
  { src: 'fialdini.png', alt: 'Fialdini', height: 132, maxWidth: 300 },
  { src: 'practical-center.png', alt: 'Practical Center', height: 132, maxWidth: 300 },
  { src: 'smartrisk.png', alt: 'SmartRisk', height: 132, maxWidth: 300 },
];

/**
 * Dobra 1 — Hero. Headline (com palavra serif/cyan), dois CTAs (trackCtaClick),
 * canvas de fundo (HeroMergeCanvas) e marquee de logos ancorado no rodapé.
 * Porta a estrutura `.hero` do index.html original.
 */
export default function HeroSection() {
  const { t } = useTranslation();

  // marquee duplicado para loop contínuo (translateX(-50%))
  const track = [...MARQUEE_LOGOS, ...MARQUEE_LOGOS];

  return (
    <section
      className="reveal in relative flex items-center overflow-hidden"
      style={{
        minHeight: '100svh',
        paddingTop: 80,
        paddingBottom: 170,
        background: 'transparent',
      }}
    >
      {/* grid backdrop */}
      <div className="hero-grid" />

      {/* glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '-18%',
          right: 0,
          width: '70vw',
          height: '70vw',
          maxWidth: 720,
          maxHeight: 720,
          background:
            'radial-gradient(circle at 50% 42%, rgba(76,184,232,0.26) 0%, rgba(76,184,232,0.12) 32%, rgba(76,184,232,0.04) 52%, transparent 72%)',
          filter: 'blur(80px)',
          opacity: 0.8,
        }}
      />

      {/* canvas — wrapper posicionado/dimensionado para o canvas (que é absolute inset:0).
          lg:hidden → removido no desktop/web; mantido em tablet e mobile (< 1024px). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute lg:hidden"
        style={{
          top: 'calc(56px + var(--safe-top, 16px))',
          right: 0,
          width: '42%',
          height: 'calc(100% - 56px - 170px)',
          zIndex: 1,
          opacity: 0.34,
        }}
      >
        <HeroMergeCanvas className="absolute inset-0 h-full w-full" />
      </div>

      {/* conteúdo */}
      <div
        className="relative mx-auto w-full px-6 lg:px-12"
        style={{ maxWidth: 'var(--navy-maxw, 1200px)', zIndex: 2, boxSizing: 'border-box' }}
      >
        <h1
          className="headline"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
            fontSize: 'clamp(2.2rem, 8vw, 5rem)',
            maxWidth: '16ch',
            marginTop: 22,
          }}
        >
          <Trans i18nKey="hero.title" components={{ b: <b style={serifStrong} /> }}>
            {'Transformando empresas em <b>Organizações Agênticas</b>'}
          </Trans>
        </h1>

        <div
          className="flex flex-col items-stretch sm:flex-row sm:items-center"
          style={{ gap: 8, marginTop: 24 }}
        >
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick(t('hero.cta1', 'Fale com um especialista'), 'hero', CONTACT_URL)}
            className="btn-primary-pill"
            style={primaryBtn}
            onMouseEnter={hoverPrimaryIn}
            onMouseLeave={hoverPrimaryOut}
          >
            {t('hero.cta1', 'Fale com um especialista')}
          </a>
          <a
            href="#solutions"
            onClick={() => trackCtaClick(t('hero.cta2', 'Explore nossa metodologia'), 'hero', '#solutions')}
            className="group"
            style={ghostBtn}
            onMouseEnter={hoverGhostIn}
            onMouseLeave={hoverGhostOut}
          >
            {t('hero.cta2', 'Explore nossa metodologia')}
          </a>
        </div>
      </div>

      {/* logos ancoradas no fundo do hero */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
        style={{ zIndex: 3, height: 160 }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          }}
        >
          <div
            className="flex items-center"
            style={{
              width: 'max-content',
              gap: 40,
              animation: 'dl-scroll-x 110s linear infinite',
            }}
          >
            {track.map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={`/novo/assets/logos/${logo.src}`}
                alt={logo.alt}
                style={{
                  height: logo.height,
                  width: 'auto',
                  maxWidth: logo.maxWidth,
                  flex: 'none',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.68,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* keyframe local do marquee (a animação .marquee-track não está no index.css) */}
      <style>{`@keyframes dl-scroll-x { to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

const primaryBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 9,
  padding: '11px 24px',
  borderRadius: 100,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '-0.01em',
  minHeight: 42,
  background: 'var(--cyan)',
  color: 'var(--accent-ink)',
  transition: 'transform .3s var(--ease), box-shadow .3s var(--ease)',
  whiteSpace: 'nowrap',
};

const ghostBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 9,
  padding: '11px 24px',
  borderRadius: 100,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '-0.01em',
  minHeight: 42,
  background: 'transparent',
  color: 'var(--text)',
  border: '1px solid var(--border-navy)',
  transition: 'transform .3s var(--ease), border-color .3s, color .3s, background .3s',
  whiteSpace: 'nowrap',
};

function hoverPrimaryIn(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = 'translateY(-2px)';
  e.currentTarget.style.boxShadow = '0 12px 34px rgba(76,184,232,0.38)';
}
function hoverPrimaryOut(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = '';
  e.currentTarget.style.boxShadow = '';
}
function hoverGhostIn(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = 'var(--cyan)';
  e.currentTarget.style.color = 'var(--cyan)';
  e.currentTarget.style.background = 'rgba(76,184,232,0.06)';
}
function hoverGhostOut(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.borderColor = 'var(--border-navy)';
  e.currentTarget.style.color = 'var(--text)';
  e.currentTarget.style.background = 'transparent';
}
