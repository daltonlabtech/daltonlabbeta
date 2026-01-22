import { useState, useEffect } from 'react';
import { MessageCircle, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import daltonIcon from '@/assets/dalton-icon.png';

const InsightsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [messageIndex, setMessageIndex] = useState(0);

  const features = [
    {
      title: 'Alertas em tempo real',
      description: 'Lead parado há 3 dias? Reunião sem follow-up? O Dalton identifica e te notifica antes que vire problema.',
    },
    {
      title: 'Resumos diários sob demanda',
      description: 'Pergunte "como foi ontem?" por áudio ou texto. O Dalton responde com análises, não com dashboards.',
    },
    {
      title: 'Previsões, não só relatórios',
      description: 'O Dalton analisa padrões e te diz o que provavelmente vai acontecer no seu funil, não só o que já aconteceu.',
    },
  ];

  const chatMessages = [
    { type: 'user', text: 'Dalton, quantas reuniões foram feitas essa semana?', time: '10:32' },
    { type: 'bot', text: 'Foram feitas 30 reuniões essa semana com potencial de 300K em ARR. Gostaria de saber mais?', time: '10:33' },
  ];

  // Cycle through conversation states: 0 = typing user, 1 = user sent, 2 = typing bot, 3 = bot sent, 4 = typing user again
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding overflow-hidden"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Heading */}
            <h2 
              className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-900 leading-tight ${revealClasses(isVisible)}`}
            >
              Pergunte pro Dalton. Ele sabe.
            </h2>

            {/* Subtitle */}
            <p 
              className={`mt-4 font-inter font-normal text-sm md:text-base text-zinc-600 max-w-lg ${revealClasses(isVisible)}`}
              style={getStaggerDelay(1)}
            >
              Ele avisa quando um lead esfria, o funil trava ou é hora de fechar. Tudo no <span className="font-bold" style={{ color: '#73cf60' }}>WhatsApp</span>.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`bg-[#E8E6E3] rounded-2xl p-6 ${revealClasses(isVisible)} hover:scale-[1.02] transition-transform duration-300`}
                  style={getStaggerDelay(index + 2)}
                >
                  <h3 className="font-inter font-semibold text-xl text-zinc-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-base text-zinc-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Phone Mockups with Callouts */}
          <div 
            className={`relative h-[500px] md:h-[720px] flex items-center justify-center ${revealClasses(isVisible)}`}
            style={getStaggerDelay(3)}
          >
            {/* Callout 1 - Dashboard metrics (top right) */}
            <div 
              className="absolute hidden md:block z-30 animate-subtle-float"
              style={{ top: '-10px', right: '-20px', animationDelay: '0s' }}
            >
              <div className="relative bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-lg max-w-[180px]">
                <p className="text-sm font-semibold leading-snug">
                  Métricas em tempo real
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Pipeline, leads e revenue atualizados
                </p>
                {/* Pointer arrow */}
                <div 
                  className="absolute w-3 h-3 bg-zinc-900 rotate-45"
                  style={{ bottom: '-6px', left: '30px' }}
                />
              </div>
            </div>

            {/* Callout 2 - WhatsApp integration (bottom left) */}
            <div 
              className="absolute hidden md:block z-30 animate-subtle-float"
              style={{ bottom: '60px', left: '-40px', animationDelay: '1s' }}
            >
              <div className="relative bg-white text-zinc-900 px-4 py-3 rounded-2xl shadow-lg border border-zinc-200 max-w-[200px]">
                <p className="text-sm font-semibold leading-snug">
                  Converse pelo WhatsApp
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Pergunte qualquer coisa, receba respostas instantâneas
                </p>
                {/* Pointer arrow */}
                <div 
                  className="absolute w-3 h-3 bg-white border-r border-b border-zinc-200 rotate-45"
                  style={{ top: '20px', right: '-6px' }}
                />
              </div>
            </div>

            {/* Callout 3 - Growth indicator (middle right) */}
            <div 
              className="absolute hidden md:block z-30 animate-subtle-float"
              style={{ top: '180px', right: '-60px', animationDelay: '2s' }}
            >
              <div className="relative bg-green-500 text-white px-4 py-2.5 rounded-2xl shadow-lg">
                <p className="text-sm font-bold animate-value-pulse">
                  +19% crescimento
                </p>
                {/* Pointer arrow */}
                <div 
                  className="absolute w-3 h-3 bg-green-500 rotate-45"
                  style={{ top: '50%', left: '-5px', transform: 'translateY(-50%) rotate(45deg)' }}
                />
              </div>
            </div>

            {/* Back Phone - Dashboard App (iPhone style) - Hidden on Mobile */}
            <div 
              className="absolute z-10 animate-subtle-float hidden md:block"
              style={{ 
                width: '270px',
                height: '552px',
                top: '30px',
                right: '10%',
                animationDelay: '0.5s',
              }}
            >
              {/* iPhone Frame */}
              <div 
                className="relative w-full h-full bg-zinc-900 shadow-2xl"
                style={{ 
                  borderRadius: '54px',
                  padding: '12px',
                }}
              >
                {/* Screen */}
                <div 
                  className="relative w-full h-full bg-white overflow-hidden"
                  style={{ borderRadius: '42px' }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-zinc-900 rounded-full z-10" />
                  
                  {/* Dashboard Content - New Design */}
                  <div className="pt-14 px-3 pb-3 h-full bg-zinc-50 overflow-hidden">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-zinc-600" />
                        <span className="text-[13px] font-semibold text-zinc-700">Dashboard</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-zinc-200" />
                    </div>

                    {/* KPI Cards Row */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-white rounded-xl p-2.5 shadow-sm">
                        <p className="text-[9px] text-zinc-500 mb-0.5">Leads</p>
                        <p className="font-inter font-bold text-lg text-zinc-900 animate-value-pulse">23.4K</p>
                        <p className="text-[8px] text-green-500 font-medium">↗ +12.5%</p>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 shadow-sm">
                        <p className="text-[9px] text-zinc-500 mb-0.5">Conversão</p>
                        <p className="font-inter font-bold text-lg text-zinc-900 animate-value-pulse" style={{ animationDelay: '0.3s' }}>45.1%</p>
                        <p className="text-[8px] text-green-500 font-medium">↗ +2.1%</p>
                      </div>
                    </div>

                    {/* Mini Line Chart */}
                    <div className="bg-white rounded-xl p-3 shadow-sm mb-3">
                      <p className="text-[9px] text-zinc-500 font-medium mb-2">Performance Semanal</p>
                      <div className="h-12 relative">
                        <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                          <path 
                            d="M0,45 L30,35 L60,25 L90,30 L120,15 L150,20 L180,10 L200,15" 
                            fill="none" 
                            stroke="#18181b" 
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{ strokeDasharray: '300', strokeDashoffset: '300', animation: 'drawLine 2s ease-out forwards' }}
                          />
                          <circle cx="120" cy="15" r="3" fill="#18181b" className="animate-pulse-dot" />
                          <circle cx="180" cy="10" r="3" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '0.5s' }} />
                        </svg>
                      </div>
                    </div>

                    {/* Mini Donut Chart */}
                    <div className="bg-white rounded-xl p-3 shadow-sm mb-3">
                      <p className="text-[9px] text-zinc-500 font-medium mb-2">Canais</p>
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#22c55e" strokeWidth="10" strokeDasharray="92.4 219.8" className="animate-donut-segment" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="55 219.8" strokeDashoffset="-92.4" className="animate-donut-segment" style={{ animationDelay: '0.2s' }} />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#ec4899" strokeWidth="10" strokeDasharray="72.4 219.8" strokeDashoffset="-147.4" className="animate-donut-segment" style={{ animationDelay: '0.4s' }} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-zinc-900">5.7K</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-1 text-[8px]">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-zinc-600">WhatsApp 42%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-zinc-600">Email 25%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-pink-500" />
                            <span className="text-zinc-600">Outros 33%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insights Cards */}
                    <div className="space-y-1.5">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-[8px] text-amber-800 animate-insight-card">
                        💡 Conversões +23% pela manhã
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-[8px] text-blue-800 animate-insight-card" style={{ animationDelay: '0.3s' }}>
                        💡 Enterprise: 2.3x conversão
                      </div>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-900/30 rounded-full" />
                </div>
              </div>
            </div>

            {/* Front Phone - WhatsApp (iPhone style) */}
            <div 
              className="relative md:absolute z-20 md:bottom-0 md:left-[5%]"
              style={{ 
                width: '248px',
                height: '506px',
              }}
            >
              {/* iPhone Frame */}
              <div 
                className="relative w-full h-full bg-zinc-900 shadow-2xl"
                style={{ 
                  borderRadius: '48px',
                  padding: '10px',
                }}
              >
                {/* Screen */}
                <div 
                  className="relative w-full h-full overflow-hidden flex flex-col"
                  style={{ 
                    borderRadius: '38px',
                    backgroundColor: '#E5DDD5',
                  }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-zinc-900 rounded-full z-20" />
                  
                  {/* WhatsApp Header */}
                  <div 
                    className="relative pt-10 px-3 pb-2 flex items-center gap-3 shrink-0"
                    style={{ backgroundColor: '#075E54' }}
                  >
                    <div className="w-9 h-9 rounded-full bg-black border-2 border-white/20 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/src/assets/d-branco.png" 
                        alt="Dalton Lab" 
                        className="w-5 h-5 object-contain" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-[13px] font-semibold block">Dalton Lab</span>
                      <p className="text-white/70 text-[10px]">online</p>
                    </div>
                    <MessageCircle className="w-5 h-5 text-white shrink-0" />
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-3 space-y-2 overflow-hidden">
                    {/* Typing Indicator - User (green) - State 0 */}
                    <div className={`flex justify-end transition-all duration-300 ${messageIndex === 0 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                      <div 
                        className="rounded-xl px-4 py-3 shadow-sm flex items-center gap-1"
                        style={{ backgroundColor: '#DCF8C6' }}
                      >
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot" />
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot-2" />
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot-3" />
                      </div>
                    </div>

                    {/* Message 1 - User (green) - State 1+ */}
                    <div className={`flex justify-end transition-all duration-500 ${messageIndex >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div 
                        className="rounded-xl px-3 py-2 max-w-[88%] shadow-sm animate-message-appear"
                        style={{ backgroundColor: '#DCF8C6' }}
                      >
                        <p className="text-[12px] text-zinc-800 leading-relaxed">
                          {chatMessages[0].text}
                        </p>
                        <p className="text-[9px] text-zinc-500 text-right mt-1">{chatMessages[0].time}</p>
                      </div>
                    </div>

                    {/* Typing Indicator - Bot (white) - State 2 */}
                    <div className={`flex justify-start transition-all duration-300 ${messageIndex === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                      <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot" />
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot-2" />
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot-3" />
                      </div>
                    </div>

                    {/* Message 2 - Bot (white) - State 3+ */}
                    <div className={`flex justify-start transition-all duration-500 ${messageIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="bg-white rounded-xl px-3 py-2 max-w-[88%] shadow-sm animate-message-appear">
                        <p className="text-[12px] text-zinc-800 leading-relaxed">
                          {chatMessages[1].text}
                        </p>
                        <p className="text-[9px] text-zinc-500 text-right mt-1">{chatMessages[1].time}</p>
                      </div>
                    </div>

                    {/* Typing Indicator - User (green) again - State 4 */}
                    <div className={`flex justify-end transition-all duration-300 ${messageIndex === 4 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                      <div 
                        className="rounded-xl px-4 py-3 shadow-sm flex items-center gap-1"
                        style={{ backgroundColor: '#DCF8C6' }}
                      >
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot" />
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot-2" />
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot-3" />
                      </div>
                    </div>
                  </div>

                  {/* Input Bar */}
                  <div 
                    className="px-2 py-2 flex items-center gap-2 shrink-0"
                    style={{ backgroundColor: '#F0F0F0' }}
                  >
                    <div className="flex-1 bg-white rounded-full px-4 py-1.5 shadow-sm">
                      <span className="text-[10px] text-zinc-400">Mensagem</span>
                    </div>
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#075E54' }}
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-zinc-900/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;