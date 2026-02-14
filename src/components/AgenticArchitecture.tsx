import { motion } from 'framer-motion';
import { User, Bot, Database, ArrowDown } from 'lucide-react';

const HUMANS = ['CEO', 'Dir. Comercial', 'Dir. Marketing', 'Dir. Operações', 'CFO'];
const AGENTS = ['SDR', 'Follow-up', 'Conteúdo', 'Anúncios', 'Cobrança', 'Forecast'];
const DATA = ['CRM', 'ERP', 'APIs'];

const AgenticArchitecture = () => {
  return (
    <div
      className="w-full rounded-2xl md:rounded-3xl p-5 md:p-8 border border-black/[0.06]"
      style={{ backgroundColor: '#F0EEEB' }}
    >
      <p className="font-inter font-semibold text-[11px] md:text-xs tracking-widest uppercase text-center mb-6"
        style={{ color: 'rgba(16,24,35,0.4)' }}>
        Arquitetura de Organização Agêntica
      </p>

      {/* Layer 1 - Humans */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-2.5 mb-4">
        {HUMANS.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-black/[0.06]"
            style={{ backgroundColor: '#FAFAF8' }}
          >
            <User className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(16,24,35,0.35)' }} strokeWidth={1.8} />
            <span className="font-inter font-medium text-[10px] md:text-[11px]" style={{ color: 'rgba(16,24,35,0.7)' }}>
              {name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Arrow */}
      <div className="flex justify-center my-2">
        <ArrowDown className="w-4 h-4" style={{ color: 'rgba(16,24,35,0.15)' }} />
      </div>

      {/* Layer 2 - Control bar */}
      <div className="text-center mb-2">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-inter font-medium border border-black/[0.06]"
          style={{ backgroundColor: '#FAFAF8', color: 'rgba(16,24,35,0.5)' }}>
          Dashboards · Briefings · Aprovações · Reviews
        </span>
      </div>

      {/* Arrow */}
      <div className="flex justify-center my-2">
        <ArrowDown className="w-4 h-4" style={{ color: 'rgba(16,24,35,0.15)' }} />
      </div>

      {/* Layer 3 - AI Agents */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-2.5 mb-4">
        {AGENTS.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-black/[0.06]"
            style={{ backgroundColor: '#FAFAF8' }}
          >
            <Bot className="w-3.5 h-3.5 flex-shrink-0 text-purple-500/60" strokeWidth={1.8} />
            <span className="font-inter font-medium text-[10px] md:text-[11px]" style={{ color: 'rgba(16,24,35,0.7)' }}>
              Agente {name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Arrow */}
      <div className="flex justify-center my-2">
        <ArrowDown className="w-4 h-4" style={{ color: 'rgba(16,24,35,0.15)' }} />
      </div>

      {/* Layer 4 - Data */}
      <div className="flex justify-center gap-2">
        {DATA.map((label) => (
          <span key={label} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-inter font-medium border border-black/[0.06]"
            style={{ backgroundColor: '#FAFAF8', color: 'rgba(16,24,35,0.4)' }}>
            <Database className="w-3 h-3" strokeWidth={1.8} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AgenticArchitecture;
