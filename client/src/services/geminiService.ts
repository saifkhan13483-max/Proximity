export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

async function apiCall(endpoint: string, body: object): Promise<Response> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  const response = await apiCall('/api/ai/chat', { messages })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error || `AI error: ${response.status}`)
  }
  const data = await response.json()
  return data.text ?? 'Sorry, I could not generate a response.'
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
  const response = await apiCall('/api/ai/dispute-letter', input)
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error || `AI error: ${response.status}`)
  }
  const data = await response.json()
  if (!data.text) throw new Error('No response from AI.')
  return data.text
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
  const response = await apiCall('/api/ai/dispute-letter-single', { personal, item, bureau })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error || `AI error: ${response.status}`)
  }
  const data = await response.json()
  if (!data.text) throw new Error('No response from AI.')
  return {
    id,
    bureau,
    creditorName: item.creditorName,
    accountNumber: item.accountNumber,
    disputeReason: item.disputeReason,
    letterText: data.text,
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
  const response = await apiCall('/api/ai/credit-review', input)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData?.error || `AI error: ${response.status}`)
  }
  return response.json() as Promise<CreditReviewResult>
}
