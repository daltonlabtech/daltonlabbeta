import { useTranslation } from 'react-i18next';
import { ESTAGIO_PUBLICO, SETOR_LABELS, type AgenticCase } from '@/data/agenticCases';

interface CasoReaderProps {
  caso: AgenticCase;
  onBack: () => void;
}

/**
 * Leitor de um caso — port do renderReader() do protótipo: headline, KPIs em
 * lista, meta (setor/estágio/papel), Desafio com pergunta-síntese, Solução com
 * o fluxo do agente (timeline horizontal no desktop, vertical no mobile) e o
 * comparativo de impacto quando existir.
 */
export default function CasoReader({ caso, onBack }: CasoReaderProps) {
  const { t, i18n } = useTranslation();
  const lang: 'pt' | 'en' = i18n.language?.startsWith('en') ? 'en' : 'pt';
  const c = caso;

  return (
    <section className="caso-reader">
      <style>{`
        .caso-reader { max-width: 720px; margin: 0 auto; padding: 96px 22px 56px; }
        .cr-volta-row { display: flex; align-items: center; gap: 16px; }
        .cr-volta { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 9px 18px; border-radius: 999px; border: 1px solid var(--line); background: rgba(16,20,27,.7); backdrop-filter: blur(8px); color: var(--ink2); font: 400 13.5px var(--font-sans); white-space: nowrap; cursor: pointer; transition: color .2s, border-color .2s; }
        .cr-volta:hover { color: var(--ink); border-color: rgba(162,182,206,.45); }
        .cr-volta-row .setor { font-family: var(--font-mono); font-size: 10px; letter-spacing: .4em; color: var(--ink3); text-transform: uppercase; }
        .caso-reader h1 { margin-top: 22px; font-weight: 200; font-size: clamp(24px, 2.4vw, 36px); line-height: 1.15; color: var(--ink); text-wrap: balance; }
        .cr-papel { margin-top: 14px; font-family: var(--font-mono); font-size: 10px; letter-spacing: .18em; line-height: 1.8; color: var(--ink3); text-transform: uppercase; }
        .cr-kpis { margin-top: 36px; }
        .cr-kpi { display: flex; flex-direction: column; gap: 0; padding: 16px 0; }
        .cr-kpi + .cr-kpi { border-top: 1px solid var(--line-soft); }
        .cr-kpi .rot { font-size: 14.5px; line-height: 1.5; color: var(--ink2); max-width: 44ch; }
        .cr-kpi .num { margin-top: 7px; font-size: 30px; font-weight: 200; line-height: 1.05; color: var(--ink); white-space: nowrap; }
        .cr-meta { margin-top: 44px; border-top: 1px solid var(--line-soft); }
        .cr-meta > div { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; padding: 13px 0; border-bottom: 1px solid var(--line-soft); font-family: var(--font-mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase; }
        .cr-meta .k { color: var(--ink3); }
        .cr-meta .v { color: var(--ink2); text-align: right; }
        .cr-sec { margin-top: 60px; }
        .cr-sec-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: .4em; color: var(--ink3); text-transform: uppercase; }
        .cr-sec .p1 { margin-top: 16px; font-size: 15px; line-height: 1.6; color: var(--ink2); max-width: 60ch; }
        .cr-sec .p2 { margin-top: 14px; font-size: 13.5px; line-height: 1.6; color: var(--ink3); max-width: 60ch; }
        .cr-pergunta { margin-top: 48px; font-weight: 200; font-size: clamp(21px, 2.2vw, 28px); line-height: 1.35; color: var(--ink); text-align: center; text-wrap: balance; }
        .cr-op-head { margin-top: 38px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .cr-op-head h2 { font-size: 21px; font-weight: 200; line-height: 1.3; color: var(--ink); }
        .cr-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line); background: rgba(16,20,27,.7); backdrop-filter: blur(8px); font-family: var(--font-mono); font-size: 8.5px; letter-spacing: .16em; color: var(--ink2); white-space: nowrap; text-transform: uppercase; }
        .cr-chip i { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px 1px rgba(143,230,255,.7); flex: none; }
        .cr-fluxo { position: relative; margin-top: 24px; }
        .cr-fluxo .linha { position: absolute; left: 3.5px; top: 6px; bottom: 6px; width: 1px; background: var(--line); }
        .cr-fluxo .seta { display: none; }
        .cr-fluxo .passos { position: relative; display: flex; flex-direction: column; gap: 22px; }
        .cr-fluxo .passo { display: flex; align-items: flex-start; gap: 15px; }
        .cr-fluxo .dot { margin-top: 5px; width: 8px; height: 8px; border-radius: 50%; background: var(--ink2); box-shadow: 0 0 0 4px #0a0c12; flex: none; }
        .cr-fluxo .passo.humano .dot { background: var(--accent); box-shadow: 0 0 0 4px #0a0c12, 0 0 14px 2px rgba(143,230,255,.65), 0 0 34px 6px rgba(143,230,255,.25); }
        .cr-fluxo .txt { font-size: 13.5px; line-height: 1.5; color: var(--ink2); }
        .cr-fluxo .passo.humano .txt { color: var(--ink); }
        .cr-comp { margin-top: 22px; border: 1px solid var(--line-soft); border-radius: 12px; background: rgba(14,18,24,.72); padding: 26px 30px; }
        .cr-comp .lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: .4em; color: var(--ink3); text-transform: uppercase; }
        .cr-comp .row { margin-top: 20px; display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
        .cr-comp .cel { flex: 1; min-width: 150px; }
        .cr-comp .cel .k { font-family: var(--font-mono); font-size: 10px; letter-spacing: .14em; color: var(--ink3); text-transform: uppercase; }
        .cr-comp .cel .v { margin-top: 9px; font-size: 25px; font-weight: 200; color: var(--ink); }
        .cr-comp .arrow { font-size: 20px; color: var(--accent); text-shadow: 0 0 18px rgba(143,230,255,.5); }
        .cr-comp .nota { margin-top: 18px; font-family: var(--font-mono); font-size: 10px; letter-spacing: .06em; line-height: 1.7; color: var(--ink3); }
        .cr-center { display: flex; justify-content: center; margin-top: 64px; border-top: 1px solid var(--line-soft); padding-top: 36px; }
        @media (min-width: 760px) {
          .caso-reader { padding: 130px 40px 72px; }
          .cr-kpi { flex-direction: row; align-items: baseline; justify-content: space-between; gap: 24px; }
          .cr-kpi .num { margin-top: 0; font-size: 38px; text-align: right; }
          .cr-fluxo { margin-top: 36px; }
          .cr-fluxo .linha { top: 3.5px; left: 10%; right: 10%; bottom: auto; width: auto; height: 1px; }
          .cr-fluxo .seta { display: block; position: absolute; top: 1.5px; width: 5px; height: 5px; border-top: 1px solid rgba(162,182,206,.45); border-right: 1px solid rgba(162,182,206,.45); transform: translateX(-70%) rotate(45deg); }
          .cr-fluxo .passos { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
          .cr-fluxo .passo { flex-direction: column; align-items: center; text-align: center; gap: 14px; }
          .cr-fluxo .dot { margin-top: 0; }
          .cr-fluxo .txt { font-size: 12.5px; line-height: 1.45; max-width: 130px; }
        }
      `}</style>

      <div className="cr-volta-row">
        <button className="cr-volta" type="button" onClick={onBack}>
          {t('casos.back', '← Voltar para os casos')}
        </button>
        <span className="setor">{SETOR_LABELS[c.setor][lang]}</span>
      </div>

      <h1>{c.headline[lang]}</h1>
      <div className="cr-papel">
        {c.papel[lang]} · {c.cliente[lang]}
      </div>

      <div className="cr-kpis">
        {c.kpis.map((k) => (
          <div className="cr-kpi" key={k.numero.pt}>
            <div className="rot">{k.rotulo[lang]}</div>
            <div className="num">{k.numero[lang]}</div>
          </div>
        ))}
      </div>

      <div className="cr-meta">
        <div>
          <span className="k">{t('casos.meta.setor', 'Setor')}</span>
          <span className="v">{SETOR_LABELS[c.setor][lang]}</span>
        </div>
        <div>
          <span className="k">{t('casos.meta.estagio', 'Estágio')}</span>
          <span className="v">{ESTAGIO_PUBLICO[c.estagio][lang]}</span>
        </div>
        <div>
          <span className="k">{t('casos.meta.papel', 'Papel do agente')}</span>
          <span className="v">{c.papel[lang]}</span>
        </div>
      </div>

      <div className="cr-sec">
        <div className="cr-sec-label">{t('casos.sec.desafio', 'Desafio')}</div>
        <p className="p1">{c.problema[lang]}</p>
        <p className="p2">{c.comoTrabalhava[lang]}</p>
        <p className="cr-pergunta">
          {c.pergunta.antes[lang]}
          <em className="em">{c.pergunta.em[lang]}</em>
          {c.pergunta.depois[lang]}
        </p>
      </div>

      <div className="cr-sec">
        <div className="cr-sec-label">{t('casos.sec.solucao', 'Solução')}</div>
        <p className="p1">{c.oQueMudou[lang]}</p>
        <div className="cr-op-head">
          <h2>{t('casos.opTitle', 'O agente na operação')}</h2>
          <span className="cr-chip">
            <i />
            {t('casos.chip', 'Humano acima do loop')}
          </span>
        </div>
        <div className="cr-fluxo">
          <div className="linha" />
          {[20, 40, 60, 80].map((x) => (
            <div className="seta" key={x} style={{ left: `${x}%` }} />
          ))}
          <div className="passos">
            {c.fluxo.map((passo, i) => (
              <div className={`passo${i === c.fluxo.length - 1 ? ' humano' : ''}`} key={passo.pt}>
                <div className="dot" />
                <div className="txt">{passo[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {c.comparativo && (
        <div className="cr-sec">
          <div className="cr-sec-label">{t('casos.sec.impacto', 'Impacto')}</div>
          <div className="cr-comp">
            <div className="lbl">{c.comparativo.label[lang]}</div>
            <div className="row">
              <div className="cel">
                <div className="k">{c.comparativo.de.k[lang]}</div>
                <div className="v">{c.comparativo.de.v}</div>
              </div>
              <div className="arrow" aria-hidden="true">
                →
              </div>
              <div className="cel">
                <div className="k">{c.comparativo.para.k[lang]}</div>
                <div className="v">{c.comparativo.para.v}</div>
              </div>
            </div>
            <div className="nota">{c.comparativo.nota[lang]}</div>
          </div>
        </div>
      )}

      <div className="cr-center">
        <button className="btn-s" type="button" onClick={onBack} style={{ cursor: 'pointer' }}>
          {t('casos.back', '← Voltar para os casos')}
        </button>
      </div>
    </section>
  );
}
