interface FounderCardProps {
  index: string;
  name: string;
  photo: string;
  role: string;
  bio: string;
}

/**
 * Card de fundador — porta `.founder`.
 * Foto 4:5 saturada com hover-zoom + nome + cargo + bio + badge numerado.
 */
export default function FounderCard({ index, name, photo, role, bio }: FounderCardProps) {
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

      <div style={{ flex: 1, padding: '22px 22px 26px' }}>
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
      </div>
    </article>
  );
}
