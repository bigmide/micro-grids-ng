import { MapDetailsView } from '~/pages/map-explorer/map-details'
import type { Route } from './+types/map-details'
import { fetchSupabaseData } from '~/services/supabase/fetch-supabase-data'

// ----------------------------------------------------------------------

export async function loader({ request }: Route.LoaderArgs) {
  const { data: microgrids, error: microgridError } = await fetchSupabaseData(request, {
    table: 'microgrids',
  })

  if (microgridError) {
    console.error(microgridError)
    throw new Error('Microgrid could not be loaded')
  }

  const { data: serviceProviders, error: serviceProvidersError } = await fetchSupabaseData(request, {
    table: 'service_providers',
  })

  if (serviceProvidersError) {
    console.error(serviceProvidersError)
    throw new Error('Microgrid service providers could not be loaded')
  }

  return { microgrids, serviceProviders }
}

// ----------------------------------------------------------------------

export default function MapDetails() {
  return <MapDetailsView />
}
