// ----------------------------------------------------------------------

import { ClientOnly } from '@/components/client-only'
import { MapExplorerView } from '@/pages/map-explorer'

export function meta() {
  return [
    { title: 'Mapping Micro-Grids' },
    {
      name: 'description',
      content: 'Mapping Micro-grids',
    },
  ]
}

export default function MicroGrids() {
  return (
    <ClientOnly>
      <MapExplorerView />
    </ClientOnly>
  )
}
