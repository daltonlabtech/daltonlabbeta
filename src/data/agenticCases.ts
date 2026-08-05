/**
 * Casos da página /casos — portados de design-reference/site-novo/casos-data.js.
 * Os arrays paralelos do protótipo (dados/vitrines/perguntas) foram fundidos num
 * objeto por caso para não dessincronizarem. Conteúdo bilíngue no padrão Bi do repo.
 */

export type Bi = { pt: string; en: string };

export type SetorId =
  | 'Financeiro'
  | 'Jurídico'
  | 'Saúde'
  | 'Varejo'
  | 'Previdência'
  | 'Serviços';

export type Estagio = 'ativo' | 'poc' | 'vitrine' | 'andamento';

export interface AgenticCase {
  slug: string;
  setor: SetorId;
  estagio: Estagio;
  papel: Bi;
  cliente: Bi;
  headline: Bi;
  kpis: Array<{ numero: string; rotulo: Bi }>;
  problema: Bi;
  comoTrabalhava: Bi;
  oQueMudou: Bi;
  /** Pergunta-síntese do desafio; `em` vai em serif itálica accent. */
  pergunta: { antes: Bi; em: Bi; depois: Bi };
  /** 5 passos; o último é sempre o humano acima do loop. */
  fluxo: Bi[];
  comparativo?: {
    label: Bi;
    de: { k: Bi; v: string };
    para: { k: Bi; v: string };
    nota: Bi;
  };
  /** O que aparece no card do índice. */
  vitrine: { num: string; frase: Bi };
}

export const SETOR_LABELS: Record<SetorId, Bi> = {
  Financeiro: { pt: 'Financeiro', en: 'Finance' },
  Jurídico: { pt: 'Jurídico', en: 'Legal' },
  Saúde: { pt: 'Saúde', en: 'Healthcare' },
  Varejo: { pt: 'Varejo', en: 'Retail' },
  Previdência: { pt: 'Previdência', en: 'Pension' },
  Serviços: { pt: 'Serviços', en: 'Services' },
};

export const SETOR_CORES: Record<SetorId, string> = {
  Financeiro: '#a8d8ff',
  Previdência: '#a8d8ff',
  Jurídico: '#c9b8ff',
  Serviços: '#a8f0cf',
  Saúde: '#ffb8d9',
  Varejo: '#ffd7a8',
};

export const SETORES_ORDEM: SetorId[] = [
  'Financeiro',
  'Jurídico',
  'Saúde',
  'Varejo',
  'Previdência',
  'Serviços',
];

/** Estágio interno → rótulo público (port de publico() do protótipo). */
export const ESTAGIO_PUBLICO: Record<Estagio, Bi> = {
  ativo: { pt: 'Em operação', en: 'In operation' },
  poc: { pt: 'Prova de conceito', en: 'Proof of concept' },
  vitrine: { pt: 'Prova de conceito', en: 'Proof of concept' },
  andamento: { pt: 'Em implantação', en: 'In deployment' },
};

