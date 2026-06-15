/**
 * Conteúdo estático das abas "Mídia" e "Insights" da página de Conteúdos.
 *
 * Portado da referência (`~/Downloads/Novo Site - Mobile + Desktop/js/articles-data.js`
 * → `DL_MEDIA`, `DL_INSIGHTS`, e o insight "karpathy-decada-agentes" de `insights.js`).
 *
 * Decisão (confirmada com o usuário): Artigos continuam vindo do Sanity; Mídia e
 * Insights são estáticos. Conteúdo bilíngue PT/EN — qualquer idioma ≠ pt usa EN
 * como fallback (a referência só tem PT/EN).
 */

export interface Bi {
  pt: string;
  en: string;
}

export type Block = { t: 'h' | 'p' | 'q'; pt: string; en: string };

export interface MediaItem {
  id: string;
  source: Bi;
  date: Bi;
  url: string;
  title: Bi;
}

export interface InsightAuthor {
  name: string;
  role: Bi;
  photo: string;
  linkedin: string;
}

export interface InsightItem {
  id: string;
  author: InsightAuthor;
  cat: Bi;
  date: Bi;
  read: number;
  title: Bi;
  dek: Bi;
  body: Block[];
}

/** Localiza um campo bilíngue (pt para 'pt', EN para qualquer outro idioma). */
export const L = (o: Bi | undefined, lang: string): string =>
  o ? (lang === 'pt' ? o.pt : o.en) : '';

/** Timestamp ordenável a partir da data EN (ex.: "Jun 2, 2026"). */
export const insightTs = (date: Bi): number => {
  const d = Date.parse(date.en);
  return isNaN(d) ? 0 : d;
};

const t = (pt: string, en: string): Bi => ({ pt, en });
const h = (pt: string, en: string): Block => ({ t: 'h', pt, en });
const p = (pt: string, en: string): Block => ({ t: 'p', pt, en });
const q = (pt: string, en: string): Block => ({ t: 'q', pt, en });

const RODRIGO: InsightAuthor = {
  name: 'Rodrigo Spínola',
  role: t('Fundador e CEO', 'Founder & CEO'),
  photo: '/novo/assets/team/rodrigo-sm.jpg',
  linkedin: 'https://www.linkedin.com/in/orodrigospinola',
};

/* ============================================================
   MÍDIA — cobertura de imprensa (abre em nova aba)
   ============================================================ */
