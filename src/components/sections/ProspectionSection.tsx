import { useState } from 'react';
import { Check } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import WaitlistModal from '@/components/ui/WaitlistModal';
import blurBackground from '@/assets/backgrounds/blur-gradient.jpg';
import buttonLightGradient from '@/assets/backgrounds/button-light-gradient.jpg';

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
    title: 'Atenda todos seus leads 24/7',
    description: 'O Dalton automatiza o seu processo comercial, escalando suas vendas e garantindo receita previsível.',
    features: [
      'Respostas instantâneas',
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
        {/* Fixed Header - Outside Card */}
        <div className={`text-center mb-8 md:mb-10 ${revealClasses(isVisible)}`}>
          <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-[48px] text-[#F5F3F0] leading-tight mb-3">
            IA que vende para você
          </h2>
          <p className="text-base md:text-lg text-[#F5F3F0]/70 max-w-2xl mx-auto">
            Qualifica leads, agenda reuniões, fecha vendas e atrai seu cliente ideal.
          </p>
        </div>

        {/* Content Box - Fixed height */}
        <div className="bg-[#F5F3F0] rounded-3xl p-6 md:p-10 lg:p-12">
          {/* Tabs - Large and prominent */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-12 ${revealClasses(isVisible)}`}
          >
            {(['vendas', 'conteudo', 'anuncio'] as AgentTab[]).map((tab) => {
              const isActive = activeTab === tab;
              const tabLabels: Record<AgentTab, string> = {
                vendas: 'Vendas',
                conteudo: 'Conteúdo',
                anuncio: 'Anúncio',
              };
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative px-4 py-4 md:py-6 text-left transition-all duration-300 group rounded-xl
                    ${isActive 
                      ? 'bg-[#e8e6e3]' 
                      : 'bg-[#F5F3F0] hover:bg-[#eae8e5]'
                    }
                  `}
                >
                  <span className={`block text-xs md:text-base mb-1 ${isActive ? 'text-zinc-600' : 'text-zinc-500'}`}>
                    Agente de
                  </span>
                  <span className={`
                    block font-inter font-bold text-2xl md:text-3xl lg:text-[40px] transition-colors leading-tight
                    ${isActive ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'}
                  `}>
                    {tabLabels[tab]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Content Grid - Fixed min-height for consistency */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center min-h-[400px]">
            {/* Left: Text Content */}
            <div 
              className={`${revealClasses(isVisible)}`}
              style={getStaggerDelay(1)}
            >
              {/* Title */}
              <h3 
                className="font-inter font-bold text-2xl md:text-3xl lg:text-[36px] text-zinc-900 leading-tight mb-4"
              >
                {currentAgent.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-zinc-600 leading-relaxed mb-6 max-w-lg">
                {currentAgent.description}
              </p>

              {/* Feature List - Check only, no checkbox */}
              <ul className="space-y-3 mb-6">
                {currentAgent.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-zinc-900 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm md:text-base text-zinc-700 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center font-medium text-sm px-6 py-3 rounded-full transition-all duration-300 relative overflow-hidden"
                style={{
                  background: currentAgent.ctaAction === 'modal' 
                    ? `url(${buttonLightGradient}) center/cover no-repeat` 
                    : '#101823',
                  backgroundAttachment: 'scroll',
                  color: currentAgent.ctaAction === 'modal' ? '#1A232F' : '#fff'
                }}
              >
                {currentAgent.ctaText}
              </button>
            </div>

            {/* Right: Dashboard or Coming Soon Image - Fixed size container */}
            <div 
              className={`relative flex items-center justify-center ${revealClasses(isVisible)}`}
              style={getStaggerDelay(2)}
            >
              <div className="relative w-full max-w-[320px] mx-auto aspect-square">
                {currentAgent.isComingSoon ? (
                  /* Coming Soon Background with Blur Image - All corners rounded */
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src={blurBackground} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                      <span className="bg-white/95 backdrop-blur-sm text-zinc-900 font-semibold text-lg md:text-xl px-6 py-3 rounded-full shadow-lg">
                        Em breve
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Dashboard Mockup - Sales Preview */
                  <SalesDashboardMockup />
                )}
              </div>
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

// Sales Dashboard Mockup - Matching the reference design
const SalesDashboardMockup = () => (
  <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden h-full flex flex-col">
    {/* KPI Cards Row */}
    <div className="grid grid-cols-2 gap-3 p-4 pb-2">
      <div className="bg-white rounded-xl p-3 border border-zinc-100">
        <div className="flex items-center gap-1 text-[10px] text-zinc-500 mb-1">
          <span>↗</span>
          <span>Taxa de Conversão</span>
        </div>
        <p className="font-inter font-bold text-2xl text-zinc-900">45.1%</p>
        <p className="text-[10px] text-green-600 font-medium">↗ +2.1% vs Last Week</p>
      </div>
      <div className="bg-white rounded-xl p-3 border border-zinc-100">
        <div className="flex items-center gap-1 text-[10px] text-zinc-500 mb-1">
          <span>📅</span>
          <span>Agendamentos Realizados</span>
        </div>
        <p className="font-inter font-bold text-2xl text-zinc-900">1.847</p>
        <p className="text-[10px] text-green-600 font-medium">↗ +15.7% vs Last Week</p>
      </div>
    </div>

    {/* Line Chart */}
    <div className="px-4 py-2 flex-1">
      <div className="bg-white rounded-xl p-3 border border-zinc-100 h-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-xs font-semibold text-zinc-900">
            <span>↗</span>
            <span>Performance de Conversação</span>
          </div>
          <div className="flex gap-1">
            <span className="text-[8px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">Mensal</span>
            <span className="text-[8px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">Pipeline Gerado</span>
          </div>
        </div>
        <div className="h-20 relative">
          <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
            {/* Y-axis labels simulation */}
            <text x="5" y="10" className="text-[6px] fill-zinc-400">R$380K</text>
            <text x="5" y="30" className="text-[6px] fill-zinc-400">R$285K</text>
            <text x="5" y="50" className="text-[6px] fill-zinc-400">R$190K</text>
            <text x="5" y="70" className="text-[6px] fill-zinc-400">R$95K</text>
            
            {/* Grid lines */}
            <line x1="40" y1="10" x2="295" y2="10" stroke="#f4f4f5" strokeWidth="1" />
            <line x1="40" y1="30" x2="295" y2="30" stroke="#f4f4f5" strokeWidth="1" />
            <line x1="40" y1="50" x2="295" y2="50" stroke="#f4f4f5" strokeWidth="1" />
            <line x1="40" y1="70" x2="295" y2="70" stroke="#f4f4f5" strokeWidth="1" />
            
            {/* Gray line (previous period) */}
            <path 
              d="M40,45 L80,35 L120,50 L160,40 L200,30 L240,35 L280,40" 
              fill="none" 
              stroke="#d4d4d8" 
              strokeWidth="1.5"
            />
            
            {/* Black line (current period) */}
            <path 
              d="M40,55 L80,35 L120,50 L160,10 L200,25 L240,18 L280,35" 
              fill="none" 
              stroke="#18181b" 
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="160" cy="10" r="3" fill="#18181b" />
            <circle cx="240" cy="18" r="3" fill="#18181b" />
          </svg>
        </div>
      </div>
    </div>

    {/* Insights Section */}
    <div className="px-4 pb-4">
      <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
        <div className="flex items-center gap-1 text-xs font-semibold text-zinc-900 mb-2">
          <span>💡</span>
          <span>Insights do Dalton</span>
        </div>
        <div className="space-y-1.5">
          <div className="bg-white rounded-lg p-2 text-[9px] text-zinc-700 border border-zinc-100">
            Taxa de conversão aumentou 23% nas conversas iniciadas antes das 10h
          </div>
          <div className="bg-white rounded-lg p-2 text-[9px] text-zinc-700 border border-zinc-100">
            Leads do segmento Enterprise têm 2.3x mais chance de conversão
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProspectionSection;
