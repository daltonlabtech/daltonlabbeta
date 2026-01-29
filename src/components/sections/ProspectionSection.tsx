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

// Sales Dashboard Mockup - Minimalist Pipeline Chart
const SalesDashboardMockup = () => (
  <div className="bg-[#e8e6e3] rounded-2xl overflow-hidden h-full flex flex-col p-5">
    {/* Tabs */}
    <div className="flex gap-2 mb-6">
      <span className="text-[11px] text-zinc-500 bg-white/60 px-3 py-1.5 rounded-full">Campaign 1</span>
      <span className="text-[11px] text-zinc-500 bg-white/60 px-3 py-1.5 rounded-full">Campaign 2</span>
      <span className="text-[11px] text-zinc-900 bg-zinc-900 text-white px-3 py-1.5 rounded-full font-medium">Campaign 3</span>
    </div>

    {/* Chart Area */}
    <div className="flex-1 relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-zinc-400 w-6">
        <span>20</span>
        <span>15</span>
        <span>10</span>
        <span>5</span>
      </div>
      
      {/* Chart */}
      <div className="ml-8 h-full pb-6">
        <svg className="w-full h-full" viewBox="0 0 280 100" preserveAspectRatio="none">
          {/* Grid lines - subtle */}
          <line x1="0" y1="0" x2="280" y2="0" stroke="#d4d4d8" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="0" y1="25" x2="280" y2="25" stroke="#d4d4d8" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="0" y1="50" x2="280" y2="50" stroke="#d4d4d8" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="0" y1="75" x2="280" y2="75" stroke="#d4d4d8" strokeWidth="0.5" strokeDasharray="4 4" />
          
          {/* Gray line (Campaign 1) - flat trend */}
          <path 
            d="M0,70 L47,68 L94,65 L141,63 L188,60 L235,58 L280,55" 
            fill="none" 
            stroke="#a1a1aa" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Dark gray line (Campaign 2) - slight growth */}
          <path 
            d="M0,75 L47,60 L94,50 L141,45 L188,40 L235,35 L280,30" 
            fill="none" 
            stroke="#71717a" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Black line (Campaign 3) - STRONG UPWARD TREND with animation */}
          <path 
            d="M0,85 L47,70 L94,55 L141,40 L188,28 L235,18 L280,10" 
            fill="none" 
            stroke="#18181b" 
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-draw-line"
          />
          
          {/* Animated dot at end of main line */}
          <circle cx="280" cy="10" r="6" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '1s' }} />
          
          {/* Avatar indicator at the peak */}
          <g className="animate-bounce-subtle" style={{ animationDelay: '1.5s' }}>
            <circle cx="260" cy="15" r="12" fill="#18181b" stroke="white" strokeWidth="2" />
            <text x="260" y="19" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">↗</text>
          </g>
        </svg>
      </div>
      
      {/* X-axis labels */}
      <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] text-zinc-400">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>
    </div>
  </div>
);

export default ProspectionSection;
