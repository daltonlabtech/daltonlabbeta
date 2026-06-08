# Dalton Lab — Documentação do Site Mobile

> Protótipo e implementação do site mobile-first da Dalton Lab.
> Gerado a partir do design exportado em: `novo-site-dalton-lab-mobile`

---

## Visão Geral

O site da Dalton Lab é uma landing page **dark navy**, mobile-first, que posiciona a empresa como a principal referência brasileira em **Organizações Agênticas**. O protótipo foi criado no Claude Design e o mockup de apresentação simula um iPhone 16 Pro com a navegação real do site embutida em um `<iframe>`.

**Arquivos principais:**
- [`Dalton Lab - Mobile.html`](Dalton%20Lab%20-%20Mobile.html) — Mockup do iPhone com o site embutido (apresentação/demo)
- [`index.html`](index.html) — Página principal (landing page real)
- [`insights.html`](insights.html) — Página de artigos e mídia
- [`quem-somos.html`](quem-somos.html) — Página sobre a empresa e fundadores
- [`css/styles.css`](css/styles.css) — Design system completo
- [`js/`](js/) — Scripts de interatividade

---

## Estrutura de Arquivos

```
dalton-lab-site/
├── Dalton Lab - Mobile.html     # Mockup iPhone (demo/apresentação)
├── index.html                   # Landing page principal
├── insights.html                # Página de insights e mídia
├── quem-somos.html              # Página sobre a empresa
│
├── css/
│   └── styles.css               # Design system completo (dark navy)
│
├── js/
│   ├── main.js                  # Header scroll, menu mobile, scroll reveal
│   ├── i18n.js                  # Internacionalização PT/EN
│   ├── orgchart.js              # Organograma agêntico (canvas)
│   ├── hero-merge.js            # Animação de people-merge no hero
│   ├── sol-motion.js            # Animações das soluções (canvas)
│   ├── cta-outlier.js           # Canvas do gráfico na seção CTA final
│   ├── insights.js              # Cards de insights
│   └── image-slot.js            # Componente de upload de imagem
│
└── assets/
    ├── dalton-lab-logo.png      # Logo wordmark
    ├── dalton-lab-mark.png      # Marca isolada
    ├── foto-jeisys.jpg          # Foto do case Jeisys
    ├── logos/                   # Logos dos clientes (13 arquivos)
    │   ├── accesstage.png
    │   ├── billion-dollar-boy.png
    │   ├── fialdini.png
    │   ├── imperatriz.png
    │   ├── jeisys.png
    │   ├── mundial-mix.png
    │   ├── neogrid.png
    │   ├── practical-center.png
    │   ├── rumo.png
    │   ├── smartrisk.png
    │   ├── umuprev.png
    │   ├── uny.png
    │   └── vero.png
    └── team/                    # Fotos do time
        ├── equipe.jpg
        ├── julio-sm.jpg
        ├── marcelo-sm.jpg
        └── rodrigo-sm.jpg
```

---

## Design System

### Paleta de Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg` | `#0A1628` | Fundo base navy |
| `--bg-deep` | `#060D1A` | Header e footer |
| `--bg-navy` | `#0E1E36` | Fundo dark padrão |
| `--bg-soft` | `#0F2440` | Seções elevadas |
| `--surface` | `rgba(26,58,92,0.18)` | Cards translúcidos |
| `--text` | `#FFFFFF` | Texto principal |
| `--text-dim` | `#8EB4D4` | Texto secundário |
| `--muted` | `#5d7da3` | Texto terciário |
| `--label` | `#5EC8F0` | Labels e tags |
| `--cyan` | `#4CB8E8` | Acento primário (electric cyan) |
| `--cyan-soft` | `#5EC8F0` | Cyan mais claro |
| `--cyan-deep` | `#3A9FD5` | Cyan profundo / linhas decorativas |
| `--orange` | `#F0A04C` | Atenção / aviso |
| `--border` | `rgba(100,160,210,0.15)` | Bordas |
| `--border-2` | `rgba(100,160,210,0.08)` | Bordas sutis |

### Tipografia

| Token | Fonte | Uso |
|-------|-------|-----|
| `--font-sans` | DM Sans (peso 400–800) | Corpo e interface |
| `--font-display` | DM Sans ExtraBold (800) | Headlines e títulos |
| `--font-serif` | Playfair Display Italic | Palavras de destaque em cyan |
| `--font-mono` | JetBrains Mono | Labels, eyebrows, números |

