import { useState, useRef, useEffect, type RefObject, useCallback } from 'react'

interface UseCountUpProps {
  value: number
  start?: number
  duration?: number
  decimal?: number | false
  separator?: boolean
  delta?: number
  triggerOnVisible?: boolean
  threshold?: number
}

interface UseCountUpReturn {
  displayValue: string | number
  isVisible: boolean
  elementRef: RefObject<HTMLElement>
  reset: () => void
  restart: () => void
  startAnimation: () => void
}

const useCountUp = ({
  value,
  start = 0,
  duration = 3000,
  decimal = false,
  separator = false,
  delta = 0,
  triggerOnVisible = true,
  threshold = 0.1,
}: UseCountUpProps): UseCountUpReturn => {
  const [displayValue, setDisplayValue] = useState<string | number>(start)
  const [isVisible, setIsVisible] = useState(false)
  const animationRef = useRef<number | null>(null)
  const elementRef = useRef<HTMLElement>(null)
  const initialValue = useRef(start)
  const startTimeRef = useRef<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const animationTriggered = useRef(false)

  // Format number based on props
  const formatNumber = useCallback(
    function formatNumber(num: number): string | number {
      let formatted: string | number = num

      if (decimal !== false) {
        formatted = parseFloat(num.toFixed(decimal))
      } else {
        formatted = Math.floor(num)
      }

      return separator ? formatted.toLocaleString('en') : formatted
    },
    [decimal, separator],
  )

  // Animation easing function
  const easeOut = (t: number, b: number, c: number, d: number): number => {
    t /= d
    return -c * t * (t - 2) + b
  }

  // Animation frame callback
  const animate = useCallback(
    function animate(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp

      const progress = timestamp - startTimeRef.current
      const cappedProgress = Math.min(progress, duration)
      const currentValue = easeOut(
        cappedProgress,
        initialValue.current,
        value - initialValue.current,
        duration,
      )

      setDisplayValue(formatNumber(currentValue))

      if (cappedProgress < duration) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(formatNumber(value))
        animationTriggered.current = true
        elementRef.current?.dispatchEvent(
          new CustomEvent('countUpComplete', { bubbles: true }),
        )
      }
    },
    [duration, formatNumber, value],
  )

  // Start animation
  const startAnimation = useCallback(
    function startAnimation() {
      if (animationTriggered.current) return

      initialValue.current = delta > 0 ? value - delta : start
      setIsVisible(true)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      startTimeRef.current = null
      animationRef.current = requestAnimationFrame(animate)
    },
    [animate, delta, start, value],
  )

  // Reset animation
  const reset = useCallback(
    function reset() {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setDisplayValue(formatNumber(start))
      animationTriggered.current = false
    },
    [formatNumber, start],
  )

  // Restart animation
  const restart = useCallback(
    function () {
      animationTriggered.current = false
      startAnimation()
    },
    [startAnimation],
  )

  // IntersectionObserver setup
  useEffect(() => {
    if (!triggerOnVisible || !elementRef.current) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation()
        }
      },
      { threshold },
    )

    observerRef.current.observe(elementRef.current)

    return () => {
      observerRef.current?.disconnect()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [triggerOnVisible, threshold, startAnimation])

  // Manual trigger effect
  useEffect(() => {
    if (!triggerOnVisible) {
      startAnimation()
    }
  }, [startAnimation, triggerOnVisible])

  // Handle events
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleReset = () => reset()
    const handleRestart = () => restart()

    element.addEventListener('countUpReset', handleReset)
    element.addEventListener('countUpRestart', handleRestart)

    return () => {
      element.removeEventListener('countUpReset', handleReset)
      element.removeEventListener('countUpRestart', handleRestart)
    }
  }, [reset, restart])

  return {
    displayValue,
    isVisible,
    elementRef: elementRef as RefObject<HTMLElement>,
    reset,
    restart,
    startAnimation,
  }
}

export default useCountUp
