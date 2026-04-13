import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  define: {
    __FB_API_KEY__: JSON.stringify(process.env.apiKey || process.env.VITE_FIREBASE_API_KEY || ''),
    __FB_AUTH_DOMAIN__: JSON.stringify(process.env.authDomain || process.env.VITE_FIREBASE_AUTH_DOMAIN || ''),
    __FB_PROJECT_ID__: JSON.stringify(process.env.projectId || process.env.VITE_FIREBASE_PROJECT_ID || ''),
    __FB_STORAGE_BUCKET__: JSON.stringify(process.env.storageBucket || process.env.VITE_FIREBASE_STORAGE_BUCKET || ''),
    __FB_MESSAGING_SENDER_ID__: JSON.stringify(process.env.messagingSenderId || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''),
    __FB_APP_ID__: JSON.stringify(process.env.appId || process.env.VITE_FIREBASE_APP_ID || ''),
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-forms': ['react-hook-form', 'zod', '@hookform/resolvers'],
          'vendor-state': ['zustand', '@tanstack/react-query'],
        },
      },
    },
  },
})
