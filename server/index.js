import express from 'express'
import cors from 'cors'
import { createServer } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000
const isDev = process.env.NODE_ENV !== 'production'

app.use(cors())
app.use(express.json({ limit: '2mb' }))

const GEMINI_BASE_URL = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL
const GEMINI_API_KEY = process.env.AI_INTEGRATIONS_GEMINI_API_KEY
const GEMINI_MODEL = 'gemini-2.5-flash'

async function callGemini(body) {
  if (!GEMINI_BASE_URL || !GEMINI_API_KEY) {
    throw new Error('Gemini AI integration not configured.')
  }
  const endpoint = `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini error: ${res.status}`)
  }
  return res.json()
}

function extractText(data) {
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null
}

// Credit chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages } = req.body
    if (!Array.isArray(messages)) return res.status(400).json({ error: 'messages required' })

    const SYSTEM = `You are an expert credit repair advisor at Proximity Credit Repair — a premium credit restoration firm. You help clients understand their credit reports, dispute strategies, score improvement tactics, and debt management.

Rules:
- Be warm, professional, and encouraging
- Give specific, actionable credit advice
- Reference FCRA rights when relevant
- Keep answers concise (2-4 paragraphs max)
- If asked about pricing or to sign up, direct them to the Contact page at /contact
- Never give legal advice, always recommend consulting a professional for complex legal matters
- You specialize in: credit disputes, score improvement, negative item removal, debt validation, collections, charge-offs, bankruptcies, and credit building`

    const contents = [
      { role: 'user', parts: [{ text: SYSTEM }] },
      { role: 'model', parts: [{ text: "Understood. I'm ready to assist as a credit repair advisor." }] },
      ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    ]

    const data = await callGemini({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 8192 } })
    const text = extractText(data)
    if (!text) return res.status(500).json({ error: 'No response from AI.' })
    res.json({ text })
  } catch (err) {
    console.error('[/api/ai/chat]', err.message)
    res.status(500).json({ error: err.message })
  }
})

// Dispute letter
app.post('/api/ai/dispute-letter', async (req, res) => {
  try {
    const input = req.body
    const prompt = `Generate a professional, legally-worded FCRA credit dispute letter with the following details:

Consumer Information:
- Name: ${input.yourName}
- Address: ${input.yourAddress}, ${input.yourCity}, ${input.yourState} ${input.yourZip}

Dispute Target:
- Credit Bureau: ${input.bureauName}
- Creditor/Collection Agency: ${input.creditorName}
- Account Number: ${input.accountNumber}
- Reason for Dispute: ${input.disputeReason}
- Additional Details: ${input.additionalDetails || 'None'}

Write a complete, formal dispute letter that:
1. References the Fair Credit Reporting Act (FCRA) Section 611
2. Clearly states what is being disputed and why
3. Demands investigation and removal/correction within 30 days
4. Requests written notification of the results
5. Includes placeholder brackets like [DATE], [SIGNATURE] where needed
6. Is professional, firm, and legally precise
7. Includes a section listing what documents to enclose (ID, proof of address, etc.)

Format it as a complete letter ready to print and mail. Use proper letter formatting with date, addresses, salutation, body paragraphs, and closing.`

    const data = await callGemini({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 8192 },
    })
    const text = extractText(data)
    if (!text) return res.status(500).json({ error: 'No response from AI.' })
    res.json({ text })
  } catch (err) {
    console.error('[/api/ai/dispute-letter]', err.message)
    res.status(500).json({ error: err.message })
  }
})

