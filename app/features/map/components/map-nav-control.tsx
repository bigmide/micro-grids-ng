import { clsx } from 'clsx'

// ----------------------------------------------------------------------

export function MapNavControl({
  open,
  onClick,
}: {
  open: boolean
  onClick: () => void
}) {
  const circumference = (2 * Math.PI * 22).toFixed(2)

  return (
    <button
      type="button"
      className={clsx(
        'group pointer-events-auto relative ml-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-zinc-700 [transition:transform_0.3s_cubic-bezier(0.645,_0.045,_0.355,_1)]',
      )}
      aria-label="Toggle navigation"
      onClick={onClick}
    >
      <svg
        className="absolute top-0 left-0 block h-full w-full fill-white stroke-teal-400 stroke-[1.5] opacity-[0.95] [transition:0.2s] group-hover:fill-zinc-300 group-hover:opacity-[1] dark:fill-teal-400/10 dark:group-hover:fill-teal-400/10"
        aria-hidden="true"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          strokeMiterlimit="10"
          className={clsx(
            '[transition:stroke-dashoffset_0.3s_0s]',
            open && '[transition-delay:0.3s] [stroke-dashoffset:0]',
          )}
          strokeDashoffset={circumference}
          strokeDasharray={circumference}
        />
      </svg>
      <i
        className={clsx(
          'relative block h-[2px] w-[0.8em] scale-100 rounded-[50em] bg-current bg-no-repeat text-[32px] text-inherit transition-transform duration-200 will-change-transform active:scale-90 dark:text-white',
        )}
        aria-hidden="true"
      >
        <span
          className={clsx(
            'rounded-inherit absolute top-0 left-0 h-full bg-inherit',
            open ? 'w-[50%]' : 'w-full',
          )}
          style={{
            transformOrigin: '1px 50%',
            willChange: 'transform, width',
            transitionProperty: 'transform, width',
            transitionDuration: '0.2s',
            transform: open
              ? 'translateY(0) rotate(-45deg)'
              : 'translateY(-0.25em) rotate(0)',
          }}
        />

        <span
          className={clsx(
            'rounded-inherit absolute top-0 left-0 h-full bg-inherit',
            open ? 'w-[50%]' : 'w-full',
          )}
          style={{
            transformOrigin: '1px 50%',
            willChange: 'transform, width',
            transitionProperty: 'transform, width',
            transitionDuration: '0.2s',
            transform: open
              ? 'translateY(0) rotate(45deg)'
              : 'translateY(0.25em) rotate(0)',
          }}
        />
      </i>
    </button>
  )
}
