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
                className="inline-flex items-center justify-center font-medium text-sm px-6 py-3 rounded-full transition-all duration-300 bg-[#101823] text-white hover:bg-zinc-800"
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
                  /* Coming Soon Background with Blur Image - All corners rounded - Light Monochromatic */
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img 
                      src={blurBackground} 
                      alt="" 
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl grayscale brightness-125 contrast-75"
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

// Sales Dashboard Mockup - Static Smooth Line Chart
const SalesDashboardMockup = () => (
  <div className="bg-[#e8e6e3] rounded-2xl overflow-hidden h-full flex flex-col p-4 justify-center relative">
    {/* Conversão de leads tag */}
    <div className="absolute top-4 left-4 z-10">
      <span className="bg-zinc-800 text-white text-xs font-medium px-3 py-1.5 rounded-full">
        Conversão de leads
      </span>
    </div>
    <svg className="w-full h-full" viewBox="0 0 280 180" preserveAspectRatio="xMidYMid meet">
      {/* Gradient definition for area fill */}
      <defs>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a1a1aa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Y-axis labels */}
      <text x="20" y="35" fontSize="10" fill="#71717a" fontFamily="Inter, sans-serif">20</text>
      <text x="20" y="70" fontSize="10" fill="#71717a" fontFamily="Inter, sans-serif">15</text>
      <text x="20" y="105" fontSize="10" fill="#71717a" fontFamily="Inter, sans-serif">10</text>
      <text x="24" y="140" fontSize="10" fill="#71717a" fontFamily="Inter, sans-serif">5</text>
      
      {/* Vertical grid lines */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line 
          key={i}
          x1={45 + i * 35} 
          y1="25" 
          x2={45 + i * 35} 
          y2="145" 
          stroke="#d4d4d8" 
          strokeOpacity="0.3" 
          strokeWidth="1"
        />
      ))}
      
      {/* X-axis labels (S, T, Q, Q, S, S, D) */}
      {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => (
        <text 
          key={i}
          x={45 + i * 35} 
          y="160" 
          fontSize="10" 
          fill="#71717a" 
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
        >
          {day}
        </text>
      ))}
      
      {/* Upper trend line (subtle) */}
      <path 
        d="M45,125 Q80,115 115,100 Q150,80 185,55 Q220,45 255,35" 
        fill="none" 
        stroke="#a1a1aa" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      
      {/* Lower trend line (subtle) */}
      <path 
        d="M45,140 Q80,132 115,122 Q150,108 185,90 Q220,82 255,72" 
        fill="none" 
        stroke="#a1a1aa" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      
      {/* Area fill below main line */}
      <path 
        d="M45,135 Q80,125 115,110 Q150,90 185,70 Q220,60 255,50 L255,145 L45,145 Z" 
        fill="url(#areaGradient)"
      />
      
      {/* Main line - ascending curve from ~5 to ~17-18 */}
      <path 
        d="M45,135 Q80,125 115,110 Q150,90 185,70 Q220,60 255,50" 
        fill="none" 
        stroke="#18181b" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Highlighted data point on Thursday (~15) */}
      <circle 
        cx="150" 
        cy="70" 
        r="7" 
        fill="#18181b" 
        stroke="white" 
        strokeWidth="3"
      />
    </svg>
  </div>
);

export default ProspectionSection;
