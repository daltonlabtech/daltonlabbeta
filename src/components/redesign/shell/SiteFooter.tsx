import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SOCIAL = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/dalton-lab/',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@dalton_lab?si=mOfQCKAmASA4TKYB',
    path: 'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z',
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/show/4fnDNmjCB0EQzT7HlmCUr4?si=932194c816404620',
    path: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.32a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.58-1.04 8.5-.59 11.66 1.34.36.22.47.68.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 0 1-.55-1.8c4.37-1.33 9.79-.68 13.5 1.6.44.27.58.85.31 1.29zm.13-3.4C15.73 8.4 8.86 8.18 5.16 9.3a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.83-1.04 16.5 1.73a1.12 1.12 0 1 1-1.15 1.93l.24-.05z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/daltonlab.ai?igsh=MW84MHo5dW91ZDA1ag==',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.73 3.73 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.95c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.41-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.17.42-.36 1.04-.41 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.41 2.19.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.17 1.04.36 2.19.41 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.41.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.17-.42.36-1.04.41-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.41-2.19a3.63 3.63 0 0 0-.88-1.35 3.63 3.63 0 0 0-1.35-.88c-.42-.17-1.04-.36-2.19-.41-1.24-.06-1.61-.07-4.76-.07zm0 3.32a4.57 4.57 0 1 1 0 9.14 4.57 4.57 0 0 1 0-9.14zm0 7.54a2.97 2.97 0 1 0 0-5.94 2.97 2.97 0 0 0 0 5.94zm5.82-7.74a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0z',
  },
];

/**
 * Footer do novo design system — porta `<footer class="footer">` do original.
 */
export default function SiteFooter() {
  const { t } = useTranslation();

  const legalLinkStyle: React.CSSProperties = {
    color: 'var(--text-dim)',
    fontSize: 14,
    transition: 'color .3s',
  };

  return (
    <footer
      id="about"
      style={{
        borderTop: '1px solid var(--border-navy)',
        paddingBlock: '56px 40px',
        background: 'var(--bg-deep)',
      }}
    >
      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: 'var(--navy-maxw)', width: '100%', boxSizing: 'border-box' }}>
        <Link to="/" className="inline-block">
          <img src="/novo/assets/dalton-lab-logo.png" alt="Dalton Lab" style={{ height: 28, width: 'auto' }} />
        </Link>

        <p style={{ color: 'var(--text-dim)', marginTop: 22, fontSize: 15, textAlign: 'left' }}>
          {t('footer.rights', '© 2026 Dalton Lab. Todos os direitos reservados.')}
        </p>

        <div className="flex justify-center" style={{ gap: 14, marginTop: 20 }}>
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex items-center justify-center"
              style={{ width: 40, height: 40, color: 'var(--text-dim)', transition: 'color .3s, transform .3s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--cyan)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-dim)';
                e.currentTarget.style.transform = '';
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: 20, marginTop: 28, paddingTop: 26, borderTop: '1px solid var(--border-navy-2)' }}
        >
          <nav className="flex flex-wrap justify-center" style={{ gap: '12px 26px' }}>
            <Link
              to="/politica-de-privacidade"
              style={legalLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {t('footer.privacy', 'Política de Privacidade')}
            </Link>
            <Link
              to="/termos-de-uso"
              style={legalLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {t('footer.cookies', 'Termos de Uso')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
