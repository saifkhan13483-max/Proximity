import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Info } from 'lucide-react'
import type { ToastItem } from '@/types/index'

interface ToastProps {
  item: ToastItem
  onDismiss: () => void
}

const variantConfig = {
  success: {
    border: 'border-l-4 border-green-500',
    Icon: CheckCircle,
    iconClass: 'text-green-500',
  },
  error: {
    border: 'border-l-4 border-red-500',
    Icon: XCircle,
    iconClass: 'text-red-500',
  },
  info: {
    border: 'border-l-4 border-gold-primary',
    Icon: Info,
    iconClass: 'text-gold-primary',
  },
}

export default function Toast({ item, onDismiss }: ToastProps) {
  const { border, Icon, iconClass } = variantConfig[item.type]

  useEffect(() => {
    const timer = setTimeout(onDismiss, item.duration)
    return () => clearTimeout(timer)
  }, [item.duration, onDismiss])

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={`bg-card-black text-white rounded-lg shadow-gold-sm p-4 flex items-start gap-3 min-w-[280px] max-w-sm ${border}`}
    >
      <Icon size={18} className={`${iconClass} shrink-0 mt-0.5`} />
      <p className="text-sm font-body flex-1">{item.message}</p>
      <button
        onClick={onDismiss}
        className="text-muted-text hover:text-white transition-colors shrink-0"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </motion.div>
  )
}
