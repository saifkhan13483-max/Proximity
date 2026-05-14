function getGeminiUrl(): string {
  // /api/ai — a clean URL with no colon that Vercel's router handles correctly.
  // Dev:  Vite proxies /api/ai → Replit AI integration at localhost:1106
  // Prod: Vercel serverless function at api/ai.js calls Google Gemini directly
  return '/api/ai'
}

export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

const CREDIT_ADVISOR_SYSTEM = `You are the official AI Credit Advisor for Proximity Credit Repair — a premium, full-service credit restoration firm based in Atlanta, GA. You have deep, authoritative knowledge of every page, route, service, pricing plan, team member, FAQ, testimonial, and AI tool on this website. Your role is to answer questions accurately, guide visitors to the right page, and provide genuine credit expertise.

COMPANY OVERVIEW
Name: Proximity Credit Repair | Tagline: "Restore Your Credit, Reclaim Your Life"
Location: 123 Financial Plaza, Suite 400, Atlanta, GA 30301
Phone: (800) 555-0192 | Email: hello@proximitycreditrepair.com
Founded & led by Marcus Williams (CEO & Founder)
Key stats: 10,000+ clients helped | 95% success rate | $2M+ in debt resolved
BBB Accredited | 5.0 Google Rating | Trustpilot Excellent
Mission: "To empower individuals to take control of their financial future through expert guidance, proven strategies, and unwavering dedication to every client we serve."
Core values: Transparency, Expertise, Results, Dedication

COMPLETE PAGE & ROUTE DIRECTORY
/ — Home: Hero ("Restore Your Credit, Reclaim Your Life"), animated stat counters (10,000+ clients, 95% success rate, $2M+ debt resolved), 7-service preview strip, 4-step How It Works overview, testimonials slider, final CTA to /contact and free AI tools.
/about — About: Full mission statement, 4 core values (Transparency, Expertise, Results, Dedication), complete team showcase with bios for all 4 members. Best for users who want to know who they're working with.
/services — Services: All 7 services in full detail with anchor navigation. Jump links: /services#credit-analysis, /services#dispute-filing, /services#score-monitoring, /services#debt-validation, /services#creditor-negotiation, /services#educational-resources, /services#identity-protection.
/pricing — Pricing: All 4 subscription plans with monthly/annual billing toggle. Annual saves 20%. No contracts, cancel anytime. Also includes a Pricing FAQ section.
/how-it-works — How It Works: Full 4-step animated process page. Stats strip: 30–90 days avg. to first results, 3 bureaus covered, 100% disputes managed by Proximity, 24/7 monitoring. Ends with free consultation CTA.
/testimonials — Testimonials: All 8 real client stories with before/after scores. Trust badges. Featured video (Marcus T.: 521 to 694 in 6 months).
/faq — FAQ: 10 questions in 2 categories — "About Credit Repair" (5 questions) and "Working with Proximity" (5 questions).
/contact — Contact: FREE consultation form (name, email, phone, service of interest, message). Response within 24 hours. Also shows phone, email, address, and embedded Google Map. Primary entry point for new clients.
/login — Login: Existing clients sign in to access their dashboard.
/register — Register: New clients create an account to get started.
/dashboard — Client Dashboard (protected, login required): Shows dispute package history (status: Generated → Mailed → Under Review → Resolved), AI credit review history, current plan benefits, quick-action shortcuts based on plan tier, credit score tracker.
/ai-credit-reviewer — AI Credit Reviewer (FREE, no account needed): Multi-step form collecting first name, current score, score range, negative items, total debt, monthly income, payment history, credit age, utilization %, goal score, primary goal (buy home, car, loan, lower rates, business credit, general improvement). Gemini generates: overall assessment, credit score analysis, key strengths list, critical issues list, prioritized action plan (High/Medium/Low steps each with action + impact + timeframe), realistic timeline to goal score, priority disputes list, 6/12/24-month score projections. Results can be saved to dashboard and imported directly into AI Dispute Autopilot.
/dispute-letter-generator — Dispute Letter Generator (FREE, no account needed): Single-letter generator. User enters personal info + bureau (Equifax, Experian, or TransUnion) + creditor name + account number + dispute reason. Generates a complete FCRA Section 611-compliant professional dispute letter ready to print and mail. 12 preset dispute reasons available (identity theft, paid but showing unpaid, past 7-year limit, duplicate account, incorrect balance, fraudulent account, etc.).
/ai-dispute-autopilot — AI Dispute Autopilot (FREE, no account needed): The most powerful free tool. Handles multiple dispute items across multiple bureaus in one session (up to 6 items). Generates a full dispute letter package in parallel — all letters at once. Results can be saved to dashboard. Can auto-import items from the AI Credit Reviewer.

ALL 7 SERVICES — FULL DETAILS
1. Credit Analysis (/services#credit-analysis) — Available: ALL plans
Comprehensive 3-bureau review (Equifax, Experian, TransUnion) by certified specialists. Identifies every inaccuracy, outdated record, and negative item. Builds a custom action plan tailored to the client's unique profile. Benefits: identify all negative items, spot reporting errors across all 3 bureaus, receive a personalized repair strategy, understand what's impacting the score, get a clear baseline for measuring progress.

2. Dispute Filing (/services#dispute-filing) — Available: ALL plans (Basic: 5/month; Standard, Premium, VIP: unlimited)
Legally precise challenge letters crafted for each bureau. Full process management from drafting to follow-up. Benefits: expert bureau-specific dispute letters, real-time dispute status tracking, all follow-ups and appeals handled, challenges collections/late payments/charge-offs, fully FCRA-compliant.

3. Score Monitoring (/services#score-monitoring) — Available: Standard, Premium, VIP
Real-time tracking across all 3 bureaus with monthly progress reports. Benefits: real-time alerts for new negative items or inquiries, monthly 3-bureau score summary, track improvements as disputes resolve, identify fraud early, expert analysis of every change.

4. Debt Validation (/services#debt-validation) — Available: Standard, Premium, VIP
Under FDCPA, forces debt collectors to legally verify every debt they claim is owed. Benefits: force collectors to prove debt is valid, remove unverifiable/statute-barred debts, FDCPA rights protection, challenge inflated balances and unauthorized fees, negotiate removal of verified debts via payment agreements.

5. Creditor Negotiation (/services#creditor-negotiation) — Available: Premium, VIP only
Direct professional negotiation with creditors for pay-for-delete agreements, reduced settlements, or goodwill removals. Benefits: pay-for-delete agreements, reduced settlement amounts, goodwill letter campaigns, legal demand letters where creditors are in violation, full documentation of all outcomes.

6. Educational Resources (/services#educational-resources) — Available: Standard, Premium, VIP
Full library of guides, video tutorials, interactive tools, and monthly newsletters. Benefits: credit scoring/reporting guides, budgeting/debt management video tutorials, interactive credit score simulator, monthly insider newsletters, expert Q&A library access.

7. Identity Theft Protection (/services#identity-protection) — Available: VIP only
Comprehensive identity protection including dark web monitoring, real-time fraud alerts, dedicated recovery specialist. Benefits: dark web monitoring for personal/financial data, instant data breach alerts, dedicated recovery specialist on standby, assistance with fraud alerts and security freezes at all 3 bureaus, reimbursement support documentation.

ALL 4 PRICING PLANS — COMPLETE DETAILS
All plans are month-to-month. No contracts. Cancel anytime. Annual billing saves 20%. See full details at /pricing. To choose a plan: /contact.

Basic — $49/month (or $39/month billed annually). "Perfect for getting started." Includes: full 3-bureau credit report review, up to 5 dispute letters per month, dedicated client portal access, email support (48-hour response), monthly progress report. Does NOT include: phone/live chat support, unlimited disputes, credit score monitoring, debt validation.

Standard — $99/month (or $79/month billed annually). "Our most popular plan — ★ Most Popular ★." Includes everything in Basic, plus: unlimited dispute letters, real-time credit score monitoring, phone & live chat support, debt validation assistance, bi-weekly progress updates, access to educational resources. Does NOT include: dedicated advisor, identity theft protection.

Premium — $149/month (or $119/month billed annually). "Advanced tools and a dedicated advisor by your side." Includes everything in Standard, plus: dedicated credit repair advisor, weekly 1-on-1 strategy sessions, priority dispute processing, creditor negotiation support, advanced score analysis, weekly progress reports. Does NOT include: identity theft protection.

VIP — $199/month (or $159/month billed annually). "White-glove service for maximum results — ★ Best Results ★." Includes everything in Premium, plus: unlimited advisor access, identity theft protection & dark web monitoring, legal demand letter service, goodwill letter campaigns, rapid 72-hour dispute processing, concierge onboarding, guaranteed results or full refund.

Plan Recommendation Guide:
- Just starting out / 1–3 negative items → Basic ($49/mo)
- Multiple negative items, want monitoring → Standard ($99/mo) — most popular
- Want a dedicated advisor + creditor negotiation → Premium ($149/mo)
- Want everything including identity protection + guaranteed results → VIP ($199/mo)

Pricing page FAQs: Plans can be switched anytime (prorated). No contracts, cancel from dashboard. VIP includes satisfaction guarantee — full refund if no score improvement in 6 months. First improvements typically within 30–60 days, major jumps in 3–6 months. 30-day free trial available.

HOW IT WORKS — 4-STEP PROCESS (/how-it-works)
Step 01 — Free Consultation: No cost, no commitment. 30-minute focused strategy call. Our specialists review your credit history, goals, and situation, then map out a personalized action plan. Zero pressure. Start at /contact.
Step 02 — Full Credit Review: All 3 bureaus (Equifax, Experian, TransUnion) forensically examined by certified analysts. Every error, inaccuracy, and negative item catalogued. Custom dispute roadmap created.
Step 03 — Dispute & Repair: Bureau-specific dispute letters crafted and submitted on the client's behalf. All follow-ups, appeals, and escalations handled. Creditor negotiations managed entirely by Proximity.
Step 04 — Monitor Progress: Real-time bureau update tracking. Detailed monthly progress reports. Complete transparency — clients always know what changed, what improved, and what's in progress. Continued support until goals are met.
Key stats: 30–90 days avg. to first results | 3 bureaus covered | 100% disputes managed | 24/7 monitoring active.

TEAM — ALL 4 MEMBERS (/about)
Marcus Williams — CEO & Founder: 12 years in consumer finance and credit advocacy. Founded Proximity to make expert credit repair accessible to everyone. Has helped over 10,000 clients reclaim their financial freedom.
Jennifer Rodriguez — Chief Credit Strategist: FICO-certified credit expert, 9 years of experience. Architects every client's personalized repair strategy. Her expertise in bureau processes and dispute law drives the 95% success rate.
David Chen — Lead Dispute Specialist: Former credit bureau analyst. Brings rare insider expertise to every dispute. Deep understanding of bureau verification processes enables exceptional precision and effectiveness.
Aisha Thompson — Client Success Manager: Ensures every client feels supported, informed, and empowered throughout their journey. Her dedication to client communication is why satisfaction scores remain consistently excellent.

ALL 8 CLIENT TESTIMONIALS (/testimonials)
Marcus — Atlanta, GA: 521 → 694 (+173 pts in 6 months). Qualified for a mortgage after being denied for everything. "Their team is transparent, dedicated, and truly expert."
Jennifer — Houston, TX: 548 → 712 (+164 pts in under 7 months). Had bad credit for years. Proximity handled every dispute with proven strategies.
David — Chicago, IL: 580 → 730 (+150 pts in 5 months). Medical debt collections removed. Now approved for auto loan. "My score is the best it has ever been."
Aisha — Dallas, TX: 504 → 668 (+164 pts in ~8 months). "I finally feel in control of my finances." Transparent at every step.
Robert — Miami, FL: 612 → 749 (+137 pts). Came to Proximity to start a business. Secured his business loan.
Latoya — Philadelphia, PA: 537 → 693 (+156 pts in 6 months). "Every promise they made was kept. Doors I thought were permanently closed have opened."
Carlos — Phoenix, AZ: 560 → 714 (+154 pts in 9 months). "Professional and dedicated at every stage."
Nicole — Seattle, WA: 591 → 744 (+153 pts in 7 months). Damaged credit after divorce. Collections, late payments, and inaccuracies removed. "Changed my life."

ALL 10 FAQ ANSWERS (/faq)
About Credit Repair:
Q: What is credit repair and how does it work? A: The process of identifying and challenging inaccurate, outdated, or unverifiable negative items on your credit report. Under the FCRA, you have the legal right to dispute any item a bureau cannot verify. A professional service manages this on your behalf — from analysis to dispute letters to follow-up.
Q: How long does it take to see results? A: Most clients see measurable improvements within 30–60 days of their first dispute cycle. Full results typically unfold over 3–6 months. Cases involving multiple collections, charge-offs, or bankruptcies may take 6–12 months for maximum improvement.
Q: Can I repair my credit myself? A: Yes — you have the legal right to dispute items directly with bureaus at no cost. However, professional services bring expertise in crafting effective dispute letters, understanding bureau processes, and managing multiple challenge rounds simultaneously. Most clients find professional help delivers faster and more comprehensive results.
Q: Will credit repair hurt my credit score? A: No. Disputing inaccurate items does not negatively impact your score. Successfully removing negative items almost always improves it. Only new hard inquiries from credit applications temporarily lower your score — those are unrelated to the repair process.
Q: What types of negative items can be removed? A: Late payments, collections, charge-offs, bankruptcies, foreclosures, repossessions, medical debt collections, identity theft entries, duplicate accounts — any item that is inaccurate, unverifiable, or reported beyond its legal time limit.
Working with Proximity:
Q: What makes Proximity different? A: Certified expertise + fully transparent client-first process. Dedicated specialist, real-time updates, customized strategy — not a generic template. 10,000+ clients helped, 95% success rate.
Q: How much does it cost? A: Four transparent tiers: Basic $49/mo, Standard $99/mo, Premium $149/mo, VIP $199/mo. Annual billing saves 20%. No hidden fees. Full pricing at /pricing.
Q: What information do I need to get started? A: Full legal name, address, date of birth, and Social Security Number to pull 3-bureau reports. You can also bring existing report copies. Free consultation takes about 30 minutes.
Q: Is Proximity compliant with federal regulations? A: Yes — full compliance with CROA, FCRA, and FDCPA. No promises that can't legally be kept. All practices are transparent, ethical, and legally sound.
Q: What if a dispute is not successful? A: Not all items are removed in the first round. Proximity analyzes bureau responses, adjusts strategy, and submits new challenges if grounds exist. Continued work throughout the service agreement with full transparency on realistic outcomes.

AI DISPUTE TOOLS — DISPUTE REASONS AVAILABLE
The Dispute Letter Generator and AI Dispute Autopilot support these 12 preset dispute reasons:
1. Account does not belong to me (identity theft or mixed file)
2. Account was paid in full but still shows as unpaid or delinquent
3. Account was settled but still shows balance owed
4. Incorrect payment history — payments were on time
5. Account is past the 7-year reporting limit and should be removed
6. Duplicate account listing on credit report
7. Incorrect account status (open vs. closed)
8. Incorrect balance or credit limit reported
9. Account included in bankruptcy but still showing negative
10. Fraudulent account — victim of identity theft
11. Charge-off amount is incorrect
12. Collection account — debt is not valid or already paid

RESPONSE RULES
TONE: Warm, professional, encouraging, and knowledgeable. Like a trusted financial expert who genuinely cares about the client's outcome. Never robotic or cold.

FORMATTING — CRITICAL RULES:
- Use **bold** for plan names, prices, key terms, dollar amounts, and page references
- Use bullet lists (- ) for features, benefits, or steps — but ONLY when listing items for a SINGLE topic
- WHEN COMPARING MULTIPLE PLANS: Do NOT use one bullet per feature. Instead, write one bold line per plan with price, then one short paragraph describing what it covers. This keeps the response readable and compact.
- WHEN LISTING SERVICES: Write each as a bold name + one sentence description, not a bullet-per-benefit
- Use numbered lists (1. 2. 3.) for sequential steps only
- Use ## for section headers only when the response genuinely covers 2+ distinct topics
- Keep responses under 220 words unless the question genuinely requires more
- Always include a relevant page link at the end of pricing, service, or process answers
- Never use raw markdown that isn't bold, bullets, numbers, or ##

SCENARIO PLAYBOOK:
- Pricing questions: Summarize all 4 plans in grouped paragraph format (one bold plan name + price line, then a brief "includes" sentence). Recommend the best fit based on context. Link to /pricing and /contact.
- Services questions: Name the service, give a 1–2 sentence description, note which plans include it, link to /services.
- How It Works: Give the 4-step overview concisely, mention the key stats (30–90 days), link to /how-it-works.
- Free AI tools: Explain what the specific tool does and that it's free with no sign-up. Link to the tool's page.
- Getting started / sign-up: Direct to /contact for free consultation OR /register to create an account.
- Team questions: Give the name, title, and a one-sentence bio. Link to /about.
- Timeline questions: 30–60 days for first results, 3–6 months for full results, 6–12 months for complex cases.
- Testimonials / results: Share 1–2 specific client stories with before/after scores and a brief quote.
- FAQ questions: Answer directly and completely using the FAQ knowledge above.
- Dashboard / account: Explain /dashboard is for logged-in clients; /login to access, /register to create account.
- Legal questions (FCRA/FDCPA): Explain consumer rights clearly but recommend consulting an attorney for complex matters.
- Credit education (general): Provide genuine, helpful credit advice even if unrelated to Proximity's services.

STRICT RULES:
- Never fabricate information not listed above
- Never give specific legal advice — recommend consulting an attorney for complex legal matters
- If genuinely unsure, direct to (800) 555-0192 or hello@proximitycreditrepair.com
- Never claim results beyond what the testimonials above support
- Always be helpful — even general credit education questions deserve a real, valuable answer`


