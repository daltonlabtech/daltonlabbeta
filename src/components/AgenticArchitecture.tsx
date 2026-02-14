import { motion } from 'framer-motion';
import { User, Bot, Database, ChevronDown } from 'lucide-react';

/* ── Pulse dot: simulates data flowing ── */
const PulseDot = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ── Node card ── */
const NodeCard = ({
  label,
  sub,
  icon: Icon,
  badge,
  badgeColor = 'bg-blue-100 text-blue-600',
  details,
}: {
  label: string;
  sub: string;
  icon: typeof User;
  badge?: string;
  badgeColor?: string;
  details?: { key: string; value: string }[];
}) => (
  <div
    className="rounded-xl border border-black/[0.07] p-3 md:p-4 shadow-sm"
    style={{ backgroundColor: '#FAFAF8' }}
  >
    {badge && (
      <span className={`inline-block text-[8px] md:text-[9px] font-semibold px-2 py-0.5 rounded-full mb-2 ${badgeColor}`}>
        {badge}
      </span>
    )}
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(16,24,35,0.4)' }} strokeWidth={1.8} />
        <span className="font-inter font-semibold text-[11px] md:text-[13px]" style={{ color: 'rgba(16,24,35,0.8)' }}>
          {label}
        </span>
      </div>
      {details && <ChevronDown className="w-3 h-3" style={{ color: 'rgba(16,24,35,0.25)' }} />}
    </div>
    <p className="font-inter text-[9px] md:text-[10px] mb-1" style={{ color: 'rgba(16,24,35,0.35)' }}>{sub}</p>
    {details && (
      <div className="mt-2 pt-2 border-t border-black/[0.05] space-y-1">
        {details.map((d) => (
          <div key={d.key} className="flex justify-between text-[9px] md:text-[10px] font-inter">
            <span style={{ color: 'rgba(16,24,35,0.4)' }}>{d.key}</span>
            <span className="font-medium" style={{ color: 'rgba(16,24,35,0.65)' }}>{d.value}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ── Flow connector: animated dashes traveling downward ── */
const FlowConnector = ({ delay = 0 }: { delay?: number }) => (
  <div className="flex justify-center h-6 md:h-7 overflow-hidden">
    <div className="relative w-px h-full" style={{ backgroundColor: 'rgba(16,24,35,0.08)' }}>
      <motion.div
        className="absolute w-px"
        style={{ height: 6, backgroundColor: 'rgba(16,24,35,0.3)', top: -6 }}
        animate={{ top: [-6, 28] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay }}
      />
    </div>
  </div>
);

/* ── Link pill with flowing dot ── */
const LinkPill = ({ label, delay = 0 }: { label: string; delay?: number }) => (
  <div
    className="inline-flex items-center px-3 py-1 rounded-full border border-black/[0.07] shadow-sm"
    style={{ backgroundColor: '#FAFAF8' }}
  >
    <PulseDot delay={delay} />
    <span className="ml-2 font-inter font-medium text-[9px] md:text-[10px]" style={{ color: 'rgba(16,24,35,0.5)' }}>
      {label}
    </span>
  </div>
);

const AgenticArchitecture = () => {
  return (
    <div
      className="w-full rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10 overflow-hidden border border-black/[0.04]"
      style={{ backgroundColor: '#F0EEEB' }}
    >
      {/* Header badges */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-5 md:mb-8">
        {['Liderança', 'Controle', 'Agentes IA', 'Dados'].map((label, i) => (
          <span
            key={label}
            className="font-inter font-medium text-[10px] md:text-[11px] tracking-wide flex items-center gap-1.5"
            style={{ color: 'rgba(16,24,35,0.45)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{
              backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][i],
              opacity: 0.6,
            }} />
            {label}
          </span>
        ))}
      </div>

      {/* Layer 1: Leaders — 4 on desktop, 2 on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-2">
        <NodeCard label="CEO" sub="estratégia.geral" icon={User} badge="Liderança" badgeColor="bg-blue-50 text-blue-500" />
        <NodeCard label="Dir. Comercial" sub="vendas.pipeline" icon={User} badge="Liderança" badgeColor="bg-blue-50 text-blue-500"
          details={[{ key: 'Agentes', value: '3 ativos' }, { key: 'Pipeline', value: 'R$ 2.4M' }]}
        />
        {/* Hidden on mobile */}
        <div className="hidden md:block">
          <NodeCard label="Dir. Marketing" sub="marketing.growth" icon={User} badge="Liderança" badgeColor="bg-blue-50 text-blue-500" />
        </div>
        <div className="hidden md:block">
          <NodeCard label="CFO" sub="financeiro.core" icon={User} badge="Liderança" badgeColor="bg-blue-50 text-blue-500" />
        </div>
      </div>

      {/* Flow connectors */}
      <div className="flex justify-around px-8 md:px-16">
        <FlowConnector delay={0} />
        <FlowConnector delay={0.8} />
        <FlowConnector delay={1.6} />
      </div>

      {/* Links row */}
      <div className="flex justify-around px-4 md:px-12 mb-1">
        <LinkPill label="Briefing" delay={0} />
        <LinkPill label="Aprovação" delay={1} />
        <span className="hidden md:inline-flex"><LinkPill label="Review" delay={2} /></span>
      </div>

      <div className="flex justify-around px-8 md:px-16">
        <FlowConnector delay={0.4} />
        <FlowConnector delay={1.2} />
        <FlowConnector delay={2} />
      </div>

      {/* Layer 3: Agents — 4 on mobile, 6 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-2">
        <NodeCard label="Agente SDR" sub="prospecção.outbound" icon={Bot} badge="Comercial" badgeColor="bg-emerald-50 text-emerald-600"
          details={[{ key: 'Status', value: 'Ativo' }, { key: 'Output', value: '50 msgs/dia' }, { key: 'Resposta', value: '18%' }]}
        />
        <NodeCard label="Agente Conteúdo" sub="marketing.content" icon={Bot} badge="Marketing" badgeColor="bg-purple-50 text-purple-600" />
        <NodeCard label="Agente Cobrança" sub="financeiro.billing" icon={Bot} badge="Financeiro" badgeColor="bg-amber-50 text-amber-600"
          details={[{ key: 'Status', value: 'Ativo' }, { key: 'Recuperação', value: '32%' }]}
        />
        <NodeCard label="Agente Follow-up" sub="vendas.nurturing" icon={Bot} badge="Comercial" badgeColor="bg-emerald-50 text-emerald-600" />
        {/* Hidden on mobile */}
        <div className="hidden md:block">
          <NodeCard label="Agente Anúncios" sub="marketing.ads" icon={Bot} badge="Marketing" badgeColor="bg-purple-50 text-purple-600"
            details={[{ key: 'Status', value: 'Em Treinamento' }, { key: 'ROAS', value: '4.2x' }]}
          />
        </div>
        <div className="hidden md:block">
          <NodeCard label="Agente Forecast" sub="financeiro.predict" icon={Bot} badge="Financeiro" badgeColor="bg-amber-50 text-amber-600" />
        </div>
      </div>

      {/* Flow connectors */}
      <div className="flex justify-around px-8 md:px-16">
        <FlowConnector delay={0.6} />
        <FlowConnector delay={1.4} />
      </div>

      {/* Links row */}
      <div className="flex justify-around px-4 md:px-16 mb-1">
        <LinkPill label="Dados" delay={1.5} />
        <LinkPill label="Sync" delay={2.5} />
      </div>

      <div className="flex justify-around px-8 md:px-16">
        <FlowConnector delay={1} />
        <FlowConnector delay={1.8} />
      </div>

      {/* Layer 4: Data sources */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-xs md:max-w-md mx-auto">
        {['CRM', 'ERP', 'APIs'].map((label) => (
          <div
            key={label}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-black/[0.06]"
            style={{ backgroundColor: '#FAFAF8' }}
          >
            <Database className="w-3 h-3" style={{ color: 'rgba(16,24,35,0.3)' }} strokeWidth={1.8} />
            <span className="font-inter font-medium text-[10px] md:text-[11px]" style={{ color: 'rgba(16,24,35,0.45)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgenticArchitecture;