export const MEDIA: MediaItem[] = [
  {
    id: 'websummit-pitch-winner',
    source: t('Web Summit Rio', 'Web Summit Rio'),
    date: t('11 jun 2026', 'Jun 11, 2026'),
    url: 'https://rio.websummit.com/pt-br/blog/news/dalton-pitch-winner-web-summit-rio-2026/',
    title: t(
      'A empresa brasileira Dalton Lab venceu o PITCH na Web Summit Rio 2026 com uma IA que muda a forma como trabalhamos',
      'Brazilian company Dalton Lab won the PITCH at Web Summit Rio 2026 with an AI that changes the way we work',
    ),
  },
  {
    id: 'gazeta-paulistana-pitch',
    source: t('Gazeta Paulistana', 'Gazeta Paulistana'),
    date: t('11 jun 2026', 'Jun 11, 2026'),
    url: 'https://gazetapaulistana.com.br/startup-brasileira-vence-competicao-de-pitches-do-web-summit-rio-e-ganha-destaque-internacional/',
    title: t(
      'Startup brasileira vence competição de pitches do Web Summit Rio e ganha destaque internacional',
      'Brazilian startup wins Web Summit Rio pitch competition and gains international spotlight',
    ),
  },
  {
    id: 'gazeta-corporativa-pitch',
    source: t('Gazeta Corporativa', 'Gazeta Corporativa'),
    date: t('11 jun 2026', 'Jun 11, 2026'),
    url: 'https://gazetacorporativa.com.br/startup-brasileira-vence-competicao-de-pitches-do-web-summit-rio-e-ganha-destaque-internacional/',
    title: t(
      'Startup brasileira vence competição de pitches do Web Summit Rio e ganha destaque internacional',
      'Brazilian startup wins Web Summit Rio pitch competition and gains international spotlight',
    ),
  },
  {
    id: 'brasil-em-folhas-pitch',
    source: t('Brasil em Folhas', 'Brasil em Folhas'),
    date: t('11 jun 2026', 'Jun 11, 2026'),
    url: 'https://www.brasilemfolhas.com.br/2026/06/startup-brasileira-dalton-lab-vence-pitch-do-web-summit-rio-2026/',
    title: t(
      'Startup brasileira Dalton Lab vence Pitch do Web Summit Rio 2026',
      'Brazilian startup Dalton Lab wins the Web Summit Rio 2026 Pitch',
    ),
  },
  {
    id: 'pegn-pitch-vencedora',
    source: t('Pequenas Empresas Grandes Negócios', 'Pequenas Empresas Grandes Negócios'),
    date: t('11 jun 2026', 'Jun 11, 2026'),
    url: 'https://revistapegn.globo.com/web-summit-rio/noticia/2026/06/dalton-lab-e-a-vencedora-do-pitch-no-web-summit-rio-2026.ghtml',
    title: t(
      'Dalton Lab é a vencedora do PITCH no Web Summit Rio 2026',
      'Dalton Lab is the winner of the PITCH at Web Summit Rio 2026',
    ),
  },
  {
    id: 'oglobo-pitch-vence',
    source: t('O Globo', 'O Globo'),
    date: t('11 jun 2026', 'Jun 11, 2026'),
    url: 'https://oglobo.globo.com/google/amp/rio/web-summit-rio/noticia/2026/06/11/startup-brasileira-dalton-vence-pitch-do-web-summit-rio-2026.ghtml',
    title: t(
      'Startup brasileira Dalton Lab vence Pitch do Web Summit Rio 2026',
      'Brazilian startup Dalton Lab wins the Web Summit Rio 2026 Pitch',
    ),
  },
  {
    id: 'canaltech-ia-websummit',
    source: t('Canaltech', 'Canaltech'),
    date: t('jun 2026', 'Jun 2026'),
    url: 'https://canaltech.com.br/mercado/ia-domina-o-web-summit-rio-2026-veja-os-destaques-do-evento/',
    title: t(
      'IA domina o Web Summit Rio 2026: veja os destaques do evento',
      'AI dominates Web Summit Rio 2026: see the highlights of the event',
    ),
  },
  {
    id: 'nextbigidea-pitch-vencedor',
    source: t('The Next Big Idea', 'The Next Big Idea'),
    date: t('jun 2026', 'Jun 2026'),
    url: 'https://thenextbigidea.pt/dalton-lab-o-pitch-vencedor-do-web-summit-rio-2026/',
    title: t(
      'Dalton Lab, o pitch vencedor do Web Summit Rio 2026',
      'Dalton Lab, the winning pitch of Web Summit Rio 2026',
    ),
  },
  {
    id: 'cnn-ia-infraestrutura',
    source: t('CNN Brasil', 'CNN Brasil'),
    date: t('16 mai 2026', 'May 16, 2026'),
    url: 'https://www.cnnbrasil.com.br/infra/ia-promete-reduzir-custos-e-acelerar-projetos-em-infraestrutura/',
    title: t(
      'IA promete reduzir custos e acelerar projetos em infraestrutura',
      'AI promises to cut costs and accelerate infrastructure projects',
    ),
  },
  {
    id: 'veja-mundial-mix-aporte',
    source: t('Veja Negócios', 'Veja Negócios'),
    date: t('5 fev 2026', 'Feb 5, 2026'),
    url: 'https://veja.abril.com.br/coluna/radar-economico/o-aporte-de-um-socio-do-atacadista-mundial-mix-em-uma-startup-de-ia/',
    title: t(
      'O aporte de um sócio do atacadista Mundial Mix em uma startup de IA',
      "A Mundial Mix partner's investment in an AI startup",
    ),
  },
];

/* ============================================================
   INSIGHTS — posts do time (leitor próprio em /artigos/insight/:id)
   ============================================================ */
