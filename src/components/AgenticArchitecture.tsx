import { motion } from 'framer-motion';
import { User, Bot, Database } from 'lucide-react';

const PulseDot = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="w-1 h-1 rounded-full bg-emerald-400"
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const FlowConnector = ({ delay = 0 }: { delay?: number }) => (
  <div className="flex justify-center h-4 overflow-hidden">
    <div className="relative w-px h-full" style={{ backgroundColor: 'rgba(16,24,35,0.08)' }}>
      <motion.div
        className="absolute w-px"
        style={{ height: 4, backgroundColor: 'rgba(16,24,35,0.25)', top: -4 }}
        animate={{ top: [-4, 16] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay }}
      />
    </div>
  </div>
);

const Chip = ({ label, icon: Icon, accent }: { label: string; icon: typeof User; accent?: string }) => (
  <div
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-black/[0.06]"
    style={{ backgroundColor: '#FAFAF8' }}
  >
    <Icon className="w-3 h-3 flex-shrink-0" style={{ color: accent || 'rgba(16,24,35,0.35)' }} strokeWidth={1.8} />
    <span className="font-inter font-medium text-[10px] md:text-[11px]" style={{ color: 'rgba(16,24,35,0.7)' }}>
      {label}
    </span>
  </div>
);

const LinkPill = ({ label, delay = 0 }: { label: string; delay?: number }) => (
  <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-black/[0.06]" style={{ backgroundColor: '#FAFAF8' }}>
    <PulseDot delay={delay} />
    <span className="ml-1.5 font-inter font-medium text-[9px] md:text-[10px]" style={{ color: 'rgba(16,24,35,0.45)' }}>{label}</span>
  </div>
);

const AgenticArchitecture = () => (
  <div className="w-full rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 overflow-hidden border border-black/[0.04]" style={{ backgroundColor: '#F0EEEB' }}>
    <p className="font-inter font-semibold text-[9px] md:text-[10px] tracking-widest uppercase text-center mb-4 md:mb-5" style={{ color: 'rgba(16,24,35,0.35)' }}>
      Arquitetura Agêntica
    </p>

    {/* Leaders */}
    <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-1">
      {['CEO', 'Dir. Comercial', 'Dir. Marketing', 'CFO'].map((l) => (
        <Chip key={l} label={l} icon={User} />
      ))}
    </div>

    <div className="flex justify-around px-12 md:px-24"><FlowConnector delay={0} /><FlowConnector delay={0.6} /></div>

    {/* Control */}
    <div className="flex justify-center gap-2 mb-1">
      <LinkPill label="Briefings" delay={0} />
      <LinkPill label="Aprovações" delay={1} />
      <span className="hidden md:inline-flex"><LinkPill label="Reviews" delay={2} /></span>
    </div>

    <div className="flex justify-around px-12 md:px-24"><FlowConnector delay={0.3} /><FlowConnector delay={1} /></div>

    {/* Agents */}
    <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-1">
      {[
        { l: 'SDR', c: '#10B981' },
        { l: 'Follow-up', c: '#10B981' },
        { l: 'Conteúdo', c: '#8B5CF6' },
        { l: 'Anúncios', c: '#8B5CF6' },
        { l: 'Cobrança', c: '#F59E0B' },
        { l: 'Forecast', c: '#F59E0B' },
      ].map(({ l, c }) => (
        <Chip key={l} label={l} icon={Bot} accent={c} />
      ))}
    </div>

    <div className="flex justify-around px-12 md:px-24"><FlowConnector delay={0.5} /><FlowConnector delay={1.2} /></div>

    {/* Data */}
    <div className="flex justify-center gap-1.5 md:gap-2">
      {['CRM', 'ERP', 'APIs'].map((l) => (
        <Chip key={l} label={l} icon={Database} />
      ))}
    </div>
  </div>
);

export default AgenticArchitecture;
