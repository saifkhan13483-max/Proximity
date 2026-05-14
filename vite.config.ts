import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import type { Plugin, Connect } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

// Inline serverless-function proxy for non-Replit local dev.
// When REPL_ID is absent and GEMINI_API_KEY is set, /api/gemini/* requests
// are handled here so `vite dev` works without `vercel dev`.
function geminiDevPlugin(): Plugin {
  const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta'
  return {
    name: 'gemini-dev-proxy',
    configureServer(server) {
      const middleware: Connect.NextHandleFunction = async (
        req: IncomingMessage,
        res: ServerResponse,
        next,
      ) => {
        if (!req.url?.startsWith('/api/gemini')) return next()

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'GEMINI_API_KEY not set in .env.local' }))
        }

        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          })
          return res.end()
        }

        const slug = req.url.replace(/^\/api\/gemini\/?/, '')
        const geminiUrl = `${GEMINI_BASE}/${slug}?key=${apiKey}`

        const chunks: Buffer[] = []
        req.on('data', (chunk: Buffer) => chunks.push(chunk))
        req.on('end', async () => {
          try {
            const body = Buffer.concat(chunks).toString()
            const upstream = await fetch(geminiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body,
            })
            const data = await upstream.text()
            res.writeHead(upstream.status, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            })
            res.end(data)
          } catch (err) {
            res.writeHead(502, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Failed to reach Gemini API' }))
          }
        })
      }
      server.middlewares.use(middleware)
    },
  }
}

const isReplit = Boolean(process.env.REPL_ID)

export default defineConfig({
  plugins: [react(), ...(!isReplit ? [geminiDevPlugin()] : [])],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    allowedHosts: true,
    // Replit-only: proxy /api/gemini/* to the managed model-farm sidecar
    ...(isReplit && {
      proxy: {
        '/api/gemini': {
          target: 'http://localhost:1106/modelfarm/gemini',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/gemini/, ''),
          configure: (proxy) => {
            proxy.on('error', (err: Error) => {
              console.error('[vite proxy] Gemini proxy error:', err.message)
            })
          },
        },
      },
    }),
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/components/common', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@providers': fileURLToPath(new URL('./src/providers', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
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
          'vendor-firebase-app': ['firebase/app'],
          'vendor-firebase-auth': ['firebase/auth'],
          'vendor-firebase-firestore': ['firebase/firestore'],
        },
      },
    },
  },
})
