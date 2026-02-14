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
        viewBox="0 0 500 440"
        className="w-full max-w-[320px] md:max-w-[460px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad-pessoas" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="grad-ia" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <linearGradient id="grad-processos" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Circles */}
        <motion.circle
          cx="200" cy="170" r="140"
          fill="url(#grad-pessoas)" opacity="0.35"
          custom={0} variants={circleVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        />
        <motion.circle
          cx="300" cy="170" r="140"
          fill="url(#grad-ia)" opacity="0.35"
          custom={1} variants={circleVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        />
        <motion.circle
          cx="250" cy="270" r="140"
          fill="url(#grad-processos)" opacity="0.35"
          custom={2} variants={circleVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        />

        {/* Main circle labels */}
        <motion.text
          x="145" y="120" textAnchor="middle"
          className="fill-[#101824] font-inter font-bold text-[15px] md:text-[16px]"
          custom={0} variants={labelVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        >
          Pessoas
        </motion.text>

        <motion.text
          x="355" y="120" textAnchor="middle"
          className="fill-[#101824] font-inter font-bold text-[15px] md:text-[16px]"
          custom={1} variants={labelVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        >
          IA
        </motion.text>

        <motion.text
          x="250" y="390" textAnchor="middle"
          className="fill-[#101824] font-inter font-bold text-[15px] md:text-[16px]"
          custom={2} variants={labelVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        >
          Processos
        </motion.text>

        {/* Intersection labels */}
        <motion.text
          x="250" y="145" textAnchor="middle"
          className="fill-[#101824] font-inter font-semibold text-[13px]"
          custom={3} variants={labelVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        >
          Produtividade
        </motion.text>

        <motion.text
          x="310" y="255" textAnchor="middle"
          className="fill-[#101824] font-inter font-semibold text-[13px]"
          custom={4} variants={labelVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        >
          Automação
        </motion.text>

        <motion.text
          x="190" y="255" textAnchor="middle"
          className="fill-[#101824] font-inter font-semibold text-[13px]"
          custom={5} variants={labelVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        >
          Organização
        </motion.text>

        {/* Center label */}
        <motion.text
          x="250" y="215" textAnchor="middle"
          className="fill-[#101824] font-inter font-extrabold text-[15px]"
          custom={6} variants={labelVariants}
          initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
        >
          Resultados
        </motion.text>
      </svg>
    </div>
  );
};

export default VennDiagram;
