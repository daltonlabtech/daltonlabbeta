import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é um Agente de IA do Dalton Lab?",
    answer: "Um Agente de IA do Dalton Lab é um funcionário artificial especializado em executar tarefas operacionais do seu comercial. Ele trabalha 24/7, sem pausas, integrando-se ao seu time humano para prospectar, qualificar e fazer follow-up de leads."
  },
  {
    question: "O Dalton Lab é só um marketplace ou também implementa?",
    answer: "O Dalton Lab é muito mais que um marketplace. Nós mapeamos seu processo, selecionamos os agentes ideais, treinamos para seu contexto específico e implementamos integrados ao seu time. Cuidamos de tudo."
  },
  {
    question: "Como os agentes de IA se integram ao meu CRM atual?",
    answer: "Nossos agentes são compatíveis com os principais CRMs do mercado como Salesforce, HubSpot, Pipedrive e RD Station. A integração é feita via API e normalmente leva de 2 a 5 dias úteis para ser completada."
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "A maioria dos clientes começa a ver melhorias nas métricas de qualificação e contato nas primeiras 2 semanas. Resultados significativos em conversão geralmente aparecem entre 30 e 60 dias após a implementação completa."
  },
  {
    question: "Os agentes podem ser personalizados para meu negócio?",
    answer: "Sim, cada agente é configurado de acordo com seu processo comercial, tom de voz da marca, scripts de abordagem e critérios de qualificação específicos do seu negócio."
  },
  {
    question: "Qual é o custo do serviço?",
    answer: "O investimento varia de acordo com o volume de leads, número de agentes contratados e nível de personalização. Oferecemos planos flexíveis que se adaptam ao porte da sua operação. Agende uma consulta para receber uma proposta personalizada."
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
                  <span className="text-left" dangerouslySetInnerHTML={{ 
                    __html: faq.question.replace(/Dalton Lab/g, '<span class="text-dalton-blue">Dalton Lab</span>').replace(/Agente de IA/g, '<span class="text-dalton-blue">Agente de IA</span>')
                  }} />
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
