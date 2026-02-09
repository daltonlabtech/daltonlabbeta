

# Plano: Journey + CTAs + Layout da DefinitionSection

## 1. JourneySection - Adicionar pilar "Diagnostico" (01)

**Arquivos:** `src/locales/pt/translation.json` e `src/locales/en/translation.json`

Alterar o array `home.journey.pillars` de 3 para 4 itens, inserindo "Diagnostico" como primeiro:

| Pilar | Titulo (PT) | Titulo (EN) |
|-------|-------------|-------------|
| 01 | Diagnostico | Diagnosis |
| 02 | Workflows AI-first | AI-first Workflows |
| 03 | Pessoas e cultura | People and culture |
| 04 | Tecnologia | Technology |

O novo pilar 01 tera:
- Summary PT: "Mapeamos sua operacao e identificamos oportunidades de transformacao com IA."
- Summary EN: "We map your operation and identify opportunities for transformation with AI."
- Details PT: "Realizamos uma analise profunda dos seus processos, tecnologias e equipe para criar um plano estrategico personalizado de transformacao agentica."
- Details EN: "We perform a deep analysis of your processes, technologies and team to create a personalized strategic plan for agentic transformation."

**Arquivo:** `src/components/sections/JourneySection.tsx`

- Alterar grid de `md:grid-cols-3` para `md:grid-cols-2 lg:grid-cols-4`

---

## 2. CTAs: "Iniciar Transformacao" para "Agendar Diagnostico"

**Arquivo:** `src/locales/pt/translation.json`

| Campo | Antigo | Novo |
|-------|--------|------|
| `nav.startTransformation` | "Iniciar Transformacao" | "Agendar Diagnostico" |
| `hero.cta` | "Iniciar Transformacao" | "Agendar Diagnostico" |
| `home.prospection.cta` | "Iniciar Transformacao" | "Agendar Diagnostico" |

**Arquivo:** `src/locales/en/translation.json`

| Campo | Antigo | Novo |
|-------|--------|------|
| `nav.startTransformation` | "Start Transformation" | "Schedule Diagnosis" |
| `hero.cta` | "Start Transformation" | "Schedule Diagnosis" |
| `home.prospection.cta` | "Start Transformation" | "Schedule Diagnosis" |

---

## 3. DefinitionSection - Layout em 1 coluna centralizada

**Arquivo:** `src/components/sections/DefinitionSection.tsx`

Mudar de grid 2 colunas (titulo esquerda + texto direita) para layout de 1 coluna empilhado:

```text
+------------------------------------------+
|   Sua empresa esta pronta para a         |
|        Era Agentica?                     |
|                                          |
|   Lideres visionarios ja entenderam...   |
|                                          |
|   Na Dalton Lab, eliminamos essa...      |
|                                          |
|   >30%         >50%         >80%         |
|   decisoes     tempo        incidentes   |
+------------------------------------------+
```

Mudancas tecnicas:
- Remover o grid 2 colunas (`lg:grid-cols-2`)
- Titulo: `text-center` no topo, sem grid
- Paragrafos: `text-center`, com `max-w-3xl mx-auto` para largura controlada
- Stats: mantidos em `grid-cols-1 md:grid-cols-3` abaixo

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/locales/pt/translation.json` | CTAs, Journey pillars |
| `src/locales/en/translation.json` | CTAs, Journey pillars |
| `src/components/sections/DefinitionSection.tsx` | Layout 1 coluna centralizado |
| `src/components/sections/JourneySection.tsx` | Grid 3 para 4 colunas |

