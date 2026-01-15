import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import logoImage from '@/assets/logo-dalton-lab.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { label: 'Quem Somos', href: '/quem-somos' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Blog', href: '#blog' },
  { label: 'Mídia', href: '#midia' },
];

const moreLinks = [
  { label: 'Organograma Híbrido Grátis', href: '#organograma' },
  { label: 'Nossos Treinamentos', href: '#treinamentos' },
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
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <img src={logoImage} alt="Dalton Lab" className="h-10 md:h-12 w-auto" />
          </a>

          {/* Navigation - Center */}
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
            
            {/* Dropdown "Mais" */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground/70 hover:text-foreground text-sm font-medium transition-colors duration-200 outline-none">
                Mais
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-white/10 z-50">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <a
                      href={link.href}
                      className="cursor-pointer text-foreground/70 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Spacer for balance - same width as logo */}
          <div className="hidden md:block w-[120px]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
