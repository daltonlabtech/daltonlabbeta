import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Sheet mobile — porta `.sheet` do original. Abre/fecha por estado React
 * (em vez da classe `.open` manipulada no main.js). Fecha ao clicar num item.
 */
export default function MobileNav({ open, onClose }: MobileNavProps) {
  const { t } = useTranslation();

  // Trava o scroll do body enquanto aberto (equivalente ao document.body.style.overflow)
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const items: Array<{ label: string; href: string; idx: string; external?: boolean }> = [
    { label: t('nav.solutions', 'Metodologia'), href: '/#solutions', idx: '01' },
    { label: t('nav.cases', 'Casos'), href: '/#cases', idx: '02' },
    { label: t('nav.insights', 'Insights'), href: '/artigos', idx: '03' },
    { label: t('nav.about', 'Sobre'), href: '/quem-somos', idx: '04' },
  ];

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    padding: '12px 0',
    borderBottom: '1px solid var(--border-navy-2)',
    color: 'var(--text)',
  };

  return (
    <div
      className="fixed left-0 right-0 z-[99] flex flex-col gap-[2px] px-6 pt-3 pb-6 md:hidden"
      style={{
        top: 'calc(56px + var(--safe-top, 16px))',
        background: 'color-mix(in oklab, var(--bg-deep) 95%, transparent)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid var(--border-navy)',
        transform: open ? 'translateY(0)' : 'translateY(-120%)',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: open
          ? 'transform .45s var(--ease), opacity .3s var(--ease), visibility 0s'
          : 'transform .45s var(--ease), opacity .3s var(--ease), visibility 0s linear .45s',
      }}
      aria-hidden={!open}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          onClick={onClose}
          className="flex items-center justify-between"
          style={linkStyle}
        >
          <span>{item.label}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted-navy)', fontWeight: 500 }}>
            {item.idx}
          </span>
        </Link>
      ))}
      <a
        href="https://formulario.daltonlab.ai/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackCtaClick(t('cta.contact', 'Fale conosco'), 'mobile_nav', 'https://formulario.daltonlab.ai/');
          onClose();
        }}
        className="mt-4 inline-flex items-center justify-center rounded-full"
        style={{
          padding: '15px 26px',
          minHeight: 48,
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          background: 'var(--cyan)',
          color: 'var(--accent-ink)',
        }}
      >
        {t('cta.contact', 'Fale conosco')}
      </a>
    </div>
  );
}
