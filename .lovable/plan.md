

## Substituir Logos de Clientes Otimizadas

### Resumo
Substituir as 9 imagens de logos de clientes atuais (1080x1080px) pelas versões otimizadas enviadas (256x256px), renomeando para remover o sufixo "_1" dos nomes dos arquivos.

---

### Mapeamento de Arquivos

| Arquivo Enviado | Destino Final |
|-----------------|---------------|
| `cliente-1_1.webp` | `src/assets/logos/cliente-1.webp` |
| `cliente-2_1.webp` | `src/assets/logos/cliente-2.webp` |
| `cliente-3_1.webp` | `src/assets/logos/cliente-3.webp` |
| `cliente-4_1.webp` | `src/assets/logos/cliente-4.webp` |
| `cliente-5_1.webp` | `src/assets/logos/cliente-5.webp` |
| `cliente-6_1.webp` | `src/assets/logos/cliente-6.webp` |
| `cliente-7_1.webp` | `src/assets/logos/cliente-7.webp` |
| `cliente-8_1.webp` | `src/assets/logos/cliente-8.webp` |
| `cliente-9_1.webp` | `src/assets/logos/cliente-9.webp` |

---

### Impacto

- **Economia estimada**: ~230 KiB (de ~290 KiB para ~60 KiB total)
- **Qualidade visual**: Mantida - 256x256px suporta displays Retina 2x
- **Código**: Nenhuma alteração necessária - os imports já referenciam os mesmos nomes de arquivo

---

### Detalhes Técnicos

Os arquivos serão copiados usando `lov-copy` do namespace `user-uploads://` para `src/assets/logos/`, sobrescrevendo as versões anteriores de alta resolução.