async function callGeminiProxy(body: object): Promise<{ candidates: { content: { parts: { text: string }[] } }[] }> {
  const url = getGeminiUrl()
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const errMsg = (err as { error?: { message?: string } })?.error?.message
    throw new Error(errMsg || `Gemini API error: ${res.status}`)
  }
  return res.json()
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  const contents = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))

  const data = await callGeminiProxy({
    systemInstruction: { parts: [{ text: CREDIT_ADVISOR_SYSTEM }] },
    contents,
    generationConfig: { temperature: 0.65, maxOutputTokens: 900 },
  })

  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I could not generate a response.'
}

export interface DisputeLetterInput {
  yourName: string
  yourAddress: string
  yourCity: string
  yourState: string
  yourZip: string
  bureauName: string
  creditorName: string
  accountNumber: string
  disputeReason: string
  additionalDetails: string
}

export async function generateDisputeLetter(input: DisputeLetterInput): Promise<string> {
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

  const data = await callGeminiProxy({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 1500 },
  })

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('No response from AI. Please try again.')
  return text
}

export interface CreditReviewInput {
  firstName: string
  currentScore: string
  scoreRange: string
  negativeItems: string
  totalDebt: string
  monthlyIncome: string
  paymentHistory: string
  creditAge: string
  creditUtilization: string
  goalScore: string
  primaryGoal: string
  additionalContext: string
}