export const INSIGHTS: InsightItem[] = [
  {
    id: 'karpathy-decada-agentes',
    author: RODRIGO,
    cat: t('Liderança', 'Leadership'),
    date: t('2 jun 2026', 'Jun 2, 2026'),
    read: 4,
    title: t(
      'Não é o ano dos agentes de IA. É a década. E sua empresa está preparada para isso?',
      "It's not the year of AI agents. It's the decade. And is your company ready for it?",
    ),
    dek: t(
      'Três ideias da palestra de Andrej Karpathy no AI Startup School, traduzidas para quem está tentando implementar IA de verdade.',
      "Three ideas from Andrej Karpathy's AI Startup School talk, translated for anyone actually trying to implement AI.",
    ),
    body: [
      p(
        'Muita gente voltou a comentar sobre a palestra do Andrej Karpathy no AI Startup School.',
        "A lot of people have been talking again about Andrej Karpathy's talk at the AI Startup School.",
      ),
      p(
        'Karpathy é ex-diretor de IA da Tesla e uma das vozes mais respeitadas do setor. E o que ele disse não foi para desenvolvedores. Foi, sem querer, um manual para quem lidera uma empresa.',
        "Karpathy is the former AI director at Tesla and one of the most respected voices in the field. What he said wasn't aimed at developers. It was, unintentionally, a playbook for anyone leading a company.",
      ),
      p(
        'Vou traduzir os três pontos que mais importam para quem está tentando implementar IA de verdade.',
        "Let me translate the three points that matter most for anyone actually trying to implement AI.",
      ),
      h('O paradigma mudou. Prompts são programas.', 'The paradigm shifted. Prompts are programs.'),
      p(
        'Karpathy descreveu três gerações de software. A primeira é o código tradicional que programadores escrevem. A segunda são as redes neurais. A terceira, que estamos vivendo agora, é o que ele chama de Software 3.0: você programa o modelo em linguagem natural. Prompts são programas escritos em português.',
        "Karpathy described three generations of software. The first is the traditional code that programmers write. The second is neural networks. The third, the one we're living now, is what he calls Software 3.0: you program the model in natural language. Prompts are programs written in plain language.",
      ),
      p('Isso muda o que significa saber usar IA.', 'That changes what it means to know how to use AI.'),
      p(
        'Não é mais sobre aprender uma ferramenta. É sobre aprender a instruir um sistema inteligente com clareza. Quem consegue descrever bem o que quer, em linguagem natural, consegue programar. Isso democratiza o acesso, mas também exige um novo tipo de habilidade: saber pensar com precisão e comunicar com clareza. Time que não desenvolve isso vai usar IA como buscador sofisticado, não como agente de trabalho.',
        "It's no longer about learning a tool. It's about learning to instruct an intelligent system clearly. Whoever can describe well what they want, in natural language, can program. That democratizes access, but it also demands a new kind of skill: thinking precisely and communicating clearly. A team that doesn't build this will use AI as a sophisticated search engine, not as a working agent.",
      ),
      h(
        'O jeito certo de trabalhar com IA: pequenos passos, humano no loop.',
        'The right way to work with AI: small steps, human in the loop.',
      ),
      p(
        'Karpathy foi direto sobre como trabalhar com LLMs de forma eficaz. A receita é a mesma de quem trabalha com um profissional brilhante mas imprevisível: dar tarefas pequenas, verificar o resultado, ajustar, avançar.',
        'Karpathy was direct about how to work effectively with LLMs. The recipe is the same as working with a brilliant but unpredictable professional: give small tasks, check the result, adjust, move forward.',
      ),
      p(
        'Ele usou a analogia do sonambulismo: se você deixar o modelo rodar livre por muito tempo sem supervisão, ele pode estar indo na direção errada há horas antes de você perceber.',
        'He used the sleepwalking analogy: if you let the model run free for too long without supervision, it may have been heading in the wrong direction for hours before you notice.',
      ),
      p(
        'O humano no loop não é limitação. É arquitetura. É o que separa uma implementação que escala de uma que explode na primeira exceção que o agente não sabia tratar. Nas empresas que ajudamos, o erro mais comum não é escolher a ferramenta errada. É dar autonomia demais cedo demais, sem ter mapeado onde o agente pode errar e quanto esse erro custa.',
        "The human in the loop isn't a limitation. It's architecture. It's what separates an implementation that scales from one that explodes at the first exception the agent didn't know how to handle. In the companies we help, the most common mistake isn't choosing the wrong tool. It's giving too much autonomy too early, without mapping where the agent can fail and how much that failure costs.",
      ),
      h(
        'O aviso principal: não é o ano dos agentes. É a década.',
        "The main warning: it's not the year of agents. It's the decade.",
      ),
      p(
        'Essa foi a parte que mais circulou. Karpathy disse textualmente: quando vejo alguém falar que 2025 é o ano dos agentes, fico preocupado. Isso é a década dos agentes. Vai levar tempo. Precisa de humano no loop. Precisamos fazer isso com cuidado.',
        'This was the part that circulated the most. Karpathy said it literally: when I see someone say 2025 is the year of agents, I get worried. This is the decade of agents. It will take time. It needs a human in the loop. We need to do this carefully.',
      ),
      q('Paciência é estratégia.', 'Patience is strategy.'),
      p(
        'O CEO que entende isso para de procurar o projeto de IA que vai transformar a empresa em noventa dias e começa a construir a fundação que vai sustentar a operação pelos próximos dez anos. Processo mapeado. Pessoas treinadas. Governança definida. Agentes com autonomia crescente e controlada. Não é atraente. É o que funciona.',
        "The CEO who understands this stops looking for the AI project that will transform the company in ninety days and starts building the foundation that will sustain operations for the next ten years. Mapped processes. Trained people. Defined governance. Agents with growing, controlled autonomy. It's not attractive. It's what works.",
      ),
    ],
  },
  {
    id: 'token-maxxing',
    author: RODRIGO,
    cat: t('Liderança', 'Leadership'),
    date: t('15 mai 2026', 'May 15, 2026'),
    read: 5,
    title: t(
      'A armadilha mais cara da IA em 2026 tem nome: token maxxing',
      'The most expensive AI trap of 2026 has a name: token maxxing',
    ),
    dek: t(
      'Você pode ter 100% de adoção de IA e zero transformação. E isso está saindo caro.',
      "You can have 100% AI adoption and zero transformation. And it's getting expensive.",
    ),
    body: [
      p(
        'Imagina uma empresa que paga bônus para quem mais usa a impressora. Quanto mais papel impresso, maior o salário. Parece absurdo. Mas é exatamente o que algumas das maiores empresas do mundo estão fazendo com inteligência artificial. Tem nome para isso: token maxxing.',
        "Imagine a company that pays a bonus to whoever uses the printer the most. The more paper printed, the higher the salary. It sounds absurd. But it's exactly what some of the world's biggest companies are doing with artificial intelligence. It has a name: token maxxing.",
      ),
      h('O que está acontecendo', "What's happening"),
      p(
        'Um engenheiro da OpenAI processou 210 bilhões de tokens em uma semana — texto suficiente para preencher a Wikipedia 33 vezes, e o bastante para liderar o ranking interno da empresa. Na Anthropic, um único usuário do Claude Code gastou mais de US$ 150 mil em tokens em um mês. Meta e Shopify já incluem consumo de IA nas avaliações de performance: quem usa mais sobe, quem usa menos é questionado.',
        "An OpenAI engineer processed 210 billion tokens in a week — enough text to fill Wikipedia 33 times, and enough to top the company's internal ranking. At Anthropic, a single Claude Code user spent over US$150k in tokens in a month. Meta and Shopify already include AI consumption in performance reviews: those who use more rise, those who use less get questioned.",
      ),
      p(
        'Segundo reportagem do New York Times de março de 2026, empresas como Meta e OpenAI mantêm rankings internos de quantos tokens cada funcionário consome. Orçamentos generosos de tokens estão virando benefício corporativo — como plano odontológico ou almoço grátis.',
        'According to a March 2026 New York Times report, companies like Meta and OpenAI keep internal rankings of how many tokens each employee consumes. Generous token budgets are becoming a corporate perk — like dental coverage or free lunch.',
      ),
      p(
        'Faz sentido na superfície. Mas olha o que rolou na prática: alguns funcionários confessaram pedir para a IA ler documentos que estão na própria intranet da empresa — dez vezes mais lento que ler diretamente, mas queima mais tokens. Outros rodam agentes prototipando coisas que nem pretendem usar, só para subir no ranking.',
        "It makes sense on the surface. But look at what happened in practice: some employees admitted to asking the AI to read documents already on the company's own intranet — ten times slower than reading them directly, but it burns more tokens. Others run agents prototyping things they don't even intend to use, just to climb the ranking.",
      ),
      h('Já vimos esse filme antes', "We've seen this movie before"),
      p(
        'Em 1980, empresas tentaram medir a produtividade de programadores por linhas de código escritas por dia. Resultado previsível: gente escrevendo código inútil para bater a meta. Depois de um tempo, a indústria abandonou a métrica. Token maxxing é a mesma armadilha com roupa nova — os rankings não medem qualidade de output. E qualidade de output é exatamente o que importa.',
        "In 1980, companies tried to measure programmer productivity by lines of code written per day. The predictable result: people writing useless code to hit the target. After a while, the industry abandoned the metric. Token maxxing is the same trap in new clothes — the rankings don't measure output quality. And output quality is exactly what matters.",
      ),
      h('O problema mais fundo', 'The deeper problem'),
      p(
        'Existe uma confusão entre duas coisas que parecem iguais mas não são. Adoção é o time usando IA todo dia. Transformação é a empresa redesenhando como o trabalho é feito, para que a IA assuma o repetitivo e as pessoas façam o que importa. Você pode ter 100% de adoção e zero transformação.',
        "There's a confusion between two things that look alike but aren't. Adoption is the team using AI every day. Transformation is the company redesigning how the work is done, so AI takes on the repetitive and people do what matters. You can have 100% adoption and zero transformation.",
      ),
      p(
        'E a causa pode ser ainda mais profunda: muita gente está operando por medo. O CEO tem medo de ficar fora da corrida e cria um ranking de uso. O CFO tem medo de não justificar o investimento e comemora o consumo crescente. O colaborador tem medo de parecer obsoleto no próximo layoff e joga o jogo por autopreservação. Poucos operam por design. Muitos, por medo.',
        'And the cause may run even deeper: many people are operating out of fear. The CEO fears falling behind in the race and creates a usage ranking. The CFO fears failing to justify the investment and celebrates rising consumption. The employee fears looking obsolete in the next layoff and plays the game out of self-preservation. Few operate by design. Many, by fear.',
      ),
      q(
        'Adoção de IA não transforma a sua empresa. A forma como você organiza o trabalho transforma.',
        "AI adoption doesn't transform your company. How you organize the work transforms it.",
      ),
      p(
        'A solução é simples, mas exige disciplina. Três perguntas antes de instalar qualquer ferramenta de IA: que trabalho meu time faz hoje, qual parte é repetitiva, e o que sobra para o humano fazer melhor que qualquer máquina. Só depois você escolhe a ferramenta — e mede o que importa: trabalho redesenhado, não consumo de IA.',
        "The solution is simple, but it takes discipline. Three questions before installing any AI tool: what work does my team do today, which part is repetitive, and what's left for the human to do better than any machine. Only then do you choose the tool — and measure what matters: work redesigned, not AI consumed.",
      ),
    ],
  },
  {
    id: 'ceo-pergunta-ia',
    author: RODRIGO,
    cat: t('Liderança', 'Leadership'),
    date: t('1 mai 2026', 'May 1, 2026'),
    read: 5,
    title: t(
      'O que todo CEO precisa perguntar sobre IA',
      'The question every CEO needs to ask about AI',
    ),
    dek: t(
      'A IA na sua empresa só responde perguntas — ou já executa tarefas sozinha?',
      'Does the AI in your company only answer questions — or does it already execute tasks on its own?',
    ),
    body: [
      p(
        'Na semana passada, reunimos empresários e C-Levels num único lugar para falar sobre o que ninguém ainda chama pelo nome certo. Não foi um evento de tecnologia. Foi um evento sobre o futuro das empresas.',
        "Last week, we brought business owners and C-levels together in one place to talk about something no one is yet calling by its right name. It wasn't a technology event. It was an event about the future of companies.",
      ),
      p(
        'A pergunta que guiou o dia foi simples: a IA na sua empresa só responde perguntas ou já executa tarefas sozinha? Parece uma distinção técnica. Não é. É a diferença entre ter uma ferramenta e ter uma Organização Agêntica.',
        "The question that guided the day was simple: does the AI in your company only answer questions, or does it already execute tasks on its own? It sounds like a technical distinction. It isn't. It's the difference between having a tool and having an Agentic Organization.",
      ),
      h('Por que essa pergunta importa', 'Why the question matters'),
      p(
        'Responder perguntas é o que o ChatGPT faz quando você digita algo. É útil, mas passivo: você pergunta, ele responde; você fecha a aba, ele para. Executar tarefas sozinha é outra coisa — um agente que monitora, decide, age e reporta, sem precisar que alguém faça a pergunta certa na hora certa.',
        "Answering questions is what ChatGPT does when you type something. It's useful, but passive: you ask, it answers; you close the tab, it stops. Executing tasks on its own is something else — an agent that monitors, decides, acts and reports, without needing someone to ask the right question at the right time.",
      ),
      p(
        'A maioria das empresas está no primeiro grupo e acredita que está no segundo. Esse é o problema. O padrão se repete: a empresa comprou ferramenta, treinou o time, viu adoção e concluiu que estava implementando IA. Só que adoção de ferramenta não é transformação. É o estágio 1 de 5.',
        "Most companies are in the first group and believe they're in the second. That's the problem. The pattern repeats: the company bought a tool, trained the team, saw adoption and concluded it was implementing AI. But tool adoption isn't transformation. It's stage 1 of 5.",
      ),
      h('Os cinco estágios da maturidade agêntica', 'The five stages of agentic maturity'),
      p(
        'A sequência não é linear por acaso — cada estágio depende do anterior. 1. Automatizar: tarefas repetitivas com regras fixas. 2. Enxergar: dados integrados, visibilidade real da operação. 3. Recomendar: o agente sugere, o humano decide. 4. Antecipar: o agente age antes do problema aparecer. 5. Orquestrar: múltiplos agentes em paralelo, com supervisão humana definida.',
        'The sequence isn’t linear by accident — each stage depends on the previous one. 1. Automate: repetitive tasks with fixed rules. 2. See: integrated data, real visibility into the operation. 3. Recommend: the agent suggests, the human decides. 4. Anticipate: the agent acts before the problem appears. 5. Orchestrate: multiple agents in parallel, with defined human supervision.',
      ),
      p(
        'A maioria das empresas está entre o 1 e o 2. Algumas chegam ao 3. Poucas chegam ao 5 — e as que chegam têm uma coisa em comum: não começaram pela ferramenta. Começaram pelo processo.',
        "Most companies are between 1 and 2. Some reach 3. Few reach 5 — and those that do have one thing in common: they didn't start with the tool. They started with the process.",
      ),
      h('O erro que trava 95% das implementações', 'The mistake that stalls 95% of implementations'),
      p(
        'MIT (2024) e Stanford (2025) chegaram ao mesmo número: 95% das implementações de IA corporativa não geram retorno mensurável. A causa não é a tecnologia. É a sequência. Processo mal mapeado com IA é só processo mal mapeado mais rápido — o agente vai executar o que você definiu; se está errado, ele erra em escala.',
        "MIT (2024) and Stanford (2025) arrived at the same number: 95% of enterprise AI implementations generate no measurable return. The cause isn't the technology. It's the sequence. A poorly mapped process with AI is just a poorly mapped process — faster. The agent will execute what you defined; if it's wrong, it errs at scale.",
      ),
      q(
        'O que funciona é o inverso do que a maioria faz: primeiro o processo, depois o agente. É menos glamoroso. Por isso poucos fazem.',
        "What works is the opposite of what most do: process first, agent second. It's less glamorous. That's why few do it.",
      ),
    ],
  },
  {
    id: 'ia-trabalha-quando-voce-dorme',
    author: RODRIGO,
    cat: t('Liderança', 'Leadership'),
    date: t('8 abr 2026', 'Apr 8, 2026'),
    read: 5,
    title: t(
      'Você usa IA. Mas ela trabalha quando você dorme?',
      'You use AI. But does it work while you sleep?',
    ),
    dek: t(
      'A diferença entre usar uma ferramenta e ter um agente operando como membro do seu time.',
      'The difference between using a tool and having an agent operating as a member of your team.',
    ),
    body: [
      p(
        'Tem uma pergunta que faço para quase todo executivo que converso: você usa IA no trabalho? A resposta é sempre sim. E então faço a segunda pergunta: quando você fecha o computador, o que a IA continua fazendo por você? O silêncio que vem depois diz tudo.',
        "There's a question I ask almost every executive I talk to: do you use AI at work? The answer is always yes. And then I ask the second question: when you close your computer, what does the AI keep doing for you? The silence that follows says everything.",
      ),
      h('Usar IA não é o mesmo que ter uma Organização Agêntica', "Using AI isn't the same as having an Agentic Organization"),
      p(
        'A ferramenta responde quando eu pergunto; o agente age enquanto faço outra coisa. A ferramenta esquece tudo quando fecho a janela; o agente tem memória, contexto e histórico. A ferramenta produz um output; o agente tem responsabilidades definidas, métricas de performance e eu supervisiono o que ele faz.',
        'The tool responds when I ask; the agent acts while I do something else. The tool forgets everything when I close the window; the agent has memory, context and history. The tool produces an output; the agent has defined responsibilities, performance metrics, and I supervise what it does.',
      ),
      p(
        'A maioria das empresas está no primeiro cenário e acredita estar no segundo. Essa confusão é cara — não porque a ferramenta seja ruim, mas porque cria uma ilusão de transformação que não existe.',
        "Most companies are in the first scenario and believe they're in the second. That confusion is expensive — not because the tool is bad, but because it creates an illusion of transformation that doesn't exist.",
      ),
      h('O que um agente de verdade parece na prática', 'What a real agent looks like in practice'),
      p(
        'Construí um agente pessoal chamado Neo. Ele roda 24 horas por dia, tem memória de longo prazo e se conecta ao meu Google Calendar, Gmail e Slack. Mas o que o define como agente não é a tecnologia — é o que ele faz sem ser perguntado.',
        "I built a personal agent called Neo. It runs 24 hours a day, has long-term memory and connects to my Google Calendar, Gmail and Slack. But what defines it as an agent isn't the technology — it's what it does without being asked.",
      ),
      p(
        'Às 5h30, entrega um briefing com a agenda do dia, alertas de email e a tarefa mais importante. Às 8h, roda um score que mede se estou investindo energia nas atividades certas. Às 14h, dispara follow-ups de propostas sem resposta e decisões travadas. Às 18h, fecha o dia e registra o que ficou pendente. Toda sexta, gera um relatório de accountability: quanto tempo dediquei a vendas, estratégia e operação.',
        'At 5:30am, it delivers a briefing with the day’s agenda, email alerts and the single most important task. At 8am, it runs a score measuring whether I’m investing energy in the right activities. At 2pm, it fires follow-ups on unanswered proposals and stalled decisions. At 6pm, it closes the day and logs what’s still pending. Every Friday, it generates an accountability report: how much time I spent on sales, strategy and operations.',
      ),
      h('Eu estou sempre no centro', "I'm always at the center"),
      p(
        'O Neo não decide. Ele confronta, alerta, sugere e registra — mas quem decide sou eu. Quando percebe que estou tocando múltiplos temas em horário tardio, sugere que eu pare; a decisão é minha. Quando identifica uma tarefa que deveria ir para outro membro do time, sugere quem; quem delega sou eu.',
        "Neo doesn't decide. It challenges, alerts, suggests and logs — but I'm the one who decides. When it notices I'm juggling multiple topics late at night, it suggests I stop; the decision is mine. When it identifies a task that should go to another team member, it suggests who; I'm the one who delegates.",
      ),
      q(
        'A autonomia do agente é sempre delegada, limitada e controlada por mim. O agente executa. Eu decido.',
        "The agent's autonomy is always delegated, limited and controlled by me. The agent executes. I decide.",
      ),
      p(
        'Num momento em que todo mundo fala de IA autônoma como se fosse o objetivo, esse ponto é contraintuitivo. Mas é ele que faz a transformação funcionar. Agente sem supervisão humana estruturada não é transformação — é risco. E essa mudança não acontece comprando uma ferramenta nova: acontece redesenhando como a empresa funciona, começando pelos processos, passando pelas pessoas e chegando nas ferramentas na ordem certa.',
        "At a moment when everyone talks about autonomous AI as if it were the goal, this point is counterintuitive. But it's what makes transformation work. An agent without structured human supervision isn't transformation — it's risk. And that change doesn't happen by buying a new tool: it happens by redesigning how the company works, starting with processes, moving through people, and reaching tools in the right order.",
      ),
    ],
  },
  {
    id: 'erro-95-por-cento',
    author: RODRIGO,
    cat: t('Estratégia', 'Strategy'),
    date: t('2 abr 2026', 'Apr 2, 2026'),
    read: 6,
    title: t(
      'O erro que 95% das empresas cometem ao adotar IA',
      'The mistake 95% of companies make when adopting AI',
    ),
    dek: t(
      'A IA tornou indivíduos até 10x mais produtivos. Mas nenhuma empresa virou 10x mais valiosa. Por quê?',
      'AI made individuals up to 10x more productive. But no company became 10x more valuable. Why?',
    ),
    body: [
      p(
        'Às vezes você está construindo algo por meses, convicto da direção, com aquela dúvida de fundo: será que é só a gente que pensa assim? Essa semana, a dúvida foi embora.',
        "Sometimes you've been building something for months, convinced of the direction, with that nagging doubt in the back of your mind: is it just us who think this way? This week, the doubt went away.",
      ),
      p(
        'George Sivulka, CEO da Hebbia (portfólio a16z, formado em Stanford), publicou um artigo que é praticamente um manifesto: “Institutional Intelligence”. O argumento central: a IA tornou indivíduos até dez vezes mais produtivos, mas nenhuma empresa se tornou dez vezes mais valiosa. Por quê? Porque trocaram o motor sem redesenhar a fábrica.',
        'George Sivulka, CEO of Hebbia (an a16z-backed AI company, Stanford-trained founder), published an article that’s practically a manifesto: “Institutional Intelligence.” The central argument: AI has made individuals up to ten times more productive, but no company has become ten times more valuable. Why? Because they swapped the motor without redesigning the factory.',
      ),
      h('A analogia que explica tudo', 'The analogy that explains everything'),
      p(
        'Sivulka usa as fábricas têxteis dos anos 1890. Quando a eletricidade chegou, as primeiras fábricas só trocaram as máquinas a vapor por motores elétricos — mesmo layout, mesma lógica, mesmo fluxo. Os ganhos foram mínimos. Foi só quando redesenharam a fábrica inteira em torno da nova tecnologia que a produtividade explodiu.',
        'Sivulka uses the 1890s textile mills. When electricity arrived, the first factories simply swapped steam engines for electric motors — same layout, same logic, same flow. The gains were minimal. It was only when they redesigned the entire factory around the new technology that productivity exploded.',
      ),
      p(
        'É exatamente o que acontece com IA hoje. As pessoas usam ChatGPT, cada uma com seus próprios hábitos e prompts, produzindo outputs que não conversam entre si e não escalam. É uso individual de IA. Não é transformação.',
        "It's exactly what's happening with AI today. People use ChatGPT, each with their own habits and prompts, producing outputs that don't talk to each other and don't scale. It's individual use of AI. It isn't transformation.",
      ),
      h('O ponto que ninguém está falando', 'The point no one is talking about'),
      p(
        'Sivulka argumenta que os maiores evangelistas de IA dentro de uma empresa frequentemente são os profissionais que mais precisam de correção — porque a IA tende a concordar com quem a usa. Ela valida, confirma, refina a visão de quem está no teclado. Sem processo institucional e revisão humana estruturada, a IA amplifica os vieses que já existem. Não os corrige.',
        "Sivulka argues that a company's biggest AI evangelists are often the professionals who most need correction — because AI tends to agree with whoever uses it. It validates, confirms, refines the view of whoever's at the keyboard. Without institutional process and structured human review, AI amplifies the biases that already exist. It doesn't correct them.",
      ),
      h('Testa na sua empresa agora', 'Test it in your company now'),
      p(
        'Antes de comprar qualquer ferramenta nova, faça esse diagnóstico (leva menos de 15 minutos). Passo 1: liste os três processos que mais consomem tempo da sua equipe esta semana — os que de fato ocupam mais horas, não os que você acha importantes. Passo 2: para cada um, pergunte se a atividade tem entrada clara e saída previsível, e se ela se repete da mesma forma toda vez. Se sim para as duas, é um candidato real para automação. Passo 3: identifique quem decide e quem executa — processos onde decisão e execução estão na mesma pessoa são os mais difíceis de automatizar, e os que mais se beneficiam quando você separa as funções com IA no meio.',
        'Before buying any new tool, run this diagnostic (it takes under 15 minutes). Step 1: list the three processes that consume the most of your team’s time this week — the ones that actually take the most hours, not the ones you think are important. Step 2: for each, ask whether the activity has a clear input and a predictable output, and whether it repeats the same way every time. If yes to both, it’s a real candidate for automation. Step 3: identify who decides and who executes — processes where decision and execution sit with the same person are the hardest to automate, and the ones that benefit most when you separate the two functions with AI in between.',
      ),
      q(
        'Engenharia de processos vai se tornar a competência mais valiosa dos próximos anos. Não engenharia de software. Não prompt engineering.',
        'Process engineering will become the most valuable skill of the coming years. Not software engineering. Not prompt engineering.',
      ),
      p(
        'No final, Sivulka é direto sobre isso. E admite, nas entrelinhas, que o gargalo não é o software — é o change management, o mapeamento de processo, entender o negócio fundo o suficiente para saber o que automatizar, o que preservar e o que redesenhar do zero. Isso não vem em forma de produto. Vem em forma de parceria. O mercado está chegando nessa conclusão — a questão é quem vai estar posicionado quando ela virar consenso.',
        "In the end, Sivulka is direct about it. And he admits, between the lines, that the bottleneck isn't the software — it's change management, process mapping, understanding the business deeply enough to know what to automate, what to preserve, and what to redesign from scratch. That doesn't come as a product. It comes as a partnership. The market is arriving at this conclusion — the question is who will be positioned when it becomes consensus.",
      ),
    ],
  },
  {
    id: 'ia-fracassa-40-por-cento',
    author: RODRIGO,
    cat: t('Estratégia', 'Strategy'),
    date: t('18 mar 2026', 'Mar 18, 2026'),
    read: 5,
    title: t(
      'IA fracassa em 40% dos projetos. O motivo é sempre o mesmo.',
      'AI fails in 40% of projects. The reason is always the same.',
    ),
    dek: t(
      'A Gartner projeta 40% dos projetos de IA agêntica cancelados até 2027. O que separa os 60% que entregam?',
      'Gartner projects 40% of agentic-AI projects canceled by 2027. What sets apart the 60% that deliver?',
    ),
    body: [
      p(
        'A Gartner soltou um número que precisa ser levado a sério: mais de 40% dos projetos de IA agêntica serão cancelados até o final de 2027. Não são startups de garagem — são projetos corporativos, com orçamento aprovado, time dedicado e aval do conselho. Cancelados.',
        "Gartner released a number that needs to be taken seriously: more than 40% of agentic-AI projects will be canceled by the end of 2027. These aren't garage startups — they're enterprise projects, with approved budgets, dedicated teams and board sign-off. Canceled.",
      ),
      h('O problema que ninguém está falando', 'The problem no one is talking about'),
      p(
        'A PwC publicou em janeiro que 56% dos CEOs globais não viram retorno financeiro com IA nos últimos 12 meses. O MIT foi mais direto: 95% dos pilotos de IA generativa entregam pouco ou nenhum impacto no resultado financeiro. A maioria das empresas está gastando em IA — não investindo. E há uma diferença enorme entre as duas coisas.',
        'PwC reported in January that 56% of global CEOs saw no financial return from AI in the last 12 months. MIT was more direct: 95% of generative-AI pilots deliver little or no impact on financial results. Most companies are spending on AI — not investing. And there’s a huge difference between the two.',
      ),
      p(
        'A Deloitte reforça o paradoxo: 66% das empresas reportam ganhos de produtividade com IA, mas só 20% efetivamente aumentaram receita. As pessoas trabalham mais rápido, mas a empresa não ganha mais dinheiro. Isso não é ROI. É eficiência sem direção.',
        "Deloitte reinforces the paradox: 66% of companies report productivity gains with AI, but only 20% actually increased revenue. People work faster, but the company doesn't make more money. That isn't ROI. It's efficiency without direction.",
      ),
      h('O que separa os 60% que funcionam', 'What sets apart the 60% that work'),
      p(
        'Não é o tamanho do orçamento. Não é a ferramenta escolhida. Não é o tamanho da empresa. É a sequência. Os projetos que entregam seguem uma ordem que parece óbvia mas quase ninguém cumpre: primeiro processos, depois pessoas, depois ferramentas. Nessa ordem, sem pular etapa. Os que fracassam fazem o caminho inverso: compram a ferramenta, jogam para o time e torcem para dar certo.',
        "It isn't the size of the budget. It isn't the chosen tool. It isn't the size of the company. It's the sequence. The projects that deliver follow an order that seems obvious but almost no one follows: processes first, then people, then tools. In that order, without skipping a step. Those that fail take the reverse path: buy the tool, hand it to the team and hope for the best.",
      ),
      h('Os cinco erros que destroem projetos de IA', 'The five mistakes that destroy AI projects'),
      p(
        '1. Automatizar processo quebrado — colocar IA sobre um atendimento confuso só automatiza a confusão mais rápido. 2. Comprar ferramenta antes de ter o problema definido — a Gartner chama de “agent washing”: de milhares de empresas vendendo soluções agênticas, só 130 a 150 oferecem capacidades reais; o resto é maquiagem. 3. Tratar IA como projeto de TI — sem preparar as pessoas, vem a resistência silenciosa. 4. Não definir como medir sucesso antes de começar — “a equipe está mais produtiva” não responde ao CFO. 5. Tentar transformar tudo de uma vez — comece por um processo, prove o ROI em 60 a 90 dias e só então escale.',
        '1. Automating a broken process — putting AI on top of a messy support flow just automates the mess faster. 2. Buying a tool before defining the problem — Gartner calls it “agent washing”: of the thousands of companies selling agentic solutions, only 130 to 150 offer real capabilities; the rest is makeup. 3. Treating AI as an IT project — without preparing people, you get silent resistance. 4. Not defining how to measure success before starting — “the team is more productive” doesn’t answer the CFO. 5. Trying to transform everything at once — start with one process, prove the ROI in 60 to 90 days, and only then scale.',
      ),
      q(
        'A causa não é a tecnologia. É a sequência.',
        "The cause isn't the technology. It's the sequence.",
      ),
    ],
  },
];

export const findInsight = (id: string): InsightItem | undefined =>
  INSIGHTS.find((i) => i.id === id);
