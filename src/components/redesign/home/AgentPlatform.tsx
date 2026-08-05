import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Plataforma Agêntica — catálogo dos agentes da Dalton Lab organizados por
 * departamento (tabs) com modal de detalhe. Conteúdo portado do `mobile.html`
 * (Isabel), adaptado para a paleta azul/ciano e para React + i18n.
 * Renderizado dentro do OrgChartSection (mesmo bloco "empresa operada por IA").
 */

type Status = 'ativo' | 'atencao' | 'inativo';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: Status;
  actions: number;
  accuracy: number;
  dept: string;
}

const AGENTS: Agent[] = [
  { id: 'neo', name: 'Neo', role: 'Orquestrador Estratégico', status: 'ativo', actions: 18, accuracy: 97, dept: 'ceo' },
  { id: 'agenda', name: 'Agenda', role: 'Gestão de Agenda Executiva', status: 'inativo', actions: 3, accuracy: 94, dept: 'ceo' },
  { id: 'sdr', name: 'SDR Agent', role: 'Prospecção e Qualificação', status: 'atencao', actions: 24, accuracy: 81, dept: 'vendas' },
  { id: 'crm', name: 'CRM Agent', role: 'Gestão de Relacionamento', status: 'ativo', actions: 31, accuracy: 98, dept: 'vendas' },
  { id: 'proposal', name: 'Proposal', role: 'Geração de Propostas', status: 'inativo', actions: 4, accuracy: 99, dept: 'vendas' },
  { id: 'content', name: 'Content', role: 'Content Strategist', status: 'ativo', actions: 9, accuracy: 90, dept: 'marketing' },
  { id: 'benchmark', name: 'Benchmark', role: 'Análise de Concorrência', status: 'ativo', actions: 12, accuracy: 88, dept: 'marketing' },
  { id: 'social', name: 'Social', role: 'Gestão de Redes Sociais', status: 'inativo', actions: 6, accuracy: 92, dept: 'marketing' },
  { id: 'health', name: 'Health Score', role: 'Monitoramento de Clientes', status: 'atencao', actions: 15, accuracy: 94, dept: 'cs' },
  { id: 'cs_onboarding', name: 'CS Onboarding', role: 'Onboarding de Clientes', status: 'ativo', actions: 8, accuracy: 96, dept: 'cs' },
  { id: 'nps', name: 'NPS', role: 'Pesquisa de Satisfação', status: 'inativo', actions: 2, accuracy: 100, dept: 'cs' },
  { id: 'recruiter', name: 'Recruiter', role: 'Recrutamento e Seleção', status: 'ativo', actions: 22, accuracy: 91, dept: 'people' },
  { id: 'culture_pulse', name: 'Culture Pulse', role: 'Monitoramento de Cultura', status: 'ativo', actions: 7, accuracy: 87, dept: 'people' },
  { id: 'oneonone', name: '1:1 Prep', role: 'Preparação de Reuniões 1:1', status: 'inativo', actions: 4, accuracy: 100, dept: 'people' },
  { id: 'finance', name: 'Finance', role: 'Análise Financeira', status: 'ativo', actions: 14, accuracy: 99, dept: 'financeiro' },
  { id: 'contract', name: 'Contract', role: 'Gestão de Contratos', status: 'ativo', actions: 9, accuracy: 97, dept: 'financeiro' },
  { id: 'compliance', name: 'Compliance', role: 'Conformidade e LGPD', status: 'inativo', actions: 1, accuracy: 100, dept: 'financeiro' },
];

const STATUS_META: Record<Status, { key: string; def: string; color: string }> = {
  ativo: { key: 'platform.status.ativo', def: 'Ativo', color: '#8fe6ff' },
  atencao: { key: 'platform.status.atencao', def: 'Atenção', color: '#F0A04C' },
  inativo: { key: 'platform.status.inativo', def: 'Inativo', color: 'rgba(142,180,212,0.45)' },
};

