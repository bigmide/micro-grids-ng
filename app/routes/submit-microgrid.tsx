import { SubmitMicrogridView } from '@/pages/submit-microgrid'
import type { Route } from './+types/submit-microgrid'
import { data } from 'react-router'
import type { Microgrid } from '@/types/microgrids'
import { submitSupabaseData } from '@/services/supabase/submit-supabase-data'
import { MicrogridSchema } from '@/lib/validation/microgrid-schema'

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

  const microgridData: Microgrid = {
    address: (formData.get('address') as string) || '',
    area: (formData.get('area') as string) || '',
    capacity: (formData.get('capacity') as string)
      ? `${formData.get('capacity') as string} ${formData.get('capacityUnit') as string}`
      : '',
    category: (formData.get('category') as string) || '',
    commissioningYear: (formData.get('commissioningYear') as string) || '',
    contactName: formData.get('contactName') as string,
    description: formData.get('description') as string,
    email: formData.get('email') as string,
    geopoliticalZone: (formData.get('geopoliticalZone') as string) || '',
    lga: (formData.get('lga') as string) || '',
    microgridName: formData.get('microgridName') as string,
    notes: formData.get('notes') as string,
    operator: formData.get('operator') as string,
    position: {
      lat: formData.get('lat') as string,
      lng: formData.get('lng') as string,
    },
    powerSources: (formData.get('powerSources') as string) || '',
    size: (formData.get('size') as string)
      ? `${formData.get('size') as string} ${formData.get('sizeUnit') as string}`
      : '',
    slug: formData.get('microgridName')?.toString().toLowerCase().split(' ').join('-') || '',
    source: formData.get('source') as string,
    state: (formData.get('state') as string) || '',
    status: 'pending',
    type: (formData.get('type') as string) || '',
  }

  const { ok, errors, headers } = await submitSupabaseData(request, {
    table: 'microgrids',
    schema: MicrogridSchema,
    data: microgridData,
  })

  if (errors) return data({ ok, errors }, { headers, status: 400 })

  return data({ ok, errors }, { headers, status: 200 })
}

export default function SubmitMicrogrids(props: Route.ComponentProps) {
  return <SubmitMicrogridView {...props} />
}
