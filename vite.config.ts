import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use a dedicated Vite cache directory to avoid stale/corrupted optimized
  // dependency graphs that can cause "Invalid hook call" (dispatcher=null).
  cacheDir: "node_modules/.vite-lovable",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    // Prevent "Invalid hook call" by forcing a single React instance.
    // IMPORTANT: avoid filesystem aliasing for React here, as it can create
    // two different module identities (optimized deps vs /@fs/ paths).
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-dom/client",
      "react-dom/server",
    ],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // NOTE: Do not force-prebundle React itself. In Vite dev + HMR this can
    // lead to multiple optimized module graphs (different ?v= hashes) living
    // side-by-side, which manifests as dispatcher=null (useState/useContext).
    // Keep React out of pre-bundling; pre-bundle only what truly needs it.
    include: ["@google/model-viewer"],
    exclude: ["react", "react-dom", "next-themes", "sonner"],
    force: true,
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
}));
