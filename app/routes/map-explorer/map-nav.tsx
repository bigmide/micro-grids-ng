import { MapNavView } from '@/pages/map-explorer/map-nav'
import type { Route } from './+types/map-nav'
import { fetchSupabaseData } from '@/services/supabase/fetch-supabase-data'

// ----------------------------------------------------------------------

export async function loader({ request }: Route.LoaderArgs) {
  const { data: microgrids, error: microgridError } = await fetchSupabaseData(request, {
    table: 'microgrids',
    select: 'microgridName, position, category',
  })

  if (microgridError) {
    console.error(microgridError)
    throw new Error('Microgrid could not be loaded')
  }

  const { data: serviceProviders, error: serviceProvidersError } = await fetchSupabaseData(request, {
    table: 'service_providers',
    select: 'companyName, position , category',
  })

  if (serviceProvidersError) {
    console.error(serviceProvidersError)
    throw new Error('Microgrid service providers could not be loaded')
  }

  return {
    microgrids,
    serviceProviders,
  }
}

// ----------------------------------------------------------------------

export default function MapNav() {
  return <MapNavView />
}
