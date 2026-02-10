

# Fix: Logo do Header aparecendo como quadrado branco

## Problema

A conversao automatica de `logo-dalton-white.png` para `logo-dalton-white.webp` gerou um arquivo corrompido/branco. O Header importa o `.webp` e exibe um retangulo branco.

## Solucao

Reverter o import no Header para usar o PNG original que ainda existe no projeto:

**Arquivo:** `src/components/Header.tsx`

| Linha | Antes | Depois |
|-------|-------|--------|
| 5 | `import logoWhite from '@/assets/logo-dalton-white.webp';` | `import logoWhite from '@/assets/logo-dalton-white.png';` |

Tambem verificar e corrigir outros arquivos que possam estar usando WebPs corrompidos da mesma conversao (ex: `d-branco.webp`, logos de tech, fotos de fundadores). Vou checar cada um no preview apos a correcao do header.

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/components/Header.tsx` | Reverter import para `.png` |

