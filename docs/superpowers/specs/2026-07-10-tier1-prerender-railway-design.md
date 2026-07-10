# Tier 1 — Prerender por snapshot + migração Vercel → Railway

**Data:** 2026-07-10
**Status:** desenho aprovado no macro (aguardando revisão do spec)
**Cofre relacionado:** `projetos-internos/site-seo-geo/` → `contexto/hosting-railway-tier1.md`, `contexto/priorizacao-tiers.md`, `handoffs/2026-07-10-tier-0-concluido.md`

---

## 1. Objetivo (resultado, não código)

Fazer o conteúdo de cada rota pública (**foco: artigos**) aparecer no HTML **sem depender de JavaScript**, para:
- **Crawlers de LLM** (GPTBot / ClaudeBot / PerplexityBot) — o coração do GEO;
- **bingbot** (que renderiza JS mal);
- **preview de link social** (WhatsApp / LinkedIn / Slack).

Mantendo o SPA para humanos e o conteúdo **fresco** (artigo novo crawlable em minutos). Como parte da entrega, **migrar o hosting da Vercel para a Railway**.

## 2. Problema (por que agora)

O site é um **SPA Vite**. Na Vercel, todo request é reescrito para `index.html`. O conteúdo do artigo (`useArticle` → Sanity via React Query) e as meta/canonical (`<Seo>` via react-helmet-async) são injetados **no cliente**. Um bot sem-JS que abre `/artigos/<slug>` recebe o **hero da home** — título errado, zero corpo, sem canonical.

- **Googlebot** renderiza JS → o Tier 0 já resolveu duplicação/identidade para ele.
- **LLM crawlers / bingbot / scrapers sociais** **não** renderizam → veem o casco. É o `Discovered but not crawled` observado no Bing.

O Tier 1 fecha exatamente essa lacuna: **conteúdo no HTML sem JS**.

## 3. Critérios de sucesso

1. `curl`/bot sem-JS em `/artigos/<slug>` retorna **título + descrição + corpo** do artigo.
2. Preview de link (WhatsApp/LinkedIn) mostra título/descrição corretos por rota.
3. Nos dias seguintes ao cutover: GSC/Bing migram de "descoberto" para **"rastreado/indexado"**.
4. Publicar/editar artigo no Sanity → versão crawlable **no ar em minutos**, sem ação manual.
5. Cutover **sem downtime perceptível**, com rollback disponível.

## 4. Decisões (aprovadas)

| # | Decisão | Motivo |
|---|---|---|
| D1 | Prerender por **snapshot headless** (Playwright/Chromium no build), não SSR | Evita tornar a árvore client-heavy (framer-motion, mapas, charts, analytics) SSR-safe |
| D2 | **SSG + webhook** Sanity→redeploy | Artigo novo crawlable em minutos sem trabalho manual |
| D3 | **Migrar para Railway** | Chromium roda sem atrito; resolve o ToS não-comercial do Hobby/free da Vercel; já pagamos |
| D4 | **apex→www (308) na própria Railway** (middleware do servidor); Cloudflare fica **DNS-only** | Menos variáveis no cutover; versionado no repo; rollback = só DNS. Ver `hosting-railway-tier1.md` |
| D5 | Escopo = **sitemap atual (6 rotas) + todos os artigos**; `/casos` **fora** | `/casos` não é linkado e tem **nomes reais de cliente** — indexá-lo é decisão futura de marketing |
| D6 | **pt-BR apenas** | Hoje há 1 URL por rota (idioma detectado no cliente); multilíngue exige URLs por idioma = projeto à parte |
| D7 | **Previews por PR na Railway** | Preserva o fluxo de o time revisar mudanças numa URL antes da main |
| D8 | **Cutover: Diego valida o staging** antes do flip de DNS | Controle de PM sobre o resultado antes de produção |

**Defaults assumidos** (não são pontos de decisão, mas ficam registrados):
- **OG social:** imagem padrão da marca (design é "sem imagens nos artigos"); OG por artigo fora de escopo.
- **Analytics:** mantém PostHog + Hotjar + GTM; sai apenas o **Vercel Speed Insights** (métrica redundante).
- **Frescor:** o webhook dispara redeploy só em **publicação/edição de artigo** no Sanity.

## 5. Escopo

**Dentro (rotas prerenderizadas):** `/`, `/produto`, `/quem-somos`, `/artigos`, `/politica-de-privacidade`, `/termos-de-uso` + `/artigos/<slug>` (todos os artigos publicados).

**Fora:** `/newton` (disallow no robots), `/casos` e `/casos/:slug` (não linkado; nomes de cliente), `/artigos/insight/:id` (rota dinâmica não-canônica), `*` (404). Também fora: URLs multilíngues, OG por artigo, `/casos` rastreável.

---

## 6. Arquitetura

### Fase 1 — Prerender + build Dockerizado *(código; validável isolado em staging)*

