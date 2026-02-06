

# Reimplementacao Completa: Organizacoes Agenticas

## Contexto

O projeto reverteu para uma versao antiga focada em "Agentes de IA para Vendas". Precisamos reimplementar toda a narrativa de **Organizacoes Agenticas** conforme documentado na memoria do projeto.

---

## Resumo das Mudancas

A pagina inicial sera reestruturada de 8 secoes antigas para 8 secoes novas, com novo conteudo, novo Header e novos componentes.

### Estrutura Atual vs. Nova

```text
ATUAL (vendas)                    NOVO (agentico)
--------------------------        --------------------------
Header (Produto, Quem Somos)  ->  Header (Home, Transformacao, Midia, Quem Somos)
HeroSection (Do lead a venda) ->  HomeHeroSection (Chegou a Era...)
ClientsSection                ->  DefinitionSection
ProspectionSection (vendas)   ->  StatsSection
InsightsSection               ->  JourneySection (#journey)
SquadPlansSection             ->  ProspectionSection (atualizada, setores)
AudioDemoSection              ->  HomeFinalCTASection (Clube)
FAQSection                    ->  MediaSection (#media)
Footer                        ->  Footer (mantido)
```

---

## Etapas de Implementacao

### Etapa 1: Traducoes (PT + EN)

Atualizar `src/locales/pt/translation.json` e `src/locales/en/translation.json` com as novas chaves:

- **nav**: Adicionar `"home": "Home"`, `"transformation": "Transformacao"`, `"media": "Midia"`, alterar CTA para `"startTransformation": "Iniciar Transformacao"`
- **hero**: Alterar para `"titleLine1": "Chegou a Era das"`, `"titleLine2": "Organizacoes Agenticas"`, `"subtitle1": "Transforme sua empresa com IA Agentica."`
- **home.definition**: Titulo "Transforme sua organizacao em agentica", tres paragrafos sobre modelo cooperativo
- **home.stats**: Metricas `>30%`, `>50%`, `>80%` com descricoes
- **home.journey**: Titulo "Sua jornada para uma transformacao agentica", subtitulo, tres pilares (Workflows AI-first, Pessoas e cultura, Tecnologia) com textos expandiveis
- **home.prospection**: Titulo "Reimagine sua empresa", subtitulo, abas para Vendas/Marketing/Financeiro/Atendimento/Operacoes
- **home.finalCta**: Titulo "Lidere a Transformacao. Junte-se ao Clube."
- **home.media**: Rotulo "Noticia" para artigos de midia

### Etapa 2: Novos Componentes

Criar 5 novos componentes em `src/components/sections/`:

1. **HomeHeroSection.tsx**
   - Reutiliza video de fundo e poster existentes
   - Titulo: "Chegou a Era das Organizacoes Agenticas" (font-normal, 64px desktop / 48px mobile)
   - Subtitulo: "Transforme sua empresa com IA Agentica."
   - Overlay escuro `rgba(0,0,0,0.4)` + text-shadow `0 2px 8px rgba(0,0,0,0.3)`
   - CTA: "Iniciar Transformacao" apontando para `https://chat.daltonlab.ai/`
   - Animacoes fade-in existentes mantidas

2. **DefinitionSection.tsx**
   - Fundo `#F5F3F0`
   - Titulo centralizado no topo
   - Layout de duas colunas: texto justificado (cor `rgba(16, 24, 35, 0.7)`) + imagem do organograma (rounded-2xl)
   - Tres paragrafos sobre evolucao para modelo cooperativo
   - Usa `useScrollReveal` para animacao

3. **StatsSection.tsx**
   - Tres metricas: `>30%`, `>50%`, `>80%`
   - Fonte Inter, 80px, peso 800
   - Animacao de contagem crescente ao entrar no viewport (IntersectionObserver)
   - Espacamento padronizado (100px desktop, 60px mobile)

4. **JourneySection.tsx**
   - `id="journey"` para ancoragem
   - Fundo `#E8E6E3`
   - Numeracao sequencial (01, 02, 03)
   - Tres pilares com descricoes expandiveis (botao "Ver mais")
   - Cards sem bordas, fundo `#E8E6E3`

