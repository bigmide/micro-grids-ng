import * as z from 'zod'

export const MicrogridSchema = z.object({
  category: z.string().trim().min(1, 'Category is required'),
  name: z.string().trim().min(1, 'Microgrid name is required'),
  operator: z.string().trim().min(1, 'Operator is required'),
  type: z.string().trim().min(1, 'Type is required'),
  capacity: z.string().trim().min(1, 'Capacity is required'),
  powerSources: z.string().trim().min(1, 'Power sources is required'),
  description: z.string().trim().min(1, 'Description is required'),
  commissioningDate: z.string().trim().min(1, 'Commissioning date is required'),
  state: z.string().trim().min(1, 'State is required'),
  lga: z.string().trim().min(1, 'LGA is required'),
  area: z.string().trim().min(1, 'Area is required'),
  geopoliticalZone: z.string().trim().min(1, 'Geopolitical zone is required'),
  size: z.string().trim().min(1, 'Size is required'),
  position: z.object({
    lat: z.string().trim().min(1, 'Lat is required'),
    lng: z.string().trim().min(1, 'Lng is required'),
  }),
  source: z.string().trim().min(1, 'Source is required'),
  contactName: z.string().trim().min(1, 'Contact name is required'),
  email: z.string().trim().min(1, 'Email is required'),
  notes: z.string().trim(),
})

// eslint-disable-next-line no-redeclare
export type MicrogridSchema = z.infer<typeof MicrogridSchema>
