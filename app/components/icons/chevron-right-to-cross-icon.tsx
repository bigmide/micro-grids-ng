import { clsx } from 'clsx'

// ----------------------------------------------------------------------

export function ChevronRightToCrossIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="icon ml-auto block size-4"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <g
        className={clsx(
          'icon__group origin-[8px_8px] transition-transform duration-300 ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] will-change-transform',
          open && '[transform:rotate(-90deg)]',
        )}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <path
          d="M3 3l10 10"
          className={clsx(
            open
              ? 'origin-[8px_8px] [transform:translateY(0px)] ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] [stroke-dasharray:17] [stroke-dashoffset:0] [transition:transform_.3s,stroke-dashoffset_.3s]'
              : 'origin-[8px_8px] [transform:translateY(3px)] ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] [stroke-dasharray:17] [stroke-dashoffset:10] [transition:transform_.3s,stroke-dashoffset_.3s]',
          )}
        ></path>
        <path
          d="M13 3L3 13"
          className={clsx(
            open
              ? 'origin-[8px_8px] [transform:translateY(0px)] ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] [stroke-dasharray:17] [stroke-dashoffset:0] [transition:transform_.3s,stroke-dashoffset_.3s]'
              : 'origin-[8px_8px] [transform:translateY(3px)] ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] [stroke-dasharray:17] [stroke-dashoffset:10] [transition:transform_.3s,stroke-dashoffset_.3s]',
          )}
        ></path>
      </g>
    </svg>
  )
}
