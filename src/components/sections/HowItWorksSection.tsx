import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

// Tool logos - using brand colors and icons
const tools = [
  { name: 'WhatsApp', icon: '💬', bgColor: 'bg-[#25D366]' },
  { name: 'Meta', icon: '📘', bgColor: 'bg-[#0081FB]' },
  { name: 'Monday', icon: '📊', bgColor: 'bg-[#FF3D57]' },
  { name: 'Salesforce', icon: '☁️', bgColor: 'bg-[#00A1E0]' },
  { name: 'Slack', icon: '💜', bgColor: 'bg-[#4A154B]' },
  { name: 'Outlook', icon: '📧', bgColor: 'bg-[#0078D4]' },
  { name: 'Trello', icon: '📋', bgColor: 'bg-[#0052CC]' },
  { name: 'Google Ads', icon: '📢', bgColor: 'bg-[#FBBC04]' },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, isVisible } = useScrollReveal();
  
  // Assign ref to section
  if (ref.current === null) {
    (ref as React.MutableRefObject<HTMLElement | null>).current = sectionRef.current;
  }

  // Split tools into two rows
  const firstRow = tools.slice(0, 4);
  const secondRow = tools.slice(4, 8);

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
        <div className="mt-16 flex flex-col items-center gap-6 max-w-[900px] mx-auto">
          {/* First Row */}
          <div 
            className={`flex flex-wrap justify-center gap-4 md:gap-6 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(1)}
          >
            {firstRow.map((tool, index) => (
              <div 
                key={tool.name}
                className="flex flex-col items-center gap-2"
                style={getStaggerDelay(index + 2)}
              >
                <div 
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${tool.bgColor} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl md:text-3xl">{tool.icon}</span>
                </div>
                <span className="font-inter text-xs md:text-sm text-[#1A232F]/70 font-medium">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div 
            className={`flex flex-wrap justify-center gap-4 md:gap-6 ${revealClasses(isVisible)}`}
            style={getStaggerDelay(2)}
          >
            {secondRow.map((tool, index) => (
              <div 
                key={tool.name}
                className="flex flex-col items-center gap-2"
                style={getStaggerDelay(index + 6)}
              >
                <div 
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${tool.bgColor} flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl md:text-3xl">{tool.icon}</span>
                </div>
                <span className="font-inter text-xs md:text-sm text-[#1A232F]/70 font-medium">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div 
          className={`mt-12 text-center ${revealClasses(isVisible)}`}
          style={getStaggerDelay(5)}
        >
          <button className="group bg-[#F5F3F0] border-2 border-[#1A232F] text-[#1A232F] font-medium text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#1A232F] hover:text-[#F5F3F0] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center">
            <span>Fale com o Dalton</span>
            <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;