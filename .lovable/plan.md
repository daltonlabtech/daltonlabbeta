

# Plano: Corrigir Politica RLS da tabela waitlist_leads

## Problema

A tabela `waitlist_leads` possui uma politica de INSERT publica com `WITH CHECK (true)`, permitindo que qualquer pessoa com a chave anonima insira registros diretamente no banco, bypassando as validacoes da edge function (honeypot, rate limiting, sanitizacao).

## Solucao

Remover a politica publica de INSERT. Somente a edge function (que usa Service Role) conseguira inserir registros.

### Migracao SQL

```sql
DROP POLICY "Anyone can insert waitlist leads" ON public.waitlist_leads;
```

Nenhuma outra alteracao e necessaria -- a edge function `submit-waitlist` ja usa o client com Service Role, que ignora RLS. O frontend ja chama `supabase.functions.invoke('submit-waitlist')`, entao o fluxo continua funcionando normalmente.

## Validacao

1. Testar o formulario de waitlist no preview para confirmar que a submissao via edge function continua funcionando
2. Confirmar que uma chamada direta via `supabase.from('waitlist_leads').insert(...)` com a chave anonima retorna erro de permissao

## Arquivos Afetados

| Recurso | Alteracao |
|---------|-----------|
| Migracao SQL | `DROP POLICY` na politica de INSERT publico |

