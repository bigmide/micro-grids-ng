import { useState, useCallback } from 'react'
import { useLoaderData } from 'react-router'
import { MapNavCategorySection } from '../../features/map/components/map-nav-category-section'
import type { Microgrid } from '~/types/microgrids'
import type { ServiceProvider } from '~/types/service-providers'

// ----------------------------------------------------------------------

export function MapNavView() {
  const {
    microgrids,
    serviceProviders,
  }: {
    microgrids: Microgrid[]
    serviceProviders: ServiceProvider[]
  } = useLoaderData()

  const microgridsCategories = microgrids.map((microgrid) => ({
    key: `${microgrid.category}-${microgrid.microgridName}`,
    value: microgrid.category,
  }))

  const serviceProvidersCategories = serviceProviders.map((provider) => ({
    key: `${provider.category}-${provider.companyName}`,
    value: provider.category,
  }))

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

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
          <h2 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-white">Microgrids</h2>
        </li>

        {microgridsCategories.map((category) => (
          <MapNavCategorySection
            key={category.key}
            category={category.value}
            items={microgrids.filter((microgrid) => microgrid.category === category.value)}
            isExpanded={expandedCategories[category.value]}
            onToggle={toggleCategory}
          />
        ))}

        <li className="px-4 pt-6 pb-2">
          <h2 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-white">
            Service Providers
          </h2>
        </li>

        {serviceProvidersCategories.map((category) => (
          <MapNavCategorySection
            key={category.key}
            category={category.value}
            items={serviceProviders.filter(
              (microgridServiceProvider) => microgridServiceProvider.category === category.value,
            )}
            isExpanded={expandedCategories[category.value]}
            onToggle={toggleCategory}
          />
        ))}
      </ul>
    </nav>
  )
}
