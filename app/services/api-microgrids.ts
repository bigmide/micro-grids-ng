import { createClient } from './supabase/supabase.server'
import * as z from 'zod'
import { PostgrestError } from '@supabase/supabase-js'
import type { Microgrid, MicrogridValidationErrors } from '~/types/microgrids'
import { MicrogridSchema } from '~/lib/validation/microgrid-schema'
import type { Tables } from '~/types/supabase-custom'
import { fetchSupabaseData } from './supabase/fetch-supabase-data'

// export async function getMicrogrids(request: Request): Promise<{
//   ok: boolean
//   data?: Tables<'microgrids'>[] | null
//   error?: string | null
//   headers: Headers
// }> {
//   const { supabase, headers } = await createClient(request)

//   try {
//     const { data, error } = await supabase.from(`microgrids`).select('*')

//     if (error) {
//       throw error
//     }

//     return {
//       ok: true,
//       data,
//       error: null,
//       headers,
//     }
//   } catch (error) {
//     if (error instanceof PostgrestError) {
//       console.error('Error fetching microgrids:', error)
//       return {
//         ok: false,
//         data: null,
//         error: 'Failed to fetch microgrids. Please try again later.',
//         headers,
//       }
//     }

//     console.error('Unexpected error:', error)
//     return {
//       ok: false,
//       data: null,
//       error: 'An unexpected error occurred while fetching microgrids.',
//       headers,
//     }
//   }
// }

export async function getMicrogrids(request: Request) {
  return fetchSupabaseData(request, {
    table: 'microgrids',
  })
}

export async function submitMicrogrid({ formData, request }: { formData: Microgrid; request: Request }): Promise<{
  ok: boolean
  errors?: MicrogridValidationErrors
  headers: Headers
}> {
  const { supabase, headers } = await createClient(request)

  try {
    const validatedData = MicrogridSchema.parse(formData)

    const { error } = await supabase.from('microgrids').insert([validatedData])

    if (error) {
      throw error
    }

    return { ok: true, headers }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error)
      return {
        ok: false,
        errors: {
          validation: z.flattenError(error).fieldErrors,
        },
        headers,
      }
    }

    if (error instanceof PostgrestError) {
      console.error('Supabase insert error:', error)
      return {
        ok: false,
        errors: {
          other: 'An unexpected error occurred while submitting microgrid data.',
        },
        headers,
      }
    }

    console.error('Unexpected error:', error)
    return {
      ok: false,
      errors: {
        other: 'An unexpected error occurred while submitting microgrid data.',
      },
      headers,
    }
  }
}