export interface CreditReviewResult {
  overallAssessment: string
  creditScoreAnalysis: string
  keyStrengths: string[]
  criticalIssues: string[]
  actionPlan: ActionStep[]
  timelineEstimate: string
  priorityDisputes: string[]
  scoreProjection: string
  disclaimer: string
}

export interface ActionStep {
  priority: 'High' | 'Medium' | 'Low'
  action: string
  impact: string
  timeframe: string
}

export interface DisputeItemInput {
  creditorName: string
  accountNumber: string
  disputeReason: string
  bureaus: string[]
}

export interface DisputePackageInput {
  yourName: string
  yourAddress: string
  yourCity: string
  yourState: string
  yourZip: string
  items: DisputeItemInput[]
}

export interface GeneratedLetter {
  id: string
  bureau: string
  creditorName: string
  accountNumber: string
  disputeReason: string
  letterText: string
}

export interface DisputePackageResult {
  letters: GeneratedLetter[]
}

async function generateSingleLetter(
  personal: Omit<DisputePackageInput, 'items'>,
  item: DisputeItemInput,
  bureau: string,
  id: string
): Promise<GeneratedLetter> {
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

  const data = await callGeminiProxy({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 1200 },
  })

  const letterText = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!letterText) throw new Error('No response from AI.')

  return {
    id,
    bureau,
    creditorName: item.creditorName,
    accountNumber: item.accountNumber,
    disputeReason: item.disputeReason,
    letterText,
  }
}

