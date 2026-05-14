const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function setCors(res) {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => res.setHeader(key, value))
}

module.exports = async function handler(req, res) {
  setCors(res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[api/gemini] GEMINI_API_KEY environment variable is not set.')
    return res.status(500).json({
      error: {
        message: 'AI features are temporarily unavailable. The server is missing a required configuration key.',
      },
    })
  }

  const slugParts = Array.isArray(req.query.slug)
    ? req.query.slug
    : req.query.slug
    ? [req.query.slug]
    : []

  if (slugParts.length === 0) {
    return res.status(400).json({ error: { message: 'Missing API path.' } })
  }

  const slug = slugParts.join('/')
  const geminiUrl = `${GEMINI_BASE}/${slug}?key=${apiKey}`

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { /* leave as-is */ }
  }

  try {
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const contentType = geminiRes.headers.get('content-type') || ''
    const data = contentType.includes('application/json')
      ? await geminiRes.json()
      : { error: { message: await geminiRes.text() } }

    return res.status(geminiRes.status).json(data)
  } catch (err) {
    console.error('[api/gemini] Upstream fetch error:', err.message)
    return res.status(502).json({
      error: { message: 'Could not reach the AI service. Please try again.' },
    })
  }
}
