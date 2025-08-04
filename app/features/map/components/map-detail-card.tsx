import type React from 'react'
import { clsx } from 'clsx'

export function MapDetailCard({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        'relative mx-auto block w-48 overflow-hidden rounded-lg border border-zinc-200 bg-white p-6 shadow-xl shadow-zinc-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl dark:bg-transparent dark:shadow-md dark:shadow-zinc-600',
        className,
      )}
    >
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}
