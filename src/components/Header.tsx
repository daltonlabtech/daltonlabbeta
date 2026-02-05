import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.product'), href: '/produto' },
    { label: t('nav.about'), href: '/quem-somos' },
  ];

  const handleCtaClick = () => {
    trackCtaClick('Fale com o Dalton', 'header', 'https://chat.daltonlab.ai/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-foreground/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0" aria-label="Dalton Lab - Página inicial">
            <img 
              src={logoWhite} 
              alt="Dalton Lab - Agentes de IA" 
              className="h-32 md:h-40 w-auto"
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
                className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side - CTA + Language Selector (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://chat.daltonlab.ai/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className="px-4 py-2 rounded-full bg-[#F5F3F0] text-[#101823] text-sm font-medium hover:opacity-90 transition-all"
            >
              {t('nav.talkToDalton')}
            </a>
            <LanguageSelector />
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button 
                className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l border-white/10 w-[280px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground text-lg font-medium transition-colors duration-200 py-2"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
                {/* Language Selector in Mobile Menu */}
                <div className="pt-4 border-t border-white/10">
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
