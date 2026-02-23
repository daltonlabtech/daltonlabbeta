interface VennDiagramProps {
  isVisible: boolean;
}

const VennDiagram = ({ isVisible }: VennDiagramProps) => {
  return (
    <div className="flex justify-center items-center py-6 md:py-12">
      <svg
        viewBox="0 0 520 500"
        className="w-full max-w-[320px] md:max-w-[480px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Pessoas - dark navy blue */}
          <radialGradient id="grad-pessoas" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#2a4a7f" />
            <stop offset="100%" stopColor="#1a2d52" />
          </radialGradient>
          {/* IA - purple */}
          <radialGradient id="grad-ia" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7b5ea7" />
            <stop offset="100%" stopColor="#5a3d82" />
          </radialGradient>
          {/* Processos - teal */}
          <radialGradient id="grad-processos" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3dbdb2" />
            <stop offset="100%" stopColor="#2a9d93" />
          </radialGradient>
        </defs>

        {/* IA circle - bottom left */}
        <circle
          cx="185" cy="310" r="150"
          fill="url(#grad-ia)"
          style={{
            mixBlendMode: 'multiply',
            transformBox: 'fill-box',
            transformOrigin: 'center',
            opacity: 0,
            animation: isVisible
              ? 'venn-circle-in 0.7s cubic-bezier(0.25,0.1,0.25,1) 0.2s both'
              : 'none',
          }}
        />

        {/* Processos circle - bottom right */}
        <circle
          cx="335" cy="310" r="150"
          fill="url(#grad-processos)"
          style={{
            mixBlendMode: 'multiply',
            transformBox: 'fill-box',
            transformOrigin: 'center',
            opacity: 0,
            animation: isVisible
              ? 'venn-circle-in 0.7s cubic-bezier(0.25,0.1,0.25,1) 0.4s both'
              : 'none',
          }}
        />

        {/* Pessoas circle - top center */}
        <circle
          cx="260" cy="180" r="150"
          fill="url(#grad-pessoas)"
          style={{
            mixBlendMode: 'multiply',
            transformBox: 'fill-box',
            transformOrigin: 'center',
            opacity: 0,
            animation: isVisible
              ? 'venn-circle-in 0.7s cubic-bezier(0.25,0.1,0.25,1) 0s both'
              : 'none',
          }}
        />

        {/* Main circle labels - white, bold */}
        <text
          x="260" y="120" textAnchor="middle"
          className="font-inter font-bold text-[22px] md:text-[24px]"
          fill="white"
          style={{
            opacity: 0,
            animation: isVisible
              ? 'venn-label-in 0.5s cubic-bezier(0.25,0.1,0.25,1) 0.8s both'
              : 'none',
          }}
        >
          Pessoas
        </text>

        <text
          x="130" y="380" textAnchor="middle"
          className="font-inter font-bold text-[18px] md:text-[20px]"
          fill="white"
          style={{
            opacity: 0,
            animation: isVisible
              ? 'venn-label-in 0.5s cubic-bezier(0.25,0.1,0.25,1) 0.95s both'
              : 'none',
          }}
        >
          <tspan x="130" dy="0">Inteligência</tspan>
          <tspan x="130" dy="24">Artificial</tspan>
        </text>

        <text
          x="390" y="380" textAnchor="middle"
          className="font-inter font-bold text-[22px] md:text-[24px]"
          fill="white"
          style={{
            opacity: 0,
            animation: isVisible
              ? 'venn-label-in 0.5s cubic-bezier(0.25,0.1,0.25,1) 1.1s both'
              : 'none',
          }}
        >
          Processos
        </text>

        {/* Intersection labels - white */}
        {/* Produtividade: Pessoas + IA (top-left intersection) */}
        <text
          x="200" y="245" textAnchor="middle"
          className="font-inter font-semibold text-[14px]"
          fill="white"
          style={{
            opacity: 0,
            animation: isVisible
              ? 'venn-label-in 0.5s cubic-bezier(0.25,0.1,0.25,1) 1.25s both'
              : 'none',
          }}
        >
          Output
        </text>

        {/* Organização: Pessoas + Processos (top-right intersection) */}
        <text
          x="320" y="245" textAnchor="middle"
          className="font-inter font-semibold text-[14px]"
          fill="white"
          style={{
            opacity: 0,
            animation: isVisible
              ? 'venn-label-in 0.5s cubic-bezier(0.25,0.1,0.25,1) 1.4s both'
              : 'none',
          }}
        >
          Gestão
        </text>

        {/* Automação: IA + Processos (bottom intersection) */}
        <text
          x="260" y="370" textAnchor="middle"
          className="font-inter font-semibold text-[14px]"
          fill="white"
          style={{
            opacity: 0,
            animation: isVisible
              ? 'venn-label-in 0.5s cubic-bezier(0.25,0.1,0.25,1) 1.55s both'
              : 'none',
          }}
        >
          Automação
        </text>

        {/* Center label - Resultados */}
        <text
          x="260" y="295" textAnchor="middle"
          className="font-inter font-extrabold text-[16px]"
          fill="white"
          style={{
            opacity: 0,
            animation: isVisible
              ? 'venn-label-in 0.5s cubic-bezier(0.25,0.1,0.25,1) 1.7s both'
              : 'none',
          }}
        >
          Resultados
        </text>
      </svg>
    </div>
  );
};

export default VennDiagram;
