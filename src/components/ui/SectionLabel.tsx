import { cn } from '@lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'font-heading font-semibold text-label tracking-widest uppercase text-gold-primary mb-3 block',
        className
      )}
    >
      {children}
    </span>
  )
}
