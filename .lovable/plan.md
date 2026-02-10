
# Plano: Otimizacao de Performance (PageSpeed 55 -> 80+)

## Problema Atual

| Metrica | Valor Atual | Meta | Status |
|---------|-------------|------|--------|
| LCP | 15,6s | < 2,5s | Critico |
| TBT | 370ms | < 200ms | Medio |
| FCP | 2,6s | < 1,8s | Medio |
| Speed Index | 7,8s | < 3,4s | Critico |
| CLS | 0 | < 0,1 | OK |

---

## 1. Delay do GTM e Scripts Nao-Essenciais (impacto: TBT e FCP)

**Arquivo:** `index.html`

O GTM esta carregando **sincronamente no head** e puxando Meta Pixel, scripts de chat etc. Isso bloqueia a main thread por centenas de milissegundos.

Mudanca: Adicionar um delay de 3 segundos ao carregamento do GTM, disparando-o somente apos interacao do usuario OU apos timeout.

```text
Antes:
  <head>
    <script> GTM inline (sincrono) </script>
    ...
  </head>

Depois:
  <head>
    <!-- GTM removido do head -->
  </head>
  <body>
    ...
    <script>
      // Delay GTM: carrega apos 3s OU primeira interacao
      function loadGTM() {
        if (window._gtmLoaded) return;
        window._gtmLoaded = true;
        // injeta GTM script
      }
      setTimeout(loadGTM, 3000);
      ['scroll','click','touchstart','keydown'].forEach(e =>
        document.addEventListener(e, loadGTM, {once: true})
      );
    </script>
  </body>
```

Impacto estimado: TBT -150ms, FCP -0.5s

---

## 2. Video Hero: preload="none" + Lazy Start (impacto: LCP)

**Arquivo:** `src/components/sections/HomeHeroSection.tsx`

O video esta com `preload="auto"`, forcando o navegador a baixar o video inteiro antes de considerar o LCP completo. O LCP deveria ser o **texto do titulo** ou o **poster**, nao o video.

Mudancas:
- Video: mudar `preload="auto"` para `preload="none"`
- Iniciar o video somente apos o componente montar (via useEffect com delay)
- Garantir que o poster WebP seja o LCP element

```text
Antes: <video preload="auto" autoPlay ...>
Depois: <video preload="none" ...> (autoPlay removido, play() via JS apos 1s)
```

Impacto estimado: LCP de 15,6s para ~3-4s

---

## 3. Conversao de Imagens PNG para WebP (impacto: Speed Index)

Imagens PNG que devem ser convertidas para WebP (usando o formato nativo ou servindo versoes otimizadas):

| Imagem | Uso | Acao |
|--------|-----|------|
| `logo-dalton-white.png` | Header (todas as paginas) | Converter para WebP |
| `d-branco.png` | PageLoader, Footer, Chat | Converter para WebP |
| `dalton-icon.png` | Branding | Converter para WebP |
| `dalton-lab-text.png` | Lab branding | Converter para WebP |
| `logo-dalton-horizontal-white.png` | Newton page | Converter para WebP |
| `logo-dalton-lab.png` | Lab branding | Converter para WebP |
| `veja-negocios.png` | MediaSection | Converter para WebP |
| `julio.png` | About/Founders | Converter para WebP |
| `founders-photo.jpg` | About | Converter para WebP |
| `team-photo.jpg` | About | Converter para WebP |
| Tech logos (6 PNGs) | Philosophy, HowItWorks | Converter para WebP |

**Nota:** As imagens em `src/assets/agents/`, `src/assets/logos/` e `src/assets/solutions/` ja estao em WebP.

A conversao sera feita gerando versoes WebP e atualizando os imports nos componentes.

---

## 4. Preload do Texto Hero como LCP (impacto: LCP)

**Arquivo:** `index.html`

Adicionar `font-display: swap` ja esta configurado. A melhoria adicional e garantir que a fonte Inter esteja disponivel para o FCP adicionando um preload especifico para o arquivo de fonte mais critico.

**Arquivo:** `src/components/sections/HomeHeroSection.tsx`

Garantir que o texto H1 renderize imediatamente sem depender de animacao:
- Remover o delay de `opacity-0` inicial no titulo (renderizar visivel desde o primeiro frame)
- Manter animacao de slide-up mas com `opacity-100` desde o inicio

---

## 5. Otimizacao do PageLoader (impacto: FCP)

**Arquivo:** `src/App.tsx`

O `PageLoader` importa `d-branco.png` no bundle principal do App. Isso forca o download de um PNG no caminho critico.

Mudanca: Usar um SVG inline minimo ou CSS puro para o loader, removendo a dependencia de imagem.

---

## Resumo de Impacto Esperado

| Mudanca | Metrica Afetada | Reducao Estimada |
|---------|-----------------|------------------|
| GTM delay 3s | TBT, FCP | TBT: -150ms, FCP: -0.5s |
| Video preload=none | LCP | LCP: -10s+ |
| PNGs para WebP | Speed Index | SI: -1-2s |
| Texto hero sem delay | LCP | LCP: -0.5s |
| PageLoader sem PNG | FCP | FCP: -0.2s |

**Score estimado apos mudancas: 75-85+**

---

## O que NAO esta no escopo (infraestrutura)

| Item | Por que | Acao necessaria |
|------|---------|-----------------|
| CDN/Cloudflare | TTFB depende do servidor de borda | Configurar Cloudflare no dominio daltonlab.ai |
| Compressao Brotli/Gzip | Depende do servidor | Configurar no Cloudflare |
| HTTP/2 Push | Depende do servidor | Configurar no Cloudflare |

---

## Validacao

Apos implementar, a validacao correta e:
1. Publicar o site (deploy no dominio daltonlab.ai)
2. Rodar PageSpeed Insights em `https://daltonlab.ai/` (mobile)
3. Comparar as metricas LCP, TBT, FCP e Speed Index com os valores atuais
4. Meta: Score >= 80, LCP < 4s, TBT < 200ms

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `index.html` | GTM delay, preload de fonte |
| `src/components/sections/HomeHeroSection.tsx` | Video preload=none, texto sem delay |
| `src/App.tsx` | PageLoader sem PNG |
| `src/components/Header.tsx` | Import WebP em vez de PNG |
| `src/components/sections/Footer.tsx` | Import WebP |
| `src/components/sections/MediaSection.tsx` | Import WebP |
| `src/components/sections/PhilosophySection.tsx` | Imports WebP |
| `src/components/sections/HowItWorksSection.tsx` | Imports WebP |
| `src/components/sections/AboutSection.tsx` | Imports WebP |
| `src/pages/Newton.tsx` | Imports WebP |
| `src/pages/FaleComDalton.tsx` | Import WebP |
| Multiplas imagens PNG/JPG | Conversao para WebP |
