
# Plano: Titulo dinamico com efeito de digitacao na GlobalMapSection

## Resumo
Substituir o titulo estatico "O Dalton Lab e global. E esta crescendo." por um titulo com parte fixa ("Atuacao global nos setores de ") e parte dinamica que cicla entre os setores (Agro, Tecnologia, Saude, Varejo, Advocacia) com efeito de digitacao e apagamento letra por letra. As tags de industria abaixo do titulo serao removidas pois a informacao ja estara no titulo.

---

## Alteracao 1: Criar hook useTypewriter
**Arquivo novo:** `src/hooks/useTypewriter.ts`

Hook customizado que gerencia o efeito de digitacao/apagamento:
- Recebe uma lista de palavras e configuracoes de velocidade
- Usa `useState` e `useEffect` com `setTimeout` para controlar o estado
- Fases: digitando -> pausando -> apagando -> proximo
- Velocidade de digitacao: ~80ms por letra
- Velocidade de apagamento: ~50ms por letra
- Pausa apos palavra completa: ~1.5s
- Retorna o texto parcial atual e um cursor piscante

## Alteracao 2: Atualizar GlobalMapSection
**Arquivo:** `src/components/sections/GlobalMapSection.tsx`

- Importar o hook `useTypewriter`
- Substituir o `<h2>` estatico por:
  - Texto fixo: "Atuacao global nos setores de "
  - Texto dinamico: resultado do hook useTypewriter com as palavras `['Agro', 'Tecnologia', 'Saude', 'Varejo', 'Advocacia']`
  - Cursor piscante (barra `|`) ao lado do texto dinamico
- Remover o bloco de tags de industria (`INDUSTRIES` array e o `flex-wrap` com as pills) pois a informacao ja esta integrada no titulo
- Manter o array `INDUSTRIES` apenas se necessario para referencia, ou remove-lo

---

## Detalhes Tecnicos

### Hook useTypewriter
```text
Estados:
- wordIndex: indice da palavra atual na lista
- charIndex: numero de caracteres exibidos
- phase: 'typing' | 'pausing' | 'deleting'

Loop:
1. phase === 'typing': incrementa charIndex a cada ~80ms ate completar a palavra
2. phase === 'pausing': aguarda ~1500ms, depois muda para 'deleting'
3. phase === 'deleting': decrementa charIndex a cada ~50ms ate zero
4. charIndex === 0 && phase === 'deleting': avanca wordIndex (mod length), volta para 'typing'
```

### Estrutura do titulo
```text
<h2>
  "Atuacao global nos setores de "
  <span style={{ color dinâmica por setor }}>
    {textoParci al}
  </span>
  <span className="animate-pulse">|</span>
</h2>
```

A cor do texto dinamico mudara conforme o setor atual, usando as cores ja definidas no array INDUSTRIES (verde para Agro, laranja para Tecnologia, etc.), criando um efeito visual mais rico.

### Cursor piscante
Implementado com CSS animation `blink` ou classe `animate-pulse` do Tailwind, exibido como uma barra vertical `|` logo apos o texto dinamico.
