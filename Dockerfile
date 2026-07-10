# --- build: imagem oficial do Playwright (Chromium embutido) ---
FROM mcr.microsoft.com/playwright:v1.57.0-jammy AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# VITE_* precisam existir NO build: são inlined no bundle e lidas pelo
# prerender (o browser busca o Sanity com o projectId inlined). Railway passa
# como build args; declaradas como ENV para o `npm run build` enxergar.
ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET
ARG VITE_POSTHOG_KEY
ARG VITE_POSTHOG_HOST
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID \
    VITE_SANITY_DATASET=$VITE_SANITY_DATASET \
    VITE_POSTHOG_KEY=$VITE_POSTHOG_KEY \
    VITE_POSTHOG_HOST=$VITE_POSTHOG_HOST \
    VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
RUN npm run build

# --- runtime: enxuto, só serve dist/ (sem Chromium) ---
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server.mjs ./
EXPOSE 8080
CMD ["node", "server.mjs"]
