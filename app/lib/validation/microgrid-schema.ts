import * as z from 'zod'

export const MicrogridSchema = z.object({
  address: z.string().trim().min(1, 'Address is required'),
  area: z.string().trim().min(1, 'Area is required'),
  capacity: z.string().trim().min(1, 'Capacity is required'),
  category: z.string().trim().min(1, 'Category is required'),
  commissioningYear: z.string().trim().min(1, 'Commissioning year is required'),
  contactName: z.string().trim().min(1, 'Contact name is required'),
  description: z.string().trim().min(1, 'Description is required'),
  email: z.string().trim().min(1, 'Email is required'),
  geopoliticalZone: z.string().trim().min(1, 'Geopolitical zone is required'),
  lga: z.string().trim().min(1, 'LGA is required'),
  microgridName: z.string().trim().min(1, 'Microgrid name is required'),
  notes: z.string().trim(),
  operator: z.string().trim().min(1, 'Operator is required'),
  position: z.object({
    lat: z.string().trim().min(1, 'Lat is required'),
    lng: z.string().trim().min(1, 'Lng is required'),
  }),
  powerSources: z.string().trim().min(1, 'Power sources is required'),
  size: z.string().trim().min(1, 'Size is required'),
  slug: z.string().trim().min(1, 'Slug is required'),
  source: z.string().trim().min(1, 'Source is required'),
  state: z.string().trim().min(1, 'State is required'),
  status: z.string().trim().min(1, 'Status is required'),
  type: z.string().trim().min(1, 'Type is required'),
})

// eslint-disable-next-line no-redeclare
export type MicrogridSchema = z.infer<typeof MicrogridSchema>
