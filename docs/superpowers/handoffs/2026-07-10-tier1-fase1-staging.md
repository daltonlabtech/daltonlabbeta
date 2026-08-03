# Handoff: Tier 1 — Prerender + Railway (Fase 1 validada em staging)

**Data:** 2026-07-10 (sexta, ~17h)
**Status:** Fase 1 completa e validada em staging pelo Diego. Fase 2 (cutover DNS) pendente — retomar segunda-feira. **NÃO deployar/mergear hoje.**

## 1. Objetivo
Servir o conteúdo de cada rota pública (foco: artigos) como HTML estático **sem JS** — pra crawlers de LLM (GPTBot/ClaudeBot/PerplexityBot), bingbot e preview social — via snapshot headless no build, hospedado na Railway. Mantém o SPA pros humanos. Fecha a lacuna do `Discovered but not crawled` do Bing. Parte da entrega é migrar hosting Vercel → Railway.

## 2. Contexto essencial
- **Stack:** React 18 + Vite 5 + TS; testes Vitest; Playwright (Chromium) no build; Express no runtime; Docker multi-stage; Railway.
- **Spec/plano:** `docs/superpowers/specs/2026-07-10-tier1-prerender-railway-design.md` e `docs/superpowers/plans/2026-07-10-tier1-prerender-railway.md` (commitados na branch; `docs/` está no `.gitignore` mas os arquivos são tracked via `-f`).
- **Branch:** `docs/tier1-prerender-railway-2` (HEAD `fd7e3e0`). **PR #10** aberto → `main` (OPEN, não mergear ainda).
- **Host canônico:** `https://www.daltonlab.ai` (fonte única em `shared/site.mjs`).
- **Escopo prerender:** 6 rotas estáticas + `/artigos/<slug>` (todos). Fora: `/newton`, `/casos*`, `/artigos/insight/:id`, `*`.
- **Decisão de arquitetura:** prerender por snapshot (não SSR); apex→www 308 no próprio Express (Cloudflare fica DNS-only); pt-BR apenas.

## 3. O que já foi feito
- Onda 1 (2 agentes paralelos, worktrees isoladas): Stream A (prerender A1/A2/A3), Stream B (servidor Express B1). Mergeadas.
- Onda 2 (integração): wiring `postbuild`/`start` no package.json; `Dockerfile` multi-stage; `railway.json`; `.dockerignore`.
- `/simplify` aplicado: `SITE_URL` em `shared/site.mjs`; sentinelas lidas da tradução pt; prerender reusa `createApp`; `prerender-ready` enxuto; runtime Docker slim (899MB→404MB, instala só express).
- `/security-review`: sem findings acionáveis.
- **3 bugs reais achados na validação e corrigidos:**
  1. Headless caía em inglês → forçado pt-BR (`localStorage['i18nextLng']='pt'` + `locale`).
  2. Sanity 403 no browser (origem localhost fora do CORS) → prerender remove `Origin`/`Referer` no replay + injeta `access-control-allow-origin`.
  3. **Race de prontidão** (commit `fd7e3e0`): sob build rápido (Railway), o snapshot fotografava o fallback SPA (home) antes do React Router trocar de rota → gravava a home no arquivo do artigo e passava no guard. Corrigido: espera o `canonical` do DOM bater com `SITE_URL+route` E `__PRERENDER_READY__`; timeout vira FALHA do build.
- Build Docker validado local (404MB, `[prerender] OK — 26 rotas`, apex→www 308, headers, conteúdo sem-JS).

