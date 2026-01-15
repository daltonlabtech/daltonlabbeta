import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é um Agente de IA?",
    answer: "Um Agente de IA é uma solução de inteligência artificial projetada para automatizar tarefas específicas do seu processo comercial. Diferente de chatbots básicos, nossos agentes são treinados com contexto do seu negócio e executam ações reais como prospectar, qualificar leads, fazer follow-up e agendar reuniões."
  },
  {
    question: "Quais são os 10 agentes do Squad de Vendas?",
    answer: "1. Leo (Prospecção): Encontra novos contatos. 2. Sofia (Enriquecimento): Valida dados dos leads. 3. André (Outreach): Envia e-mails iniciais. 4. Bia (WhatsApp): Inicia conversas no WhatsApp. 5. Pedro (Follow-up): Faz acompanhamentos. 6. Laura (Nutrição): Envia conteúdos relevantes. 7. Tomás (Transcrição): Grava e transcreve reuniões. 8. Íris (Resumo): Resume os pontos-chave. 9. Arthur (Proposta): Cria propostas personalizadas. 10. Helena (Contrato): Prepara o contrato final."
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
  return (
    <section className="section-padding bg-dalton-dark">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center uppercase tracking-wide">
          Perguntas Frequentes
        </h2>

        {/* Subtitle */}
        <p className="mt-4 font-inter font-normal text-lg text-dalton-gray-light text-center">
          Tire suas dúvidas sobre agentes de IA e o Dalton Lab
        </p>

        {/* Accordion */}
        <div className="mt-12 max-w-[900px] mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-white/10 rounded-xl bg-white/5 px-6 data-[state=open]:border-dalton-blue/50"
              >
                <AccordionTrigger className="font-inter font-medium text-base md:text-lg text-white hover:no-underline py-5 [&[data-state=open]>svg]:text-dalton-blue [&>svg]:text-dalton-gray-light">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="font-inter font-normal text-base text-dalton-gray-light pb-5">
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