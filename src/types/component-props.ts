import { ReactNode } from 'react'

export interface BaseProps {
  className?: string
  children?: ReactNode
}

export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
}

export interface CardProps extends BaseProps {
  variant: 'dark' | 'light'
  hover?: boolean
}
