import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { useArticle, useRelatedArticles } from '@/hooks/useSanity';
import AuthorCard from './AuthorCard';
import RelatedGrid, { RelatedArticle } from './RelatedGrid';

interface SanityArticle {
  title: string;
  author?: string;
  publishedAt?: string;
  body?: unknown[];
}

const countWords = (body?: unknown[]): number => {
  if (!Array.isArray(body)) return 0;
  return body.reduce<number>((acc, block: unknown) => {
    const b = block as { _type?: string; children?: Array<{ text?: string }> };
    if (b._type !== 'block' || !b.children) return acc;
    return acc + b.children.reduce((s, c) => s + (c.text?.split(/\s+/).length ?? 0), 0);
  }, 0);
};

/**
 * Componentes PortableText re-estilizados para o novo visual (porta `.ir-p`,
 * `.ir-h`, `.ir-q` do reader original). Reaproveita o padrão de
 * `portableTextComponents` do antigo `Artigo.tsx`, adaptado às fontes/cores navy.
 * `blockquote` vira a pull quote serif/itálica com barra ciano.
 */
const readerComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h2 style={headStyle}>{children}</h2>,
    h2: ({ children }) => <h2 style={headStyle}>{children}</h2>,
    h3: ({ children }) => (
      <h3 style={{ ...headStyle, fontSize: 'clamp(1.15rem, 4vw, 1.35rem)', margin: '28px 0 12px' }}>
        {children}
      </h3>
    ),
    normal: ({ children }) => <p style={paraStyle}>{children}</p>,
    blockquote: ({ children }) => (
      <blockquote
        style={{
          margin: '32px 0',
          paddingLeft: 20,
          borderLeft: '2px solid var(--cyan)',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 'clamp(1.4rem, 5.5vw, 1.85rem)',
          lineHeight: 1.28,
          color: 'var(--text)',
          textWrap: 'balance',
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ ...paraStyle, paddingLeft: 22, listStyle: 'disc' }}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol style={{ ...paraStyle, paddingLeft: 22, listStyle: 'decimal' }}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: 8 }}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: 'var(--text)' }}>{children}</strong>,
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string })?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'var(--cyan)', textDecoration: 'underline' }}
      >
        {children}
      </a>
    ),
  },
};

const headStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  letterSpacing: '-0.02em',
  fontSize: 'clamp(1.3rem, 5vw, 1.6rem)',
  lineHeight: 1.18,
  color: 'var(--text)',
  margin: '36px 0 16px',
};

const paraStyle: React.CSSProperties = {
  color: 'var(--text-dim)',
  fontSize: 'clamp(1.04rem, 2.7vw, 1.14rem)',
  lineHeight: 1.7,
  marginBottom: 22,
};

const formatDate = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
};

/**
 * Reader de artigo — porta `.ins-reader` / `.ir-article` do original.
 * Back button, meta (data · tempo de leitura), título + dek, AuthorCard,
 * ilustração hero (grid pattern), corpo via PortableText e RelatedGrid.
 */
export default function InsightsReader({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: article, isLoading } = useArticle(slug) as {
    data?: SanityArticle;
    isLoading: boolean;
  };
  const { data: related = [] } = useRelatedArticles(slug) as { data?: RelatedArticle[] };

  const readTime = Math.max(1, Math.round(countWords(article?.body) / 200));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '60vh', alignItems: 'center' }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: '2px solid var(--cyan)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!article) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 16,
        }}
      >
        <p style={{ color: 'var(--text-dim)' }}>{t('insp.notfound', 'Artigo não encontrado.')}</p>
        <button
          type="button"
          onClick={() => navigate('/artigos')}
          style={{
            background: 'none',
            border: 0,
            cursor: 'pointer',
            color: 'var(--cyan)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
          }}
        >
          ← {t('insp.back', 'Voltar')}
        </button>
      </div>
    );
  }

  return (
    <div
      className="ins-reader"
      style={{
        maxWidth: 'var(--navy-maxw)',
        margin: '0 auto',
        padding: '0 var(--navy-gutter)',
        boxSizing: 'border-box',
      }}
    >
      <article style={{ paddingTop: 'calc(104px + var(--safe-top, 16px))', paddingBottom: 56 }}>
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate('/artigos')}
          className="ir-back"
          style={{
            appearance: 'none',
            background: 'none',
            border: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            fontFamily: 'var(--font-mono)',
            fontSize: 12.5,
            letterSpacing: '0.03em',
            color: 'var(--text-dim)',
            padding: 0,
            marginBottom: 26,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}
        >
          ← <span>{t('insp.back', 'Voltar')}</span>
        </button>

        {/* Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            fontWeight: 500,
            letterSpacing: '0.03em',
            color: 'var(--muted-navy)',
            marginBottom: 16,
          }}
        >
          <span>{formatDate(article.publishedAt)}</span>
          <span
            style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border-navy)' }}
          />
          <span>
            {readTime} {t('insp.readtime', 'min de leitura')}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 200,
            letterSpacing: '-0.035em',
            fontSize: 'clamp(1.95rem, 8vw, 2.7rem)',
            lineHeight: 1.06,
            color: 'var(--text)',
            textWrap: 'balance',
          }}
        >
          {article.title}
        </h1>

        {/* Author */}
        {article.author && (
          <AuthorCard name={article.author} role={t('insp.byteam', 'Dalton Lab')} />
        )}

        {/* Body */}
        <div style={{ maxWidth: '64ch', marginTop: 32 }}>
          {Array.isArray(article.body) && article.body.length > 0 && (
            <PortableText value={article.body as never} components={readerComponents} />
          )}
        </div>

        {/* Related */}
        <RelatedGrid articles={related} />
      </article>
    </div>
  );
}
