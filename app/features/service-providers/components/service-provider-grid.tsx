import { Pagination, PaginationList, PaginationNext, PaginationPage, PaginationPrevious } from '@/components/pagination'
import { ServiceProviderCard } from './service-provider-card'
import type { ServiceProvider } from '@/types/service-providers'
import { useSearchParams } from 'react-router'

// ----------------------------------------------------------------------

export function SolarProviderGrid({
  filteredServiceProviders,
  count,
}: {
  filteredServiceProviders: ServiceProvider[]
  count: number
}) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const itemsPerPage = 6
  const totalPages = Math.ceil(count / itemsPerPage)

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-white">
        Verified Service Providers
        {filteredServiceProviders.length > 0 && `(${filteredServiceProviders.length})`}
      </h2>

      {filteredServiceProviders.length === 0 ? (
        <div className="py-12 text-center">
          <svg className="mx-auto h-16 w-16 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-zinc-900 dark:text-white">No suppliers found</h3>
          <p className="mx-auto mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
            We couldn&apos;t find any suppliers matching your search. Try different keywords or register as a new
            supplier.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServiceProviders.map((provider, index) => (
              <ServiceProviderCard key={index} provider={provider} />
            ))}
          </div>

          <Pagination aria-label="Page navigation">
            <PaginationPrevious href={currentPage - 1 >= 1 ? `?page=${currentPage - 1}` : null}>
              Previous
            </PaginationPrevious>
            <PaginationList>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationPage key={i + 1} href={`?page=${i + 1}`} current={currentPage === i + 1}>
                  {i + 1}
                </PaginationPage>
              ))}
            </PaginationList>
            <PaginationNext href={currentPage + 1 <= totalPages ? `?page=${currentPage + 1}` : null}>
              Next
            </PaginationNext>
          </Pagination>
        </>
      )}
    </div>
  )
}