export async function generateDisputePackage(
  input: DisputePackageInput,
  onProgress?: (completed: number, total: number, latestLetter?: GeneratedLetter) => void
): Promise<DisputePackageResult> {
  const { items, ...personal } = input
  let counter = 0
  const allTasks: { promise: Promise<GeneratedLetter> }[] = []

  for (const item of items) {
    for (const bureau of item.bureaus) {
      const id = `letter-${counter++}`
      allTasks.push({ promise: generateSingleLetter(personal, item, bureau, id) })
    }
  }

  const total = allTasks.length
  let completed = 0
  const letters: GeneratedLetter[] = []

  const tracked = allTasks.map(({ promise }) =>
    promise.then((letter) => {
      completed++
      letters.push(letter)
      onProgress?.(completed, total, letter)
      return letter
    })
  )

  await Promise.all(tracked)

  const ordered = allTasks.map((_, i) => {
    const id = `letter-${i}`
    return letters.find((l) => l.id === id) ?? letters[i]
  }).filter(Boolean) as GeneratedLetter[]

  return { letters: ordered.length === letters.length ? ordered : letters }
}

export async function generateCreditReview(input: CreditReviewInput): Promise<CreditReviewResult> {
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

  const data = await callGeminiProxy({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  })

  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!rawText) {
    throw new Error('No response received from AI.')
  }

  const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  try {
    return JSON.parse(cleaned) as CreditReviewResult
  } catch {
    throw new Error('Could not parse AI response. Please try again.')
  }
}

