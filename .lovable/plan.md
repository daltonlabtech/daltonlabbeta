

## Problema

As meta tags `http-equiv` de cache no HTML sao ignoradas por navegadores modernos e CDNs. O controle real de cache e feito via headers HTTP do servidor, que estao fora do nosso controle direto. Por isso, usuarios continuam vendo versoes antigas do site.

## Solucao: Sistema de Verificacao de Versao em Runtime (3 camadas)

### Camada 1: Content Hashing (ja existe)
Os arquivos JS/CSS ja tem hash no nome (`assets/main-abc123.js`), entao quando o navegador busca o HTML atualizado, ele automaticamente carrega os assets novos.

### Camada 2: Verificacao de Versao com Polling
Um hook que verifica periodicamente se ha uma versao nova do site e notifica/forca o reload.

### Camada 3: ChunkErrorBoundary
Captura erros de `ChunkLoadError` (que acontecem quando assets antigos sao removidos apos um deploy) e forca reload automatico.

---

## Implementacao Tecnica

### 1. Script de geracao de versao (`scripts/generate-version.cjs`)
- Gera um arquivo `public/version.json` com um `buildId` unico (hash + timestamp)
- Executado automaticamente antes de cada build via script `prebuild` no `package.json`

### 2. Hook `useVersionCheck` (`src/hooks/useVersionCheck.ts`)
- Faz polling de `/version.json` a cada 30 minutos
- Compara o `buildId` atual (salvo em `localStorage`) com o do servidor
- Se diferente, dispara um evento para notificar o usuario

### 3. Componente `UpdateNotification` (`src/components/ui/UpdateNotification.tsx`)
- Exibe um toast/banner persistente quando nova versao e detectada
- Botao "Atualizar agora" que executa hard reload (`location.reload()`)
- Tambem forca reload automatico apos 60 segundos sem acao do usuario

### 4. `ChunkErrorBoundary` no `App.tsx`
- Error boundary que captura `ChunkLoadError`
- Forca reload automatico com limite de 2 tentativas (evita loop infinito)
- Usa `sessionStorage` para contar tentativas

### 5. Atualizacao do `package.json`
- Adicionar script `prebuild` que roda o `generate-version.cjs`
- Atualizar script `build` para: `"build": "node scripts/generate-version.cjs && vite build"`

### Arquivos a criar/modificar:
- **Criar**: `scripts/generate-version.cjs`
- **Criar**: `src/hooks/useVersionCheck.ts`
- **Criar**: `src/components/ui/UpdateNotification.tsx`
- **Modificar**: `src/App.tsx` (adicionar ChunkErrorBoundary + useVersionCheck + UpdateNotification)
- **Modificar**: `package.json` (script de build)

