import type { Tables } from './supabase-custom'

export type ServiceProvider = Tables<'service_providers'>

export interface ServiceProviderValidationErrors {
  validation: {
    address?: string[]
    businessClassification?: string[]
    category?: string[]
    certification?: string[]
    city?: string[]
    commencementYear?: string[]
    companyName?: string[]
    connectionMode?: string[]
    contactName?: string[]
    coverageAreas?: string[]
    description?: string[]
    email?: string[]
    lga?: string[]
    logo?: string[] | null
    notes?: string[] | null
    phone?: string[]
    position?: string[]
    productsAndServices?: string[]
    slug?: string[]
    state?: string[]
    status?: string[]
    website?: string[]
  } | null
  other: string | null
}
