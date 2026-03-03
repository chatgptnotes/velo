import { useState, useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  formatter?: (n: number) => string
  className?: string
}

export default function AnimatedCounter({ value, duration = 1200, formatter, className = '' }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<number>(0)
  const startTime = useRef<number>(0)

  useEffect(() => {
    const start = ref.current
    startTime.current = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (value - start) * eased
      setDisplay(current)
      ref.current = current
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return <span className={className}>{formatter ? formatter(Math.round(display)) : Math.round(display).toLocaleString('en-IN')}</span>
}
