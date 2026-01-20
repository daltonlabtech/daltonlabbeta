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
    answer: "Um Agente de IA é uma solução de inteligência artificial projetada para automatizar tarefas específicas do seu processo comercial. Diferente de chatbots básicos, nossos agentes são treinados com contexto do seu negócio e executam ações reais como prospectar, qualificar leads, fazer follow-up e agendar reuniões."
  },
  {
    question: "Quais são os 8 agentes do Time de Vendas?",
    answer: (
      <ol className="list-decimal list-inside space-y-2">
        <li><strong>Leo (Prospecção):</strong> Encontra novos contatos</li>
        <li><strong>Sofia (Enriquecimento):</strong> Valida dados dos leads</li>
        <li><strong>Bruno (WhatsApp):</strong> Inicia conversas no WhatsApp</li>
        <li><strong>Pedro (Follow-up):</strong> Faz acompanhamentos</li>
        <li><strong>Laura (Nutrição):</strong> Envia conteúdos relevantes</li>
        <li><strong>Íris (Resumo):</strong> Resume os pontos-chave</li>
        <li><strong>Arthur (Proposta):</strong> Cria propostas personalizadas</li>
        <li><strong>Helena (Contrato):</strong> Prepara o contrato final</li>
      </ol>
    )
  },
  {
    question: "Quanto tempo leva para implementar?",
    answer: "O tempo de implementação varia de acordo com a complexidade do seu processo comercial. Em média, conseguimos ter os primeiros agentes operando em 2 a 4 semanas, incluindo integração com seu CRM e treinamento com dados do seu negócio."
  },
  {
    question: "Os agentes substituem meu time de vendas?",
    answer: "Não. Os agentes de IA são projetados para trabalhar junto com seu time humano, não para substituí-lo. Eles assumem as tarefas operacionais e repetitivas, liberando seus vendedores para focar no que fazem de melhor: construir relacionamentos e fechar negócios."
  },
  {
    question: "Como funciona a integração com meu CRM?",
    answer: "Nossos agentes se integram nativamente com os principais CRMs do mercado (Salesforce, HubSpot, Pipedrive, RD Station, entre outros). A integração é feita via API e todas as ações dos agentes são registradas automaticamente no seu sistema."
  },
  {
    question: "Qual é o investimento necessário?",
    answer: "O investimento varia de acordo com o número de agentes contratados e o volume de operações. Trabalhamos com modelos flexíveis que se adaptam ao tamanho da sua operação. Entre em contato para uma proposta personalizada."
  },
  {
    question: "E se eu não gostar do resultado?",
    answer: "Oferecemos um período de teste inicial para você validar os resultados. Além disso, nossa equipe acompanha de perto os primeiros meses de operação para garantir que os agentes estejam performando conforme esperado."
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
          className={`font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-[#1A232F] text-center ${revealClasses(isVisible)}`}
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