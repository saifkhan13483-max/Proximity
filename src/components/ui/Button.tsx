import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '@lib/utils'

const MotionLink = motion(Link)

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 transition-all duration-200',
  {
    variants: {
      variant: {
        primary:
          'bg-gold-gradient text-white rounded-pill font-heading font-bold shadow-gold-sm hover:shadow-gold-md btn-glow-pulse',
        secondary:
          'bg-transparent border-2 border-gold-primary text-gold-primary rounded-pill font-heading font-bold hover:bg-gold-primary hover:text-white',
        ghost: 'bg-transparent text-gold-primary hover:underline font-heading font-bold',
      },
      size: {
        sm: 'px-5 py-2 text-sm',
        md: 'px-7 py-3 text-base',
        lg: 'px-9 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export { buttonVariants }

const motionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
}

interface ShadcnButtonProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean
  className?: string
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  onClick,
  disabled = false,
  type = 'button',
  href,
  asChild = false,
}: ShadcnButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size }),
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  if (asChild) {
    return (
      <Slot className={classes}>
        {children}
      </Slot>
    )
  }

  if (href) {
    const isExternal =
      href.startsWith('http') ||
      href.startsWith('https') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:')

    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-disabled={disabled}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          {...motionProps}
        >
          {children}
        </motion.a>
      )
    }

    return (
      <MotionLink to={href} className={classes} aria-disabled={disabled} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>} {...motionProps}>
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
