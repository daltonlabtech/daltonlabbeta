

# Plano: Atualizacoes gerais no site

Este plano cobre todas as alteracoes solicitadas, organizadas por area.

---

## 1. Titulo "Transforme sua empresa em uma Organizacao Agentica" em negrito

**Arquivo:** `src/components/sections/HomeHeroSection.tsx`

Adicionar `font-bold` nas `<span>` do titulo H1 (mobile e desktop).

---

## 2. Ocultar placeholder de video e substituir por texto

**Arquivo:** `src/components/sections/DefinitionSection.tsx`

- Remover o bloco do video placeholder (linhas 86-105) e substituir por 3 paragrafos de texto estilizados.
- Manter o mesmo `max-w-4xl mx-auto` para o bloco de texto.

O texto a ser inserido:

> "A inteligencia artificial esta provocando a maior reestruturacao organizacional desde a revolucao digital. Nao se trata mais de uma ferramenta, mas de uma nova arquitetura de negocios onde humanos e agentes de IA trabalham em conjunto, em escala. Chamamos isso de organizacao agentica."
>
> "O verdadeiro desafio, no entanto, nao e a falta de conhecimento sobre IA. E a paralisia que existe entre saber que e preciso agir e nao saber como comecar. Essa incerteza nao e apenas estrategica; ela se traduz em perda de eficiencia, tempo e vantagem competitiva todos os dias."
>
> "No Dalton Lab, eliminamos essa lacuna comecando pelo processo, nao pela tecnologia. Convertemos a incerteza em um plano de transformacao claro, redesenhando seu modelo operacional para uma simbiose real entre humanos e agentes. Lideramos a construcao de um sistema robusto, projetado para gerar valor exponencial e posicionar sua empresa a frente da concorrencia."

**Comando para restaurar o placeholder de video no futuro:**

```tsx
{/* Video Placeholder - inserir abaixo do titulo na DefinitionSection */}
<div
  className={`relative w-full max-w-4xl mx-auto mb-10 md:mb-16 rounded-xl md:rounded-2xl overflow-hidden ${revealClasses(isVisible)}`}
  style={{ ...getStaggerDelay(1), aspectRatio: '16/9', backgroundColor: '#1a1f2e' }}
>
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
    <div
      className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center"
      style={{ backgroundColor: 'rgba(245, 243, 240, 0.15)' }}
    >
      <Play className="w-6 h-6 md:w-8 md:h-8 ml-1" style={{ color: 'rgba(245, 243, 240, 0.7)' }} />
    </div>
    <span
      className="text-xs md:text-sm font-medium"
      style={{ color: 'rgba(245, 243, 240, 0.5)' }}
    >
      Video em breve
    </span>
  </div>
</div>
```

---

## 3. Mudar CTAs "Falar com Especialista" para "Fale conosco" e remover link do chat

**Arquivos afetados:**
- `src/locales/pt/translation.json`: `nav.startTransformation` de "Falar com Especialista" para "Fale conosco", `hero.cta` para "Fale conosco", `home.prospection.cta` para "Fale conosco"
- `src/locales/en/translation.json`: equivalentes em ingles ("Contact us")
- `src/components/Header.tsx`: trocar `<a href="https://chat.daltonlab.ai/">` por `<a href="mailto:administrativo@daltonlab.ai">` (desktop e mobile)
- `src/components/sections/HomeHeroSection.tsx`: trocar link do CTA para mailto
- `src/components/sections/ProspectionSection.tsx`: trocar `window.open('https://chat.daltonlab.ai/')` por mailto

---

## 4. Remover subtitulo do Hero

**Arquivo:** `src/components/sections/HomeHeroSection.tsx`

Remover o bloco de subtitulo (linhas 107-121) que exibe `hero.subtitle1`.

---

## 5. Retornar tag "Presente em" acima do H1

**Arquivo:** `src/components/sections/HomeHeroSection.tsx`

Adicionar um badge acima do H1 com o texto "Presente em" seguido de uma animacao ciclica entre os textos: "Europa", "Asia", "Africa", "America" (rotacao a cada 2 segundos, similar ao antigo TechLogoBadge mas com texto).

---

## 6. Alterar titulo da DefinitionSection

**Arquivo:** `src/locales/pt/translation.json`

- `home.definition.titleLine1`: "A primeira empresa do Brasil"
- `home.definition.titleLine2`: "especializada em transformacao agentica"

---

## 7. Remover topico "Diagnostico" da JourneySection

**Arquivo:** `src/locales/pt/translation.json`

Remover o primeiro item do array `home.journey.pillars` (Diagnostico). Renumerar os restantes para 01, 02, 03.

Tambem atualizar o grid em `src/components/sections/JourneySection.tsx` de `lg:grid-cols-4` para `lg:grid-cols-3`.

**Arquivo:** `src/locales/en/translation.json` - mesma alteracao.

---

## 8. Atualizar textos dos pilares restantes da JourneySection

**Arquivo:** `src/locales/pt/translation.json`

- Pilar "Processos AI-first" summary: "Redesenhamos seus processos colocando a inteligencia artificial no centro da operacao"
- Pilar "Pessoas e cultura" summary: "Capacitamos suas equipes para colaborar efetivamente com agentes de IA"
- Pilar "Tecnologia" summary: "Construimos e implementamos a infraestrutura agentica ideal para seu negocio"

---

## 9. Adicionar preview do podcast na MediaSection

**Arquivo:** `src/components/sections/MediaSection.tsx`

Adicionar um embed do Spotify abaixo dos blog posts usando um iframe:

```html
<iframe
  style="border-radius:12px"
  src="https://open.spotify.com/embed/episode/6VzyyF8zIzsB5oecGUjWIY?utm_source=generator&theme=0"
  width="100%"
  height="152"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
```

---

## 10. Leads do CTA "Entrar na lista de espera"

A captura de leads ja esta implementada e funcional:
- O botao "Entrar na lista de espera" na `HomeFinalCTASection` abre o `WaitlistModal`
- O modal coleta nome, email corporativo e telefone
- Os dados sao enviados via Edge Function `submit-waitlist` e salvos na tabela `waitlist_leads` no banco de dados
- Validacoes de email corporativo, telefone, honeypot e rate limiting ja estao ativas

Nenhuma alteracao necessaria neste ponto.

---

## Resumo dos arquivos a modificar

| Arquivo | Alteracoes |
|---------|-----------|
| `src/locales/pt/translation.json` | CTAs, titulo definition, pilares journey |
| `src/locales/en/translation.json` | CTAs, pilares journey (remover Diagnostico) |
| `src/components/sections/HomeHeroSection.tsx` | Negrito titulo, remover subtitulo, badge "Presente em", trocar CTA |
| `src/components/sections/DefinitionSection.tsx` | Substituir video por texto |
| `src/components/sections/ProspectionSection.tsx` | Trocar CTA link |
| `src/components/sections/JourneySection.tsx` | Grid de 4 para 3 colunas |
| `src/components/sections/MediaSection.tsx` | Adicionar embed Spotify |
| `src/components/Header.tsx` | Trocar CTA link |

