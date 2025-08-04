import { useState, useCallback } from 'react'
import { useLoaderData } from 'react-router'
import { MapNavCategorySection } from '../../features/map/components/map-nav-category-section'
import type {
  Microgrids,
  MicrogridServiceProviders,
} from '@/routes/map-explorer/map-nav'

// ----------------------------------------------------------------------

export function MapNavView() {
  const {
    microgrids,
    microgridServiceProviders,
  }: {
    microgrids: Microgrids[]
    microgridServiceProviders: MicrogridServiceProviders[]
  } = useLoaderData()

  const microgridsCategories = microgrids.map(
    (microgridCategory) => microgridCategory.category,
  )

  const microgridServiceProvidersCategories = microgridServiceProviders.map(
    (microgridServiceProvidersCategory) =>
      microgridServiceProvidersCategory.category,
  )

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
    <nav>
      <ul className="space-y-1">
        <li className="px-4 pt-6 pb-2">
          <h2 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-white">
            Microgrids
          </h2>
        </li>

        {microgridsCategories.map((category) => (
          <MapNavCategorySection
            key={category}
            category={category}
            items={microgrids.filter(
              (microgrid) => microgrid.category === category,
            )}
            isExpanded={expandedCategories[category]}
            onToggle={toggleCategory}
          />
        ))}

        <li className="px-4 pt-6 pb-2">
          <h2 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-white">
            Service Providers
          </h2>
        </li>

        {microgridServiceProvidersCategories.map((category) => (
          <MapNavCategorySection
            key={category}
            category={category}
            items={microgridServiceProviders.filter(
              (microgridServiceProvider) =>
                microgridServiceProvider.category === category,
            )}
            isExpanded={expandedCategories[category]}
            onToggle={toggleCategory}
          />
        ))}
      </ul>
    </nav>
  )
}