// Single dispute letter for package
app.post('/api/ai/dispute-letter-single', async (req, res) => {
  try {
    const { personal, item, bureau } = req.body
    const prompt = `Generate a professional, legally-worded FCRA Section 611 credit dispute letter.

Consumer Information:
- Name: ${personal.yourName}
- Address: ${personal.yourAddress}, ${personal.yourCity}, ${personal.yourState} ${personal.yourZip}

Dispute Target:
- Credit Bureau: ${bureau}
- Creditor/Collection Agency: ${item.creditorName}
- Account Number: ${item.accountNumber}
- Reason for Dispute: ${item.disputeReason}

Write a complete, formal dispute letter that:
1. References FCRA Section 611 and the consumer's right to dispute
2. Clearly states what is being disputed and why
3. Demands a 30-day investigation and removal or correction
4. Requests written notification of results
5. Uses [DATE] and [SIGNATURE] placeholders where needed
6. Lists supporting documents to enclose (ID, proof of address)
7. Is professional, firm, and legally precise

Output ONLY the full letter text. Use proper letter formatting with date, addresses, salutation, body, and closing. No preamble or explanation outside the letter itself.`

    const data = await callGemini({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 8192 },
    })
    const text = extractText(data)
    if (!text) return res.status(500).json({ error: 'No response from AI.' })
    res.json({ text })
  } catch (err) {
    console.error('[/api/ai/dispute-letter-single]', err.message)
    res.status(500).json({ error: err.message })
  }
})

// Credit review
app.post('/api/ai/credit-review', async (req, res) => {
  try {
    const input = req.body
    const prompt = `You are an expert credit repair specialist with 20+ years of experience. Analyze the following client credit profile and provide a comprehensive, personalized credit review.

CLIENT PROFILE:
- Name: ${input.firstName}
- Current Credit Score: ${input.currentScore} (${input.scoreRange} range)
- Goal Score: ${input.goalScore}
- Primary Goal: ${input.primaryGoal}
- Negative Items on Report: ${input.negativeItems}
- Total Outstanding Debt: $${input.totalDebt}
- Monthly Income: $${input.monthlyIncome}
- Payment History: ${input.paymentHistory}
- Length of Credit History: ${input.creditAge}
- Credit Utilization: ${input.creditUtilization}%
- Additional Context: ${input.additionalContext || 'None provided'}

Provide a detailed credit review in the following JSON format (respond ONLY with valid JSON, no markdown):
{
  "overallAssessment": "A 2-3 sentence executive summary of their credit situation and overall outlook",
  "creditScoreAnalysis": "A detailed paragraph analyzing their current score, what factors are dragging it down, and what's helping it",
  "keyStrengths": ["strength 1", "strength 2", "strength 3"],
  "criticalIssues": ["issue 1", "issue 2", "issue 3"],
  "actionPlan": [
    {
      "priority": "High",
      "action": "Specific action to take",
      "impact": "Expected impact on credit score",
      "timeframe": "e.g. 30-60 days"
    }
  ],
  "timelineEstimate": "Realistic estimate of how long to reach their goal score, with explanation",
  "priorityDisputes": ["item to dispute 1", "item to dispute 2"],
  "scoreProjection": "Where their score could realistically be in 6, 12, and 24 months if they follow the action plan",
  "disclaimer": "Brief professional disclaimer about credit repair results"
}

Make the advice specific, actionable, and encouraging. Include at least 4-6 action steps. Be realistic but optimistic.`

    const data = await callGemini({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
    })
    const rawText = extractText(data)
    if (!rawText) return res.status(500).json({ error: 'No response from AI.' })

    const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    try {
      const result = JSON.parse(cleaned)
      res.json(result)
    } catch {
      res.status(500).json({ error: 'Could not parse AI response. Please try again.' })
    }
  } catch (err) {
    console.error('[/api/ai/credit-review]', err.message)
    res.status(500).json({ error: err.message })
  }
})

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

if (isDev) {
  const vite = await createServer({
    root: path.resolve(__dirname, '../client'),
    configFile: path.resolve(__dirname, '../client/vite.config.ts'),
    server: {
      middlewareMode: true,
      host: '0.0.0.0',
    },
    appType: 'spa',
  })
  app.use(vite.middlewares)
} else {
  const distPath = path.resolve(__dirname, '../client/dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')))
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] Running on http://0.0.0.0:${PORT}`)
})
