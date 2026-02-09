

# Plano: Ajustes de Texto e Layout da DefinitionSection

## 1. Textos do Hero

**Arquivo:** `src/locales/pt/translation.json`

| Campo | Atual | Novo |
|-------|-------|------|
| `hero.titleLine1` | "Chegou a Era das" | "Transforme sua empresa" |
| `hero.titleLine2` | "Organizacoes Agenticas" | "em uma Organizacao Agentica" |
| `hero.subtitle1` | "Transforme sua empresa com IA Agentica" | "Transforme o potencial da IA em resultados reais para o seu negocio" |

**Arquivo:** `src/locales/en/translation.json`

| Campo | Atual | Novo |
|-------|-------|------|
| `hero.titleLine1` | "The Era of Agentic" | "Transform your company" |
| `hero.titleLine2` | "Organizations Has Arrived" | "into an Agentic Organization" |
| `hero.subtitle1` | "Transform your company with Agentic AI" | "Turn the potential of AI into real results for your business" |

---

## 2. Titulo da DefinitionSection

**Arquivo:** `src/locales/pt/translation.json`

| Campo | Atual | Novo |
|-------|-------|------|
| `home.definition.title` | "Transforme sua organizacao em agentica" | "Sua empresa esta pronta para a Era Agentica?" |

**Arquivo:** `src/locales/en/translation.json`

| Campo | Atual | Novo |
|-------|-------|------|
| `home.definition.title` | "Transform your organization into an agentic one" | "Is your company ready for the Agentic Era?" |

---

## 3. Novo Layout da DefinitionSection

**Arquivo:** `src/components/sections/DefinitionSection.tsx`

Reestruturacao do layout:

**Linha superior:** Titulo a esquerda + Texto (paragrafos) a direita, lado a lado em 2 colunas

**Linha inferior:** Stats em grid horizontal de 3 colunas, abaixo de tudo

```text
+--------------------+---------------------------+
| Sua empresa esta   | Lideres visionarios ja... |
| pronta para a Era  |                           |
| Agentica?          | Na Dalton Lab, eliminamos |
|                    | essa incerteza...         |
+--------------------+---------------------------+
|  >30%        |   >50%        |   >80%         |
|  decisoes    |   tempo       |   incidentes   |
+--------------+---------------+----------------+
```

Mudancas tecnicas:
- Titulo: `text-left` (remover `text-center`), ocupa coluna esquerda
- Paragrafos: movidos para coluna direita do titulo
- Stats: movidos para fora do grid principal, em `grid-cols-1 md:grid-cols-3` abaixo
- Remover `text-justify` dos paragrafos, usar `text-left`

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/locales/pt/translation.json` | Hero texts, definition title |
| `src/locales/en/translation.json` | Hero texts, definition title |
| `src/components/sections/DefinitionSection.tsx` | Layout: titulo esquerda + texto direita, stats abaixo |

