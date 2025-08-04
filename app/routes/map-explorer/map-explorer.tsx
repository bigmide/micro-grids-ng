import type { Route } from '../+types/map-explorer'
import { createClient } from '@/services/supabase/supabase.server'
import { MapExplorerView } from '@/pages/map-explorer/map-explorer'
import type { Tables } from '@/types/supabase-custom'

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
  const { supabase } = await createClient(request)

  const { data: microgrids, error: microgridError } = await supabase
    .from('microgrids')
    .select('microgrid_name, position, description, category')

  if (microgridError) {
    console.error(microgridError)
    throw new Error('Microgrid could not be loaded')
  }

  const {
    data: microgridServiceProviders,
    error: microgridServiceProvidersError,
  } = await supabase
    .from('microgrid_service_providers')
    .select('company_name, position, company_description, category')

  if (microgridServiceProvidersError) {
    console.error(microgridServiceProvidersError)
    throw new Error('Microgrid service providers could not be loaded')
  }

  return [...microgrids, ...microgridServiceProviders]
}

// ----------------------------------------------------------------------

export type Microgrids = Pick<
  Tables<'microgrids'>,
  'microgrid_name' | 'category' | 'description' | 'position'
>

export type MicrogridServiceProviders = Pick<
  Tables<'microgrid_service_providers'>,
  'company_name' | 'company_description' | 'position' | 'category'
>

export default function MapExplorer() {
  return <MapExplorerView />
}
