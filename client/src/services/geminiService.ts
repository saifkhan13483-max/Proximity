const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

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
