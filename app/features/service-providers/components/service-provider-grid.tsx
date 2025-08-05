import type { MicrogridServiceProvidersInfo } from '@/assets/grid-data'
import { ServiceProviderCard } from './service-provider-card'

// ----------------------------------------------------------------------

export function SolarProviderGrid({
  filteredSuppliers,
}: {
  filteredSuppliers: MicrogridServiceProvidersInfo[]
}) {
  return (
    <div className="mt-16">
      <h2 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-white">
        Verified Solar Suppliers
        {filteredSuppliers.length > 0 && `(${filteredSuppliers.length})`}
      </h2>

      {filteredSuppliers.length === 0 ? (
        <div className="py-12 text-center">
          <svg
            className="mx-auto h-16 w-16 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-zinc-900">
            No suppliers found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-zinc-600">
            We couldn&apos;t find any suppliers matching your search. Try
            different keywords or register as a new supplier.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSuppliers.map((supplier, index) => (
            <ServiceProviderCard key={index} supplier={supplier} />
          ))}
        </div>
      )}
    </div>
  )
}
