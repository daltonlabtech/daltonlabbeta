interface FounderCardProps {
  index: string;
  name: string;
  photo: string;
  role: string;
  bio: string;
  linkedin?: string;
  instagram?: string;
}

/**
 * Card de fundador — porta `.founder`.
 * Foto 4:5 saturada com hover-zoom + nome + cargo + bio + badge numerado.
 */
export default function FounderCard({ index, name, photo, role, bio, linkedin, instagram }: FounderCardProps) {
  return (
    <article
      className="founder reveal in"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border-navy)',
        borderRadius: 'var(--navy-radius)',
        background: 'var(--surface)',
        overflow: 'hidden',
        transition: 'border-color .4s, transform .4s, box-shadow .4s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(76,184,232,0.4)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 22px 48px rgba(0,0,0,0.34)';
        const img = e.currentTarget.querySelector('img');
        if (img) (img as HTMLImageElement).style.transform = 'scale(1.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-navy)';
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
        const img = e.currentTarget.querySelector('img');
        if (img) (img as HTMLImageElement).style.transform = '';
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '4 / 5', overflow: 'hidden' }}>
        <img
          src={photo}
          alt={name}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 22%',
            filter: 'saturate(0.92)',
            transition: 'transform .6s var(--ease)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6,13,26,0) 50%, rgba(6,13,26,0.72) 100%)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: 14,
            right: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.08em',
            color: 'var(--text)',
            opacity: 0.7,
          }}
        >
          {index}
        </span>
      </div>

      <div style={{ flex: 1, padding: '22px 22px 26px', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            fontSize: '1.5rem',
            color: 'var(--text)',
            lineHeight: 1.05,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'var(--cyan)',
            marginTop: 7,
          }}
        >
          {role}
        </div>
        <p
          style={{
            color: 'var(--text-dim)',
            fontSize: 15,
            lineHeight: 1.6,
            marginTop: 16,
          }}
        >
          {bio}
        </p>

        {(linkedin || instagram) && (
          <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 20 }}>
            {linkedin && (
              <SocialLink href={linkedin} label={`LinkedIn de ${name}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </SocialLink>
            )}
            {instagram && (
              <SocialLink href={instagram} label={`Instagram de ${name}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.95c-3.15 0-3.52.01-4.76.07-.95.04-1.47.2-1.81.34-.46.18-.78.39-1.12.73-.34.34-.55.66-.73 1.12-.13.34-.3.86-.34 1.81-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.95.2 1.47.34 1.81.18.46.39.78.73 1.12.34.34.66.55 1.12.73.34.13.86.3 1.81.34 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.95-.04 1.47-.2 1.81-.34.46-.18.78-.39 1.12-.73.34-.34.55-.66.73-1.12.13-.34.3-.86.34-1.81.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.95-.2-1.47-.34-1.81a3.02 3.02 0 0 0-.73-1.12 3.02 3.02 0 0 0-1.12-.73c-.34-.13-.86-.3-1.81-.34-1.24-.06-1.61-.07-4.76-.07zm0 3.32a4.57 4.57 0 1 1 0 9.14 4.57 4.57 0 0 1 0-9.14zm0 7.54a2.97 2.97 0 1 0 0-5.94 2.97 2.97 0 0 0 0 5.94zm5.82-7.76a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0z" />
                </svg>
              </SocialLink>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'grid',
        placeItems: 'center',
        color: 'var(--text-dim)',
        transition: 'color .3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--cyan)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-dim)';
      }}
    >
      {children}
    </a>
  );
}
