import { MappingMicroGrids } from '@/pages/mapping-micro-grid'

// ----------------------------------------------------------------------

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
  return <MappingMicroGrids />
}
