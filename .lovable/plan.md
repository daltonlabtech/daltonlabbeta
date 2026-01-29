
## Ajustes nas Dobras do Site

### 1. Dobra "IA que vende para você" - Gráfico de Pipeline

**Arquivo:** `src/components/sections/ProspectionSection.tsx`

Substituir o componente `SalesDashboardMockup` atual por um gráfico de linha suave detalhado com as seguintes especificações:

| Elemento | Especificação |
|----------|---------------|
| Eixo Y | Escala de 5 a 20 (incrementos de 5) |
| Eixo X | Dias da semana: S, T, Q, Q, S, S, D |
| Grid | Linhas verticais sutis para cada dia |
| Linha principal | Preto/cinza escuro, trajetória ascendente de ~5 a ~17-18 |
| Área sombreada | Gradiente cinza claro para transparente abaixo da linha |
| Linhas de tendência | Duas linhas em cinza claro (acima e abaixo da principal) |
| Ponto destacado | Círculo na quinta-feira (~15), borda branca, interior escuro |

**Remoção de animações:** Serão removidas as classes `animate-draw-line`, `animate-pulse-dot` e `animate-bounce-subtle`.

---

### 2. Dobra "A nova forma de escalar receita" - Tamanho do Título

**Arquivo:** `src/components/sections/InsightsSection.tsx`

| De | Para |
|----|------|
| `text-3xl md:text-4xl lg:text-5xl` | `text-4xl md:text-5xl lg:text-[60px]` |

O título continuará em duas linhas: "A nova forma de" / "escalar receita"

---

### 3. Dobra "Plano" - Lista de Itens

**Arquivo:** `src/components/sections/SquadPlansSection.tsx`

Atualizar os itens do card "Agente de Vendas":

| De | Para |
|----|------|
| Qualificar oportunidades | Qualificação automática de leads |
| Fazer follow-up | Follow-up 24/7 |
| Agendar reuniões | Agendamento de reuniões |
| Fechar vendas | Fechamento de vendas automatizado |
| Enviar reports via WhatsApp | *(removido)* |

---

### Detalhes Técnicos do Gráfico SVG

```text
Estrutura do gráfico:
┌────────────────────────────────────────────────────┐
│ 20 ─┬───┬───┬───┬───┬───┬───┬                     │
│ 15 ─┼───┼───┼───┼─●─┼───┼───┼─── Ponto destacado  │
│ 10 ─┼───┼───┼───┼───┼───┼───┼                     │
│  5 ─┼───┼───┼───┼───┼───┼───┼                     │
│     S   T   Q   Q   S   S   D                     │
└────────────────────────────────────────────────────┘
```

Elementos SVG:
- **defs**: Gradiente linear vertical para área sombreada
- **Grid lines**: Linhas verticais em `#d4d4d8` com opacidade 0.3
- **Eixos**: Textos para valores Y (5, 10, 15, 20) e dias X (S, T, Q, Q, S, S, D)
- **Área preenchida**: Path com fill usando gradiente
- **Linha principal**: Curva suave com `stroke-linecap="round"` e `stroke-linejoin="round"`
- **Linhas de tendência**: Duas linhas em cinza claro (`#a1a1aa`) com opacidade 0.4
- **Ponto destacado**: Círculo com borda branca (3px) e preenchimento `#18181b`
