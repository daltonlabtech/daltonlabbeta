
## Atualização do Link de Agendamento - Consultoria Enterprise

### Objetivo
Atualizar o link do botão "Agende uma reunião" no card "Consultoria Enterprise" para redirecionar diretamente para o Cal.com.

### Alteração

**Arquivo:** `src/components/sections/SquadPlansSection.tsx`

| De | Para |
|----|------|
| `https://chat.daltonlab.ai/` | `https://cal.com/daltonlab/consultoria-estrutura-ia` |

### Detalhes Técnicos

A alteração será feita na linha 30 do arquivo, modificando o valor de `ctaLink` do segundo plano (Consultoria Enterprise):

```text
Antes:  ctaLink: "https://chat.daltonlab.ai/"
Depois: ctaLink: "https://cal.com/daltonlab/consultoria-estrutura-ia"
```

O botão "Fale com o Dalton" do primeiro card (Agente de Vendas) permanecerá apontando para `https://chat.daltonlab.ai/`.
