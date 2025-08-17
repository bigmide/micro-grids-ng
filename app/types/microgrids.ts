import type { Tables } from './supabase-custom'

export type Microgrid = Tables<'microgrids'>

export interface MicrogridValidationErrors {
  validation: {
    address?: string[]
    area?: string[]
    capacity?: string[]
    category?: string[]
    commissioningYear?: string[]
    contactName?: string[]
    description?: string[]
    email?: string[]
    geopoliticalZone?: string[]
    lga?: string[]
    microgridName?: string[]
    notes?: string[]
    operator?: string[]
    position?: string[]
    powerSources?: string[]
    size?: string[]
    slug?: string[]
    source?: string[]
    state?: string[]
    status?: string[]
    type?: string[]
  } | null
  other: string | null
}
