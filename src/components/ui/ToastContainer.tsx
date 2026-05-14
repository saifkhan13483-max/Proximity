import { AnimatePresence } from 'framer-motion'
import Toast from './Toast'
import { useUIStore } from '@store/uiStore'

export default function ToastContainer() {
  const toastQueue = useUIStore((state) => state.toastQueue)
  const removeToast = useUIStore((state) => state.removeToast)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3" aria-live="polite">
      <AnimatePresence>
        {toastQueue.map((toast) => (
          <Toast key={toast.id} item={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}
