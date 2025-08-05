import { SubmitMicrogridView } from '@/pages/submit-microgrid'
import type { Route } from './+types/submit-microgrid'
import { submitMicrogridSubmissions } from '@/services/api-microgrids'
import type { MicrogridApplication } from '@/types/microgrids'
import { data } from 'react-router'

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

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const microgrid: MicrogridApplication = {
    category: (formData.get('category') as string) || '',
    microgridName: formData.get('name') as string,
    operator: formData.get('operator') as string,
    type: (formData.get('type') as string) || '',
    capacity: formData.get('capacity') as string,
    powerSources: (formData.get('powerSources') as string) || '',
    description: formData.get('description') as string,
    commissioningDate: formData.get('commissioningDate') as string,
    state: (formData.get('state') as string) || '',
    lga: (formData.get('lga') as string) || '',
    area: (formData.get('area') as string) || '',
    geopoliticalZone: (formData.get('geopoliticalZone') as string) || '',
    size: formData.get('size') as string,
    position: {
      lat: formData.get('lat') as string,
      lng: formData.get('lng') as string,
    },
    source: formData.get('source') as string,
    contactName: formData.get('contactName') as string,
    email: formData.get('email') as string,
    notes: formData.get('notes') as string,
  }

  const { ok, errors, headers } = await submitMicrogridSubmissions({
    formData: microgrid,
    request,
  })

  if (errors) return data({ ok, errors }, { headers, status: 400 })

  return data({ ok, errors }, { headers, status: 200 })
}

export default function MicroGrids(props: Route.ComponentProps) {
  return <SubmitMicrogridView {...props} />
}
