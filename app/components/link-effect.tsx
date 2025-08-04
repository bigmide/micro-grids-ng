import type React from 'react'
import { Link } from 'react-router'
import { clsx } from 'clsx'

export function LinkEffect({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={clsx(
        'group relative inline-flex h-8 items-center px-1.5 text-teal-500 no-underline antialiased',
        className,
      )}
    >
      <span className="absolute bottom-0 left-0 h-px w-full [transform-origin:right_center] bg-current [transition:transform_0.2s_0.1s] group-hover:[transform:translateX(17px)_scaleX(0)] group-hover:[transition:transform_0.2s]" />

      <span>{children}</span>

      <svg
        className="absolute right-0 bottom-0 inline-block h-[1em] w-[1em] shrink-0 [transform:translateX(100%)_rotate(90deg)] fill-current text-[32px] leading-none text-inherit"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle
            className="[stroke-dasharray:100] [stroke-dashoffset:100] [transition:stroke-dashoffset_0.2s] group-hover:[stroke-dashoffset:200] group-hover:[transition:stroke-dashoffset_0.2s_0.1s]"
            cx="16"
            cy="16"
            r="15.5"
          />
          <line
            className="[transform-origin:13px_15px] [transition:transform_0.4s] group-hover:[transform:rotate(-180deg)]"
            x1="10"
            y1="18"
            x2="16"
            y2="12"
          />
          <line
            className="[transform-origin:19px_15px] [transition:transform_0.4s] group-hover:[transform:rotate(180deg)]"
            x1="16"
            y1="12"
            x2="22"
            y2="18"
          />
        </g>
      </svg>
    </Link>
  )
}
