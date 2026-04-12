import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseCountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  separator?: string
}

function formatNumber(value: number, separator: string): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}

export function useCountUp({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  separator = ',',
}: UseCountUpProps) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      const startTime = performance.now()
      const totalMs = duration * 1000

      const animate = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / totalMs, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(eased * end))
        if (progress < 1) requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  const formattedValue = `${prefix}${formatNumber(count, separator)}${suffix}`

  return { formattedValue, ref }
}
