import { ArrowRight, Sparkles } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="py-[120px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dalton-dark via-dalton-blue/5 to-dalton-dark" />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(220 80% 50% / 0.1), transparent 70%)'
        }}
      />
      
      <div className="container-main max-w-[900px] text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dalton-blue/10 border border-dalton-blue/30 mb-8">
          <Sparkles className="w-4 h-4 text-dalton-blue" />
          <span className="font-inter text-sm text-dalton-blue font-medium">Análise Gratuita</span>
        </div>

        {/* Title */}
        <h2 className="font-inter font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          Veja como sua operação comercial pode operar em outro ritmo.
        </h2>

        {/* Description */}
        <p className="mt-8 font-inter font-normal text-lg md:text-xl text-dalton-gray-light max-w-[700px] mx-auto leading-relaxed">
          Agende uma análise de potencial e explore o modelo de Squad de Vendas com IA do Dalton Lab.
        </p>

        {/* CTA Button with animated glow */}
        <div className="mt-12 relative inline-block">
          {/* Animated glow behind button */}
          <div className="absolute inset-0 bg-dalton-blue rounded-full blur-2xl opacity-40 animate-pulse-glow scale-110" />
          
          <button className="relative group bg-white text-zinc-900 font-semibold text-base md:text-lg px-8 py-4 md:px-10 md:py-5 rounded-full shadow-2xl hover:shadow-xl hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            <span>Quero conhecer o Squad</span>
            <ArrowRight className="inline-block ml-2 w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-dalton-gray-light text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Sem compromisso
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Reunião de 30 min
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Análise personalizada
          </span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
