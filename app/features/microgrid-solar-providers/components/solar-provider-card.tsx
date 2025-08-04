import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Tag } from '@/components/tag'
import { Text } from '@/components/text'

// ----------------------------------------------------------------------

export function SolarProviderCard({ supplier }: { supplier: any }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-100 shadow-md transition-shadow hover:shadow-lg dark:border-zinc-700/40">
      <div className="p-6">
        <div className="flex items-start">
          <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-zinc-200 dark:border-teal-500 dark:bg-zinc-700" />
          <div className="ml-4">
            <Heading level={3} className="text-xl font-bold">
              {supplier.name}
            </Heading>
            <div className="mt-1 flex items-center text-zinc-600 dark:text-zinc-400">
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{supplier.location}</span>
            </div>
          </div>
        </div>

        <Text className="mt-4">{supplier.description}</Text>

        <div className="mt-5">
          <Heading level={4} className="mb-2 text-base font-medium">
            Products & Services
          </Heading>
          <div className="flex flex-wrap gap-2">
            {['Solar Panels', 'Batteries', 'Inverters', 'Installation'].map(
              (service, idx) => (
                <Tag
                  key={idx}
                  // className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
                >
                  {service}
                </Tag>
              ),
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="secondary"
            className="min-w-[120px] flex-1 px-4 py-2 font-medium"
          >
            View Details
          </Button>
          <Button className="min-w-[120px] flex-1 px-4 py-2 font-medium">
            Contact
          </Button>
        </div>
      </div>
    </div>
  )
}
