

# Plano: Textos da Definition, Subtítulo do Hero e Tamanho do Título

## 1. Texto da DefinitionSection (PT)

**Arquivo:** `src/locales/pt/translation.json`

Substituir os 3 parágrafos atuais por 2 novos:

| Campo | Novo texto |
|-------|-----------|
| `paragraph1` | "Líderes visionários já entenderam que a IA não é mais uma tendência, e sim o novo motor de crescimento e eficiência. No entanto, a clareza sobre o potencial da IA muitas vezes vem acompanhada de uma grande incerteza: qual é o primeiro passo a ser dado?" |
| `paragraph2` | "Na Dalton Lab, eliminamos essa incerteza. Transformamos o potencial da IA em um plano claro, estruturado e executável para que você possa liderar essa transformação com confiança." |
| `paragraph3` | Remover (string vazia ou não renderizar) |

**Arquivo:** `src/locales/en/translation.json`

| Campo | Novo texto |
|-------|-----------|
| `paragraph1` | "Visionary leaders already understand that AI is no longer a trend, but the new engine of growth and efficiency. However, clarity about AI's potential often comes with great uncertainty: what is the first step to take?" |
| `paragraph2` | "At Dalton Lab, we eliminate that uncertainty. We transform AI's potential into a clear, structured, and actionable plan so you can lead this transformation with confidence." |
| `paragraph3` | Remover (string vazia) |

**Arquivo:** `src/components/sections/DefinitionSection.tsx`
- Garantir `text-center` nos parágrafos e distribuição uniforme entre margens (`max-w-3xl mx-auto`)
- Não renderizar `paragraph3` se estiver vazio

---

## 2. Subtítulo do Hero

**Arquivo:** `src/locales/pt/translation.json`

| Campo | Antigo | Novo |
|-------|--------|------|
| `hero.subtitle1` | "Transforme o potencial da IA em resultados reais para o seu negócio" | "Traduza o potencial da IA em resultados reais para o seu negócio" |

**Arquivo:** `src/locales/en/translation.json`

| Campo | Antigo | Novo |
|-------|--------|------|
| `hero.subtitle1` | "Turn the potential of AI into real results for your business" | "Translate AI's potential into real results for your business" |

---

## 3. Reduzir tamanho do título do Hero

**Arquivo:** `src/components/sections/HomeHeroSection.tsx`

Reduzir o tamanho do título desktop para caber em 2 linhas:

| Elemento | Atual | Novo |
|----------|-------|------|
| Desktop title spans | `text-5xl md:text-[64px]` | `text-4xl md:text-[52px]` |
| Mobile title spans | `text-[32px]` | `text-[28px]` |

Atualizar também as linhas mobile para refletir o texto completo em 2 linhas:

| Campo PT | Novo |
|----------|------|
| `hero.titleLine2Mobile` | "em uma Organização" |
| `hero.titleLine3Mobile` | "Agêntica" |

---

## Arquivos Afetados

| Arquivo | Alteração |
|---------|-----------|
| `src/locales/pt/translation.json` | Parágrafos definition, subtítulo hero, mobile title lines |
| `src/locales/en/translation.json` | Parágrafos definition, subtítulo hero |
| `src/components/sections/HomeHeroSection.tsx` | Reduzir font-size do título |
| `src/components/sections/DefinitionSection.tsx` | Ajuste para 2 parágrafos, centralizado |

