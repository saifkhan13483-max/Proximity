import express from 'express'
import cors from 'cors'
import { GoogleGenAI } from '@google/genai'

const app = express()
app.use(express.json({ limit: '2mb' }))
app.use(cors())

const PORT = process.env.PORT || 3001

function getAI() {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY
  const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
  if (!apiKey) throw new Error('AI_INTEGRATIONS_GEMINI_API_KEY is not set')
  return new GoogleGenAI({
    apiKey,
    httpOptions: baseUrl ? { apiVersion: '', baseUrl } : undefined,
  })
}

app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { contents, generationConfig, model = 'gemini-2.5-flash' } = req.body
    if (!contents) return res.status(400).json({ error: 'contents is required' })

    const ai = getAI()
    const result = await ai.models.generateContent({
      model,
      contents,
      config: generationConfig ? {
        temperature: generationConfig.temperature,
        maxOutputTokens: generationConfig.maxOutputTokens ?? 8192,
      } : { maxOutputTokens: 8192 },
    })

    const text = result.text ?? ''
    res.json({
      candidates: [{ content: { parts: [{ text }] } }]
    })
  } catch (err) {
    console.error('[gemini proxy] error:', err)
    res.status(500).json({ error: err.message || 'Gemini API error' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] Gemini proxy running on port ${PORT}`)
})
