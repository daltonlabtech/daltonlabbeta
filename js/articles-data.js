/* ============================================================
   ARTICLES — Dalton Lab publications (the "Artigos" tab)
   Bilingual PT/EN. Consumed by insights.js (merged into POSTS).
   ============================================================ */
(function () {
  const t = (pt, en) => ({ pt, en });
  const h = (pt, en) => ({ t: "h", pt, en });
  const p = (pt, en) => ({ t: "p", pt, en });
  const q = (pt, en) => ({ t: "q", pt, en });

  const PAPER = "assets/papers/dalton-lab-framework-agentico.pdf";

  window.DL_ARTICLES = [
    /* ============================================================ */
    {
      id: "paradoxo-ia-marketing",
      kind: "article",
      cat: t("Marketing", "Marketing"),
      date: t("20 mai 2026", "May 20, 2026"),
      read: 6,
      art: "art-1",
      pdf: true,
      pdfUrl: PAPER,
      title: t(
        "O Paradoxo da IA no Marketing: a tecnologia está em todo lugar, menos nos resultados",
        "The AI Paradox in Marketing: the technology is everywhere except in the results"
      ),
      dek: t(
        "Adoção alta, impacto raro. O problema não é a ferramenta — é a sequência.",
        "High adoption, rare impact. The problem isn't the tool — it's the sequence."
      ),
      body: [
        p(
          "Existe um fenômeno que qualquer executivo honesto já reconhece, mesmo que poucos falem abertamente sobre ele: a tecnologia está em todo lugar, menos nos resultados financeiros. A McKinsey nomeou isso de “paradoxo da IA generativa”. Nós chamamos de consequência de pular etapas.",
          "There's a phenomenon any honest executive already recognizes, even if few talk about it openly: the technology is everywhere except in the financial results. McKinsey named it the “generative AI paradox.” We call it the consequence of skipping steps."
        ),
        p(
          "As equipes de marketing foram das primeiras a adotar IA generativa. Geração de copy, criação de imagens, produção de conteúdo em escala. As ferramentas ganharam tração, os times as usam com frequência, os relatórios internos celebram a adoção. E no final do trimestre, a receita não reflete nada do entusiasmo que havia nas demonstrações.",
          "Marketing teams were among the first to adopt generative AI. Copy generation, image creation, content production at scale. The tools gained traction, teams use them constantly, internal reports celebrate adoption. And at the end of the quarter, revenue reflects none of the enthusiasm there was in the demos."
        ),
        q("Mais atividade. Menos impacto.", "More activity. Less impact."),
        p(
          "Esse não é um problema de tecnologia. É um problema de sequência.",
          "This isn't a technology problem. It's a sequence problem."
        ),
        h("O que está acontecendo nas áreas de marketing", "What's happening inside marketing teams"),
        p(
          "Quando acompanhamos empresas que investiram em IA para marketing, vemos o mesmo padrão se repetindo. A ferramenta foi adotada. As pessoas foram treinadas em como usar a interface. E o processo ao redor da ferramenta permaneceu exatamente igual ao que era antes.",
          "When we follow companies that have invested in AI for marketing, we see the same pattern repeating. The tool was adopted. People were trained on how to use the interface. And the process around the tool stayed exactly as it was before."
        ),
        p(
          "O resultado é previsível: a IA passa a existir dentro de um fluxo de trabalho que não foi pensado para ela. Resolve tarefas pontuais. Gera mais volume de conteúdo, mais variações de anúncio, mais conceitos iniciais. Mas não conecta com o restante da operação. Não tem métricas que meçam seu impacto real. Não tem governança que garanta consistência entre o que os agentes produzem e o que a marca precisa comunicar.",
          "The result is predictable: AI comes to exist inside a workflow that wasn't designed for it. It solves isolated tasks. It generates more content volume, more ad variations, more initial concepts. But it doesn't connect to the rest of the operation. It has no metrics measuring its real impact. It has no governance ensuring consistency between what the agents produce and what the brand needs to communicate."
        ),
        q(
          "Tecnologia sobre processo desorganizado produz processo desorganizado mais rápido. Sempre.",
          "Technology on top of a disorganized process produces a disorganized process — faster. Always."
        ),
        h("O que muda de verdade com a IA agêntica", "What actually changes with agentic AI"),
        p(
          "O potencial da IA agêntica no marketing é real e substancial. Estudos recentes estimam que até dois terços das atividades atuais de marketing podem ser impulsionadas por agentes, com aceleração de 10 a 15 vezes na criação e execução de campanhas e crescimento de receita entre 10% e 30% com personalização em escala.",
          "The potential of agentic AI in marketing is real and substantial. Recent studies estimate that up to two-thirds of current marketing activities can be powered by agents, with 10–15x acceleration in campaign creation and execution and revenue growth between 10% and 30% through personalization at scale."
        ),
        p(
          "Esses números não são ficção científica. Mas eles descrevem o destino de quem fizer o trabalho correto antes de instalar qualquer agente.",
          "These numbers aren't science fiction. But they describe the destination of those who do the right work before installing any agent."
        ),
        p(
          "A diferença entre IA generativa e IA agêntica não é apenas técnica. É estrutural. IA generativa responde a prompts: produz um output, depende de alguém para iniciar, revisar e aplicar o resultado. Quando a pessoa sai da sala, a IA fica parada. IA agêntica opera de forma contínua: monitora performance de campanhas em tempo real, identifica quedas, ajusta orçamento, testa variações de audiência — tudo dentro de parâmetros definidos e com supervisão humana no nível estratégico.",
          "The difference between generative AI and agentic AI isn't just technical. It's structural. Generative AI responds to prompts: it produces an output and depends on someone to start, review and apply the result. When the person leaves the room, the AI stops. Agentic AI operates continuously: it monitors campaign performance in real time, spots drops, adjusts budget, tests audience variations — all within defined parameters and with human supervision at the strategic level."
        ),
        p(
          "O trabalho operacional fica com os agentes. O trabalho humano sobe para onde realmente importa: estratégia, criatividade, decisão. Mas para chegar lá, os processos precisam ter sido redesenhados antes. Não depois.",
          "Operational work stays with the agents. Human work rises to where it truly matters: strategy, creativity, decision. But to get there, processes must have been redesigned first. Not afterward."
        ),
        h(
          "O CMO do futuro não é um guardião de marca. É um orquestrador.",
          "The CMO of the future isn't a brand guardian. They're an orchestrator."
        ),
        p(
          "O papel do líder de marketing está mudando de forma estrutural. Não se trata mais de aprovar peças e garantir alinhamento de marca em cada entrega. Trata-se de orquestrar dados, tecnologia e execução habilitada por IA, com humanos acima do processo supervisionando resultados, não executando tarefas.",
          "The marketing leader's role is changing structurally. It's no longer about approving assets and ensuring brand alignment on every deliverable. It's about orchestrating data, technology and AI-enabled execution — with humans above the process supervising results, not executing tasks."
        ),
        p(
          "Esse novo papel exige entender como agentes de IA operam, onde precisam de supervisão humana, como integrar dados de múltiplas fontes em fluxos automatizados e como medir resultado em uma operação onde parte significativa da execução acontece sem intervenção humana direta. Não é um perfil técnico. É liderança com fluência tecnológica. E essa fluência não se constrói comprando mais plataformas. Constrói-se redesenhando como a área opera.",
          "This new role requires understanding how AI agents operate, where they need human supervision, how to integrate data from multiple sources into automated flows, and how to measure results in an operation where a significant share of execution happens without direct human intervention. It isn't a technical profile. It's leadership with technological fluency. And that fluency isn't built by buying more platforms. It's built by redesigning how the function operates."
        ),
        h("O que o Dalton Lab resolve", "What Dalton Lab solves"),
        p(
          "O gap entre o potencial que os dados mostram e o resultado que a maioria das empresas colhe não é inevitável. É o sintoma de uma escolha: adotar tecnologia sem método.",
          "The gap between the potential the data shows and the result most companies harvest isn't inevitable. It's the symptom of a choice: adopting technology without method."
        ),
        p(
          "É exatamente esse gap que existimos para fechar. Não vendemos agentes de IA. Vendemos transformação real: o trabalho de identificar o processo certo, redesenhá-lo antes de automatizá-lo, preparar as pessoas para o novo modelo de trabalho e só então introduzir os agentes para executar o que foi desenhado para funcionar.",
          "That gap is exactly what we exist to close. We don't sell AI agents. We sell real transformation: the work of identifying the right process, redesigning it before automating it, preparing people for the new way of working, and only then introducing the agents to execute what was designed to work."
        ),
        p(
          "A sequência é inegociável: processos primeiro, pessoas em segundo, ferramentas em terceiro. Empresas que invertem essa ordem automatizam o problema. Empresas que a respeitam transformam a operação. O potencial existe. A questão não é se sua empresa vai chegar lá. É com qual método.",
          "The sequence is non-negotiable: processes first, people second, tools third. Companies that invert this order automate the problem. Companies that respect it transform the operation. The potential exists. The question isn't whether your company will get there. It's with which method."
        ),
      ],
    },

    /* ============================================================ */
    {
      id: "individuos-produtivos",
      kind: "article",
      cat: t("Produtividade", "Productivity"),
      date: t("13 mai 2026", "May 13, 2026"),
      read: 7,
      art: "art-2",
      pdf: true,
      pdfUrl: PAPER,
      title: t(
        "Indivíduos produtivos não fazem empresas produtivas",
        "Productive individuals don't make productive companies"
      ),
      dek: t(
        "O problema que nenhuma ferramenta de IA resolve sozinha — e a lição que a eletricidade já nos ensinou.",
        "The problem no AI tool solves on its own — and the lesson electricity already taught us."
      ),
      body: [
        p(
          "A inteligência artificial multiplicou a produtividade de quem sabe usá-la. Isso não é promessa: é fato documentado. Analistas que levavam horas para consolidar dados fazem isso em minutos. Redatores produzem em um dia o que antes levava uma semana. Desenvolvedores entregam código em velocidade que seria impossível há três anos.",
          "Artificial intelligence has multiplied the productivity of those who know how to use it. That's not a promise: it's a documented fact. Analysts who took hours to consolidate data now do it in minutes. Writers produce in a day what used to take a week. Developers ship code at a speed that would have been impossible three years ago."
        ),
        p(
          "E ainda assim, os resultados financeiros das empresas não refletem essa multiplicação. Pesquisas globais com milhares de executivos mostram que menos de 40% conseguem atribuir qualquer impacto no resultado operacional ao uso de IA. Pesquisadores do MIT identificaram que 95% das organizações não estão obtendo retorno mensurável dos investimentos em IA generativa. Adoção alta. Transformação rara.",
          "And yet, companies' financial results don't reflect that multiplication. Global surveys of thousands of executives show fewer than 40% can attribute any operating-result impact to their use of AI. MIT researchers found that 95% of organizations are getting no measurable return on generative-AI investments. High adoption. Rare transformation."
        ),
        p(
          "Onde foi a produtividade? Essa é a pergunta que a maioria dos executivos ainda não parou para fazer de verdade. Porque a resposta é desconfortável: produtividade individual não é o mesmo que produtividade organizacional. Uma empresa cheia de indivíduos mais produtivos não se torna automaticamente uma empresa mais produtiva. Ela se torna uma empresa com mais ruído, mais velocidade e a mesma estrutura de antes.",
          "Where did the productivity go? That's the question most executives haven't truly stopped to ask. Because the answer is uncomfortable: individual productivity isn't the same as organizational productivity. A company full of more productive individuals doesn't automatically become a more productive company. It becomes a company with more noise, more speed, and the same structure as before."
        ),
        q(
          "O problema não está na ferramenta. Está no que não foi feito antes de instalá-la.",
          "The problem isn't in the tool. It's in what wasn't done before installing it."
        ),
        h("A fábrica que trocou o motor — e esperou trinta anos", "The factory that swapped the motor — and waited thirty years"),
        p(
          "Em 1890, as fábricas têxteis de New England substituíram as máquinas a vapor por motores elétricos. Era a tecnologia mais avançada da época. E por trinta anos, quase nada mudou em termos de produção.",
          "In 1890, New England's textile mills replaced steam engines with electric motors. It was the most advanced technology of the time. And for thirty years, almost nothing changed in terms of output."
        ),
        p(
          "Não foi um problema de tecnologia. A eletricidade funcionava. O problema era que ninguém havia redesenhado a fábrica. Os motores elétricos foram instalados exatamente onde as máquinas a vapor estavam. O layout era o mesmo. Os fluxos de trabalho eram os mesmos. As pessoas faziam as mesmas coisas, só que com um motor diferente.",
          "It wasn't a technology problem. Electricity worked. The problem was that no one had redesigned the factory. The electric motors were installed exactly where the steam engines had been. The layout was the same. The workflows were the same. People did the same things — just with a different motor."
        ),
        p(
          "Foi apenas nos anos 1920, quando as fábricas foram inteiramente reimaginadas — com linhas de montagem, motores individuais em cada equipamento e papéis completamente redesenhados para humanos e máquinas — que a eletricidade entregou o retorno que prometia. Trocaram o motor durante trinta anos antes de redesenhar a fábrica. E perderam trinta anos de vantagem competitiva por isso.",
          "It was only in the 1920s, when factories were entirely reimagined — with assembly lines, individual motors on each piece of equipment, and roles completely redesigned for humans and machines — that electricity delivered the return it promised. They swapped the motor for thirty years before redesigning the factory. And they lost thirty years of competitive advantage because of it."
        ),
        p(
          "Em 2026, estamos no mesmo ponto. Trocamos o motor. Ainda não redesenhamos a fábrica.",
          "In 2026, we're at the same point. We swapped the motor. We haven't redesigned the factory yet."
        ),
        h("O que acontece quando cada pessoa tem seu próprio ChatGPT", "What happens when everyone has their own ChatGPT"),
        p(
          "Imagine que amanhã você dobrasse o número de funcionários da sua empresa com clones dos seus melhores colaboradores. Cada um altamente capaz, motivado e produtivo. Mas sem coordenação, sem papéis claramente definidos, sem processos que integrem o trabalho de um com o trabalho do outro. O que você criaria não seria uma empresa duas vezes mais eficiente. Seria caos.",
          "Imagine that tomorrow you doubled your company's headcount with clones of your best people. Each one highly capable, motivated and productive. But with no coordination, no clearly defined roles, no processes integrating one person's work with another's. What you'd create wouldn't be a company twice as efficient. It would be chaos."
        ),
        p(
          "Isso não é hipotético. É o que está acontecendo agora em praticamente toda organização que adotou IA sem redesenhar o modelo operacional. Cada funcionário tem seus próprios hábitos de uso, seus próprios estilos de interação, seus próprios outputs que não se conectam com os de ninguém. A empresa adotou IA. Mas a empresa, como sistema, não mudou nada.",
          "This isn't hypothetical. It's what's happening right now in practically every organization that adopted AI without redesigning its operating model. Every employee has their own usage habits, their own interaction styles, their own outputs that don't connect with anyone else's. The company adopted AI. But the company, as a system, changed nothing."
        ),
        p(
          "Ferramentas amplificam o que já existe. Se o que existe é coordenação, elas amplificam coordenação. Se o que existe é fragmentação, elas amplificam fragmentação. A tecnologia não tem opinião sobre o processo em que está sendo inserida. Quem precisa ter opinião é a organização.",
          "Tools amplify what already exists. If what exists is coordination, they amplify coordination. If what exists is fragmentation, they amplify fragmentation. Technology has no opinion about the process it's being inserted into. The one that needs an opinion is the organization."
        ),
        h("IA individual e IA organizacional", "Individual AI and organizational AI"),
        p(
          "IA Individual é qualquer uso de inteligência artificial que aumenta a produtividade de uma pessoa específica. ChatGPT para redigir e-mails mais rápido. Assistentes que ajudam a organizar a agenda. Esse uso é real, tem valor e foi o ponto de entrada da IA generativa nas empresas. Mas ele não transforma o modelo operacional. Quando a pessoa que usa a ferramenta sai da empresa, o ganho vai embora com ela.",
          "Individual AI is any use of artificial intelligence that increases the productivity of a specific person. ChatGPT to write emails faster. Assistants that help organize the calendar. This use is real, has value, and was generative AI's entry point into companies. But it doesn't transform the operating model. When the person using the tool leaves, the gain leaves with them."
        ),
        p(
          "IA Organizacional é quando agentes de IA operam como membros permanentes da estrutura, com responsabilidades definidas, métricas de performance, integração real com processos e sistemas, e supervisão humana contínua. O conhecimento não está na pessoa. Está no sistema. A consistência não depende de quem está sentado na cadeira em determinado dia. A distância entre esses dois modelos não é técnica. É metodológica.",
          "Organizational AI is when AI agents operate as permanent members of the structure, with defined responsibilities, performance metrics, real integration with processes and systems, and continuous human supervision. The knowledge isn't in the person. It's in the system. Consistency doesn't depend on who's sitting in the chair on a given day. The distance between these two models isn't technical. It's methodological."
        ),
        h("A pergunta certa para um CEO em 2026", "The right question for a CEO in 2026"),
        p(
          "Não é “qual ferramenta de IA devo comprar?”. É “minha empresa está preparada para operar com agentes de IA como membros permanentes da equipe, com responsabilidades definidas, processos redesenhados e pessoas preparadas para o novo modelo de trabalho?”.",
          "It isn't “which AI tool should I buy?” It's “is my company ready to operate with AI agents as permanent team members, with defined responsibilities, redesigned processes, and people prepared for the new way of working?”"
        ),
        p(
          "Se a resposta for não, a ferramenta vai esperar. A vantagem competitiva que a transformação agêntica entrega não vem do software. Vem do redesenho. E o redesenho começa muito antes da tecnologia. Essa janela está aberta agora.",
          "If the answer is no, the tool can wait. The competitive advantage that agentic transformation delivers doesn't come from software. It comes from the redesign. And the redesign starts long before the technology. That window is open now."
        ),
      ],
    },

    /* ============================================================ */
    {
      id: "iniciativas-ia-retorno",
      kind: "article",
      cat: t("Estratégia", "Strategy"),
      date: t("29 abr 2026", "Apr 29, 2026"),
      read: 7,
      art: "art-3",
      pdf: true,
      pdfUrl: PAPER,
      title: t(
        "Por que a maioria das iniciativas de IA não gera retorno",
        "Why most AI initiatives don't generate returns"
      ),
      dek: t(
        "Bilhões investidos, ROI nas apresentações mas não no balanço. A causa raiz tem um nome: plug and play.",
        "Billions invested, ROI in the slides but not on the books. The root cause has a name: plug and play."
      ),
      body: [
        p(
          "Bilhões de dólares foram investidos em inteligência artificial por empresas em todo o mundo nos últimos três anos. Os resultados, na maior parte dos casos, ficaram aquém do prometido. Pilotos que não escalaram. Ferramentas adotadas por alguns, ignoradas pela maioria. Dashboards de IA que ninguém consulta. ROI que aparece nas apresentações mas não aparece no balanço.",
          "Billions of dollars have been invested in artificial intelligence by companies worldwide over the last three years. The results, in most cases, fell short of what was promised. Pilots that didn't scale. Tools adopted by a few, ignored by most. AI dashboards no one consults. ROI that shows up in presentations but not on the books."
        ),
        p(
          "O problema raramente está na tecnologia. Está na sequência. A causa raiz do fracasso na maioria das iniciativas de IA tem um nome: a abordagem plug and play. A crença de que comprar a ferramenta certa é suficiente para gerar transformação. Não é. Nunca foi.",
          "The problem is rarely in the technology. It's in the sequence. The root cause of failure in most AI initiatives has a name: the plug-and-play approach. The belief that buying the right tool is enough to generate transformation. It isn't. It never was."
        ),
        h("O mito da bala de prata tecnológica", "The myth of the technological silver bullet"),
        p(
          "O mercado de IA é extraordinariamente bom em criar expectativas. Demonstrações impressionantes. Casos de uso cuidadosamente selecionados. Promessas de automação total, eficiência radical, retorno em semanas. E executivos, sob pressão de conselhos e acionistas para “fazer algo com IA”, compram essas promessas.",
          "The AI market is extraordinarily good at creating expectations. Impressive demos. Carefully selected use cases. Promises of total automation, radical efficiency, returns in weeks. And executives, under pressure from boards and shareholders to “do something with AI,” buy those promises."
        ),
        p(
          "O que ninguém conta na reunião de venda é que a tecnologia, por si só, não resolve problema de negócio. Ela amplifica o que já existe. E se o que existe são processos desorganizados, papéis mal definidos e uma cultura que não foi preparada para trabalhar ao lado de agentes de IA, a tecnologia vai amplificar exatamente isso — com mais velocidade e mais custo.",
          "What no one tells you in the sales meeting is that technology, on its own, doesn't solve a business problem. It amplifies what already exists. And if what exists is disorganized processes, poorly defined roles, and a culture that wasn't prepared to work alongside AI agents, the technology will amplify exactly that — faster and at greater cost."
        ),
        h("Três padrões de falha que se repetem", "Three failure patterns that keep repeating"),
        p(
          "O primeiro: foco em substituição, não em amplificação. Quando a lógica da implementação é “onde posso cortar gente com isso?”, a empresa está construindo sobre a fundação errada. Times que percebem que a IA está sendo usada contra eles não vão colaborar com a adoção. O resultado é uma implementação tecnicamente funcional e operacionalmente inerte.",
          "The first: a focus on substitution, not amplification. When the implementation logic is “where can I cut headcount with this?”, the company is building on the wrong foundation. Teams that sense AI is being used against them won't cooperate with adoption. The result is an implementation that's technically functional and operationally inert."
        ),
        p(
          "O segundo: processos quebrados acelerados. Automatizar um processo ruim não o melhora. Torna-o mais rápido e mais consistentemente ruim. Empresas que pulam a etapa de redesenho e vão direto para a implementação de agentes descobrem, alguns meses depois, que escalaram os próprios gargalos.",
          "The second: broken processes, accelerated. Automating a bad process doesn't improve it. It makes it faster and more consistently bad. Companies that skip the redesign step and go straight to deploying agents discover, a few months later, that they've scaled their own bottlenecks."
        ),
        p(
          "O terceiro: ausência de redesenho operacional. Organizações agênticas de verdade não são empresas que compraram agentes de IA e os encaixaram na estrutura existente. São empresas que redesenharam sua estrutura operacional para funcionar com agentes de IA como parte permanente do time.",
          "The third: the absence of operational redesign. True agentic organizations aren't companies that bought AI agents and slotted them into the existing structure. They're companies that redesigned their operating structure to work with AI agents as a permanent part of the team."
        ),
        h("Por que a sequência importa mais do que a ferramenta", "Why the sequence matters more than the tool"),
        p(
          "Existe uma sequência que funciona. Ela é contraintuitiva porque vai contra o caminho de menor resistência — que é sempre começar pela tecnologia, porque ela é tangível, tem fornecedor, tem contrato, tem data de entrega. Processo e pessoas são difíceis. Levam mais tempo. Exigem conversas incômodas. Por isso são pulados. E por isso a maioria falha.",
          "There's a sequence that works. It's counterintuitive because it runs against the path of least resistance — which is always to start with the technology, because it's tangible, has a vendor, a contract, a delivery date. Process and people are hard. They take longer. They require uncomfortable conversations. That's why they get skipped. And that's why most fail."
        ),
        p(
          "Processos primeiro. Antes de qualquer agente de IA entrar em operação, é preciso mapear com precisão o que está sendo feito hoje — não em nível macro, mas em nível de detalhe operacional. Onde estão os gargalos reais? Onde o trabalho manual consome tempo de pessoas qualificadas em tarefas de baixo julgamento? Esse diagnóstico é o mapa que define onde os agentes vão atuar, com qual escopo e com qual critério de sucesso.",
          "Processes first. Before any AI agent goes live, you need to map precisely what's being done today — not at a macro level, but in operational detail. Where are the real bottlenecks? Where does manual work consume the time of qualified people on low-judgment tasks? This diagnosis is the map that defines where the agents will operate, with what scope, and with what success criteria."
        ),
        p(
          "Pessoas em segundo. A transformação agêntica redistribui o trabalho. O que os agentes assumem, as pessoas deixam de fazer. O que as pessoas passam a fazer exige novas competências — supervisão de agentes, interpretação de outputs, tomada de decisão com mais informação e menos execução. Essa transição precisa ser desenhada, comunicada e suportada.",
          "People second. Agentic transformation redistributes work. What the agents take on, people stop doing. What people start doing requires new skills — supervising agents, interpreting outputs, making decisions with more information and less execution. This transition must be designed, communicated and supported."
        ),
        p(
          "Ferramentas em terceiro. Com processos mapeados e papéis redesenhados, a escolha da tecnologia se torna uma decisão técnica objetiva — não uma aposta estratégica com variáveis desconhecidas. A ferramenta entra para executar um design já validado. E é assim que agentes de IA geram retorno mensurável: não porque são sofisticados, mas porque estão operando em um contexto onde foram desenhados para funcionar.",
          "Tools third. With processes mapped and roles redesigned, the technology choice becomes an objective technical decision — not a strategic bet with unknown variables. The tool comes in to execute an already-validated design. And that's how AI agents generate measurable returns: not because they're sophisticated, but because they're operating in a context where they were designed to work."
        ),
        q(
          "Quem inverte essa sequência automatiza o problema. Quem a respeita transforma a organização.",
          "Those who invert the sequence automate the problem. Those who respect it transform the organization."
        ),
        p(
          "A pergunta relevante para qualquer executivo que avalia uma iniciativa de IA hoje não é “qual a melhor ferramenta do mercado?”. É “temos clareza sobre o processo que queremos transformar, os papéis que vão mudar e os critérios que vão definir sucesso?”. Se a resposta for não, a ferramenta vai esperar. O trabalho ainda não foi feito.",
          "The relevant question for any executive evaluating an AI initiative today isn't “what's the best tool on the market?” It's “do we have clarity on the process we want to transform, the roles that will change, and the criteria that will define success?” If the answer is no, the tool can wait. The work hasn't been done yet."
        ),
      ],
    },

    /* ============================================================ */
    {
      id: "roteiro-ceo",
      kind: "article",
      cat: t("Liderança", "Leadership"),
      date: t("6 mai 2026", "May 6, 2026"),
      read: 6,
      art: "art-4",
      pdf: true,
      pdfUrl: PAPER,
      title: t(
        "Da intenção à execução: o roteiro do CEO para a transformação agêntica",
        "From intention to execution: the CEO's roadmap for agentic transformation"
      ),
      dek: t(
        "“Por onde começo?” é a pergunta mais importante — porque o ponto de entrada define a trajetória.",
        "“Where do I begin?” is the most important question — because the entry point defines the trajectory."
      ),
      body: [
        p(
          "“Por onde começo?” é a pergunta que mais escutamos de CEOs quando entendem o que é uma organização agêntica e decidem que querem construir uma. É também a pergunta mais importante — porque o ponto de entrada define a trajetória.",
          "“Where do I begin?” is the question we hear most from CEOs once they understand what an agentic organization is and decide they want to build one. It's also the most important question — because the entry point defines the trajectory."
        ),
        p(
          "Empresas que começam pelo lugar errado acumulam projetos-piloto sem conexão, criam resistência interna e chegam a um ano de esforço sem resultado concreto. Empresas que começam com método e sequência correta constroem, nos primeiros 90 dias, a fundação que vai sustentar uma vantagem competitiva durável. Este é o roteiro.",
          "Companies that start in the wrong place accumulate disconnected pilots, create internal resistance, and reach a year of effort with no concrete result. Companies that start with method and the right sequence build, in the first 90 days, the foundation that will sustain a durable competitive advantage. This is the roadmap."
        ),
        h("Antes de qualquer ferramenta: o diagnóstico que define tudo", "Before any tool: the diagnosis that defines everything"),
        p(
          "O erro mais caro que um CEO pode cometer ao iniciar a transformação agêntica é começar pela tecnologia. Não porque a tecnologia seja ruim — mas porque, sem diagnóstico, a melhor tecnologia do mercado vai operar no escopo errado, no processo errado, com as expectativas erradas.",
          "The most expensive mistake a CEO can make when starting agentic transformation is to begin with the technology. Not because the technology is bad — but because, without a diagnosis, the best technology on the market will operate in the wrong scope, on the wrong process, with the wrong expectations."
        ),
        p(
          "O ponto de partida correto é um diagnóstico estruturado: uma análise precisa de onde a empresa está hoje — quais processos existem, como funcionam, onde estão os gargalos reais e onde agentes de IA têm potencial de gerar impacto mensurável. Ele produz algo que nenhuma demonstração de plataforma consegue produzir: clareza sobre o que, especificamente, vai mudar na sua empresa.",
          "The correct starting point is a structured diagnosis: a precise analysis of where the company is today — which processes exist, how they work, where the real bottlenecks are, and where AI agents have the potential to generate measurable impact. It produces something no platform demo can produce: clarity about what, specifically, will change in your company."
        ),
        h("Passo 1 — Escolha o domínio certo para começar", "Step 1 — Choose the right domain to start"),
        p(
          "A transformação agêntica não começa em toda a empresa ao mesmo tempo. Começa em um domínio — uma área, um processo, um fluxo de trabalho específico — onde o impacto pode ser medido com clareza e onde a aprendizagem vai informar o que vem depois. A escolha depende de três critérios simultâneos.",
          "Agentic transformation doesn't start across the whole company at once. It starts in a domain — an area, a process, a specific workflow — where impact can be measured clearly and where the learning will inform what comes next. The choice depends on three simultaneous criteria."
        ),
        p(
          "Volume e repetibilidade: processos com alto volume de atividades repetitivas e padrão definido permitem medir resultado com objetividade. Custo visível do status quo: onde a empresa paga mais caro por não ter esse processo automatizado? Viabilidade política e cultural: começar em uma área cuja liderança está comprometida acelera a adoção nas ondas seguintes.",
          "Volume and repeatability: processes with high volumes of repetitive activity and a defined pattern allow results to be measured objectively. Visible cost of the status quo: where is the company paying more for not having this process automated? Political and cultural viability: starting in an area whose leadership is committed accelerates adoption in the waves that follow."
        ),
        h("Passo 2 — Redesenhe o processo antes de automatizá-lo", "Step 2 — Redesign the process before automating it"),
        p(
          "Esse é o passo que a maioria pula — e o que mais frequentemente explica por que as implementações não chegam onde deveriam. Antes de configurar qualquer agente, o processo escolhido precisa ser redesenhado. Não apenas mapeado: redesenhado. Porque automatizar um processo com gargalos é escalar os gargalos.",
          "This is the step most people skip — and the one that most often explains why implementations don't get where they should. Before configuring any agent, the chosen process must be redesigned. Not just mapped: redesigned. Because automating a process with bottlenecks is scaling the bottlenecks."
        ),
        p(
          "O redesenho define o que o agente vai fazer, dentro de quais parâmetros, com qual nível de autonomia e com qual critério de escalada para o humano. Define também o que os humanos continuam fazendo e como o papel deles muda na nova estrutura.",
          "The redesign defines what the agent will do, within which parameters, with what level of autonomy, and with what criteria for escalating to a human. It also defines what humans keep doing and how their role changes in the new structure."
        ),
        h("Passo 3 — Defina a governança antes de ligar os agentes", "Step 3 — Define governance before turning the agents on"),
        p(
          "Governança não é uma etapa posterior. É uma condição inicial. A autonomia de um agente de IA nunca é absoluta: é sempre delegada, limitada e controlada por humanos. Humanos são responsáveis pelos outputs dos agentes que supervisionam. Essa responsabilidade precisa estar atribuída, não assumida.",
          "Governance isn't a later step. It's an initial condition. An AI agent's autonomy is never absolute: it's always delegated, limited and controlled by humans. Humans are accountable for the outputs of the agents they supervise. That accountability must be assigned, not assumed."
        ),
        h("O papel do CEO nessa jornada", "The CEO's role in this journey"),
        p(
          "A transformação agêntica não pode ser delegada inteiramente para a área de tecnologia. Não porque o CIO não seja capaz — mas porque a transformação agêntica não é um projeto de TI. É uma mudança de modelo operacional. E mudanças de modelo operacional vivem ou morrem pela prioridade que a alta liderança coloca nelas.",
          "Agentic transformation can't be delegated entirely to the technology function. Not because the CIO isn't capable — but because agentic transformation isn't an IT project. It's a change of operating model. And changes of operating model live or die by the priority senior leadership places on them."
        ),
        p(
          "O CEO precisa estar na agenda desse programa — não na operação do dia a dia, mas na definição da visão, no acompanhamento dos resultados e na remoção dos obstáculos organizacionais que sempre aparecem quando algo muda de verdade. A transformação que vive apenas no CIO tende a ficar dentro da área de tecnologia. A que vive no CEO tende a atravessar a empresa.",
          "The CEO needs to be on this program's agenda — not in day-to-day operations, but in defining the vision, tracking the results, and removing the organizational obstacles that always appear when something truly changes. Transformation that lives only in the CIO tends to stay inside the technology function. The one that lives in the CEO tends to cross the whole company."
        ),
        q(
          "Empresas que começam assim chegam. Empresas que pulam essa etapa acumulam pilotos. A diferença está em como se começa.",
          "Companies that start this way arrive. Companies that skip this step accumulate pilots. The difference is in how you begin."
        ),
      ],
    },

    /* ============================================================ */
    {
      id: "organizacao-agentica-ruptura",
      kind: "article",
      cat: t("Tese", "Thesis"),
      date: t("22 abr 2026", "Apr 22, 2026"),
      read: 8,
      art: "art-1",
      pdf: true,
      pdfUrl: PAPER,
      title: t(
        "Organização Agêntica: a ruptura estrutural que define a próxima era da produtividade",
        "The Agentic Organization: the structural rupture defining the next era of productivity"
      ),
      dek: t(
        "Não é sobre velocidade. É sobre amplificação — e a sequência que não pode ser invertida.",
        "It's not about speed. It's about amplification — and the sequence that can't be inverted."
      ),
      body: [
        p(
          "A inteligência artificial já passou da fase em que precisava provar seu valor. O que está em disputa agora não é se ela vai transformar as empresas, mas quem vai liderar essa transformação e quem vai ser transformado por ela.",
          "Artificial intelligence is past the phase where it had to prove its value. What's at stake now isn't whether it will transform companies, but who will lead that transformation and who will be transformed by it."
        ),
        p(
          "Estamos diante da maior mudança de paradigma organizacional desde a revolução digital. E, como toda ruptura estrutural, ela não avisa com antecedência: ela simplesmente separa, com clareza brutal, as empresas que entenderam o que está acontecendo das que continuaram otimizando o modelo anterior. O conceito que define essa separação tem nome: organização agêntica.",
          "We're facing the largest organizational paradigm shift since the digital revolution. And, like every structural rupture, it gives no advance notice: it simply separates, with brutal clarity, the companies that understood what's happening from those that kept optimizing the previous model. The concept defining that separation has a name: the agentic organization."
        ),
        h("O fim da era da eficiência. O início da era da amplificação.", "The end of the efficiency era. The start of the amplification era."),
        p(
          "Durante décadas, a promessa central da tecnologia nas empresas foi eficiência. Fazer mais com menos. Essa promessa gerou valor real — mas chegou ao seu limite. Empresas que buscam apenas eficiência com IA estão repetindo o mesmo erro em escala maior: tentam fazer as mesmas coisas mais rápido, quando a vantagem competitiva real está em fazer coisas que antes eram impossíveis.",
          "For decades, the central promise of technology in companies was efficiency. Doing more with less. That promise created real value — but it reached its limit. Companies that pursue only efficiency with AI are repeating the same mistake at a larger scale: they try to do the same things faster, when the real competitive advantage lies in doing things that were previously impossible."
        ),
        q("A era agêntica não é sobre velocidade. É sobre amplificação.", "The agentic era isn't about speed. It's about amplification."),
        p(
          "Em uma organização agêntica, agentes de IA operam como membros permanentes da equipe — com responsabilidades definidas, métricas de performance e supervisão humana contínua. Eles assumem o trabalho operacional e repetitivo. Os humanos, liberados dessa camada de execução, passam a se concentrar no que a tecnologia não consegue fazer: construir relacionamentos, inovar, navegar ambiguidade, tomar decisões com implicações que vão além dos dados disponíveis.",
          "In an agentic organization, AI agents operate as permanent team members — with defined responsibilities, performance metrics and continuous human supervision. They take on the operational, repetitive work. Humans, freed from that execution layer, focus on what technology can't do: building relationships, innovating, navigating ambiguity, making decisions with implications that go beyond the available data."
        ),
        p(
          "O resultado não é uma empresa menor. É uma empresa radicalmente mais capaz com a mesma estrutura — ou capaz de crescer sem crescer proporcionalmente em custo. Organizações que já operam nesse modelo reportam multiplicações de produtividade de até 20 vezes em processos específicos. Não por terem contratado mais pessoas. Por terem redesenhado como humanos e agentes trabalham juntos.",
          "The result isn't a smaller company. It's a radically more capable company with the same structure — or one able to grow without growing proportionally in cost. Organizations already operating in this model report productivity multiples of up to 20x on specific processes. Not because they hired more people. Because they redesigned how humans and agents work together."
        ),
        h("Três equívocos que custam caro", "Three misconceptions that cost dearly"),
        p(
          "O primeiro: uso individual de IA é transformação. Uso individual é produtividade pessoal. Organização agêntica é um redesenho do modelo operacional. A diferença é a mesma entre dar a cada funcionário uma calculadora melhor e redesenhar como a empresa toma decisões financeiras.",
          "The first: individual AI use is transformation. Individual use is personal productivity. An agentic organization is a redesign of the operating model. The difference is the same as between giving each employee a better calculator and redesigning how the company makes financial decisions."
        ),
        p(
          "O segundo: a transformação agêntica é um projeto de TI. Não é. A transformação começa nos processos, passa pelas pessoas e só então chega nas ferramentas — nessa sequência, e não em outra. O terceiro: o objetivo é reduzir headcount. A tese da organização agêntica é amplificação, não substituição. O trabalho humano não desaparece — ele sobe na cadeia de valor.",
          "The second: agentic transformation is an IT project. It isn't. Transformation starts with processes, moves through people, and only then reaches tools — in that sequence, and no other. The third: the goal is to cut headcount. The agentic-organization thesis is amplification, not substitution. Human work doesn't disappear — it rises up the value chain."
        ),
        h("A arquitetura de uma organização agêntica", "The architecture of an agentic organization"),
        p(
          "Organizações agênticas operam em camadas. A Camada Humana — supervisão e decisão estratégica — está no topo e nunca é substituída: é o centro de gravidade do modelo. Abaixo, a Camada de Interação: briefings, aprovações, revisões, correções de rota, onde a supervisão se torna operacional. Em seguida, a Camada de Agentes: execução operacional dentro dos parâmetros definidos. Na base, a Camada de Sistemas: CRM, ERP, APIs, integrações — o substrato técnico sobre o qual os agentes operam.",
          "Agentic organizations operate in layers. The Human Layer — supervision and strategic decision — sits at the top and is never replaced: it's the model's center of gravity. Below it, the Interaction Layer: briefings, approvals, reviews, course corrections, where supervision becomes operational. Next, the Agent Layer: operational execution within defined parameters. At the base, the Systems Layer: CRM, ERP, APIs, integrations — the technical substrate the agents operate on."
        ),
        p(
          "A Camada Humana está sempre acima da Camada de Agentes. Não é uma questão de preferência ou filosofia — é uma questão de governança. Organizações que invertem essa lógica criam sistemas que operam sem accountability e riscos que não conseguem gerenciar.",
          "The Human Layer is always above the Agent Layer. It isn't a matter of preference or philosophy — it's a matter of governance. Organizations that invert this logic create systems that operate without accountability and risks they can't manage."
        ),
        h("O tripé da transformação: a sequência que não pode ser invertida", "The transformation tripod: the sequence that can't be inverted"),
        p(
          "Processos primeiro: nenhum agente, por mais sofisticado que seja, performa bem em um processo mal definido. Pessoas em segundo: a transformação muda o que as pessoas fazem, e ignorar essa dimensão é a causa mais comum de resistência. Ferramentas em terceiro: com processos mapeados e pessoas preparadas, a configuração dos agentes se torna direta.",
          "Processes first: no agent, however sophisticated, performs well on a poorly defined process. People second: the transformation changes what people do, and ignoring that dimension is the most common cause of resistance. Tools third: with processes mapped and people prepared, configuring the agents becomes straightforward."
        ),
        p(
          "Essa sequência parece simples. Mas vai contra o instinto de boa parte dos executivos, que querem começar pela tecnologia porque ela é tangível. O problema é que tecnologia sobre processo ruim produz processo ruim mais rápido. E mais caro.",
          "This sequence seems simple. But it runs against the instinct of many executives, who want to start with the technology because it's tangible. The problem is that technology on top of a bad process produces a bad process — faster. And more expensively."
        ),
        h("Por que agir agora", "Why act now"),
        p(
          "A janela de vantagem competitiva em qualquer ruptura estrutural não fica aberta para sempre. A pergunta para o CEO não é se essa transformação vai acontecer — ela já está acontecendo. A pergunta é quando sua empresa vai liderá-la, e com que grau de deliberação versus reação. A próxima era da produtividade não vai ser construída por quem tem a melhor ferramenta. Vai ser construída por quem souber redesenhar como humanos e agentes de IA trabalham juntos.",
          "The window of competitive advantage in any structural rupture doesn't stay open forever. The question for the CEO isn't whether this transformation will happen — it's already happening. The question is when your company will lead it, and with what degree of deliberation versus reaction. The next era of productivity won't be built by whoever has the best tool. It will be built by whoever knows how to redesign how humans and AI agents work together."
        ),
      ],
    },
  ];

  /* ============================================================
     TEAM INSIGHTS — Rodrigo Spínola (the "Insights" tab)
     ============================================================ */
  const RODRIGO = {
    name: "Rodrigo Spínola",
    role: t("Fundador e CEO", "Founder & CEO"),
    photo: "assets/team/rodrigo-sm.jpg",
    linkedin: "https://www.linkedin.com/in/orodrigospinola",
  };

  window.DL_INSIGHTS = [
    /* -------- token maxxing (May 15) -------- */
    {
      id: "token-maxxing",
      kind: "insight",
      author: RODRIGO,
      cat: t("Liderança", "Leadership"),
      date: t("15 mai 2026", "May 15, 2026"),
      read: 5,
      art: "art-2",
      title: t(
        "A armadilha mais cara da IA em 2026 tem nome: token maxxing",
        "The most expensive AI trap of 2026 has a name: token maxxing"
      ),
      dek: t(
        "Você pode ter 100% de adoção de IA e zero transformação. E isso está saindo caro.",
        "You can have 100% AI adoption and zero transformation. And it's getting expensive."
      ),
      body: [
        p(
          "Imagina uma empresa que paga bônus para quem mais usa a impressora. Quanto mais papel impresso, maior o salário. Parece absurdo. Mas é exatamente o que algumas das maiores empresas do mundo estão fazendo com inteligência artificial. Tem nome para isso: token maxxing.",
          "Imagine a company that pays a bonus to whoever uses the printer the most. The more paper printed, the higher the salary. It sounds absurd. But it's exactly what some of the world's biggest companies are doing with artificial intelligence. It has a name: token maxxing."
        ),
        h("O que está acontecendo", "What's happening"),
        p(
          "Um engenheiro da OpenAI processou 210 bilhões de tokens em uma semana — texto suficiente para preencher a Wikipedia 33 vezes, e o bastante para liderar o ranking interno da empresa. Na Anthropic, um único usuário do Claude Code gastou mais de US$ 150 mil em tokens em um mês. Meta e Shopify já incluem consumo de IA nas avaliações de performance: quem usa mais sobe, quem usa menos é questionado.",
          "An OpenAI engineer processed 210 billion tokens in a week — enough text to fill Wikipedia 33 times, and enough to top the company's internal ranking. At Anthropic, a single Claude Code user spent over US$150k in tokens in a month. Meta and Shopify already include AI consumption in performance reviews: those who use more rise, those who use less get questioned."
        ),
        p(
          "Segundo reportagem do New York Times de março de 2026, empresas como Meta e OpenAI mantêm rankings internos de quantos tokens cada funcionário consome. Orçamentos generosos de tokens estão virando benefício corporativo — como plano odontológico ou almoço grátis.",
          "According to a March 2026 New York Times report, companies like Meta and OpenAI keep internal rankings of how many tokens each employee consumes. Generous token budgets are becoming a corporate perk — like dental coverage or free lunch."
        ),
        p(
          "Faz sentido na superfície. Mas olha o que rolou na prática: alguns funcionários confessaram pedir para a IA ler documentos que estão na própria intranet da empresa — dez vezes mais lento que ler diretamente, mas queima mais tokens. Outros rodam agentes prototipando coisas que nem pretendem usar, só para subir no ranking.",
          "It makes sense on the surface. But look at what happened in practice: some employees admitted to asking the AI to read documents already on the company's own intranet — ten times slower than reading them directly, but it burns more tokens. Others run agents prototyping things they don't even intend to use, just to climb the ranking."
        ),
        h("Já vimos esse filme antes", "We've seen this movie before"),
        p(
          "Em 1980, empresas tentaram medir a produtividade de programadores por linhas de código escritas por dia. Resultado previsível: gente escrevendo código inútil para bater a meta. Depois de um tempo, a indústria abandonou a métrica. Token maxxing é a mesma armadilha com roupa nova — os rankings não medem qualidade de output. E qualidade de output é exatamente o que importa.",
          "In 1980, companies tried to measure programmer productivity by lines of code written per day. The predictable result: people writing useless code to hit the target. After a while, the industry abandoned the metric. Token maxxing is the same trap in new clothes — the rankings don't measure output quality. And output quality is exactly what matters."
        ),
        h("O problema mais fundo", "The deeper problem"),
        p(
          "Existe uma confusão entre duas coisas que parecem iguais mas não são. Adoção é o time usando IA todo dia. Transformação é a empresa redesenhando como o trabalho é feito, para que a IA assuma o repetitivo e as pessoas façam o que importa. Você pode ter 100% de adoção e zero transformação.",
          "There's a confusion between two things that look alike but aren't. Adoption is the team using AI every day. Transformation is the company redesigning how the work is done, so AI takes on the repetitive and people do what matters. You can have 100% adoption and zero transformation."
        ),
        p(
          "E a causa pode ser ainda mais profunda: muita gente está operando por medo. O CEO tem medo de ficar fora da corrida e cria um ranking de uso. O CFO tem medo de não justificar o investimento e comemora o consumo crescente. O colaborador tem medo de parecer obsoleto no próximo layoff e joga o jogo por autopreservação. Poucos operam por design. Muitos, por medo.",
          "And the cause may run even deeper: many people are operating out of fear. The CEO fears falling behind in the race and creates a usage ranking. The CFO fears failing to justify the investment and celebrates rising consumption. The employee fears looking obsolete in the next layoff and plays the game out of self-preservation. Few operate by design. Many, by fear."
        ),
        q(
          "Adoção de IA não transforma a sua empresa. A forma como você organiza o trabalho transforma.",
          "AI adoption doesn't transform your company. How you organize the work transforms it."
        ),
        p(
          "A solução é simples, mas exige disciplina. Três perguntas antes de instalar qualquer ferramenta de IA: que trabalho meu time faz hoje, qual parte é repetitiva, e o que sobra para o humano fazer melhor que qualquer máquina. Só depois você escolhe a ferramenta — e mede o que importa: trabalho redesenhado, não consumo de IA.",
          "The solution is simple, but it takes discipline. Three questions before installing any AI tool: what work does my team do today, which part is repetitive, and what's left for the human to do better than any machine. Only then do you choose the tool — and measure what matters: work redesigned, not AI consumed."
        ),
      ],
    },

    /* -------- O que todo CEO precisa perguntar (May 1) -------- */
    {
      id: "ceo-pergunta-ia",
      kind: "insight",
      author: RODRIGO,
      cat: t("Liderança", "Leadership"),
      date: t("1 mai 2026", "May 1, 2026"),
      read: 5,
      art: "art-3",
      title: t(
        "O que todo CEO precisa perguntar sobre IA",
        "The question every CEO needs to ask about AI"
      ),
      dek: t(
        "A IA na sua empresa só responde perguntas — ou já executa tarefas sozinha?",
        "Does the AI in your company only answer questions — or does it already execute tasks on its own?"
      ),
      body: [
        p(
          "Na semana passada, reunimos empresários e C-Levels num único lugar para falar sobre o que ninguém ainda chama pelo nome certo. Não foi um evento de tecnologia. Foi um evento sobre o futuro das empresas.",
          "Last week, we brought business owners and C-levels together in one place to talk about something no one is yet calling by its right name. It wasn't a technology event. It was an event about the future of companies."
        ),
        p(
          "A pergunta que guiou o dia foi simples: a IA na sua empresa só responde perguntas ou já executa tarefas sozinha? Parece uma distinção técnica. Não é. É a diferença entre ter uma ferramenta e ter uma Organização Agêntica.",
          "The question that guided the day was simple: does the AI in your company only answer questions, or does it already execute tasks on its own? It sounds like a technical distinction. It isn't. It's the difference between having a tool and having an Agentic Organization."
        ),
        h("Por que essa pergunta importa", "Why the question matters"),
        p(
          "Responder perguntas é o que o ChatGPT faz quando você digita algo. É útil, mas passivo: você pergunta, ele responde; você fecha a aba, ele para. Executar tarefas sozinha é outra coisa — um agente que monitora, decide, age e reporta, sem precisar que alguém faça a pergunta certa na hora certa.",
          "Answering questions is what ChatGPT does when you type something. It's useful, but passive: you ask, it answers; you close the tab, it stops. Executing tasks on its own is something else — an agent that monitors, decides, acts and reports, without needing someone to ask the right question at the right time."
        ),
        p(
          "A maioria das empresas está no primeiro grupo e acredita que está no segundo. Esse é o problema. O padrão se repete: a empresa comprou ferramenta, treinou o time, viu adoção e concluiu que estava implementando IA. Só que adoção de ferramenta não é transformação. É o estágio 1 de 5.",
          "Most companies are in the first group and believe they're in the second. That's the problem. The pattern repeats: the company bought a tool, trained the team, saw adoption and concluded it was implementing AI. But tool adoption isn't transformation. It's stage 1 of 5."
        ),
        h("Os cinco estágios da maturidade agêntica", "The five stages of agentic maturity"),
        p(
          "A sequência não é linear por acaso — cada estágio depende do anterior. 1. Automatizar: tarefas repetitivas com regras fixas. 2. Enxergar: dados integrados, visibilidade real da operação. 3. Recomendar: o agente sugere, o humano decide. 4. Antecipar: o agente age antes do problema aparecer. 5. Orquestrar: múltiplos agentes em paralelo, com supervisão humana definida.",
          "The sequence isn't linear by accident — each stage depends on the previous one. 1. Automate: repetitive tasks with fixed rules. 2. See: integrated data, real visibility into the operation. 3. Recommend: the agent suggests, the human decides. 4. Anticipate: the agent acts before the problem appears. 5. Orchestrate: multiple agents in parallel, with defined human supervision."
        ),
        p(
          "A maioria das empresas está entre o 1 e o 2. Algumas chegam ao 3. Poucas chegam ao 5 — e as que chegam têm uma coisa em comum: não começaram pela ferramenta. Começaram pelo processo.",
          "Most companies are between 1 and 2. Some reach 3. Few reach 5 — and those that do have one thing in common: they didn't start with the tool. They started with the process."
        ),
        h("O erro que trava 95% das implementações", "The mistake that stalls 95% of implementations"),
        p(
          "MIT (2024) e Stanford (2025) chegaram ao mesmo número: 95% das implementações de IA corporativa não geram retorno mensurável. A causa não é a tecnologia. É a sequência. Processo mal mapeado com IA é só processo mal mapeado mais rápido — o agente vai executar o que você definiu; se está errado, ele erra em escala.",
          "MIT (2024) and Stanford (2025) arrived at the same number: 95% of enterprise AI implementations generate no measurable return. The cause isn't the technology. It's the sequence. A poorly mapped process with AI is just a poorly mapped process — faster. The agent will execute what you defined; if it's wrong, it errs at scale."
        ),
        q(
          "O que funciona é o inverso do que a maioria faz: primeiro o processo, depois o agente. É menos glamoroso. Por isso poucos fazem.",
          "What works is the opposite of what most do: process first, agent second. It's less glamorous. That's why few do it."
        ),
      ],
    },

    /* -------- Você usa IA. Mas ela trabalha quando você dorme? (Apr 8) -------- */
    {
      id: "ia-trabalha-quando-voce-dorme",
      kind: "insight",
      author: RODRIGO,
      cat: t("Liderança", "Leadership"),
      date: t("8 abr 2026", "Apr 8, 2026"),
      read: 5,
      art: "art-1",
      title: t(
        "Você usa IA. Mas ela trabalha quando você dorme?",
        "You use AI. But does it work while you sleep?"
      ),
      dek: t(
        "A diferença entre usar uma ferramenta e ter um agente operando como membro do seu time.",
        "The difference between using a tool and having an agent operating as a member of your team."
      ),
      body: [
        p(
          "Tem uma pergunta que faço para quase todo executivo que converso: você usa IA no trabalho? A resposta é sempre sim. E então faço a segunda pergunta: quando você fecha o computador, o que a IA continua fazendo por você? O silêncio que vem depois diz tudo.",
          "There's a question I ask almost every executive I talk to: do you use AI at work? The answer is always yes. And then I ask the second question: when you close your computer, what does the AI keep doing for you? The silence that follows says everything."
        ),
        h("Usar IA não é o mesmo que ter uma Organização Agêntica", "Using AI isn't the same as having an Agentic Organization"),
        p(
          "A ferramenta responde quando eu pergunto; o agente age enquanto faço outra coisa. A ferramenta esquece tudo quando fecho a janela; o agente tem memória, contexto e histórico. A ferramenta produz um output; o agente tem responsabilidades definidas, métricas de performance e eu supervisiono o que ele faz.",
          "The tool responds when I ask; the agent acts while I do something else. The tool forgets everything when I close the window; the agent has memory, context and history. The tool produces an output; the agent has defined responsibilities, performance metrics, and I supervise what it does."
        ),
        p(
          "A maioria das empresas está no primeiro cenário e acredita estar no segundo. Essa confusão é cara — não porque a ferramenta seja ruim, mas porque cria uma ilusão de transformação que não existe.",
          "Most companies are in the first scenario and believe they're in the second. That confusion is expensive — not because the tool is bad, but because it creates an illusion of transformation that doesn't exist."
        ),
        h("O que um agente de verdade parece na prática", "What a real agent looks like in practice"),
        p(
          "Construí um agente pessoal chamado Neo. Ele roda 24 horas por dia, tem memória de longo prazo e se conecta ao meu Google Calendar, Gmail e Slack. Mas o que o define como agente não é a tecnologia — é o que ele faz sem ser perguntado.",
          "I built a personal agent called Neo. It runs 24 hours a day, has long-term memory and connects to my Google Calendar, Gmail and Slack. But what defines it as an agent isn't the technology — it's what it does without being asked."
        ),
        p(
          "Às 5h30, entrega um briefing com a agenda do dia, alertas de email e a tarefa mais importante. Às 8h, roda um score que mede se estou investindo energia nas atividades certas. Às 14h, dispara follow-ups de propostas sem resposta e decisões travadas. Às 18h, fecha o dia e registra o que ficou pendente. Toda sexta, gera um relatório de accountability: quanto tempo dediquei a vendas, estratégia e operação.",
          "At 5:30am, it delivers a briefing with the day's agenda, email alerts and the single most important task. At 8am, it runs a score measuring whether I'm investing energy in the right activities. At 2pm, it fires follow-ups on unanswered proposals and stalled decisions. At 6pm, it closes the day and logs what's still pending. Every Friday, it generates an accountability report: how much time I spent on sales, strategy and operations."
        ),
        h("Eu estou sempre no centro", "I'm always at the center"),
        p(
          "O Neo não decide. Ele confronta, alerta, sugere e registra — mas quem decide sou eu. Quando percebe que estou tocando múltiplos temas em horário tardio, sugere que eu pare; a decisão é minha. Quando identifica uma tarefa que deveria ir para outro membro do time, sugere quem; quem delega sou eu.",
          "Neo doesn't decide. It challenges, alerts, suggests and logs — but I'm the one who decides. When it notices I'm juggling multiple topics late at night, it suggests I stop; the decision is mine. When it identifies a task that should go to another team member, it suggests who; I'm the one who delegates."
        ),
        q(
          "A autonomia do agente é sempre delegada, limitada e controlada por mim. O agente executa. Eu decido.",
          "The agent's autonomy is always delegated, limited and controlled by me. The agent executes. I decide."
        ),
        p(
          "Num momento em que todo mundo fala de IA autônoma como se fosse o objetivo, esse ponto é contraintuitivo. Mas é ele que faz a transformação funcionar. Agente sem supervisão humana estruturada não é transformação — é risco. E essa mudança não acontece comprando uma ferramenta nova: acontece redesenhando como a empresa funciona, começando pelos processos, passando pelas pessoas e chegando nas ferramentas na ordem certa.",
          "At a moment when everyone talks about autonomous AI as if it were the goal, this point is counterintuitive. But it's what makes transformation work. An agent without structured human supervision isn't transformation — it's risk. And that change doesn't happen by buying a new tool: it happens by redesigning how the company works, starting with processes, moving through people, and reaching tools in the right order."
        ),
      ],
    },

    /* -------- O erro que 95% das empresas cometem (Apr 2) -------- */
    {
      id: "erro-95-por-cento",
      kind: "insight",
      author: RODRIGO,
      cat: t("Estratégia", "Strategy"),
      date: t("2 abr 2026", "Apr 2, 2026"),
      read: 6,
      art: "art-4",
      title: t(
        "O erro que 95% das empresas cometem ao adotar IA",
        "The mistake 95% of companies make when adopting AI"
      ),
      dek: t(
        "A IA tornou indivíduos até 10x mais produtivos. Mas nenhuma empresa virou 10x mais valiosa. Por quê?",
        "AI made individuals up to 10x more productive. But no company became 10x more valuable. Why?"
      ),
      body: [
        p(
          "Às vezes você está construindo algo por meses, convicto da direção, com aquela dúvida de fundo: será que é só a gente que pensa assim? Essa semana, a dúvida foi embora.",
          "Sometimes you've been building something for months, convinced of the direction, with that nagging doubt in the back of your mind: is it just us who think this way? This week, the doubt went away."
        ),
        p(
          "George Sivulka, CEO da Hebbia (portfólio a16z, formado em Stanford), publicou um artigo que é praticamente um manifesto: “Institutional Intelligence”. O argumento central: a IA tornou indivíduos até dez vezes mais produtivos, mas nenhuma empresa se tornou dez vezes mais valiosa. Por quê? Porque trocaram o motor sem redesenhar a fábrica.",
          "George Sivulka, CEO of Hebbia (an a16z-backed AI company, Stanford-trained founder), published an article that's practically a manifesto: “Institutional Intelligence.” The central argument: AI has made individuals up to ten times more productive, but no company has become ten times more valuable. Why? Because they swapped the motor without redesigning the factory."
        ),
        h("A analogia que explica tudo", "The analogy that explains everything"),
        p(
          "Sivulka usa as fábricas têxteis dos anos 1890. Quando a eletricidade chegou, as primeiras fábricas só trocaram as máquinas a vapor por motores elétricos — mesmo layout, mesma lógica, mesmo fluxo. Os ganhos foram mínimos. Foi só quando redesenharam a fábrica inteira em torno da nova tecnologia que a produtividade explodiu.",
          "Sivulka uses the 1890s textile mills. When electricity arrived, the first factories simply swapped steam engines for electric motors — same layout, same logic, same flow. The gains were minimal. It was only when they redesigned the entire factory around the new technology that productivity exploded."
        ),
        p(
          "É exatamente o que acontece com IA hoje. As pessoas usam ChatGPT, cada uma com seus próprios hábitos e prompts, produzindo outputs que não conversam entre si e não escalam. É uso individual de IA. Não é transformação.",
          "It's exactly what's happening with AI today. People use ChatGPT, each with their own habits and prompts, producing outputs that don't talk to each other and don't scale. It's individual use of AI. It isn't transformation."
        ),
        h("O ponto que ninguém está falando", "The point no one is talking about"),
        p(
          "Sivulka argumenta que os maiores evangelistas de IA dentro de uma empresa frequentemente são os profissionais que mais precisam de correção — porque a IA tende a concordar com quem a usa. Ela valida, confirma, refina a visão de quem está no teclado. Sem processo institucional e revisão humana estruturada, a IA amplifica os vieses que já existem. Não os corrige.",
          "Sivulka argues that a company's biggest AI evangelists are often the professionals who most need correction — because AI tends to agree with whoever uses it. It validates, confirms, refines the view of whoever's at the keyboard. Without institutional process and structured human review, AI amplifies the biases that already exist. It doesn't correct them."
        ),
        h("Testa na sua empresa agora", "Test it in your company now"),
        p(
          "Antes de comprar qualquer ferramenta nova, faça esse diagnóstico (leva menos de 15 minutos). Passo 1: liste os três processos que mais consomem tempo da sua equipe esta semana — os que de fato ocupam mais horas, não os que você acha importantes. Passo 2: para cada um, pergunte se a atividade tem entrada clara e saída previsível, e se ela se repete da mesma forma toda vez. Se sim para as duas, é um candidato real para automação. Passo 3: identifique quem decide e quem executa — processos onde decisão e execução estão na mesma pessoa são os mais difíceis de automatizar, e os que mais se beneficiam quando você separa as funções com IA no meio.",
          "Before buying any new tool, run this diagnostic (it takes under 15 minutes). Step 1: list the three processes that consume the most of your team's time this week — the ones that actually take the most hours, not the ones you think are important. Step 2: for each, ask whether the activity has a clear input and a predictable output, and whether it repeats the same way every time. If yes to both, it's a real candidate for automation. Step 3: identify who decides and who executes — processes where decision and execution sit with the same person are the hardest to automate, and the ones that benefit most when you separate the two functions with AI in between."
        ),
        q(
          "Engenharia de processos vai se tornar a competência mais valiosa dos próximos anos. Não engenharia de software. Não prompt engineering.",
          "Process engineering will become the most valuable skill of the coming years. Not software engineering. Not prompt engineering."
        ),
        p(
          "No final, Sivulka é direto sobre isso. E admite, nas entrelinhas, que o gargalo não é o software — é o change management, o mapeamento de processo, entender o negócio fundo o suficiente para saber o que automatizar, o que preservar e o que redesenhar do zero. Isso não vem em forma de produto. Vem em forma de parceria. O mercado está chegando nessa conclusão — a questão é quem vai estar posicionado quando ela virar consenso.",
          "In the end, Sivulka is direct about it. And he admits, between the lines, that the bottleneck isn't the software — it's change management, process mapping, understanding the business deeply enough to know what to automate, what to preserve, and what to redesign from scratch. That doesn't come as a product. It comes as a partnership. The market is arriving at this conclusion — the question is who will be positioned when it becomes consensus."
        ),
      ],
    },

    /* -------- IA fracassa em 40% dos projetos (Mar 18) -------- */
    {
      id: "ia-fracassa-40-por-cento",
      kind: "insight",
      author: RODRIGO,
      cat: t("Estratégia", "Strategy"),
      date: t("18 mar 2026", "Mar 18, 2026"),
      read: 5,
      art: "art-2",
      title: t(
        "IA fracassa em 40% dos projetos. O motivo é sempre o mesmo.",
        "AI fails in 40% of projects. The reason is always the same."
      ),
      dek: t(
        "A Gartner projeta 40% dos projetos de IA agêntica cancelados até 2027. O que separa os 60% que entregam?",
        "Gartner projects 40% of agentic-AI projects canceled by 2027. What sets apart the 60% that deliver?"
      ),
      body: [
        p(
          "A Gartner soltou um número que precisa ser levado a sério: mais de 40% dos projetos de IA agêntica serão cancelados até o final de 2027. Não são startups de garagem — são projetos corporativos, com orçamento aprovado, time dedicado e aval do conselho. Cancelados.",
          "Gartner released a number that needs to be taken seriously: more than 40% of agentic-AI projects will be canceled by the end of 2027. These aren't garage startups — they're enterprise projects, with approved budgets, dedicated teams and board sign-off. Canceled."
        ),
        h("O problema que ninguém está falando", "The problem no one is talking about"),
        p(
          "A PwC publicou em janeiro que 56% dos CEOs globais não viram retorno financeiro com IA nos últimos 12 meses. O MIT foi mais direto: 95% dos pilotos de IA generativa entregam pouco ou nenhum impacto no resultado financeiro. A maioria das empresas está gastando em IA — não investindo. E há uma diferença enorme entre as duas coisas.",
          "PwC reported in January that 56% of global CEOs saw no financial return from AI in the last 12 months. MIT was more direct: 95% of generative-AI pilots deliver little or no impact on financial results. Most companies are spending on AI — not investing. And there's a huge difference between the two."
        ),
        p(
          "A Deloitte reforça o paradoxo: 66% das empresas reportam ganhos de produtividade com IA, mas só 20% efetivamente aumentaram receita. As pessoas trabalham mais rápido, mas a empresa não ganha mais dinheiro. Isso não é ROI. É eficiência sem direção.",
          "Deloitte reinforces the paradox: 66% of companies report productivity gains with AI, but only 20% actually increased revenue. People work faster, but the company doesn't make more money. That isn't ROI. It's efficiency without direction."
        ),
        h("O que separa os 60% que funcionam", "What sets apart the 60% that work"),
        p(
          "Não é o tamanho do orçamento. Não é a ferramenta escolhida. Não é o tamanho da empresa. É a sequência. Os projetos que entregam seguem uma ordem que parece óbvia mas quase ninguém cumpre: primeiro processos, depois pessoas, depois ferramentas. Nessa ordem, sem pular etapa. Os que fracassam fazem o caminho inverso: compram a ferramenta, jogam para o time e torcem para dar certo.",
          "It isn't the size of the budget. It isn't the chosen tool. It isn't the size of the company. It's the sequence. The projects that deliver follow an order that seems obvious but almost no one follows: processes first, then people, then tools. In that order, without skipping a step. Those that fail take the reverse path: buy the tool, hand it to the team and hope for the best."
        ),
        h("Os cinco erros que destroem projetos de IA", "The five mistakes that destroy AI projects"),
        p(
          "1. Automatizar processo quebrado — colocar IA sobre um atendimento confuso só automatiza a confusão mais rápido. 2. Comprar ferramenta antes de ter o problema definido — a Gartner chama de “agent washing”: de milhares de empresas vendendo soluções agênticas, só 130 a 150 oferecem capacidades reais; o resto é maquiagem. 3. Tratar IA como projeto de TI — sem preparar as pessoas, vem a resistência silenciosa. 4. Não definir como medir sucesso antes de começar — “a equipe está mais produtiva” não responde ao CFO. 5. Tentar transformar tudo de uma vez — comece por um processo, prove o ROI em 60 a 90 dias e só então escale.",
          "1. Automating a broken process — putting AI on top of a messy support flow just automates the mess faster. 2. Buying a tool before defining the problem — Gartner calls it “agent washing”: of the thousands of companies selling agentic solutions, only 130 to 150 offer real capabilities; the rest is makeup. 3. Treating AI as an IT project — without preparing people, you get silent resistance. 4. Not defining how to measure success before starting — “the team is more productive” doesn't answer the CFO. 5. Trying to transform everything at once — start with one process, prove the ROI in 60 to 90 days, and only then scale."
        ),
        q(
          "A causa não é a tecnologia. É a sequência.",
          "The cause isn't the technology. It's the sequence."
        ),
      ],
    },
  ];

  /* ============================================================
     MEDIA — external press coverage (the "Mídia" tab → opens in a new tab)
     ============================================================ */
  window.DL_MEDIA = [
    {
      id: "veja-mundial-mix-aporte",
      kind: "media",
      source: t("Veja Negócios", "Veja Negócios"),
      date: t("5 fev 2026", "Feb 5, 2026"),
      url: "https://veja.abril.com.br/coluna/radar-economico/o-aporte-de-um-socio-do-atacadista-mundial-mix-em-uma-startup-de-ia/",
      title: t(
        "O aporte de um sócio do atacadista Mundial Mix em uma startup de IA",
        "A Mundial Mix partner's investment in an AI startup"
      ),
    },
    {
      id: "cnn-ia-infraestrutura",
      kind: "media",
      source: t("CNN Brasil", "CNN Brasil"),
      date: t("16 mai 2026", "May 16, 2026"),
      url: "https://www.cnnbrasil.com.br/infra/ia-promete-reduzir-custos-e-acelerar-projetos-em-infraestrutura/",
      title: t(
        "IA promete reduzir custos e acelerar projetos em infraestrutura",
        "AI promises to cut costs and accelerate infrastructure projects"
      ),
    },
  ];
})();