**Google Fonts importadas:**
- DM Sans: `9..40,400;9..40,500;9..40,600;9..40,700;9..40,800`
- JetBrains Mono: `400;500;600`
- Playfair Display: `ital,wght@1,500;1,600`

### Gradientes e Glows

```css
--grad-hero: linear-gradient(135deg, #5EC8F0, #3A9FD5);
--grad-cta:  linear-gradient(135deg, #4CB8E8, #2f87bd);
--glow-cyan: 0 0 40px rgba(76,184,232,0.40);
```

### Sistema de Espaçamento

- **Base:** 8dp (grid de 4/8px)
- `--gutter`: 24px mobile → 48px desktop (≥1000px)
- `--section-y`: 64px mobile → 100px desktop (≥1000px)
- `--radius`: 16px (cards) / `--radius-sm`: 12px

### Breakpoints

| Breakpoint | Largura | Mudanças principais |
|------------|---------|---------------------|
| Mobile | < 720px | Layout base, 1 coluna, carousel horizontal |
| Tablet | ≥ 720px | Grid 2–3 colunas, CTAs em linha |
| Desktop | ≥ 1000px | Nav desktop, org chart horizontal, full desktop |
| Wide | ≥ 1240px | Case grid 4 colunas |

---

## Seções da Landing Page (`index.html`)

### Dobra 1 — Hero

**Componentes:**
- Grid de linhas sutis (fundo)
- Glow radial navy/cyan (decorativo)
- Canvas `#heroViz` — animação de "people merge" (org chart em movimento)
- Headline principal com tipografia display + palavra em Playfair Display italic cyan
- 2 CTAs: primário (fale com especialista) e ghost com arrow (explore soluções)
- Logos ancoradas no fundo em marquee horizontal infinito

**Conteúdo:**
> "Transformando empresas em **Organizações Agênticas**"

**CTAs:**
1. "Fale com um especialista" → `#final`
2. "Explore nossas soluções →" → `#solutions`

**Marquee de clientes:** Jeisys, Rumo, Grupo Mundial Mix, Neogrid, Supermercados Imperatriz, Accesstage, Billion Dollar Boy, Fialdini, Practical Center, SmartRisk, Umuprev, Uny, Vero (duplicados para loop contínuo)

---

### Dobra 3 — Vídeo Institucional

- Frame com aspect-ratio 16:10
- Thumbnail do YouTube: `Xo4xvR7v0l4`
- Poster com overlay de opacidade 0.42
- Botão play circular com blur/backdrop
- Ao clicar: embed do YouTube substitui o placeholder

---

### Dobra 4 — Positioning Statement

```
Somos a startup Service-as-a-Software que transforma 
sua operação em uma Organização Agêntica
```

- Palavras-chave em Playfair Display italic cyan
- Linha decorativa acima e abaixo (`deco-line`)
- Glow ambiente top-left

---

### Dobra 4B — Clientes

- Título eyebrow: "Alguns de nossos clientes"
- Grid 2×3 com logos: Rumo, Grupo Mundial Mix, Supermercados Imperatriz, Neogrid, Accesstage, Jeisys
- Logos filtradas em branco (brightness 0 + invert)
- Ajuste de alturas por logo (ícones quadrados vs wordmarks)

---

### Dobra 5 — Organograma Agêntico

**Canvas animado** renderizado via `orgchart.js`:
- Nó CEO no topo (card com avatar, nome, cargo)
- 4 áreas funcionais em colunas:
  - Comercial & Marketing
  - Operações & Dados
  - Tecnologia & Produto
  - Financeiro & Jurídico
- Agentes de IA dentro de cada área em grid 2 colunas
- 3 estados visuais:
  - `active` — cyan glow + animação de ring pulsante
  - `warn` — laranja pulsante
  - `off` — cinza/opacidade reduzida
- Conectores SVG com animação de draw-in
- Animação de entrada: nodes surgem de baixo (translateY + opacity)

---

### Dobra 6 — Soluções (Carousel)

4 cards na metodologia Dalton Lab:

| # | Nome | Descrição |
|---|------|-----------|
| 01 | Imersão Agêntica | Visão executiva de onde a IA gera valor |
| 02 | Sprint Agêntico | Agentes desenvolvidos para vantagem competitiva |
| 03 | Operação Agêntica | Estrutura para escalar IA em toda a empresa |
| 04 | Cultura Agêntica | Capacitação, treinamento e habilitação |

