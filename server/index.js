import express from 'express'
import { createServer } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CLIENT = join(ROOT, 'client')

const app = express()
app.use(express.json({ limit: '1mb' }))

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

app.post('/api/gemini', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(503).json({ error: 'Gemini API key is not configured on the server.' })
  }

  const { contents, generationConfig } = req.body

  if (!Array.isArray(contents) || contents.length === 0) {
    return res.status(400).json({ error: 'Invalid request body.' })
  }

  try {
    const upstream = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig }),
    })

    const data = await upstream.json()

    if (!upstream.ok) {
      const msg = data?.error?.message || `Gemini error: ${upstream.status}`
      return res.status(upstream.status).json({ error: msg })
    }

    res.json(data)
  } catch (err) {
    console.error('[/api/gemini]', err)
    res.status(502).json({ error: 'Failed to reach Gemini API.' })
  }
})

const isDev = process.env.NODE_ENV !== 'production'
const PORT = 5000

if (isDev) {
  const vite = await createServer({
    root: CLIENT,
    server: { middlewareMode: true },
    appType: 'spa',
  })
  app.use(vite.middlewares)
} else {
  const distPath = join(CLIENT, 'dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] listening on http://0.0.0.0:${PORT}`)
})
