import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';
import { useTrackSection } from '@/hooks/useTrackSection';
import { trackFaqOpen } from '@/lib/analytics';

const FAQSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const sectionRef = useTrackSection('faq');

  // Get questions from translations
  const faqs = t('faq.questions', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  const handleFaqOpen = (question: string) => {
    trackFaqOpen(question);
  };

  return (
    <section 
      ref={(el) => {
        if (ref && 'current' in ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        }
        if (sectionRef && 'current' in sectionRef) {
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
      }}
      className="section-padding bg-[#F5F3F0]"
    >
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-2xl md:text-4xl lg:text-5xl text-[#1A232F] text-center ${revealClasses(isVisible)}`}
        >
          {t('faq.title')}
        </h2>

        {/* Accordion */}
        <div 
          className={`mt-12 max-w-[900px] mx-auto space-y-4 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-4"
            onValueChange={(value) => {
              if (value) {
                const index = parseInt(value.replace('item-', ''));
                if (!isNaN(index) && faqs[index]) {
                  handleFaqOpen(faqs[index].question);
                }
              }
            }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-0 rounded-2xl bg-[#E8E6E3] px-4 md:px-6 data-[state=open]:bg-[#E0DEDA]"
              >
                <AccordionTrigger className="font-inter font-medium text-sm md:text-lg text-[#1A232F] hover:no-underline py-4 md:py-5 [&[data-state=open]>svg]:text-[#1A232F] [&>svg]:text-[#1A232F]/50">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="font-inter font-normal text-base text-[#1A232F]/70 pb-5 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
