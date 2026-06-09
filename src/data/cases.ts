// Dados dos casos de clientes. Bilíngue (PT/EN). Conteúdo fixo — não vem do Sanity.
// Consumido por: home (CasesSection), /casos (Casos) e /casos/:slug (CasoDetalhe).

export type Bi = { pt: string; en: string };

export interface CaseStudy {
  slug: string;
  /** Logo em public/novo/assets/logos (sem o prefixo /novo). Usado no card e no leitor. */
  logo: string;
  /** true para logos quadrados (ex.: Fialdini), que renderizam um pouco maiores. */
  logoSquare?: boolean;
  /** Foto opcional para o card da home (Jeisys usa foto em vez de logo). */
  photo?: string;
  /** Nome exibido no card da home. */
  name: string;
  sector: Bi;
  title: Bi;
  /** Resumo (dek) exibido no topo do leitor. */
  summary: Bi;
  /** 4 destaques. */
  highlights: Bi[];
  challenge: Bi;
  solution: Bi;
  how: Bi;
  /** Card da home: métrica grande + sub. */
  metric: Bi;
  metricSub: Bi;
  /** Índice do destaque usado como pull-quote no leitor (entre "A solução" e "Como funciona"). Default 0. */
  pullQuoteIndex?: number;
}

export const CASES: CaseStudy[] = [
  {
    slug: 'jeisys',
    logo: '/novo/assets/logos/jeisys-trim.png',
    photo: '/novo/assets/foto-jeisys.jpg',
    name: 'Jeisys',
    sector: { pt: 'Indústria Global', en: 'Global Industry' },
    title: {
      pt: '49 processos de marketing médico-estético conduzidos por agentes de IA',
      en: '49 medical-aesthetic marketing processes driven by AI agents',
    },
    summary: {
      pt: 'Implementação de uma plataforma de agentes de IA que automatiza o marketing médico-estético de ponta a ponta, da criação de copy em compliance CFM à montagem de funis de tráfego pago e cadências de relacionamento, transformando o médico dono de clínica em um operador de marketing autossuficiente, sem equipe dedicada e inteiramente via chat.',
      en: 'Implementation of an AI-agent platform that automates medical-aesthetic marketing end to end — from CFM-compliant copywriting to building paid-traffic funnels and relationship cadences — turning the clinic-owning physician into a self-sufficient marketing operator, with no dedicated team and entirely via chat.',
    },
    highlights: [
      { pt: '49 processos de marketing e suporte automatizados com agentes de IA, 24 horas por dia', en: '49 marketing and support processes automated with AI agents, 24 hours a day' },
      { pt: 'Criação de copy, funis de Meta Ads e cadências de WhatsApp conduzidas de ponta a ponta', en: 'Copywriting, Meta Ads funnels and WhatsApp cadences handled end to end' },
      { pt: 'Recomendações personalizadas ao perfil de cada médico, sem repetição de contexto', en: "Recommendations personalized to each physician's profile, with no repeated context" },
      { pt: 'Marketing médico-estético operando em compliance CFM por padrão', en: 'Medical-aesthetic marketing operating in CFM compliance by default' },
    ],
    challenge: {
      pt: 'Para extrair retorno de um equipamento médico-estético de alto valor, o médico dono de clínica precisa dominar três disciplinas ao mesmo tempo: a operação clínica, a gestão da clínica e o marketing. Montar uma equipe especializada custa de R$ 15 a R$ 40 mil por mês, valor inviável para a maioria das clínicas pequenas e médias. O resultado é recorrente: o médico investe no equipamento, mas não gera demanda suficiente para um retorno saudável. Para a Jeisys, isso se tornou estratégico, já que o sucesso comercial do equipamento depende do sucesso da clínica em divulgá-lo.',
      en: "To get a return on a high-value medical-aesthetic device, the clinic-owning physician must master three disciplines at once: clinical operation, clinic management and marketing. Building a specialized team costs R$ 15,000 to R$ 40,000 per month — unfeasible for most small and mid-sized clinics. The result is recurring: the physician invests in the device but does not generate enough demand for a healthy return. For Jeisys, this became strategic, since the device's commercial success depends on the clinic's success in promoting it.",
    },
    solution: {
      pt: 'O Dalton Lab desenvolveu a Jeisys Med.AI, uma plataforma web que reúne 49 agentes de IA, sendo 46 de marketing médico-estético e 3 de suporte aos equipamentos Density, LinearZ e Potenza, disponíveis 24 horas por dia via chat. Cada agente automatiza uma frente específica: um cria copy em compliance CFM, outro monta funis completos de Meta Ads, outro estrutura cadências de WhatsApp e outro responde dúvidas técnicas de protocolo dos equipamentos. O médico passa a contar com o processo certo para cada momento, por uma fração do custo de uma equipe dedicada.',
      en: 'Dalton Lab built Jeisys Med.AI, a web platform bringing together 49 AI agents — 46 for medical-aesthetic marketing and 3 for support of the Density, LinearZ and Potenza devices — available 24 hours a day via chat. Each agent automates a specific front: one writes CFM-compliant copy, another builds complete Meta Ads funnels, another structures WhatsApp cadences and another answers technical protocol questions about the devices. The physician now has the right process for every moment, at a fraction of the cost of a dedicated team.',
    },
    how: {
      pt: 'No primeiro acesso, o médico preenche um perfil único com especialidade, cidade, equipamentos e paciente ideal, contexto que é injetado automaticamente em toda conversa, eliminando recomendações genéricas. A partir daí, ele navega por um catálogo de agentes de IA por categoria e conversa com o que precisa, por texto ou áudio. Pode trocar de agente a qualquer momento sem perder o fio da conversa, e cada agente consulta, quando necessário, as bases de conhecimento dos equipamentos e das plataformas de mídia para fundamentar a resposta com dados corretos.',
      en: 'On first access, the physician fills out a single profile with specialty, city, devices and ideal patient — context that is automatically injected into every conversation, eliminating generic recommendations. From there, they browse a catalog of AI agents by category and chat with whichever they need, by text or audio. They can switch agents at any time without losing the thread, and each agent consults, when needed, the knowledge bases of the devices and media platforms to ground its answer in correct data.',
    },
    metric: { pt: '49 processos automatizados', en: '49 processes automated' },
    metricSub: { pt: 'suporte e marketing agênticos', en: 'agentic support & marketing' },
  },
  {
    slug: 'smartrisk',
    logo: '/novo/assets/logos/smartrisk-trim.png',
    name: 'SmartRisk',
    sector: { pt: 'Logística', en: 'Logistics' },
    title: {
      pt: 'Atendimento de frota em risco conduzido por agentes de IA',
      en: 'Fleet-at-risk support driven by AI agents',
    },
    summary: {
      pt: 'Implementação de um agente de IA que assume a triagem completa do atendimento a motoristas de frota, do recebimento da mensagem à classificação de risco em tempo real, conduzindo a validação de identidade e a orientação de desbloqueio de forma autônoma e elevando ao operador humano apenas os casos críticos, inteiramente via WhatsApp.',
      en: 'Implementation of an AI agent that takes over the complete triage of fleet-driver support — from receiving the message to real-time risk classification — autonomously handling identity validation and unblock guidance, and escalating only critical cases to a human operator, entirely via WhatsApp.',
    },
    highlights: [
      { pt: 'Triagem autônoma de risco operando 24 horas por dia, 7 dias por semana', en: 'Autonomous risk triage operating 24 hours a day, 7 days a week' },
      { pt: 'Classificação de criticidade pelo estado real da viagem', en: 'Criticality classification based on the real state of the trip' },
      { pt: 'Validação de identidade pelo CPF e orientação de desbloqueio conduzidas de ponta a ponta', en: 'Identity validation via CPF and unblock guidance handled end to end' },
      { pt: 'Decisão final em situações de risco mantida sempre com o operador humano', en: 'Final decision in risk situations always kept with the human operator' },
    ],
    challenge: {
      pt: 'O monitoramento de frota depende de equipes plantonistas para atender motoristas com veículo bloqueado, perda de sinal ou desvio de rota, um trabalho desgastante que mistura no mesmo canal dúvidas simples e ocorrências críticas de segurança. Cada operador precisa consultar o sistema de rastreamento, validar a identidade do motorista e decidir em segundos se o caso é técnico ou crítico. O resultado é uma central sobrecarregada, em que ocorrências graves disputam atenção com demandas rotineiras.',
      en: "Fleet monitoring relies on on-call teams to assist drivers with a blocked vehicle, lost signal or route deviation — demanding work that mixes simple questions and critical safety incidents in the same channel. Each operator must check the tracking system, validate the driver's identity and decide in seconds whether the case is technical or critical. The result is an overloaded operation, where serious incidents compete for attention with routine demands.",
    },
    solution: {
      pt: 'O Dalton Lab desenvolveu o Agente SmartRisk, uma camada de triagem autônoma que recebe a mensagem do motorista, consulta o estado real da viagem em tempo real e decide se a interação pode ser resolvida pelo próprio agente ou se precisa subir imediatamente para um humano. Ele opera sobre a infraestrutura de rastreamento já existente, sem mudança no sistema legado, e preserva a regra de ouro do setor: a decisão final em casos de risco continua humana.',
      en: "Dalton Lab built the SmartRisk Agent, an autonomous triage layer that receives the driver's message, checks the real state of the trip in real time and decides whether the interaction can be resolved by the agent itself or must escalate immediately to a human. It operates on top of the existing tracking infrastructure, with no change to the legacy system, and preserves the industry's golden rule: the final decision in risk cases remains human.",
    },
    how: {
      pt: 'O motorista envia uma mensagem pelo canal habitual e o agente identifica a viagem em curso pelo número de telefone. Consulta os dados reais da viagem, classifica o nível de risco e direciona a conversa: em casos de bloqueio, diagnostica o motivo, valida a identidade pelos primeiros dígitos do CPF e instrui o motorista até a liberação, sem nunca executar o comando físico, que permanece com a central. Quando identifica uma ocorrência crítica ou divergência de identidade, eleva imediatamente ao operador humano e mantém o motorista informado e em segurança.',
      en: 'The driver sends a message through the usual channel and the agent identifies the ongoing trip by phone number. It checks the real trip data, classifies the risk level and routes the conversation: in block cases, it diagnoses the cause, validates identity via the first digits of the CPF and guides the driver to release — without ever executing the physical command, which remains with the operations center. When it identifies a critical incident or identity mismatch, it immediately escalates to the human operator and keeps the driver informed and safe.',
    },
    metric: { pt: 'Monitoramento 24/7', en: '24/7 monitoring' },
    metricSub: { pt: 'Triagem autônoma de frota', en: 'Autonomous fleet triage' },
  },
  {
    slug: 'uny',
    logo: '/novo/assets/logos/uny-trim.png',
    name: 'Unymus',
    sector: { pt: 'Serviços Financeiros', en: 'Financial Services' },
    title: {
      pt: 'Cobrança a inadimplentes conduzida por agentes de IA, com recuperação autônoma de receita',
      en: 'Collections from delinquent customers driven by AI agents, with autonomous revenue recovery',
    },
    summary: {
      pt: 'Implementação de um agente autônomo que assume o ciclo completo de cobrança a inadimplentes, da identificação do débito à recuperação efetiva da receita, conduzindo negociação e pagamento sem operador humano e inteiramente via WhatsApp.',
      en: 'Implementation of an autonomous agent that takes over the full collections cycle for delinquent customers — from identifying the debt to effectively recovering revenue — handling negotiation and payment with no human operator and entirely via WhatsApp.',
    },
    highlights: [
      { pt: 'Cobrança autônoma no WhatsApp, 24 horas por dia, sem fila e sem operador', en: 'Autonomous collections on WhatsApp, 24 hours a day, with no queue and no operator' },
      { pt: 'Link de pagamento gerado na hora e troca para cobrança recorrente feita na própria conversa', en: 'Payment link generated on the spot and switch to recurring billing handled in the conversation' },
      { pt: 'Priorização de métodos automáticos, que eliminam a inadimplência dos meses seguintes', en: 'Prioritization of automatic methods that eliminate delinquency in the following months' },
      { pt: 'Recuperação de receita contínua, sem alocar equipe na operação', en: 'Continuous revenue recovery, with no team allocated to the operation' },
    ],
    challenge: {
      pt: 'A operação de cobrança tradicional da Unymus dependia de equipe humana para contatar inadimplentes, enviar links de pagamento e negociar prazos, em um processo caro, lento e inconsistente. Cada atendente precisava consultar o sistema de cobranças, gerar links de pagamento manualmente e responder às mesmas dúvidas recorrentes, além de escalar os casos mais complexos para supervisores. O resultado era custo operacional elevado, recuperação de receita limitada e atendimento restrito ao horário comercial.',
      en: "Unymus's traditional collections operation relied on a human team to contact delinquent customers, send payment links and negotiate terms — an expensive, slow and inconsistent process. Each agent had to check the collections system, generate payment links manually and answer the same recurring questions, as well as escalate the most complex cases to supervisors. The result was high operational cost, limited revenue recovery and service restricted to business hours.",
    },
    solution: {
      pt: 'O Dalton Lab desenvolveu o Uny AI, um agente de cobrança autônomo que atende pelo WhatsApp 24 horas por dia, 7 dias por semana. Ele resolve todo o fluxo padrão de cobrança de ponta a ponta, sem intervenção humana, e opera sobre a infraestrutura já existente da Unymus, sem qualquer mudança no sistema legado. Nos casos que exigem julgamento humano, a equipe assume a conversa a qualquer momento, com acesso ao histórico completo da interação.',
      en: "Dalton Lab built Uny AI, an autonomous collections agent that serves customers on WhatsApp 24 hours a day, 7 days a week. It resolves the entire standard collections flow end to end, with no human intervention, and operates on Unymus's existing infrastructure with no change to the legacy system. In cases requiring human judgment, the team can take over the conversation at any time, with access to the full interaction history.",
    },
    how: {
      pt: 'O cliente conversa pelo WhatsApp como faria com um atendente. O agente identifica o titular, consulta as cobranças em aberto, esclarece dúvidas e gera o link de pagamento na hora, em PIX, cartão ou boleto, podendo consolidar várias cobranças vencidas em um único link. Quando o cliente quer trocar a forma de cobrança recorrente, o agente apresenta um resumo e só efetiva a mudança após confirmação explícita, sempre priorizando os métodos automáticos que eliminam a inadimplência futura. Por segurança, ele nunca confirma um pagamento por conta própria: apenas informa o status retornado pelo sistema e orienta o cliente a aguardar a notificação automática.',
      en: 'The customer chats on WhatsApp as they would with an agent. The agent identifies the account holder, checks the open charges, clarifies questions and generates the payment link on the spot — via PIX, card or boleto — and can consolidate several overdue charges into a single link. When the customer wants to change the recurring billing method, the agent presents a summary and only applies the change after explicit confirmation, always prioritizing the automatic methods that eliminate future delinquency. For safety, it never confirms a payment on its own: it only reports the status returned by the system and instructs the customer to wait for the automatic notification.',
    },
    metric: { pt: 'Cobrança 100% autônoma', en: '100% autonomous collections' },
    metricSub: { pt: 'recuperação de receita de inadimplentes', en: 'delinquent revenue recovery' },
  },
  {
    slug: 'fialdini',
    logo: '/novo/assets/logos/fialdini-trim.png',
    logoSquare: true,
    name: 'Fialdini',
    sector: { pt: 'Jurídico', en: 'Legal' },
    title: {
      pt: 'Triagem e distribuição de processos jurídicos conduzidas por agentes de IA',
      en: 'Legal-case triage and distribution driven by AI agents',
    },
    summary: {
      pt: 'Implementação de um agente de IA que assume a triagem e a distribuição do contencioso de ponta a ponta, da leitura do email e seus anexos à extração estruturada dos dados do processo e ao encaminhamento ao advogado certo, sem intervenção humana e diretamente sobre a caixa de email já existente.',
      en: 'Implementation of an AI agent that takes over litigation triage and distribution end to end — from reading the email and its attachments to structured extraction of case data and routing to the right lawyer — with no human intervention and directly on the existing inbox.',
    },
    highlights: [
      { pt: 'Monitoramento da caixa de contencioso a cada minuto, 24 horas por dia', en: 'Litigation inbox monitored every minute, 24 hours a day' },
      { pt: 'Leitura de PDFs, imagens e documentos Word com extração automática dos dados do processo', en: 'Reading of PDFs, images and Word documents with automatic extraction of case data' },
      { pt: 'Distribuição ao advogado certo por competência, sem duplicidade e sem perda de prazo', en: 'Distribution to the right lawyer by expertise, with no duplication and no missed deadlines' },
      { pt: 'Advogados liberados da triagem de email para atuar como estrategistas jurídicos', en: 'Lawyers freed from email triage to act as legal strategists' },
    ],
    challenge: {
      pt: 'O contencioso da Fialdini dependia de três advogados sêniores para uma tarefa de alto risco, que não exige julgamento jurídico: ler emails, identificar se eram processos reais, extrair as informações relevantes e encaminhá-los ao especialista correto. Cada advogado precisava monitorar a caixa de entrada, abrir cada email e seus anexos, identificar número, tribunal, vara, cliente e prazo, e decidir manualmente quem deveria assumir o caso. O resultado era tempo qualificado gasto em tarefa operacional, com risco de duplicidade e de perda de prazo.',
      en: "Fialdini's litigation relied on three senior lawyers for a high-risk task that requires no legal judgment: reading emails, identifying whether they were real cases, extracting the relevant information and routing them to the right specialist. Each lawyer had to monitor the inbox, open every email and its attachments, identify case number, court, division, client and deadline, and manually decide who should take the case. The result was qualified time spent on operational work, with risk of duplication and missed deadlines.",
    },
    solution: {
      pt: 'O Dalton Lab desenvolveu o Agente Contencioso Fialdini, que automatiza todo o fluxo de triagem e distribuição diretamente sobre a caixa de email já existente, sem mudança de processo para quem envia e sem novo sistema para a equipe interna. O agente recebe apenas os emails de fato jurídicos, organiza os dados do processo e os encaminha ao advogado mais adequado. O advogado passa a receber a notificação com o processo já organizado, já atribuído e já registrado, pronto para agir dentro do prazo.',
      en: 'Dalton Lab built the Fialdini Litigation Agent, which automates the entire triage and distribution flow directly on the existing inbox — with no process change for senders and no new system for the internal team. The agent receives only the genuinely legal emails, organizes the case data and routes them to the most suitable lawyer. The lawyer now receives the notification with the case already organized, already assigned and already recorded, ready to act within the deadline.',
    },
    how: {
      pt: 'A cada minuto, o agente verifica a caixa do contencioso e descarta automaticamente o que é spam ou publicidade. Nos emails jurídicos, lê o corpo e os anexos, transcrevendo PDFs e imagens por OCR e extraindo o conteúdo de documentos Word, e estrutura os dados do processo: número, tipo, tribunal, vara, cliente, prazo e tarefas. Em seguida, compara os requisitos do caso com as competências do time e encaminha ao advogado certo, sem nunca atribuir o processo a quem o enviou. Quando o processo já existe na base, atualiza o registro em vez de duplicar, e quando o email chega incompleto, notifica a equipe para solicitar o reenvio.',
      en: "Every minute, the agent checks the litigation inbox and automatically discards spam or advertising. In legal emails, it reads the body and attachments — transcribing PDFs and images via OCR and extracting the content of Word documents — and structures the case data: number, type, court, division, client, deadline and tasks. It then compares the case requirements with the team's expertise and routes it to the right lawyer, never assigning the case to whoever sent it. When the case already exists in the database, it updates the record instead of duplicating, and when an email arrives incomplete, it notifies the team to request a resend.",
    },
    metric: { pt: 'Classificação autônoma', en: 'Autonomous classification' },
    metricSub: { pt: 'triagem e distribuição de processos jurídicos', en: 'legal-case triage & distribution' },
    pullQuoteIndex: 3,
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
