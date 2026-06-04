import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface ArticleListItem {
  _id?: string;
  title: string;
  slug?: { current: string };
  author?: string;
  publishedAt?: string;
}

const formatDate = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
};

/**
 * Linha estilo Anthropic — porta `.ip-row` do original.
 * Metadata (data) → título → byline (autor) → seta. Link para `/artigos/:slug`.
 */
export default function ArticleRow({
  article,
  isLast,
}: {
  article: ArticleListItem;
  isLast?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const slug = article.slug?.current ?? '';

  return (
    <Link
      to={`/artigos/${slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '24px 0',
        paddingLeft: hover ? 6 : 0,
        borderTop: '1px solid var(--border-navy-2)',
        borderBottom: isLast ? '1px solid var(--border-navy-2)' : undefined,
        textDecoration: 'none',
        transition: 'padding-left .3s var(--ease)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: '0.03em',
            color: 'var(--muted-navy)',
            marginBottom: 9,
          }}
        >
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontSize: 'clamp(1.12rem, 4.4vw, 1.32rem)',
            lineHeight: 1.22,
            color: hover ? 'var(--cyan)' : 'var(--text)',
            transition: 'color .3s',
          }}
        >
          {article.title}
        </div>

        {article.author && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 13 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dim)' }}>
              {article.author}
            </span>
          </div>
        )}
      </div>

      <span
        aria-hidden="true"
        style={{
          flex: 'none',
          color: hover ? 'var(--cyan)' : 'var(--muted-navy)',
          fontSize: 18,
          transform: hover ? 'translateX(4px)' : undefined,
          transition: 'transform .3s, color .3s',
        }}
      >
        →
      </span>
    </Link>
  );
}