export default function AgentPlatform() {
  const { t } = useTranslation();

  const DEPTS = useMemo(
    () => [
      { id: 'vendas', label: t('platform.dept.vendas', 'Vendas') },
      { id: 'marketing', label: t('platform.dept.marketing', 'Marketing') },
      { id: 'cs', label: t('platform.dept.cs', 'Customer Success') },
      { id: 'people', label: t('platform.dept.people', 'People') },
      { id: 'financeiro', label: t('platform.dept.financeiro', 'Financeiro') },
      { id: 'ceo', label: t('platform.dept.ceo', 'CEO Office') },
    ],
    [t],
  );

  const [dept, setDept] = useState('vendas');
  const [openId, setOpenId] = useState<string | null>(null);

  const list = AGENTS.filter((a) => a.dept === dept);
  const open = AGENTS.find((a) => a.id === openId) || null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenId(null);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const stats = [
    { value: '23', label: t('platform.stats.agents', 'Agentes') },
    { value: '18', label: t('platform.stats.active', 'Ativos agora') },
    { value: '6', label: t('platform.stats.depts', 'Departamentos') },
    { value: '24/7', label: t('platform.stats.ops', 'Operação') },
  ];

  return (
    <div className="dl-platform" style={{ marginTop: 56 }}>
      <div className="text-center" style={{ marginBottom: 22 }}>
        <span className="eyebrow" style={{ justifyContent: 'center' }}>
          {t('platform.tag', 'Plataforma Agêntica')}
        </span>
        <p
          style={{
            maxWidth: '60ch',
            margin: '14px auto 0',
            fontSize: '1rem',
            lineHeight: 1.6,
            color: 'var(--text-dim)',
          }}
        >
          {t(
            'platform.sub',
            '23 agentes autônomos coordenados pelo Orquestrador Central — executando decisões em tempo real em 6 departamentos.',
          )}
        </p>
      </div>

      {/* stats */}
      <div className="dl-pf-stats">
        {stats.map((s) => (
          <div key={s.label} className="dl-pf-stat">
            <div className="dl-pf-stat-v">{s.value}</div>
            <div className="dl-pf-stat-l">{s.label}</div>
          </div>
        ))}
      </div>

      {/* dept tabs */}
      <div className="dl-pf-tabs" role="tablist" aria-label={t('platform.tag', 'Plataforma Agêntica')}>
        {DEPTS.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={dept === d.id}
            className={`dl-pf-tab${dept === d.id ? ' is-active' : ''}`}
            onClick={() => setDept(d.id)}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* agent cards */}
      <div className="dl-pf-grid">
        {list.map((a) => {
          const st = STATUS_META[a.status];
          return (
            <button key={a.id} type="button" className="dl-pf-card" onClick={() => setOpenId(a.id)}>
              <span className="dl-pf-avatar" aria-hidden="true">
                {a.name.charAt(0)}
              </span>
              <span className="dl-pf-card-main">
                <span className="dl-pf-card-name">{a.name}</span>
                <span className="dl-pf-card-role">{a.role}</span>
              </span>
              <span className="dl-pf-status" style={{ color: st.color }}>
                <span className="dl-pf-dot" style={{ background: st.color }} />
                {t(st.key, st.def)}
              </span>
            </button>
          );
        })}
      </div>

      {/* modal */}
      {open && (
        <div className="dl-pf-overlay" onClick={() => setOpenId(null)} role="dialog" aria-modal="true">
          <div className="dl-pf-sheet" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="dl-pf-close" aria-label={t('platform.close', 'Fechar')} onClick={() => setOpenId(null)}>
              ×
            </button>
            <div className="dl-pf-sheet-head">
              <span className="dl-pf-avatar dl-pf-avatar--lg" aria-hidden="true">
                {open.name.charAt(0)}
              </span>
              <div>
                <div className="dl-pf-sheet-name">{open.name}</div>
                <div className="dl-pf-card-role">{open.role}</div>
              </div>
            </div>
            <div className="dl-pf-sheet-stats">
              <div>
                <div className="dl-pf-sheet-v">{open.accuracy}%</div>
                <div className="dl-pf-card-role">{t('platform.accuracy', 'Acurácia')}</div>
              </div>
              <div>
                <div className="dl-pf-sheet-v">{open.actions}</div>
                <div className="dl-pf-card-role">{t('platform.actions', 'Ações hoje')}</div>
              </div>
              <div>
                <div className="dl-pf-sheet-v" style={{ color: STATUS_META[open.status].color }}>
                  {t(STATUS_META[open.status].key, STATUS_META[open.status].def)}
                </div>
                <div className="dl-pf-card-role">{t('platform.statusLabel', 'Status')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dl-pf-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
          max-width: 560px; margin: 0 auto 26px;
        }
        .dl-pf-stat { text-align: center; padding: 14px 8px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); }
        .dl-pf-stat-v { font-family: var(--font-display); font-size: clamp(1.2rem, 4vw, 1.5rem); font-weight: 800; letter-spacing: -0.03em; color: var(--cyan); }
        .dl-pf-stat-l { font-size: 10.5px; color: var(--text-dim); margin-top: 4px; }
        .dl-pf-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 22px; }
        .dl-pf-tab {
          padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 600;
          border: 1px solid var(--border); background: transparent; color: var(--text-dim);
          cursor: pointer; transition: border-color .25s, color .25s, background .25s;
        }
        .dl-pf-tab:hover { border-color: rgba(143,230,255,0.40); color: var(--text); }
        .dl-pf-tab.is-active { background: var(--cyan); color: var(--accent-ink, #07131f); border-color: var(--cyan); }
        .dl-pf-grid { display: grid; grid-template-columns: 1fr; gap: 10px; max-width: 720px; margin: 0 auto; }
        @media (min-width: 720px) { .dl-pf-grid { grid-template-columns: 1fr 1fr; } }
        .dl-pf-card {
          display: flex; align-items: center; gap: 14px; width: 100%; text-align: left;
          padding: 14px 16px; border: 1px solid var(--border); border-radius: 14px;
          background: var(--surface); color: var(--text); cursor: pointer;
          transition: border-color .25s, transform .25s, box-shadow .25s;
        }
        .dl-pf-card:hover { border-color: rgba(143,230,255,0.40); transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,0.28); }
        .dl-pf-avatar {
          flex: none; width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center;
          font-family: var(--font-display); font-weight: 800; font-size: 16px;
          color: var(--cyan); background: rgba(143,230,255,0.12); border: 1px solid rgba(143,230,255,0.25);
        }
        .dl-pf-avatar--lg { width: 52px; height: 52px; font-size: 22px; border-radius: 14px; }
        .dl-pf-card-main { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
        .dl-pf-card-name { font-family: var(--font-display); font-weight: 700; font-size: 1rem; letter-spacing: -0.01em; }
        .dl-pf-card-role { font-size: 12.5px; color: var(--text-dim); }
        .dl-pf-status { flex: none; display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10.5px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
        .dl-pf-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
        .dl-pf-overlay { position: fixed; inset: 0; z-index: 90; background: rgba(6,13,26,0.72); backdrop-filter: blur(4px); display: flex; align-items: flex-end; justify-content: center; padding: 0; }
        @media (min-width: 720px) { .dl-pf-overlay { align-items: center; padding: 20px; } }
        .dl-pf-sheet {
          position: relative; width: 100%; max-width: 460px; background: var(--bg-soft, #0F2440);
          border: 1px solid var(--border); border-radius: 20px 20px 0 0; padding: 30px 24px 34px;
        }
        @media (min-width: 720px) { .dl-pf-sheet { border-radius: 20px; } }
        .dl-pf-close { position: absolute; top: 14px; right: 16px; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border); background: transparent; color: var(--text-dim); font-size: 20px; line-height: 1; cursor: pointer; }
        .dl-pf-close:hover { color: var(--text); border-color: rgba(143,230,255,0.40); }
        .dl-pf-sheet-head { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
        .dl-pf-sheet-name { font-family: var(--font-display); font-weight: 800; font-size: 1.4rem; letter-spacing: -0.02em; }
        .dl-pf-sheet-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .dl-pf-sheet-stats > div { text-align: center; padding: 14px 6px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); }
        .dl-pf-sheet-v { font-family: var(--font-display); font-size: 1.35rem; font-weight: 800; letter-spacing: -0.03em; color: var(--cyan); }
      `}</style>
    </div>
  );
}
