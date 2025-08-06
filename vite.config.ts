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
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Use the first name from the names array, fallback to 'asset' if undefined
          const fileName = assetInfo.names?.[0] || 'asset'
          const info = fileName.split('.')
          const extType = info[info.length - 1]
          
          // images
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/img/[name].[hash][extname]`
          }

          // other assets
          return `assets/[name].[hash][extname]`
        }
      }
    },
    assetsInlineLimit: 0
  }
})