import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';
import LangToggle from './LangToggle';
import MobileNav from './MobileNav';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';

/**
 * Header fixo do novo design system — porta `<header class="header">` do original.
 * Detecta scroll (> 12px) para aplicar o blur backdrop (classe `scrolled`).
 */
export default function SiteHeader() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: t('nav.solutions', 'Metodologia'), href: '/#solutions' },
    { label: t('nav.cases', 'Casos'), href: '/#cases' },
    { label: t('nav.insights', 'Insights'), href: '/artigos' },
    { label: t('nav.about', 'Sobre'), href: '/quem-somos' },
  ];

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-[100]"
        style={{
          paddingTop: 'var(--safe-top, 16px)',
          transition: 'background .4s var(--ease), backdrop-filter .4s',
          background: scrolled ? 'color-mix(in oklab, var(--bg-deep) 88%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : undefined,
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : undefined,
        }}
      >
        <div
          className="mx-auto flex h-14 items-center justify-between px-6 md:px-12"
          style={{ maxWidth: 'var(--navy-maxw)', width: '100%', boxSizing: 'border-box' }}
        >
          <Link to="/" aria-label="Dalton Lab" className="inline-flex items-center">
            <img
              src="/novo/assets/dalton-lab-logo.png"
              alt="Dalton Lab"
              style={{ height: 24, width: 'auto', display: 'block' }}
            />
          </Link>

          {/* Nav desktop — centralizada */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
            style={{ gap: 32, fontSize: 14, color: 'var(--text-dim)' }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="transition-colors"
                style={{ position: 'relative' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center" style={{ gap: 8 }}>
            <LangToggle />
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick(t('cta.contact', 'Fale conosco'), 'header', CONTACT_URL)}
              className="hidden items-center justify-center rounded-full md:inline-flex"
              style={{
                padding: '15px 26px',
                minHeight: 48,
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                background: 'var(--cyan)',
                color: 'var(--accent-ink)',
                transition: 'transform .3s var(--ease), box-shadow .3s var(--ease)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 34px rgba(76,184,232,0.38)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {t('cta.contact', 'Fale conosco')}
            </a>

            {/* Burger — mobile */}
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="flex flex-col items-center justify-center md:hidden"
              style={{
                width: 44,
                height: 44,
                border: '1px solid var(--border-navy)',
                borderRadius: 10,
              }}
            >
              <span style={burgerBar(menuOpen, 0)} />
              <span style={burgerBar(menuOpen, 1)} />
              <span style={burgerBar(menuOpen, 2)} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function burgerBar(open: boolean, i: number): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'block',
    width: 18,
    height: 1.5,
    background: 'var(--text)',
    transition: 'transform .3s, opacity .3s',
    marginTop: i === 0 ? 0 : 4,
  };
  if (!open) return base;
  if (i === 0) return { ...base, transform: 'translateY(5.5px) rotate(45deg)' };
  if (i === 1) return { ...base, opacity: 0 };
  return { ...base, transform: 'translateY(-5.5px) rotate(-45deg)' };
}
