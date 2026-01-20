import { ArrowRight } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const ProspectionSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-[#19212E] overflow-hidden"
    >
      <div className="container-main">
        {/* Content Box */}
        <div className="bg-[#F5F3F0] rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Heading */}
          <h2 
            className={`font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-zinc-900 text-center leading-tight ${revealClasses(isVisible)}`}
          >
            Da prospecção à venda: tudo em um só lugar.
          </h2>

        {/* Subtitle */}
        <p 
          className={`mt-4 font-inter font-normal text-lg md:text-xl text-zinc-600 text-center max-w-2xl mx-auto ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          Acelere seu crescimento com IA, enquanto sua equipe foca no que realmente importa.
        </p>

        {/* CTA Button */}
        <div 
          className={`mt-8 text-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(2)}
        >
          <button className="bg-zinc-900 text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center">
            Fale com o Dalton
          </button>
        </div>

        {/* Dashboard Mockup */}
        <div 
          className={`mt-12 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(3)}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden">
            <div className="flex">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col w-14 bg-zinc-50 border-r border-zinc-200 py-4 items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">11x</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-zinc-400" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-dalton-blue/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-dalton-blue" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-zinc-400" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-zinc-400" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                  <span>← Back</span>
                  <span>/</span>
                  <span>Campaigns</span>
                  <span>/</span>
                  <span className="text-zinc-900">US FinTech Campaign</span>
                </div>

                <h3 className="font-inter font-semibold text-lg md:text-xl text-zinc-900 mb-6">
                  US FinTech Campaign
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Campaign Details */}
                  <div className="space-y-4">
                    {/* Chat Interface */}
                    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-zinc-500">Alice</span>
                        <span className="text-xs font-medium text-zinc-500">Mike</span>
                        <span className="text-xs text-zinc-400">☆ 🔗</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
                          <div className="bg-white rounded-lg p-2 text-xs text-zinc-700 shadow-sm">
                            ⚡ Target Sales Leaders in the FinTech industry
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex-shrink-0" />
                          <div className="bg-white rounded-lg p-2 text-xs text-zinc-700 shadow-sm">
                            ❓ Any specific geographical location?
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <span className="bg-dalton-blue text-white text-xs px-3 py-1 rounded-full">
                            📍 San Francisco
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-zinc-600 mt-4">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-zinc-900">11,215</span>
                            <span>Identified Leads</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-zinc-900">8,429</span>
                            <span>📞 Phone Numbers</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="Further instructions?"
                          className="flex-1 bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-dalton-blue/20"
                        />
                        <button className="bg-zinc-900 text-white text-xs px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Tables */}
                  <div className="space-y-4">
                    {/* Identified Accounts */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-zinc-900">Identified Accounts: 1,250</h4>
                        <span className="text-xs text-dalton-blue cursor-pointer">View all</span>
                      </div>
                      <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-zinc-200">
                              <th className="text-left p-2 text-zinc-500 font-medium">Company Name</th>
                              <th className="text-left p-2 text-zinc-500 font-medium">Headcount</th>
                              <th className="text-left p-2 text-zinc-500 font-medium">CRM Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-zinc-100">
                              <td className="p-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded bg-black flex items-center justify-center">
                                  <span className="text-white text-[8px]">P</span>
                                </div>
                                Plaid
                              </td>
                              <td className="p-2 text-zinc-600">1,200</td>
                              <td className="p-2"><span className="text-zinc-400">⊘ Not found</span></td>
                            </tr>
                            <tr className="border-b border-zinc-100">
                              <td className="p-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded bg-purple-600 flex items-center justify-center">
                                  <span className="text-white text-[8px]">S</span>
                                </div>
                                Stripe
                              </td>
                              <td className="p-2 text-zinc-600">9,800</td>
                              <td className="p-2"><span className="text-green-600">● Active Lead</span></td>
                            </tr>
                            <tr>
                              <td className="p-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                                  <span className="text-white text-[8px]">C</span>
                                </div>
                                Coinbase
                              </td>
                              <td className="p-2 text-zinc-600">5,000</td>
                              <td className="p-2"><span className="text-orange-500">◉ Closed Lost</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Estimated Leads */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-zinc-900">Estimated Leads: 11,215</h4>
                        <span className="text-xs text-dalton-blue cursor-pointer">View all</span>
                      </div>
                      <div className="bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-zinc-200">
                              <th className="text-left p-2 text-zinc-500 font-medium">Name</th>
                              <th className="text-left p-2 text-zinc-500 font-medium">Lead Type</th>
                              <th className="text-left p-2 text-zinc-500 font-medium">Research Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-zinc-100">
                              <td className="p-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-orange-400" />
                                Cameron Williamson
                              </td>
                              <td className="p-2 text-zinc-600">MQL</td>
                              <td className="p-2"><span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-full">🎧 Listening to Podcast</span></td>
                            </tr>
                            <tr className="border-b border-zinc-100">
                              <td className="p-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-300 to-rose-400" />
                                Marvin McKinney
                              </td>
                              <td className="p-2 text-zinc-600">Closed Lost</td>
                              <td className="p-2"><span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full">📝 Reviewing CRM Notes</span></td>
                            </tr>
                            <tr className="border-b border-zinc-100">
                              <td className="p-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-300 to-emerald-400" />
                                Devon Lane
                              </td>
                              <td className="p-2 text-zinc-600">MQL</td>
                              <td className="p-2"><span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full">📖 Reading Blog Post</span></td>
                            </tr>
                            <tr className="border-b border-zinc-100">
                              <td className="p-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400" />
                                Leslie Alexander
                              </td>
                              <td className="p-2 text-zinc-600">Warm</td>
                              <td className="p-2"><span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full">🔍 Searching LinkedIn Feed</span></td>
                            </tr>
                            <tr>
                              <td className="p-2 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-300 to-purple-400" />
                                Jacob Jones
                              </td>
                              <td className="p-2 text-zinc-600">Closed Lost</td>
                              <td className="p-2"><span className="bg-cyan-100 text-cyan-700 text-[10px] px-2 py-0.5 rounded-full">🎵 Listening to Song</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Feature Cards */}
          <div 
            className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(4)}
          >
            {/* Conteúdo */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h3 className="font-inter font-semibold text-2xl text-zinc-900/40">Conteúdo</h3>
                <span className="bg-gradient-to-r from-[hsl(var(--dalton-purple))] to-[hsl(271,76%,45%)] text-white text-[10px] font-medium px-2 py-0.5 rounded-full uppercase">
                  Em breve
                </span>
              </div>
              <p className="text-base text-zinc-600/60 leading-relaxed">
                Conteúdo de alta performance todos os dias, sem você precisar criar nada.
              </p>
            </div>

            {/* Anúncio */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h3 className="font-inter font-semibold text-2xl text-zinc-900/40">Anúncio</h3>
                <span className="bg-gradient-to-r from-[hsl(var(--dalton-purple))] to-[hsl(271,76%,45%)] text-white text-[10px] font-medium px-2 py-0.5 rounded-full uppercase">
                  Em breve
                </span>
              </div>
              <p className="text-base text-zinc-600/60 leading-relaxed">
                Copies, roteiros e briefings de anúncio em alto volume. Mais testes, mais winners, menor CAC.
              </p>
            </div>

            {/* Vendas */}
            <div className="text-center md:text-left">
              <h3 className="font-inter font-semibold text-2xl text-zinc-900 mb-2">Vendas</h3>
              <p className="text-base text-zinc-600 leading-relaxed">
                Nunca perca um lead. Respostas instantâneas 24/7 com o seu CRM atualizado automaticamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProspectionSection;