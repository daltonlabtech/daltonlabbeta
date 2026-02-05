
## Ajustar Header: Botão CTA + Remover Link de Navegação

### Resumo
Adicionar um botão destacado "Fale com o Dalton" no canto superior direito do header e remover esse item da navegação central.

---

### Alterações

**1. Remover link da navegação**
- Remover `{ label: t('nav.talkToDalton'), href: '/fale-com-o-dalton' }` do array `navLinks`
- Navegação ficará apenas com: Produto e Quem somos

**2. Adicionar botão CTA no desktop**
- Posicionar à esquerda do Language Selector
- Link direto para `https://chat.daltonlab.ai/` (conforme padrão de CTAs do projeto)
- Estilo: botão com fundo claro (#F5F3F0), texto escuro, bordas arredondadas
- Incluir tracking de analytics

**3. Adicionar botão CTA no mobile**
- Adicionar botão destacado no menu hamburguer (antes do Language Selector)
- Mesmo estilo e comportamento do desktop

---

### Estrutura Visual

```text
Desktop:
┌─────────────────────────────────────────────────────────┐
│ [Logo]     Produto | Quem somos     [Fale com Dalton] 🌐│
└─────────────────────────────────────────────────────────┘

Mobile (menu aberto):
┌──────────────┐
│ Produto      │
│ Quem somos   │
│──────────────│
│ [Fale com Dalton] ← botão destacado
│──────────────│
│ 🌐 Idioma    │
└──────────────┘
```

---

### Detalhes Técnicos

- Importar `trackCtaClick` (já importado)
- Botão usa `target="_blank"` e `rel="noopener noreferrer"`
- Classe do botão: `px-4 py-2 rounded-full bg-[#F5F3F0] text-[#101823] text-sm font-medium hover:opacity-90 transition-all`
