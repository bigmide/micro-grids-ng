import { MapNavView } from '@/pages/map-explorer/map-nav'
import { createClient } from '@/services/supabase/supabase.server'
import type { Tables } from '@/types/supabase-custom'
import type { Route } from '../+types/map-nav'

// ----------------------------------------------------------------------

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = await createClient(request)

  const { data: microgrids, error: microgridError } = await supabase
    .from('microgrids')
    .select('microgrid_name, position, category')

  if (microgridError) {
    console.error(microgridError)
    throw new Error('Microgrid could not be loaded')
  }

  const {
    data: microgridServiceProviders,
    error: microgridServiceProvidersError,
  } = await supabase
    .from('microgrid_service_providers')
    .select('company_name, position, category')

  if (microgridServiceProvidersError) {
    console.error(microgridServiceProvidersError)
    throw new Error('Microgrid service providers could not be loaded')
  }

  return { microgrids, microgridServiceProviders }
}

// ----------------------------------------------------------------------

export type Microgrids = Pick<
  Tables<'microgrids'>,
  'category' | 'microgrid_name' | 'position'
>
export type MicrogridServiceProviders = Pick<
  Tables<'microgrid_service_providers'>,
  'category' | 'company_name' | 'position'
>

export default function MapNav() {
  return <MapNavView />
}
