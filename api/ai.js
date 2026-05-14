const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta'
const GEMINI_MODEL = 'gemini-2.5-flash'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function setCors(res) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v))
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

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[api/ai] GEMINI_API_KEY is not set.')
    return res.status(500).json({
      error: { message: 'GEMINI_API_KEY is not configured. Add it in Vercel → Settings → Environment Variables.' },
    })
  }

  // Build the Google Generative Language API URL — colon stays server-side only
  const geminiUrl = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`

  // Parse body — Vercel may or may not pre-parse JSON
  let parsedBody = req.body
  if (!parsedBody || typeof parsedBody !== 'object' || Buffer.isBuffer(parsedBody)) {
    try {
      const raw = Buffer.isBuffer(parsedBody)
        ? parsedBody.toString('utf8')
        : typeof parsedBody === 'string'
        ? parsedBody
        : await readRawBody(req)
      parsedBody = JSON.parse(raw)
    } catch {
      return res.status(400).json({ error: { message: 'Invalid JSON body.' } })
    }
  }

  try {
    const upstream = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedBody),
    })

    const contentType = upstream.headers.get('content-type') || ''
    const data = contentType.includes('application/json')
      ? await upstream.json()
      : { error: { message: await upstream.text() } }

    return res.status(upstream.status).json(data)
  } catch (err) {
    console.error('[api/ai] Upstream fetch error:', err.message)
    return res.status(502).json({
      error: { message: `Could not reach Gemini API: ${err.message}` },
    })
  }
}
