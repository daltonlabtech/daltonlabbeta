
# Plano de Alteracoes

## Alteracao 1: Remover AgenticArchitecture da JourneySection

**Arquivo:** `src/components/sections/JourneySection.tsx`
- Remover o import do `AgenticArchitecture`
- Remover a linha `<AgenticArchitecture />` (linha 72)
- Adicionar um espacamento adequado (`mt-6 md:mt-0`) antes do grid de pilares para compensar a remocao

---

## Alteracao 2: Redesign completo do GlobalMapSection

**Arquivo:** `src/components/sections/GlobalMapSection.tsx`

### Visual do mapa
- Manter o fundo claro (#F5F3F0) da secao, mas o container do mapa tera fundo escuro (#0F1729) seguindo a referencia
- Substituir os pontos (dots) de continentes por formas solidas (SVG paths) representando os continentes em cinza escuro (#1E293B) sobre o fundo escuro
- Manter os pontos de destaque com animacao de pulso (framer-motion), mas com cores diferentes por regiao:
  - America do Sul (Brasil): verde (#10B981)
  - Europa (Portugal): roxo (#8B5CF6)
  - Africa (Angola): rosa (#EC4899)
  - Asia (Coreia do Sul): vermelho (#EF4444)

### Labels dos continentes
- Adicionar labels flutuantes com borda colorida (matching a cor da regiao) sobre o mapa, posicionados proximo aos pontos de destaque:
  - "America do Sul" - borda verde
  - "Europa" - borda roxa
  - "Africa" - borda rosa
  - "Asia" - borda vermelha

### Tags de industrias
- Abaixo do titulo "Dalton Lab e global. E esta crescendo." e antes do mapa, adicionar uma linha de tags/pills com as industrias:
  - Agro, Tecnologia, Saude, Varejo, Advocacia
- Estilo: pills com borda sutil, fundo transparente ou levemente opaco, texto em cinza medio, centralizados

### Estrutura final da secao
```
Titulo: "Dalton Lab e global. E esta crescendo."
Tags: [Agro] [Tecnologia] [Saude] [Varejo] [Advocacia]
Mapa SVG (fundo escuro, continentes solidos, pontos animados, labels)
Subtitulo CTA: "Seu pais ainda nao esta no mapa?..."
```

---

## Detalhes Tecnicos

### SVG do mapa
- Usar SVG paths reais para desenhar os continentes como formas solidas (em vez do grid de pontos atual)
- Os paths serao simplificados mas reconheciveis, preenchidos com cor cinza (#1E293B) sobre fundo escuro (#0F1729)
- Os pontos de destaque continuam como circulos com animacao de pulso via framer-motion
- O container do mapa tera border-radius arredondado (rounded-2xl) para integrar com o design

### Tags de industria
- Renderizadas como `<span>` com classes de pill/badge
- Layout flex com gap, centralizados
- Estilo consistente com o design system existente (font-inter, cores neutras)
