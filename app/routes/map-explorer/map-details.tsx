import { createClient } from '@/services/supabase/supabase.server'
import type { Tables } from '@/types/supabase-custom'
import { MapDetailsView } from '@/pages/map-explorer/map-details'
import type { Route } from '../+types/map-details'

// ----------------------------------------------------------------------

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = await createClient(request)

  const { data: microgrids, error: microgridError } = await supabase
    .from('microgrids')
    .select('*')

  if (microgridError) {
    console.error(microgridError)
    throw new Error('Microgrid could not be loaded')
  }

  const {
    data: microgridServiceProviders,
    error: microgridServiceProvidersError,
  } = await supabase.from('microgrid_service_providers').select('*')

  if (microgridServiceProvidersError) {
    console.error(microgridServiceProvidersError)
    throw new Error('Microgrid service providers could not be loaded')
  }

  return { microgrids, microgridServiceProviders }
}

// ----------------------------------------------------------------------

export type Microgrids = Tables<'microgrids'>
export type MicrogridServiceProviders = Tables<'microgrid_service_providers'>

export default function MapDetails() {
  return <MapDetailsView />
}
