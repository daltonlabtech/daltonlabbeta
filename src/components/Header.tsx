import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Blog', href: '#blog' },
  { label: 'Mídia', href: '#midia' },
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
          <a href="/" className="flex items-center">
            <span className="text-foreground font-bold text-xl md:text-2xl tracking-tight">
              Dalton<span className="text-foreground/70">Lab</span>
            </span>
          </a>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-8">
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

          {/* Spacer for balance */}
          <div className="w-20 md:w-32" />
        </div>
      </div>
    </header>
  );
};

export default Header;
