import { useTranslation } from 'react-i18next';

interface Stat {
  n: string;
  /** suffix renderizado em serif itálico ciano (ex.: "+") */
  suffix?: string;
  labelKey: string;
  labelFallback: string;
}

const STATS: Stat[] = [
  { n: '11', labelKey: 'qs.stat1.l', labelFallback: 'profissionais' },
  { n: '30', suffix: '+', labelKey: 'qs.stat2.l', labelFallback: 'agentes de IA proprietários' },
  { n: '4', labelKey: 'qs.stat3.l', labelFallback: 'continentes' },
  { n: '24/7', labelKey: 'qs.stat4.l', labelFallback: 'operação contínua' },
];

/**
 * Grid de 4 stat boxes — porta `.qs-stats` (2×2 mobile, 1×4 ≥720px).
 */
export default function StatsGrid() {
  const { t } = useTranslation();

  return (
    <div
      className="qs-stats reveal in"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        margin: '34px 0 36px',
      }}
    >
      {STATS.map((s) => (
        <div
          key={s.labelKey}
          style={{
            border: '1px solid var(--border-navy)',
            borderRadius: 'var(--navy-radius-sm)',
            background: 'var(--surface)',
            padding: '20px 18px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              fontSize: 'clamp(1.9rem, 9vw, 2.6rem)',
              lineHeight: 1,
              color: 'var(--text)',
            }}
          >
            {s.n}
            {s.suffix && (
              <b
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: 'var(--cyan)',
                }}
              >
                {s.suffix}
              </b>
            )}
          </div>
          <div
            style={{
              marginTop: 8,
              color: 'var(--muted-navy)',
              fontSize: 13.5,
              lineHeight: 1.35,
            }}
          >
            {t(s.labelKey, s.labelFallback)}
          </div>
        </div>
      ))}
    </div>
  );
}
