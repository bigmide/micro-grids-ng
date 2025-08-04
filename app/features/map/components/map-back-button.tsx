import type React from 'react'

export function MapBackButton({
  ...props
}: React.ComponentPropsWithRef<'button'>) {
  return (
    <button
      {...props}
      type="button"
      aria-label="Close drawer panel"
      className="drawer__close-btn js-drawer__close js-tab-focus fixed top-0 right-0 z-10 m-2 flex size-8 shrink items-center justify-center rounded-full bg-white/95 shadow-md [transition:0.2s] hover:bg-white hover:shadow-lg lg:m-3"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
      >
        <path
          d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
