import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';
import LangToggle from './LangToggle';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Menu overlay fullscreen do tema void — porta `.menu` do protótipo:
 * fundo quase opaco com blur, links grandes Manrope 200, idioma + CTA no rodapé.
 */
export default function MobileNav({ open, onClose }: MobileNavProps) {
  const { t } = useTranslation();
  const location = useLocation();

  // Link com hash para a home: se já na home, rola suave; senão o <Link> navega
  // e o efeito da Index rola até a seção. Sempre fecha o menu.
  const handleItemClick = (e: React.MouseEvent, href: string) => {
    const i = href.indexOf('#');
    if (i !== -1 && location.pathname === '/') {
      e.preventDefault();
      document.querySelector(href.slice(i))?.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  // Trava o scroll do body enquanto aberto
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Fecha com Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const items = [
    { label: t('nav.solutions', 'Metodologia'), href: '/#solutions' },
    { label: t('nav.cases', 'Casos'), href: '/casos' },
    { label: t('nav.insights', 'Conteúdos'), href: '/artigos' },
    { label: t('nav.about', 'Quem Somos'), href: '/quem-somos' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className="fixed inset-0 z-[110] flex-col lg:hidden"
      style={{
        display: open ? 'flex' : 'none',
        background: 'rgba(5,6,8,.94)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '10px 22px 44px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between" style={{ height: 54 }}>
        <Link to="/" aria-label="Dalton Lab" onClick={onClose} className="inline-flex items-center">
          <img src="/novo/assets/dalton-lab-wordmark.png" alt="Dalton Lab" style={{ height: 14, width: 'auto' }} />
        </Link>
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={onClose}
          style={{
            width: 44,
            height: 44,
            background: 'none',
            border: 0,
            color: 'var(--ink)',
            font: '200 30px/1 var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      </div>

      <nav className="flex flex-col" style={{ gap: 26, margin: 'auto 0', paddingTop: 40 }}>
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={(e) => handleItemClick(e, item.href)}
            style={{ font: '200 30px var(--font-sans)', color: 'var(--ink)' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col items-start" style={{ gap: 20 }}>
        <LangToggle />
        <a
          href="https://formulario.daltonlab.ai/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackCtaClick(t('cta.contact', 'Fale conosco'), 'mobile_nav', 'https://formulario.daltonlab.ai/');
            onClose();
          }}
          className="btn-p"
        >
          {t('cta.contact', 'Fale conosco')}
        </a>
      </div>
    </div>
  );
}
