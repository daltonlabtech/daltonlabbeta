import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import logoWhite from '@/assets/logo-dalton-white.png';
import { trackCtaClick } from '@/lib/analytics';
import LanguageSelector from '@/components/LanguageSelector';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.transformation'), href: isHome ? '#journey' : '/#journey' },
    { label: t('nav.media'), href: isHome ? '#media' : '/#media' },
    { label: t('nav.articles'), href: '/artigos' },
    { label: t('nav.about'), href: '/quem-somos' },
  ];

  const handleCtaClick = () => {
    trackCtaClick(t('nav.startTransformation'), 'header', 'https://chat.daltonlab.ai/');
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? 'rgba(13, 18, 24, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
      }}
    >
      <div className="container mx-auto px-5 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-14 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0" aria-label="Dalton Lab - Página inicial">
            <img
              src={logoWhite}
              alt="Dalton Lab - Organizações Agênticas"
              className="h-24 md:h-40 w-auto"
              width={160}
              height={40}
              loading="eager"
              fetchPriority="high"
            />
          </a>

          {/* Navigation - Center (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: 'rgba(245, 243, 240, 0.7)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F3F0'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245, 243, 240, 0.7)'; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side - CTA + Language Selector (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://formulario.daltonlab.ai/"
              onClick={handleCtaClick}
              className="px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all"
              style={{
                backgroundColor: '#F5F3F0',
                color: '#101823',
              }}
            >
              {t('nav.startTransformation')}
            </a>
            <LanguageSelector />
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="md:hidden p-2 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                style={{ color: 'rgba(245, 243, 240, 0.7)' }}
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px]"
              style={{
                backgroundColor: '#0D1218',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-lg font-medium transition-colors duration-200 py-2"
                      style={{ color: 'rgba(245, 243, 240, 0.7)' }}
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
                {/* CTA */}
                <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <a
                    href="https://formulario.daltonlab.ai/"
                    onClick={handleCtaClick}
                    className="block w-full px-4 py-3 rounded-full text-sm font-medium text-center hover:opacity-90 transition-all"
                    style={{
                      backgroundColor: '#F5F3F0',
                      color: '#101823',
                    }}
                  >
                    {t('nav.startTransformation')}
                  </a>
                </div>
                {/* Language Selector */}
                <div className="pt-4">
                  <LanguageSelector />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
