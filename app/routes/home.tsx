// ----------------------------------------------------------------------

import { HomeView } from '@/pages/home'
import { createClient } from '@/services/supabase/supabase.server'
import type { Route } from '../+types/root'
import type { Tables } from '@/types/supabase-custom'

export function meta() {
  return [
    { title: 'Micro-Grids NG' },
    { name: 'description', content: 'Welcome to Micro-grid NG!' },
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = await createClient(request)

  const { data: microgrids, error: microgridError } = await supabase
    .from('microgrids')
    .select('*')
    .overrideTypes<Tables<'microgrids'>[], { merge: false }>()

  if (microgridError || !microgrids) {
    console.error(microgridError)
    throw new Error('Microgrid could not be loaded')
  }

  const microgridStats = [
    {
      title: 'Total microgrids mapped',
      value: microgrids.length,
    },
    {
      title: 'States covered',
      value: new Set(microgrids.map((microgrid) => microgrid.state)).size,
    },
  ]

  return { microgridStats }
}

export interface MicrogridStats {
  title: string
  value: number
}

export default function Home() {
  return <HomeView />
}
