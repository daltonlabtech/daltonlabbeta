import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal, revealClasses, getStaggerDelay } from '@/hooks/useScrollReveal';

const faqs = [
  {
    question: "O que é um Agente de IA?",
    answer: "Um Agente de IA é um software autônomo que executa tarefas seguindo processos definidos. Ele se comporta como um ser humano.\n\nDiferente de chatbots ou assistentes genéricos, nossos Agentes são treinados especificamente no seu negócio para gerar resultados mensuráveis. Tudo isso sem a necessidade de expandir seu quadro de colaboradores."
  },
  {
    question: "Quanto tempo leva para implementar?",
    answer: "De 2 a 4 semanas, dependendo da complexidade do seu processo comercial.\n\nEsse prazo inclui integração com suas APIs e treinamento com dados reais da sua operação."
  },
  {
    question: "Os agentes vendem de verdade?",
    answer: "Sim. O Dalton, nosso Agente de Vendas, conduz o processo comercial de ponta a ponta: da qualificação inicial ao fechamento."
  },
  {
    question: "Como funciona a integração com meus sistemas?",
    answer: "Nosso time realiza a integração sob medida com os sistemas que você já usa. Além disso, você acompanha toda a operação através do nosso dashboard de performance."
  },
  {
    question: "Terei contato com humanos durante o processo?",
    answer: "Sim. Acreditamos que a combinação entre Agentes de IA e expertise humana é o que gera resultados consistentes.\n\nAssim que o contrato é assinado, nosso time agenda a reunião de Levantamento de Processos para iniciar a implementação."
  },
  {
    question: "E se eu não gostar do resultado?",
    answer: "Você pode pausar o Agente a qualquer momento. Nosso trabalho é baseado em otimização contínua. O seu feedback guia os ajustes. E caso decida cancelar, não há cláusula de fidelidade ou multa rescisória."
  }
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className="section-padding bg-[#F5F3F0]"
    >
      <div className="container-main">
        {/* Title */}
        <h2 
          className={`font-inter font-bold text-2xl md:text-4xl lg:text-5xl text-[#1A232F] text-center ${revealClasses(isVisible)}`}
        >
          Perguntas Frequentes
        </h2>

        {/* Accordion */}
        <div 
          className={`mt-12 max-w-[900px] mx-auto space-y-4 ${revealClasses(isVisible)}`}
          style={getStaggerDelay(1)}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-0 rounded-2xl bg-[#E8E6E3] px-6 data-[state=open]:bg-[#E0DEDA]"
              >
                <AccordionTrigger className="font-inter font-medium text-base md:text-lg text-[#1A232F] hover:no-underline py-5 [&[data-state=open]>svg]:text-[#1A232F] [&>svg]:text-[#1A232F]/50">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="font-inter font-normal text-base text-[#1A232F]/70 pb-5 leading-relaxed">
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