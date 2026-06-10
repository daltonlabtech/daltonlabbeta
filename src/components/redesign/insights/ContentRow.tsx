import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ContentRowProps {
  date: string;
  title: string;
  /** linha de autoria — autor·cargo (insight) ou fonte (mídia) */
  byline?: string;
  /** destino interno (insight) — usa <Link> */
  to?: string;
  /** destino externo (mídia) — abre em nova aba */
  href?: string;
  isLast?: boolean;
}

/**
 * Linha de conteúdo estilo Anthropic — porta `.ip-row` do original, irmã de
 * `ArticleRow`. Usada por Mídia (link externo, seta ↗) e Insights (link interno,
 * seta →). Metadata (data) → título → byline → seta.
 */
export default function ContentRow({ date, title, byline, to, href, isLast }: ContentRowProps) {
  const [hover, setHover] = useState(false);
  const external = Boolean(href);

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '24px 0',
    paddingLeft: hover ? 6 : 0,
    borderTop: '1px solid var(--border-navy-2)',
    borderBottom: isLast ? '1px solid var(--border-navy-2)' : undefined,
    textDecoration: 'none',
    transition: 'padding-left .3s var(--ease)',
  };

  const inner = (
    <>
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
          <span>{date}</span>
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
          {title}
        </div>

        {byline && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 13 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dim)' }}>{byline}</span>
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
        {external ? '↗' : '→'}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={rowStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      to={to ?? '#'}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={rowStyle}
    >
      {inner}
    </Link>
  );
}
