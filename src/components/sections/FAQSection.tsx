import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
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
    question: "Preciso treinar os agentes de IA?",
    answer: "Não é necessário treinamento técnico da sua parte. Nossa equipe cuida de toda a configuração e otimização dos agentes com base nas informações que você fornece sobre seu negócio."
  },
  {
    question: "Qual é o custo do serviço?",
    answer: "O investimento varia de acordo com o volume de leads, número de agentes contratados e nível de personalização. Oferecemos planos flexíveis que se adaptam ao porte da sua operação. Agende uma consulta para receber uma proposta personalizada."
  },
  {
    question: "É possível cancelar o serviço a qualquer momento?",
    answer: "Sim, nossos contratos são flexíveis e você pode cancelar com 30 dias de antecedência. Não trabalhamos com fidelidade mínima porque confiamos na qualidade do nosso serviço."
  }
];

const FAQSection = () => {
  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center">
          Perguntas Frequentes
        </h2>

        {/* Accordion */}
        <div className="mt-16 max-w-[900px] mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-[#444444]"
              >
                <AccordionTrigger className="font-inter font-semibold text-lg text-white hover:no-underline py-6 [&[data-state=open]>svg]:text-primary [&>svg]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-inter font-normal text-base text-dalton-gray-light pb-6">
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
