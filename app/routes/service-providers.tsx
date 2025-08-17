/* global process*/

import ServiceProvidersView from '@/pages/service-providers'
import type { Route } from './+types/service-providers'
import { submitSupabaseData } from '@/services/supabase/submit-supabase-data'
import type { ServiceProvider } from '@/types/service-providers'
import { ServiceProviderSchema } from '@/lib/validation/service-provider-schema'
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

export async function action({ request }: Route.LoaderArgs) {
  const formData = await request.formData()
  const imageFile = formData.get('logo') as File
  const logoName = imageFile.name
    ? `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${imageFile?.name}`.replaceAll('/', '')
    : ''
  const logoPath = logoName
    ? `${process.env.SUPABASE_URL}/storage/v1/object/public/service-providers-logos/${logoName}`
    : ''

  const serviceProviderData: ServiceProvider = {
    address: formData.get('address') as string,
    businessClassification: (formData.get('businessClassification') as string) || '',
    category: (formData.get('category') as string) || '',
    certification: (formData.get('certification') as string) || '',
    city: formData.get('city') as string,
    commencementYear: (formData.get('commencementYear') as string) || '',
    companyName: formData.get('companyName') as string,
    connectionMode: (formData.get('connectionMode') as string) || '',
    contactName: formData.get('contactName') as string,
    coverageAreas: formData.get('coverageAreas')?.toString().split(',') || [],
    description: formData.get('description') as string,
    email: formData.get('email') as string,
    lga: (formData.get('lga') as string) || '',
    logo: logoPath,
    notes: formData.get('notes') as string,
    phone: (formData.get('phone') as string) || '',
    position: {
      lat: formData.get('lat') as string,
      lng: formData.get('lng') as string,
    },
    productsAndServices: formData.get('productsAndServices')?.toString().split(',') || [],
    slug: formData.get('companyName')?.toString().toLowerCase().split(' ').join('-') || '',
    state: (formData.get('state') as string) || '',
    status: 'pending',
    website: formData.get('website') ? `https://${formData.get('website')}` : '',
  }

  const { ok, errors, headers } = await submitSupabaseData(request, {
    table: 'service_providers',
    schema: ServiceProviderSchema,
    data: serviceProviderData,
    files: [
      {
        file: imageFile,
        field: 'logo', // Database field to store the URL
        bucket: 'service-providers-logos',
        fileName: logoName,
      },
    ],
  })

  if (errors) return data({ ok, errors }, { headers, status: 400 })

  return data({ ok, errors }, { headers, status: 200 })
}

export default function ServiceProviders(props: Route.ComponentProps) {
  return <ServiceProvidersView {...props} />
}
