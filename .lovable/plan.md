

# Plano: Ajuste de proporção das colunas na ProspectionSection

## Alteração

No arquivo `src/components/sections/ProspectionSection.tsx`, trocar o grid de colunas iguais para proporção 30/70:

- **De**: `lg:grid-cols-2` (50/50)
- **Para**: `lg:grid-cols-[3fr_7fr]` (30/70)

Isso fará o título à esquerda ocupar 30% e o card à direita ocupar 70%, exatamente como na imagem de referência.

## Arquivo afetado

| Arquivo | Alteração |
|---------|-----------|
| `src/components/sections/ProspectionSection.tsx` | `grid-cols-2` → `grid-cols-[3fr_7fr]` |

