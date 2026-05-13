const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

const CREDIT_ADVISOR_SYSTEM = `You are an expert credit repair advisor at Proximity Credit Repair — a premium credit restoration firm. You help clients understand their credit reports, dispute strategies, score improvement tactics, and debt management.

Rules:
- Be warm, professional, and encouraging
- Give specific, actionable credit advice
- Reference FCRA rights when relevant
- Keep answers concise (2-4 paragraphs max)
- If asked about pricing or to sign up, direct them to the Contact page at /contact
- Never give legal advice, always recommend consulting a professional for complex legal matters
- You specialize in: credit disputes, score improvement, negative item removal, debt validation, collections, charge-offs, bankruptcies, and credit building`

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('Gemini API key is not configured.')

  const contents = [
    { role: 'user', parts: [{ text: CREDIT_ADVISOR_SYSTEM }] },
    { role: 'model', parts: [{ text: "Understood. I'm ready to assist as a credit repair advisor." }] },
    ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
  ]

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini error: ${response.status}`)
  }

  const data = await response.json()
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
  if (!GEMINI_API_KEY) throw new Error('Gemini API key is not configured.')

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

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 1500 },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini error: ${response.status}`)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('No response from Gemini.')
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
  if (!GEMINI_API_KEY) throw new Error('Gemini API key is not configured.')

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

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 1200 },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini error: ${response.status}`)
  }

  const data = await response.json()
  const letterText = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!letterText) throw new Error('No response from Gemini.')

  return {
    id,
    bureau,
    creditorName: item.creditorName,
    accountNumber: item.accountNumber,
    disputeReason: item.disputeReason,
    letterText,
  }
}

export async function generateDisputePackage(input: DisputePackageInput): Promise<DisputePackageResult> {
  const { items, ...personal } = input
  const tasks: Promise<GeneratedLetter>[] = []
  let counter = 0

  for (const item of items) {
    for (const bureau of item.bureaus) {
      const id = `letter-${counter++}`
      tasks.push(generateSingleLetter(personal, item, bureau, id))
    }
  }

  const letters = await Promise.all(tasks)
  return { letters }
}

export async function generateCreditReview(input: CreditReviewInput): Promise<CreditReviewResult> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured.')
  }

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

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData?.error?.message || `Gemini API error: ${response.status}`)
  }

  const data = await response.json()
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!rawText) {
    throw new Error('No response received from Gemini.')
  }

  const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  try {
    return JSON.parse(cleaned) as CreditReviewResult
  } catch {
    throw new Error('Could not parse AI response. Please try again.')
  }
}
