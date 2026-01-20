import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import logoImage from '@/assets/logo-dalton-lab.png';
import daltonLabText from '@/assets/dalton-lab-text.png';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'Produto', href: '#produto' },
  { label: 'Notícias', href: '#noticias' },
  { label: 'Quem Somos', href: '/quem-somos' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-foreground/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Text */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoImage} alt="Dalton Lab" className="h-10 md:h-12 w-auto" />
            <img src={daltonLabText} alt="Dalton Lab" className="h-4 md:h-5 w-auto" />
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

          {/* Spacer for balance - same width as logo (Desktop) */}
          <div className="hidden md:block w-[120px]" />

          {/* Mobile Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors">
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
