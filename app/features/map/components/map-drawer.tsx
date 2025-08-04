import type React from 'react'
import { clsx } from 'clsx'

// ----------------------------------------------------------------------

export function MapDrawer({
  open,
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'> & {
  open: boolean
}) {
  return (
    <div
      {...props}
      className={clsx(
        'absolute top-0 right-auto left-0 z-1001 h-full w-full max-w-md focus:outline-none',
        open
          ? 'visible [transition:none]'
          : 'invisible [transition:visibility_0s_0.3s]',
        className,
      )}
    >
      <div
        className={clsx(
          'absolute top-0 left-0 h-full w-full bg-zinc-50 shadow-lg [transition-timing-function:cubic-bezier(0.645,_0.045,_0.355,_1)] [transition:translate_0.3s] dark:bg-zinc-800 dark:text-white',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        role="alertdialog"
      >
        <div className="h-full overflow-auto overscroll-contain p-5 lg:p-8">
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
