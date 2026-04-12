import { cn } from '@lib/utils'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
}

export default function PageWrapper({ children, className, dark = false }: PageWrapperProps) {
  return (
    <main
      id="main-content"
      className={cn('pt-20', dark ? 'bg-near-black' : 'bg-white', className)}
    >
      {children}
    </main>
  )
}
