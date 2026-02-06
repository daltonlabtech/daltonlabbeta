

# Plano: Ajustes na Dobra "Lidere a Transformacao"

## Resumo

Duas alteracoes na secao final de CTA:
1. Atualizar o texto do subtitulo
2. Corrigir o estilo do botao no hover e adicionar modal de captura de leads

---

## Alteracoes

### 1. Atualizar Texto do Subtitulo

**Arquivo:** `src/locales/pt/translation.json`

| Campo | Valor Atual | Novo Valor |
|-------|-------------|------------|
| `home.finalCta.subtitle` | "O Clube Dalton Lab e o ponto de encontro..." | "O Clube e o ponto de encontro para lideres visionarios que querem ser a vanguarda da era agentica." |

**Arquivo:** `src/locales/en/translation.json`

| Campo | Valor Atual | Novo Valor |
|-------|-------------|------------|
| `home.finalCta.subtitle` | (equivalente em ingles) | "The Club is the meeting point for visionary leaders who want to be at the forefront of the agentic era." |

---

### 2. Corrigir Botao e Adicionar Modal

**Arquivo:** `src/components/sections/HomeFinalCTASection.tsx`

**Problema atual:** O botao tem `hover:bg-[#F5F3F0] hover:text-[#101823]` que faz o fundo ficar branco, mas o texto pode perder contraste.

**Solucao:**
- Remover o link externo (`<a href="...">`)
- Transformar em `<button>` que abre um modal
- Ajustar estilo de hover para manter legibilidade
- Adicionar estado para controlar abertura do modal

**Logica do Modal:**
- Reutilizar o componente `WaitlistModal` existente
- O modal ja possui:
  - Validacao de email corporativo (bloqueia gmail, hotmail, outlook, yahoo, icloud, live, uol)
  - Campo de nome obrigatorio
  - Campo de email obrigatorio
  - Campo de telefone (sera mantido como opcional ou removido conforme solicitado)
  - Integracao com Supabase para salvar leads

**Ajuste no WaitlistModal:**
- Criar uma versao simplificada ou prop para mostrar apenas nome + email (sem telefone)
- OU usar o modal existente que ja pede nome, email e telefone

---

## Arquivos Afetados

| Arquivo | Alteracao |
|---------|-----------|
| `src/locales/pt/translation.json` | Atualizar subtitulo |
| `src/locales/en/translation.json` | Atualizar subtitulo |
| `src/components/sections/HomeFinalCTASection.tsx` | Adicionar estado do modal, trocar `<a>` por `<button>`, importar WaitlistModal |

---

## Codigo Resultante (HomeFinalCTASection)

O botao sera alterado de:
```tsx
<a href="https://chat.daltonlab.ai/" ...>
  {t('home.finalCta.cta')}
</a>
```

Para:
```tsx
<button
  onClick={() => setIsModalOpen(true)}
  className="inline-flex items-center justify-center font-medium text-xs md:text-sm px-5 py-2.5 rounded-full border border-[#F5F3F0] text-[#F5F3F0] hover:bg-[#F5F3F0]/10 transition-all duration-300"
>
  {t('home.finalCta.cta')}
</button>

<WaitlistModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  formLocation="final_cta_clube"
  product="Clube Dalton Lab"
/>
```

**Nota sobre hover:** Alterado de `hover:bg-[#F5F3F0]` (fundo branco solido) para `hover:bg-[#F5F3F0]/10` (fundo branco com 10% de opacidade) para manter a legibilidade do texto.

---

## Validacao de Email (ja implementada)

O `WaitlistModal` ja bloqueia os seguintes dominios:
- gmail.com
- hotmail.com
- outlook.com
- yahoo.com
- icloud.com
- live.com
- uol.com.br

