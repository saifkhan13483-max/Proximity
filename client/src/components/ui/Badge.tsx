import { cn } from '@lib/utils'

interface BadgeProps {
  variant?: 'gold' | 'success' | 'neutral'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

const variantClasses = {
  gold: 'bg-gold-primary text-white rounded-pill font-heading font-bold',
  success: 'bg-green-500 text-white rounded-pill font-bold',
  neutral: 'bg-white/10 text-white/70 border border-white/20 rounded-pill',
}

const sizeClasses = {
  sm: 'px-3 py-1 text-label',
  md: 'px-4 py-1.5 text-caption',
}

export default function Badge({
  variant = 'gold',
  size = 'md',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}
