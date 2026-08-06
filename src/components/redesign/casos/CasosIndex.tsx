import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { trackCtaClick } from '@/lib/analytics';
import {
  AGENTIC_CASES,
  SETOR_CORES,
  SETOR_LABELS,
  SETORES_ORDEM,
  type SetorId,
} from '@/data/agenticCases';

const CONTACT_URL = 'https://formulario.daltonlab.ai/';
type Filtro = 'Todos' | SetorId;

interface CasosIndexProps {
  onOpen: (slug: string) => void;
}

/**
 * Índice de /casos — hero, pills de filtro por setor (pill ativa pintada com a
 * cor do setor), grid de cards-vitrine e fecho com CTA. Port do renderIndex()
 * do protótipo.
 */
export default function CasosIndex({ onOpen }: CasosIndexProps) {
  const { t, i18n } = useTranslation();
  const lang: 'pt' | 'en' = i18n.language?.startsWith('en') ? 'en' : 'pt';
  const [filtro, setFiltro] = useState<Filtro>('Todos');
  const [fading, setFading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const trocarFiltro = (f: Filtro) => {
    if (f === filtro) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setFiltro(f);
      return;
    }
    setFading(true);
    window.setTimeout(() => {
      setFiltro(f);
      setFading(false);
    }, 240);
  };

  const pills: Filtro[] = ['Todos', ...SETORES_ORDEM];

  return (
    <>
      <style>{`
        .casos-hero { padding: 110px 22px 28px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .casos-hero h1 { margin-top: 18px; font-weight: 200; font-size: clamp(26px, 7.8vw, 31px); line-height: 1.08; letter-spacing: -0.01em; color: var(--ink); max-width: 840px; text-wrap: balance; }
        .casos-wrap { max-width: 1120px; margin: 0 auto; padding: 0 0 56px; }
        .casos-pills { display: flex; gap: 8px; overflow-x: auto; padding: 4px 22px; scrollbar-width: none; -webkit-mask-image: linear-gradient(90deg, transparent, #000 22px, #000 calc(100% - 22px), transparent); mask-image: linear-gradient(90deg, transparent, #000 22px, #000 calc(100% - 22px), transparent); }
        .casos-pills::-webkit-scrollbar { display: none; }
        .casos-pill { flex: none; padding: 10px 20px; min-height: 40px; border-radius: 999px; font-size: 13.5px; cursor: pointer; white-space: nowrap; border: 1px solid var(--line); background: rgba(16,20,27,.7); backdrop-filter: blur(8px); color: var(--ink2); transition: background .2s, color .2s, border-color .2s; }
        .casos-pill:hover { color: var(--ink); }
        .casos-grid { margin-top: 24px; padding: 0 22px; display: grid; grid-template-columns: 1fr; gap: 14px; }
        .casos-grid.fading .caso { opacity: 0; }
        .caso { position: relative; display: flex; flex-direction: column; gap: 12px; padding: 20px 20px 16px; border-radius: 12px; background: rgba(14,18,24,.72); border: 1px solid var(--line-soft); cursor: pointer; transition: opacity .25s ease, transform .2s ease, border-color .25s ease; text-align: left; font: inherit; color: inherit; }
        .caso:hover { transform: translateY(-2px); border-color: var(--line); }
        .caso .topbar { position: absolute; top: -1px; left: -1px; right: -1px; height: 2px; border-radius: 12px 12px 0 0; }
        .caso .id { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .22em; line-height: 1.7; color: var(--ink3); text-transform: uppercase; }
        .caso .num { font-size: 32px; font-weight: 200; line-height: 1.05; color: var(--ink); }
        .caso .frase { font-size: 13px; line-height: 1.45; color: var(--ink2); }
        .caso .cli { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .05em; line-height: 1.6; color: var(--ink3); }
        .caso .miolo { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; gap: 7px; padding: 8px 0; }
        .casos-fecho { padding: 20px 22px 36px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .casos-fecho p { font-weight: 200; font-size: clamp(24px, 2.2vw, 34px); line-height: 1.25; color: var(--ink); }
        .casos-fecho .acts { margin-top: 22px; display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        @media (min-width: 760px) {
          .casos-hero { padding: 150px 40px 36px; }
          .casos-hero h1 { font-size: clamp(30px, 3.4vw, 46px); }
          .casos-wrap { padding: 0 40px 64px; }
          .casos-pills { flex-wrap: wrap; justify-content: center; gap: 10px; overflow-x: visible; padding: 0; -webkit-mask-image: none; mask-image: none; }
          .casos-grid { margin-top: 32px; padding: 0; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .casos-fecho { padding: 28px 40px 48px; }
        }
      `}</style>

      <section className="casos-hero">
        <div className="mono-label">{t('casos.label', 'Casos')}</div>
        <h1>
          <Trans i18nKey="casos.title" components={{ em: <em className="em" /> }}>
            Organizações que já operam com <em className="em">agentes de IA</em>.
          </Trans>
        </h1>
      </section>

      <section className="casos-wrap">
        <div className="casos-pills" role="group" aria-label={t('casos.filterAria', 'Filtrar por setor')}>
          {pills.map((f) => {
            const on = f === filtro;
            const cor = f === 'Todos' ? 'var(--accent)' : SETOR_CORES[f];
            const label = f === 'Todos' ? t('casos.todos', 'Todos') : SETOR_LABELS[f][lang];
            return (
              <button
                key={f}
                type="button"
                className="casos-pill"
                aria-pressed={on}
                onClick={() => trocarFiltro(f)}
                style={
                  on
                    ? { background: cor, borderColor: cor, color: '#04121a', boxShadow: `0 0 26px ${f === 'Todos' ? 'rgba(143,230,255,.28)' : `${SETOR_CORES[f]}55`}` }
                    : undefined
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className={`casos-grid${fading ? ' fading' : ''}`} ref={gridRef}>
          {AGENTIC_CASES.map((c) => {
            const oculto = filtro !== 'Todos' && c.setor !== filtro;
            if (oculto) return null;
            return (
              <button
                key={c.slug}
                type="button"
                className="caso"
                aria-label={c.papel[lang]}
                onClick={() => onOpen(c.slug)}
              >
                <span className="topbar" style={{ background: SETOR_CORES[c.setor] }} />
                <span className="id">
                  {SETOR_LABELS[c.setor][lang]} · {c.papel[lang]}
                </span>
                <span className="miolo">
                  <span className="num">{c.vitrine.num[lang]}</span>
                  <span className="frase">{c.vitrine.frase[lang]}</span>
                </span>
                <span className="cli">{c.cliente[lang]}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="casos-fecho">
        <p>
          <Trans i18nKey="casos.fecho" components={{ em: <em className="em" /> }}>
            Seja uma organização <em className="em">agêntica</em>.
          </Trans>
        </p>
        <div className="acts">
          <a
            className="btn-p"
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick(t('hero.cta1', 'Fale com um especialista'), 'casos_fecho', CONTACT_URL)}
          >
            {t('hero.cta1', 'Fale com um especialista')}
          </a>
        </div>
      </section>
    </>
  );
}
