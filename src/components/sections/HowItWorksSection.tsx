import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';

// Import tech logos
import openaiLogo from '@/assets/tech/openai-round.png';
import claudeLogo from '@/assets/tech/claude.png';
import geminiLogo from '@/assets/tech/gemini-round.png';
import n8nLogo from '@/assets/tech/n8n-round.png';
import grokLogo from '@/assets/tech/grok.png';
import metaLogo from '@/assets/tech/meta.png';
import manusLogo from '@/assets/tech/manus-round.png';

// Tool logos with their images
const tools = [
  { name: 'OpenAI', logo: openaiLogo },
  { name: 'Claude', logo: claudeLogo },
  { name: 'Gemini', logo: geminiLogo },
  { name: 'n8n', logo: n8nLogo },
  { name: 'Grok', logo: grokLogo },
  { name: 'Meta', logo: metaLogo },
  { name: 'Manus', logo: manusLogo },
];

const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const renderToolCard = (tool: typeof tools[0], index: number) => (
    <div 
      key={`${tool.name}-${index}`}
      className="flex flex-col items-center gap-3 flex-shrink-0"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md">
        <img 
          src={tool.logo} 
          alt={`Logo da tecnologia ${tool.name} utilizada no Dalton Lab`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={80}
          height={80}
        />
      </div>
    </div>
  );

  // Duplicate items for seamless loop
  const duplicatedTools = [...tools, ...tools, ...tools, ...tools];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-12 md:py-16 bg-[#F5F3F0] overflow-hidden">
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-2xl md:text-3xl lg:text-4xl text-[#1A232F] text-center ${revealClasses(isVisible)}`}
        >
          Tecnologias que usamos em nosso laboratório de IAs
        </h2>
      </div>

      {/* Tool Logos - Single Row with Marquee */}
      <div className="mt-10">
        {/* Row - Right to Left */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-8 animate-marquee-right">
            {duplicatedTools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
