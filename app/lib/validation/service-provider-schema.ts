import * as z from 'zod'

export const ServiceProviderSchema = z.object({
  address: z.string().trim().min(1, 'Address is required'),
  businessClassification: z.string().trim().min(1, 'Business classification is required'),
  category: z.string().trim().min(1, 'Category is required'),
  certification: z.string().trim(),
  city: z.string().trim().min(1, 'City is required'),
  commencementYear: z.string().trim().min(1, 'Commencement year is required'),
  companyName: z.string().trim().min(1, 'Company name is required'),
  connectionMode: z.string().trim().min(1, 'Connection mode is required'),
  contactName: z.string().trim().min(1, 'Contact name is required'),
  coverageAreas: z.array(z.string().trim().min(1, 'Coverage area(s) is required')),
  description: z.string().trim().min(1, 'Description is required'),
  email: z.string().trim().min(1, 'Email is required'),
  lga: z.string().trim().min(1, 'LGA is required'),
  logo: z.string().trim(),
  notes: z.string().trim(),
  phone: z
    .string()
    .trim()
    .length(10, {
      error: (issue) => {
        if (!issue.input) {
          return { message: 'Phone number is required' }
        }
        return 'Phone number is invalid'
      },
    }),
  position: z.object({
    lat: z.string().trim().min(1, 'Lat is required'),
    lng: z.string().trim().min(1, 'Lng is required'),
  }),
  productsAndServices: z.array(z.string().trim().min(1, 'Products/Services is required')),
  slug: z.string().trim().min(1, 'Slug is required'),
  state: z.string().trim().min(1, 'State is required'),
  status: z.string().trim().min(1, 'Status is required'),
  website: z.url(),
})

// eslint-disable-next-line no-redeclare
export type ServiceProviderSchema = z.infer<typeof ServiceProviderSchema>
