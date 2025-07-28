import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import React, { forwardRef } from 'react'

export const Textarea = forwardRef(function Textarea(
  {
    className,
    resizable = true,
    ...props
  }: { className?: string; resizable?: boolean } & Omit<
    Headless.TextareaProps,
    'as' | 'className'
  >,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <Headless.Textarea
      ref={ref}
      {...props}
      data-slot="control"
      className={clsx([
        className,
        // Basic layout
        'relative block w-full appearance-none px-3 py-[calc(--spacing(2)-1px)]',
        // Typography
        'placeholder:text-zinc-400 sm:text-sm dark:text-zinc-200 dark:placeholder:text-zinc-500',
        // Background color + shadow
        'rounded-[calc(var(--radius-md)-1px)] bg-white shadow-md shadow-zinc-800/5 dark:bg-zinc-700/[0.15]',
        // Focus ring
        'outline outline-zinc-900/10 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 dark:outline-zinc-700 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400',
        // Invalid state
        'data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-600 dark:data-invalid:data-hover:border-red-600',
        // Disabled state
        'disabled:border-zinc-950/20 dark:disabled:border-white/15 dark:disabled:bg-white/[2.5%] dark:data-hover:disabled:border-white/15',
        // Resizable
        resizable ? 'resize-y' : 'resize-none',
      ])}
    />
  )
})
