import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "child_process";

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
  plugins: [react(), generateVersionPlugin(), mode === "development" && componentTagger()].filter(Boolean),
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
