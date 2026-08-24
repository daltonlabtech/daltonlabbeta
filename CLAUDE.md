# Dalton Lab — Site Institucional

Site institucional da Dalton Lab, empresa brasileira pioneira em transformação agêntica (Agents-as-a-Service). Operação em 4 continentes.

## Stack

- **Framework**: React 18 + TypeScript + Vite
- **Estilização**: Tailwind CSS (sem framer-motion — removido por performance)
- **Roteamento**: React Router DOM
- **CMS**: Sanity (project ID: `ss6d4h78`, dataset: `production`)
- **Data fetching**: TanStack React Query
- **i18n**: react-i18next (pt/en; fallback `pt`). Arquivos `es`/`fr`/`de`/`it`/`ja`/`zh` em `src/locales/` são sobras — não estão em `supportedLngs`.
- **Deploy**: Vercel
- **Analytics**: funções customizadas `trackPageView` e `trackCtaClick` em `src/lib/analytics`

## Branches

| Branch | Ambiente | Uso |
|---|---|---|
| `main` | Produção | Apenas merges revisados |
| `staging` | Homologação | Validação com time interno/marketing |
| `feat/*` | Desenvolvimento | Features em andamento |

## Rotas

| Path | Página | Descrição |
|---|---|---|
| `/` | Index | Home — seções hero, journey, definition, prospection, CTA, map, media |
| `/quem-somos` | QuemSomos | Sobre a empresa e fundadores |
| `/artigos` | Artigos | Listagem de artigos do Sanity |
| `/artigos/:slug` | Artigo | View individual de artigo |
| `/casos` | Casos | Casos de organizações agênticas |
| `/politica-de-privacidade` | PoliticaPrivacidade | Política de privacidade |
| `/termos-de-uso` | TermosDeUso | Termos de uso |

`/produto` e `/newton` respondem 301 para `/`.

## Design System

**Sem imagens nos artigos** — design puramente tipográfico.

| Token | Valor | Uso |
|---|---|---|
| Background | `#0D1218` (`bg-background`) | Fundo de todas as páginas |
| Texto principal | `#F5F3F0` | Títulos e texto de destaque |
| Texto secundário | `rgba(245, 243, 240, 0.6)` | Body text, subtítulos |
| Acento azul | `#3B82F6` (`dalton-blue`) | CTAs, badges, bordas de destaque |
| Card surface | `bg-white/5` | Fundo de cards |
| Card border | `border-white/10` | Borda padrão de cards |
| Card border hover | `border-white/25` | Hover state de cards |
| Border radius | `rounded-2xl` / `rounded-3xl` | Cards pequenos / cards grandes |

**Animações**: CSS puro via classes utilitárias e hook `useScrollReveal`. Não usar framer-motion.

## CMS — Sanity

- **Studio**: repositório separado em `../daltonlab-studio`
- **Deploy do Studio**: `cd ../daltonlab-studio && npm run deploy` → publica em `https://daltonlab.sanity.studio`
- **Schema de artigos**: `_type: "article"` com campos `title`, `slug`, `author`, `publishedAt`, `body` (PortableText), `thumbnail`, `coverImage`
- **Variáveis necessárias na Vercel**: `VITE_SANITY_PROJECT_ID=ss6d4h78` e `VITE_SANITY_DATASET=production`
- **CORS**: novos domínios de deploy precisam ser adicionados em manage.sanity.io → API → CORS Origins

## Estrutura relevante

```
src/
├── pages/               # Uma página por rota
├── components/
│   ├── Header.tsx       # Nav fixa com links e sheet mobile
│   ├── sections/        # Seções reutilizáveis por página
│   │   └── articles/    # ArticleFeatured, ArticleCard, ArticleGrid
│   └── ui/              # shadcn/ui + componentes customizados
├── hooks/
│   ├── useSanity.ts     # useArticles, useArticle, useRelatedArticles
│   └── useScrollReveal.ts
├── lib/
│   ├── sanity.ts        # Client Sanity + urlFor
│   └── analytics.ts     # trackPageView, trackCtaClick
└── locales/             # Traduções ativas: pt, en (demais pastas são sobras)
```

## Padrões do projeto

- **Lazy loading**: todas as páginas e seções abaixo do fold usam `lazy()` + `Suspense`
- **Skeleton**: usar `<SkeletonSection />` como fallback de Suspense
- **Traduções**: toda string visível ao usuário deve estar nos arquivos `src/locales/*/translation.json`
- **Analytics**: chamar `trackPageView` no `useEffect` de cada página
- **Estilos inline**: o projeto mistura Tailwind classes com `style={{ color: '...' }}` para as cores do design system — manter essa convenção
- **ChunkErrorBoundary**: já implementado no App.tsx para lidar com erros de chunk após deploys

## Comandos

```bash
npm run dev      # Desenvolvimento local
npm run build    # Build de produção
npm run preview  # Preview do build
```
