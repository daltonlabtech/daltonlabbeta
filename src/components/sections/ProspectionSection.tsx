import { ArrowRight } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const ProspectionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="pt-8 pb-[60px] md:pt-12 md:pb-[120px] bg-[#101823] overflow-hidden"
    >
      <div className="container-main">
        {/* Content Box */}
        <div className="bg-[#F5F3F0] rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Heading */}
          <h2 
            className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-zinc-900 text-center leading-tight ${revealClasses(isVisible)}`}
          >
            Automatize seu funil com Agentes de IA
          </h2>

        {/* Subtitle */}
        <p 
          className={`mt-4 font-inter font-normal text-base md:text-lg text-zinc-600 text-center max-w-3xl mx-auto ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          Deixe sua equipe focar no que realmente importa.
        </p>

        {/* CTA Button */}
        <div 
          className={`mt-8 flex justify-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(2)}
        >
          <a href="/newton" className="bg-[#101823] text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-[#1a2533] transition-all duration-300">
            Fale com o Dalton
          </a>
        </div>

        {/* Dashboard Mockup */}
        <div 
          className={`mt-12 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(3)}
        >
          {/* Desktop Dashboard - New Design based on reference */}
          <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden animate-dashboard-glow hidden md:block">
            <div className="flex">
              {/* Sidebar */}
              <div className="flex flex-col w-14 bg-zinc-50 border-r border-zinc-200 py-4 items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center animate-pulse-scale overflow-hidden">
                  <img src="/src/assets/dalton-icon.png" alt="Dalton" className="w-5 h-5 object-contain" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center animate-icon-bounce" style={{ animationDelay: '0.2s' }}>
                  <div className="w-4 h-4 rounded-sm bg-zinc-400" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-dalton-blue/10 flex items-center justify-center animate-icon-bounce" style={{ animationDelay: '0.4s' }}>
                  <div className="w-4 h-4 rounded-full bg-dalton-blue animate-ping-slow" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center animate-icon-bounce" style={{ animationDelay: '0.6s' }}>
                  <div className="w-4 h-4 rounded-sm bg-zinc-400" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center animate-icon-bounce" style={{ animationDelay: '0.8s' }}>
                  <div className="w-4 h-4 rounded-sm bg-zinc-400" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-inter font-semibold text-lg text-zinc-900">Dashboard</h3>
                    <p className="text-xs text-zinc-500">Atualizado agora</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-zinc-100 text-zinc-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <span>📅</span>
                      <span>Este Mês</span>
                    </div>
                    <button className="bg-dalton-blue text-white text-xs px-4 py-1.5 rounded-lg hover:bg-dalton-blue/90 transition-colors">
                      Exportar Relatório
                    </button>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-zinc-500">👥 Leads Processados</span>
                    </div>
                    <p className="font-inter font-bold text-2xl text-zinc-900 animate-counter-up">23.456</p>
                    <p className="text-xs text-green-600 font-medium animate-value-pulse">↗ +12.5% vs Last Week</p>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-zinc-500">💬 Taxa de Engajamento</span>
                    </div>
                    <p className="font-inter font-bold text-2xl text-zinc-900 animate-counter-up" style={{ animationDelay: '0.2s' }}>64.9%</p>
                    <p className="text-xs text-green-600 font-medium animate-value-pulse">↗ +8.3% vs Last Week</p>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-zinc-500">🔄 Taxa de Conversão</span>
                    </div>
                    <p className="font-inter font-bold text-2xl text-zinc-900 animate-counter-up" style={{ animationDelay: '0.4s' }}>45.1%</p>
                    <p className="text-xs text-green-600 font-medium animate-value-pulse">↗ +2.1% vs Last Week</p>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-zinc-500">📅 Agendamentos</span>
                    </div>
                    <p className="font-inter font-bold text-2xl text-zinc-900 animate-counter-up" style={{ animationDelay: '0.6s' }}>1.847</p>
                    <p className="text-xs text-green-600 font-medium animate-value-pulse">↗ +15.7% vs Last Week</p>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-12 gap-4 mb-6">
                  {/* Line Chart - Performance de Conversação */}
                  <div className="col-span-5 bg-white rounded-xl p-4 border border-zinc-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-zinc-900">📈 Performance de Conversação</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">Mensal</span>
                        <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">Pipeline Gerado</span>
                      </div>
                    </div>
                    {/* Chart SVG */}
                    <div className="h-32 relative">
                      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="25" x2="300" y2="25" stroke="#f4f4f5" strokeWidth="1" />
                        <line x1="0" y1="50" x2="300" y2="50" stroke="#f4f4f5" strokeWidth="1" />
                        <line x1="0" y1="75" x2="300" y2="75" stroke="#f4f4f5" strokeWidth="1" />
                        
                        {/* Previous period (gray line) */}
                        <path 
                          d="M0,85 L50,80 L100,75 L150,70 L200,65 L250,60 L300,55" 
                          fill="none" 
                          stroke="#d4d4d8" 
                          strokeWidth="2" 
                          strokeDasharray="4,4"
                          className="animate-draw-line"
                        />
                        
                        {/* Current period (black line with animation) */}
                        <path 
                          d="M0,90 L50,60 L100,45 L150,55 L200,20 L250,35 L300,30" 
                          fill="none" 
                          stroke="#18181b" 
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="animate-draw-line-primary"
                          style={{ strokeDasharray: '400', strokeDashoffset: '400', animation: 'drawLine 2s ease-out forwards' }}
                        />
                        
                        {/* Data points with pulse */}
                        <circle cx="0" cy="90" r="4" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '0s' }} />
                        <circle cx="50" cy="60" r="4" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '0.2s' }} />
                        <circle cx="100" cy="45" r="4" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '0.4s' }} />
                        <circle cx="150" cy="55" r="4" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '0.6s' }} />
                        <circle cx="200" cy="20" r="4" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '0.8s' }} />
                        <circle cx="250" cy="35" r="4" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '1s' }} />
                        <circle cx="300" cy="30" r="4" fill="#18181b" className="animate-pulse-dot" style={{ animationDelay: '1.2s' }} />
                      </svg>
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[9px] text-zinc-400 -ml-8">
                        <span>R$380K</span>
                        <span>R$285K</span>
                        <span>R$190K</span>
                        <span>R$95K</span>
                        <span>R$0K</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-0.5 bg-zinc-900 rounded" />
                        <span>Período atual</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-0.5 bg-zinc-400 rounded" style={{ borderStyle: 'dashed' }} />
                        <span>Período anterior</span>
                      </div>
                    </div>
                  </div>

                  {/* Donut Chart - Desempenho por Canal */}
                  <div className="col-span-4 bg-white rounded-xl p-4 border border-zinc-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-zinc-900">📊 Desempenho por Canal</span>
                      <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">Mensal</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Donut Chart SVG */}
                      <div className="relative w-28 h-28">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* WhatsApp - 42% */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#22c55e" 
                            strokeWidth="12"
                            strokeDasharray="105.6 251.2"
                            strokeDashoffset="0"
                            className="animate-donut-segment"
                            style={{ animationDelay: '0s' }}
                          />
                          {/* Email - 25% */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="12"
                            strokeDasharray="62.8 251.2"
                            strokeDashoffset="-105.6"
                            className="animate-donut-segment"
                            style={{ animationDelay: '0.2s' }}
                          />
                          {/* Chat Web - 18% */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#06b6d4" 
                            strokeWidth="12"
                            strokeDasharray="45.2 251.2"
                            strokeDashoffset="-168.4"
                            className="animate-donut-segment"
                            style={{ animationDelay: '0.4s' }}
                          />
                          {/* Instagram - 10% */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#ec4899" 
                            strokeWidth="12"
                            strokeDasharray="25.1 251.2"
                            strokeDashoffset="-213.6"
                            className="animate-donut-segment"
                            style={{ animationDelay: '0.6s' }}
                          />
                          {/* LinkedIn - 5% */}
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="none" 
                            stroke="#8b5cf6" 
                            strokeWidth="12"
                            strokeDasharray="12.6 251.2"
                            strokeDashoffset="-238.7"
                            className="animate-donut-segment"
                            style={{ animationDelay: '0.8s' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-bold text-zinc-900 animate-counter-up">5,700</span>
                          <span className="text-[9px] text-zinc-500">leads totais</span>
                        </div>
                      </div>
                      {/* Legend */}
                      <div className="flex-1 space-y-1.5 text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          <span className="text-zinc-600">WhatsApp (42%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          <span className="text-zinc-600">Email (25%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                          <span className="text-zinc-600">Chat Web (18%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                          <span className="text-zinc-600">Instagram (10%)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                          <span className="text-zinc-600">LinkedIn (5%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insights do Dalton */}
                  <div className="col-span-3 bg-white rounded-xl p-4 border border-zinc-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold text-zinc-900">💡 Insights do Dalton</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-[10px] text-amber-800 animate-insight-card" style={{ animationDelay: '0.2s' }}>
                        Taxa de conversão aumentou <span className="font-semibold">23%</span> nas conversas iniciadas antes das 10h
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-[10px] text-blue-800 animate-insight-card" style={{ animationDelay: '0.4s' }}>
                        Leads do segmento Enterprise têm <span className="font-semibold">2.3x</span> mais chance de conversão
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 text-[10px] text-green-800 animate-insight-card" style={{ animationDelay: '0.6s' }}>
                        Tempo médio de resposta da IA: <span className="font-semibold">1.2s</span> (18% mais rápido)
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-2.5 text-[10px] text-purple-800 animate-insight-card" style={{ animationDelay: '0.8s' }}>
                        Palavras-chave com maior taxa: <span className="font-semibold">'ROI', 'integração', 'suporte'</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Table */}
                <div className="bg-white rounded-xl border border-zinc-100 overflow-hidden">
                  <div className="p-4 border-b border-zinc-100">
                    <span className="text-sm font-semibold text-zinc-900">📊 Atividade</span>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-zinc-100 bg-zinc-50">
                        <th className="text-left p-3 text-zinc-500 font-medium">Lead</th>
                        <th className="text-left p-3 text-zinc-500 font-medium">Empresa</th>
                        <th className="text-left p-3 text-zinc-500 font-medium">Cargo</th>
                        <th className="text-left p-3 text-zinc-500 font-medium">Score</th>
                        <th className="text-left p-3 text-zinc-500 font-medium">Canal</th>
                        <th className="text-left p-3 text-zinc-500 font-medium">Status</th>
                        <th className="text-left p-3 text-zinc-500 font-medium">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors animate-row-slide" style={{ animationDelay: '0s' }}>
                        <td className="p-3 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-medium">MS</div>
                          <span className="font-medium text-zinc-900">Maria Silva</span>
                        </td>
                        <td className="p-3 text-zinc-600">Tech Corp</td>
                        <td className="p-3 text-zinc-600">Diretora de Marketing</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                              <div className="h-full bg-dalton-blue rounded-full animate-score-bar" style={{ width: '98%' }} />
                            </div>
                            <span className="text-zinc-900 font-medium">98</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="flex items-center gap-1 text-zinc-600">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            WhatsApp
                          </span>
                        </td>
                        <td className="p-3"><span className="text-green-600 font-medium">Convertido</span></td>
                        <td className="p-3 text-zinc-500">Hoje, 14:32</td>
                      </tr>
                      <tr className="hover:bg-zinc-50/50 transition-colors animate-row-slide" style={{ animationDelay: '0.15s' }}>
                        <td className="p-3 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-medium">JS</div>
                          <span className="font-medium text-zinc-900">João Santos</span>
                        </td>
                        <td className="p-3 text-zinc-600">Vendas Pro</td>
                        <td className="p-3 text-zinc-600">CEO</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                              <div className="h-full bg-dalton-blue rounded-full animate-score-bar" style={{ width: '94%', animationDelay: '0.2s' }} />
                            </div>
                            <span className="text-zinc-900 font-medium">94</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="flex items-center gap-1 text-zinc-600">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Email
                          </span>
                        </td>
                        <td className="p-3"><span className="text-orange-500 font-medium">Em negociação</span></td>
                        <td className="p-3 text-zinc-500">Hoje, 13:15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Dashboard - Compact Version */}
          <div className="md:hidden mt-8 bg-white rounded-xl shadow-lg border border-zinc-200 overflow-hidden p-4 max-w-[320px] mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-zinc-900 flex items-center justify-center overflow-hidden">
                <img src="/src/assets/dalton-icon.png" alt="Dalton" className="w-4 h-4 object-contain" />
              </div>
              <span className="text-xs font-semibold text-zinc-700">Dashboard</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-zinc-50 rounded-lg p-2">
                <p className="text-[9px] text-zinc-500">Leads</p>
                <p className="font-semibold text-sm text-zinc-900 animate-value-pulse">23.456</p>
              </div>
              <div className="bg-zinc-50 rounded-lg p-2">
                <p className="text-[9px] text-zinc-500">Conversão</p>
                <p className="font-semibold text-sm text-zinc-900 animate-value-pulse" style={{ animationDelay: '0.3s' }}>45.1%</p>
              </div>
            </div>
            {/* Mini Insights */}
            <div className="space-y-2">
              <div className="bg-amber-50 rounded-lg p-2 text-[9px] text-amber-800 animate-insight-card">
                💡 Conversões +23% pela manhã
              </div>
              <div className="bg-blue-50 rounded-lg p-2 text-[9px] text-blue-800 animate-insight-card" style={{ animationDelay: '0.2s' }}>
                💡 Enterprise: 2.3x mais conversão
              </div>
            </div>
          </div>
        </div>

          {/* Feature Cards */}
          <div 
            className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(4)}
          >
            {/* Vendas */}
            <div className="text-left">
              <span className="text-[#101823] text-sm font-medium">
                Agente de
              </span>
              <h3 className="font-inter font-semibold text-2xl text-zinc-900 mb-2">Vendas</h3>
              <p className="text-base text-zinc-600 leading-relaxed">
                Nunca perca um lead. Respostas instantâneas 24/7, qualificação automatizada e receita previsível.
              </p>
            </div>

            {/* Conteúdo */}
            <div className="text-left">
              <span className="text-zinc-900/40 text-sm font-medium">
                Agente de
              </span>
              <div className="flex items-center gap-2 justify-start mb-2">
                <h3 className="font-inter font-semibold text-2xl text-zinc-900/40">Conteúdo</h3>
                <span className="bg-gradient-to-r from-[hsl(var(--dalton-purple))] to-[hsl(271,76%,45%)] text-white text-[10px] font-medium px-2 py-0.5 rounded-full uppercase">
                  Em breve
                </span>
              </div>
              <p className="text-base text-zinc-600/60 leading-relaxed">
                Gere leads orgânicos. Agentes de IA que estudam sua marca, criam posts, roteiros e newsletters no seu tom de voz.
              </p>
            </div>

            {/* Anúncio */}
            <div className="text-left">
              <span className="text-zinc-900/40 text-sm font-medium">
                Agente de
              </span>
              <div className="flex items-center gap-2 justify-start mb-2">
                <h3 className="font-inter font-semibold text-2xl text-zinc-900/40">Anúncio</h3>
                <span className="bg-gradient-to-r from-[hsl(var(--dalton-purple))] to-[hsl(271,76%,45%)] text-white text-[10px] font-medium px-2 py-0.5 rounded-full uppercase">
                  Em breve
                </span>
              </div>
              <p className="text-base text-zinc-600/60 leading-relaxed">
                Anuncie para o público certo. Realize testes em massa, identifique padrões e melhore a performance do seu funil de Ads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProspectionSection;