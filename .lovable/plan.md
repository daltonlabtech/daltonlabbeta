

# Plano: Atualizacoes de conteudo e layout da homepage

## Resumo

Alteracoes de texto, layout e comportamento em diversas secoes da homepage conforme solicitado.

---

## 1. Traducoes (PT) - `src/locales/pt/translation.json`

| Chave | De | Para |
|-------|-----|------|
| `hero.subtitle1` | "Traduza o potencial da IA..." | "Implementamos Agentes de IA sob medida para o seu negocio, analisando suas necessidades e preparando seu time para a nova era da produtividade." |
| `hero.cta` | "Agendar Diagnostico" | "Falar com Especialista" |
| `nav.startTransformation` | "Agendar Diagnostico" | "Falar com Especialista" |
| `home.prospection.cta` | "Agendar Diagnostico" | "Falar com Especialista" |
| `home.definition.title` | "Sua empresa esta pronta para a Era Agentica?" | "A primeira startup do Brasil especializada em Transformacao Agentica: reimagine sua empresa AI-first" |
| `home.definition.paragraph1` | (texto atual) | "" (vazio - sera removido) |
| `home.definition.paragraph2` | (texto atual) | "" (vazio - sera removido) |
| `home.stats.items[0]` | number: 30, prefix: ">", suffix: "%", desc: "velocidade na tomada de decisoes" | number: 300, prefix: "+", suffix: "", desc: "profissionais capacitados em IA agentica" |
| `home.stats.items[1]` | number: 50, prefix: ">", suffix: "%", desc: "reducao em tempo e esforco" | number: 50, prefix: "+", suffix: "", desc: "agentes de IA implementados" |
| `home.stats.items[2]` | number: 80, prefix: ">", suffix: "%", desc: "incidentes resolvidos..." | number: 50, prefix: ">", suffix: "%", desc: "reducao em tempo e esforco" |
| `home.journey.subtitle` | "...abordagem holistica..." | "...abordagem end-to-end..." |
| `home.journey.pillars[1].title` | "Workflows AI-first" | "Processos\nAI-first" |
| `home.finalCta.title` | "Lidere a Transformacao." | "Quer entender antes de agir?" |
| `home.finalCta.titleLine2` | "Junte-se ao Clube." | "Comece pelo AI Sprint." |
| `home.finalCta.subtitle` | "O Clube e o ponto de encontro..." | "Em poucos dias, ao vivo, voce recebe um diagnostico personalizado da sua empresa e sai com um roadmap que ja pode aplicar na segunda-feira." |
| `home.finalCta.cta` | "Tenho Interesse" | "Entrar na lista de espera" |
| `home.finalCta.disclaimer` | (novo) | "Vagas limitadas. Primeira turma em breve." |

---

## 2. DefinitionSection - `src/components/sections/DefinitionSection.tsx`

- **Remover paragrafos**: Eliminar o bloco de paragrafos (paragraph1, paragraph2, paragraph3)
- **Adicionar placeholder de video**: Abaixo do titulo, inserir um placeholder retangular (16:9) com icone de play e texto "Video em breve", com fundo escuro e bordas arredondadas
- **Centralizar stats**: Alterar `text-left` para `text-center` no StatCard

---

## 3. JourneySection - `src/components/sections/JourneySection.tsx`

- **Remover botao "Ver mais/Ver menos"**: Eliminar o botao expandir/colapsar e o bloco de detalhes expandiveis do PillarCard. Manter apenas number, title e summary.
- **Titulo do pilar 02**: O titulo "Processos\nAI-first" sera tratado com `whitespace-pre-line` no h3 para quebrar em 2 linhas

---

## 4. ProspectionSection - `src/components/sections/ProspectionSection.tsx`

- **Cores diferentes por tab ativa**: Cada tab tera uma cor de fundo unica quando selecionada:
  - Vendas: `#D4E8D0` (verde claro)
  - Marketing: `#D0D8E8` (azul claro)
  - Financeiro: `#E8E0D0` (dourado claro)
  - Atendimento: `#E0D0E8` (roxo claro)
  - Operacoes: `#E8D0D0` (rosa claro)

- **Reposicionar layout**: Inverter o grid para que os tabs fiquem a direita e o conteudo textual a esquerda. Adicionar titulo fixo "Reimagine seus setores AI-first" acima do conteudo no lado esquerdo.

---

## 5. HomeFinalCTASection - `src/components/sections/HomeFinalCTASection.tsx`

- Adicionar texto disclaimer "Vagas limitadas. Primeira turma em breve." abaixo do botao CTA, com fonte pequena e cor clara/opaca

---

## Arquivos afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/locales/pt/translation.json` | Todas as alteracoes de texto |
| `src/components/sections/DefinitionSection.tsx` | Remover paragrafos, adicionar placeholder video, centralizar stats |
| `src/components/sections/JourneySection.tsx` | Remover expandir/colapsar, suportar quebra de linha no titulo |
| `src/components/sections/ProspectionSection.tsx` | Cores por tab, reposicionar layout com titulo fixo |
| `src/components/sections/HomeFinalCTASection.tsx` | Adicionar disclaimer abaixo do CTA |