**Pipeline de build:**
1. `vite build` gera o SPA em `dist/` (com o `prebuild` do sitemap como hoje).
2. Novo passo `postbuild` (snapshot): sobe `dist/` num servidor local → **Playwright/Chromium** visita cada rota → espera o **sinal de "pronto"** → salva o HTML renderizado em `dist/<rota>/index.html`.
   - Lista de rotas = `STATIC_ROUTES` + a query de artigos, **reaproveitadas de `scripts/generate-sitemap.mjs`** (fonte única).
3. **Servidor estático** (runtime) serve `dist/` reproduzindo o comportamento do `vercel.json`:
   - fallback SPA (rota sem arquivo → `index.html`);
   - `no-cache` no `index.html`; `immutable` em `/assets/*` e mídia;
   - **trailing-slash coerente com o canonical** (`/produto` sem barra serve o arquivo, sem redirect que brigue com o canonical);
   - **middleware 308 apex→www**.

**Empacotamento:** Docker multi-stage — *build stage* a partir da imagem oficial do Playwright (Chromium embutido) → `npm ci` → `npm run build`; *runtime stage* enxuto (node slim) servindo só o `dist/` (**sem Chromium em runtime**).

**Sinal de "pronto":** o app sinaliza prontidão (flag/atributo no root) quando os dados do artigo resolvem, para o Playwright não fotografar o loader. Fallback: `networkidle` + timeout. *(Mecanismo exato definido no plano de implementação.)*

**Hidratação:** definir estratégia para evitar flash/mismatch para o humano (render por cima vs. `hydrateRoot`). *(Item do plano; bots não dependem disto.)*

**Guard-rails** (herdam a filosofia do sitemap):
- Sanity falhou / 0 artigos → **build falha** (não sobrescreve saída boa).
- Snapshot de rota crítica vazio/erro → **build falha** (nunca publicar casco vazio).

**Env vars no build (Railway):** `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (todas `VITE_*` → inlined em build).

**Spike de viabilidade (fazer cedo):** confirmar que o Chromium roda no build da imagem Railway (tempo, memória) e medir o tempo total de build com ~20 artigos.

### Fase 2 — Cutover para produção *(infra/ops; runbook + rollback)*

**Pré-requisito:** Fase 1 **verde** em domínio temporário da Railway, **validada por Diego** + checklist.

**Passos:**
1. Deploy na Railway em domínio temporário; validar tudo: rotas com conteúdo sem-JS, headers, redirect apex→www, `robots.txt`/`sitemap.xml`, smoke com JS desligado.
2. Baixar o **TTL do DNS** (Cloudflare).
3. Apontar `www.daltonlab.ai` (CNAME) → Railway; apontar o **apex** → Railway (CNAME flattening) para o 308 funcionar. SSL via Railway (Let's Encrypt). **Vercel fica intacta.**
4. Verificar em produção: canonical/sitemap; **re-inspecionar GSC + Bing** e reenviar o sitemap.
5. **Soak** (alguns dias) → remover Vercel (`vercel.json`, `@vercel/speed-insights`) e decommissionar.

**Rollback:** repontar o CNAME (`www` e apex) de volta para a Vercel — mantida no ar durante o soak.

**Frescor:** webhook do Sanity (on publish/update de `article`) → deploy hook da Railway → rebuild + snapshot. **CI/CD:** deploy no push da `main`. **Previews:** ambiente por PR na Railway.

---

## 7. Testes e aceitação

**Automatizados:**
- Unit: enumeração de rotas (estende os testes existentes do sitemap).
- Pós-build: cada HTML gerado contém title/description/canonical corretos; artigos contêm um trecho do corpo — verificado lendo o arquivo (sem JS).
- Smoke: rota prerenderizada aberta com JS desligado exibe o conteúdo.

**Aceitação (PM, em staging):** abrir 2–3 artigos + páginas fixas com **JS desligado** e ver o conteúdo; `curl` simulando bot mostra o corpo; headers corretos; apex→www redireciona.

## 8. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Chromium no build da Railway | Imagem oficial do Playwright; **spike cedo** antes de escrever muito código |
| Trailing-slash/redirect brigando com o canonical | Teste explícito de cada rota |
| Flash/mismatch de hidratação (UX humano) | Estratégia definida no plano; não afeta bots |
| Cutover DNS/SSL | Domínio temporário validado, TTL baixo, rollback por DNS, Vercel mantida no soak |

## 9. Fora de escopo (futuro)

- URLs multilíngues (`/en/...`).
- OG por artigo.
- `/casos` rastreável.
- Redirect apex→www na **borda do Cloudflare** (otimização; exigiria proxiar o apex).

## 10. Referências de código

`src/components/Seo.tsx` · `src/lib/excerpt.ts` · `scripts/generate-sitemap.mjs` · `src/App.tsx` · `index.html` · `public/robots.txt` · `vercel.json`.
