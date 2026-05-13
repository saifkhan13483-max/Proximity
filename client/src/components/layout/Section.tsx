import { cn } from '@lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
  alt?: boolean
}

export default function Section({ children, className, id, dark = false, alt = false }: SectionProps) {
  const bg = dark ? 'bg-near-black text-white' : alt ? 'bg-offwhite' : 'bg-white'

  return (
    <section id={id} className={cn('section-padding', bg, className)}>
      <div className="container mx-auto">{children}</div>
    </section>
  )
}
