# HANDOFF — Dalton Lab Site
**Data:** 08 de junho de 2026  
**Sessão:** Claude Code — Isabel Souza  
**Repositórios afetados:**
- `daltonlabtech/dalton-lab-site` (site estático legado)
- `daltonlabtech/daltonlabbeta` (novo app React/Vite — alvo principal)

---

## O que existia antes

### `daltonlabtech/dalton-lab-site`
Repositório com o site estático da Dalton Lab. Estrutura:
```
index.html          ← landing page principal
insights.html       ← página de conteúdos
quem-somos.html     ← página sobre
css/styles.css      ← estilos globais
js/                 ← 8 scripts (main, orgchart, i18n, etc.)
assets/             ← logos de clientes, fotos do time, marca
```
Branch padrão: `main` (com 3 commits históricos: v1.0, mobile fixes, tweaks).

### `daltonlabtech/daltonlabbeta`
Repositório com o novo site — **React + Vite + TypeScript + Tailwind + shadcn/ui**.  
Branch principal: `main` (app React ativo).  
Branch em desenvolvimento: `feat/novo-site` (redesign completo com novas seções).

O `feat/novo-site` continha:
- App React com roteamento SPA via React Router v6
- Páginas: `/`, `/quem-somos`, `/artigos`, `/casos`, `/produto`, `/newton`, etc.
- Assets em `public/novo/assets/` (logos, fotos de fundadores, imagens de agentes)
- Entry point Vite: `index.html` na raiz (não é uma página — é o template do Vite)

---

## O que foi feito nesta sessão

### 1. Design file implementado — `Dalton Lab - Mobile.html`

**Origem:** `https://api.anthropic.com/v1/design/h/t5d8fh6-CpXcERag2j_taw`  
O arquivo fonte estava em `C:\Users\Isabe\Downloads\Claude Design\Dalton Lab - Mobile.html` (72 KB).

**O que é:** Página mobile-first standalone com design system novo (fundo `#0a0a0f`, acento âmbar `#ffae35`, fonte Inter). Seções implementadas:

| Seção | O que faz |
|---|---|
| Navbar | Logo + hambúrguer com drawer animado (slide-in lateral) |
| Hero | Badge, headline, 2 CTAs, painel de agentes ao vivo (4 agentes + barra de progresso) e 4 stat-cards |
| Logo ticker | Marquee infinito com as logos reais dos clientes |
| Plataforma Agêntica | Stats gerais + tabs por departamento (Vendas, Marketing, CS, People, Financeiro, CEO Office) + 17 agentes clicáveis + modal bottom-sheet com swipe-to-close |
| Soluções | 3 cards com checklists (Automação, Pessoas/Cultura, IA Aplicada) |
| Metodologia | 4 passos com linha vertical animada |
| Setores | 14 setores com rotação automática no título |
| Plataforma / Trust | 3 métricas (256-bit, LGPD 100%, 99.9% uptime) |
| Casos de Sucesso | 3 casos (Manufatura 68%, Financeiro 3x, Varejo R$2.4M) |
| Footer | Logo, redes sociais reais, links de navegação |
| CTA fixo | Barra fixa no bottom com "Contato" e "Agendar Conversa" |

**Interações JS:**
- Navbar scroll-aware com backdrop blur
- Hambúrguer + drawer com lock de scroll
- Scroll reveal via `IntersectionObserver`
- Tabs de departamento filtram a lista de agentes dinamicamente
- Modal de detalhe do agente: abre ao clicar, fecha com swipe-down ou Esc
- Rotação automática de setor no título a cada 2.4s

---

### 2. PRs criadas em `daltonlabtech/dalton-lab-site`

