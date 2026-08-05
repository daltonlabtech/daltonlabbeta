import { useTranslation } from 'react-i18next';

/**
 * Toggle de idioma PT/EN — pill de vidro do tema void (`.lang` do protótipo).
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
      aria-label="Idioma"
      className="inline-flex overflow-hidden rounded-full"
      style={{
        border: '1px solid var(--line)',
        background: 'rgba(16,20,27,.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
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
            className="inline-flex items-center justify-center transition-colors"
            style={{
              padding: '7px 13px',
              minHeight: 32,
              fontSize: 12,
              fontWeight: 400,
              fontFamily: 'var(--font-sans)',
              border: 0,
              cursor: 'pointer',
              color: active ? 'var(--ink)' : 'var(--ink3)',
              background: active ? 'rgba(162,182,206,.14)' : 'transparent',
            }}
          >
            {lang.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
