// ----------------------------------------------------------------------

import { HomeView } from '~/pages/home'
import { fetchSupabaseData } from '~/services/supabase/fetch-supabase-data'
import type { Route } from './+types/home'

export function meta() {
  return [{ title: 'Micro-Grids NG' }, { name: 'description', content: 'Welcome to Micro-grid NG!' }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const {
    data: microgridsStates,
    error: microgridError,
    count,
  } = await fetchSupabaseData(request, {
    table: 'microgrids',
    select: 'state',
    queryOptions: { count: 'exact' },
  })

  if (microgridError || !microgridsStates) {
    console.error(microgridError)
    throw new Error('Microgrid could not be loaded')
  }

  const stats = [
    {
      title: 'Total microgrids mapped',
      value: count,
    },
    {
      title: 'States covered',
      value: new Set(microgridsStates.map(({ state }) => state)).size,
    },
  ]

  return { stats }
}

export default function Home(props: Route.ComponentProps) {
  return <HomeView {...props} />
}
