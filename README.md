# Dalton Lab — Site

Site institucional do **Dalton Lab** (Organizações Agênticas). Site estático,
bilíngue (PT/EN), sem build step — HTML, CSS e JavaScript puro.

## Como rodar

Por usar `fetch`/módulos e caminhos relativos, sirva a pasta por um servidor
estático (abrir o arquivo direto via `file://` pode bloquear alguns recursos):

```bash
# Python 3
python3 -m http.server 8000

# ou Node
npx serve .
```

Depois acesse `http://localhost:8000/index.html`.

Para publicar no **GitHub Pages**, basta subir esta pasta e apontar o Pages para
a raiz (`/`). O `index.html` é a página inicial.

## Estrutura

```
.
├── index.html                 # Home (hero, vídeo, posicionamento, clientes,
│                              #   organograma, metodologia, casos, CTA, conteúdos)
├── casos.html                 # Casos — grade de prévias + leitor em formato artigo
├── insights.html              # Conteúdos — Mídia / Artigos / Insights (com leitor)
├── quem-somos.html            # Quem Somos (empresa + fundadores)
├── privacidade.html           # Política de Privacidade
├── termos.html                # Termos de Uso
│
├── Dalton Lab - Desktop.html  # Moldura de preview (navegador) — embute index.html
├── Dalton Lab - Mobile.html   # Moldura de preview (iPhone)    — embute index.html
│
├── css/
│   └── styles.css             # Todos os estilos do site
│
├── js/
│   ├── i18n.js                # Dicionário PT/EN + troca de idioma
│   ├── main.js                # Header, menu mobile, carrosséis, scroll-reveal
│   ├── image-slot.js          # Web component <image-slot> (foto arrastável)
│   ├── orgchart.js            # Animação do organograma agêntico (canvas)
│   ├── hero-merge.js          # Animação do hero (canvas)
│   ├── sol-motion.js          # Animações dos cards de metodologia
│   ├── cta-outlier.js         # Animação do CTA final (canvas)
│   ├── insights.js            # Render da página de Conteúdos + leitor de artigos
│   ├── articles-data.js       # Artigos, insights e mídia (lote inicial)
│   └── articles-extra.js      # Artigos adicionais (lote novo)
│
└── assets/
    ├── dalton-lab-logo.png    # Logo (cabeçalho/rodapé)
    ├── foto-jeisys.jpg        # Foto do card Jeisys (home)
    ├── logos/                 # Logos de clientes (marquee + cards)
    ├── team/                  # Fotos da equipe / fundadores
    ├── media/                 # Thumbs das matérias de imprensa
    └── papers/                # Paper "Framework Agêntico" (PDF)
```

## Idiomas (i18n)

Os textos vêm de `js/i18n.js` (objeto `window.I18N` com `pt` e `en`). Elementos
no HTML usam `data-i18n="chave"`; o conteúdo da página de Conteúdos é definido em
`js/articles-data.js` e `js/articles-extra.js` com pares `{ pt, en }`.

> Observação: os 9 artigos mais recentes (em `articles-extra.js`) estão em
> Português; no modo EN exibem o texto em PT até serem traduzidos.

## Notas

- **Tweaks panel** (`tweaks.jsx`, `tweaks-panel.jsx`): painel de ajustes usado em
  tempo de design. Fica oculto em produção (só aparece quando habilitado pelo
  editor), então não afeta o site publicado.
- **Fontes**: carregadas via Google Fonts (Bricolage/DM Sans, JetBrains Mono,
  Playfair Display) — requer conexão.
- **Sem dependências de build**: nada de npm install para o site; o React/Babel
  usados pelas molduras de preview e pelo painel de Tweaks vêm de CDN.

---

© 2026 Dalton Lab. Todos os direitos reservados.
