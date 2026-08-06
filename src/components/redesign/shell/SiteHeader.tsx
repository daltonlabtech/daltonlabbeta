import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';
import LangToggle from './LangToggle';
import MobileNav from './MobileNav';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

/**
 * Header fixo do tema void — grid 1fr/auto/1fr (marca, nav central, ações),
 * transparente no topo e vidro (blur) após 80px de scroll.
 */
export default function SiteHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Links com hash para a home (ex.: "/#solutions"): se já estamos na home,
  // rola suave até a seção; senão deixa o <Link> navegar e o efeito da Index rola.
  const handleHashClick = (e: React.MouseEvent, href: string) => {
    const i = href.indexOf('#');
    if (i === -1) return;
    if (location.pathname === '/') {
      e.preventDefault();
      document.querySelector(href.slice(i))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('nav.solutions', 'Metodologia'), href: '/#solutions' },
    { label: t('nav.cases', 'Casos'), href: '/casos' },
    { label: t('nav.insights', 'Conteúdos'), href: '/artigos' },
    { label: t('nav.about', 'Quem Somos'), href: '/quem-somos' },
  ];

  return (
    <>
      <style>{`
        /* O wordmark é bem horizontal (703x80), por isso alturas menores que as
           da marca antiga — mantém a mesma presença visual sem esticar demais. */
        .void-header { height: 72px; padding: 0 22px; }
        .void-header .brand-img { height: 11px; }
        @media (min-width: 1024px) {
          .void-header { height: 92px; padding: 0 44px; }
          .void-header .brand-img { height: 14px; }
        }
      `}</style>
      <header
        className="void-header fixed left-0 right-0 top-0 z-[100] grid items-center"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
          gap: 24,
          transition: 'background .3s, border-color .3s, backdrop-filter .3s',
          background: scrolled ? 'rgba(8,10,15,.72)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : undefined,
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : undefined,
        }}
      >
        <Link to="/" aria-label="Dalton Lab" className="inline-flex items-center justify-self-start">
          <img
            className="brand-img"
            src="/novo/assets/dalton-lab-wordmark.png"
            alt="Dalton Lab"
            style={{ width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Nav desktop — coluna central do grid (só ≥1024px; tablet/mobile usam o hambúrguer) */}
        <nav
          className="hidden items-center lg:flex"
          aria-label="Navegação principal"
          style={{ gap: 34, fontSize: 15, color: 'var(--ink2)' }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={(e) => handleHashClick(e, l.href)}
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink2)')}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end" style={{ gap: 16, gridColumn: 3 }}>
          <span className="hidden lg:inline-flex">
            <LangToggle />
          </span>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick(t('cta.contact', 'Fale conosco'), 'header', CONTACT_URL)}
            className="btn-p hidden lg:inline-flex"
            style={{ minHeight: 38, padding: '9px 20px', fontSize: 14 }}
          >
            {t('cta.contact', 'Fale conosco')}
          </a>

          {/* Burger — mobile */}
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col items-center justify-center lg:hidden"
            style={{ width: 44, height: 44, background: 'none', border: 0, gap: 6 }}
          >
            <span style={burgerBar(menuOpen, 0)} />
            <span style={burgerBar(menuOpen, 1)} />
            <span style={burgerBar(menuOpen, 2)} />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function burgerBar(open: boolean, i: number): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'block',
    width: 20,
    height: 1.4,
    background: 'var(--ink)',
    transition: 'transform .3s, opacity .3s',
  };
  if (!open) return base;
  if (i === 0) return { ...base, transform: 'translateY(7.4px) rotate(45deg)' };
  if (i === 1) return { ...base, opacity: 0 };
  return { ...base, transform: 'translateY(-7.4px) rotate(-45deg)' };
}
