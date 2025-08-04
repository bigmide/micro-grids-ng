import * as z from 'zod'

export const ServiceProvider = z.object({
  category: z.string().trim().min(1, 'Category is required'),
  name: z.string().trim().min(1, 'Provider name is required'),
  productsAndServices: z.array(
    z.string().trim().min(1),
    'Products/Services is required',
  ),
  connectionMode: z.string().trim().min(1, 'Connection mode is required'),
  businessClassification: z
    .string()
    .trim()
    .min(1, 'Business classification is required'),
  description: z.string().trim().min(1, 'Description is required'),
  commencementYear: z.string().trim().min(1, 'Commencement year is required'),
  certification: z.string().trim(),
  contactName: z.string().trim().min(1, 'Contact name is required'),
  phone: z.string().trim().min(1, 'Phone is required'),
  email: z.email(),
  website: z.url().trim().min(1, 'Website is required'),
  address: z.string().trim().min(1, 'Address is required'),
  state: z.string().trim().min(1, 'State is required'),
  lga: z.string().trim().min(1, 'LGA is required'),
  city: z.string().trim().min(1, 'City is required'),
  coverageArea: z.array(
    z.string().trim().min(1, 'Coverage area(s) is required'),
  ),
  position: z.object({
    lat: z.string().trim().min(1, 'Lat is required'),
    lng: z.string().trim().min(1, 'Lng is required'),
  }),
  logo: z.string().trim(),
  notes: z.string().trim(),
})

// eslint-disable-next-line no-redeclare
export type ServiceProvider = z.infer<typeof ServiceProvider>