export const AGENTIC_CASES: AgenticCase[] = [
  {
    slug: 'conciliacao-financeira',
    setor: 'Financeiro',
    estagio: 'poc',
    papel: { pt: 'Analista de Conciliação Financeira', en: 'Financial Reconciliation Analyst' },
    cliente: { pt: 'Agência global de marketing', en: 'Global marketing agency' },
    headline: {
      pt: 'O que escapava na planilha virou alerta no mesmo dia.',
      en: 'What slipped through the spreadsheet became a same-day alert.',
    },
    kpis: [
      { numero: '~R$26mil', rotulo: { pt: 'em divergências achadas no primeiro ciclo', en: 'in discrepancies found in the first cycle' } },
      { numero: '3', rotulo: { pt: 'fontes cruzadas todo dia', en: 'sources cross-checked every day' } },
    ],
    problema: {
      pt: 'Pagamentos duplicados e notas divergentes entre 3 fontes (ERP, planilha interna e notas fiscais); só no primeiro ciclo, o agente achou cerca de R$26 mil fora de controle.',
      en: 'Duplicate payments and mismatched invoices across 3 sources (ERP, internal spreadsheet and invoices); in the first cycle alone, the agent found about R$26k out of control.',
    },
    comoTrabalhava: {
      pt: 'Conciliação manual, e a divergência só aparecia quando já tinha virado problema.',
      en: 'Manual reconciliation, and discrepancies only surfaced once they had already become a problem.',
    },
    oQueMudou: {
      pt: 'O agente cruza as três fontes todo dia, e o financeiro decide sobre o alerta em vez de procurar o erro.',
      en: 'The agent cross-checks the three sources every day, and the finance team decides on the alert instead of hunting for the error.',
    },
    pergunta: {
      antes: { pt: 'Como achar a divergência ', en: 'How do you find the discrepancy ' },
      em: { pt: 'antes', en: 'before' },
      depois: { pt: ' que ela vire prejuízo?', en: ' it becomes a loss?' },
    },
    fluxo: [
      { pt: 'Cruza notas, ERP e planilha', en: 'Cross-checks invoices, ERP and spreadsheet' },
      { pt: 'Detecta divergências', en: 'Detects discrepancies' },
      { pt: 'Bloqueia alteração indevida', en: 'Blocks improper changes' },
      { pt: 'Alerta e consolida', en: 'Alerts and consolidates' },
      { pt: 'Humano decide sobre o alerta', en: 'Human decides on the alert' },
    ],
    vitrine: { num: 'R$26 mil', frase: { pt: 'em divergências flagradas no primeiro ciclo', en: 'in discrepancies caught in the first cycle' } },
  },
  {
    slug: 'conformidade-bacen',
    setor: 'Jurídico',
    estagio: 'ativo',
    papel: { pt: 'Analista de Conformidade Regulatória', en: 'Regulatory Compliance Analyst' },
    cliente: { pt: 'Instituição financeira regulada pelo Bacen', en: 'Financial institution regulated by the Central Bank of Brazil' },
    headline: {
      pt: 'A matriz regulatória do Bacen deixou de depender de conferência manual.',
      en: 'The Central Bank regulatory matrix no longer depends on manual checking.',
    },
    kpis: [
      { numero: '378', rotulo: { pt: 'processos monitorados no Bacen', en: 'processes monitored at the Central Bank' } },
      { numero: '0', rotulo: { pt: 'atualização do Bacen perdida', en: 'Central Bank updates missed' } },
    ],
    problema: {
      pt: '378 processos no Bacen para acompanhar, com normas e atualizações espalhadas, exigindo conferência manual para manter a matriz regulatória organizada e em dia.',
      en: '378 Central Bank processes to track, with rules and updates scattered around, requiring manual checking to keep the regulatory matrix organized and current.',
    },
    comoTrabalhava: {
      pt: 'Advogados conferindo norma por norma e atualizando a matriz à mão, com risco de passar atualização batido.',
      en: 'Lawyers checking rule by rule and updating the matrix by hand, at risk of letting an update slip by.',
    },
    oQueMudou: {
      pt: 'O agente confere os 378 processos e organiza a matriz regulatória do Bacen, e o advogado valida o que muda.',
      en: 'The agent checks all 378 processes and organizes the regulatory matrix, and the lawyer validates what changes.',
    },
    pergunta: {
      antes: { pt: 'Como não perder ', en: 'How do you miss ' },
      em: { pt: 'nenhuma', en: 'none' },
      depois: { pt: ' atualização do Bacen?', en: ' of the Central Bank updates?' },
    },
    fluxo: [
      { pt: 'Lê as publicações do Bacen', en: 'Reads Central Bank publications' },
      { pt: 'Confere contra a matriz', en: 'Checks against the matrix' },
      { pt: 'Organiza e classifica', en: 'Organizes and classifies' },
      { pt: 'Sinaliza o que mudou', en: 'Flags what changed' },
      { pt: 'Advogado valida a mudança', en: 'Lawyer validates the change' },
    ],
    vitrine: { num: 'zero', frase: { pt: 'atualizações do Bacen perdidas', en: 'Central Bank updates missed' } },
  },
  {
    slug: 'contencioso',
    setor: 'Jurídico',
    estagio: 'ativo',
    papel: { pt: 'Analista de Contencioso', en: 'Litigation Analyst' },
    cliente: { pt: 'Operação de contencioso jurídico', en: 'Legal litigation operation' },
    headline: {
      pt: 'O contencioso inteiro passou a se manter organizado sozinho.',
      en: 'The entire litigation portfolio now keeps itself organized.',
    },
    kpis: [
      { numero: '+50', rotulo: { pt: 'PDFs de +30 páginas organizados', en: 'PDFs of 30+ pages organized' } },
      { numero: '~1.500', rotulo: { pt: 'páginas lidas e classificadas', en: 'pages read and classified' } },
      { numero: '0', rotulo: { pt: 'prazo de contencioso perdido', en: 'litigation deadlines missed' } },
    ],
    problema: {
      pt: 'Mais de 50 e-mails com PDFs de mais de 30 páginas cada, cerca de 1.500 páginas, exigindo leitura e organização manual de prazos, andamentos e documentos.',
      en: 'More than 50 emails with PDFs of 30+ pages each, around 1,500 pages, requiring manual reading and organization of deadlines, case updates and documents.',
    },
    comoTrabalhava: {
      pt: 'Cada PDF aberto e classificado à mão, com prazo dependendo de alguém lembrar.',
      en: 'Every PDF opened and classified by hand, with deadlines depending on someone remembering.',
    },
    oQueMudou: {
      pt: 'O agente lê os +50 PDFs, organiza o contencioso e mantém prazos e andamentos em ordem, e o advogado atua na estratégia.',
      en: 'The agent reads the 50+ PDFs, organizes the litigation and keeps deadlines and updates in order, and the lawyer focuses on strategy.',
    },
    pergunta: {
      antes: { pt: 'Como manter mil e quinhentas páginas ', en: 'How do you keep fifteen hundred pages ' },
      em: { pt: 'em ordem', en: 'in order' },
      depois: { pt: '?', en: '?' },
    },
    fluxo: [
      { pt: 'Recebe o e-mail e o PDF', en: 'Receives the email and PDF' },
      { pt: 'Lê e classifica o processo', en: 'Reads and classifies the case' },
      { pt: 'Organiza prazos e documentos', en: 'Organizes deadlines and documents' },
      { pt: 'Alerta o prazo', en: 'Alerts on deadlines' },
      { pt: 'Advogado decide a estratégia', en: 'Lawyer decides the strategy' },
    ],
    vitrine: { num: '~1.500', frase: { pt: 'páginas de contencioso organizadas', en: 'litigation pages organized' } },
  },
  {
    slug: 'reporte-reunioes',
    setor: 'Jurídico',
    estagio: 'ativo',
    papel: { pt: 'Analista de Reporte e Reuniões', en: 'Reporting & Meetings Analyst' },
    cliente: { pt: 'Departamento jurídico corporativo', en: 'Corporate legal department' },
    headline: {
      pt: 'A coordenação de 120 pessoas e a rotina de reuniões deixaram de pesar no advogado.',
      en: 'Coordinating 120 people and the meeting routine no longer weighs on the lawyer.',
    },
    kpis: [
      { numero: '120', rotulo: { pt: 'pessoas coordenadas', en: 'people coordinated' } },
      { numero: '+13/sem', rotulo: { pt: 'reuniões com reporte e briefing', en: 'meetings with reports and briefings' } },
    ],
    problema: {
      pt: 'Coordenação de 120 pessoas que realizam mais de 13 reuniões por semana, com reporte de movimentação e agenda consumindo tempo dos advogados.',
      en: 'Coordinating 120 people who hold more than 13 meetings a week, with case-update reports and scheduling consuming the lawyers’ time.',
    },
    comoTrabalhava: {
      pt: 'Cada movimentação virava e-mail manual, e o pré e pós das +13 reuniões semanais ficava sem apoio.',
      en: 'Every case update became a manual email, and the prep and follow-up of 13+ weekly meetings went unsupported.',
    },
    oQueMudou: {
      pt: 'O agente coordena as 120 pessoas, cuida do reporte e do briefing das reuniões, e o advogado foca na tese.',
      en: 'The agent coordinates the 120 people, handles reports and meeting briefings, and the lawyer focuses on the case.',
    },
    pergunta: {
      antes: { pt: 'Como coordenar cento e vinte pessoas sem ', en: 'How do you coordinate a hundred and twenty people without ' },
      em: { pt: 'pesar', en: 'weighing' },
      depois: { pt: ' no advogado?', en: ' on the lawyer?' },
    },
    fluxo: [
      { pt: 'Monitora a movimentação', en: 'Monitors case updates' },
      { pt: 'Resume e classifica', en: 'Summarizes and classifies' },
      { pt: 'Prepara o reporte', en: 'Prepares the report' },
      { pt: 'Briefing pré e pós-reunião', en: 'Pre- and post-meeting briefings' },
      { pt: 'Advogado conduz o caso', en: 'Lawyer leads the case' },
    ],
    vitrine: { num: '120', frase: { pt: 'pessoas coordenadas por um agente', en: 'people coordinated by one agent' } },
  },
  {
    slug: 'cobranca-previdencia',
    setor: 'Previdência',
    estagio: 'ativo',
    papel: { pt: 'Analista de Cobrança e Recuperação', en: 'Collections & Recovery Analyst' },
    cliente: { pt: 'Operadora de previdência privada', en: 'Private pension operator' },
    headline: {
      pt: 'A cobrança e a recuperação de crédito viraram um agente em operação.',
      en: 'Collections and credit recovery became an agent in operation.',
    },
    kpis: [
      { numero: '+300mil', rotulo: { pt: 'CPFs na base de cobrança', en: 'individuals in the collections base' } },
      { numero: '51mil', rotulo: { pt: 'contratos ativos na carteira', en: 'active contracts in the portfolio' } },
      { numero: 'R$6M/mês', rotulo: { pt: 'de faturamento', en: 'in monthly revenue' } },
    ],
    problema: {
      pt: 'Base de mais de 300 mil CPFs em cobrança sobre uma carteira de 51 mil contratos ativos e R$6M por mês, tudo trabalhado manualmente, contrato a contrato.',
      en: 'A base of 300k+ individuals in collections over a portfolio of 51k active contracts and R$6M a month, all worked manually, contract by contract.',
    },
    comoTrabalhava: {
      pt: 'Equipe correndo atrás da inadimplência em 51 mil contratos, sem escala para os 300 mil CPFs da régua.',
      en: 'A team chasing delinquency across 51k contracts, with no scale for the 300k individuals in the cadence.',
    },
    oQueMudou: {
      pt: 'O agente aborda, negocia e concilia em operação 24/7, e o humano fica só com o caso sensível.',
      en: 'The agent reaches out, negotiates and reconciles 24/7, and humans handle only the sensitive cases.',
    },
    pergunta: {
      antes: { pt: 'Como cobrar trezentos mil CPFs ', en: 'How do you collect from three hundred thousand people ' },
      em: { pt: 'um a um', en: 'one by one' },
      depois: { pt: '?', en: '?' },
    },
    fluxo: [
      { pt: 'Recebe a base inadimplente', en: 'Receives the delinquency base' },
      { pt: 'Aborda e negocia prazos', en: 'Reaches out and negotiates terms' },
      { pt: 'Gera os documentos', en: 'Generates the documents' },
      { pt: 'Registra e concilia', en: 'Records and reconciles' },
      { pt: 'Humano cuida do caso sensível', en: 'Human handles sensitive cases' },
    ],
    vitrine: { num: '+300 mil', frase: { pt: 'CPFs em cobrança ativa', en: 'individuals in active collections' } },
  },
  {
    slug: 'pre-vendas-saude',
    setor: 'Saúde',
    estagio: 'andamento',
    papel: { pt: 'Pré-vendas e Atendimento ao Cliente', en: 'Pre-sales & Customer Service' },
    cliente: { pt: 'Multinacional de dispositivos médicos', en: 'Medical devices multinational' },
    headline: {
      pt: 'A operação brasileira virou referência de IA dentro do grupo global.',
      en: 'The Brazilian operation became the AI benchmark within the global group.',
    },
    kpis: [
      { numero: '49', rotulo: { pt: 'agentes mirando o lançamento', en: 'agents aimed at the launch' } },
      { numero: '5x', rotulo: { pt: 'de ROI no contrato âncora', en: 'ROI on the anchor contract' } },
    ],
    problema: {
      pt: 'Back office e front office pedindo escala, com a operação brasileira liderando a inovação no grupo.',
      en: 'Back office and front office demanding scale, with the Brazilian operation leading innovation in the group.',
    },
    comoTrabalhava: {
      pt: 'Marketing e atendimento fragmentados, três chatbots, leads parados na transição comercial.',
      en: 'Fragmented marketing and support, three chatbots, leads stalled in the commercial handoff.',
    },
    oQueMudou: {
      pt: '49 agentes mirando o lançamento, com SDR e SAC unificados e o marketing como case piloto que cascateia para as outras diretorias.',
      en: '49 agents aimed at the launch, with SDR and customer service unified and marketing as the pilot case cascading to the other divisions.',
    },
    pergunta: {
      antes: { pt: 'Como unificar pré-vendas e atendimento em ', en: 'How do you unify pre-sales and customer service at ' },
      em: { pt: 'escala global', en: 'global scale' },
      depois: { pt: '?', en: '?' },
    },
    fluxo: [
      { pt: 'Recebe o lead ou o chamado', en: 'Receives the lead or ticket' },
      { pt: 'Qualifica e prioriza', en: 'Qualifies and prioritizes' },
      { pt: 'Direciona a execução', en: 'Routes the execution' },
      { pt: 'Integra HubSpot e Monday', en: 'Integrates HubSpot and Monday' },
      { pt: 'Humano fecha e decide', en: 'Human closes and decides' },
    ],
    comparativo: {
      label: { pt: 'Antes → Com o agente', en: 'Before → With the agent' },
      de: { k: { pt: 'Chatbots fragmentados, antes', en: 'Fragmented chatbots, before' }, v: '3' },
      para: { k: { pt: 'Agentes mirando o lançamento', en: 'Agents aimed at the launch' }, v: '49' },
      nota: {
        pt: '5x de ROI no contrato âncora · SDR e SAC unificados',
        en: '5x ROI on the anchor contract · SDR and customer service unified',
      },
    },
    vitrine: { num: '5x', frase: { pt: 'de ROI no contrato âncora', en: 'ROI on the anchor contract' } },
  },
  {
    slug: 'comunicacao-varejo',
    setor: 'Varejo',
    estagio: 'vitrine',
    papel: { pt: 'Analista de Comunicação Interna', en: 'Internal Communications Analyst' },
    cliente: { pt: 'Rede de varejo alimentar', en: 'Food retail chain' },
    headline: {
      pt: 'A comunicação de uma rede com +2.000 funcionários virou um agente, e a base de vendas virou conversa.',
      en: 'Communications for a chain of 2,000+ employees became an agent, and the sales base became a conversation.',
    },
    kpis: [
      { numero: '+2.000', rotulo: { pt: 'funcionários na comunicação interna', en: 'employees reached by internal comms' } },
      { numero: '2', rotulo: { pt: 'fontes (o ERP da rede e o BI) em linguagem natural', en: 'sources (the chain’s ERP and BI) in natural language' } },
    ],
    problema: {
      pt: 'Uma rede com mais de 2.000 funcionários e 2 sistemas (o ERP da rede e o BI) guardando os dados de venda, que só viravam comunicação e decisão com colaboradores humanos técnicos no meio.',
      en: 'A chain with 2,000+ employees and 2 systems (the chain’s ERP and BI) holding sales data that only became communication and decisions with technical staff in the middle.',
    },
    comoTrabalhava: {
      pt: 'Relatórios e comunicação interna montados manualmente.',
      en: 'Reports and internal communications assembled manually.',
    },
    oQueMudou: {
      pt: 'Um agente de comunicação conversa com a base e leva a informação certa aos +2.000 funcionários.',
      en: 'A communications agent talks to the data base and delivers the right information to the 2,000+ employees.',
    },
    pergunta: {
      antes: { pt: 'Como fazer a base de vendas ', en: 'How do you make the sales base ' },
      em: { pt: 'conversar', en: 'talk' },
      depois: { pt: ' com dois mil funcionários?', en: ' to two thousand employees?' },
    },
    fluxo: [
      { pt: 'Lê a base (ERP e BI)', en: 'Reads the base (ERP and BI)' },
      { pt: 'Entende a pergunta', en: 'Understands the question' },
      { pt: 'Responde em linguagem natural', en: 'Answers in natural language' },
      { pt: 'Comunica aos times', en: 'Communicates to the teams' },
      { pt: 'Humano publica', en: 'Human publishes' },
    ],
    vitrine: { num: '+2.000', frase: { pt: 'funcionários atendidos por um agente', en: 'employees served by one agent' } },
  },
  {
    slug: 'agendamento-whatsapp',
    setor: 'Serviços',
    estagio: 'ativo',
    papel: { pt: 'Atendente de Agendamento', en: 'Scheduling Assistant' },
    cliente: { pt: 'Instituição com milhares de membros', en: 'Institution with thousands of members' },
    headline: {
      pt: 'O agendamento de milhares de membros virou conversa por WhatsApp.',
      en: 'Scheduling for thousands of members became a WhatsApp conversation.',
    },
    kpis: [
      { numero: '+2.000/mês', rotulo: { pt: 'pessoas atendidas no agendamento', en: 'people served by scheduling' } },
    ],
    problema: {
      pt: 'Mais de 2.000 pessoas por mês pedindo agendamento sem um canal único, dependendo de pessoas para consultar agenda, confirmar e lembrar.',
      en: 'More than 2,000 people a month requesting appointments without a single channel, depending on staff to check calendars, confirm and remind.',
    },
    comoTrabalhava: {
      pt: 'Agendamento manual, consulta de disponibilidade e confirmação no esforço, pessoa a pessoa.',
      en: 'Manual scheduling, availability checks and confirmations by brute force, person by person.',
    },
    oQueMudou: {
      pt: 'Um agente no WhatsApp recebe, consulta a agenda, confirma e lembra automaticamente, para +2.000 pessoas por mês.',
      en: 'A WhatsApp agent receives requests, checks the calendar, confirms and reminds automatically, for 2,000+ people a month.',
    },
    pergunta: {
      antes: { pt: 'Como agendar duas mil pessoas por mês ', en: 'How do you schedule two thousand people a month ' },
      em: { pt: 'sem fila', en: 'with no queue' },
      depois: { pt: '?', en: '?' },
    },
    fluxo: [
      { pt: 'Recebe a solicitação', en: 'Receives the request' },
      { pt: 'Consulta a agenda', en: 'Checks the calendar' },
      { pt: 'Oferece horários', en: 'Offers time slots' },
      { pt: 'Confirma e lembra', en: 'Confirms and reminds' },
      { pt: 'Humano cuida da exceção', en: 'Human handles exceptions' },
    ],
    vitrine: { num: '+2.000/mês', frase: { pt: 'agendamentos resolvidos no WhatsApp', en: 'appointments resolved on WhatsApp' } },
  },
  {
    slug: 'acompanhamento-saude',
    setor: 'Saúde',
    estagio: 'ativo',
    papel: { pt: 'Assistente de Acompanhamento', en: 'Follow-up Assistant' },
    cliente: { pt: 'Operação de saúde e performance', en: 'Health & performance operation' },
    headline: {
      pt: 'Mais de 200 pessoas por dia acompanhadas, com o profissional na decisão.',
      en: 'More than 200 people a day followed up, with the professional making the decisions.',
    },
    kpis: [
      { numero: '+200/dia', rotulo: { pt: 'pessoas atendidas em São Paulo', en: 'people served in São Paulo' } },
    ],
    problema: {
      pt: 'Mais de 200 pessoas por dia, em São Paulo, para orientar e acompanhar, muito além do que cabe numa agenda de atendimento individual.',
      en: 'More than 200 people a day in São Paulo to guide and follow up — far beyond what fits an individual appointment schedule.',
    },
    comoTrabalhava: {
      pt: 'Acompanhamento limitado à agenda e ao profissional disponível, uma pessoa de cada vez.',
      en: 'Follow-up limited to the schedule and the available professional, one person at a time.',
    },
    oQueMudou: {
      pt: 'Um agente orienta e acompanha +200 pessoas por dia em paralelo, e o profissional decide o cuidado.',
      en: 'An agent guides and follows up 200+ people a day in parallel, and the professional decides on the care.',
    },
    pergunta: {
      antes: { pt: 'Como acompanhar duzentas pessoas por dia ', en: 'How do you follow up two hundred people a day ' },
      em: { pt: 'em paralelo', en: 'in parallel' },
      depois: { pt: '?', en: '?' },
    },
    fluxo: [
      { pt: 'Recebe a demanda', en: 'Receives the request' },
      { pt: 'Orienta e organiza a rotina', en: 'Guides and organizes the routine' },
      { pt: 'Acompanha a evolução', en: 'Tracks the progress' },
      { pt: 'Sinaliza quando precisa', en: 'Flags when needed' },
      { pt: 'Profissional decide o cuidado', en: 'Professional decides on the care' },
    ],
    vitrine: { num: '+200/dia', frase: { pt: 'pessoas acompanhadas em paralelo', en: 'people followed up in parallel' } },
  },
  {
    slug: 'pre-vendas-financeiro',
    setor: 'Financeiro',
    estagio: 'ativo',
    papel: { pt: 'Analista de Pré-vendas', en: 'Pre-sales Analyst' },
    cliente: { pt: 'Operação do setor financeiro', en: 'Financial sector operation' },
    headline: {
      pt: 'A qualificação de leads virou +R$50 mil por mês que antes esfriava na fila.',
      en: 'Lead qualification became R$50k+ a month that used to go cold in the queue.',
    },
    kpis: [
      { numero: '~18%', rotulo: { pt: 'recuperados que esfriavam na fila', en: 'recovered from leads going cold in the queue' } },
      { numero: '24/7', rotulo: { pt: 'qualificação e follow-up sem parar', en: 'non-stop qualification and follow-up' } },
    ],
    problema: {
      pt: 'Leads chegando em volume e esfriando na fila, dependendo de alguém para qualificar e dar follow-up, mais de R$50 mil por mês escapando.',
      en: 'Leads arriving in volume and going cold in the queue, depending on someone to qualify and follow up — R$50k+ a month slipping away.',
    },
    comoTrabalhava: {
      pt: 'Qualificação e follow-up manuais, com o lead bom esfriando antes do contato.',
      en: 'Manual qualification and follow-up, with good leads going cold before contact.',
    },
    oQueMudou: {
      pt: 'O agente qualifica e faz o follow-up na hora, recupera +R$50 mil por mês, e o time comercial fala só com quem está pronto.',
      en: 'The agent qualifies and follows up instantly, recovers R$50k+ a month, and the sales team only talks to leads that are ready.',
    },
    pergunta: {
      antes: { pt: 'Como parar de perder cinquenta mil reais por mês na ', en: 'How do you stop losing fifty thousand a month in the ' },
      em: { pt: 'fila', en: 'queue' },
      depois: { pt: '?', en: '?' },
    },
    fluxo: [
      { pt: 'Recebe o lead', en: 'Receives the lead' },
      { pt: 'Qualifica o perfil', en: 'Qualifies the profile' },
      { pt: 'Faz o follow-up', en: 'Does the follow-up' },
      { pt: 'Agenda o que está quente', en: 'Books the hot ones' },
      { pt: 'Humano conduz a venda', en: 'Human leads the sale' },
    ],
    vitrine: { num: '+R$50 mil', frase: { pt: 'recuperados por mês da fila de leads', en: 'recovered per month from the lead queue' } },
  },
];

export function getAgenticCase(slug: string | null | undefined) {
  if (!slug) return undefined;
  return AGENTIC_CASES.find((c) => c.slug === slug);
}
