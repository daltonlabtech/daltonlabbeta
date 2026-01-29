import { useState, useEffect } from 'react';
import { MessageCircle, BarChart3 } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import daltonCircleLogo from '@/assets/dalton-logo-circle.webp';

const InsightsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [messageIndex, setMessageIndex] = useState(0);

  const features = [
    {
      title: 'Ciclo completo',
      description: 'Da prospecção ao fechamento, do post ao anúncio. Tudo automatizado.',
    },
    {
      title: 'Escala infinita',
      description: 'Atende todos seus leads com a mesma qualidade e velocidade.',
    },
    {
      title: 'Alertas em tempo real',
      description: 'Ele avisa quando há uma nova venda, traz previsões de faturamento e gera insights. Tudo no WhatsApp.',
    },
  ];

  const chatMessages = [
    { type: 'bot', text: 'Oi, Rodrigo!', time: '10:30' },
    { type: 'bot', text: 'Notícia boa: batemos 119% da meta este mês!', time: '10:30' },
    { type: 'user', text: 'Boa, Dalton!', time: '10:31' },
    { type: 'bot', text: 'Que tal testarmos minha funcionalidade de conteúdo próximo mês?', time: '10:31' },
    { type: 'user', text: 'Bora nessa!', time: '10:32' },
  ];

  // Cycle through conversation states (6 states: typing + 5 messages)
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % 7);
    }, 2000);
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
              IAs conversam.<br />
              Dalton vende.
            </h2>

            {/* Subtitle */}
            <p 
              className={`mt-4 font-inter font-normal text-sm md:text-base text-zinc-600 max-w-lg ${revealClasses(isVisible)}`}
              style={getStaggerDelay(1)}
            >
              A nova forma de escalar os seus negócios.
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

            {/* Callout 2 - Natural Language (bottom left) */}
            <div 
              className="absolute hidden md:block z-30 animate-subtle-float"
              style={{ bottom: '60px', left: '-40px', animationDelay: '1s' }}
            >
              <div className="relative bg-white text-zinc-900 px-4 py-3 rounded-2xl shadow-lg border border-zinc-200 max-w-[200px]">
                <p className="text-sm font-semibold leading-snug">
                  Linguagem natural
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Compreende contexto, tom e intenção em cada conversa
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
                  
                  {/* Dashboard Content */}
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
                        <p className="font-inter font-bold text-lg text-zinc-900">23.4K</p>
                        <p className="text-[8px] text-green-500 font-medium">↗ +12.5%</p>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 shadow-sm">
                        <p className="text-[9px] text-zinc-500 mb-0.5">Conversão</p>
                        <p className="font-inter font-bold text-lg text-zinc-900">45.1%</p>
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
                          />
                          <circle cx="120" cy="15" r="3" fill="#18181b" />
                          <circle cx="180" cy="10" r="3" fill="#18181b" />
                        </svg>
                      </div>
                    </div>

                    {/* Mini Donut Chart */}
                    <div className="bg-white rounded-xl p-3 shadow-sm mb-3">
                      <p className="text-[9px] text-zinc-500 font-medium mb-2">Canais</p>
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#22c55e" strokeWidth="10" strokeDasharray="92.4 219.8" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="55 219.8" strokeDashoffset="-92.4" />
                            <circle cx="50" cy="50" r="35" fill="none" stroke="#ec4899" strokeWidth="10" strokeDasharray="72.4 219.8" strokeDashoffset="-147.4" />
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
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-[8px] text-amber-800">
                        💡 Conversões +23% pela manhã
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-[8px] text-blue-800">
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
                    <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
                      <img 
                        src={daltonCircleLogo}
                        alt="Logo do Dalton Lab no WhatsApp" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={36}
                        height={36}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-[13px] font-semibold block">Dalton Lab</span>
                      <p className="text-white/70 text-[10px]">online</p>
                    </div>
                    <MessageCircle className="w-5 h-5 text-white shrink-0" />
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-3 space-y-1.5 overflow-hidden">
                    {/* Typing Indicator - Bot (white) - State 0 */}
                    <div className={`flex justify-start transition-all duration-300 ${messageIndex === 0 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                      <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot" />
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot-2" />
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-typing-dot-3" />
                      </div>
                    </div>

                    {/* Message 1 - Bot: "Oi, Rodrigo!" - State 1+ */}
                    <div className={`flex justify-start transition-all duration-500 ${messageIndex >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="bg-white rounded-xl px-3 py-2 max-w-[88%] shadow-sm">
                        <p className="text-[11px] text-zinc-800 leading-relaxed">
                          {chatMessages[0].text}
                        </p>
                        <p className="text-[8px] text-zinc-500 text-right mt-0.5">{chatMessages[0].time}</p>
                      </div>
                    </div>

                    {/* Message 2 - Bot: "Notícia boa..." - State 2+ */}
                    <div className={`flex justify-start transition-all duration-500 ${messageIndex >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="bg-white rounded-xl px-3 py-2 max-w-[88%] shadow-sm">
                        <p className="text-[11px] text-zinc-800 leading-relaxed">
                          {chatMessages[1].text}
                        </p>
                        <p className="text-[8px] text-zinc-500 text-right mt-0.5">{chatMessages[1].time}</p>
                      </div>
                    </div>

                    {/* Message 3 - Bot: "Analisando os números..." - State 3+ */}
                    <div className={`flex justify-start transition-all duration-500 ${messageIndex >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="bg-white rounded-xl px-3 py-2 max-w-[88%] shadow-sm">
                        <p className="text-[11px] text-zinc-800 leading-relaxed">
                          {chatMessages[2].text}
                        </p>
                        <p className="text-[8px] text-zinc-500 text-right mt-0.5">{chatMessages[2].time}</p>
                      </div>
                    </div>

                    {/* Message 4 - Bot: "Que tal um teste..." - State 4+ */}
                    <div className={`flex justify-start transition-all duration-500 ${messageIndex >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="bg-white rounded-xl px-3 py-2 max-w-[88%] shadow-sm">
                        <p className="text-[11px] text-zinc-800 leading-relaxed">
                          {chatMessages[3].text}
                        </p>
                        <p className="text-[8px] text-zinc-500 text-right mt-0.5">{chatMessages[3].time}</p>
                      </div>
                    </div>

                    {/* Typing Indicator - User (green) - State 5 */}
                    <div className={`flex justify-end transition-all duration-300 ${messageIndex === 5 ? 'opacity-100' : 'opacity-0 hidden'}`}>
                      <div 
                        className="rounded-xl px-4 py-3 shadow-sm flex items-center gap-1"
                        style={{ backgroundColor: '#DCF8C6' }}
                      >
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot" />
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot-2" />
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-typing-dot-3" />
                      </div>
                    </div>

                    {/* Message 5 - User: "Bora nessa!" - State 6+ */}
                    <div className={`flex justify-end transition-all duration-500 ${messageIndex >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div 
                        className="rounded-xl px-3 py-2 max-w-[88%] shadow-sm"
                        style={{ backgroundColor: '#DCF8C6' }}
                      >
                        <p className="text-[11px] text-zinc-800 leading-relaxed">
                          {chatMessages[4].text}
                        </p>
                        <p className="text-[8px] text-zinc-500 text-right mt-0.5">{chatMessages[4].time}</p>
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
