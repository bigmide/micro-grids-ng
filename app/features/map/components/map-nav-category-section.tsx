import { useId } from 'react'
import { ChevronRightToCrossIcon } from '@/components/icons/chevron-right-to-cross-icon'
import { NavLink } from 'react-router'
import { clsx } from 'clsx'
import type {
  Microgrids,
  MicrogridServiceProviders,
} from '@/routes/map-explorer/map-nav'

// ----------------------------------------------------------------------

interface MapNavCategorySectionProps {
  category: string
  items: (Microgrids | MicrogridServiceProviders)[]
  isExpanded: boolean
  onToggle: (category: string) => void
}

export function MapNavCategorySection({
  category,
  items,
  isExpanded,
  onToggle,
}: MapNavCategorySectionProps) {
  const contentId = useId()

  return (
    <li className="px-2">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-zinc-800 transition-colors duration-200 hover:bg-zinc-100 hover:text-teal-600 dark:text-zinc-400 dark:hover:text-teal-500"
        onClick={() => onToggle(category)}
        aria-controls={contentId}
      >
        <span>{category}</span>
        <ChevronRightToCrossIcon open={isExpanded} />
      </button>

      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="mt-1 ml-4 space-y-1 border-l border-zinc-200 pl-3">
          {items.map((item) => {
            const name =
              'microgrid_name' in item ? item.microgrid_name : item.company_name

            return (
              <li key={name}>
                <NavLink
                  to={`/map-explorer/${name?.replace(/\s+/g, '-').toLowerCase()}?lat=${item?.position?.lat}&lng=${item?.position?.lng}`}
                  className={({ isActive }) =>
                    clsx(
                      'block rounded-md px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-teal-600 dark:text-zinc-100',
                      isActive && 'bg-teal-50 font-medium text-teal-600',
                    )
                  }
                >
                  {name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}
