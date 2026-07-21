# Handoff: Tier 1 — Cutover DNS Vercel → Railway (produção no ar)

**Data:** 2026-07-21
**Status:** Cutover concluído e validado. Em **soak** (Vercel intacta como rollback). Fase 2 tem passos de ops pendentes (não bloqueiam o resultado).

## 1. Objetivo
Servir cada rota pública do site daltonlab.ai como HTML estático **sem JS** — pra crawlers de LLM (GPTBot/ClaudeBot/PerplexityBot), bingbot e preview social — via prerender por snapshot headless no build, hospedado na Railway. Hoje: completar a **Fase 2 (cutover de DNS)** que estava pendente há ~10 dias, colocando a Railway em produção no lugar da Vercel. O resultado foi entregue: crawlers agora recebem o HTML completo dos artigos.

## 2. Contexto essencial
- **Stack:** React 18 + Vite 5 + TS; Playwright (Chromium) no `postbuild` gera o snapshot; Express (`server.mjs`) no runtime; Docker multi-stage; Railway.
- **Host canônico:** `https://www.daltonlab.ai` (fonte única em `shared/site.mjs`).
- **Branch do código:** `docs/tier1-prerender-railway-2` (PR **#10**, OPEN → `main`). O working dir da sessão estava em `docs/tier1-prerender-railway` (só docs).
- **Decisão de topologia (tomada hoje — Opção A):** reusar o serviço de staging `daltonlabbeta` como produção, mantendo-o buildando da branch durante o soak. O merge do PR na `main` é o **último** passo (o `postbuild` com Chromium quebra o build da Vercel, então não pode ir pra `main` enquanto a Vercel serve produção).
- **Cloudflare fica DNS-only** (nuvem cinza) — necessário pro 308 apex→www da Railway e pra emissão do SSL Let's Encrypt.
- **Railway:** project `awake-connection` (`37a615b7-9f83-491f-9f9d-b10b0a09439a`), service `daltonlabbeta` (`ddb426bb-e1d6-4c5c-9ba4-f9d36965dd1f`), env `production`. Domínio temp de staging: `daltonlabbeta-production.up.railway.app`.

## 3. O que já foi feito (hoje, cronológico)
1. **Recon de tooling:** Railway CLI (logado Dalton Lab/operacional), Vercel CLI (logado diegodeoliveira), gh. **Sem CLI de Cloudflare.**
2. **Corrigido o link da Railway CLI** — estava apontando pro projeto errado (`radar-instagram-data`); relinkado pra `awake-connection`/`daltonlabbeta`/production.
3. **Puxadas as envs de produção da Vercel** (`vercel link` no projeto `daltonlabbeta` team `diego-de-oliveiras-projects-33dcf986` + `vercel env pull`). Os 6 `VITE_*` confirmados lá.
4. **Setadas na Railway as 4 `VITE_*` que faltavam** (`VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`) via `railway variables --set --skip-deploys`. As 2 do Sanity já estavam.
5. **Rebuild** (Diego rodou `railway redeploy` — CLI da conta operacional é bloqueada pra deploy/domínio). Confirmado empiricamente que **rebuildou** (não reusou cache): o ref do Supabase `mhqpgufenjckblgmakko` e `us.i.posthog.com` passaram a aparecer no bundle servido.
6. **Validado staging** verde com os 6 vars.
7. **Adicionados os domínios custom** na Railway (via painel): `www.daltonlab.ai` e `daltonlab.ai`, port 8080.
8. **Cutover no Cloudflare:** `www` → CNAME `rt9arhdg.up.railway.app`; apex `@` → deletado o A da Vercel (`216.198.79.1`) e criado CNAME `d87dnrkb.up.railway.app`. Ambos DNS-only.
9. **Downtime (~15min):** o https quebrou porque a Railway não emitia o cert (servia `*.up.railway.app`). **Causa-raiz:** a Railway exige, além do CNAME, um **TXT de verificação por domínio** — sem eles trava em "Waiting for DNS update". Descoberto no dialog "Show DNS records" da Railway.
10. **Adicionados os 2 TXT** no Cloudflare: `_railway-verify` (apex) e `_railway-verify.www` (www). Cert Let's Encrypt emitiu ~3min depois.
11. **Validação final de produção — tudo verde** (ver seção 4).
12. **Criado o skill `eighty-twenty`** (off-topic) em `~/.claude/skills/eighty-twenty/` via TDD (baseline RED + GREEN verificado).

## 4. Estado atual
**Produção no ar pela Railway, servindo o prerender.** Validado por curl:
- `https://www.daltonlab.ai/` → **200**, `server: railway-hikari` (não é mais Vercel), `cache-control: no-cache, must-revalidate`.
- Artigo sem-JS: `<title>` correto, `<link rel="canonical">` per-rota em www, **21 `<p>`** de corpo, 69KB (não é casco SPA).
- Apex: `https://daltonlab.ai/produto` → **308** → `https://www.daltonlab.ai/produto`.
- `sitemap.xml` = 27 URLs; `robots.txt` = 200.
- Cert: `CN=www.daltonlab.ai` (válido).
- **Vercel:** intacta, serve como rollback durante o soak.
- Monitores de background: ambos encerrados.

## 5. Próximos passos (ordenados; soak/ops)
1. **Soak** alguns dias observando produção na Railway. Não mexer na Vercel.
2. **Re-inspeção GSC + Bing** e reenvio do sitemap `https://www.daltonlab.ai/sitemap.xml` (manual, precisa dos consoles).
3. **Webhook de frescor** Sanity → rebuild da Railway. ⚠️ Tem que disparar **BUILD novo** (não `redeploy`, senão não re-roda o prerender). Caminho recomendado: Sanity (manage.sanity.io → API → Webhooks, filtro `_type=="article"` on publish/update) → n8n → API da Railway (rebuild). Alternativa crua: commit vazio na branch conectada.
4. **Fechamento (último passo, só pós-soak):** merge do PR #10 na `main` → repontar o serviço Railway pra `main` → remover `vercel.json` e `@vercel/speed-insights` (do `App.tsx`) → decomissionar a Vercel.

**Rollback (se necessário durante o soak):** no Cloudflare, apex → `A @ 216.198.79.1`; www → `CNAME www cname.vercel-dns.com` (ou `A www 216.198.79.1`). Vercel volta a servir.

## 6. Perguntas em aberto
- Webhook de frescor via n8n (recomendado) ou outro mecanismo? Montar agora ou pós-soak?
- Quando executar a re-inspeção GSC/Bing — agora ou após confirmar estabilidade do soak?
- Definir o gatilho de "fim do soak" (quantos dias / que sinais) antes do merge na main.

## 7. Artefatos relevantes
- **PR:** https://github.com/daltonlabtech/daltonlabbeta/pull/10 (OPEN, não mergear até o fim do soak).
- **Handoff da Fase 1:** `docs/superpowers/handoffs/2026-07-10-tier1-fase1-staging.md` (no branch do PR).
- **Spec/plano:** `docs/superpowers/specs/2026-07-10-tier1-prerender-railway-design.md`, `docs/superpowers/plans/2026-07-10-tier1-prerender-railway.md`.
- **Arquivos-chave (branch PR):** `server.mjs` (308 apex→www: lê `req.headers.host`, redirect pro `SITE_URL`), `shared/site.mjs` (`SITE_URL`), `scripts/prerender.mjs`, `Dockerfile`, `railway.json`, `src/lib/prerender-ready.ts`.
- **Registros DNS de produção (Cloudflare, zone daltonlab.ai):**
  - `www` CNAME → `rt9arhdg.up.railway.app` (DNS-only)
  - `@` (apex) CNAME → `d87dnrkb.up.railway.app` (DNS-only, flattening)
  - `_railway-verify` TXT → `railway-verify=4af35e992c9db734e67b777eaba5e6d47c7182978a0f87f3afea0efd5662688e`
  - `_railway-verify.www` TXT → `railway-verify=097d62df2888b759426a9282e76e46d67647ab5c37d034dd0c8b4c5e57b052e7`
- **Comandos úteis:**
  ```bash
  # link Railway (conta operacional; whoami/status/variables OK, mas deploy/domain BLOQUEADOS via CLI)
  railway link --project awake-connection --environment production --service daltonlabbeta
  railway variables | grep VITE_
  # validar produção sem JS
  curl -s https://www.daltonlab.ai/artigos/<slug> | grep -E '<title>|rel="canonical"'
  # checar 308 apex->www
  curl -sI https://daltonlab.ai/produto | grep -iE '^(HTTP|location)'
  # cert
  echo | openssl s_client -connect www.daltonlab.ai:443 -servername www.daltonlab.ai 2>/dev/null | openssl x509 -noout -subject
  ```

## 8. Instruções pra próxima sessão
- **Tom:** PT-BR, direto, hands-on. Diego é PM técnico — explicar o "porquê" das decisões de infra. Ele pediu **80/20** (skill `eighty-twenty`) e **contexto amplo antes de detalhe**.
- **Armadilha nº1 (Railway):** domínio custom exige **CNAME + TXT `_railway-verify` por domínio**. Adicionar os 4 registros de uma vez pra não repetir o downtime.
- **Armadilha nº2:** qualquer build na Railway precisa das 6 `VITE_*` setadas, senão bundle sai com Sanity vazio → artigos caem no fallback SPA.
- **Armadilha nº3:** frescor = **BUILD** novo, não `redeploy` (redeploy não re-roda o prerender de forma garantida... na verdade rebuilda, mas confirmar; o handoff da Fase 1 alerta pra usar build/rebuild).
- **NÃO mergear o PR #10 na `main` até o fim do soak** — quebra o build da Vercel.
- A conta `operacional` na Railway CLI **não tem permissão** pra `redeploy`/`domain` — usar o painel ou pedir ao owner. Leitura (`whoami`/`status`/`variables`) funciona.
- Sempre validar empiricamente (curl/openssl), nunca assumir.
