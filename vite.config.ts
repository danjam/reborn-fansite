import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: true, // Enable if file watching doesn't work
      interval: 500,
    },
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          // Use the first name from the names array, fallback to 'asset' if undefined
          const fileName = assetInfo.names?.[0] || 'asset';
          const info = fileName.split('.');
          const extType = info[info.length - 1];

          // images
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/img/[name].[hash][extname]`;
          }

          // other assets
          return `assets/[name].[hash][extname]`;
        },
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    assetsInlineLimit: 0,
  },
});
