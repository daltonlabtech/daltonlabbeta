import { User, Bot, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

const AgenticArchitecture = () => {
  const { t } = useTranslation();

  return (
    <div
      className="w-full rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10 overflow-hidden border border-black/[0.04]"
      style={{ backgroundColor: '#F0EEEB' }}
    >
      <p
        className="font-inter font-semibold text-[9px] md:text-[10px] tracking-widest uppercase text-center mb-5 md:mb-6"
        style={{ color: 'rgba(16,24,35,0.35)' }}
      >
        {t('home.architecture.title')}
      </p>

      {/* Layer 1 — Leadership */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-1">
        <NodeCard label={t('home.architecture.ceo')} sub={t('home.architecture.ceoSub')} icon={User} accent="#3B82F6" />
        <NodeCard label={t('home.architecture.salesDir')} sub={t('home.architecture.salesDirSub')} icon={User} accent="#3B82F6" />
        <span className="hidden md:inline-flex">
          <NodeCard label={t('home.architecture.marketingDir')} sub={t('home.architecture.marketingDirSub')} icon={User} accent="#3B82F6" />
        </span>
        <span className="hidden md:inline-flex">
          <NodeCard label={t('home.architecture.cfo')} sub={t('home.architecture.cfoSub')} icon={User} accent="#3B82F6" />
        </span>
      </div>

      <div className="flex justify-around px-16 md:px-32">
        <FlowConnector delay={0} />
        <FlowConnector delay={0.6} />
      </div>

      {/* Layer 2 — Control */}
      <div className="flex justify-center gap-2 md:gap-3 mb-1">
        <LinkPill label={t('home.architecture.briefings')} delay={0} />
        <LinkPill label={t('home.architecture.approvals')} delay={1} />
        <span className="hidden md:inline-flex">
          <LinkPill label={t('home.architecture.reviews')} delay={2} />
        </span>
      </div>

      <div className="flex justify-around px-16 md:px-32">
        <FlowConnector delay={0.3} />
        <FlowConnector delay={1} />
      </div>

      {/* Layer 3 — Agents */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-1">
        <NodeCard label={t('home.architecture.sdr')} sub={t('home.architecture.sdrSub')} icon={Bot} accent="#10B981" />
        <NodeCard label={t('home.architecture.followUp')} sub={t('home.architecture.followUpSub')} icon={Bot} accent="#10B981" />
        <span className="hidden md:inline-flex">
          <NodeCard label={t('home.architecture.content')} sub={t('home.architecture.contentSub')} icon={Bot} accent="#8B5CF6" />
        </span>
        <NodeCard label={t('home.architecture.ads')} sub={t('home.architecture.adsSub')} icon={Bot} accent="#8B5CF6" />
        <span className="hidden md:inline-flex">
          <NodeCard label={t('home.architecture.billing')} sub={t('home.architecture.billingSub')} icon={Bot} accent="#F59E0B" />
        </span>
        <NodeCard label={t('home.architecture.forecast')} sub={t('home.architecture.forecastSub')} icon={Bot} accent="#F59E0B" />
      </div>

      <div className="flex justify-around px-16 md:px-32">
        <FlowConnector delay={0.5} />
        <FlowConnector delay={1.2} />
      </div>

      {/* Layer 4 — Data */}
      <div className="flex justify-center gap-2 md:gap-3">
        <NodeCard label={t('home.architecture.crm')} sub={t('home.architecture.crmSub')} icon={Database} />
        <NodeCard label={t('home.architecture.erp')} sub={t('home.architecture.erpSub')} icon={Database} />
        <span className="hidden md:inline-flex">
          <NodeCard label={t('home.architecture.apis')} sub={t('home.architecture.apisSub')} icon={Database} />
        </span>
      </div>
    </div>
  );
};

export default AgenticArchitecture;