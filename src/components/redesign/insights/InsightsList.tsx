import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useArticles } from '@/hooks/useSanity';
import SearchBar from './SearchBar';
import Tabs, { InsightKind } from './Tabs';
import ArticleRow, { ArticleListItem } from './ArticleRow';

/**
 * Hub de insights — porta `.ins-index` do original.
 * Hero "Mídia, artigos e insights" + SearchBar + Tabs + lista filtrada de `useArticles`.
 *
 * Schema: o tipo `article` do Sanity não tem campo de categoria/tipo, então
 * apenas a tab "Artigos" é populável. Ela inicia ativa; "Mídia" e "Insights"
 * ficam visíveis porém inertes (ver Tabs.tsx).
 */
export default function InsightsList() {
  const { t } = useTranslation();
  const { data: articles = [], isLoading } = useArticles() as {
    data?: ArticleListItem[];
    isLoading: boolean;
  };
  const [activeKind, setActiveKind] = useState<InsightKind>('article');
  const [term, setTerm] = useState('');

  const shown = useMemo(() => {
    const list = activeKind === 'article' ? articles : [];
    if (!term) return list;
    return list.filter((a) =>
      `${a.title ?? ''} ${a.author ?? ''}`.toLowerCase().includes(term),
    );
  }, [articles, activeKind, term]);

  return (
    <div className="ins-index">
      {/* Hero */}
      <section
        style={{
          maxWidth: 'var(--navy-maxw)',
          margin: '0 auto',
          padding: '116px var(--navy-gutter) 6px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <span className="eyebrow" style={{ marginBottom: 16 }}>
            {t('insp.eyebrow', 'Conteúdo')}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(2.2rem, 8vw, 3.4rem)',
              lineHeight: 1.03,
              margin: '16px 0 18px',
              color: 'var(--text)',
              textWrap: 'balance',
            }}
          >
            {t('insp.title', 'Mídia, artigos e insights')}
          </h1>
          <p
            style={{
              color: 'var(--text-dim)',
              fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
              lineHeight: 1.5,
              maxWidth: '34ch',
            }}
          >
            {t('insp.lede', 'Ideias, artigos e pontos de vista sobre transformação agêntica.')}
          </p>

          <SearchBar onChange={setTerm} />

          <Tabs active={activeKind} onChange={setActiveKind} enabled={['article']} />
        </div>
      </section>

      {/* Lista */}
      <section
        style={{
          maxWidth: 'var(--navy-maxw)',
          margin: '0 auto',
          padding: '6px var(--navy-gutter) 80px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
          {isLoading ? (
            <p
              style={{
                color: 'var(--muted-navy)',
                padding: '40px 0',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
              }}
            >
              {t('insp.loading', 'Carregando…')}
            </p>
          ) : shown.length ? (
            shown.map((a, i) => (
              <ArticleRow
                key={a._id ?? a.slug?.current ?? i}
                article={a}
                isLast={i === shown.length - 1}
              />
            ))
          ) : (
            <p
              style={{
                color: 'var(--muted-navy)',
                padding: '40px 0',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
              }}
            >
              {t('insp.empty', 'Nada encontrado.')}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
