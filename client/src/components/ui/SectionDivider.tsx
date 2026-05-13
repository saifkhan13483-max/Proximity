import { cn } from '@lib/utils'

interface SectionDividerProps {
  className?: string
}

export default function SectionDivider({ className }: SectionDividerProps) {
  return <div className={cn('h-px w-full bg-gold-gradient', className)} />
}
