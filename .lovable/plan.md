

# Plano: Tradução Automática por Idioma do Navegador

## Resumo

Implementar um sistema de internacionalização (i18n) que detecta automaticamente o idioma do navegador do usuário e traduz toda a página. O seletor de idioma aparecerá no header apenas quando o site estiver em idiomas diferentes do português.

---

## Arquitetura da Solução

O sistema utilizará **react-i18next**, a biblioteca mais popular e robusta para internacionalização em React. A detecção será feita via `navigator.language`, que retorna o idioma configurado no navegador do usuário.

```text
Fluxo de Detecção:
┌─────────────────────────────────────────────────────────┐
│  Usuário acessa o site                                  │
│              ↓                                          │
│  Verifica localStorage (idioma salvo?)                  │
│              ↓                                          │
│  Não → Detecta navigator.language                       │
│              ↓                                          │
│  Mapeia para idioma suportado (pt, en, es, fr, de, etc) │
│              ↓                                          │
│  Carrega traduções e renderiza                          │
└─────────────────────────────────────────────────────────┘
```

---

## Etapas de Implementação

### 1. Instalar Dependências

- `i18next` - Biblioteca core de internacionalização
- `react-i18next` - Integração com React
- `i18next-browser-languagedetector` - Detecção automática do idioma

### 2. Criar Estrutura de Traduções

Organizar os textos em arquivos JSON por idioma:

```text
src/
└── locales/
    ├── pt/
    │   └── translation.json
    ├── en/
    │   └── translation.json
    ├── es/
    │   └── translation.json
    ├── fr/
    │   └── translation.json
    └── de/
        └── translation.json
```

### 3. Configurar i18next

Criar arquivo de configuração (`src/lib/i18n.ts`) com:
- Detecção automática via navegador
- Fallback para português (pt-BR)
- Cache do idioma no localStorage
- Suporte a múltiplos idiomas

### 4. Extrair Todos os Textos para Tradução

Mapear e traduzir textos de todos os componentes:

| Componente | Textos a Traduzir |
|------------|-------------------|
| **HeroSection** | Título, subtítulo, botão CTA |
| **Header** | Links de navegação, botão CTA |
| **ClientsSection** | "Empresas que confiam em nós" |
| **ProspectionSection** | Títulos, descrições, features, botões |
| **InsightsSection** | Títulos, features, mensagens do chat |
| **SquadPlansSection** | Nomes dos planos, descrições, itens |
| **AudioDemoSection** | Título, subtítulo |
| **FAQSection** | Perguntas e respostas |
| **Footer** | Links, títulos de seção |
| **WaitlistModal** | Campos, botão, mensagens |

### 5. Adicionar Seletor de Idioma no Header

- Criar componente `LanguageSelector`
- Exibir dropdown com bandeiras/siglas dos idiomas
- **Condição especial**: Ocultar quando idioma = português
- Salvar preferência no localStorage

### 6. Atualizar Componentes

Substituir textos hardcoded por chamadas do hook `useTranslation()`:

```typescript
// Antes
<h1>Do lead à venda com Agentes de IA</h1>

// Depois  
const { t } = useTranslation();
<h1>{t('hero.title')}</h1>
```

### 7. Atualizar Meta Tags

Configurar atributo `lang` do HTML dinamicamente e atualizar meta tags de SEO com o idioma correto.

---

## Idiomas Suportados

| Código | Idioma | Região |
|--------|--------|--------|
| `pt-BR` | Português | Brasil (padrão) |
| `en` | English | Internacional |
| `es` | Español | América Latina |
| `fr` | Français | França |
| `de` | Deutsch | Alemanha |
| `it` | Italiano | Itália |
| `zh` | 中文 | China |
| `ja` | 日本語 | Japão |

---

## Detalhes Técnicos

### Configuração do i18next

Arquivo: `src/lib/i18n.ts`

- **Detection order**: localStorage → navigator → htmlTag
- **Fallback language**: pt-BR
- **Cache**: localStorage com key `i18nextLng`
- **Load**: Lazy loading por idioma

### Estrutura de Tradução (exemplo en/translation.json)

```json
{
  "hero": {
    "title_line1": "From lead to sale",
    "title_line2": "with AI Agents",
    "subtitle1": "Scale your company's revenue.",
    "subtitle2": "In less time. With more return.",
    "cta": "Talk to Dalton"
  },
  "nav": {
    "product": "Product",
    "news": "News",
    "about": "About us",
    "comingSoon": "Coming soon"
  },
  "clients": {
    "title": "Companies that trust us"
  },
  "prospection": {
    "title": "AI that sells for you",
    "subtitle": "Qualifies leads, schedules meetings, closes sales and attracts your ideal customer."
  }
}
```

### Componente LanguageSelector

- Dropdown com ícone de globo
- Lista de idiomas com códigos
- Oculto quando `currentLanguage === 'pt'`
- Estilo consistente com o header

### Persistência

O idioma escolhido é salvo no localStorage. Na próxima visita:
1. Verifica se há idioma salvo
2. Se não houver, detecta do navegador
3. Aplica o idioma e renderiza

---

## Arquivos a Criar/Modificar

### Novos Arquivos
- `src/lib/i18n.ts` - Configuração do i18next
- `src/locales/pt/translation.json` - Traduções português
- `src/locales/en/translation.json` - Traduções inglês
- `src/locales/es/translation.json` - Traduções espanhol
- `src/locales/fr/translation.json` - Traduções francês
- `src/locales/de/translation.json` - Traduções alemão
- `src/locales/it/translation.json` - Traduções italiano
- `src/locales/zh/translation.json` - Traduções chinês
- `src/locales/ja/translation.json` - Traduções japonês
- `src/components/LanguageSelector.tsx` - Seletor de idioma

### Arquivos Modificados
- `src/main.tsx` - Importar configuração i18n
- `src/components/Header.tsx` - Adicionar LanguageSelector
- `src/components/sections/HeroSection.tsx` - Usar traduções
- `src/components/sections/ClientsSection.tsx` - Usar traduções
- `src/components/sections/ProspectionSection.tsx` - Usar traduções
- `src/components/sections/InsightsSection.tsx` - Usar traduções
- `src/components/sections/SquadPlansSection.tsx` - Usar traduções
- `src/components/sections/AudioDemoSection.tsx` - Usar traduções
- `src/components/sections/FAQSection.tsx` - Usar traduções
- `src/components/sections/Footer.tsx` - Usar traduções
- `src/components/ui/WaitlistModal.tsx` - Usar traduções
- `index.html` - Atualizar lang dinamicamente

---

## Considerações

1. **Performance**: Traduções são carregadas de forma lazy, apenas o idioma ativo
2. **SEO**: O atributo `lang` do HTML é atualizado dinamicamente
3. **Experiência**: Transição suave entre idiomas sem reload
4. **Manutenção**: Fácil adicionar novos idiomas criando novos arquivos JSON

