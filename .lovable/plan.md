
# Plano: Otimizacao Agressiva de Performance (PageSpeed)

## Situacao Atual

Os numeros sao preocupantes:
- **FCP: 3.1s** (deveria ser < 1.8s)
- **LCP: 7.8s** (deveria ser < 2.5s)
- **Speed Index: 6.7s** (deveria ser < 3.4s)

---

## 1. Imagens grandes demais (~1,997 KiB de economia)

Voce tem razao que isso e muito. Tres imagens estao sendo servidas com tamanho absurdamente maior do que o necessario:

| Imagem | Tamanho atual | Display | Acao |
|--------|--------------|---------|------|
| `d-branco.webp` | 108 KiB (1024x1024) | 32px no footer | Redimensionar para 128x128 (~3 KiB) |
| `veja-negocios.webp` | 1,152 KiB (1023x768) | ~420x315 no mobile | Redimensionar para 840x630 (~300 KiB) |
| `hero-poster.webp` | 836 KiB | fullscreen poster | Recomprimir qualidade 70 (~400 KiB) |

**O que voce precisa fazer:** Usar qualquer ferramenta de compressao de imagem (ex: squoosh.app, tinypng.com, ou Photoshop) para redimensionar e recomprimir esses 3 arquivos e depois fazer upload deles de volta no projeto substituindo os atuais. Eu nao consigo processar/redimensionar imagens dentro do Lovable.

**O que eu farei no codigo:** Adicionar `width` e `height` explicitos no `img` da MediaSection para evitar layout shift.

---

## 2. Cache Lifetime do HTML (~9,236 KiB)

Voce tem razao em questionar. Reanalisando: o PageSpeed reclama que o **documento HTML** (9 KiB) nao tem cache eficiente. Porem, o peso real do aviso e de apenas ~9 KiB -- nao sao 2,000 KiB de economia como parecia. O valor alto que o PageSpeed mostra e o tamanho total dos recursos sem cache, nao a economia potencial.

O HTML do site precisa ser servido sem cache (`no-cache`) para garantir que atualizacoes de deploy sejam refletidas imediatamente. Se cachearmos o HTML, usuarios verao versoes antigas do site apos cada deploy. Isso e um tradeoff consciente e correto para um SPA.

**Porem, ha algo que podemos fazer:** Os meta tags de cache no HTML sao ignorados pela maioria dos CDNs modernos -- o que realmente importa sao os headers HTTP do servidor. Como o Lovable controla isso, nao ha acao nossa. Podemos remover as meta tags de cache do HTML para reduzir o tamanho do documento (economizando ~200 bytes), mas o comportamento real nao mudara.

---

## 3. Bundle de traducoes bloqueando o render

Achei um problema real: **8 arquivos de traducao (pt, en, es, fr, de, it, zh, ja) estao todos importados estaticamente no bundle principal**. Se cada um tem ~375 linhas de JSON, sao ~3,000 linhas de JSON carregadas no bundle inicial, sendo que o usuario so precisa de 1 idioma.

**Solucao:** Carregar apenas o idioma PT no bundle inicial (fallback) e fazer lazy-load dos outros 7 idiomas apenas quando o usuario trocar o idioma. Isso reduz o bundle principal significativamente.

---

## 4. Vídeos do Hero bloqueando LCP

O hero carrega 2 fontes de video (WebM + MP4) que sao importadas estaticamente via `import`. Apesar de `preload="none"`, o **import** faz o bundler processar esses arquivos. O video so toca apos 1.5s, mas o import pode estar atrasando o bundle.

**Solucao:** Mover os videos para `/public` e referenciar por URL string, eliminando o import do bundle.

---

## 5. Prefetch desnecessario atrasando interatividade

O `Index.tsx` faz prefetch de `DefinitionSection` e `JourneySection` apos 1.5s. Isso compete com recursos criticos durante o carregamento inicial.

**Solucao:** Aumentar o delay do prefetch para 3-5s, ou remover e confiar no lazy-load natural via Suspense.

---

## Resumo de Acoes

### Acoes no codigo (eu faco):

| Arquivo | Alteracao |
|---------|-----------|
| `src/lib/i18n.ts` | Lazy-load de traducoes: so PT no bundle, outros sob demanda |
| `src/components/sections/HomeHeroSection.tsx` | Mover videos para `/public` (string path em vez de import) |
| `src/components/sections/MediaSection.tsx` | Adicionar width/height explicitos na imagem |
| `src/pages/Index.tsx` | Aumentar delay do prefetch para 5s |
| `index.html` | Remover meta tags de cache redundantes (~200 bytes) |

### Acoes suas (upload de imagens otimizadas):

1. **`src/assets/d-branco.webp`** -- Redimensionar de 1024x1024 para 128x128 pixels. Use squoosh.app: abra a imagem, resize para 128x128, exporte como WebP qualidade 80.
2. **`src/assets/media/veja-negocios.webp`** -- Redimensionar de 1023x768 para 840x630 pixels. WebP qualidade 80.
3. **`public/hero-poster.webp`** -- Manter dimensoes, recomprimir com WebP qualidade 65-70. Use squoosh.app: abra, so mude a qualidade.

### Acoes para os videos:

Os arquivos `hero-background.webm` e `hero-background.mp4` precisam ser movidos de `src/assets/` para `public/`. Eu farei a copia e atualizacao dos imports no codigo.

---

## Impacto Esperado

- **Reducao de bundle:** ~30-50 KiB (traducoes removidas do bundle inicial)
- **Reducao de imagens:** ~1,500 KiB (redimensionamento + recompressao)
- **LCP mais rapido:** Video nao bloqueia mais o bundler; hero poster mais leve
- **FCP mais rapido:** Bundle principal menor sem traducoes extras