## 4. Estado atual
- **Staging no ar e VERDE:** serviço Railway `daltonlabbeta` na branch → `https://daltonlabbeta-production.up.railway.app`. Diego validou. Artigo/listagem/estáticas com conteúdo sem-JS, canonical per-rota, pt-BR; sitemap 26 URLs; robots 200; HTML `no-cache`; asset `immutable`; fallback SPA 200; `ss6d4h78` inlined no bundle.
- **Testes:** `npm run test` → 34/34 verde.
- **Vercel:** produção intacta (`www.daltonlab.ai`), não tocada.
- **Descoberta crítica:** as 6 `VITE_*` NÃO estavam setadas na Railway → build saía com `projectId:""` → artigos caíam no fallback. Setei via CLI as 2 do Sanity (`VITE_SANITY_PROJECT_ID=ss6d4h78`, `VITE_SANITY_DATASET=production` — públicas). **Faltam 4** (pegar da Vercel): `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.

## 5. Próximos passos (Fase 2 — ops manual, segunda-feira)
1. (Opcional p/ staging completo) Setar as 4 vars restantes na Railway → rebuilda sozinho. Só afeta waitlist (Supabase) e analytics (PostHog); SEO já funciona sem.
2. Decidir topologia de produção na Railway (serviço aponta pra `main` com auto-deploy?) — isso define quando o merge acontece.
3. **DNS Cloudflare:** baixar TTL; CNAME `www` → Railway; apex via CNAME flattening → Railway (DNS-only, sem proxy laranja, pro 308 funcionar). SSL via Railway.
4. **Webhook Sanity** (frescor): Sanity (manage.sanity.io → API → Webhooks, filtro `_type=="article"` on publish/update) → precisa disparar um **BUILD novo** (não redeploy, senão não re-roda o prerender). Caminho limpo: Sanity → n8n → API Railway (rebuild). Alternativa crua: commit vazio na branch conectada.
5. Verificar prod: canonical/sitemap; re-inspecionar GSC + Bing; reenviar sitemap.
6. Soak alguns dias → remover Vercel (`vercel.json` + `@vercel/speed-insights` do App.tsx) e **só então mergear o PR na main**.
7. **Rollback:** repontar CNAME `www`/apex de volta pra Vercel (mantida no soak).

## 6. Perguntas em aberto
- Serviço de produção na Railway = novo ou reusar este `daltonlabbeta`? E aponta pra `main` ou pra branch?
- Quer as 4 vars restantes no staging agora, ou só na produção?
- Webhook via n8n (recomendado) ou outro mecanismo?

## 7. Artefatos relevantes
- **PR:** https://github.com/daltonlabtech/daltonlabbeta/pull/10 (comentário com validação de staging já postado).
- **Railway:** project `37a615b7-9f83-491f-9f9d-b10b0a09439a` (awake-connection), service `ddb426bb-e1d6-4c5c-9ba4-f9d36965dd1f` (daltonlabbeta), env production `86f1dd9a-be1d-46e3-89fc-5dd490a38f25`.
- **Arquivos-chave:** `scripts/prerender.mjs`, `server.mjs`, `shared/site.mjs`, `Dockerfile`, `railway.json`, `src/lib/prerender-ready.ts`, `scripts/generate-sitemap.mjs` (exports `getPrerenderRoutes`/`fetchArticleSlugs`).
- **Supabase:** usado só em `src/components/ui/WaitlistModal.tsx` (Edge Function `submit-waitlist`, no CTA final da home `HomeFinalCTASection`). Não impacta SEO.
- **Comandos úteis:**
  ```bash
  # build local (com env do Sanity)
  VITE_SANITY_PROJECT_ID=ss6d4h78 VITE_SANITY_DATASET=production npm run build
  # validar staging sem JS
  curl -s https://daltonlabbeta-production.up.railway.app/artigos/agentes-de-ia-vs-automacao-tradicional | grep -E '<title>|<h1>'
  # Railway CLI (já logado como Dalton Lab)
  railway link --project 37a615b7-9f83-491f-9f9d-b10b0a09439a --environment production --service daltonlabbeta
  railway deployment list
  railway logs --build <deployment-id>
  railway variables --set "CHAVE=valor"
  ```

## 8. Instruções pra próxima sessão
- **NÃO mergear o PR na main até o cutover** — o `postbuild` (Chromium) quebra o build da Vercel (sem Chromium). Merge é o último passo.
- Fase 2 é runbook de ops MANUAL, só com o OK do Diego a cada etapa de DNS.
- Tom: PT-BR, direto, hands-on. Diego é PM técnico — explique o "porquê" das decisões de infra.
- Armadilha nº1: qualquer build na Railway precisa das 6 `VITE_*` setadas, senão bundle sai com Sanity vazio.
- Sempre validar empiricamente (curl/build real), não assumir. O guard-rail do prerender falha o build alto se um artigo não renderizar — é comportamento desejado.
