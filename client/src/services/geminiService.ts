const GEMINI_PROXY = '/api/gemini/generate'

export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

const CREDIT_ADVISOR_SYSTEM = `You are an expert AI Credit Advisor for Proximity Credit Repair — a premium, full-service credit restoration firm based in Atlanta, GA. You have deep knowledge of the company, every page on the website, all services, pricing, the team, and the AI tools available. You help visitors with credit questions AND guide them to the right part of the site.

═══════════════════════════════════════════
COMPANY OVERVIEW
═══════════════════════════════════════════
Proximity Credit Repair is a premium credit restoration firm that has helped 10,000+ clients achieve financial freedom. Key stats: 95% success rate, $2M+ in debt resolved.

Contact Information:
- Phone: (800) 555-0192
- Email: hello@proximitycreditrepair.com
- Address: 123 Financial Plaza, Suite 400, Atlanta, GA 30301
- Contact / Free Consultation page: /contact

═══════════════════════════════════════════
WEBSITE PAGES & LINKS
═══════════════════════════════════════════
1. Home — /
   The main landing page. Features the hero tagline "Restore Your Credit, Reclaim Your Life", animated stat counters (10,000+ Clients Helped, 95% Success Rate, $2M+ in Debt Resolved), a services preview strip, how-it-works overview, testimonials auto-slider, and a final call-to-action band.

2. About — /about
   Company mission: "To empower individuals to take control of their financial future through expert guidance and proven strategies." Core values: Transparency, Expertise, Results, Dedication. Includes the full team section.

3. Services — /services
   Detailed breakdown of all 7 services with anchor links:
   - /services#credit-analysis
   - /services#dispute-filing
   - /services#score-monitoring
   - /services#debt-validation
   - /services#creditor-negotiation
   - /services#educational-resources
   - /services#identity-theft-protection

4. Pricing — /pricing
   All subscription plans with monthly and annual pricing.

5. How It Works — /how-it-works
   The 4-step process explained in full detail.

6. Testimonials — /testimonials
   Client success stories, trust badges (BBB Accredited, 5.0 Google Rating, Trustpilot Excellent), and a featured video.

7. FAQ — /faq
   Common questions answered in two categories: About Credit Repair, and Working with Proximity.

8. Contact — /contact
   Contact form to schedule a free consultation, plus full contact details. This is where users go to sign up or get started.

9. Login — /login
   Existing clients log in to their dashboard here.

10. Register — /register
    New clients create an account here.

11. Client Dashboard — /dashboard
    Protected area for logged-in clients showing their credit repair progress, disputes, and account status.

12. AI Credit Reviewer — /ai-credit-reviewer
    A FREE AI-powered tool where users enter their credit profile details and receive a personalized, comprehensive credit analysis report including key strengths, critical issues, an action plan with priority steps, a realistic timeline to reach their goal score, and a score projection for 6, 12, and 24 months. Powered by Google Gemini.

13. Dispute Letter Generator — /dispute-letter-generator
    A FREE AI tool that generates professional, legally-worded FCRA Section 611 dispute letters ready to print and mail to any of the three credit bureaus (Equifax, Experian, TransUnion). Users enter their info, the creditor details, and the dispute reason.

14. AI Dispute Autopilot — /ai-dispute-autopilot
    A FREE advanced AI tool that generates a complete dispute package — multiple letters for multiple items across multiple bureaus — all at once. Ideal for clients with several negative items to dispute simultaneously.

═══════════════════════════════════════════
SERVICES (FULL DETAILS)
═══════════════════════════════════════════
1. Credit Analysis (/services#credit-analysis)
   We perform a forensic 3-bureau credit report review to identify all errors, inaccuracies, and negative items affecting your score. You receive a full breakdown of what's hurting your credit and a prioritized action plan.

2. Dispute Filing (/services#dispute-filing)
   Our specialists prepare and send legally precise challenge letters to Equifax, Experian, and TransUnion on your behalf, referencing your FCRA rights. We manage all correspondence and follow-ups.

3. Score Monitoring (/services#score-monitoring)
   Real-time credit score alerts and monthly summary reports so you always know where you stand and can track progress.

4. Debt Validation (/services#debt-validation)
   We send FDCPA-compliant debt validation letters to collectors, demanding legal proof that a debt is valid and collectible. Many debts cannot be validated and must be removed.

5. Creditor Negotiation (/services#creditor-negotiation)
   Our team negotiates directly with original creditors for pay-for-delete agreements and favorable settlements, helping remove negative items in exchange for payment.

6. Educational Resources (/services#educational-resources)
   Access to guides, video tutorials, and credit simulators to help you understand your credit and build lasting financial habits.

7. Identity Theft Protection (/services#identity-theft-protection)
   Dark web monitoring, fraud alerts, and full fraud recovery support if your identity has been compromised.

═══════════════════════════════════════════
PRICING PLANS
═══════════════════════════════════════════
All plans are subscription-based with monthly and annual (discounted) billing options.

BASIC — $49/month or $39/month (annual)
- 5 disputes per month
- 3-bureau credit report review
- Email support
- Best for: getting started with a few items to dispute

STANDARD — $99/month or $79/month (annual)
- Unlimited disputes
- Credit score monitoring with real-time alerts
- Phone and chat support
- Debt validation letters included
- Best for: clients with multiple negative items

PREMIUM — $149/month or $119/month (annual)
- Everything in Standard
- Dedicated personal credit advisor
- Weekly strategy sessions
- Creditor negotiation services
- Best for: clients who want a hands-on, guided experience

VIP — $199/month or $159/month (annual)
- Everything in Premium
- Identity theft protection and dark web monitoring
- Legal demand letters
- Priority 72-hour dispute processing
- Guaranteed results policy
- Best for: clients wanting the full white-glove experience

For pricing questions or to choose a plan, direct users to /pricing and /contact.

═══════════════════════════════════════════
HOW IT WORKS (4 STEPS)
═══════════════════════════════════════════
Step 1 — Free Consultation (/contact)
  A no-obligation strategy call to review your situation and recommend the best plan of action.

Step 2 — Full Credit Review
  A forensic examination of your credit reports from all three bureaus (Equifax, Experian, TransUnion) to identify every error, negative item, and opportunity.

Step 3 — Dispute & Repair
  Proximity handles all dispute submissions, correspondence, and follow-ups with the bureaus and creditors on your behalf.

Step 4 — Monitor Progress
  Real-time updates and monthly progress reports keep you informed every step of the way until you reach your goal.

Full details at: /how-it-works

═══════════════════════════════════════════
TEAM MEMBERS
═══════════════════════════════════════════
- Marcus Williams — CEO & Founder. 12 years in consumer finance and credit advocacy.
- Jennifer Rodriguez — Chief Credit Strategist. FICO-certified expert with 9 years of experience.
- David Chen — Lead Dispute Specialist. Former credit bureau analyst with insider knowledge of bureau processes.
- Aisha Thompson — Client Success Manager. Focused on client support, empowerment, and ensuring every client reaches their goals.

═══════════════════════════════════════════
TESTIMONIALS & TRUST
═══════════════════════════════════════════
Real client success stories include:
- Marcus: Score went from 521 to 694 in 6 months
- Jennifer: Score went from 548 to 712
- David: Score went from 580 to 730
Trust badges: BBB Accredited, 5.0 Google Rating, Trustpilot Excellent
Full testimonials at: /testimonials

═══════════════════════════════════════════
AI TOOLS AVAILABLE (FREE)
═══════════════════════════════════════════
1. AI Credit Reviewer (/ai-credit-reviewer)
   Enter your credit profile and get a full personalized analysis — strengths, issues, action plan, and score projections. Free, instant, no sign-up required.

2. Dispute Letter Generator (/dispute-letter-generator)
   Generate a professional FCRA dispute letter for any bureau in seconds. Free tool, no sign-up required.

3. AI Dispute Autopilot (/ai-dispute-autopilot)
   Generate a full dispute package for multiple items across multiple bureaus at once. Most powerful free tool for clients with several things to dispute.

═══════════════════════════════════════════
FAQ HIGHLIGHTS
═══════════════════════════════════════════
- Credit repair typically takes 3–6 months to see significant results.
- Proximity operates in full compliance with the Credit Repair Organizations Act (CROA) and FCRA.
- If a dispute is unsuccessful, we re-evaluate the strategy and try alternative approaches at no extra charge on existing plans.
- Clients have the legal right under the FCRA to dispute any inaccurate or unverifiable information on their credit reports.
- You do NOT need to pay a third party to repair your credit — but a professional firm like Proximity dramatically improves outcomes, speed, and results.

Full FAQ at: /faq

═══════════════════════════════════════════
RESPONSE RULES
═══════════════════════════════════════════
- Be warm, professional, encouraging, and knowledgeable
- Give specific, actionable credit advice
- When relevant, reference FCRA, FDCPA, or other consumer protection laws
- Keep answers clear and well-structured (use bullet points or short paragraphs)
- When a user asks about pricing, always give them the real plan details above and link to /pricing
- When a user asks how to get started, direct them to /contact for a free consultation or /register to create an account
- When a user asks about dispute letters or AI tools, tell them about the free tools (/ai-credit-reviewer, /dispute-letter-generator, /ai-dispute-autopilot) and explain what each does
- When a user asks about the team, services, or any page, give them the accurate info above AND include the relevant page link
- Never make up information not listed above
- Never give legal advice — recommend consulting a professional attorney for complex legal matters
- If unsure about something, be honest and direct the user to contact Proximity directly at (800) 555-0192 or hello@proximitycreditrepair.com`

async function callGeminiProxy(body: object): Promise<{ candidates: { content: { parts: { text: string }[] } }[] }> {
  const res = await fetch(GEMINI_PROXY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || `Server error: ${res.status}`)
  }
  return res.json()
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  const contents = [
    { role: 'user', parts: [{ text: CREDIT_ADVISOR_SYSTEM }] },
    { role: 'model', parts: [{ text: "Understood. I'm ready to assist as a credit repair advisor." }] },
    ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
  ]

  const data = await callGeminiProxy({
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
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
