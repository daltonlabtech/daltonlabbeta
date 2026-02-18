
# Plano: Atualizar Mapa Mundi na secao Global

## Resumo
Substituir a imagem do mapa atual pela imagem fornecida pelo usuario, adicionar pontos azuis animados (com framer-motion) sobre cidades/paises especificos, e labels de continentes flutuantes.

---

## Alteracao 1: Substituir imagem do mapa
- Copiar a imagem enviada (`Design_sem_nome_5.png`) para `src/assets/world-map-solid.png`
- Atualizar o import no `GlobalMapSection.tsx` para usar a nova imagem

## Alteracao 2: Adicionar pontos azuis com motion
**Arquivo:** `src/components/sections/GlobalMapSection.tsx`

Adicionar framer-motion com pontos pulsantes (azul `#3B82F6`) posicionados por porcentagem sobre o mapa. Cada ponto tera:
- Um circulo solido pequeno (8px)
- Um anel de pulso animado expandindo e desaparecendo (loop infinito)
- Um leve glow ao redor

**Pontos de destaque (posicoes aproximadas em % do mapa):**

Brasil:
- Manaus (AM) - norte/noroeste (~27%, ~48%)
- Fortaleza (CE) - nordeste (~33%, ~50%)
- Recife (PE) - litoral nordeste (~34%, ~53%)
- Salvador (BA) - litoral leste (~33%, ~56%)
- Belo Horizonte (MG) - central-leste (~31%, ~59%)
- Sao Paulo (SP) - destaque maior (~30%, ~63%)
- Rio de Janeiro (RJ) - proximo a SP (~31%, ~61%)

Internacional:
- Portugal (~45%, ~32%)
- Coreia do Sul (~83%, ~30%)
- Angola (~54%, ~58%)

Sao Paulo tera um ponto ligeiramente maior para destaque.

## Alteracao 3: Adicionar tags de continentes
Labels flutuantes posicionados sobre os respectivos continentes no mapa:
- "America do Sul" - sobre a America do Sul (~24%, ~50%)
- "Europa" - sobre a Europa (~48%, ~20%)
- "Africa" - sobre a Africa (~55%, ~46%)
- "Asia" - sobre a Asia (~78%, ~18%)

Estilo: pill com fundo semi-transparente claro, texto cinza escuro, borda sutil, fonte pequena.

---

## Detalhes Tecnicos

### Dependencias
- `framer-motion` (ja instalado) para animacoes de pulso nos pontos

### Estrutura do componente
O container do mapa sera `relative` para permitir posicionamento absoluto dos pontos e labels. A estrutura:

```text
<div relative>
  <img src={worldMapSolid} />     -- mapa full-width
  {REGION_LABELS.map(...)}         -- labels absolutos
  {PULSE_POINTS.map(...)}          -- pontos com motion
</div>
```

### Animacao dos pontos
Cada ponto usa `motion.div` com:
- `animate={{ opacity: [0.6, 0], scale: [1, 2.5] }}` para o anel de pulso
- `transition={{ duration: 2.5, repeat: Infinity, delay: staggered }}`
- Delay escalonado entre pontos para efeito visual mais organico
