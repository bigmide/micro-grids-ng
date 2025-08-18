import { MapExplorerView } from '~/pages/map-explorer/map-explorer'
import type { Route } from './+types/map-explorer'
import { fetchSupabaseData } from '~/services/supabase/fetch-supabase-data'
import type { Microgrid } from '~/types/microgrids'
import type { ServiceProvider } from '~/types/service-providers'

// ----------------------------------------------------------------------

export function meta() {
  return [
    { title: 'Microgrid Map Explorer | Nigeria Microgrid Projects' },
    {
      name: 'description',
      content:
        'Explore existing, developing, and potential microgrid projects across Nigeria. Visualize geospatial data and gain insights into the future of decentralized energy.',
    },
    {
      name: 'keywords',
      content:
        'microgrids, Nigeria, renewable energy, map explorer, decentralized power, grid mapping, clean energy, community power, energy access',
    },
    {
      name: 'author',
      content: 'Ekanem Bassey',
    },
  ]
}

// ----------------------------------------------------------------------

export async function loader({ request }: Route.LoaderArgs) {
  const { data: microgrids, error: microgridError } = await fetchSupabaseData(request, {
    table: 'microgrids',
    select: 'microgridName, position, description, category',
  })

  if (microgridError) {
    console.error(microgridError)
    throw new Error('Microgrid could not be loaded')
  }

  const { data: serviceProviders, error: serviceProvidersError } = await fetchSupabaseData(request, {
    table: 'service_providers',
    select: 'companyName, position, description, category',
  })

  if (serviceProvidersError) {
    console.error(serviceProvidersError)
    throw new Error('Microgrid service providers could not be loaded')
  }

  return [
    ...(microgrids as Pick<Microgrid, 'microgridName' | 'position' | 'description' | 'category'>[]),
    ...(serviceProviders as Pick<ServiceProvider, 'companyName' | 'position' | 'description' | 'category'>[]),
  ]
}

// ----------------------------------------------------------------------

export default function MapExplorer() {
  return <MapExplorerView />
}
