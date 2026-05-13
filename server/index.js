const express = require('express')
const cors = require('cors')
const OpenAI = require('openai').default

const app = express()
app.use(express.json({ limit: '20kb' }))
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (origin.endsWith('.replit.dev') || origin.endsWith('.repl.co') || origin.endsWith('.replit.app')) {
      return callback(null, true)
    }
    callback(null, true)
  },
  credentials: true,
}))

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
})

const SYSTEM_PROMPT = `You are the Proximity AI Advisor — a knowledgeable, warm, and professional credit repair assistant for Proximity Credit Repair.

Your role is to help visitors understand credit repair, answer questions about credit scores, explain how the dispute process works, and guide them toward taking action with Proximity's services.

Key information about Proximity Credit Repair:
- Services: Credit Analysis, Dispute Filing, Score Monitoring, Debt Validation, Creditor Negotiation, Educational Resources, Identity Theft Protection
- Plans: Free Consultation, Basic, Standard, Premium, VIP
- Phone: (800) 555-0192
- Proven track record: 10,000+ clients helped, 95% success rate, average 127-point score increase
- Process: 4 steps — Free Consultation → Custom Strategy → Dispute & Negotiate → Score Improvement

Guidelines:
- Be friendly, empathetic, and encouraging — many users are in a stressful financial situation
- Give practical, accurate credit repair advice
- Explain credit bureau processes, FCRA rights, and dispute strategies clearly
- Always encourage users to get a free consultation for their specific situation
- Keep responses concise and conversational (2-4 short paragraphs max)
- Never give legal or financial advice beyond general credit repair education
- If asked about pricing specifics, direct them to the Pricing page or the free consultation
- Do NOT make up specific numbers or statistics beyond what's provided above`

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' })
  }

  const safeMessages = messages.slice(-20).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content).slice(0, 2000),
  }))

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-5-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...safeMessages],
      stream: true,
      max_completion_tokens: 600,
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`)
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
    res.end()
  } catch (err) {
    console.error('[AI chat error]', err.message)
    if (!res.headersSent) {
      res.status(500).json({ error: 'AI service error' })
    } else {
      res.write(`data: ${JSON.stringify({ error: 'AI service error' })}\n\n`)
      res.end()
    }
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.AI_PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proximity AI server running on port ${PORT}`)
})
