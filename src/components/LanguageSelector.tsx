import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { supportedLanguages, type SupportedLanguage } from '@/lib/i18n';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language?.split('-')[0] as SupportedLanguage || 'pt';
  const currentLangData = supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside — must be before any conditional return
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Don't show selector if language is Portuguese
  if (currentLanguage === 'pt') {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-foreground/70 hover:text-foreground text-sm font-medium transition-colors duration-200 rounded-full hover:bg-foreground/5"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLangData.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-background/95 backdrop-blur-md border border-foreground/10 rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="py-1">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150
                  ${currentLanguage === lang.code 
                    ? 'bg-foreground/10 text-foreground font-medium' 
                    : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                  }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
