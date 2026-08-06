import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthorCard from './AuthorCard';
import { findInsight, L, type Block } from '@/data/insightsContent';

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

const quoteStyle: React.CSSProperties = {
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
};

function BlockView({ block, lang }: { block: Block; lang: string }) {
  const text = L(block, lang);
  if (block.t === 'h') return <h2 style={headStyle}>{text}</h2>;
  if (block.t === 'q') return <blockquote style={quoteStyle}>{text}</blockquote>;
  return <p style={paraStyle}>{text}</p>;
}

/**
 * Leitor de insight estático — porta `.ir-article` do original, espelhando o
 * visual de `InsightsReader.tsx` (Sanity), mas lendo de `INSIGHTS`
 * (`src/data/insightsContent.ts`). Back, meta (data · tempo de leitura), título,
 * dek, AuthorCard e corpo (blocos h/p/q).
 */
export default function StaticInsightReader({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language?.startsWith('pt') ? 'pt' : 'en';
  const insight = findInsight(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [id]);

  if (!insight) {
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
          <span>{L(insight.date, lang)}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border-navy)' }} />
          <span>
            {insight.read} {t('insp.readtime', 'min de leitura')}
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
          {L(insight.title, lang)}
        </h1>

        {/* Dek */}
        <p
          style={{
            color: 'var(--text-dim)',
            fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
            lineHeight: 1.5,
            marginTop: 16,
            maxWidth: '52ch',
          }}
        >
          {L(insight.dek, lang)}
        </p>

        {/* Author */}
        <AuthorCard
          name={insight.author.name}
          role={L(insight.author.role, lang)}
          photo={insight.author.photo}
          linkedin={insight.author.linkedin}
        />

        {/* Body */}
        <div style={{ maxWidth: '64ch', marginTop: 32 }}>
          {insight.body.map((block, i) => (
            <BlockView key={i} block={block} lang={lang} />
          ))}
        </div>
      </article>
    </div>
  );
}
