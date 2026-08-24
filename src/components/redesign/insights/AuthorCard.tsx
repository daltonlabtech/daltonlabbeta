import { useState } from 'react';

interface AuthorCardProps {
  name: string;
  /** cargo — opcional; o schema do Sanity não tem este campo */
  role?: string;
  /** foto — opcional; o schema do Sanity não tem este campo */
  photo?: string;
  /** url do LinkedIn — opcional; o schema do Sanity não tem este campo */
  linkedin?: string;
}

/**
 * Cartão de autor — porta `.ir-author` do original.
 *
 * NOTA de schema: o tipo `article` do Sanity expõe `author` apenas como string
 * (sem foto, cargo ou LinkedIn). Renderizamos as iniciais como avatar quando não
 * há foto e ocultamos o botão de LinkedIn quando não há URL — sem inventar dados.
 */
export default function AuthorCard({ name, role, photo, linkedin }: AuthorCardProps) {
  const [liHover, setLiHover] = useState(false);
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        marginTop: 26,
        padding: 16,
        background: 'var(--surface)',
        border: '1px solid var(--border-navy)',
        borderRadius: 'var(--navy-radius)',
      }}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            border: '1px solid var(--border-navy)',
            flex: 'none',
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid var(--border-navy)',
            background: 'var(--surface-2)',
            color: 'var(--cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 15,
            fontWeight: 600,
            flex: 'none',
          }}
        >
          {initials || '·'}
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: '1rem',
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}
        >
          {name}
        </div>
        {role && (
          <div style={{ fontSize: 13, color: 'var(--muted-navy)', marginTop: 2 }}>{role}</div>
        )}
      </div>

      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn — ${name}`}
          onMouseEnter={() => setLiHover(true)}
          onMouseLeave={() => setLiHover(false)}
          style={{
            flex: 'none',
            width: 38,
            height: 38,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: liHover ? 'var(--cyan)' : 'var(--text-dim)',
            transform: liHover ? 'translateY(-2px)' : undefined,
            transition: 'color .3s, transform .3s',
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>
      )}
    </div>
  );
}
