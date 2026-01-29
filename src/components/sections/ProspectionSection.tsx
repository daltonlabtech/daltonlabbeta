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
    title: 'Atenda todos seus leads com qualidade e velocidade',
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
                  /* Coming Soon Background with Blur Image */
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img 
                      src={blurBackground} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/95 backdrop-blur-sm text-zinc-900 font-semibold text-lg md:text-xl px-6 py-3 rounded-full shadow-lg">
                        Em breve
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Dashboard Mockup - Compact Square */
                  <CompactDashboardMockup />
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

// Compact Square Dashboard Mockup Component
const CompactDashboardMockup = () => (
  <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden h-full flex flex-col">
    {/* Header */}
    <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
      <div>
        <h3 className="font-inter font-semibold text-sm text-zinc-900">Dashboard</h3>
        <p className="text-[10px] text-zinc-500">Atualizado agora</p>
      </div>
      <button className="bg-dalton-blue text-white text-[10px] px-3 py-1 rounded-lg">
        Exportar
      </button>
    </div>

    {/* Content */}
    <div className="p-4 flex-1 flex flex-col gap-3">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
          <span className="text-[10px] text-zinc-500">Leads</span>
          <p className="font-inter font-bold text-xl text-zinc-900">23.456</p>
          <p className="text-[10px] text-green-600 font-medium">↗ +12.5%</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
          <span className="text-[10px] text-zinc-500">Engajamento</span>
          <p className="font-inter font-bold text-xl text-zinc-900">64.9%</p>
          <p className="text-[10px] text-green-600 font-medium">↗ +8.3%</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
          <span className="text-[10px] text-zinc-500">Conversão</span>
          <p className="font-inter font-bold text-xl text-zinc-900">45.1%</p>
          <p className="text-[10px] text-green-600 font-medium">↗ +2.1%</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
          <span className="text-[10px] text-zinc-500">Agendamentos</span>
          <p className="font-inter font-bold text-xl text-zinc-900">1.847</p>
          <p className="text-[10px] text-green-600 font-medium">↗ +15.7%</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-xl p-3 border border-zinc-100 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-zinc-900">Performance</span>
          <span className="text-[10px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">Mensal</span>
        </div>
        <div className="h-16 relative">
          <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
            <line x1="0" y1="15" x2="300" y2="15" stroke="#f4f4f5" strokeWidth="1" />
            <line x1="0" y1="30" x2="300" y2="30" stroke="#f4f4f5" strokeWidth="1" />
            <line x1="0" y1="45" x2="300" y2="45" stroke="#f4f4f5" strokeWidth="1" />
            <path 
              d="M0,50 L50,45 L100,40 L150,35 L200,30 L250,25 L300,20" 
              fill="none" 
              stroke="#d4d4d8" 
              strokeWidth="1.5" 
              strokeDasharray="4,4"
            />
            <path 
              d="M0,55 L50,35 L100,25 L150,30 L200,12 L250,18 L300,15" 
              fill="none" 
              stroke="#18181b" 
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="200" cy="12" r="3" fill="#18181b" />
            <circle cx="300" cy="15" r="3" fill="#18181b" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default ProspectionSection;