- Carousel horizontal com scroll-snap
- Canvas animado em cada card (via `sol-motion.js`)
- Controles de seta (← →)
- 78% da largura por card no mobile

---

### Dobra 7 — Casos

**Destaque — Jeisys (featured case):**
- Layout foto + texto lado a lado (desktop)
- Foto com overlay dark 40%
- Métrica em destaque: **49 processos** redesenhados com IA
- Subtítulo: "Estrutura agêntica operando em mais de 50 países"

---

### Dobra 8 — CTA Final

- Headline: "Seja uma **Organização Agêntica**"
- Subtext: "Confie em quem te guia da forma correta pela transformação."
- CTA primário: "Fale com um especialista" → `mailto:contato@daltonlab.ai`
- Canvas de fundo com gráfico "outlier" animado (`cta-outlier.js`)

---

### Dobra 9 — Insights

4 cards horizontais (carousel no mobile, 4 colunas desktop):

| # | Tipo | Data | Título | Fonte |
|---|------|------|--------|-------|
| 1 | Artigo | Mai 2026 | Como empresas brasileiras estão redesenhando processos com agentes de IA | Valor Econômico |
| 2 | Análise | Abr 2026 | A nova geração de consultoria de IA: do hype à operação real | Exame |
| 3 | Pesquisa | Mar 2026 | Agentic organizations: the next frontier of enterprise AI | MIT Tech Review |
| 4 | Paper | 2026 | AI Last, Not First: por que a ordem da transformação importa | Dalton Lab |

---

### Footer

- Logo Dalton Lab (wordmark)
- Texto: "© 2026 Dalton Lab. Todos os direitos reservados."
- Links sociais: LinkedIn, YouTube, Spotify, Instagram
- Links legais: Política de Privacidade, Termos de Uso

**Redes sociais:**
- LinkedIn: `linkedin.com/company/dalton-lab/`
- YouTube: `youtube.com/@dalton_lab`
- Spotify: `open.spotify.com/show/4fnDNmjCB0EQzT7HlmCUr4`
- Instagram: `instagram.com/daltonlab.ai`

---

## Header e Navegação

### Desktop (≥ 1000px)
- Logo à esquerda
- Nav central absoluto: Soluções / Casos / Insights / Sobre
- Direita: toggle PT/EN + botão "Fale conosco"

### Mobile (< 1000px)
- Logo à esquerda
- Direita: toggle PT/EN + hamburger
- Menu sheet desliza de cima ao abrir
- Links do sheet: Soluções (01) / Casos (02) / Insights (03) / Sobre (04) + CTA

**Comportamento scroll:** header ganha `backdrop-filter: blur(20px)` após scroll > 12px.

---

## Scripts JavaScript

### `main.js`
- Scroll listener para classe `.scrolled` no header
- Toggle do menu mobile (burger ↔ sheet)
- Fechar menu ao clicar em links
- Scroll reveal: Intersection Observer nas `.reveal`
- Inicialização do idioma salvo em localStorage

### `i18n.js`
- Objeto `window.I18N` com chaves PT e EN
- `window.applyLang(lang)` aplica textos via `[data-i18n]`
- Suporte a `{b}texto{/b}` para tags `<b>` inline
- Salva preferência em `localStorage('dl_lang')`

### `orgchart.js`
- Renderiza o organograma agêntico em canvas SVG
- Estrutura: CEO → 4 Áreas → Agentes (com status dinâmico)
- Animação de entrada orquestrada com delay por camada
- Conectores SVG com animação `stroke-dashoffset`
- Ticker de tarefas processadas (contagem animada)

### `hero-merge.js`
- Canvas do hero: simula nós de pessoas se conectando
- Partículas com linhas de conexão em cyan translúcido
- Responde ao tamanho do container

### `sol-motion.js`
- Canvas de visualização em cada card de solução
- 4 animações distintas por tipo: `immersion`, `sprint`, `operation`, `culture`
- IntersectionObserver para iniciar apenas quando visível

### `cta-outlier.js`
- Canvas do gráfico "outlier" na seção CTA final
- Curva de dispersão com ponto outlier destacado em cyan

### `image-slot.js`
- Web Component `<image-slot>` para upload drag-and-drop
- Aceita imagens via drag, click ou clipboard
- Props: `src`, `shape`, `radius`, `placeholder`

### `insights.js`
- Carousel de insights com navegação por setas
- Mesma lógica do carousel de soluções

---

## Mockup iPhone (`Dalton Lab - Mobile.html`)

