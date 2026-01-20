import { Smartphone, MessageCircle, TrendingUp } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

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
              className={`mt-4 font-inter font-normal text-lg md:text-xl text-zinc-600 ${revealClasses(isVisible)}`}
              style={getStaggerDelay(1)}
            >
              Transparência, previsibilidade e insights inteligentes, o Dalton te entrega tudo, de forma acessível, via WhatsApp ou App.
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

          {/* Right Column - Phone Mockup */}
          <div 
            className={`relative ${revealClasses(isVisible)}`}
            style={getStaggerDelay(3)}
          >
            {/* Pipeline Widget */}
            <div className="absolute -top-4 right-0 md:right-8 bg-white rounded-2xl shadow-xl p-4 z-20 w-48">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-zinc-500">Pipeline Generated</span>
              </div>
              <p className="font-inter font-bold text-2xl text-zinc-900">$565,202</p>
              <p className="text-xs text-green-500 mt-1">↗ +19% vs Last Week</p>
            </div>

            {/* Phone Frame */}
            <div className="relative mx-auto w-64 md:w-72 mt-16">
              <div className="bg-zinc-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-[#E5DDD5] rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-300" />
                    <span className="text-white text-sm font-medium">Lorem ipsum</span>
                    <div className="ml-auto flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-white" />
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-3 min-h-[300px]">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-zinc-800">Dalton, quantas reuniões foram feitas essa semana?</p>
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-zinc-800">Foram feitas 30 reuniões essa semana com potencial de 300K em ARR. Gostaria de saber mais sobre os clientes?</p>
                      </div>
                    </div>
                  </div>

                  {/* Input Bar */}
                  <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full px-4 py-2">
                      <span className="text-xs text-zinc-400">|</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
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
