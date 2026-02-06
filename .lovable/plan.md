
# Plano de Ajustes de Design

## Resumo das Alteracoes

Este plano detalha as mudancas solicitadas para alinhar o design da pagina inicial com as especificacoes fornecidas.

---

## Alteracoes por Componente

### 1. DefinitionSection - Mover Stats para Lateral Direita

**Arquivo:** `src/components/sections/DefinitionSection.tsx`

**Mudancas:**
- Remover a imagem do time (`dalton-team.webp`)
- Integrar os numeros de resultado (stats) na coluna direita em formato vertical
- Manter layout de duas colunas: textos a esquerda, stats a direita
- Stats exibidos em coluna com tipografia grande (80px, peso 800)

**Layout resultante:**
```
+--------------------------------+------------------+
| Titulo centralizado            |                  |
+--------------------------------+------------------+
| Paragrafo 1                    |     >30%         |
| Paragrafo 2                    |  velocidade...   |
| Paragrafo 3                    |                  |
|                                |     >50%         |
|                                |  reducao...      |
|                                |                  |
|                                |     >80%         |
|                                |  incidentes...   |
+--------------------------------+------------------+
```

### 2. StatsSection - Alterar Cor de Fundo

**Arquivo:** `src/components/sections/StatsSection.tsx`

**Mudancas:**
- Alterar `backgroundColor` de `#F5F3F0` para `#E8E6E3`

**Nota:** Esta secao pode ser removida do Index.tsx ja que os stats serao integrados na DefinitionSection

### 3. HomeHeroSection - Remover Tag e Ponto

**Arquivo:** `src/components/sections/HomeHeroSection.tsx`

**Mudancas:**
- Remover completamente o badge "Powered by" (linhas 124-132)
- Remover importacao dos logos de tecnologia

**Arquivo:** `src/locales/pt/translation.json`

**Mudancas:**
- Alterar `hero.subtitle1` de `"Transforme sua empresa com IA Agêntica."` para `"Transforme sua empresa com IA Agêntica"` (sem ponto final)

### 4. ProspectionSection - Ajustes de Layout

**Arquivo:** `src/components/sections/ProspectionSection.tsx`

**Mudancas:**
- Remover titulo "Reimagine sua empresa" e subtitulo
- Alinhar tabs mais a esquerda com textos maiores (de `text-sm` para `text-base md:text-lg`)
- Remover icone de seta (SVG) do botao CTA
- Reduzir padding vertical da secao (aproximar 3x da secao anterior)
- Alterar padding de `py-[60px] md:py-[100px]` para `py-[20px] md:py-[35px]`

### 5. HomeFinalCTASection - Reduzir Tamanho pela Metade

**Arquivo:** `src/components/sections/HomeFinalCTASection.tsx`

**Mudancas:**
- Reduzir padding vertical de `py-[60px] md:py-[80px]` para `py-[30px] md:py-[40px]`
- Reduzir tamanho do titulo de `text-3xl md:text-4xl lg:text-[48px]` para `text-xl md:text-2xl lg:text-[32px]`
- Reduzir tamanho do subtitulo de `text-base md:text-lg` para `text-sm md:text-base`
- Reduzir tamanho do botao CTA

### 6. MediaSection - Adicionar Imagem e Links Reais

**Arquivo:** `src/components/sections/MediaSection.tsx`

**Mudancas:**
- Adicionar imagem enviada pelo usuario (Veja Negocios com os 3 fundadores)
- Copiar imagem para `src/assets/media/veja-negocios.png`
- Importar e usar a imagem no featured article

**Arquivo:** `src/locales/pt/translation.json`

**Mudancas no objeto `home.media`:**

**Featured Article:**
- URL: `https://veja.abril.com.br/coluna/radar-economico/o-aporte-de-um-socio-do-atacadista-mundial-mix-em-uma-startup-de-ia/`
- Titulo: "O aporte de um socio do atacadista Mundial Mix em uma startup de IA"

**Blog Posts (3 cards):**
1. Titulo: "Organizacoes Agenticas: 89% ainda esta longe disso"
   URL: `https://www.linkedin.com/pulse/organizacoes-agenticas-89-ainda-esta-longe-disso-rodrigo-sp%C3%ADnola-lmmpf/`

2. Titulo: "O erro de ignorar o cliente mais importante do seu negocio"
   URL: `https://www.linkedin.com/pulse/o-erro-de-ignorar-cliente-mais-importante-do-seu-neg%C3%B3cio-sp%C3%ADnola-lkezf/`

3. Titulo: "O erro que empresas estao cometendo com IA"
   URL: `https://www.linkedin.com/pulse/o-erro-que-empresas-estao-cometendo-com-ia-rodrigo-sp%C3%ADnola-ibwrf/`

### 7. Index.tsx - Reorganizar Secoes

**Arquivo:** `src/pages/Index.tsx`

**Mudancas:**
- Remover importacao e uso da StatsSection (os stats foram integrados na DefinitionSection)

---

## Arquivos Afetados

| Arquivo | Tipo de Alteracao |
|---------|-------------------|
| `src/components/sections/DefinitionSection.tsx` | Modificar (integrar stats) |
| `src/components/sections/StatsSection.tsx` | Remover ou manter como fallback |
| `src/components/sections/HomeHeroSection.tsx` | Modificar (remover badge) |
| `src/components/sections/ProspectionSection.tsx` | Modificar (layout, remover titulo) |
| `src/components/sections/HomeFinalCTASection.tsx` | Modificar (reduzir tamanho) |
| `src/components/sections/MediaSection.tsx` | Modificar (usar imagem real) |
| `src/locales/pt/translation.json` | Modificar (subtitulo, media links) |
| `src/locales/en/translation.json` | Modificar (mesmas alteracoes) |
| `src/pages/Index.tsx` | Modificar (remover StatsSection) |
| `src/assets/media/veja-negocios.png` | Novo arquivo (copiar imagem) |

---

## Detalhes Tecnicos

### Integracao dos Stats na DefinitionSection

O componente DefinitionSection tera um layout de duas colunas onde:
- Coluna esquerda: titulo + 3 paragrafos descritivos
- Coluna direita: 3 metricas em formato vertical com animacao de contagem

A logica de `useCountUp` sera movida para a DefinitionSection ou importada como hook reutilizavel.

### Imagem da MediaSection

A imagem enviada pelo usuario (Design_sem_nome_1-5.png) sera:
1. Copiada para `src/assets/media/veja-negocios.png`
2. Importada no MediaSection
3. Usada como `src` da imagem do featured article

### Espacamento entre Secoes

Com a remocao do titulo da ProspectionSection e reducao do padding, as secoes JourneySection e ProspectionSection ficarao visualmente mais proximas, criando uma continuidade visual.
