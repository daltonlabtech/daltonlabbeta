

# Plano: Adicionar Meta Tags de Cache-Control no index.html

## Problema Identificado

O arquivo `index.html` não possui meta tags de controle de cache, fazendo com que o navegador armazene a página por tempo indeterminado. Isso explica por que:
- Janelas anônimas funcionam (sem cache prévio)
- Hard refresh funciona (força nova requisição)  
- Novas abas mostram versão antiga (usam cache existente)

## Solução

Adicionar meta tags HTTP-equiv no `<head>` do `index.html` para instruir o navegador a sempre revalidar o documento com o servidor.

## Alterações

### Arquivo: `index.html`

Adicionar após a linha 21 (depois de `theme-color`):

```html
<!-- Cache Control - Always revalidate HTML document -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
```

## Como Funciona

| Meta Tag | Função |
|----------|--------|
| `no-cache` | Navegador deve revalidar antes de usar cache |
| `no-store` | Não armazenar cópia em cache |
| `must-revalidate` | Obrigatório verificar se há versão nova |
| `Pragma: no-cache` | Compatibilidade com HTTP/1.0 |
| `Expires: 0` | Marca como expirado imediatamente |

## Observações

- Os assets JS/CSS com hash no nome (`[name]-[hash].js`) continuarão sendo cacheados normalmente pelo navegador, pois mudam de nome quando há alterações
- Apenas o documento HTML será sempre revalidado
- O impacto em performance é mínimo pois o HTML é pequeno (~4KB)

## Após Implementação

1. Fazer novo publish
2. Aguardar 2-3 minutos para propagação
3. Limpar cache uma última vez
4. Testar abrindo novas abas - a partir daí, sempre receberão versão atualizada

