import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "child_process";

// Defer render-blocking CSS: transforms Vite's injected <link rel="stylesheet">
// into a non-blocking load using the media="print" + onload pattern.
// Safe because React (navbar, all components) only renders after JS loads (~500ms+),
// by which time the CSS (17 KiB) has already finished downloading (~200ms).
function deferCssPlugin() {
  return {
    name: 'defer-css',
    apply: 'build' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        (_, href) =>
          `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      );
    },
  };
}

// Generate version.json before build
function generateVersionPlugin() {
  return {
    name: 'generate-version',
    buildStart() {
      try {
        execSync('node scripts/generate-version.cjs', { stdio: 'inherit' });
      } catch (e) {
        console.warn('[generate-version] Failed:', e);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), generateVersionPlugin(), deferCssPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Prevent duplicate React instances
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react-i18next", "i18next"],
  },
  build: {
    // Aggressive code splitting for better performance
    rollupOptions: {
      output: {
        // Content-hash ensures cache invalidation on file changes
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'query': ['@tanstack/react-query'],
          'framer-motion': ['framer-motion'],
          // UI library chunks
          'radix-core': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs'
          ],
          'radix-forms': [
            '@radix-ui/react-checkbox',
            '@radix-ui/react-select',
            '@radix-ui/react-label'
          ],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 150,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Generate source maps only in development
    sourcemap: mode === 'development',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
