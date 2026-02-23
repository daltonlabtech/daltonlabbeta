import { User, Bot, Database } from 'lucide-react';

const PulseDot = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="w-1.5 h-1.5 rounded-full pulse-dot"
    style={{ backgroundColor: 'rgba(16,24,35,0.25)', animationDelay: `${delay}s` }}
  />
);

const FlowConnector = ({ delay = 0 }: { delay?: number }) => (
  <div className="flex justify-center h-5 md:h-6 overflow-hidden">
    <div className="relative w-px h-full" style={{ backgroundColor: 'rgba(16,24,35,0.08)' }}>
      <div
        className="absolute w-px flow-drop"
        style={{ height: 6, backgroundColor: 'rgba(16,24,35,0.25)', animationDelay: `${delay}s` }}
      />
    </div>
  </div>
);

const NodeCard = ({
  label,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  sub?: string;
  icon: typeof User;
  accent?: string;
}) => (
  <div
    className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl border border-black/[0.06]"
    style={{ backgroundColor: '#FAFAF8' }}
  >
    <Icon
      className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0"
      style={{ color: accent || 'rgba(16,24,35,0.35)' }}
      strokeWidth={1.8}
    />
    <div className="flex flex-col">
      <span
        className="font-inter font-semibold text-[10px] md:text-xs leading-tight"
        style={{ color: 'rgba(16,24,35,0.8)' }}
      >
        {label}
      </span>
      {sub && (
        <span
          className="font-inter text-[8px] md:text-[9px] leading-tight"
          style={{ color: 'rgba(16,24,35,0.4)' }}
        >
          {sub}
        </span>
      )}
    </div>
  </div>
);

const LinkPill = ({ label, delay = 0 }: { label: string; delay?: number }) => (
  <div
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/[0.06]"
    style={{ backgroundColor: '#FAFAF8' }}
  >
    <PulseDot delay={delay} />
    <span
      className="font-inter font-medium text-[9px] md:text-[10px]"
      style={{ color: 'rgba(16,24,35,0.45)' }}
    >
      {label}
    </span>
  </div>
);

const AgenticArchitecture = () => (
  <div
    className="w-full rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10 overflow-hidden border border-black/[0.04]"
    style={{ backgroundColor: '#F0EEEB' }}
  >
    <p
      className="font-inter font-semibold text-[9px] md:text-[10px] tracking-widest uppercase text-center mb-5 md:mb-6"
      style={{ color: 'rgba(16,24,35,0.35)' }}
    >
      Arquitetura Agêntica
    </p>

    {/* Layer 1 — Liderança */}
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-1">
      <NodeCard label="CEO" sub="Estratégia" icon={User} accent="#3B82F6" />
      <NodeCard label="Dir. Comercial" sub="Revenue" icon={User} accent="#3B82F6" />
      <span className="hidden md:inline-flex">
        <NodeCard label="Dir. Marketing" sub="Growth" icon={User} accent="#3B82F6" />
      </span>
      <span className="hidden md:inline-flex">
        <NodeCard label="CFO" sub="Finanças" icon={User} accent="#3B82F6" />
      </span>
    </div>

    <div className="flex justify-around px-16 md:px-32">
      <FlowConnector delay={0} />
      <FlowConnector delay={0.6} />
    </div>

    {/* Layer 2 — Controle */}
    <div className="flex justify-center gap-2 md:gap-3 mb-1">
      <LinkPill label="Briefings" delay={0} />
      <LinkPill label="Aprovações" delay={1} />
      <span className="hidden md:inline-flex">
        <LinkPill label="Reviews" delay={2} />
      </span>
    </div>

    <div className="flex justify-around px-16 md:px-32">
      <FlowConnector delay={0.3} />
      <FlowConnector delay={1} />
    </div>

    {/* Layer 3 — Agentes */}
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-1">
      <NodeCard label="SDR" sub="Prospecção" icon={Bot} accent="#10B981" />
      <NodeCard label="Follow-up" sub="Engajamento" icon={Bot} accent="#10B981" />
      <span className="hidden md:inline-flex">
        <NodeCard label="Conteúdo" sub="Criação" icon={Bot} accent="#8B5CF6" />
      </span>
      <NodeCard label="Anúncios" sub="Mídia paga" icon={Bot} accent="#8B5CF6" />
      <span className="hidden md:inline-flex">
        <NodeCard label="Cobrança" sub="Financeiro" icon={Bot} accent="#F59E0B" />
      </span>
      <NodeCard label="Forecast" sub="Previsão" icon={Bot} accent="#F59E0B" />
    </div>

    <div className="flex justify-around px-16 md:px-32">
      <FlowConnector delay={0.5} />
      <FlowConnector delay={1.2} />
    </div>

    {/* Layer 4 — Dados */}
    <div className="flex justify-center gap-2 md:gap-3">
      <NodeCard label="CRM" sub="Hubspot" icon={Database} />
      <NodeCard label="ERP" sub="SAP" icon={Database} />
      <span className="hidden md:inline-flex">
        <NodeCard label="APIs" sub="Integrações" icon={Database} />
      </span>
    </div>
  </div>
);

export default AgenticArchitecture;
