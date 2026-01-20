import { MessageCircle, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import daltonIcon from '@/assets/dalton-icon.png';

const InsightsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const features = [
    {
      title: 'Análise de saúde do funil',
      description: 'Visibilidade sobre padrões e tendências, te trazendo previsibilidade nos seus negócios.',
    },
    {
      title: 'Insights inteligentes',
      description: 'Automatize',
    },
    {
      title: 'Atualizações instantâneas',
      description: 'O Dalton te mantém atualizado via WhatsApp. Dúvidas? Basta mandar uma mensagem ou aúdio.',
    },
  ];

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
              O desempenho do seu negócio na palma da sua mão.
            </h2>

            {/* Subtitle */}
            <p 
              className={`mt-4 font-inter font-normal text-lg md:text-xl text-zinc-600 max-w-lg ${revealClasses(isVisible)}`}
              style={getStaggerDelay(1)}
            >
              Transparência, previsibilidade e insights inteligentes, o Dalton te entrega tudo, de forma acessível.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`bg-[#E8E6E3] rounded-2xl p-6 ${revealClasses(isVisible)}`}
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

          {/* Right Column - Phone Mockups */}
          <div 
            className={`relative h-[480px] md:h-[560px] flex items-center justify-center ${revealClasses(isVisible)}`}
            style={getStaggerDelay(3)}
          >
            {/* Back Phone - Dashboard App (iPhone style) */}
            <div 
              className="absolute z-10"
              style={{ 
                width: '180px',
                height: '368px',
                top: '0',
                right: '12%',
              }}
            >
              {/* iPhone Frame */}
              <div 
                className="relative w-full h-full bg-zinc-900 shadow-2xl"
                style={{ 
                  borderRadius: '36px',
                  padding: '8px',
                }}
              >
                {/* Screen */}
                <div 
                  className="relative w-full h-full bg-white overflow-hidden"
                  style={{ borderRadius: '28px' }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-zinc-900 rounded-full z-10" />
                  
                  {/* Dashboard Content */}
                  <div className="pt-9 px-2.5 pb-2 h-full bg-zinc-50 overflow-hidden">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3 text-zinc-600" />
                        <span className="text-[9px] font-semibold text-zinc-700">Dashboard</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-zinc-200" />
                    </div>

                    {/* Pipeline Widget */}
                    <div className="bg-white rounded-xl p-2.5 shadow-sm mb-2">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="w-2.5 h-2.5 text-green-500" />
                        <span className="text-[7px] text-zinc-500 font-medium">Pipeline Generated</span>
                      </div>
                      <p className="font-inter font-bold text-sm text-zinc-900">$565,202</p>
                      <p className="text-[7px] text-green-500 font-medium">↗ +19% vs Last Week</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-1.5 mb-2">
                      <div className="bg-green-50 rounded-lg p-2">
                        <Users className="w-2.5 h-2.5 text-green-600 mb-1" />
                        <p className="text-[7px] text-zinc-500">Leads</p>
                        <p className="font-semibold text-xs text-zinc-900">1,234</p>
                        <p className="text-[6px] text-green-600 font-medium">+12%</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <DollarSign className="w-2.5 h-2.5 text-blue-600 mb-1" />
                        <p className="text-[7px] text-zinc-500">Revenue</p>
                        <p className="font-semibold text-xs text-zinc-900">$89K</p>
                        <p className="text-[6px] text-blue-600 font-medium">+8%</p>
                      </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="bg-white rounded-xl p-2.5 shadow-sm">
                      <p className="text-[7px] text-zinc-500 font-medium mb-1.5">Weekly Performance</p>
                      <div className="flex items-end gap-1 h-10">
                        <div className="flex-1 bg-green-400 rounded-t-sm" style={{ height: '40%' }} />
                        <div className="flex-1 bg-green-400 rounded-t-sm" style={{ height: '60%' }} />
                        <div className="flex-1 bg-green-400 rounded-t-sm" style={{ height: '45%' }} />
                        <div className="flex-1 bg-green-400 rounded-t-sm" style={{ height: '80%' }} />
                        <div className="flex-1 bg-green-400 rounded-t-sm" style={{ height: '70%' }} />
                        <div className="flex-1 bg-green-500 rounded-t-sm" style={{ height: '100%' }} />
                        <div className="flex-1 bg-green-400 rounded-t-sm" style={{ height: '85%' }} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-zinc-900/30 rounded-full" />
                </div>
              </div>
            </div>

            {/* Front Phone - WhatsApp (iPhone style) */}
            <div 
              className="absolute z-20"
              style={{ 
                width: '165px',
                height: '337px',
                bottom: '0',
                left: '8%',
              }}
            >
              {/* iPhone Frame */}
              <div 
                className="relative w-full h-full bg-zinc-900 shadow-2xl"
                style={{ 
                  borderRadius: '32px',
                  padding: '7px',
                }}
              >
                {/* Screen */}
                <div 
                  className="relative w-full h-full overflow-hidden flex flex-col"
                  style={{ 
                    borderRadius: '25px',
                    backgroundColor: '#E5DDD5',
                  }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-zinc-900 rounded-full z-20" />
                  
                  {/* WhatsApp Header */}
                  <div 
                    className="relative pt-7 px-2 pb-1.5 flex items-center gap-2 shrink-0"
                    style={{ backgroundColor: '#075E54' }}
                  >
                    <img 
                      src={daltonIcon} 
                      alt="Dalton Lab" 
                      className="w-6 h-6 rounded-full object-cover bg-zinc-800 border border-white/20" 
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-[9px] font-semibold block">Dalton Lab</span>
                      <p className="text-white/70 text-[7px]">online</p>
                    </div>
                    <MessageCircle className="w-3 h-3 text-white shrink-0" />
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div 
                        className="rounded-lg px-2 py-1.5 max-w-[88%] shadow-sm"
                        style={{ backgroundColor: '#DCF8C6' }}
                      >
                        <p className="text-[8px] text-zinc-800 leading-relaxed">
                          Dalton, quantas reuniões foram feitas essa semana?
                        </p>
                        <p className="text-[6px] text-zinc-500 text-right mt-0.5">10:32</p>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-2 py-1.5 max-w-[88%] shadow-sm">
                        <p className="text-[8px] text-zinc-800 leading-relaxed">
                          Foram feitas 30 reuniões essa semana com potencial de 300K em ARR. Gostaria de saber mais?
                        </p>
                        <p className="text-[6px] text-zinc-500 text-right mt-0.5">10:33</p>
                      </div>
                    </div>
                  </div>

                  {/* Input Bar */}
                  <div 
                    className="px-1.5 py-1.5 flex items-center gap-1.5 shrink-0"
                    style={{ backgroundColor: '#F0F0F0' }}
                  >
                    <div className="flex-1 bg-white rounded-full px-2.5 py-1 shadow-sm">
                      <span className="text-[7px] text-zinc-400">Mensagem</span>
                    </div>
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#075E54' }}
                    >
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-zinc-900/30 rounded-full" />
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
