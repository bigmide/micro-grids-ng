import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import type React from 'react'

export function InputWithAddOn({
  preText,
  ref,
  className,
  onInput,
  ...props
}: {
  preText: string
  ref?: React.RefObject<HTMLInputElement>
  className?: string
} & Omit<Headless.InputProps, 'as' | 'className'>) {
  return (
    <div
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        'relative block w-full',
        // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
        'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-sm',
        // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
        'dark:before:hidden',
        // Focus ring
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-teal-500',
        // Disabled state
        'has-data-disabled:opacity-50 has-data-disabled:before:shadow-none',
        // Invalid state
        'has-data-invalid:before:shadow-red-500/10',
      ])}
    >
      <span
        className={clsx(
          'flex items-center rounded-md pl-3',
          // Background color
          'bg-transparent dark:bg-white/5',
          // Border
          'border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20',
          // Invalid state
          'has-data-invalid:border-red-500 has-data-invalid:hover:border-red-500 dark:has-data-invalid:border-red-500 dark:has-data-invalid:hover:border-red-500',
          // Disabled state
          'has-data-disabled:border-zinc-950/20 dark:has-data-disabled:border-white/15 dark:has-data-disabled:bg-white/[2.5%] dark:hover:has-data-disabled:border-white/15',
          // System icons
        )}
      >
        <span className={clsx('shrink-0 text-base text-zinc-500 select-none sm:text-sm/6')}>{preText}</span>

        <Headless.Input
          ref={ref}
          {...props}
          className={clsx(
            // Basic layout
            'relative block w-full min-w-0 grow appearance-none rounded-r-lg py-1.5 pr-3 pl-1',
            // Typography
            'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
            // Hide default focus styles
            'focus:outline-hidden',
          )}
          onInput={onInput}
        />
      </span>
    </div>
  )
}
