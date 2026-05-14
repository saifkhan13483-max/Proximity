import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.API_PORT || 3001

app.use(cors())
app.use(express.json({ limit: '2mb' }))

const GEMINI_BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
const GEMINI_API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY

app.post('/modelfarm/gemini/models/:modelAction', async (req, res) => {
  try {
    if (!GEMINI_BASE_URL || !GEMINI_API_KEY) {
      return res.status(500).json({
        error: { message: 'Gemini AI integration is not configured on the server.' }
      })
    }

    const modelAction = req.params.modelAction
    const geminiUrl = `${GEMINI_BASE_URL}/models/${modelAction}`

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify(req.body),
    })

    const data = await geminiRes.json()
    return res.status(geminiRes.status).json(data)
  } catch (err) {
    console.error('[server/gemini] Error:', err)
    return res.status(502).json({ error: { message: 'Failed to reach Gemini API. Please try again.' } })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] Gemini proxy running on port ${PORT}`)
})
