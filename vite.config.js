import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split WebLLM into its own chunk for better loading
          'webllm': ['@mlc-ai/web-llm'],
          // Split React libraries
          'react-vendor': ['react', 'react-dom'],
          // Split Lucide icons
          'icons': ['lucide-react']
        }
      }
    },
    // Increase chunk size warning limit for AI models
    chunkSizeWarningLimit: 6000,
  },
  optimizeDeps: {
    exclude: ['@mlc-ai/web-llm']
  }
})