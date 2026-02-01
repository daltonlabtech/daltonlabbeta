
# Plano de Implementacao: Tracking GTM

## Resumo

Implementar Google Tag Manager (GTM-PPF26W8Q) na Landing Page para rastrear eventos de engajamento e conversao. O evento final de funil na LP sera **CTA Click** (clique para ir ao chat), enquanto Lead/MQL/SQL serao rastreados no chat.daltonlab.ai.

---

## Arquivos a Criar

### 1. `src/lib/analytics.ts`
Utilitario central de tracking com funcoes tipadas para enviar eventos ao dataLayer.

**Funcoes:**
- `trackPageView(path, title)` - Visualizacao de pagina
- `trackSectionView(sectionName)` - Secao visivel na viewport
- `trackCtaClick(buttonText, location, destinationUrl)` - Clique em CTA principal
- `trackTabChange(tabName, sectionName)` - Troca de aba
- `trackFaqOpen(questionText)` - Abertura de pergunta no FAQ
- `trackOutboundLink(linkUrl, linkText)` - Link externo (redes sociais)
- `trackWaitlistOpen(location)` - Abriu modal de lista de espera
- `trackWaitlistSubmit(location)` - Enviou formulario de lista de espera

### 2. `src/hooks/useTrackSection.ts`
Hook para detectar quando secoes entram na viewport e disparar `section_view` automaticamente (apenas uma vez por sessao).

---

## Arquivos a Modificar

### 1. `index.html`
Adicionar snippets do GTM no `<head>` e apos `<body>`.

```text
HEAD (linha 4, apos <meta charset>):
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PPF26W8Q');</script>
<!-- End Google Tag Manager -->

BODY (logo apos <body>):
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPF26W8Q"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 2. `src/App.tsx`
Adicionar tracking de `page_view` em cada navegacao de rota usando `useLocation` do React Router.

### 3. `src/components/Header.tsx`
Adicionar `trackCtaClick` no botao "Fale com o Dalton" (location: 'header').

### 4. `src/components/NewtonChatButton.tsx`
Adicionar `trackCtaClick` no botao flutuante (location: 'floating_button').

### 5. `src/components/sections/HeroSection.tsx`
- Adicionar `useTrackSection` para disparar `section_view` quando Hero entrar na viewport
- Adicionar `trackCtaClick` no botao principal (location: 'hero')

### 6. `src/components/sections/ProspectionSection.tsx`
- Adicionar `useTrackSection` para `section_view`
- Adicionar `trackTabChange` quando usuario trocar entre Vendas/Conteudo/Anuncio
- Adicionar `trackCtaClick` nos botoes de CTA (location: 'prospection_vendas', 'prospection_conteudo', 'prospection_anuncio')
- Adicionar `trackWaitlistOpen` quando abrir modal

### 7. `src/components/sections/SquadPlansSection.tsx`
- Adicionar `useTrackSection` para `section_view`
- Adicionar `trackCtaClick` nos botoes de cada plano (location: 'squad_vendas', 'squad_enterprise')

### 8. `src/components/sections/FAQSection.tsx`
- Adicionar `useTrackSection` para `section_view`
- Adicionar `trackFaqOpen` quando usuario abrir uma pergunta

### 9. `src/components/sections/Footer.tsx`
Adicionar `trackOutboundLink` nos links de redes sociais (LinkedIn, YouTube, Spotify, Instagram).

### 10. `src/components/ui/WaitlistModal.tsx`
- Adicionar `trackWaitlistOpen` quando modal abrir
- Adicionar `trackWaitlistSubmit` quando formulario for enviado com sucesso

---

## Estrutura do DataLayer

Exemplos de eventos que serao enviados:

```text
// Page View
{ event: 'page_view', page_path: '/', page_title: 'Dalton Lab' }

// Section View
{ event: 'section_view', section_name: 'hero' }

// CTA Click (Conversao Principal)
{ event: 'cta_click', button_text: 'Fale com o Dalton', button_location: 'hero', destination_url: 'https://chat.daltonlab.ai/' }

// Tab Change
{ event: 'tab_change', tab_name: 'conteudo', section_name: 'prospection' }

// FAQ Open
{ event: 'faq_open', question_text: 'O que e um Agente de IA?' }

// Outbound Link
{ event: 'outbound_link', link_url: 'https://linkedin.com/...', link_text: 'LinkedIn' }

// Waitlist
{ event: 'waitlist_open', form_location: 'prospection_conteudo' }
{ event: 'waitlist_submit', form_location: 'prospection_conteudo' }
```

---

## Mapeamento de Eventos por Componente

| Componente | Eventos |
|------------|---------|
| `App.tsx` | `page_view` |
| `Header.tsx` | `cta_click` |
| `NewtonChatButton.tsx` | `cta_click` |
| `HeroSection.tsx` | `section_view`, `cta_click` |
| `ProspectionSection.tsx` | `section_view`, `tab_change`, `cta_click`, `waitlist_open` |
| `SquadPlansSection.tsx` | `section_view`, `cta_click` |
| `FAQSection.tsx` | `section_view`, `faq_open` |
| `Footer.tsx` | `outbound_link` |
| `WaitlistModal.tsx` | `waitlist_open`, `waitlist_submit` |

---

## Proximos Passos (Configuracao no GTM)

Apos a implementacao no codigo, voce precisara configurar no GTM:

1. **Criar Variaveis de DataLayer** para capturar parametros (button_text, button_location, etc.)
2. **Criar Triggers** para cada evento customizado
3. **Criar Tags**:
   - Meta Pixel: PageView, ViewContent, Lead
   - Google Ads: Conversion Tracking
   - LinkedIn Insight Tag

Os eventos `cta_click` serao os triggers para conversao principal nas tres plataformas.
