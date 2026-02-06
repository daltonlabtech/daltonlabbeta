
# Ajustes de Design: Alinhamento com o Screenshot de Referencia

## Visao Geral

Comparando a implementacao atual com a imagem de referencia, identifiquei diversas diferencas visuais e de layout que precisam ser corrigidas para alinhar o design.

---

## Diferencas Identificadas e Ajustes Necessarios

### 1. HomeHeroSection
**Status atual**: O CTA nao tem o icone de seta  
**Ajuste**: Remover o icone SVG do botao CTA do Hero (o screenshot mostra apenas o texto "Iniciar Transformacao" sem icone)

### 2. DefinitionSection  
**Status atual**: Usando imagem generica do time (`dalton-team.webp`)  
**Ajuste**: A imagem no screenshot mostra um dashboard/grafico agenticoum (aparentemente uma captura de tela de um sistema ou organograma digital) - precisa ser substituida pela imagem correta ou manter como esta se a imagem atual for a pretendida

### 3. StatsSection
**Status atual**: Descricoes diferentes das mostradas no screenshot  
**Screenshot mostra**:
- ">30% velocidade na tomada de decisoes"
- ">50% reducao em tempo e esforco"  
- ">80% incidentes resolvidos de forma automatica"

**Ajuste**: Atualizar as traducoes com os textos corretos do screenshot

### 4. JourneySection
**Status atual**: Cards com fundo #E8E6E3 (mesmo da secao)  
**Screenshot mostra**: Cards parecem ter bordas/separacao visual mais definida  
**Ajuste**: Manter layout atual - a diferenca e sutil e o atual parece correto

### 5. ProspectionSection
**Status atual**: Tabs em linha horizontal acima do conteudo  
**Screenshot mostra**: Tabs posicionadas a direita, verticalmente, ao lado do conteudo  
**Ajuste**: Reestruturar o layout para ter o conteudo (titulo, descricao, features) a esquerda e as tabs verticais a direita

### 6. HomeFinalCTASection
**Status atual**: Apenas titulo e CTA  
**Screenshot mostra**: Titulo + subtitulo descritivo + CTA "Tenho Interesse"  
**Subtitulo no screenshot**: "O Clube Dalton Lab e o ponto de encontro para lideres visionarios que querem ser a vanguarda da era agentica."  
**CTA no screenshot**: "Tenho Interesse" (nao "Iniciar Transformacao")  
**Ajuste**: Adicionar subtitulo e alterar o texto do CTA

### 7. MediaSection
**Status atual**: Layout simplificado com cards basicos  
**Screenshot mostra**: Layout mais complexo com:
- Destaque principal a esquerda mostrando capa do artigo "Veja Negocios"
- Card grande a direita com "NOTICIA" + titulo do artigo + data + descricao
- 3 cards menores na parte inferior com rotulo "BLOG POST"

**Ajuste**: Redesenhar completamente a secao de midia com o novo layout

### 8. Footer
**Status atual**: Layout em 4 colunas ja correto  
**Screenshot mostra**: Layout similar - verificar se links estao atualizados  
**Ajuste**: Atualizar a coluna "Sobre" para incluir "Iniciar Transformacao" ao inves de "Fale com o Dalton"

---

## Etapas de Implementacao

### Etapa 1: Atualizar Traducoes (PT)

Arquivo: `src/locales/pt/translation.json`

**home.stats.items**: Atualizar descricoes:
- Item 1: "velocidade na tomada de decisoes" 
- Item 2: "reducao em tempo e esforco"
- Item 3: "incidentes resolvidos de forma automatica"

**home.finalCta**: Adicionar subtitulo e alterar CTA:
- Adicionar `subtitle`: "O Clube Dalton Lab e o ponto de encontro para lideres visionarios que querem ser a vanguarda da era agentica."
- Alterar `cta`: "Tenho Interesse"

**home.media**: Expandir estrutura para suportar layout com destaque e posts de blog

### Etapa 2: Atualizar HomeHeroSection

Arquivo: `src/components/sections/HomeHeroSection.tsx`

- Remover o icone SVG (seta) do botao CTA

### Etapa 3: Atualizar ProspectionSection

Arquivo: `src/components/sections/ProspectionSection.tsx`

- Mudar layout de tabs horizontais para tabs verticais a direita
- Conteudo (titulo, descricao, features) fica a esquerda
- Tabs ficam em coluna vertical a direita
- Manter o card com fundo #F5F3F0 envolvendo tudo

### Etapa 4: Atualizar HomeFinalCTASection

Arquivo: `src/components/sections/HomeFinalCTASection.tsx`

- Adicionar subtitulo entre o titulo e o CTA
- Alterar estilo do CTA (adicionar borda ao inves de fundo solido - no screenshot parece um botao outline)

### Etapa 5: Redesenhar MediaSection

Arquivo: `src/components/sections/MediaSection.tsx`

Novo layout:
- Adicionar header "MIDIA DESTAQUE"
- Grid com 2 colunas para destaque principal:
  - Esquerda: Imagem de capa do artigo (Veja Negocios)
  - Direita: Card com "NOTICIA" label + titulo + data + resumo
- Grid de 3 colunas abaixo para "BLOG POST" cards

### Etapa 6: Atualizar Footer

Arquivo: `src/components/sections/Footer.tsx`

- Substituir link "Fale com o Dalton" por "Iniciar Transformacao" apontando para chat.daltonlab.ai

### Etapa 7: Atualizar Traducoes (EN)

Arquivo: `src/locales/en/translation.json`

Aplicar as mesmas mudancas estruturais em ingles

---

## Detalhes Tecnicos

### Layout ProspectionSection (Novo)
```text
+------------------------------------------+
| Titulo centralizado                       |
| Subtitulo centralizado                    |
+------------------------------------------+
| +--------------------------------------+ |
| | Escale suas vendas... | Vendas      | |
| | Agentes especializ... | Marketing   | |
| | [check] Feature 1     | Financeiro  | |
| | [check] Feature 2     | Atendimento | |
| | [check] Feature 3     | Operacoes   | |
| +--------------------------------------+ |
+------------------------------------------+
```

### Layout MediaSection (Novo)
```text
MIDIA DESTAQUE
+--------------------+----------------------+
| [Imagem Veja       | NOTICIA              |
|  Negocios]         | Titulo do artigo     |
|                    | 5 fev 2026 — Resumo  |
+--------------------+----------------------+
+----------+----------+----------+
| BLOG POST | BLOG POST | BLOG POST |
| Titulo 1  | Titulo 2  | Titulo 3  |
+----------+----------+----------+
```

### Cores e Tipografia
- Manter todas as cores existentes (#101824, #F5F3F0, #E8E6E3)
- Manter tipografia Inter
- CTA "Tenho Interesse" com borda em vez de fundo solido na secao final
