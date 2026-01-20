import { useRef } from 'react';
import { ArrowRight, MessageCircle, Instagram, Music2, Triangle, Globe, Headphones, Zap, Share2 } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

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
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, isVisible } = useScrollReveal();
  
  // Assign ref to section
  if (ref.current === null) {
    (ref as React.MutableRefObject<HTMLElement | null>).current = sectionRef.current;
  }

  const renderToolCard = (tool: typeof toolsRow1[0], index: number, rowOffset: number = 0) => (
    <div 
      key={tool.name}
      className={`flex flex-col items-center gap-3 ${revealClasses(isVisible)}`}
      style={getStaggerDelay(index + rowOffset + 2)}
    >
      <div 
        className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${tool.bgColor} ${tool.hasBorder ? 'border border-gray-200' : ''} flex items-center justify-center shadow-md hover:scale-110 hover:shadow-xl transition-all duration-300`}
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

  return (
    <section ref={(el) => {
      (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    }} className="section-padding bg-[#F5F3F0]">
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A232F] text-center ${revealClasses(isVisible)}`}
        >
          Integre o Dalton onde você já trabalha
        </h2>

        {/* Tool Logos - Two Rows */}
        <div className="mt-16 flex flex-col items-center gap-8 max-w-[900px] mx-auto">
          {/* First Row */}
          <div 
            className={`flex flex-wrap justify-center gap-6 md:gap-8 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(1)}
          >
            {toolsRow1.map((tool, index) => renderToolCard(tool, index))}
          </div>

          {/* Second Row */}
          <div 
            className={`flex flex-wrap justify-center gap-6 md:gap-8 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(2)}
          >
            {toolsRow2.map((tool, index) => renderToolCard(tool, index, 6))}
          </div>
        </div>

        {/* CTA Button */}
        <div 
          className={`mt-12 text-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(5)}
        >
          <button className="group bg-[#101823] text-white font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#1A232F] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
            <span>Fale com o Dalton</span>
            <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;