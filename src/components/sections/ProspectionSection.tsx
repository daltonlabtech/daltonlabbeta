import { useState } from 'react';
import { Check } from 'lucide-react';
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

  const tabLabels: Record<AgentTab, { prefix: string; name: string }> = {
    vendas: { prefix: 'Agente de', name: 'Vendas' },
    conteudo: { prefix: 'Agente de', name: 'Conteúdo' },
    anuncio: { prefix: 'Agente de', name: 'Anúncio' },
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="pt-8 pb-[60px] md:pt-12 md:pb-[120px] bg-[#101823] overflow-hidden"
    >
      <div className="container-main">
        {/* Content Box */}
        <div className="bg-[#F5F3F0] rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Fixed Title & Subtitle */}
          <div className={`text-center mb-10 ${revealClasses(isVisible)}`}>
            <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-[42px] text-zinc-900 leading-tight mb-3">
              A IA que vende para você.
            </h2>
            <p className="text-base md:text-lg text-zinc-600">
              Qualifica leads, agenda reuniões, fecha vendas e atrai seu cliente ideal.
            </p>
          </div>

          {/* Tabs */}
          <div 
            className={`flex flex-wrap justify-center gap-4 md:gap-8 mb-10 ${revealClasses(isVisible)}`}
          >
            {(['vendas', 'conteudo', 'anuncio'] as AgentTab[]).map((tab) => {
              const isActive = activeTab === tab;
              const { prefix, name } = tabLabels[tab];
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative px-4 py-2 transition-all duration-300 text-left
                    ${isActive 
                      ? 'border-b-2 border-zinc-900' 
                      : 'border-b-2 border-transparent hover:border-zinc-300'
                    }
                  `}
                >
                  <span className="block text-xs text-zinc-500 font-medium">
                    {prefix}
                  </span>
                  <span className={`block text-xl md:text-2xl font-bold ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    {name}
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
              {/* Title */}
              <h3 
                className="font-inter font-bold text-2xl md:text-3xl lg:text-[36px] text-zinc-900 leading-tight mb-6"
              >
                {currentAgent.title}
              </h3>

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

              {/* CTA Button - No arrow */}
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center bg-[#101823] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#1a2533] transition-all duration-300"
              >
                {currentAgent.ctaText}
              </button>
            </div>

            {/* Right: Dashboard or Coming Soon Image */}
            <div 
              className={`relative ${revealClasses(isVisible)}`}
              style={getStaggerDelay(2)}
            >
              {currentAgent.isComingSoon ? (
                /* Coming Soon State - Gradient background */
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  {/* Gradient background similar to header video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a3d] via-[#0f1923] to-[#101823]">
                    {/* Subtle animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--dalton-purple)/0.2)] via-transparent to-[hsl(var(--dalton-blue)/0.15)]" />
                    {/* Noise texture */}
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")' }} />
                  </div>
                  
                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm text-zinc-900 font-semibold text-xl px-8 py-4 rounded-full shadow-lg">
                      Em breve
                    </span>
                  </div>
                </div>
              ) : (
                /* Dashboard State - Square format */
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <CompactDashboardMockup />
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

// Compact Dashboard Mockup Component - Square format
const CompactDashboardMockup = () => (
  <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden h-full">
    <div className="p-4 md:p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-inter font-semibold text-sm md:text-base text-zinc-900">Dashboard</h3>
          <p className="text-[9px] md:text-[10px] text-zinc-500">Atualizado agora</p>
        </div>
        <button className="bg-dalton-blue text-white text-[10px] px-3 py-1 rounded-lg">
          Exportar
        </button>
      </div>

      {/* KPI Cards - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
        <div className="bg-zinc-50 rounded-xl p-2.5 md:p-3 border border-zinc-100">
          <span className="text-[9px] md:text-[10px] text-zinc-500">Leads</span>
          <p className="font-inter font-bold text-base md:text-lg text-zinc-900">23.456</p>
          <p className="text-[9px] text-green-600 font-medium">↗ +12.5%</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-2.5 md:p-3 border border-zinc-100">
          <span className="text-[9px] md:text-[10px] text-zinc-500">Engajamento</span>
          <p className="font-inter font-bold text-base md:text-lg text-zinc-900">64.9%</p>
          <p className="text-[9px] text-green-600 font-medium">↗ +8.3%</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-2.5 md:p-3 border border-zinc-100">
          <span className="text-[9px] md:text-[10px] text-zinc-500">Conversão</span>
          <p className="font-inter font-bold text-base md:text-lg text-zinc-900">45.1%</p>
          <p className="text-[9px] text-green-600 font-medium">↗ +2.1%</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-2.5 md:p-3 border border-zinc-100">
          <span className="text-[9px] md:text-[10px] text-zinc-500">Agendamentos</span>
          <p className="font-inter font-bold text-base md:text-lg text-zinc-900">1.847</p>
          <p className="text-[9px] text-green-600 font-medium">↗ +15.7%</p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 bg-white rounded-xl p-3 border border-zinc-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-900">Performance</span>
          <span className="text-[9px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">Mensal</span>
        </div>
        <div className="h-20 relative">
          <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="300" y2="20" stroke="#f4f4f5" strokeWidth="1" />
            <line x1="0" y1="40" x2="300" y2="40" stroke="#f4f4f5" strokeWidth="1" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="#f4f4f5" strokeWidth="1" />
            <path 
              d="M0,70 L50,50 L100,35 L150,45 L200,15 L250,25 L300,20" 
              fill="none" 
              stroke="#18181b" 
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="200" cy="15" r="4" fill="#18181b" />
            <circle cx="300" cy="20" r="4" fill="#18181b" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default ProspectionSection;
