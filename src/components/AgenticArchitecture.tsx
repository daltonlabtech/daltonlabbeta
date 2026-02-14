import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Briefcase, Megaphone, Settings, DollarSign,
  LayoutDashboard, FileText, CheckSquare, Eye,
  Database, Server, HardDrive, Plug
} from 'lucide-react';

interface AgentData {
  name: string;
  status: 'Ativo' | 'Em Treinamento';
  owner: string;
  funcao: string;
  outputDiario: string;
  metrica: string;
  proximaRevisao: string;
}

const LEADERS = [
  { title: 'CEO/Fundador', subtitle: 'Estratégia & Decisões', icon: User },
  { title: 'Diretor Comercial', subtitle: 'Estratégia & Decisões', icon: Briefcase },
  { title: 'Dir. de Marketing', subtitle: 'Estratégia & Decisões', icon: Megaphone },
  { title: 'Dir. de Operações', subtitle: 'Estratégia & Decisões', icon: Settings },
  { title: 'CFO', subtitle: 'Estratégia & Decisões', icon: DollarSign },
];

const CONTROL_CHIPS = [
  { label: 'Dashboards', icon: LayoutDashboard },
  { label: 'Briefings', icon: FileText },
  { label: 'Aprovações', icon: CheckSquare },
  { label: 'Reviews', icon: Eye },
];

const AGENT_COLUMNS: { director: string; agents: AgentData[] }[] = [
  {
    director: 'Diretor Comercial',
    agents: [
      { name: 'Agente SDR', status: 'Ativo', owner: 'Squad Vendas', funcao: 'Prospecção outbound no LinkedIn', outputDiario: '50 mensagens personalizadas', metrica: 'Taxa de resposta: 18%', proximaRevisao: 'Sexta, 10h' },
      { name: 'Agente Follow-up', status: 'Ativo', owner: 'Squad Vendas', funcao: 'Acompanhamento de leads qualificados', outputDiario: '30 follow-ups diários', metrica: 'Conversão: 12%', proximaRevisao: 'Sexta, 10h' },
      { name: 'Agente Proposta', status: 'Em Treinamento', owner: 'Squad Vendas', funcao: 'Geração automática de propostas', outputDiario: '8 propostas/dia', metrica: 'Aprovação: 65%', proximaRevisao: 'Segunda, 14h' },
    ],
  },
  {
    director: 'Dir. de Marketing',
    agents: [
      { name: 'Agente Conteúdo', status: 'Ativo', owner: 'Squad Marketing', funcao: 'Criação de conteúdo multiplataforma', outputDiario: '5 peças de conteúdo', metrica: 'Engajamento: +40%', proximaRevisao: 'Quinta, 9h' },
      { name: 'Agente Anúncios', status: 'Ativo', owner: 'Squad Marketing', funcao: 'Otimização de campanhas pagas', outputDiario: '12 variações de anúncio', metrica: 'ROAS: 4.2x', proximaRevisao: 'Quarta, 11h' },
      { name: 'Agente Análise', status: 'Em Treinamento', owner: 'Squad Marketing', funcao: 'Relatórios de performance', outputDiario: '3 relatórios', metrica: 'Insights acionáveis: 8/dia', proximaRevisao: 'Sexta, 15h' },
    ],
  },
  {
    director: 'CFO',
    agents: [
      { name: 'Agente Cobrança', status: 'Ativo', owner: 'Squad Financeiro', funcao: 'Cobrança automatizada de inadimplentes', outputDiario: '25 contatos/dia', metrica: 'Recuperação: 32%', proximaRevisao: 'Segunda, 9h' },
      { name: 'Agente Conciliação', status: 'Ativo', owner: 'Squad Financeiro', funcao: 'Conciliação bancária automática', outputDiario: '200 transações', metrica: 'Acurácia: 99.5%', proximaRevisao: 'Terça, 10h' },
      { name: 'Agente Forecast', status: 'Em Treinamento', owner: 'Squad Financeiro', funcao: 'Projeções financeiras inteligentes', outputDiario: '1 projeção atualizada', metrica: 'Precisão: 91%', proximaRevisao: 'Quarta, 14h' },
    ],
  },
];

const DATA_SOURCES = [
  { label: 'CRM', icon: Database },
  { label: 'ERP', icon: Server },
  { label: 'Base de Dados', icon: HardDrive },
  { label: 'APIs', icon: Plug },
];

