import { DashboardView } from '@/pages/dashboard/dashboard'
import { data } from 'react-router'
import type { Route } from './+types/dashboard'
import { fetchSupabaseData } from '@/services/supabase/fetch-supabase-data'

// ----------------------------------------------------------------------

export function meta() {
  return [{ title: 'Micro-Grids NG' }, { name: 'description', content: 'Welcome to Micro-grid NG!' }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const {
    ok,
    data: microgrids,
    error,
    headers,
  } = await fetchSupabaseData(request, {
    table: 'microgrids',
  })

  if (!ok) return data({ microgrids, error }, { headers, status: 400 })

  return data({ microgrids, error }, { headers, status: 200 })
}

export default function Dashboard(props: Route.ComponentProps) {
  return <DashboardView {...props} />
}
