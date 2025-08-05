import ServiceProvidersView from '@/pages/service-providers'

// ----------------------------------------------------------------------

export function meta() {
  return [
    { title: 'Submit microgrid' },
    {
      name: 'description',
      content: 'Submit Microgrids',
    },
  ]
}

export default function MicroGrids() {
  return <ServiceProvidersView />
}
