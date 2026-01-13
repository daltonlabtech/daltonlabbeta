import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como os agentes de IA se integram ao meu CRM atual?",
    answer: "Nossos agentes sao compativeis com os principais CRMs do mercado como Salesforce, HubSpot, Pipedrive e RD Station. A integracao e feita via API e normalmente leva de 2 a 5 dias uteis para ser completada."
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer: "A maioria dos clientes comeca a ver melhorias nas metricas de qualificacao e contato nas primeiras 2 semanas. Resultados significativos em conversao geralmente aparecem entre 30 e 60 dias apos a implementacao completa."
  },
  {
    question: "Os agentes podem ser personalizados para meu negocio?",
    answer: "Sim, cada agente e configurado de acordo com seu processo comercial, tom de voz da marca, scripts de abordagem e criterios de qualificacao especificos do seu negocio."
  },
  {
    question: "Preciso treinar os agentes de IA?",
    answer: "Nao e necessario treinamento tecnico da sua parte. Nossa equipe cuida de toda a configuracao e otimizacao dos agentes com base nas informacoes que voce fornece sobre seu negocio."
  },
  {
    question: "Qual e o custo do servico?",
    answer: "O investimento varia de acordo com o volume de leads, numero de agentes contratados e nivel de personalizacao. Oferecemos planos flexiveis que se adaptam ao porte da sua operacao. Agende uma consulta para receber uma proposta personalizada."
  },
  {
    question: "E possivel cancelar o servico a qualquer momento?",
    answer: "Sim, nossos contratos sao flexiveis e voce pode cancelar com 30 dias de antecedencia. Nao trabalhamos com fidelidade minima porque confiamos na qualidade do nosso servico."
  }
];

const FAQSection = () => {
  return (
    <section className="section-padding">
      <div className="container-main">
        {/* Title */}
        <h2 className="font-inter font-bold text-4xl md:text-5xl lg:text-[56px] text-white text-center">
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
