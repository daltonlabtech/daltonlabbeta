import { MessageCircle, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import daltonIcon from '@/assets/dalton-icon.png';

const InsightsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const features = [
    {
      title: 'Alertas em tempo real',
      description: 'Lead parado há 3 dias? Reunião sem follow-up? O Dalton identifica e te notifica antes que vire problema.',
    },
    {
      title: 'Resumos diários sob demanda',
      description: 'Pergunte "como foi ontem?" por áudio ou texto. O Dalton responde com números, não com dashboards.',
    },
    {
      title: 'Previsões, não só relatórios',
      description: 'O Agente analisa padrões e te diz o que provavelmente vai acontecer no seu funil, não só o que já aconteceu.',
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
              Pergunte pro Dalton. Ele sabe.
            </h2>

            {/* Subtitle */}
            <p 
              className={`mt-4 font-inter font-normal text-lg md:text-xl text-zinc-600 max-w-lg ${revealClasses(isVisible)}`}
              style={getStaggerDelay(1)}
            >
              Ele te avisa quando um lead esfriou, quando o funil travou e quando uma oportunidade está pronta para fechar. Tudo no seu WhatsApp.
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

          {/* Right Column - Phone Mockups with Callouts */}
          <div 
            className={`relative h-[600px] md:h-[720px] flex items-center justify-center ${revealClasses(isVisible)}`}
            style={getStaggerDelay(3)}
          >
            {/* Callout 1 - Dashboard metrics (top right) */}
            <div 
              className="absolute hidden md:block z-30"
              style={{ top: '-10px', right: '-20px' }}
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
              className="absolute hidden md:block z-30"
              style={{ bottom: '60px', left: '-40px' }}
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
              className="absolute hidden md:block z-30"
              style={{ top: '180px', right: '-60px' }}
            >
              <div className="relative bg-green-500 text-white px-4 py-2.5 rounded-2xl shadow-lg">
                <p className="text-sm font-bold">
                  +19% crescimento
                </p>
                {/* Pointer arrow */}
                <div 
                  className="absolute w-3 h-3 bg-green-500 rotate-45"
                  style={{ top: '50%', left: '-5px', transform: 'translateY(-50%) rotate(45deg)' }}
                />
              </div>
            </div>

            {/* Back Phone - Dashboard App (iPhone style) */}
            <div 
              className="absolute z-10"
              style={{ 
                width: '270px',
                height: '552px',
                top: '30px',
                right: '10%',
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
                  <div className="pt-14 px-4 pb-3 h-full bg-zinc-50 overflow-hidden">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-zinc-600" />
                        <span className="text-[13px] font-semibold text-zinc-700">Dashboard</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-zinc-200" />
                    </div>

                    {/* Pipeline Widget */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] text-zinc-500 font-medium">Pipeline Generated</span>
                      </div>
                      <p className="font-inter font-bold text-xl text-zinc-900">$565,202</p>
                      <p className="text-[10px] text-green-500 font-medium">↗ +19% vs Last Week</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-green-50 rounded-xl p-3">
                        <Users className="w-4 h-4 text-green-600 mb-1.5" />
                        <p className="text-[10px] text-zinc-500">Leads</p>
                        <p className="font-semibold text-base text-zinc-900">1,234</p>
                        <p className="text-[9px] text-green-600 font-medium">+12%</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3">
                        <DollarSign className="w-4 h-4 text-blue-600 mb-1.5" />
                        <p className="text-[10px] text-zinc-500">Revenue</p>
                        <p className="font-semibold text-base text-zinc-900">$89K</p>
                        <p className="text-[9px] text-blue-600 font-medium">+8%</p>
                      </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm">
                      <p className="text-[10px] text-zinc-500 font-medium mb-2">Weekly Performance</p>
                      <div className="flex items-end gap-1.5 h-14">
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
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-900/30 rounded-full" />
                </div>
              </div>
            </div>

            {/* Front Phone - WhatsApp (iPhone style) */}
            <div 
              className="absolute z-20"
              style={{ 
                width: '248px',
                height: '506px',
                bottom: '0',
                left: '5%',
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
                    <img 
                      src={daltonIcon} 
                      alt="Dalton Lab" 
                      className="w-9 h-9 rounded-full object-cover bg-zinc-800 border-2 border-white/20" 
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-[13px] font-semibold block">Dalton Lab</span>
                      <p className="text-white/70 text-[10px]">online</p>
                    </div>
                    <MessageCircle className="w-5 h-5 text-white shrink-0" />
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-3 space-y-2 overflow-hidden">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div 
                        className="rounded-xl px-3 py-2 max-w-[88%] shadow-sm"
                        style={{ backgroundColor: '#DCF8C6' }}
                      >
                        <p className="text-[12px] text-zinc-800 leading-relaxed">
                          Dalton, quantas reuniões foram feitas essa semana?
                        </p>
                        <p className="text-[9px] text-zinc-500 text-right mt-1">10:32</p>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-xl px-3 py-2 max-w-[88%] shadow-sm">
                        <p className="text-[12px] text-zinc-800 leading-relaxed">
                          Foram feitas 30 reuniões essa semana com potencial de 300K em ARR. Gostaria de saber mais?
                        </p>
                        <p className="text-[9px] text-zinc-500 text-right mt-1">10:33</p>
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