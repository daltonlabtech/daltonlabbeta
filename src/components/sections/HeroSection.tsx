import { useState, useEffect } from 'react';
import heroVideo from '@/assets/hero-background.mp4';
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <section className="relative min-h-screen flex flex-col overflow-hidden" style={{
    backgroundColor: '#101823'
  }}>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101823]/40 via-transparent to-[#101823]/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center container mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-24">
        <div className="max-w-5xl">
          {/* Badge above H1 */}
          <div className={`inline-flex items-center gap-2 backdrop-blur-sm border border-zinc-700/50 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          backgroundColor: 'rgba(245, 243, 240, 0.7)'
        }}>
            <span className="text-zinc-900/70 text-sm font-medium">Powered by</span>
            <svg className="w-5 h-5 text-zinc-900/70" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
            </svg>
            <span className="text-zinc-900/70 font-semibold text-sm">OpenAI</span>
          </div>

          {/* Heading */}
          <h1 className={`font-inter tracking-tight leading-[1.1] transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
          color: '#F5F3F0'
        }}>
            <span className="block sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-4xl">Do lead à venda</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal">
              com Agentes de IA
            </span>
          </h1>

          {/* Subtitle */}
          <div className={`mt-6 md:mt-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="sm:text-base md:text-lg font-normal text-xl" style={{
            color: '#F5F3F0'
          }}>
              Escale a receita da sua empresa. Em menos tempo.
            </p>
            <p className="sm:text-base md:text-lg font-normal text-base" style={{
            color: '#F5F3F0'
          }}>
              Com menos custo.
            </p>
          </div>

          {/* CTA Button */}
          <div className={`mt-8 md:mt-10 transition-all duration-700 delay-[450ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className="font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2" style={{
            backgroundColor: '#F5F3F0',
            color: '#000000'
          }}>
              Fale com o Dalton
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;