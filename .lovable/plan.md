

# Plano: Ajustes no Modal e Tabs de Prospeccao

## Resumo

Duas alteracoes:
1. No pop-up da secao "Lidere a Transformacao" - remover titulo e alterar texto do botao
2. Na secao de Prospection - alterar cor da aba selecionada

---

## Alteracoes

### 1. Modal de Waitlist - Remover Titulo e Alterar CTA

**Arquivos:** `src/locales/pt/translation.json` e `src/locales/en/translation.json`

| Campo | Valor Atual (PT) | Novo Valor (PT) |
|-------|------------------|-----------------|
| `waitlist.title` | "Quero entrar para a lista de espera" | "" (string vazia) |
| `waitlist.submit` | "Entrar" | "Enviar" |

| Campo | Valor Atual (EN) | Novo Valor (EN) |
|-------|------------------|-----------------|
| `waitlist.title` | "I want to join the waitlist" | "" (string vazia) |
| `waitlist.submit` | "Join" | "Send" |

**Arquivo:** `src/components/ui/WaitlistModal.tsx`

O componente precisa ser ajustado para ocultar o `DialogTitle` quando o titulo estiver vazio, mantendo acessibilidade.

---

### 2. ProspectionSection - Cor da Aba Selecionada

**Arquivo:** `src/components/sections/ProspectionSection.tsx`

**Mudanca na linha 115:**

| Estado | Cor Atual | Nova Cor |
|--------|-----------|----------|
| Aba selecionada (isActive) | `#101824` (escuro) | `#E8E6E3` (bege claro) |

**Ajuste adicional necessario:**
- Cor do texto quando ativo: mudar de `text-white` para `text-zinc-900` (ou `#101824`) para garantir contraste sobre fundo claro

```tsx
// Antes:
${isActive ? 'text-white' : 'text-zinc-600 hover:text-zinc-900'}
style={{ backgroundColor: isActive ? '#101824' : 'transparent' }}

// Depois:
${isActive ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'}
style={{ backgroundColor: isActive ? '#E8E6E3' : 'transparent' }}
```

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/locales/pt/translation.json` | Limpar `waitlist.title`, alterar `waitlist.submit` para "Enviar" |
| `src/locales/en/translation.json` | Limpar `waitlist.title`, alterar `waitlist.submit` para "Send" |
| `src/components/ui/WaitlistModal.tsx` | Condicional para ocultar titulo vazio |
| `src/components/sections/ProspectionSection.tsx` | Alterar cor de fundo e texto da aba ativa |

---

## Resultado Visual Esperado

### Modal (sem titulo):
```
+--------------------------------+
|                                |
|  Nome completo *               |
|  [________________]            |
|                                |
|  E-mail de trabalho *          |
|  [________________]            |
|                                |
|  Telefone *                    |
|  [________________]            |
|                                |
|  [ Enviar ]                    |
|                                |
+--------------------------------+
```

### Tabs de Prospeccao:
```
+------------------+
| [Vendas]  <- fundo #E8E6E3, texto escuro
| Marketing
| Financeiro
| Atendimento
| Operacoes
+------------------+
```

