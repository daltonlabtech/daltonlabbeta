
# Plano de Alteracoes na Homepage

## Alteracao 1: Substituir o Diagrama de Venn pela Arquitetura Agentica

Na JourneySection, o componente `VennDiagram` (circulos "Pessoas, Processos, IA") sera substituido pelo componente `AgenticArchitecture` que ja existe no projeto.

**Arquivo afetado:** `src/components/sections/JourneySection.tsx`
- Trocar o import de `VennDiagram` por `AgenticArchitecture`
- Substituir `<VennDiagram isVisible={isVisible} />` por `<AgenticArchitecture />`

---

## Alteracao 2: Nova secao "Global Map" apos o CTA do AI Sprint

Criar uma nova secao `GlobalMapSection` que sera inserida entre `HomeFinalCTASection` e `MediaSection` na homepage.

### Conteudo da secao:
- **Fundo:** #F5F3F0 (consistente com o restante da pagina)
- **Titulo:** "Dalton Lab e global. E esta crescendo."
- **Mapa mundi:** Construido em SVG com pontos (dots) no estilo da imagem de referencia. O mapa inteiro aparece em cinza claro, com destaque em azul/cor de marca nas regioes:
  - **America do Sul:** Varios pontos de destaque espalhados pelo Brasil (Sao Paulo, Rio, Belo Horizonte, Manaus, Recife, etc.)
  - **Europa:** Um ponto em Portugal
  - **Asia:** Um ponto na Coreia do Sul
  - **Africa:** Um ponto em Angola
- **Subtitulo:** "Seu pais ainda nao esta no mapa? Voce pode" seguido de "liderar o caminho." como link estilizado apontando para `https://formulario.daltonlab.ai/`

### Arquivos envolvidos:
- **Novo:** `src/components/sections/GlobalMapSection.tsx` -- Componente com o mapa SVG dotted, os pontos de destaque animados e o CTA
- **Editado:** `src/pages/Index.tsx` -- Adicionar lazy import e renderizar `GlobalMapSection` entre `HomeFinalCTASection` e `MediaSection`

---

## Detalhes Tecnicos

### Mapa SVG
O mapa sera construido como um componente SVG inline com:
- Continentes representados por grid de pontos (circulos pequenos) em cinza claro (`rgba(16,24,35,0.15)`)
- Regioes destacadas (Brasil, Portugal, Coreia, Angola) com pontos em cor de destaque (azul `#3B82F6` ou similar)
- Pontos de presenca maiores com efeito de pulso (animacao framer-motion) nos locais especificos
- Responsivo: ocupa largura total do container com max-width adequado

### Estrutura da homepage atualizada
```text
1. Header
2. HomeHeroSection
3. JourneySection (agora com AgenticArchitecture em vez de VennDiagram)
4. DefinitionSection
5. ProspectionSection
6. HomeFinalCTASection
7. GlobalMapSection  <-- NOVA
8. MediaSection
9. Footer
```

### CTA no subtitulo
O texto "liderar o caminho." sera um link `<a>` com estilo underline ou bold que aponta para `https://formulario.daltonlab.ai/` abrindo na mesma aba (consistente com o padrao do projeto).
