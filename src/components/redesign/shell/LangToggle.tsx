import { useTranslation } from 'react-i18next';

/**
 * Toggle de idioma PT/EN — porta `.lang button` do site original.
 * Chama i18n.changeLanguage e marca o ativo via i18n.language.
 */
export default function LangToggle() {
  const { i18n } = useTranslation();
  // Normaliza "pt-BR" → "pt", "en-US" → "en"
  const current = (i18n.language || 'pt').slice(0, 2);

  const langs: Array<'pt' | 'en'> = ['pt', 'en'];

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-full p-[2px]"
      style={{ border: '1px solid var(--border-navy)', fontFamily: 'var(--font-mono)' }}
    >
      {langs.map((lang) => {
        const active = current === lang;
        return (
          <button
            key={lang}
            type="button"
            data-lang={lang}
            aria-pressed={active}
            onClick={() => i18n.changeLanguage(lang)}
            className="inline-flex items-center justify-center rounded-full transition-colors"
            style={{
              minHeight: 40,
              minWidth: 40,
              padding: '0 12px',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: active ? 'var(--text)' : 'var(--muted-navy)',
              background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
            }}
          >
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
