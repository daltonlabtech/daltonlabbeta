

# Plano: Ajustes visuais e textuais

## 1. Espacamento no titulo da DefinitionSection

No `src/components/sections/DefinitionSection.tsx`, quebrar o titulo em duas linhas com espacamento maior entre elas. O titulo sera dividido em:
- Linha 1: "A primeira startup do Brasil especializada em"
- Linha 2: "transformar empresas em organizacoes AI-first"

Usar dois `<span>` com `block` e um `mb-2 md:mb-4` entre eles para criar o espaco visual.

A traducao em `src/locales/pt/translation.json` sera dividida em dois campos:
- `home.definition.titleLine1`: "A primeira startup do Brasil especializada em"
- `home.definition.titleLine2`: "transformar empresas em organizacoes AI-first"

## 2. Remover negrito do titulo "Reimagine seus setores AI-first"

No `src/components/sections/ProspectionSection.tsx`, remover `font-bold` do `<h2>` do titulo da coluna esquerda, trocando por `font-normal` ou `font-medium`.

## 3. Cor e textura da dobra AI Sprint

No `src/components/sections/HomeFinalCTASection.tsx`:
- Trocar `backgroundColor` de `#6A1FB0` (roxo) para `#121823` (azul escuro/navy), conforme a imagem de referencia
- Adicionar um overlay CSS com textura de linhas quadriculadas brancas sutis usando `background-image` com `linear-gradient` para criar o efeito de grid visivel na imagem

A textura sera feita via CSS puro (sem imagem externa):
```css
background-color: #121823;
background-image:
  linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
background-size: 120px 120px;
```

## 4. Texto do subtitulo do AI Sprint

No `src/locales/pt/translation.json`, alterar:
- **De**: "Programa online ao vivo onde voce sai com roadmap pratico de onde implementar IA na sua empresa e onde gera mais resultado"
- **Para**: "Programa online e ao vivo para definir, na pratica, onde aplicar IA na sua empresa e gerar mais resultado"

## Arquivos afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/locales/pt/translation.json` | Dividir titulo definition em 2 linhas + atualizar subtitulo finalCta |
| `src/components/sections/DefinitionSection.tsx` | Renderizar titulo em 2 blocos com espaco entre eles |
| `src/components/sections/ProspectionSection.tsx` | Remover `font-bold` do titulo |
| `src/components/sections/HomeFinalCTASection.tsx` | Cor `#121823` + textura grid CSS |

