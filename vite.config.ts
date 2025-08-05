import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      overlay: true
    },
    watch: {
      usePolling: true, // Enable if file watching doesn't work
      interval: 500
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
