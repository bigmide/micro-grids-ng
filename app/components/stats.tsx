import type React from 'react'
import { clsx } from 'clsx'
import { useCountUp } from '@/hooks/use-count-up'

// ----------------------------------------------------------------------

interface StatsProps {
  title: string
  value: number
  className?: string
}

export function Stats({ title, value, className }: StatsProps) {
  const { displayValue, isVisible, elementRef } = useCountUp({
    value,
  })

  return (
    <div
      className={clsx(
        'flex-1 overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-700/40',
        className,
      )}
    >
      <dl className="flex flex-col items-center p-6">
        <dt className="text-xs/7 text-zinc-500 dark:text-zinc-400">{title}</dt>
        <dd
          className={`order-first text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums sm:text-5xl dark:text-zinc-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <span
            ref={elementRef as React.RefObject<HTMLSpanElement>}
            aria-hidden="true"
          >
            {displayValue}
          </span>
        </dd>
      </dl>
    </div>
  )
}
