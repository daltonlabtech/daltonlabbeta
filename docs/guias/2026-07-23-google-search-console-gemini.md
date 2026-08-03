# Guia: indexar no Google (→ Gemini / AI Overviews) via Search Console

**Data:** 2026-07-23
**Para:** Diego — executar no [Google Search Console](https://search.google.com/search-console) (UI, logado com a conta que tem a propriedade).
**Contexto:** handoff `2026-07-23-geo-freshness-webhook.md`, seção 7 passo 2.

---

## 0. Por que isto é uma track separada do Bing

São **dois pipelines de IA distintos** — o que fizemos pro Bing **não alcança o Google**:

| Motor de IA | Índice que consome | Como alimentamos |
|---|---|---|
| ChatGPT · Copilot · Perplexity | **Bing** | Bing Webmaster + **IndexNow** ✅ (feito) |
| **Gemini** · Google AI Overviews | **Google** | **Google Search Console + Googlebot** ← *este guia* |

**IndexNow NÃO alimenta o Google.** O único caminho pro Gemini é o Google indexar as páginas. Sem estar no índice do Google, o site não tem como ser citado nas respostas do Gemini/AI Overviews.

Pré-condição já resolvida: a propriedade existe no GSC (foi dela que o Bing foi importado, via os 3 `google-site-verification` no DNS). Este guia é só **reenviar sitemap + forçar o crawl das URLs-chave**.

---

## 1. Confirmar a propriedade certa (30s)

No seletor de propriedade (canto superior esquerdo), confirme qual você tem:

- **Ideal — Domain property** `daltonlab.ai` (ícone de globo): cobre apex + www + http/https de uma vez. Se existe, use essa.
- **Se só houver URL-prefix:** garanta que está na **`https://www.daltonlab.ai/`** (host **canônico** — apex faz 308→www). Se a que existe for a apex (`https://daltonlab.ai/`), as inspeções de URL www vão falhar; nesse caso adicione a propriedade `https://www.daltonlab.ai/` (a verificação por DNS TXT já cobre, é o mesmo domínio) ou, melhor, crie a **Domain property**.

> Regra: **sempre trabalhar na propriedade que casa com a URL canônica `www`.** Foi exatamente a pegadinha "apex ≠ www" que tivemos no Bing.

---

## 2. Reenviar o sitemap (2 min)

Menu lateral → **Sitemaps**.

1. Em "Adicionar novo sitemap", cole a **URL completa**: `https://www.daltonlab.ai/sitemap.xml`
   ⚠️ Como a nossa é **Domain property** (`sc-domain:daltonlab.ai`), o atalho `sitemap.xml` **NÃO funciona** (dá "Endereço do sitemap inválido") — esse atalho só vale em propriedades URL-prefix. Domain property exige a URL inteira com `https://www...`.
2. **Enviar.** Status esperado após alguns minutos/horas: **"Sucesso"**, **27 páginas descobertas**.
3. Se já houver um sitemap antigo listado apontando pra `http://daltonlab.ai/...` (não-canônico) ou `aisprint.daltonlab.ai` (legado) → **remover** (lixo, igual à faxina do Bing). Manter só o `www` canônico.

O sitemap é a base: dá ao Googlebot a lista das 27 URLs + o `lastmod` (que o rebuild da Railway atualiza sozinho). Mas sitemap ≠ indexação imediata — por isso o passo 3.

---

## 3. Forçar o crawl das URLs-chave — "Solicitar indexação" (o passo que acelera)

O sitemap deixa o Google descobrir no ritmo dele (dias/semanas). Pra apressar as páginas que importam, use a **Inspeção de URL** uma a uma.

**Como, pra cada URL:**
1. Cole a URL na **barra de inspeção** no topo (a lupa "Inspecionar qualquer URL...").
2. Espere o resultado. Se disser "URL não está no Google", clique em **TESTAR URL PUBLICADA** (Live Test) → confirma que o Googlebot consegue renderizar o HTML prerenderizado (é o análogo do "URL can be indexed" que vimos no Bing).
3. Clique em **SOLICITAR INDEXAÇÃO**. Entra na fila de crawl prioritária.

> **Cota:** o "Solicitar indexação" é limitado a **~10 URLs/dia** por propriedade. Por isso a lista abaixo está priorizada — faça o **Lote 1 hoje**, o resto amanhã.

### Lote 1 — fazer HOJE (institucional + artigos-pilar)
```
https://www.daltonlab.ai/
https://www.daltonlab.ai/produto
https://www.daltonlab.ai/quem-somos
https://www.daltonlab.ai/artigos
https://www.daltonlab.ai/artigos/o-que-e-transformacao-agentica-o-novo-patamar-alem-da-transformacao-digital
https://www.daltonlab.ai/artigos/o-que-e-organizacao-agentica-e-por-que-vai-substituir-o-modelo-industrial-de-empresas
https://www.daltonlab.ai/artigos/o-que-e-um-agente-de-ia-diferenca-entre-automacao-copiloto-e-agente-autonomo
https://www.daltonlab.ai/artigos/nao-maior-agentica-a-tese-que-venceu-1-500-startups-no-web-summit-rio-2026
https://www.daltonlab.ai/artigos/da-intencao-a-execucao-o-roteiro-do-ceo-para-a-transformacao-agentica
https://www.daltonlab.ai/artigos/os-4-niveis-de-maturidade-agentica-em-qual-estagio-sua-empresa-esta
```
*(Por que estes: as 4 páginas institucionais são a cara da marca; os 6 artigos são os "pilar" — respondem perguntas conceituais que o Gemini tende a citar: "o que é transformação/organização agêntica", "o que é um agente de IA", a tese do Web Summit, o roteiro do CEO, os níveis de maturidade.)*

### Lote 2 — amanhã (restante dos artigos)
```
https://www.daltonlab.ai/artigos/service-as-a-software-voce-nao-compra-o-software-compra-o-resultado
https://www.daltonlab.ai/artigos/organizacao-agentica-a-ruptura-estrutural-que-define-a-proxima-era-da-produtividade
https://www.daltonlab.ai/artigos/ia-agentica-vs-ia-generativa-qual-implementar-primeiro
https://www.daltonlab.ai/artigos/agentes-de-ia-vs-automacao-tradicional
https://www.daltonlab.ai/artigos/o-organograma-agentico-como-fica-o-time-com-agentes
https://www.daltonlab.ai/artigos/processos-pessoas-ferramentas-a-sequencia-certa
https://www.daltonlab.ai/artigos/ai-first-ou-ai-last-por-que-a-ia-vem-por-ultimo-numa-organizacao-agentica
https://www.daltonlab.ai/artigos/ai-last-not-ai-first-por-que-a-ordem-importa-mais-do-que-a-tecnologia
https://www.daltonlab.ai/artigos/empresa-agentica-ou-organizacao-agentica-a-diferenca-que-muda-a-decisao
https://www.daltonlab.ai/artigos/time-de-uma-pessoa-so-o-que-muda-quando-um-agente-de-ia-entra-na-equacao-ai-agent
```
### Lote 3 — depois de amanhã (cauda)
```
https://www.daltonlab.ai/politica-de-privacidade
https://www.daltonlab.ai/termos-de-uso
https://www.daltonlab.ai/artigos/como-crescer-sem-contratar-na-mesma-proporcao
https://www.daltonlab.ai/artigos/por-que-90-das-empresas-usam-ia-e-quase-nada-mudou
https://www.daltonlab.ai/artigos/por-que-a-maioria-das-iniciativas-de-ia-nao-gera-retorno
https://www.daltonlab.ai/artigos/individuos-produtivos-nao-fazem-empresas-produtivas-o-problema-que-nenhuma-ferramenta-de-ia-resolve
https://www.daltonlab.ai/artigos/o-paradoxo-da-ia-no-marketing-a-tecnologia-esta-em-todo-lugar-menos-nos-resultados
```
*(As 2 páginas legais são baixa prioridade de citação; deixei no fim de propósito.)*

---

## 4. O que acompanhar depois (relatório de Páginas)

Menu lateral → **Indexação › Páginas**. Nas próximas 1–3 semanas:

- **"Indexada"** subindo em direção a 27 = objetivo.
- **"Rastreada, no momento não indexada"** / **"Detectada, no momento não indexada"** = o Google viu mas não indexou ainda. Normal no começo; se um artigo-pilar travar aqui por semanas, reinspecionar e re-solicitar.
- Clique em cada status pra ver **quais** URLs caíram nele.

Depois, em **Desempenho › Resultados da pesquisa**, dá pra ver impressões/cliques por página (sinal de que já está no índice e aparecendo).

---

## 5. Automação: o que é automático e o que não é

- **Sitemap = automático.** Envia **uma vez** (feito). Daí pra frente o webhook Sanity→Railway atualiza o `lastmod` a cada publicação e o Google relê sozinho. **Zero trabalho recorrente.**
- **"Solicitar indexação" = manual e NÃO tem API confiável.** Existe a *Google Indexing API*, mas oficialmente só suporta vagas de emprego e transmissões ao vivo — usar em artigos é fora das regras (Google ignora/penaliza). Não vale automatizar.
- **Mas é um empurrão ÚNICO, não uma tarefa contínua.** Só serve pra acelerar a primeira leva das 27 URLs. Artigos novos daqui pra frente são cobertos pelo sitemap automático — não se clica em nada.
- **Duas opções, ambas "sem trabalho manual pra sempre":**
  - **A — só sitemap:** zero cliques; Google chega nas 27 em dias/semanas.
  - **B — batch inicial:** ~10 cliques/dia × 3 dias, **uma vez**; acelera as páginas-pilar pra dias. (Recomendado: Lote 1 hoje, resto pelo sitemap.)

## 6. Como medir "estamos no Gemini?" — os 3 estágios

Não existe sinal automático "estamos no Gemini agora". São três estágios, só o 1º e 2º medíveis no GSC:

1. **Indexado** — GSC → Indexação › Páginas subindo pra 27. Dias/semanas. **Pré-condição, não garantia.**
2. **Aparecendo na busca do Google** — GSC → Desempenho: impressões/cliques por página. Semanas.
3. **Citado no Gemini / AI Overviews** — semanas a **meses**; depende de autoridade+relevância, não só de indexação.

**⚠️ O GSC NÃO mede o estágio 3.** Verificado em 2026-07-23: **Desempenho → Aspecto da pesquisa = "Nenhum dado"** — a propriedade não tem o breakout de AI Overviews (Google libera aos poucos, por região; a nossa ainda não tem) nem resultados enriquecidos rastreados. As impressões de AI Overview, quando houver, ficam embutidas no total do Desempenho, sem fatia própria.

**Placar do estágio 3 = teste manual (único caminho hoje):**
1. Abrir o Gemini / busca do Google com AI Overview e perguntar as perguntas-alvo: "o que é organização agêntica", "o que é um agente de IA", "o que é transformação agêntica".
2. Ver se a resposta cita/linka `daltonlab.ai`.
3. Anotar **data + citou?**. Repetir a cada 1–2 semanas. Marco zero = hoje, 0 citações. Simétrico ao `AI Performance` do Bing.

## 7. Realidade sobre o frescor pro Google

- **Não há um "IndexNow do Google".** A alavanca de frescor é: `lastmod` do sitemap (rebuild da Railway já atualiza) + solicitação manual quando publicar algo importante. Ganho em **dias**, não em minutos como no Bing.
- **JSON-LD ainda não vira resultado enriquecido rastreado** (o "Nenhum dado" acima confirma). Normal enquanto os artigos novos não foram (re)rastreados; deve popular conforme o Googlebot repassa.

---

## 8. Checklist rápido

- [ ] Propriedade correta selecionada (Domain `daltonlab.ai` ou URL-prefix `https://www.daltonlab.ai/`)
- [ ] Sitemap `sitemap.xml` reenviado → aguardando status "Sucesso" / 27 descobertas
- [ ] Sitemaps não-canônicos/legados removidos
- [ ] Lote 1 (10 URLs) "Solicitar indexação" hoje
- [ ] Lote 2 amanhã · Lote 3 depois
- [ ] Agendar revisão do relatório **Páginas** em ~1 semana
