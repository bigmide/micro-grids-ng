import { SubmitMicrogridView } from '@/pages/submit-microgrid'

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
  return <SubmitMicrogridView />
}
