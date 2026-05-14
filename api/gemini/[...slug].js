const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function setCors(res) {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => res.setHeader(key, value))
}

async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => { data += chunk })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
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
        message: 'GEMINI_API_KEY is not configured on the server. Add it in Vercel → Settings → Environment Variables.',
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

  // Vercel may or may not pre-parse req.body depending on config.
  // Always read raw body to be safe.
  let parsedBody = req.body
  if (!parsedBody || typeof parsedBody === 'string' || Buffer.isBuffer(parsedBody)) {
    try {
      const raw = Buffer.isBuffer(parsedBody)
        ? parsedBody.toString('utf8')
        : typeof parsedBody === 'string'
        ? parsedBody
        : await readRawBody(req)
      parsedBody = JSON.parse(raw)
    } catch (e) {
      return res.status(400).json({ error: { message: 'Invalid JSON body.' } })
    }
  }

  try {
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedBody),
    })

    const contentType = geminiRes.headers.get('content-type') || ''
    const data = contentType.includes('application/json')
      ? await geminiRes.json()
      : { error: { message: await geminiRes.text() } }

    return res.status(geminiRes.status).json(data)
  } catch (err) {
    console.error('[api/gemini] Upstream fetch error:', err.message)
    return res.status(502).json({
      error: { message: `Could not reach Gemini API: ${err.message}` },
    })
  }
}