| PR | Branch | O que adiciona |
|---|---|---|
| [#1](https://github.com/daltonlabtech/dalton-lab-site/pull/1) | `feat/mobile-redesign` | Apenas `Dalton Lab - Mobile.html` com asset paths relativos (`assets/`) |

> ⚠️ Essas PRs foram criadas como passo intermediário — os arquivos finais corretos estão em `daltonlabtech/daltonlabbeta` (ver abaixo).

---

### 3. PRs criadas em `daltonlabtech/daltonlabbeta`

#### PR #1 — `feat/mobile-redesign`
[https://github.com/daltonlabtech/daltonlabbeta/pull/1](https://github.com/daltonlabtech/daltonlabbeta/pull/1)

**Arquivo adicionado:** `public/mobile.html` (+1298 linhas)

**Antes:** Não existia versão mobile standalone no repositório.  
**Depois:** `public/mobile.html` servido estaticamente em `/mobile.html` — fora do React Router, sem necessidade de build.

**Paths de assets corrigidos:**
```
ANTES (PR original, paths errados):
  src="assets/dalton-lab-logo.png"
  src="assets/logos/jeisys.png"

DEPOIS (corrigido para Vite):
  src="/novo/assets/dalton-lab-logo.png"
  src="/novo/assets/logos/jeisys.png"
```
Os assets já existem em `public/novo/assets/` no `feat/novo-site` — nenhum arquivo de imagem foi duplicado.

---

#### PR #2 — `feat/site-completo`
[https://github.com/daltonlabtech/daltonlabbeta/pull/2](https://github.com/daltonlabtech/daltonlabbeta/pull/2)

**Arquivos adicionados:** 11 arquivos, +4932 linhas

| Arquivo | Localização final | Acessível em |
|---|---|---|
| `insights.html` | `public/novo/insights.html` | `/novo/insights.html` |
| `quem-somos.html` | `public/novo/quem-somos.html` | `/novo/quem-somos.html` |
| `css/styles.css` | `public/novo/css/styles.css` | `/novo/css/styles.css` |
| `js/main.js` | `public/novo/js/main.js` | `/novo/js/main.js` |
| `js/orgchart.js` | `public/novo/js/orgchart.js` | `/novo/js/orgchart.js` |
| `js/i18n.js` | `public/novo/js/i18n.js` | `/novo/js/i18n.js` |
| `js/hero-merge.js` | `public/novo/js/hero-merge.js` | `/novo/js/hero-merge.js` |
| `js/sol-motion.js` | `public/novo/js/sol-motion.js` | `/novo/js/sol-motion.js` |
| `js/image-slot.js` | `public/novo/js/image-slot.js` | `/novo/js/image-slot.js` |
| `js/insights.js` | `public/novo/js/insights.js` | `/novo/js/insights.js` |
| `js/cta-outlier.js` | `public/novo/js/cta-outlier.js` | `/novo/js/cta-outlier.js` |
| `SITE_DOCUMENTATION.md` | raiz do repositório | — |

---

### 4. Conflitos de arquitetura resolvidos

O `feat/novo-site` é um app Vite+React. Os arquivos das PRs vinham de um site estático, gerando 5 conflitos:

| # | Conflito | Severidade | O que foi feito |
|---|---|---|---|
| 1 | `index.html` da PR#2 sobrescrevia o entry point do Vite | 🔴 Crítico | Restaurado o `index.html` original do Vite (template com `<div id="root">` e `<script src="/src/main.tsx">`) |
| 2 | `insights.html` e `quem-somos.html` na raiz bypassavam o React Router / Vercel SPA rewrite | 🔴 Crítico | Movidos para `public/novo/` — servidos como arquivos estáticos sem interferir no roteamento React |
| 3 | Paths `assets/` na PR#1 não correspondiam a `public/novo/assets/` | 🟠 Alto | Corrigidos para `/novo/assets/` em todos os `src="..."` do mobile.html |
| 4 | `Dalton Lab - Mobile.html` na raiz não é uma entrada Vite (sem config MPA) | 🟠 Alto | Movido para `public/mobile.html` — Vite copia `public/` para `dist/` sem processar |
| 5 | `css/` e `js/` na raiz não são processados pelo Vite/PostCSS/Tailwind | 🟡 Médio | Movidos para `public/novo/css/` e `public/novo/js/` com paths internos atualizados |

**Arquivos removidos (conflitantes ou duplicados):**
- `index.html` da PR#2 (substituído pelo original do Vite)
- `assets/` raiz (duplicava `public/novo/assets/` — 20 arquivos removidos)
- `Dalton Lab - Mobile.html` da PR#2 (coberto pela PR#1)

**Paths atualizados nos HTMLs movidos:**
```html
<!-- ANTES (paths relativos da raiz) -->
<link href="css/styles.css" rel="stylesheet">
<script src="js/main.js"></script>
<a href="index.html">Home</a>
<a href="insights.html">Insights</a>

<!-- DEPOIS (paths absolutos compatíveis com public/novo/) -->
<link href="/novo/css/styles.css" rel="stylesheet">
<script src="/novo/js/main.js"></script>
<a href="/">Home</a>
<a href="/novo/insights.html">Insights</a>
```

---

## Estado final dos repositórios

### `daltonlabtech/dalton-lab-site`
```
main                    ← site estático legado (inalterado)
feat/mobile-redesign    ← PR#1 aberta (arquivo mobile com paths antigos — substituída pela versão em daltonlabbeta)
```

### `daltonlabtech/daltonlabbeta`
```
main                    ← app React ativo
feat/novo-site          ← redesign React em andamento (base de referência)
feat/mobile-redesign    ← PR#1 ✅ pronta para merge
feat/site-completo      ← PR#2 ✅ pronta para merge
feat/posthog            ← analytics (pré-existente)
staging                 ← branch de staging (pré-existente)
```

---

## O que ainda precisa ser feito (próximos passos)

### Curto prazo (antes do merge)
- [ ] Revisar `public/novo/insights.html` e `public/novo/quem-somos.html` — decidir se ficam como páginas estáticas ou são convertidas para componentes React em `src/pages/`
- [ ] Alinhar design system: o `mobile.html` usa âmbar `#ffae35` como brand color; o `feat/novo-site` usa outra paleta — verificar consistência
- [ ] Testar `public/mobile.html` em viewport 390px (iPhone 14)

### Médio prazo
- [ ] Migrar conteúdo de `public/novo/insights.html` → `src/pages/Artigos.tsx` (já existe no novo-site)
- [ ] Migrar conteúdo de `public/novo/quem-somos.html` → `src/pages/QuemSomos.tsx` (já existe no novo-site)
- [ ] Converter `mobile.html` para componente React com responsividade via Tailwind (eliminar arquivo HTML estático)
- [ ] Configurar `vercel.json` para redirecionar `/novo/insights.html` → `/artigos` depois da migração

### Arquivos de referência
- Design original: `C:\Users\Isabe\Downloads\Claude Design\Dalton Lab - Mobile.html`
- Site legado: `C:\Users\Isabe\Downloads\dalton-lab-site\`
- Brand assets: `C:\Users\Isabe\Downloads\Claude Design\BRAND_ASSETS\`

---

*Gerado por Claude Code — Sessão de 08/06/2026*
