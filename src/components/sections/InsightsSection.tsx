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
            className={`relative h-[500px] md:h-[600px] ${revealClasses(isVisible)}`}
            style={getStaggerDelay(3)}
          >
            {/* Back Phone - Dashboard App */}
            <div className="absolute top-0 right-0 md:right-4 w-52 md:w-60 z-10">
              <div className="bg-zinc-900 rounded-[2rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[1.75rem] overflow-hidden">
                  {/* App Header */}
                  <div className="bg-zinc-50 px-3 py-2 flex items-center justify-between border-b border-zinc-100">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-zinc-700" />
                      <span className="text-xs font-medium text-zinc-700">Dashboard</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-zinc-200" />
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-3 space-y-3">
                    {/* Pipeline Widget */}
                    <div className="bg-zinc-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-[10px] text-zinc-500">Pipeline Generated</span>
                      </div>
                      <p className="font-inter font-bold text-xl text-zinc-900">$565,202</p>
                      <p className="text-[10px] text-green-500">↗ +19% vs Last Week</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 rounded-lg p-2">
                        <Users className="w-3 h-3 text-green-600 mb-1" />
                        <p className="text-[10px] text-zinc-500">Leads</p>
                        <p className="font-semibold text-sm text-zinc-900">1,234</p>
                        <p className="text-[9px] text-green-600">+12%</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <DollarSign className="w-3 h-3 text-blue-600 mb-1" />
                        <p className="text-[10px] text-zinc-500">Revenue</p>
                        <p className="font-semibold text-sm text-zinc-900">$89K</p>
                        <p className="text-[9px] text-blue-600">+8%</p>
                      </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="bg-zinc-50 rounded-xl p-3">
                      <p className="text-[10px] text-zinc-500 mb-2">Weekly Performance</p>
                      <div className="flex items-end gap-1 h-12">
                        <div className="flex-1 bg-green-400 rounded-t" style={{ height: '40%' }} />
                        <div className="flex-1 bg-green-400 rounded-t" style={{ height: '60%' }} />
                        <div className="flex-1 bg-green-400 rounded-t" style={{ height: '45%' }} />
                        <div className="flex-1 bg-green-400 rounded-t" style={{ height: '80%' }} />
                        <div className="flex-1 bg-green-400 rounded-t" style={{ height: '70%' }} />
                        <div className="flex-1 bg-green-500 rounded-t" style={{ height: '100%' }} />
                        <div className="flex-1 bg-green-400 rounded-t" style={{ height: '85%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Front Phone - WhatsApp */}
            <div className="absolute bottom-0 left-0 md:left-4 w-56 md:w-64 z-20">
              <div className="bg-zinc-900 rounded-[2.5rem] p-2.5 shadow-2xl">
                <div className="bg-[#E5DDD5] rounded-[2rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
                    <img src={daltonIcon} alt="Dalton Lab" className="w-7 h-7 rounded-full object-cover bg-zinc-800" />
                    <span className="text-white text-xs font-medium">Dalton Lab</span>
                    <div className="ml-auto flex items-center gap-2">
                      <MessageCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-3 space-y-2 min-h-[240px]">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] rounded-lg px-2.5 py-1.5 max-w-[85%] shadow-sm">
                        <p className="text-xs text-zinc-800">Dalton, quantas reuniões foram feitas essa semana?</p>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-2.5 py-1.5 max-w-[85%] shadow-sm">
                        <p className="text-xs text-zinc-800">Foram feitas 30 reuniões essa semana com potencial de 300K em ARR. Gostaria de saber mais sobre os clientes?</p>
                      </div>
                    </div>
                  </div>

                  {/* Input Bar */}
                  <div className="bg-[#F0F0F0] px-2 py-1.5 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full px-3 py-1.5">
                      <span className="text-[10px] text-zinc-400">|</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center">
                      <MessageCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
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
