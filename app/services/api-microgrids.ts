import { createClient } from './supabase/supabase.server'
import * as z from 'zod'
import { PostgrestError } from '@supabase/supabase-js'
import type {
  MicrogridApplication,
  MicrogridValidationErrors,
} from '@/types/microgrids'
import { MicrogridSchema } from '@/lib/validation/microgrid-schema'

export async function getMicrogrids(request: Request) {
  const { supabase, headers } = await createClient(request)

  const { data, error } = await supabase.from('microgrids').select('*')

  if (error) {
    console.error(error)
    throw new Error('Microgrid could not be loaded')
  }

  return { data, headers }
}

export async function submitMicrogridApplication({
  formData,
  request,
}: {
  formData: MicrogridApplication
  request: Request
}): Promise<{
  ok: boolean
  errors?: MicrogridValidationErrors
  headers: Headers
}> {
  const { supabase, headers } = await createClient(request)

  try {
    const validatedData = MicrogridSchema.parse(formData)

    const { error } = await supabase
      .from('microgrid_applications')
      .insert([validatedData])

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
          other:
            'An unexpected error occurred while submitting microgrid data.',
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
