import { clsx } from 'clsx'
import type React from 'react'

export function SubmissionGuidelines() {
  return (
    <div className="my-6 mt-10 rounded-2xl border border-teal-500/20 bg-teal-50/50 p-4 text-sm/6 text-teal-900 dark:border-teal-500/30 dark:bg-teal-500/5 dark:text-teal-200 dark:[--tw-prose-links-hover:var(--color-teal-300)] dark:[--tw-prose-links:var(--color-white)]">
      <h3 className="mb-2 text-lg font-semibold text-teal-800 dark:text-teal-100">
        Submission Guidelines
      </h3>

      <List>
        <ListItem text="Ensure all required fields (marked with *) are filled" />

        <ListItem text="Provide accurate and verifiable information" />

        <ListItem
          text="For developing/potential microgrids, include expected commissioning
            dates"
        />
        <ListItem text="Include source information for verification purposes" />
      </List>
    </div>
  )
}

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      className="mt-0.5 mr-2 h-5 w-5 fill-teal-500 dark:fill-teal-200"
      viewBox="0 0 20 20"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function List({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'ul'>) {
  return (
    <ul {...props} className={clsx('space-y-1.5 text-sm', className)}>
      {children}
    </ul>
  )
}

function ListItem({
  text,
  className,
  ...props
}: React.ComponentPropsWithRef<'li'> & { text: string }) {
  return (
    <li {...props} className={clsx('flex items-start', className)}>
      <CheckIcon />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        <p>{text}</p>
      </div>
    </li>
  )
}
