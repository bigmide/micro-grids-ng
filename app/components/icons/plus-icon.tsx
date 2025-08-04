import type React from 'react'

// ----------------------------------------------------------------------

export function PlusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      className="mr-2 h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  )
}
