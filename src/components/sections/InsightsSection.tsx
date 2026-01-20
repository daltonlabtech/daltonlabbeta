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
            className={`relative h-[520px] md:h-[620px] flex items-center justify-center ${revealClasses(isVisible)}`}
            style={getStaggerDelay(3)}
          >
            {/* Back Phone - Dashboard App (iPhone style) */}
            <div 
              className="absolute z-10"
              style={{ 
                width: '220px',
                height: '450px',
                top: '0',
                right: '10%',
              }}
            >
              {/* iPhone Frame */}
              <div 
                className="relative w-full h-full bg-zinc-900 shadow-2xl"
                style={{ 
                  borderRadius: '44px',
                  padding: '10px',
                }}
              >
                {/* Screen */}
                <div 
                  className="relative w-full h-full bg-white overflow-hidden"
                  style={{ borderRadius: '34px' }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-zinc-900 rounded-full z-10" />
                  
                  {/* Dashboard Content */}
                  <div className="pt-14 px-4 pb-4 h-full bg-zinc-50">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-zinc-700" />
                        <span className="text-sm font-semibold text-zinc-800">Dashboard</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-zinc-200" />
                    </div>

                    {/* Pipeline Widget */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-zinc-500 font-medium">Pipeline Generated</span>
                      </div>
                      <p className="font-inter font-bold text-2xl text-zinc-900">$565,202</p>
                      <p className="text-xs text-green-500 font-medium mt-1">↗ +19% vs Last Week</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-green-50 rounded-xl p-3">
                        <Users className="w-4 h-4 text-green-600 mb-2" />
                        <p className="text-xs text-zinc-500">Leads</p>
                        <p className="font-semibold text-lg text-zinc-900">1,234</p>
                        <p className="text-xs text-green-600 font-medium">+12%</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3">
                        <DollarSign className="w-4 h-4 text-blue-600 mb-2" />
                        <p className="text-xs text-zinc-500">Revenue</p>
                        <p className="font-semibold text-lg text-zinc-900">$89K</p>
                        <p className="text-xs text-blue-600 font-medium">+8%</p>
                      </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <p className="text-xs text-zinc-500 font-medium mb-3">Weekly Performance</p>
                      <div className="flex items-end gap-1.5 h-16">
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
                </div>
              </div>
            </div>

            {/* Front Phone - WhatsApp (iPhone style) */}
            <div 
              className="absolute z-20"
              style={{ 
                width: '200px',
                height: '410px',
                bottom: '0',
                left: '5%',
              }}
            >
              {/* iPhone Frame */}
              <div 
                className="relative w-full h-full bg-zinc-900 shadow-2xl"
                style={{ 
                  borderRadius: '40px',
                  padding: '9px',
                }}
              >
                {/* Screen */}
                <div 
                  className="relative w-full h-full overflow-hidden"
                  style={{ 
                    borderRadius: '31px',
                    backgroundColor: '#E5DDD5',
                  }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-zinc-900 rounded-full z-20" />
                  
                  {/* WhatsApp Header */}
                  <div 
                    className="relative pt-10 px-3 pb-2 flex items-center gap-3"
                    style={{ backgroundColor: '#075E54' }}
                  >
                    <img 
                      src={daltonIcon} 
                      alt="Dalton Lab" 
                      className="w-9 h-9 rounded-full object-cover bg-zinc-800 border-2 border-white/20" 
                    />
                    <div>
                      <span className="text-white text-sm font-semibold">Dalton Lab</span>
                      <p className="text-white/70 text-[10px]">online</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-3 space-y-2 flex-1">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div 
                        className="rounded-lg px-3 py-2 max-w-[85%] shadow-sm"
                        style={{ backgroundColor: '#DCF8C6' }}
                      >
                        <p className="text-xs text-zinc-800 leading-relaxed">
                          Dalton, quantas reuniões foram feitas essa semana?
                        </p>
                        <p className="text-[9px] text-zinc-500 text-right mt-1">10:32</p>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-3 py-2 max-w-[85%] shadow-sm">
                        <p className="text-xs text-zinc-800 leading-relaxed">
                          Foram feitas 30 reuniões essa semana com potencial de 300K em ARR. Gostaria de saber mais sobre os clientes?
                        </p>
                        <p className="text-[9px] text-zinc-500 text-right mt-1">10:33</p>
                      </div>
                    </div>
                  </div>

                  {/* Input Bar */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 px-2 py-2 flex items-center gap-2"
                    style={{ backgroundColor: '#F0F0F0' }}
                  >
                    <div className="flex-1 bg-white rounded-full px-4 py-2 shadow-sm">
                      <span className="text-xs text-zinc-400">Mensagem</span>
                    </div>
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#075E54' }}
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-900/30 rounded-full" />
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
