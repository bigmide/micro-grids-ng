import type { Tables } from './supabase-custom'

export type Microgrid = Tables<'microgrids'>

export type MicrogridApplication = Tables<'microgrid_submissions'>

export type MicrogridValidationErrors =
  | {
      validation?:
        | {
            category?: string[]
            microgridName?: string[]
            description?: string[]
            type?: string[]
            operator?: string[]
            commissioningDate?: string[]
            contactName?: string[]
            email?: string[]
            notes?: string[]
            state?: string[]
            area?: string[]
            lga?: string[]
            geopoliticalZone?: string[]
            position?: string[]
            source?: string[]
            capacity?: string[]
            size?: string[]
            powerSources?: string[]
          }
        | undefined
      other?: string | undefined
    }
  | undefined
