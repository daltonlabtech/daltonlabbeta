
# Plano: Ajustes de texto, layout e cor

## 1. Textos - `src/locales/pt/translation.json`

| Campo | Valor atual | Novo valor |
|-------|------------|------------|
| `home.definition.title` | "A primeira startup do Brasil especializada em Transformacao Agentica: reimagine sua empresa AI-first" | "A primeira startup do Brasil especializada em transformar empresas em organizacoes AI-first" |
| `home.finalCta.title` | "Quer entender antes de agir?" | "Quer saber onde aplicar IA no seu negocio?" |
| `home.finalCta.subtitle` | "Em poucos dias, ao vivo, voce recebe um diagnostico personalizado da sua empresa e sai com um roadmap que ja pode aplicar na segunda-feira." | "Programa online ao vivo onde voce sai com roadmap pratico de onde implementar IA na sua empresa e onde gera mais resultado" |

## 2. ProspectionSection - Layout dividido em 2

Reestruturar `src/components/sections/ProspectionSection.tsx`:

- Criar um grid externo de 2 colunas (`lg:grid-cols-2`) **fora do card**
- **Coluna esquerda**: Titulo grande "Reimagine seus setores AI-first" centralizado verticalmente
- **Coluna direita**: O card branco (`#F5F3F0`) com as tabs, conteudo dinamico (titulo do setor, descricao, features, CTA) -- tudo dentro do card
- No mobile, o titulo aparece acima do card em coluna unica

## 3. Cor do AI Sprint - `src/components/sections/HomeFinalCTASection.tsx`

- Alterar `backgroundColor` de `#121823` para `#6A1FB0` (versao escura de `#8A2BE2`, ~25% mais escura)
- Manter textos claros para contraste adequado

## Arquivos afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/locales/pt/translation.json` | 3 textos atualizados |
| `src/components/sections/ProspectionSection.tsx` | Layout: titulo fora do card a esquerda, card a direita |
| `src/components/sections/HomeFinalCTASection.tsx` | backgroundColor para roxo escuro |
