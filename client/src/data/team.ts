import type { TeamMember } from '@/types/index'

function avatarUrl(name: string): string {
  const encoded = encodeURIComponent(name)
  return `https://ui-avatars.com/api/?name=${encoded}&background=b8924a&color=ffffff&size=256&bold=true&format=svg`
}

export const teamMembers: TeamMember[] = [
  {
    id: 'tm1',
    name: 'Marcus Williams',
    title: 'CEO & Founder',
    photoUrl: avatarUrl('Marcus Williams'),
    bio: 'With 12 years in consumer finance and credit advocacy, Marcus founded Proximity with one mission: make expert credit repair accessible to everyone. His proven leadership has helped over 10,000 clients reclaim their financial freedom.',
  },
  {
    id: 'tm2',
    name: 'Jennifer Rodriguez',
    title: 'Chief Credit Strategist',
    photoUrl: avatarUrl('Jennifer Rodriguez'),
    bio: "A FICO-certified credit expert with 9 years of experience, Jennifer architects every client's personalized repair strategy. Her deep knowledge of bureau processes and dispute law drives our industry-leading 95% success rate.",
  },
  {
    id: 'tm3',
    name: 'David Chen',
    title: 'Lead Dispute Specialist',
    photoUrl: avatarUrl('David Chen'),
    bio: "A former credit bureau analyst, David brings rare insider expertise to every dispute he crafts. His understanding of bureau verification processes enables Proximity to challenge items with exceptional precision and effectiveness.",
  },
  {
    id: 'tm4',
    name: 'Aisha Thompson',
    title: 'Client Success Manager',
    photoUrl: avatarUrl('Aisha Thompson'),
    bio: "Aisha ensures every Proximity client feels supported, informed, and empowered throughout their entire journey. Her dedicated approach to client communication is the reason our satisfaction scores remain consistently excellent.",
  },
]