const AgentCard = ({ agent }: { agent: AgentData }) => {
  const [expanded, setExpanded] = useState(false);
  const isActive = agent.status === 'Ativo';

  return (
    <motion.div
      layout
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      onClick={() => setExpanded(!expanded)}
      className="relative rounded-xl p-3 md:p-4 cursor-pointer transition-all duration-300 border border-white/[0.06]"
      style={{ backgroundColor: '#1E1E1E' }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-inter font-semibold text-white/90 text-[11px] md:text-[13px] leading-tight">
          {agent.name}
        </span>
        <span
          className={`text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded-full ${
            isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}
        >
          {agent.status}
        </span>
      </div>
      <p className="text-white/40 text-[10px] md:text-[11px] font-inter">{agent.funcao}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-white/[0.08] space-y-1.5">
              <Row label="Owner" value={agent.owner} />
              <Row label="Output diário" value={agent.outputDiario} />
              <Row label="Métrica" value={agent.metrica} />
              <Row label="Próxima revisão" value={agent.proximaRevisao} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purple accent line */}
      <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-purple-600/60 to-purple-400/30" />
    </motion.div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center text-[10px] md:text-[11px] font-inter">
    <span className="text-white/40">{label}</span>
    <span className="text-white/70 font-medium">{value}</span>
  </div>
);

const FlowLine = ({ className = '' }: { className?: string }) => (
  <div className={`flex justify-center ${className}`}>
    <motion.div
      className="w-[2px] h-10 md:h-16 rounded-full"
      style={{
        background: 'linear-gradient(180deg, rgba(96,165,250,0.5) 0%, rgba(138,43,226,0.5) 100%)',
      }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

const AgenticArchitecture = () => {
  return (
    <div className="w-full rounded-2xl md:rounded-3xl p-4 md:p-8 lg:p-10 overflow-hidden" style={{ backgroundColor: '#1A232F' }}>
      {/* Title */}
      <h3 className="font-inter font-bold text-white/90 text-sm md:text-lg lg:text-xl text-center mb-6 md:mb-10">
        Arquitetura de Organização Agêntica
      </h3>

      {/* Layer 1 - Humans */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
        {LEADERS.map((leader, i) => {
          const Icon = leader.icon;
          return (
            <motion.div
              key={leader.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-xl p-3 md:p-4 border border-white/[0.08] text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="mx-auto w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/15 flex items-center justify-center mb-2">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-400/80" strokeWidth={1.8} />
              </div>
              <p className="font-inter font-semibold text-white/85 text-[10px] md:text-[12px] leading-tight">{leader.title}</p>
              <p className="font-inter text-white/35 text-[9px] md:text-[10px] mt-0.5">{leader.subtitle}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Flow line */}
      <FlowLine />

      {/* Layer 2 - Control */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.8 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 border border-white/[0.06]"
        style={{
          background: 'linear-gradient(90deg, rgba(138,43,226,0.08) 0%, rgba(96,165,250,0.08) 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <p className="font-inter font-semibold text-white/50 text-[10px] md:text-[11px] tracking-widest uppercase text-center mb-2 md:mb-3">
          Camada de Controle
        </p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {CONTROL_CHIPS.map((chip) => {
            const Icon = chip.icon;
            return (
              <motion.span
                key={chip.label}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-inter font-medium text-white/60 border border-white/[0.08] bg-white/[0.03]"
              >
                <Icon className="w-3 h-3 text-white/40" strokeWidth={1.8} />
                {chip.label}
              </motion.span>
            );
          })}
        </div>
      </motion.div>

      {/* Flow line */}
      <FlowLine />

      {/* Layer 3 - AI Agents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {AGENT_COLUMNS.map((col, colIdx) => (
          <motion.div
            key={col.director}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: colIdx * 0.12, duration: 0.5 }}
          >
            <p className="font-inter font-semibold text-purple-400/70 text-[10px] md:text-[11px] tracking-wide uppercase mb-2 md:mb-3 text-center">
              {col.director}
            </p>
            <div className="space-y-2 md:space-y-2.5">
              {col.agents.map((agent) => (
                <AgentCard key={agent.name} agent={agent} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flow line */}
      <FlowLine />

      {/* Layer 4 - Data Sources */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {DATA_SOURCES.map((ds, i) => {
          const Icon = ds.icon;
          return (
            <motion.div
              key={ds.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] md:text-[12px] font-inter font-medium text-white/50 border border-white/[0.06] bg-white/[0.03]"
            >
              <Icon className="w-3.5 h-3.5 text-white/30" strokeWidth={1.8} />
              {ds.label}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AgenticArchitecture;
