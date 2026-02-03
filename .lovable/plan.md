

# Plano: Reestruturação SEO para Sitelinks do Google

## Resumo

Reestruturar o site para influenciar os sitelinks do Google, criando páginas dedicadas com rotas específicas, atualizando a navegação e aplicando a nova imagem para favicon e Open Graph.

---

## Arquitetura de Rotas

```text
Estrutura Atual:
/ (Index) ─────────────────────────── Home com todo o conteúdo
/quem-somos ───────────────────────── Página "Quem somos"
/newton ───────────────────────────── Página Newton (não usada no menu)

Estrutura Nova:
/ ─────────────────────────────────── Home (SEO atualizado)
/produto ──────────────────────────── Página Produto (conteúdo da home)
/fale-com-o-dalton ────────────────── Página CTA (redirecionamento externo)
/quem-somos ───────────────────────── Página Quem somos (mantida)
```

---

## Etapas de Implementação

### 1. Copiar Nova Imagem para o Projeto

Copiar a imagem fornecida para a pasta `public/` para uso como:
- Favicon
- Open Graph image (og:image)
- Twitter card image

**Arquivo destino:** `public/dalton-icon.webp`

### 2. Atualizar SEO da Home (index.html)

Modificar as meta tags conforme especificado:

| Tag | Valor Novo |
|-----|------------|
| `<title>` | Dalton Lab – Agentes de IA para Vendas |
| `<meta name="description">` | Automatize seu processo comercial com Agentes de IA. Qualifique leads, agende reuniões e feche vendas 24/7. |
| `og:url` | https://daltonlab.ai/ |
| `og:title` | Dalton Lab – Agentes de IA para Vendas |
| `og:description` | Automatize seu processo comercial com Agentes de IA. Qualifique leads, agende reuniões e feche vendas 24/7. |
| `og:image` | https://daltonlab.ai/dalton-icon.webp |
| `twitter:title` | Dalton Lab – Agentes de IA para Vendas |
| `twitter:description` | Automatize seu processo comercial com Agentes de IA. Qualifique leads, agende reuniões e feche vendas 24/7. |
| `twitter:image` | https://daltonlab.ai/dalton-icon.webp |
| Favicon | /dalton-icon.webp |

### 3. Criar Página /produto

Nova página que replica o conteúdo principal da home com SEO específico.

**Arquivo:** `src/pages/Produto.tsx`

**Estrutura:**
- `<h1>` visível: "Produto"
- Meta tags dinâmicas via useEffect
- Mesmo conteúdo de seções da Index: HeroSection, ProspectionSection, InsightsSection, SquadPlansSection, etc.

**SEO da página:**
- Title: `Produto | Dalton Lab – Agentes de IA para Vendas`
- Description: `Conheça nossos Agentes de IA para vendas. Qualificação de leads, follow-up 24/7 e fechamento automático.`

### 4. Criar Página /fale-com-o-dalton

Página dedicada para o CTA principal, melhorando a indexação.

**Arquivo:** `src/pages/FaleComDalton.tsx`

**Comportamento:**
- Renderiza rapidamente uma landing page
- Exibe `<h1>Fale com o Dalton</h1>`
- Redireciona automaticamente para `https://chat.daltonlab.ai/` após 2 segundos
- Exibe botão de ação manual caso o redirecionamento não ocorra

**SEO da página:**
- Title: `Fale com o Dalton | Dalton Lab – Agentes de IA`
- Description: `Inicie uma conversa com nosso Agente de IA. Tire dúvidas, agende demonstrações e descubra como automatizar suas vendas.`

### 5. Atualizar Navegação do Header

Modificar `src/components/Header.tsx` para as novas rotas:

**Antes:**
```text
Produto → /
Notícias → #noticias (com badge "Em breve")
Quem somos → /quem-somos
[Botão CTA separado]
```

**Depois:**
```text
Produto → /produto
Fale com o Dalton → /fale-com-o-dalton
Quem somos → /quem-somos
```

**Mudanças:**
- Remover link "Notícias" e badge "Em breve"
- Alterar "Produto" de `/` para `/produto`
- Adicionar "Fale com o Dalton" como link de navegação
- Remover botão CTA separado no desktop

### 6. Atualizar Rotas no App.tsx

Adicionar as novas rotas com lazy loading:

```text
/produto → Produto.tsx
/fale-com-o-dalton → FaleComDalton.tsx
```

### 7. Atualizar Página QuemSomos

Adicionar `<h1>` visível e meta tags específicas.

**SEO:**
- Title: `Quem somos | Dalton Lab – Agentes de IA`
- Description: `Conheça os fundadores e a equipe do Dalton Lab. Startup brasileira pioneira em Agents-as-a-Service operando em 4 continentes.`

### 8. Atualizar Footer

Modificar links para as novas rotas e remover link de "Notícias".

```text
Produto → /produto
Fale com o Dalton → /fale-com-o-dalton
Quem somos → /quem-somos
```

### 9. Atualizar Arquivos de Tradução (i18n)

Atualizar chaves em todos os 8 idiomas para suportar as novas páginas e navegação.

---

## Arquivos a Criar

| Arquivo | Descrição |
|---------|-----------|
| `src/pages/Produto.tsx` | Página do produto com conteúdo principal |
| `src/pages/FaleComDalton.tsx` | Página CTA com redirecionamento |
| `public/dalton-icon.webp` | Nova imagem (favicon + OG) |

## Arquivos a Modificar

| Arquivo | Mudanças |
|---------|----------|
| `index.html` | SEO home, favicon, og:image, URLs atualizadas para daltonlab.ai |
| `src/App.tsx` | Novas rotas |
| `src/components/Header.tsx` | Novos links de navegação |
| `src/components/sections/Footer.tsx` | Atualizar links |
| `src/pages/QuemSomos.tsx` | Adicionar meta tags e h1 |
| `src/locales/*/translation.json` | Novas chaves (8 arquivos) |

---

## Visualização do Snippet Esperado

```text
Dalton Lab – Agentes de IA para Vendas
https://daltonlab.ai/

Automatize seu processo comercial com Agentes de IA. 
Qualifique leads, agende reuniões e feche vendas 24/7.

Sitelinks:
┌─────────────────┬───────────────────┬──────────────┐
│ Produto         │ Fale com o Dalton │ Quem somos   │
└─────────────────┴───────────────────┴──────────────┘
```

---

## Considerações Técnicas

1. **Meta Tags Dinâmicas**: Usar `useEffect` para atualizar `document.title` e meta description em cada página

2. **Redirecionamento Seguro**: A página `/fale-com-o-dalton` exibe conteúdo indexável antes de redirecionar, garantindo que o Google possa rastrear

3. **Canonical URLs**: A URL base será `https://daltonlab.ai/` em todas as meta tags

4. **Imagem OG**: A nova imagem será usada com URL absoluta `https://daltonlab.ai/dalton-icon.webp`

