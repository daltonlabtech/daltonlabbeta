import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useArticles } from '@/hooks/useSanity';
import SearchBar from './SearchBar';
import Tabs, { InsightKind } from './Tabs';
import ArticleRow, { ArticleListItem } from './ArticleRow';
import ContentRow from './ContentRow';
import { MEDIA, INSIGHTS, L, insightTs } from '@/data/insightsContent';

/**
 * Hub de insights — porta `.ins-index` do original.
 * Hero "Mídia, artigos e insights" + SearchBar + Tabs + lista filtrada.
 *
 * Artigos vêm do Sanity (`useArticles`). Mídia e Insights são conteúdo estático
 * (`src/data/insightsContent.ts`), portado da referência. As três abas ficam ativas.
 */
export default function InsightsList() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en';
  const { data: articles = [], isLoading } = useArticles() as {
    data?: ArticleListItem[];
    isLoading: boolean;
  };
  const [activeKind, setActiveKind] = useState<InsightKind>('article');
  const [term, setTerm] = useState('');

  const shownArticles = useMemo(() => {
    if (!term) return articles;
    return articles.filter((a) =>
      `${a.title ?? ''} ${a.author ?? ''}`.toLowerCase().includes(term),
    );
  }, [articles, term]);

  const shownMedia = useMemo(() => {
    if (!term) return MEDIA;
    return MEDIA.filter((m) =>
      `${L(m.title, lang)} ${L(m.source, lang)}`.toLowerCase().includes(term),
    );
  }, [term, lang]);

  const shownInsights = useMemo(() => {
    const sorted = [...INSIGHTS].sort((a, b) => insightTs(b.date) - insightTs(a.date));
    if (!term) return sorted;
    return sorted.filter((i) =>
      `${L(i.title, lang)} ${L(i.cat, lang)} ${L(i.dek, lang)}`.toLowerCase().includes(term),
    );
  }, [term, lang]);

  const emptyText = (
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
  );

  const renderList = () => {
    if (activeKind === 'article') {
      if (isLoading) {
        return (
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
        );
      }
      if (!shownArticles.length) return emptyText;
      return shownArticles.map((a, i) => (
        <ArticleRow
          key={a._id ?? a.slug?.current ?? i}
          article={a}
          isLast={i === shownArticles.length - 1}
        />
      ));
    }

    if (activeKind === 'media') {
      if (!shownMedia.length) return emptyText;
      return shownMedia.map((m, i) => (
        <ContentRow
          key={m.id}
          date={L(m.date, lang)}
          title={L(m.title, lang)}
          byline={L(m.source, lang)}
          href={m.url}
          isLast={i === shownMedia.length - 1}
        />
      ));
    }

    // insight
    if (!shownInsights.length) return emptyText;
    return shownInsights.map((ins, i) => (
      <ContentRow
        key={ins.id}
        date={L(ins.date, lang)}
        title={L(ins.title, lang)}
        byline={`${ins.author.name} · ${L(ins.author.role, lang)}`}
        to={`/artigos/insight/${ins.id}`}
        isLast={i === shownInsights.length - 1}
      />
    ));
  };

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
            {t('insp.eyebrow', 'Conteúdos')}
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
            <Trans i18nKey="insp.title" components={{ b: <b style={serifStrong} /> }}>
              {'Mídia, artigos e <b>insights</b>'}
            </Trans>
          </h1>

          <SearchBar onChange={setTerm} />

          <Tabs active={activeKind} onChange={setActiveKind} enabled={['media', 'article', 'insight']} />
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
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>{renderList()}</div>
      </section>
    </div>
  );
}

const serifStrong: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontWeight: 500,
  fontStyle: 'italic',
  color: 'var(--cyan)',
  WebkitTextFillColor: 'var(--cyan)',
};
