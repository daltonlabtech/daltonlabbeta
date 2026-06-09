/* ============================================================
   INSIGHTS — blog hub: articles (Dalton Lab) + team insights
   Bilingual content + list/reader rendering.
   ============================================================ */
(function () {
  const t = (pt, en) => ({ pt, en });

  // Authors
  const RODRIGO = {
    name: "Rodrigo Spínola",
    role: t("Fundador e CEO", "Founder & CEO"),
    photo: "assets/team/rodrigo-sm.jpg",
    linkedin: "https://www.linkedin.com/in/orodrigospinola",
  };

  // Body block helpers: h = subhead, p = paragraph, q = pull-quote
  const h = (pt, en) => ({ t: "h", pt, en });
  const p = (pt, en) => ({ t: "p", pt, en });
  const q = (pt, en) => ({ t: "q", pt, en });

  const POSTS = [
    /* ---------------- TEAM INSIGHT — Rodrigo / Karpathy ---------------- */
    {
      id: "karpathy-decada-agentes",
      kind: "insight",
      author: RODRIGO,
      cat: t("Liderança", "Leadership"),
      date: t("2 jun 2026", "Jun 2, 2026"),
      read: 4,
      art: "art-1",
      title: t(
        "Não é o ano dos agentes de IA. É a década. E sua empresa está preparada para isso?",
        "It's not the year of AI agents. It's the decade. And is your company ready for it?"
      ),
      dek: t(
        "Três ideias da palestra de Andrej Karpathy no AI Startup School, traduzidas para quem está tentando implementar IA de verdade.",
        "Three ideas from Andrej Karpathy's AI Startup School talk, translated for anyone actually trying to implement AI."
      ),
      body: [
        p(
          "Muita gente voltou a comentar sobre a palestra do Andrej Karpathy no AI Startup School.",
          "A lot of people have been talking again about Andrej Karpathy's talk at the AI Startup School."
        ),
        p(
          "Karpathy é ex-diretor de IA da Tesla e uma das vozes mais respeitadas do setor. E o que ele disse não foi para desenvolvedores. Foi, sem querer, um manual para quem lidera uma empresa.",
          "Karpathy is the former AI director at Tesla and one of the most respected voices in the field. What he said wasn't aimed at developers. It was, unintentionally, a playbook for anyone leading a company."
        ),
        p(
          "Vou traduzir os três pontos que mais importam para quem está tentando implementar IA de verdade.",
          "Let me translate the three points that matter most for anyone actually trying to implement AI."
        ),
        h("O paradigma mudou. Prompts são programas.", "The paradigm shifted. Prompts are programs."),
        p(
          "Karpathy descreveu três gerações de software. A primeira é o código tradicional que programadores escrevem. A segunda são as redes neurais. A terceira, que estamos vivendo agora, é o que ele chama de Software 3.0: você programa o modelo em linguagem natural. Prompts são programas escritos em português.",
          "Karpathy described three generations of software. The first is the traditional code that programmers write. The second is neural networks. The third, the one we're living now, is what he calls Software 3.0: you program the model in natural language. Prompts are programs written in plain language."
        ),
        p("Isso muda o que significa saber usar IA.", "That changes what it means to know how to use AI."),
        p(
          "Não é mais sobre aprender uma ferramenta. É sobre aprender a instruir um sistema inteligente com clareza. Quem consegue descrever bem o que quer, em linguagem natural, consegue programar. Isso democratiza o acesso, mas também exige um novo tipo de habilidade: saber pensar com precisão e comunicar com clareza. Time que não desenvolve isso vai usar IA como buscador sofisticado, não como agente de trabalho.",
          "It's no longer about learning a tool. It's about learning to instruct an intelligent system clearly. Whoever can describe well what they want, in natural language, can program. That democratizes access, but it also demands a new kind of skill: thinking precisely and communicating clearly. A team that doesn't build this will use AI as a sophisticated search engine, not as a working agent."
        ),
        h(
          "O jeito certo de trabalhar com IA: pequenos passos, humano no loop.",
          "The right way to work with AI: small steps, human in the loop."
        ),
        p(
          "Karpathy foi direto sobre como trabalhar com LLMs de forma eficaz. A receita é a mesma de quem trabalha com um profissional brilhante mas imprevisível: dar tarefas pequenas, verificar o resultado, ajustar, avançar.",
          "Karpathy was direct about how to work effectively with LLMs. The recipe is the same as working with a brilliant but unpredictable professional: give small tasks, check the result, adjust, move forward."
        ),
        p(
          "Ele usou a analogia do sonambulismo: se você deixar o modelo rodar livre por muito tempo sem supervisão, ele pode estar indo na direção errada há horas antes de você perceber.",
          "He used the sleepwalking analogy: if you let the model run free for too long without supervision, it may have been heading in the wrong direction for hours before you notice."
        ),
        p(
          "O humano no loop não é limitação. É arquitetura. É o que separa uma implementação que escala de uma que explode na primeira exceção que o agente não sabia tratar. Nas empresas que ajudamos, o erro mais comum não é escolher a ferramenta errada. É dar autonomia demais cedo demais, sem ter mapeado onde o agente pode errar e quanto esse erro custa.",
          "The human in the loop isn't a limitation. It's architecture. It's what separates an implementation that scales from one that explodes at the first exception the agent didn't know how to handle. In the companies we help, the most common mistake isn't choosing the wrong tool. It's giving too much autonomy too early, without mapping where the agent can fail and how much that failure costs."
        ),
        h(
          "O aviso principal: não é o ano dos agentes. É a década.",
          "The main warning: it's not the year of agents. It's the decade."
        ),
        p(
          "Essa foi a parte que mais circulou. Karpathy disse textualmente: quando vejo alguém falar que 2025 é o ano dos agentes, fico preocupado. Isso é a década dos agentes. Vai levar tempo. Precisa de humano no loop. Precisamos fazer isso com cuidado.",
          "This was the part that circulated the most. Karpathy said it literally: when I see someone say 2025 is the year of agents, I get worried. This is the decade of agents. It will take time. It needs a human in the loop. We need to do this carefully."
        ),
        q(
          "Paciência é estratégia.",
          "Patience is strategy."
        ),
        p(
          "O CEO que entende isso para de procurar o projeto de IA que vai transformar a empresa em noventa dias e começa a construir a fundação que vai sustentar a operação pelos próximos dez anos. Processo mapeado. Pessoas treinadas. Governança definida. Agentes com autonomia crescente e controlada. Não é atraente. É o que funciona.",
          "The CEO who understands this stops looking for the AI project that will transform the company in ninety days and starts building the foundation that will sustain operations for the next ten years. Mapped processes. Trained people. Defined governance. Agents with growing, controlled autonomy. It's not attractive. It's what works."
        ),
      ],
    },

    /* ---------------- DALTON LAB ARTICLE — AI Last, Not First ---------------- */
    {
      id: "ai-last-not-first",
      kind: "article",
      cat: t("Tese", "Thesis"),
      date: t("1 jun 2026", "Jun 1, 2026"),
      read: 5,
      art: "art-4",
      pdf: true,
      title: t(
        "AI Last, Not First: por que a ordem da transformação importa",
        "AI Last, Not First: why the order of transformation matters"
      ),
      dek: t(
        "A maioria das empresas começa pela ferramenta. Quem transforma de verdade começa pelo processo.",
        "Most companies start with the tool. The ones who truly transform start with the process."
      ),
      body: [
        p(
          "Toda semana uma nova empresa anuncia que “adotou IA”. Compraram licenças, abriram um piloto, treinaram um time. Seis meses depois, quase nada mudou na operação. O problema raramente é a tecnologia. É a ordem.",
          "Every week a new company announces it has “adopted AI.” They bought licenses, opened a pilot, trained a team. Six months later, almost nothing has changed in the operation. The problem is rarely the technology. It's the order."
        ),
        p(
          "No Dalton Lab chamamos isso de AI Last, Not First. Não porque a IA venha por último em importância — mas porque ela é a última peça a entrar, não a primeira.",
          "At Dalton Lab we call this AI Last, Not First. Not because AI is last in importance — but because it's the last piece to enter, not the first."
        ),
        h("Começar pela ferramenta é começar pelo fim", "Starting with the tool is starting at the end"),
        p(
          "Quando uma empresa começa pela ferramenta, ela tenta encaixar um agente em um processo que ninguém mapeou. O agente automatiza o caos que já existia — e o caos automatizado escala mais rápido.",
          "When a company starts with the tool, it tries to fit an agent into a process no one has mapped. The agent automates the chaos that already existed — and automated chaos scales faster."
        ),
        p(
          "A pergunta certa não é “qual ferramenta de IA usar?”. É “qual processo, hoje, consome tempo humano em tarefas que não exigem julgamento?”.",
          "The right question isn't “which AI tool should we use?” It's “which process, today, consumes human time on tasks that don't require judgment?”"
        ),
        h("A ordem que funciona", "The order that works"),
        p(
          "1. Processo mapeado. Antes de qualquer agente, é preciso entender o fluxo real — não o que está no manual, mas o que acontece na prática.",
          "1. Mapped process. Before any agent, you need to understand the real flow — not what's in the manual, but what actually happens."
        ),
        p(
          "2. Pessoas treinadas. A IA não substitui o time; ela muda o que o time faz. Quem antes executava passa a supervisionar e decidir.",
          "2. Trained people. AI doesn't replace the team; it changes what the team does. Those who used to execute now supervise and decide."
        ),
        p(
          "3. Governança definida. Onde o agente pode errar? Quanto custa esse erro? Quem revisa? Sem isso, autonomia vira risco.",
          "3. Defined governance. Where can the agent fail? How much does that failure cost? Who reviews it? Without this, autonomy becomes risk."
        ),
        p(
          "4. Agente em produção. Só agora a ferramenta entra — sobre um processo claro, com pessoas preparadas e limites definidos.",
          "4. Agent in production. Only now does the tool enter — on top of a clear process, with prepared people and defined limits."
        ),
        h("Por que isso importa para quem lidera", "Why this matters for leaders"),
        p(
          "A versão “AI First” entrega uma demo impressionante e uma operação frágil. A versão “AI Last” parece mais lenta no começo e se torna impossível de reverter no fim — porque a IA passa a fazer parte de como a empresa funciona, não de como ela se apresenta.",
          "The “AI First” version delivers an impressive demo and a fragile operation. The “AI Last” version feels slower at first and becomes impossible to reverse in the end — because AI becomes part of how the company works, not how it presents itself."
        ),
        q(
          "Transformar uma empresa em uma Organização Agêntica não é instalar agentes. É reorganizar o trabalho ao redor deles.",
          "Turning a company into an Agentic Organization isn't installing agents. It's reorganizing work around them."
        ),
        p(
          "E isso só acontece quando a IA entra por último.",
          "And that only happens when AI enters last."
        ),
      ],
    },
  ];

  /* ---------------- merge Dalton Lab articles (js/articles-data.js) ---------------- */
  // Newest-first ordering for the "Artigos" tab; new real articles lead.
  const ORDER = [
    "paradoxo-ia-marketing",
    "individuos-produtivos",
    "roteiro-ceo",
    "iniciativas-ia-retorno",
    "organizacao-agentica-ruptura",
  ];
  const extra = (window.DL_ARTICLES || []).slice().sort(
    (a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id)
  );
  POSTS.unshift(...extra);
  // Team insights (js/articles-data.js → window.DL_INSIGHTS), appended after the
  // existing Karpathy insight (which stays newest).
  POSTS.push(...(window.DL_INSIGHTS || []));
  // External press coverage (the "Mídia" tab).
  POSTS.push(...(window.DL_MEDIA || []));

  /* ---------------- rendering ---------------- */
  const lang = () => { try { return localStorage.getItem("dl_lang") || "pt"; } catch (e) { return "pt"; } };
  const L = (o) => (o ? o[lang()] : "");
  const D = (key) => (window.I18N[lang()] || window.I18N.pt)[key] || "";

  const listEl = document.getElementById("ins-list");
  const readerEl = document.getElementById("ins-reader");
  const tabsEl = document.querySelectorAll(".ins-tab");
  const searchEl = document.getElementById("ins-search");
  let activeKind = "media";

  function liItem(post) {
    const isInsight = post.kind === "insight";
    const isMedia = post.kind === "media";
    const a = document.createElement("a");
    a.className = "ip-row reveal in";
    if (isMedia) {
      a.href = post.url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      a.href = "#" + post.id;
    }
    a.dataset.id = post.id;
    a.dataset.search = (L(post.title) + " " + L(post.cat) + " " + L(post.dek) + " " + (post.source ? L(post.source) : "")).toLowerCase();

    const meta = `<div class="ip-meta"><span>${L(post.date)}</span></div>`;
    const title = `<div class="ip-title">${L(post.title)}</div>`;
    let byline = "";
    if (isInsight) {
      byline = `<div class="ip-by"><span class="ip-by-name">${post.author.name}</span><span class="ip-by-role">· ${L(post.author.role)}</span></div>`;
    } else if (isMedia) {
      byline = `<div class="ip-by"><span class="ip-by-name">${L(post.source)}</span></div>`;
    }
    const arrow = isMedia ? "↗" : "→";
    a.innerHTML = `<div class="ip-row-main">${meta}${title}${byline}</div><span class="ip-go" aria-hidden="true">${arrow}</span>`;
    if (!isMedia) a.addEventListener("click", (e) => { e.preventDefault(); openReader(post.id); });
    return a;
  }

  // Parse the (locale-independent) EN date string to a sortable timestamp.
  function ts(post) {
    const d = post && post.date ? Date.parse(post.date.en) : NaN;
    return isNaN(d) ? 0 : d;
  }

  function renderList() {
    const posts = POSTS.filter((p) => p.kind === activeKind);
    const term = (searchEl.value || "").trim().toLowerCase();
    const shown = posts
      .filter(
        (p) => !term || (L(p.title) + " " + L(p.cat) + " " + L(p.dek)).toLowerCase().includes(term)
      )
      .sort((a, b) => ts(b) - ts(a)); // newest → oldest
    listEl.innerHTML = "";
    if (!shown.length) {
      listEl.innerHTML = `<p class="ip-empty">${D("insp.empty")}</p>`;
      return;
    }
    shown.forEach((p) => listEl.appendChild(liItem(p)));
  }

  function blockHTML(b) {
    if (b.t === "h") return `<h2 class="ir-h">${L(b)}</h2>`;
    if (b.t === "q") return `<blockquote class="ir-q">${L(b)}</blockquote>`;
    return `<p class="ir-p">${L(b)}</p>`;
  }

  function relatedHTML(current) {
    // Recommend TWO next articles — same kind when possible, cycling for variety.
    const kin = POSTS.filter((p) => p.kind === current.kind);
    const i = kin.findIndex((p) => p.id === current.id);
    let picks = [];
    if (kin.length > 2) {
      picks = [kin[(i + 1) % kin.length], kin[(i + 2) % kin.length]];
    } else {
      picks = POSTS.filter((p) => p.id !== current.id).slice(0, 2);
    }
    picks = picks.filter(Boolean);
    if (!picks.length) return "";
    const items = picks.map((pick) => `
      <a class="ir-rel" data-id="${pick.id}" href="#${pick.id}">
        <div class="ip-meta"><span>${L(pick.date)}</span></div>
        <div class="ir-rel-title">${L(pick.title)}</div>
        <span class="ir-rel-go">${D("insp.readmore")} →</span>
      </a>`).join("");
    return `<div class="ir-related"><div class="eyebrow">${D("insp.related")}</div><div class="ir-rel-grid">${items}</div></div>`;
  }

  function openReader(id) {
    const post = POSTS.find((p) => p.id === id);
    if (!post) return;
    const isInsight = post.kind === "insight";

    let head = `
      <button class="ir-back" id="ir-back">← <span>${D("insp.back")}</span></button>
      <div class="ir-meta"><span>${L(post.date)}</span><span class="ip-dot"></span><span>${post.read} ${D("insp.readtime")}</span></div>
      <h1 class="ir-title">${L(post.title)}</h1>
      <p class="ir-dek">${L(post.dek)}</p>`;

    if (isInsight) {
      head += `
        <div class="ir-author">
          <img src="${post.author.photo}" alt="${post.author.name}" />
          <div class="ir-author-info">
            <div class="ir-author-name">${post.author.name}</div>
            <div class="ir-author-role">${L(post.author.role)}</div>
          </div>
          <a class="ir-author-li" href="${post.author.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn — ${post.author.name}">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          </a>
        </div>`;
    } else {
      head += `<div class="ir-byline"><span class="ir-byteam">${D("insp.byteam")}</span></div>`;
    }

    const hero = "";
    const body = `<div class="ir-body">${post.body.map(blockHTML).join("")}</div>`;
    // "Baixar PDF" button removed for now (kept in data for later via post.pdf/pdfUrl).
    const pdf = "";

    readerEl.innerHTML = `<article class="ir-article">${head}${hero}${body}${pdf}${relatedHTML(post)}</article>`;
    readerEl.classList.add("open");
    document.body.classList.add("reading");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    document.getElementById("ir-back").addEventListener("click", closeReader);
    const pdfBtn = document.getElementById("ir-pdf");
    if (pdfBtn && !post.pdfUrl) pdfBtn.addEventListener("click", () => window.print());
    readerEl.querySelectorAll(".ir-rel").forEach((r) =>
      r.addEventListener("click", (e) => { e.preventDefault(); openReader(r.dataset.id); })
    );
    history.replaceState(null, "", "#" + id);
  }

  function closeReader() {
    readerEl.classList.remove("open");
    readerEl.innerHTML = "";
    document.body.classList.remove("reading");
    history.replaceState(null, "", location.pathname);
  }

  // Tabs
  tabsEl.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabsEl.forEach((x) => x.classList.toggle("active", x === tab));
      activeKind = tab.dataset.kind;
      renderList();
    });
  });
  searchEl.addEventListener("input", renderList);

  // Open deep-linked reader on hash navigation (e.g. arriving from the home Insights cards)
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (id && POSTS.find((p) => p.id === id)) {
      const post = POSTS.find((p) => p.id === id);
      if (activeKind !== post.kind) {
        activeKind = post.kind;
        tabsEl.forEach((x) => x.classList.toggle("active", x.dataset.kind === activeKind));
        renderList();
      }
      openReader(id);
    } else if (!id && readerEl.classList.contains("open")) {
      closeReader();
    }
  });

  // Language re-render
  window.addEventListener("langchange", () => {
    renderList();
    if (readerEl.classList.contains("open")) {
      const open = location.hash.slice(1);
      if (open) openReader(open);
    }
  });

  // Initial: open deep-linked post or render list
  renderList();
  const initial = location.hash.slice(1);
  if (initial && POSTS.find((p) => p.id === initial)) {
    const post = POSTS.find((p) => p.id === initial);
    activeKind = post.kind;
    tabsEl.forEach((x) => x.classList.toggle("active", x.dataset.kind === activeKind));
    renderList();
    openReader(initial);
  }
})();
