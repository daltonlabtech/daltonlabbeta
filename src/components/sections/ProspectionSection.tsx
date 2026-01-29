import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import WaitlistModal from '@/components/ui/WaitlistModal';

type AgentTab = 'vendas' | 'conteudo' | 'anuncio';

interface AgentContent {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaAction: 'external' | 'modal';
  isComingSoon: boolean;
}

const agentData: Record<AgentTab, AgentContent> = {
  vendas: {
    title: 'Nunca perca um lead',
    description: 'O Dalton automatiza o seu processo comercial, escalando suas vendas e garantindo receita previsível.',
    features: [
      'Respostas instantâneas 24/7',
      'Entende o seu cliente ideal e o direciona para reuniões',
      'Guia o cliente no processo da compra de forma autônoma',
    ],
    ctaText: 'Fale com o Dalton',
    ctaAction: 'external',
    isComingSoon: false,
  },
  conteudo: {
    title: 'Gere leads orgânicos em escala',
    description: 'O Dalton estuda a sua marca, absorve seu posicionamento e produz materiais autênticos.',
    features: [
      'Analisa sua marca e entende sua identidade',
      'Automatiza a criação de conteúdo para as suas redes sociais',
      'Personaliza os conteúdos com base no perfil da sua marca e público',
    ],
    ctaText: 'Lista de espera',
    ctaAction: 'modal',
    isComingSoon: true,
  },
  anuncio: {
    title: 'Potencialize o ROI dos seus anúncios',
    description: 'O Dalton aprende, testa e otimiza cada centavo investido para maximizar o retorno.',
    features: [
      'Realiza testes em massa para encontrar seu público ideal',
      'Analisa dados em tempo real para identificar tendências de performance',
      'Aplica melhorias de performance para maximizar ROI',
    ],
    ctaText: 'Lista de espera',
    ctaAction: 'modal',
    isComingSoon: true,
  },
};

const ProspectionSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeTab, setActiveTab] = useState<AgentTab>('vendas');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentAgent = agentData[activeTab];

  const handleCtaClick = () => {
    if (currentAgent.ctaAction === 'external') {
      window.open('https://chat.daltonlab.ai/', '_blank', 'noopener,noreferrer');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="pt-8 pb-[60px] md:pt-12 md:pb-[120px] bg-[#101823] overflow-hidden"
    >
      <div className="container-main">
        {/* Content Box */}
        <div className="bg-[#F5F3F0] rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Tabs */}
          <div 
            className={`flex flex-wrap justify-center gap-2 md:gap-4 mb-10 ${revealClasses(isVisible)}`}
          >
            {(['vendas', 'conteudo', 'anuncio'] as AgentTab[]).map((tab) => {
              const isActive = activeTab === tab;
              const tabLabels: Record<AgentTab, string> = {
                vendas: 'Agente de Vendas',
                conteudo: 'Agente de Conteúdo',
                anuncio: 'Agente de Anúncio',
              };
              const isComingSoon = agentData[tab].isComingSoon;
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-[#101823] text-white' 
                      : 'bg-white/80 text-zinc-600 hover:bg-white hover:text-zinc-900 border border-zinc-200'
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {tabLabels[tab]}
                    {isComingSoon && (
                      <span className="bg-gradient-to-r from-[hsl(var(--dalton-purple))] to-[hsl(271,76%,45%)] text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full uppercase">
                        Em breve
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div 
              className={`${revealClasses(isVisible)}`}
              style={getStaggerDelay(1)}
            >
              {/* Section Number */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-200 text-zinc-500 text-sm font-medium mb-6">
                02
              </div>

              {/* Title */}
              <h2 
                className="font-inter font-bold text-3xl md:text-4xl lg:text-[42px] text-zinc-900 leading-tight mb-6"
              >
                {currentAgent.title}
              </h2>

              {/* Description */}
              <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-8 max-w-lg">
                {currentAgent.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-4 mb-8">
                {currentAgent.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded bg-zinc-900 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-base text-zinc-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center bg-[#101823] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#1a2533] transition-all duration-300 group"
              >
                {currentAgent.ctaText}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Right: Dashboard Image */}
            <div 
              className={`relative ${revealClasses(isVisible)}`}
              style={getStaggerDelay(2)}
            >
              <div className={`relative rounded-2xl overflow-hidden ${currentAgent.isComingSoon ? 'blur-sm' : ''}`}>
                {/* Dashboard Mockup */}
                <DashboardMockup />
              </div>

              {/* Coming Soon Overlay */}
              {currentAgent.isComingSoon && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
                  <span className="bg-white/90 backdrop-blur-sm text-zinc-900 font-semibold text-xl px-8 py-4 rounded-full shadow-lg">
                    Em breve
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

// Dashboard Mockup Component
const DashboardMockup = () => (
  <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden">
    <div className="flex">
      {/* Sidebar - Minimalist Icons */}
      <div className="hidden md:flex flex-col w-14 bg-zinc-50 border-r border-zinc-200 py-4 items-center gap-3">
        {/* Home icon */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
        </div>
        {/* Bar chart icon */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        {/* Mail icon */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22,6 L12,13 L2,6" />
          </svg>
        </div>
        {/* Analytics icon - Active */}
        <div className="w-8 h-8 rounded-lg bg-[#1a3a4a] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M7 17l4-4 4 4 5-5" />
          </svg>
        </div>
        {/* Settings icon */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h3 className="font-inter font-semibold text-base md:text-lg text-zinc-900">Dashboard</h3>
            <p className="text-[10px] md:text-xs text-zinc-500">Atualizado agora</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="bg-zinc-100 text-zinc-700 text-xs px-3 py-1.5 rounded-lg">
              Este Mês
            </div>
            <button className="bg-dalton-blue text-white text-xs px-4 py-1.5 rounded-lg">
              Exportar
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="bg-zinc-50 rounded-xl p-3 md:p-4 border border-zinc-100">
            <span className="text-[10px] md:text-xs text-zinc-500">Leads Processados</span>
            <p className="font-inter font-bold text-lg md:text-2xl text-zinc-900">23.456</p>
            <p className="text-[10px] md:text-xs text-green-600 font-medium">↗ +12.5%</p>
          </div>
          <div className="bg-zinc-50 rounded-xl p-3 md:p-4 border border-zinc-100">
            <span className="text-[10px] md:text-xs text-zinc-500">Taxa de Engajamento</span>
            <p className="font-inter font-bold text-lg md:text-2xl text-zinc-900">64.9%</p>
            <p className="text-[10px] md:text-xs text-green-600 font-medium">↗ +8.3%</p>
          </div>
          <div className="bg-zinc-50 rounded-xl p-3 md:p-4 border border-zinc-100">
            <span className="text-[10px] md:text-xs text-zinc-500">Taxa de Conversão</span>
            <p className="font-inter font-bold text-lg md:text-2xl text-zinc-900">45.1%</p>
            <p className="text-[10px] md:text-xs text-green-600 font-medium">↗ +2.1%</p>
          </div>
          <div className="bg-zinc-50 rounded-xl p-3 md:p-4 border border-zinc-100">
            <span className="text-[10px] md:text-xs text-zinc-500">Agendamentos</span>
            <p className="font-inter font-bold text-lg md:text-2xl text-zinc-900">1.847</p>
            <p className="text-[10px] md:text-xs text-green-600 font-medium">↗ +15.7%</p>
          </div>
        </div>

        {/* Charts Row - Desktop only */}
        <div className="hidden md:grid grid-cols-12 gap-4">
          {/* Line Chart */}
          <div className="col-span-5 bg-white rounded-xl p-4 border border-zinc-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-zinc-900">Performance</span>
              <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">Mensal</span>
            </div>
            <div className="h-24 relative pl-8">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <line x1="0" y1="25" x2="300" y2="25" stroke="#f4f4f5" strokeWidth="1" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#f4f4f5" strokeWidth="1" />
                <line x1="0" y1="75" x2="300" y2="75" stroke="#f4f4f5" strokeWidth="1" />
                <path 
                  d="M0,85 L50,80 L100,75 L150,70 L200,65 L250,60 L300,55" 
                  fill="none" 
                  stroke="#d4d4d8" 
                  strokeWidth="2" 
                  strokeDasharray="4,4"
                />
                <path 
                  d="M0,90 L50,60 L100,45 L150,55 L200,20 L250,35 L300,30" 
                  fill="none" 
                  stroke="#18181b" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="20" r="4" fill="#18181b" />
                <circle cx="300" cy="30" r="4" fill="#18181b" />
              </svg>
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-zinc-400">
                <span>380K</span>
                <span>190K</span>
                <span>0K</span>
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="col-span-4 bg-white rounded-xl p-4 border border-zinc-100">
            <span className="text-sm font-semibold text-zinc-900">Por Canal</span>
            <div className="flex items-center gap-4 mt-2">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray="105.6 251.2" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="62.8 251.2" strokeDashoffset="-105.6" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="45.2 251.2" strokeDashoffset="-168.4" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-zinc-900">5.7K</span>
                </div>
              </div>
              <div className="space-y-1 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-zinc-600">WhatsApp (42%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-zinc-600">Email (25%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-zinc-600">Chat (18%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="col-span-3 bg-white rounded-xl p-4 border border-zinc-100">
            <span className="text-sm font-semibold text-zinc-900">Insights</span>
            <div className="space-y-1.5 mt-2">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-[10px] text-amber-800">
                Conversão <span className="font-semibold">+23%</span> pela manhã
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-[10px] text-blue-800">
                Enterprise: <span className="font-semibold">2.3x</span> mais conversão
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-[10px] text-green-800">
                Tempo de resposta: <span className="font-semibold">1.2s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProspectionSection;
