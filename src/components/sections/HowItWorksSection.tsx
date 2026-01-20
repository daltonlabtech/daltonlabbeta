import { useRef } from 'react';
import { useScrollReveal, revealClasses } from '@/hooks/useScrollReveal';

// Tool logos with their visual representation
const toolsRow1 = [
  { name: 'Salesforce', bgColor: 'bg-[#00A1E0]', icon: '☁️', isEmoji: true, isText: false, textColor: '', hasBorder: false },
  { name: 'Bling', bgColor: 'bg-[#5046E5]', icon: 'D', isEmoji: false, isText: true, textColor: 'text-white', hasBorder: false },
  { name: 'Odoo', bgColor: 'bg-[#714B67]', icon: '◉', isEmoji: false, isText: true, textColor: 'text-white', hasBorder: false },
  { name: 'Fathom', bgColor: 'bg-[#1A1A1A]', icon: '⚡', isEmoji: true, isText: false, textColor: '', hasBorder: false },
  { name: 'Intercom', bgColor: 'bg-[#1F1F1F]', icon: '|||', isEmoji: false, isText: true, textColor: 'text-white', hasBorder: false },
  { name: 'ActiveCampaign', bgColor: 'bg-[#356AE6]', icon: '>', isEmoji: false, isText: true, textColor: 'text-white', hasBorder: false },
];

const toolsRow2 = [
  { name: 'Confluence', bgColor: 'bg-[#2684FF]', icon: '⟨⟩', isEmoji: false, isText: true, textColor: 'text-white', hasBorder: false },
  { name: 'Freshdesk', bgColor: 'bg-[#25C16F]', icon: '🎧', isEmoji: true, isText: false, textColor: '', hasBorder: false },
  { name: 'Google Ads', bgColor: 'bg-white', icon: '📊', isEmoji: true, isText: false, textColor: '', hasBorder: true },
  { name: 'HubSpot', bgColor: 'bg-white', icon: '🔶', isEmoji: true, isText: false, textColor: '', hasBorder: true },
  { name: 'Zapier', bgColor: 'bg-white', icon: '⚡', isEmoji: true, isText: false, textColor: '', hasBorder: true },
  { name: 'Meta', bgColor: 'bg-[#0081FB]', icon: '∞', isEmoji: false, isText: true, textColor: 'text-white', hasBorder: false },
];

const HowItWorksSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const renderToolCard = (tool: typeof toolsRow1[0], index: number) => (
    <div 
      key={`${tool.name}-${index}`}
      className="flex flex-col items-center gap-3 flex-shrink-0"
    >
      <div 
        className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${tool.bgColor} ${tool.hasBorder ? 'border border-gray-200' : ''} flex items-center justify-center shadow-md`}
      >
        {tool.isEmoji && (
          <span className="text-2xl md:text-3xl">{tool.icon}</span>
        )}
        {tool.isText && (
          <span className={`text-xl md:text-2xl font-bold ${tool.textColor}`}>{tool.icon}</span>
        )}
      </div>
    </div>
  );

  // Duplicate items for seamless loop
  const duplicatedRow1 = [...toolsRow1, ...toolsRow1, ...toolsRow1, ...toolsRow1];
  const duplicatedRow2 = [...toolsRow2, ...toolsRow2, ...toolsRow2, ...toolsRow2];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="section-padding bg-[#F5F3F0] overflow-hidden">
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A232F] text-center ${revealClasses(isVisible)}`}
        >
          Integre o Dalton onde você já trabalha
        </h2>
      </div>

      {/* Tool Logos - Two Rows with Marquee */}
      <div className="mt-16 flex flex-col gap-8">
        {/* First Row - Left to Right */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-8 animate-marquee-left">
            {duplicatedRow1.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-8 animate-marquee-right">
            {duplicatedRow2.map((tool, index) => renderToolCard(tool, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
