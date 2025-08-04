import { useLoaderData, useNavigate, useParams } from 'react-router'
import { Text } from '@/components/text'
import type {
  Microgrids,
  MicrogridServiceProviders,
} from '@/routes/map-explorer/map-details'
import { MapDetailCard } from '../../features/map/components/map-detail-card'
import { MapDetailItem } from '../../features/map/components/map-detail-item'
import { MapBackButton } from '../../features/map/components/map-back-button'
import { MapBackLink } from '../../features/map/components/map-back-link'

export function MapDetailsView() {
  let navigate = useNavigate()

  const {
    microgrids,
    microgridServiceProviders,
  }: {
    microgrids: Microgrids[]
    microgridServiceProviders: MicrogridServiceProviders[]
  } = useLoaderData()

  const { name } = useParams<{ name: string }>()

  // Find the microgrid in all categories
  let gridCategoryName: string = ''
  const grid: Microgrids | undefined = microgrids.find(
    (microgrid) =>
      microgrid.microgrid_name.toLowerCase().replace(/-/g, ' ') ===
      name?.toLowerCase().replace(/-/g, ' '),
  )
  if (grid) {
    gridCategoryName = grid.category
  }

  // If not found in microgrids, check service providers
  let providerCategory: string = ''
  const provider: MicrogridServiceProviders | undefined =
    microgridServiceProviders.find(
      (microgridServiceProvider) =>
        microgridServiceProvider.company_name.toLowerCase() ===
        name?.toLowerCase().replace(/-/g, ' '),
    )
  if (provider) {
    providerCategory = provider.category
  }

  if (!grid && !provider) {
    return (
      <div className="p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Grid Not Found</h1>
        <Text className="mb-6">
          The requested grid or provider could not be found.
        </Text>
        <MapBackLink className="inline-flex items-center font-medium text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-500">
          ← Back to all grids
        </MapBackLink>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {grid ? (
        <>
          <div className="mb-6">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
              {gridCategoryName}
            </span>
          </div>

          <h1 className="mb-2 text-3xl font-bold">{grid.microgrid_name}</h1>

          <Text className="mb-8">{grid.description}</Text>

          <MapDetailCard title="Basic Information" className="mb-8">
            <MapDetailItem label="Type" value={grid.type} />
            <MapDetailItem label="Operator" value={grid.operator} />
            <MapDetailItem label="State" value={grid.state} />
            <MapDetailItem label="LGA" value={grid.lga} />
            <MapDetailItem
              label="Geopolitical Zone"
              value={grid.geopolitical_zone}
            />
          </MapDetailCard>

          <MapDetailCard title="Technical Specifications" className="mb-8">
            <MapDetailItem label="Capacity" value={grid.capacity} />
            <MapDetailItem label="Size" value={grid.size} />
            <MapDetailItem label="Power Sources" value={grid.power_sources} />
            <MapDetailItem
              label="Commissioning Date"
              value={grid.commissioning_dates}
            />
          </MapDetailCard>

          <MapDetailCard title="Location Information" className="mb-8">
            <div className="flex flex-wrap gap-4">
              <MapDetailItem
                label="Latitude"
                value={String(grid.position.lat)}
              />
              <MapDetailItem
                label="Longitude"
                value={String(grid.position.lng)}
              />
            </div>
          </MapDetailCard>

          <div className="text-sm text-zinc-500">Source: {grid.source}</div>

          <MapBackButton onClick={() => navigate(-1)} />
        </>
      ) : provider ? (
        <>
          <div className="mb-6">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
              {providerCategory}
            </span>
          </div>

          <h1 className="mb-2 text-3xl font-bold">{provider.company_name}</h1>

          <Text className="mb-8">{provider.company_description}</Text>

          <MapDetailCard title="Provider Information">
            <MapDetailItem label="Location" value={provider.state} />
            <div className="mt-4">
              <h3 className="mb-2 font-medium">Services Offered</h3>
              <p className="text-zinc-600">
                {providerCategory === 'Microgrid Developers'
                  ? 'Microgrid design, installation, and maintenance'
                  : 'Solar equipment supply and distribution'}
              </p>
            </div>
          </MapDetailCard>

          <MapBackButton onClick={() => navigate(-1)} />
        </>
      ) : null}

      <div className="mt-8">
        <MapBackLink className="inline-flex items-center font-medium text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-500">
          ← Back to all grids
        </MapBackLink>
      </div>
    </div>
  )
}