5. **MediaSection.tsx**
   - `id="media"` para ancoragem
   - Rotulo "Noticia"
   - Cards de artigos de midia com links externos

### Etapa 3: Atualizar ProspectionSection

Modificar `src/components/sections/ProspectionSection.tsx`:
- Titulo: "Reimagine sua empresa"
- Subtitulo: "Nossa tecnologia proprietaria se adapta as necessidades do seu negocio."
- Fundo: `#E8E6E3`
- Abas expandidas: Vendas, Marketing, Financeiro, Atendimento, Operacoes
- Remover sub-labels repetitivas
- Reduzir espacamento vertical

### Etapa 4: HomeFinalCTASection

Criar/Atualizar `src/components/sections/HomeFinalCTASection.tsx`:
- Titulo: "Lidere a Transformacao. Junte-se ao Clube."
- Sem subtitulo (design minimalista)
- Fundo `#121823`, largura total
- CTA: "Iniciar Transformacao" -> `https://chat.daltonlab.ai/`
- Espacamento vertical reduzido

### Etapa 5: Atualizar Header

Modificar `src/components/Header.tsx`:
- Fundo: `#0D1218` (85% opacidade + backdrop-blur ao rolar)
- Links centralizados: Home, Transformacao (`#journey`), Midia (`#media`), Quem Somos
- CTA: "Iniciar Transformacao" (canto direito)
- Scroll suave para ancoras `#journey` e `#media`

### Etapa 6: Atualizar Index.tsx

Reordenar `src/pages/Index.tsx` com a nova sequencia:
1. Header
2. HomeHeroSection (eagerly loaded)
3. DefinitionSection (lazy)
4. StatsSection (lazy)
5. JourneySection (lazy, id=journey)
6. ProspectionSection (lazy)
7. HomeFinalCTASection (lazy)
8. MediaSection (lazy, id=media)
9. Footer (lazy)

Remover imports de: ClientsSection, InsightsSection, SquadPlansSection, AudioDemoSection, FAQSection.

### Etapa 7: Remover secoes obsoletas (opcional)

Avaliar remocao dos arquivos nao mais usados na pagina inicial:
- `ClientsSection.tsx` (pode ser mantido se usado em outras paginas)
- `InsightsSection.tsx`
- `SquadPlansSection.tsx`
- `AudioDemoSection.tsx`
- `FAQSection.tsx`

---

## Detalhes Tecnicos

### Paleta de Cores
- Header: `#0D1218`
- Secoes escuras (Hero, Final CTA): `#121823` / `#101824`
- Fundo claro: `#F5F3F0`
- Journey e Prospection: `#E8E6E3`
- Texto definicao: `rgba(16, 24, 35, 0.7)`

### Tipografia (Inter)
- Hero titulo: font-normal, 64px desktop / 48px mobile
- Metricas: font-weight 800, 80px
- Secoes: padrao visual unificado

### Espacamento
- Entre secoes: 100px desktop, 60px mobile

### CTA Global
- Texto: "Iniciar Transformacao"
- Link: `https://chat.daltonlab.ai/`
- Excecao: Consultoria Enterprise -> `https://cal.com/daltonlab/consultoria-estrutura-ia`

### Performance
- HomeHeroSection carregada de forma eagerly
- Demais secoes com `React.lazy` + `Suspense`
- Prefetch das proximas secoes apos 1.5s
- Animacoes via `useScrollReveal` (IntersectionObserver)

### Internacionalizacao
- Todas as novas strings traduzidas em PT e EN
- Demais idiomas (ES, FR, DE, IT, ZH, JA) podem ser atualizados numa etapa posterior

---

## Nota sobre Assets

Alguns assets podem precisar ser adicionados:
- Imagem do organograma para DefinitionSection
- Imagens/icones para MediaSection (artigos de midia)

Se nao houver imagens disponíveis, usaremos placeholders com a paleta de cores do projeto ate que os assets reais sejam fornecidos.

