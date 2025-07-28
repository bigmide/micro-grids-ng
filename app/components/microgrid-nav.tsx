import { microgridData, microgridServiceProviders } from '@/assets/grid-data'
import { clsx } from 'clsx'
import { useState, useCallback, useId } from 'react'
import { NavLink } from 'react-router'

export default function MicroGridNav() {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({})

  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }, [])
  return (
    <nav className="flex-1 px-6">
      <ul className="space-y-1">
        <li className="px-4 pt-6 pb-2">
          <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Microgrids
          </h2>
        </li>

        {microgridData.map((section) => (
          <CategorySection
            key={section.category}
            category={section.category}
            items={section.data}
            isExpanded={expandedCategories[section.category]}
            onToggle={toggleCategory}
          />
        ))}

        <li className="px-4 pt-6 pb-2">
          <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Service Providers
          </h2>
        </li>

        {microgridServiceProviders.map((section) => (
          <CategorySection
            key={section.category}
            category={section.category}
            items={section.data}
            isExpanded={expandedCategories[section.category]}
            onToggle={toggleCategory}
          />
        ))}
      </ul>
    </nav>
  )
}

interface CategorySectionProps<T> {
  category: string
  items: T[]
  isExpanded: boolean
  onToggle: (category: string) => void
}

function CategorySection<T extends { microgridName?: string; name?: string }>({
  category,
  items,
  isExpanded,
  onToggle,
}: CategorySectionProps<T>) {
  const contentId = useId()

  return (
    <li className="px-2">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md p-2 text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-100"
        onClick={() => onToggle(category)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
      >
        <span>{category}</span>
        <ChevronIcon isExpanded={isExpanded} />
      </button>

      <div
        id={contentId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="mt-1 ml-4 space-y-1 border-l border-gray-200 pl-3">
          {items.map((item) => (
            <li key={item.microgridName || item.name}>
              <NavLink
                to={`/map-explorer/${(item.microgridName || item.name)?.replace(/\s+/g, '-').toLowerCase()}?lat=${item?.position?.lat}&lng=${item?.position?.lng}`}
                className={({ isActive }) =>
                  clsx(
                    'block rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-teal-600',
                    isActive && 'bg-teal-50 font-medium text-teal-600',
                  )
                }
              >
                {item.microgridName || item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

function ChevronIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <svg
      className="icon ml-auto block size-4"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <g
        className={clsx(
          'icon__group origin-[8px_8px] transition-transform duration-300 ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] will-change-transform',
          isExpanded && '[transform:rotate(-90deg)]',
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
            isExpanded
              ? 'origin-[8px_8px] [transform:translateY(0px)] ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] [stroke-dasharray:17] [stroke-dashoffset:0] [transition:transform_.3s,stroke-dashoffset_.3s]'
              : 'origin-[8px_8px] [transform:translateY(3px)] ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] [stroke-dasharray:17] [stroke-dashoffset:10] [transition:transform_.3s,stroke-dashoffset_.3s]',
          )}
        ></path>
        <path
          d="M13 3L3 13"
          className={clsx(
            isExpanded
              ? 'origin-[8px_8px] [transform:translateY(0px)] ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] [stroke-dasharray:17] [stroke-dashoffset:0] [transition:transform_.3s,stroke-dashoffset_.3s]'
              : 'origin-[8px_8px] [transform:translateY(3px)] ease-[cubic-bezier(0.215,_0.61,_0.355,_1)] [stroke-dasharray:17] [stroke-dashoffset:10] [transition:transform_.3s,stroke-dashoffset_.3s]',
          )}
        ></path>
      </g>
    </svg>
  )
}
