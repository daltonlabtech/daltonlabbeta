import { motion, type Easing } from 'framer-motion';

interface VennDiagramProps {
  isVisible: boolean;
}

const ease: Easing = [0.25, 0.1, 0.25, 1];

const VennDiagram = ({ isVisible }: VennDiagramProps) => {
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.2, duration: 0.7, ease },
    }),
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.8 + i * 0.15, duration: 0.5, ease },
    }),
  };

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
        <motion.circle
          cx="185" cy="310" r="150"
          fill="url(#grad-ia)"
          style={{ mixBlendMode: 'multiply' }}
          custom={1}
          variants={circleVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        />

        {/* Processos circle - bottom right */}
        <motion.circle
          cx="335" cy="310" r="150"
          fill="url(#grad-processos)"
          style={{ mixBlendMode: 'multiply' }}
          custom={2}
          variants={circleVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        />

        {/* Pessoas circle - top center */}
        <motion.circle
          cx="260" cy="180" r="150"
          fill="url(#grad-pessoas)"
          style={{ mixBlendMode: 'multiply' }}
          custom={0}
          variants={circleVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        />

        {/* Main circle labels - white, bold */}
        <motion.text
          x="260" y="120" textAnchor="middle"
          className="font-inter font-bold text-[22px] md:text-[24px]"
          fill="white"
          custom={0}
          variants={labelVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          Pessoas
        </motion.text>

        <motion.text
          x="130" y="380" textAnchor="middle"
          className="font-inter font-bold text-[18px] md:text-[20px]"
          fill="white"
          custom={1}
          variants={labelVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <tspan x="130" dy="0">Inteligência</tspan>
          <tspan x="130" dy="24">Artificial</tspan>
        </motion.text>

        <motion.text
          x="390" y="380" textAnchor="middle"
          className="font-inter font-bold text-[22px] md:text-[24px]"
          fill="white"
          custom={2}
          variants={labelVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          Processos
        </motion.text>

        {/* Intersection labels - white */}
        {/* Produtividade: Pessoas + IA (top-left intersection) */}
        <motion.text
          x="200" y="245" textAnchor="middle"
          className="font-inter font-semibold text-[14px]"
          fill="white"
          custom={3}
          variants={labelVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          Output
        </motion.text>

        {/* Organização: Pessoas + Processos (top-right intersection) */}
        <motion.text
          x="320" y="245" textAnchor="middle"
          className="font-inter font-semibold text-[14px]"
          fill="white"
          custom={4}
          variants={labelVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          Gestão
        </motion.text>

        {/* Automação: IA + Processos (bottom intersection) */}
        <motion.text
          x="260" y="370" textAnchor="middle"
          className="font-inter font-semibold text-[14px]"
          fill="white"
          custom={5}
          variants={labelVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          Automação
        </motion.text>

        {/* Center label - Resultados */}
        <motion.text
          x="260" y="295" textAnchor="middle"
          className="font-inter font-extrabold text-[16px]"
          fill="white"
          custom={6}
          variants={labelVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          Resultados
        </motion.text>
      </svg>
    </div>
  );
};

export default VennDiagram;
