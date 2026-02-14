import { motion } from 'framer-motion';
import { User, Bot, Database, ChevronDown } from 'lucide-react';

/* ── Floating animation presets ── */
const float = (delay: number, dx = 0, dy = 6) => ({
  y: [0, -dy, 0, dy * 0.5, 0],
  x: [0, dx, 0, -dx * 0.5, 0],
  transition: { duration: 12 + delay * 2, repeat: Infinity, ease: 'easeInOut' as const, delay: delay * 0.8 },
});

/* ── Node card ── */
const NodeCard = ({
  label,
  sub,
  icon: Icon,
  badge,
  badgeColor = 'bg-blue-100 text-blue-600',
  details,
  floatDelay,
  className = '',
}: {
  label: string;
  sub: string;
  icon: typeof User;
  badge?: string;
  badgeColor?: string;
  details?: { key: string; value: string }[];
  floatDelay: number;
  className?: string;
}) => (
  <motion.div
    animate={float(floatDelay, 2)}
    className={`rounded-xl border border-black/[0.07] p-3 md:p-4 shadow-sm ${className}`}
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
  </motion.div>
);

/* ── Link pill ── */
const LinkPill = ({ label, floatDelay }: { label: string; floatDelay: number }) => (
  <motion.div
    animate={float(floatDelay, 1, 3)}
    className="inline-flex items-center px-3 py-1 rounded-full border border-black/[0.07] shadow-sm"
    style={{ backgroundColor: '#FAFAF8' }}
  >
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay * 0.3 }}
    />
    <span className="font-inter font-medium text-[9px] md:text-[10px]" style={{ color: 'rgba(16,24,35,0.5)' }}>
      {label}
    </span>
  </motion.div>
);

/* ── Connector line (vertical dashed) ── */
const Connector = ({ h = 24 }: { h?: number }) => (
  <div className="flex justify-center" style={{ height: h }}>
    <motion.div
      className="w-px h-full"
      style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(16,24,35,0.12) 0, rgba(16,24,35,0.12) 4px, transparent 4px, transparent 8px)' }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const AgenticArchitecture = () => {
  return (
    <div
      className="w-full rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10 overflow-hidden border border-black/[0.04]"
      style={{ backgroundColor: '#F0EEEB' }}
    >
      {/* Header badges - like the reference top row */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-5 md:mb-8">
        {['Liderança', 'Controle', 'Agentes IA', 'Dados'].map((label, i) => (
          <motion.span
            key={label}
            animate={float(i, 1, 2)}
            className="font-inter font-medium text-[10px] md:text-[11px] tracking-wide flex items-center gap-1.5"
            style={{ color: 'rgba(16,24,35,0.45)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{
              backgroundColor: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'][i],
              opacity: 0.6,
            }} />
            {label}
          </motion.span>
        ))}
      </div>

      {/* Main grid - organic node layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-3">
        <NodeCard label="CEO" sub="estratégia.geral" icon={User} badge="Liderança" badgeColor="bg-blue-50 text-blue-500" floatDelay={0} />
        <NodeCard label="Dir. Comercial" sub="vendas.pipeline" icon={User} badge="Liderança" badgeColor="bg-blue-50 text-blue-500" floatDelay={1}
          details={[
            { key: 'Agentes', value: '3 ativos' },
            { key: 'Pipeline', value: 'R$ 2.4M' },
          ]}
        />
        <NodeCard label="Dir. Marketing" sub="marketing.growth" icon={User} badge="Liderança" badgeColor="bg-blue-50 text-blue-500" floatDelay={2} />
        <NodeCard label="CFO" sub="financeiro.core" icon={User} badge="Liderança" badgeColor="bg-blue-50 text-blue-500" floatDelay={3} />
      </div>

      {/* Links row */}
      <div className="flex justify-around px-4 md:px-12 mb-1">
        <LinkPill label="Briefing" floatDelay={0} />
        <LinkPill label="Aprovação" floatDelay={1.5} />
        <LinkPill label="Review" floatDelay={3} />
      </div>

      <Connector h={20} />

      {/* Agents row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-3">
        <NodeCard label="Agente SDR" sub="prospecção.outbound" icon={Bot} badge="Comercial" badgeColor="bg-emerald-50 text-emerald-600" floatDelay={1}
          details={[
            { key: 'Status', value: 'Ativo' },
            { key: 'Owner', value: 'Squad Vendas' },
            { key: 'Output', value: '50 msgs/dia' },
            { key: 'Resposta', value: '18%' },
          ]}
        />
        <NodeCard label="Agente Conteúdo" sub="marketing.content" icon={Bot} badge="Marketing" badgeColor="bg-purple-50 text-purple-600" floatDelay={2} />
        <NodeCard label="Agente Cobrança" sub="financeiro.billing" icon={Bot} badge="Financeiro" badgeColor="bg-amber-50 text-amber-600" floatDelay={3}
          details={[
            { key: 'Status', value: 'Ativo' },
            { key: 'Recuperação', value: '32%' },
          ]}
        />
        <NodeCard label="Agente Follow-up" sub="vendas.nurturing" icon={Bot} badge="Comercial" badgeColor="bg-emerald-50 text-emerald-600" floatDelay={4} />
        <NodeCard label="Agente Anúncios" sub="marketing.ads" icon={Bot} badge="Marketing" badgeColor="bg-purple-50 text-purple-600" floatDelay={5}
          details={[
            { key: 'Status', value: 'Em Treinamento' },
            { key: 'ROAS', value: '4.2x' },
          ]}
        />
        <NodeCard label="Agente Forecast" sub="financeiro.predict" icon={Bot} badge="Financeiro" badgeColor="bg-amber-50 text-amber-600" floatDelay={6} />
      </div>

      {/* Links row */}
      <div className="flex justify-around px-4 md:px-16 mb-1">
        <LinkPill label="Dados" floatDelay={2} />
        <LinkPill label="Sync" floatDelay={4} />
      </div>

      <Connector h={20} />

      {/* Data sources */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-3 max-w-md mx-auto">
        {['CRM', 'ERP', 'APIs'].map((label, i) => (
          <motion.div
            key={label}
            animate={float(i + 5, 1, 3)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-black/[0.06]"
            style={{ backgroundColor: '#FAFAF8' }}
          >
            <Database className="w-3 h-3" style={{ color: 'rgba(16,24,35,0.3)' }} strokeWidth={1.8} />
            <span className="font-inter font-medium text-[10px] md:text-[11px]" style={{ color: 'rgba(16,24,35,0.45)' }}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgenticArchitecture;
