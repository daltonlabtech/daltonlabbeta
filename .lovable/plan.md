
# Plano: Banco de Dados para Lista de Espera

## Resumo

Criar um banco de dados para armazenar os leads da lista de espera, incluindo nome, email, telefone e qual produto/agente o cliente se interessou (Agente de Conteudo ou Agente de Anuncio).

---

## Arquitetura

```text
+------------------+     +------------------+     +------------------+
|   WaitlistModal  | --> |   Edge Function  | --> |    Supabase      |
|                  |     |                  |     |                  |
|  Nome, Email,    |     |  submit-waitlist |     |  waitlist_leads  |
|  Telefone,       |     |                  |     |                  |
|  Produto         |     |  Validacao +     |     |  Armazena dados  |
+------------------+     |  Insercao        |     +------------------+
                         +------------------+
```

---

## Estrutura do Banco de Dados

### Tabela: `waitlist_leads`

| Coluna | Tipo | Descricao |
|--------|------|-----------|
| `id` | uuid | Chave primaria (gerada automaticamente) |
| `name` | text | Nome completo do lead |
| `email` | text | Email corporativo |
| `phone` | text | Telefone |
| `product` | text | Produto de interesse: 'conteudo' ou 'anuncio' |
| `source` | text | Origem completa (ex: 'prospection_conteudo') |
| `created_at` | timestamp | Data/hora do cadastro |

---

## Arquivos a Criar

### 1. Migration SQL
Criar tabela `waitlist_leads` com as colunas necessarias.

### 2. `supabase/functions/submit-waitlist/index.ts`
Edge function para receber os dados do formulario e inserir no banco.

**Funcionalidades:**
- Recebe: name, email, phone, product, source
- Valida campos obrigatorios
- Valida email corporativo (bloqueia Gmail, Hotmail, Outlook)
- Insere no banco de dados
- Retorna sucesso ou erro

### 3. `supabase/config.toml`
Configuracao do Supabase com a edge function.

---

## Arquivos a Modificar

### 1. `src/components/ui/WaitlistModal.tsx`

**Mudancas:**
- Adicionar prop `product` para identificar qual agente (conteudo ou anuncio)
- Substituir simulacao por chamada real a edge function
- Manter validacao client-side + adicionar tratamento de erros da API

### 2. `src/components/sections/ProspectionSection.tsx`

**Mudancas:**
- Passar o produto ativo (activeTab) como prop `product` para o WaitlistModal
- Mapear 'conteudo' e 'anuncio' para nomes amigaveis

---

## Fluxo de Dados

1. Usuario clica em "Lista de espera" no card Conteudo ou Anuncio
2. Modal abre com `product='conteudo'` ou `product='anuncio'`
3. Usuario preenche nome, email e telefone
4. Ao submeter:
   - Validacao client-side (campos, email corporativo)
   - Chamada POST para `/functions/v1/submit-waitlist`
   - Edge function valida e insere no Supabase
   - Retorna sucesso/erro
5. Modal exibe feedback (sucesso ou erro)
6. Tracking GTM continua funcionando normalmente

---

## Validacao de Email (Duplicada)

A validacao de email corporativo sera feita em **dois lugares** para seguranca:

1. **Client-side** (WaitlistModal.tsx) - Feedback imediato
2. **Server-side** (Edge Function) - Seguranca contra bypass

Dominios bloqueados:
- gmail.com
- hotmail.com
- outlook.com
- yahoo.com
- icloud.com
- live.com
- uol.com.br

---

## Consulta de Dados

Apos implementacao, voce podera ver os leads no painel do Supabase:
- Acessar: Database > Tables > waitlist_leads
- Ou executar SQL: `SELECT * FROM waitlist_leads ORDER BY created_at DESC`

---

## Seguranca

- RLS (Row Level Security) sera configurado para permitir apenas INSERT publico
- SELECT/UPDATE/DELETE bloqueados para usuarios anonimos
- Dados sensiveis protegidos no banco
