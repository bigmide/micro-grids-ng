import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import React, { forwardRef } from 'react'

export function InputGroup({
  children,
}: React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      data-slot="control"
      className={clsx(
        'relative isolate block',
        'has-[[data-slot=icon]:first-child]:[&_input]:pl-10 has-[[data-slot=icon]:last-child]:[&_input]:pr-10 sm:has-[[data-slot=icon]:first-child]:[&_input]:pl-8 sm:has-[[data-slot=icon]:last-child]:[&_input]:pr-8',
        '*:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-3 *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:top-2.5 sm:*:data-[slot=icon]:size-4',
        '[&>[data-slot=icon]:first-child]:left-3 sm:[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-3 sm:[&>[data-slot=icon]:last-child]:right-2.5',
        '*:data-[slot=icon]:text-zinc-500 dark:*:data-[slot=icon]:text-zinc-400',
      )}
    >
      {children}
    </span>
  )
}

const dateTypes = ['date', 'datetime-local', 'month', 'time', 'week']
type DateType = (typeof dateTypes)[number]

export const Input = forwardRef(function Input(
  {
    className,
    ...props
  }: {
    className?: string
    type?:
      | 'email'
      | 'number'
      | 'password'
      | 'search'
      | 'tel'
      | 'text'
      | 'url'
      | DateType
  } & Omit<Headless.InputProps, 'as' | 'className'>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <Headless.Input
      ref={ref}
      {...props}
      data-slot="control"
      className={clsx([
        className,
        // Date classes
        props.type &&
          dateTypes.includes(props.type) && [
            '[&::-webkit-datetime-edit-fields-wrapper]:p-0',
            '[&::-webkit-date-and-time-value]:min-h-[1.5em]',
            '[&::-webkit-datetime-edit]:inline-flex',
            '[&::-webkit-datetime-edit]:p-0',
            '[&::-webkit-datetime-edit-year-field]:p-0',
            '[&::-webkit-datetime-edit-month-field]:p-0',
            '[&::-webkit-datetime-edit-day-field]:p-0',
            '[&::-webkit-datetime-edit-hour-field]:p-0',
            '[&::-webkit-datetime-edit-minute-field]:p-0',
            '[&::-webkit-datetime-edit-second-field]:p-0',
            '[&::-webkit-datetime-edit-millisecond-field]:p-0',
            '[&::-webkit-datetime-edit-meridiem-field]:p-0',
          ],
        // Basic layout
        'relative block w-full appearance-none px-3 py-[calc(--spacing(2)-1px)]',
        // Typography
        'placeholder:text-zinc-400 sm:text-sm dark:text-zinc-200 dark:placeholder:text-zinc-500',
        // Background color + shadow
        'rounded-[calc(var(--radius-md)-1px)] bg-white shadow-md shadow-zinc-800/5 dark:bg-zinc-700/[0.15]',
        // Focus ring
        'outline outline-zinc-900/10 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 dark:outline-zinc-700 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400',
        // Invalid state
        'data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500',
        // Disabled state
        'data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/[2.5%] dark:data-hover:data-disabled:border-white/15',
        // System icons
        'dark:[color-scheme:dark]',
      ])}
    />
  )
})