Arquivo de apresentação que simula um **iPhone 16 Pro** na cor titânio:

**Estrutura do dispositivo:**
- Bezel: `402 × 874px` com `border-radius: 58px`
- Padding interno: 13px → screen com `border-radius: 46px`
- Dynamic Island: `116 × 33px` centrado no topo
- Status bar: 9:41, ícones de rede/wifi/bateria
- Home indicator: barra branca no fundo
- Botões laterais: silent, vol-up, vol-dn, power

**Scaling responsivo:**
```js
var FRAME_W = 402, FRAME_H = 874, MARGIN = 36;
s = Math.min((vw - MARGIN) / FRAME_W, (vh - MARGIN) / FRAME_H);
s = Math.min(s, 1.15);
```
O dispositivo escala automaticamente para caber no viewport sem ultrapassar 115% do tamanho original.

**Hint chip:** Aparece por 5,2s com animação de fade e texto "Role dentro do iPhone · PT / EN e menu no topo"

---

## Internacionalização (PT / EN)

O site suporta dois idiomas. Ativação via botões no header. A preferência é salva em `localStorage`.

**Chaves de conteúdo traduzidas:**
- Navegação (nav.*)
- Hero (hero.*)
- Positioning (pos.*)
- Clientes (clients.*)
- Organograma (org.*)
- Soluções (sol.*)
- Casos (cases.*)
- CTA final (final.*)
- Insights (ins.*)
- Footer (footer.*)

---

## Animações e Motion

| Elemento | Tipo | Duração |
|----------|------|---------|
| Scroll reveal | `opacity + translateY` | 600ms ease-out |
| Strike underline (hero) | `scaleX 0→1` | 850ms cubic |
| Marquee logos | `translateX` loop | 110s linear |
| Agent ring pulse | `scale + opacity` | 2s infinite |
| Agent warn blink | `opacity` | 1.4s infinite |
| Connector draw-in | `stroke-dashoffset` | 1s ease |
| Header blur | `backdrop-filter` | 400ms |
| Sheet menu | `translateY` | 450ms cubic |
| Button hover | `translateY(-2px)` | 300ms |
| Card hover | `translateY(-3px)` | 400ms |
| Canvas hero | `requestAnimationFrame` | contínuo |

**Suporte a `prefers-reduced-motion`:** todas as animações são desabilitadas (duração 0.001ms).

---

## Acessibilidade

- `aria-label` em todos os botões de ícone
- `aria-hidden="true"` em SVGs decorativos
- `role="group"` no seletor de idioma
- `alt` descritivo em todas as imagens de conteúdo
- `:focus-visible` com outline cyan de 3px
- `loading="lazy"` em imagens fora do hero
- `scroll-behavior: smooth` com fallback para reduced-motion

---

## Performance

- Fontes com `font-display: swap` via Google Fonts
- Imagens com `loading="lazy"` nas seções abaixo do fold
- Canvas com `will-change: transform` apenas no device-scaler
- Overflow controlado: `overflow-x: clip` no html (mais robusto no iOS)
- Animações apenas com `transform` e `opacity` (sem layout thrashing)

---

## Emails e Contatos

- **CTA principal:** `contato@daltonlab.ai`
- **LinkedIn:** [linkedin.com/company/dalton-lab](https://www.linkedin.com/company/dalton-lab/)
- **YouTube:** [youtube.com/@dalton_lab](https://youtube.com/@dalton_lab)

---

## Notas de Implementação

1. **O `Dalton Lab - Mobile.html` é um arquivo de apresentação/demo**, não a página de produção. Ele embute o `index.html` em um iframe dentro de um mockup de iPhone.

2. **O `image-slot` no case da Jeisys** é um Web Component que permite drag-and-drop de fotos no protótipo. Em produção, substituir pela tag `<img>` direta.

3. **O Tweaks Panel** (React + Babel) carregado no fim do `index.html` é exclusivo do protótipo. Em produção, remover os scripts de tweaks e os arquivos `tweaks.jsx` / `tweaks-panel.jsx`.

4. **O organograma** é renderizado via Canvas (não SVG). Os dados dos agentes estão hardcoded em `orgchart.js`. Para versão dinâmica, substituir pelo feed da API da Dalton OS.

5. **O gráfico outlier** no CTA final (`cta-outlier.js`) é puramente decorativo/conceitual.

6. **Os logos de clientes** precisam de approval legal antes de exibição pública. Os arquivos existem em `assets/logos/`.