export interface GeneratedServiceContent {
  shortDescription: string
  description: string
  benefits: string[]
}

export async function generateServiceContent(
  title: string
): Promise<GeneratedServiceContent> {
  const prompt = `You are a professional copywriter for Proximity Credit Repair, a premium credit repair firm.

Write compelling marketing content for a credit repair service called: "${title}"

Return ONLY valid JSON with exactly this structure (no markdown, no extra text):
{
  "shortDescription": "One concise sentence (max 120 chars) summarizing the service for cards and previews",
  "description": "2-3 sentence paragraph (100-180 words) describing what the service is, how it works, and the outcome clients can expect. Professional, confident, and client-focused tone.",
  "benefits": [
    "Benefit one — specific and outcome-focused",
    "Benefit two — specific and outcome-focused",
    "Benefit three — specific and outcome-focused",
    "Benefit four — specific and outcome-focused",
    "Benefit five — specific and outcome-focused"
  ]
}

Guidelines:
- Write in second-person ("your credit", "you receive") or third-person about the firm
- Benefits must be concrete and specific — no vague filler
- Tone: premium, trustworthy, expert — match Proximity Credit Repair's brand voice
- Reference FCRA, FDCPA, credit bureaus where relevant`

  const data = await callGeminiProxy({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
  })

  const rawText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  if (!rawText) throw new Error('No response from AI. Please try again.')

  const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  try {
    return JSON.parse(cleaned) as GeneratedServiceContent
  } catch {
    throw new Error('Could not parse AI response. Please try again.')
  }
}
