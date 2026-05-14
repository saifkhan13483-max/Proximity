const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    Object.entries(CORS_HEADERS).forEach(([key, value]) => res.setHeader(key, value))
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not configured. Add it to your Vercel environment variables.',
    })
  }

  const slug = Array.isArray(req.query.slug)
    ? req.query.slug.join('/')
    : req.query.slug || ''

  const geminiUrl = `${GEMINI_BASE}/${slug}?key=${apiKey}`

  try {
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })

    const data = await geminiRes.json()
    Object.entries(CORS_HEADERS).forEach(([key, value]) => res.setHeader(key, value))
    return res.status(geminiRes.status).json(data)
  } catch (err) {
    console.error('[api/gemini] Upstream error:', err)
    return res.status(502).json({ error: 'Failed to reach Gemini API. Please try again.' })
  }
}
