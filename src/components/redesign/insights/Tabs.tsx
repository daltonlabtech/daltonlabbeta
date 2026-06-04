import { useTranslation } from 'react-i18next';

export type InsightKind = 'media' | 'article' | 'insight';

interface TabsProps {
  active: InsightKind;
  onChange: (kind: InsightKind) => void;
  /** quais tabs têm conteúdo disponível; as demais ficam preparadas/inertes */
  enabled?: InsightKind[];
}

/**
 * Tabs Mídia | Artigos | Insights — porta `.ins-tabs` / `.ins-tab` do original.
 *
 * IMPORTANTE — schema do Sanity: o tipo `article` (ver `src/hooks/useSanity.ts`)
 * NÃO possui campo de categoria/tipo (`kind`/`cat`). Os hooks expõem apenas
 * `title, slug, author, publishedAt, thumbnail, body`. Portanto não há como
 * popular "Mídia" e "Insights" com dados reais sem inventar campos.
 *
 * Decisão: renderizamos "Artigos" como a tab ativa (mapeada a `useArticles`) e
 * mantemos "Mídia" e "Insights" visualmente presentes porém inertes (cursor
 * not-allowed, aria-disabled), prontas para quando o schema ganhar um campo de
 * categoria. Nenhum dado falso é fabricado.
 */
export default function Tabs({ active, onChange, enabled = ['article'] }: TabsProps) {
  const { t } = useTranslation();

  const tabs: { kind: InsightKind; label: string }[] = [
    { kind: 'media', label: t('insp.tab.media', 'Mídia') },
    { kind: 'article', label: t('insp.tab.articles', 'Artigos') },
    { kind: 'insight', label: t('insp.tab.team', 'Insights') },
  ];

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: 6,
        padding: 5,
        margin: '22px auto 4px',
        background: 'var(--surface)',
        border: '1px solid var(--border-navy)',
        borderRadius: 999,
        width: '100%',
        maxWidth: 360,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.kind === active;
        const isEnabled = enabled.includes(tab.kind);
        return (
          <button
            key={tab.kind}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-disabled={!isEnabled}
            disabled={!isEnabled}
            onClick={() => isEnabled && onChange(tab.kind)}
            style={{
              appearance: 'none',
              border: 0,
              cursor: isEnabled ? 'pointer' : 'not-allowed',
              flex: 1,
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 12.5,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: isActive ? '#06121a' : isEnabled ? 'var(--text-dim)' : 'var(--muted-navy)',
              background: isActive ? 'var(--cyan)' : 'transparent',
              padding: '11px 20px',
              borderRadius: 999,
              opacity: isEnabled || isActive ? 1 : 0.55,
              transition: 'color .3s, background .3s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!isActive && isEnabled) e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={(e) => {
              if (!isActive && isEnabled) e.currentTarget.style.color = 'var(--text-dim)';
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
