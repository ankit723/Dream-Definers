"use client"

import { useEffect, useRef, useState } from "react"

type CountUpProps = {
  to: number
  duration?: number // ms
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({
  to,
  duration = 1000,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [value, setValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return

        hasAnimated.current = true
        animateCount()
      },
      { threshold: 0.6 } // triggers when ~60% visible
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const animateCount = () => {
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.floor(progress * to))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}
