import type { Service } from '@/types/index'

export const services: Service[] = [
  {
    id: 'credit-analysis',
    icon: 'BarChart2',
    title: 'Credit Analysis',
    shortDescription:
      'A thorough review of your full credit report to identify errors, negative items, and opportunities for improvement.',
    description:
      'Our certified specialists perform a comprehensive, three-bureau credit analysis to map every factor affecting your score. We identify every inaccuracy, outdated record, and negative item, then build a custom action plan tailored to your unique credit profile.',
    benefits: [
      'Identify all negative items dragging your score down',
      'Spot reporting errors and inaccuracies across all three bureaus',
      'Receive a personalized, prioritized repair strategy',
      'Understand exactly what is impacting your score and why',
      'Get a clear baseline to measure your progress against',
    ],
  },
  {
    id: 'dispute-filing',
    icon: 'FileText',
    title: 'Dispute Filing',
    shortDescription:
      'We draft and submit expert dispute letters to all three credit bureaus on your behalf.',
    description:
      'Our experienced dispute specialists craft legally precise challenge letters targeting inaccurate, unverifiable, or outdated items on your credit report. We manage the entire process — from drafting to follow-up — so you never have to navigate the bureaucracy alone.',
    benefits: [
      "Expert dispute letters tailored to each bureau's requirements",
      'Track the status of every open dispute in real time',
      'Follow-up correspondence handled entirely on your behalf',
      'Challenge collections, late payments, charge-offs, and more',
      'Legally compliant with the Fair Credit Reporting Act (FCRA)',
    ],
  },
  {
    id: 'score-monitoring',
    icon: 'TrendingUp',
    title: 'Score Monitoring',
    shortDescription:
      'Real-time alerts and monthly reports so you always know exactly where your credit stands.',
    description:
      'Stay fully informed with dedicated score monitoring that tracks changes across all three credit bureaus. Our monthly progress reports break down every improvement and flag any new negative items the moment they appear, so you are always one step ahead.',
    benefits: [
      'Real-time alerts for any new negative items or inquiries',
      'Monthly three-bureau score summary reports',
      'Track score improvements as disputes are resolved',
      'Identify potential fraud or identity theft early',
      'Expert analysis of each change and what it means for you',
    ],
  },
  {
    id: 'debt-validation',
    icon: 'Shield',
    title: 'Debt Validation',
    shortDescription:
      'We demand proof that collectors have the legal right to collect — and challenge what they cannot verify.',
    description:
      'Under the Fair Debt Collection Practices Act, debt collectors are legally required to validate the debts they claim you owe. Our team sends certified validation requests to collectors and challenges any debt that cannot be properly verified, protecting your rights and your credit.',
    benefits: [
      'Force collectors to prove the debt is legally valid and accurate',
      'Remove unverifiable or statute-barred debts from your report',
      'Protect your rights under the FDCPA',
      'Challenge inflated balances and unauthorized fees',
      'Negotiate removal of verified debts as part of payment agreements',
    ],
  },
  {
    id: 'creditor-negotiation',
    icon: 'Handshake',
    title: 'Creditor Negotiation',
    shortDescription:
      'Our specialists negotiate directly with creditors to settle, reduce, or remove negative accounts on your behalf.',
    description:
      'Navigating creditor negotiations alone can be overwhelming and costly. Our Premium and VIP clients benefit from direct, professional negotiation with creditors — whether that means arranging pay-for-delete agreements, settling past-due balances at a reduced amount, or securing goodwill removals. We advocate for you at every step.',
    benefits: [
      'Pay-for-delete agreements to remove settled accounts from your report',
      'Negotiate reduced settlement amounts on outstanding balances',
      'Goodwill letter campaigns targeting creditors for compassionate removals',
      'Legal demand letters where creditors are in violation',
      'Full documentation of all negotiation outcomes for your records',
    ],
  },
  {
    id: 'educational-resources',
    icon: 'BookOpen',
    title: 'Educational Resources',
    shortDescription:
      'Gain the financial knowledge you need to maintain excellent credit long after your repair is complete.',
    description:
      'A strong credit score requires ongoing knowledge and habits. Standard, Premium, and VIP clients get full access to our library of guides, video tutorials, and interactive tools covering credit fundamentals, budgeting strategies, and score optimization. Empower yourself with the tools to stay credit-healthy for life.',
    benefits: [
      'Step-by-step guides on credit scoring, reporting, and improvement',
      'Video tutorials on budgeting, debt management, and financial planning',
      'Interactive credit score simulator to model future decisions',
      'Monthly newsletters with insider tips and industry updates',
      'Direct access to our knowledge base and expert Q&A library',
    ],
  },
  {
    id: 'identity-protection',
    icon: 'ShieldCheck',
    title: 'Identity Theft Protection',
    shortDescription:
      'Continuous monitoring and rapid response to protect your identity and credit from fraud.',
    description:
      'Identity theft can undo months of credit repair progress in days. Our VIP clients receive comprehensive identity protection — including dark web monitoring, real-time fraud alerts, and dedicated recovery support if your identity is ever compromised. We act immediately so the damage is contained before it affects your credit.',
    benefits: [
      'Dark web monitoring for your personal and financial data',
      'Instant alerts if your information is found in a data breach',
      'Dedicated identity theft recovery specialist on standby',
      'Assistance filing fraud alerts and security freezes with all three bureaus',
      'Reimbursement support documentation for identity theft losses',
    ],
  },
]
