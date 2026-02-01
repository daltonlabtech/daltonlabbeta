# Plano de Implementação: Tracking GTM ✅ CONCLUÍDO

## Resumo

Implementação do Google Tag Manager (GTM-PPF26W8Q) na Landing Page concluída. O tracking está configurado para rastrear eventos de engajamento e conversão. O evento final de funil na LP é **CTA Click** (clique para ir ao chat), enquanto Lead/MQL/SQL serão rastreados no chat.daltonlab.ai.

---

## Arquivos Criados ✅

### 1. `src/lib/analytics.ts` ✅
Utilitário central de tracking com funções tipadas para enviar eventos ao dataLayer.

### 2. `src/hooks/useTrackSection.ts` ✅
Hook para detectar quando seções entram na viewport e disparar `section_view` automaticamente (apenas uma vez por sessão).

---

## Arquivos Modificados ✅

### 1. `index.html` ✅
Snippets do GTM adicionados no `<head>` e após `<body>`.

### 2. `src/App.tsx` ✅
Tracking de `page_view` em cada navegação de rota via `PageViewTracker` component.

### 3. `src/components/Header.tsx` ✅
`trackCtaClick` no botão "Fale com o Dalton" (location: 'header').

### 4. `src/components/NewtonChatButton.tsx` ✅
`trackCtaClick` no botão flutuante (location: 'floating_button').

### 5. `src/components/sections/HeroSection.tsx` ✅
- `useTrackSection` para `section_view`
- `trackCtaClick` no botão principal (location: 'hero')

### 6. `src/components/sections/ProspectionSection.tsx` ✅
- `useTrackSection` para `section_view`
- `trackTabChange` quando usuário trocar entre Vendas/Conteúdo/Anúncio
- `trackCtaClick` nos botões de CTA
- `trackWaitlistOpen` passado para o modal

### 7. `src/components/sections/SquadPlansSection.tsx` ✅
- `useTrackSection` para `section_view`
- `trackCtaClick` nos botões de cada plano

### 8. `src/components/sections/FAQSection.tsx` ✅
- `useTrackSection` para `section_view`
- `trackFaqOpen` quando usuário abrir uma pergunta

### 9. `src/components/sections/Footer.tsx` ✅
`trackOutboundLink` nos links de redes sociais (LinkedIn, YouTube, Spotify, Instagram).

### 10. `src/components/ui/WaitlistModal.tsx` ✅
- `trackWaitlistOpen` quando modal abrir
- `trackWaitlistSubmit` quando formulário for enviado com sucesso

---

## Estrutura do DataLayer

Eventos que serão enviados:

```text
// Page View
{ event: 'page_view', page_path: '/', page_title: 'Dalton Lab' }

// Section View
{ event: 'section_view', section_name: 'hero' }

// CTA Click (Conversão Principal)
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

## Próximos Passos (Configuração no GTM)

Agora você precisa configurar no GTM:

1. **Criar Variáveis de DataLayer** para capturar parâmetros:
   - `button_text`
   - `button_location`
   - `destination_url`
   - `section_name`
   - `tab_name`
   - `question_text`
   - `link_url`
   - `link_text`
   - `form_location`

2. **Criar Triggers** para cada evento customizado:
   - `page_view`
   - `section_view`
   - `cta_click`
   - `tab_change`
   - `faq_open`
   - `outbound_link`
   - `waitlist_open`
   - `waitlist_submit`

3. **Criar Tags**:
   - Meta Pixel: PageView, ViewContent (section_view), Lead (cta_click)
   - Google Ads: Conversion Tracking (cta_click)
   - LinkedIn Insight Tag

Os eventos `cta_click` serão os triggers para conversão principal nas três plataformas.
