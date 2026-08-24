# Site novo Dalton Lab — demo da home

Demo de aprovação interna da nova home do site do Dalton Lab, com as duas versões lado a lado.

## Estrutura

| Arquivo | O que é |
|---|---|
| `index.html` | Página de aprovação da home: mobile (390×844) e desktop (1440×900) em iframes, barra de dobras 01–08 e scroll sincronizado |
| `mobile.html` | Home completa na versão mobile |
| `desktop.html` | Home completa na versão desktop |
| `casos-index.html` | Página de aprovação da página de casos (mobile + desktop lado a lado) |
| `casos-mobile.html` | Página de casos na versão mobile (índice com filtro por setor + leitor de caso) |
| `casos-desktop.html` | Página de casos na versão desktop |
| `casos-data.js` | Dados dos 17 casos, compartilhados entre as duas versões |
| `quem-somos-index.html` | Página de aprovação da página Quem Somos (mobile + desktop lado a lado) |
| `quem-somos-mobile.html` | Quem Somos na versão mobile (a empresa + fundadores) |
| `quem-somos-desktop.html` | Quem Somos na versão desktop |
| `conteudos-index.html` | Página de aprovação da página de Conteúdos (mobile + desktop lado a lado) |
| `conteudos-mobile.html` | Conteúdos na versão mobile (destaque + filtro Artigos/Mídia + grade) |
| `conteudos-desktop.html` | Conteúdos na versão desktop |
| `conteudos-data.js` | Dados dos conteúdos: `midia` (11 matérias) e `artigos` (adicionar aqui as publicações do Dalton Lab) |
| `daltonlab-logo.png` | Logo principal (wordmark branca) |
| `logos/` | Logos de clientes (brancas, tamanho visual equalizado) |
| `fotos/` | Foto do time e retratos dos fundadores; `fotos/midia/` tem as imagens das matérias de imprensa |

## Navegação

Todas as páginas são ligadas pelo menu (Metodologia → home, Casos, Conteúdos, Quem Somos); a logo volta à home. Na home, o "Ver todos →" da dobra de Conteúdos e os 4 cards de imprensa abrem as matérias reais. Dentro de casos, o leitor de cada caso usa o hash da URL (`#caso-N`), então o botão voltar do navegador funciona.

Para publicar um artigo do Dalton Lab: adicione um objeto no array `artigos` de `conteudos-data.js` (formato documentado no topo do arquivo) — as duas versões da página atualizam sozinhas.

## Como rodar

Precisa ser servido por HTTP (em `file://` os iframes ficam em origens opacas e o scroll sincronizado e os botões de dobra param de funcionar):

```bash
npx --yes http-server . -p 4490 -c-1
```

Depois abra `http://localhost:4490`.

## Dobras da home

1. Hero — "Not bigger. Agentic."
2. Organograma (coreografia em canvas, scroll das dobras 1–3)
3. Time de uma pessoa só
4. O caminho — "IA por último"
5. A jornada agêntica (4 cards)
6. Agentic Places to Work (logos + CTA de casos)
7. Fecho
8. Conteúdos
