import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface RelatedArticle {
  title: string;
  slug?: { current: string };
  publishedAt?: string;
}

const formatDate = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
};

function RelatedItem({ article }: { article: RelatedArticle }) {
  const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  const slug = article.slug?.current ?? '';

  return (
    <Link
      to={`/artigos/${slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        border: hover ? '1px solid rgba(143,230,255,0.4)' : '1px solid var(--border-navy)',
        borderRadius: 'var(--navy-radius)',
        background: 'var(--surface)',
        padding: 18,
        transform: hover ? 'translateY(-2px)' : undefined,
        transition: 'border-color .3s, transform .3s',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11.5,
          fontWeight: 500,
          letterSpacing: '0.03em',
          color: 'var(--muted-navy)',
        }}
      >
        {formatDate(article.publishedAt)}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          fontSize: '1.06rem',
          lineHeight: 1.25,
          color: 'var(--text)',
          margin: '8px 0 12px',
          textWrap: 'pretty',
        }}
      >
        {article.title}
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyan)' }}>
        {t('insp.readmore', 'Ler')} →
      </span>
    </Link>
  );
}

/**
 * Grid de artigos relacionados — porta `.ir-related` / `.ir-rel-grid` do original.
 * 2 colunas a partir de 760px. Dados via `useRelatedArticles`.
 */
export default function RelatedGrid({ articles }: { articles: RelatedArticle[] }) {
  const { t } = useTranslation();
  if (!articles.length) return null;

  return (
    <div
      style={{
        marginTop: 52,
        paddingTop: 30,
        borderTop: '1px solid var(--border-navy-2)',
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 18 }}>
        {t('insp.related', 'Continue lendo')}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 14,
        }}
      >
        {articles.map((a, i) => (
          <RelatedItem key={a.slug?.current ?? i} article={a} />
        ))}
      </div>
    </div>
  );
}
