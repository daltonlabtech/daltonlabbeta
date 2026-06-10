import { useTranslation } from 'react-i18next';

interface AboutHeroProps {
  activeTab: 'company' | 'founders';
  onTabChange: (tab: 'company' | 'founders') => void;
}

/**
 * Hero da página Quem Somos — porta `.qs-hero` do original.
 * Headline + lede + foto da equipe com badge de status ao vivo + tabs Empresa/Fundadores.
 */
export default function AboutHero({ activeTab, onTabChange }: AboutHeroProps) {
  const { t } = useTranslation();

  return (
    <section
      className="wrap reveal in"
      style={{
        position: 'relative',
        paddingTop: 116,
        paddingBottom: 8,
        maxWidth: 'var(--navy-maxw)',
        marginInline: 'auto',
        paddingInline: 'var(--navy-gutter)',
        boxSizing: 'border-box',
      }}
    >
      <span className="eyebrow" style={{ marginBottom: 18, display: 'inline-flex' }}>
        {t('qs.eyebrow', 'Quem Somos')}
      </span>

      <h1
        className="headline"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.02,
          margin: '18px 0 20px',
          fontSize: 'clamp(2.2rem, 8vw, 5rem)',
        }}
      >
        {t('qs.title.pre', 'Humanos e agentes, ')}
        <b
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontStyle: 'italic',
            color: 'var(--cyan)',
          }}
        >
          {t('qs.title.em', 'lado a lado')}
        </b>
      </h1>

      <p
        className="lede"
        style={{
          color: 'var(--text-dim)',
          fontSize: 'clamp(1.04rem, 2.5vw, 1.26rem)',
          letterSpacing: '-0.012em',
          lineHeight: 1.5,
          maxWidth: '32ch',
        }}
      >
        {t(
          'qs.lede',
          'Somos a primeira empresa do Brasil especializada em transformação agêntica, operando globalmente em quatro continentes.',
        )}
      </p>

      {/* Foto da equipe com badge ao vivo */}
      <div
        style={{
          position: 'relative',
          marginTop: 34,
          borderRadius: 'var(--navy-radius)',
          overflow: 'hidden',
          border: '1px solid var(--border-navy)',
          boxShadow: '0 26px 60px rgba(0,0,0,0.42)',
        }}
      >
        <img
          src="/novo/assets/team/equipe.jpg"
          alt={t('qs.photo.alt', 'Equipe Dalton Lab')}
          decoding="async"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
        <span
          aria-hidden="true"
          style={{
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(6,13,26,0) 55%, rgba(6,13,26,0.55) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: 6,
          padding: 5,
          margin: '30px auto 0',
          background: 'var(--surface)',
          border: '1px solid var(--border-navy)',
          borderRadius: 999,
          width: 'max-content',
          maxWidth: '100%',
        }}
      >
        {(
          [
            { key: 'company', label: t('qs.tab.company', 'Empresa') },
            { key: 'founders', label: t('qs.tab.founders', 'Fundadores') },
          ] as const
        ).map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onTabChange(tab.key)}
              style={{
                appearance: 'none',
                border: 0,
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: active ? 'var(--accent-ink)' : 'var(--text-dim)',
                background: active ? 'var(--cyan)' : 'transparent',
                padding: '11px 22px',
                borderRadius: 999,
                transition: 'color .3s, background .3s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = 'var(--text-dim)';
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
