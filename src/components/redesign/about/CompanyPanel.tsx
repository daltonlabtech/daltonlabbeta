import { useTranslation } from 'react-i18next';
import StatsGrid from './StatsGrid';

/**
 * Painel "Empresa" — porta `#panel-company`.
 * 3 parágrafos de missão + grid de stats + quote de fechamento.
 */
export default function CompanyPanel() {
  const { t } = useTranslation();

  const paragraphs: { key: string; fallback: string }[] = [
    {
      key: 'qs.co.p1',
      fallback:
        'Nossa missão é clara: transformar empresas convencionais em organizações agênticas, onde agentes de IA executam tarefas operacionais complexas e humanos se concentram em decisões estratégicas.',
    },
    {
      key: 'qs.co.p2',
      fallback:
        'Enquanto o mercado ainda debate o potencial da IA, nós já vivemos essa realidade. Somos 11 profissionais trabalhando lado a lado com mais de 30 agentes de IA proprietários — uma configuração híbrida que define a nova era do trabalho.',
    },
    {
      key: 'qs.co.p3',
      fallback:
        'Nesse modelo, agentes operam em escala e mantêm operações 24/7, enquanto humanos focam no que fazem de melhor: estratégia, relacionamentos e liderança.',
    },
  ];

  return (
    <div role="tabpanel">
      <span className="eyebrow reveal in" style={{ display: 'inline-flex' }}>
        {t('qs.co.kicker', 'A empresa')}
      </span>

      <div className="reveal in" style={{ marginTop: 18 }}>
        {paragraphs.map((p) => (
          <p
            key={p.key}
            style={{
              color: 'var(--text-dim)',
              fontSize: 'clamp(1.04rem, 2.6vw, 1.2rem)',
              lineHeight: 1.62,
              marginBottom: 20,
              maxWidth: '60ch',
            }}
          >
            {t(p.key, p.fallback)}
          </p>
        ))}
      </div>

      <StatsGrid />

      <div
        className="reveal in"
        style={{ position: 'relative', borderTop: '1px solid var(--border-navy)', paddingTop: 28 }}
      >
        <span
          aria-hidden="true"
          style={{
            display: 'block',
            width: 60,
            height: 2,
            background: 'var(--cyan-deep)',
            borderRadius: 2,
            marginBottom: 18,
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            fontSize: 'clamp(1.5rem, 6.5vw, 2.2rem)',
            lineHeight: 1.16,
            color: 'var(--text)',
            maxWidth: '18ch',
          }}
        >
          {t('qs.co.quote.pre', 'Praticamos o que vendemos: ')}
          <b
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
              fontStyle: 'italic',
              color: 'var(--cyan)',
            }}
          >
            {t('qs.co.quote.em', 'escala infinita')}
          </b>
          {t('qs.co.quote.post', ' através de organizações agênticas.')}
        </p>
      </div>
    </div>
  );
}
