import type React from 'react'
import { clsx } from 'clsx'
import * as Headless from '@headlessui/react'
import { Link } from './link'
import { twMerge } from 'tailwind-merge'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9" />
    </svg>
  )
}

const variantStyles = {
  primary:
    'bg-zinc-900 py-2 px-3 text-white data-hover:bg-zinc-700 dark:bg-teal-400/10 dark:text-teal-400 dark:ring-1 dark:ring-inset dark:ring-teal-400/20 dark:data-hover:bg-teal-400/10 dark:data-hover:text-teal-300 dark:data-hover:ring-teal-300',
  secondary:
    'bg-zinc-100 py-1 px-3 text-zinc-900 data-hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:data-hover:bg-zinc-800 dark:data-hover:text-zinc-300',
  filled:
    'bg-zinc-900 py-1 px-3 text-white data-hover:bg-zinc-700 dark:bg-teal-500 dark:text-white dark:data-hover:bg-teal-400',
  outline:
    'py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 data-hover:bg-zinc-900/2.5 data-hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:data-hover:bg-white/5 dark:data-hover:text-white',
  text: 'text-teal-500 data-hover:text-teal-600 dark:text-teal-400 dark:data-hover:text-teal-500',
  plain: clsx(
    // Base
    'isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold',
    // Sizing
    'px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6',
    // Focus
    'focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500',
    // Disabled
    'data-disabled:opacity-50',
    // Icon
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
    // Base
    'border-transparent text-zinc-950 data-active:bg-zinc-950/5 data-hover:bg-zinc-950/5',
    // Dark mode
    'dark:text-white dark:data-active:bg-white/10 dark:data-hover:bg-white/10',
    // Icon
    '[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
  arrow?: 'left' | 'right'
  ref?: React.RefObject<HTMLElement>
  className?: string
  children: React.ReactNode
} & (Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> | Omit<Headless.ButtonProps, 'as' | 'className'>)

export function Button({ variant = 'primary', className, children, arrow, ref, ...props }: ButtonProps) {
  className = twMerge(
    'relative inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-md',
    variantStyles[variant],
    className,
  )

  let arrowIcon = (
    <ArrowIcon
      className={clsx(
        'mt-0.5 h-5 w-5',
        variant === 'text' && 'relative top-px',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1',
      )}
    />
  )

  let inner = (
    <>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </>
  )

  return 'href' in props ? (
    <Link className={className} ref={ref as React.RefObject<HTMLAnchorElement>} {...props}>
      <TouchTarget>{inner}</TouchTarget>
    </Link>
  ) : (
    <Headless.Button className={className} ref={ref} {...props}>
      <TouchTarget>{inner}</TouchTarget>
    </Headless.Button>
  )
}

/**
 * Expand the hit area to at least 44×44px on touch devices
 */
export function TouchTarget({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        className="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
        aria-hidden="true"
      />
      {children}
    </>
  )
}
