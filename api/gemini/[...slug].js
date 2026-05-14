const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not configured on the server. Please add it to your Vercel environment variables.',
    })
  }

  const slug = Array.isArray(req.query.slug) ? req.query.slug.join('/') : req.query.slug || ''
  const geminiUrl = `${GEMINI_BASE}/${slug}?key=${apiKey}`

  try {
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })

    const data = await geminiRes.json()
    return res.status(geminiRes.status).json(data)
  } catch (err) {
    console.error('[api/gemini] Upstream error:', err)
    return res.status(502).json({ error: 'Failed to reach Gemini API. Please try again.' })
  }
}
