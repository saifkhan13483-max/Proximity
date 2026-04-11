const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 5000
const MARKDOWN_FILE = path.join(__dirname, 'AI_BUILD_PROMPT.md')

const html = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Build Prompt — Proximity Credit Repair</title>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0f0f0f;
      color: #e8e8e8;
      padding: 40px 20px;
      line-height: 1.7;
    }
    #app {
      max-width: 900px;
      margin: 0 auto;
    }
    .top-bar {
      background: linear-gradient(135deg, #B8924A 0%, #D4AF72 50%, #8B6A2E 100%);
      color: #fff;
      padding: 18px 28px;
      border-radius: 12px;
      margin-bottom: 32px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .top-bar h1 { font-size: 1.25rem; font-weight: 700; }
    .top-bar p { font-size: 0.85rem; opacity: 0.85; margin-top: 2px; }
    #content h1 { font-size: 2rem; font-weight: 800; color: #D4AF72; margin: 32px 0 12px; }
    #content h2 { font-size: 1.5rem; font-weight: 700; color: #B8924A; margin: 28px 0 10px; border-bottom: 1px solid #2a2a2a; padding-bottom: 6px; }
    #content h3 { font-size: 1.15rem; font-weight: 600; color: #c9a86a; margin: 22px 0 8px; }
    #content h4 { font-size: 1rem; font-weight: 600; color: #a07840; margin: 18px 0 6px; }
    #content p { margin: 10px 0; color: #d0d0d0; }
    #content ul, #content ol { margin: 10px 0 10px 24px; color: #d0d0d0; }
    #content li { margin: 5px 0; }
    #content pre {
      background: #1a1a1a;
      border: 1px solid #2c2c2c;
      border-left: 3px solid #B8924A;
      border-radius: 8px;
      padding: 20px;
      overflow-x: auto;
      margin: 16px 0;
      position: relative;
    }
    #content pre code {
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.875rem;
      color: #e2e8f0;
      background: none;
      padding: 0;
    }
    #content code {
      background: #1e1e1e;
      border: 1px solid #333;
      border-radius: 4px;
      padding: 1px 6px;
      font-family: 'Fira Code', 'Courier New', monospace;
      font-size: 0.875em;
      color: #D4AF72;
    }
    #content table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-size: 0.9rem;
    }
    #content th {
      background: #1a1a1a;
      color: #B8924A;
      padding: 10px 14px;
      text-align: left;
      border: 1px solid #2a2a2a;
      font-weight: 600;
    }
    #content td {
      padding: 9px 14px;
      border: 1px solid #222;
      color: #d0d0d0;
    }
    #content tr:nth-child(even) td { background: #141414; }
    #content blockquote {
      border-left: 3px solid #B8924A;
      background: #141414;
      padding: 12px 20px;
      margin: 16px 0;
      border-radius: 0 8px 8px 0;
      color: #aaa;
      font-style: italic;
    }
    #content hr {
      border: none;
      border-top: 1px solid #222;
      margin: 28px 0;
    }
    #content a { color: #B8924A; text-decoration: none; }
    #content a:hover { text-decoration: underline; }
    .phase-badge {
      display: inline-block;
      background: linear-gradient(135deg, #B8924A, #8B6A2E);
      color: white;
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      margin-right: 8px;
    }
    .copy-hint {
      background: #1a1a1a;
      border: 1px solid #2a2a2a;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
      font-size: 0.85rem;
      color: #888;
    }
    .copy-hint strong { color: #B8924A; }
  </style>
</head>
<body>
  <div id="app">
    <div class="top-bar">
      <div>
        <h1>Proximity Credit Repair — AI Build Prompt</h1>
        <p>Sequential workflow for Replit AI Coding Agent · PRD v3.0</p>
      </div>
    </div>
    <div class="copy-hint">
      <strong>How to use:</strong> Work through each phase in order. Copy each prompt block and paste it directly into the Replit AI Coding Agent. Complete the review-and-fix prompt at the end of each phase before advancing.
    </div>
    <div id="content"></div>
  </div>
  <script>
    const raw = ${JSON.stringify(content)};
    document.getElementById('content').innerHTML = marked.parse(raw);
  </script>
</body>
</html>`

const server = http.createServer((req, res) => {
  try {
    const md = fs.readFileSync(MARKDOWN_FILE, 'utf-8')
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(html(md))
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Error reading AI_BUILD_PROMPT.md: ' + err.message)
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Proximity Credit Repair — AI Build Prompt`)
  console.log(`Server running at http://0.0.0.0:${PORT}`)
  console.log(`Serving: AI_BUILD_PROMPT.md`)
})
