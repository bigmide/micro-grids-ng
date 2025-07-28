import {
  microgridData,
  microgridServiceProviders,
  type MicrogridInfo,
  type MicrogridServiceProvidersInfo,
} from '@/assets/grid-data'
import { clsx } from 'clsx'
import type React from 'react'
import { useNavigate, useParams } from 'react-router'

export default function MicrogridDetails() {
  const { name } = useParams<{ name: string }>()

  // Find the microgrid in all categories
  let grid: MicrogridInfo | undefined
  let categoryName = ''

  for (const category of microgridData) {
    const found = category.data.find(
      (item) =>
        item.microgridName.toLowerCase() ===
        name?.toLowerCase().replace(/-/g, ' '),
    )
    if (found) {
      grid = found
      categoryName = category.category
      break
    }
  }

  // If not found in microgrids, check service providers
  let provider: MicrogridServiceProvidersInfo | undefined
  let providerCategory = ''

  if (!grid) {
    for (const category of microgridServiceProviders) {
      const found = category.data.find(
        (item) =>
          item.name.toLowerCase() === name?.toLowerCase().replace(/-/g, ' '),
      )
      if (found) {
        provider = found
        providerCategory = category.category
        break
      }
    }
  }

  if (!grid && !provider) {
    return (
      <div className="p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Grid Not Found</h1>
        <p className="mb-6 text-gray-600">
          The requested grid or provider could not be found.
        </p>
        <BackLink className="inline-flex items-center font-medium text-teal-600 hover:text-teal-800">
          ← Back to all grids
        </BackLink>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {grid ? (
        <>
          <div className="mb-6">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
              {categoryName}
            </span>
          </div>

          <h1 className="mb-2 text-3xl font-bold">{grid.microgridName}</h1>
          <p className="mb-8 text-gray-600">{grid.description}</p>

          <DetailCard title="Basic Information" className="mb-8">
            <DetailItem label="Type" value={grid.type} />
            <DetailItem label="Operator" value={grid.operator} />
            <DetailItem label="State" value={grid.state} />
            <DetailItem label="LGA" value={grid.LGA} />
            <DetailItem
              label="Geopolitical Zone"
              value={grid.geopoliticalZone}
            />
          </DetailCard>

          <DetailCard title="Technical Specifications" className="mb-8">
            <DetailItem label="Capacity" value={grid.capacity} />
            <DetailItem label="Size" value={grid.size} />
            <DetailItem label="Power Sources" value={grid.powerSources} />
            <DetailItem
              label="Commissioning Date"
              value={grid.commissioningDates}
            />
          </DetailCard>

          <DetailCard title="Location Information" className="mb-8">
            <div className="flex flex-wrap gap-4">
              <DetailItem label="Latitude" value={grid.position.lat} />
              <DetailItem label="Longitude" value={grid.position.lng} />
            </div>
          </DetailCard>

          <div className="text-sm text-gray-500">Source: {grid.source}</div>
        </>
      ) : provider ? (
        <>
          <div className="mb-6">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
              {providerCategory}
            </span>
          </div>

          <h1 className="mb-2 text-3xl font-bold">{provider.name}</h1>
          <p className="mb-8 text-gray-600">{provider.description}</p>

          <DetailCard title="Provider Information">
            <DetailItem label="Location" value={provider.location} />
            <div className="mt-4">
              <h3 className="mb-2 font-medium">Services Offered</h3>
              <p className="text-gray-600">
                {providerCategory === 'Microgrid Developers'
                  ? 'Microgrid design, installation, and maintenance'
                  : 'Solar equipment supply and distribution'}
              </p>
            </div>
          </DetailCard>
        </>
      ) : null}

      <div className="mt-8">
        <BackLink className="inline-flex items-center font-medium text-teal-600 hover:text-teal-800">
          ← Back to all grids
        </BackLink>
      </div>
    </div>
  )
}

// Helper components
function DetailCard({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        'rounded-lg border border-gray-200 bg-white p-6',
        className,
      )}
    >
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <dt className="text-sm font-semibold text-gray-500">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  )
}

const BackLink = ({
  children,
  className,
}: React.ComponentPropsWithRef<'button'>) => {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate(-1)} className={className}>
      {children}
    </button>
  )
}
