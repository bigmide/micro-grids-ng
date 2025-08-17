import { logError } from '@/lib/logger'
import type { Database } from '@/types/supabase-custom'
import { createClient } from './supabase.server'
import { PostgrestError } from '@supabase/supabase-js'
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import type { Microgrid } from '@/types/microgrids'
import type { ServiceProvider } from '@/types/service-providers'

// eslint-disable-next-line no-undef, @typescript-eslint/no-explicit-any
type FetchQuery = PostgrestFilterBuilder<any, any, GenericStringError[], 'microgrids' | 'service_providers', unknown>

type Data = Microgrid[] | ServiceProvider[] | null

type FetchOptions = {
  table: keyof Database['public']['Tables']
  select?: string
  queryOptions?: { count: 'exact' | 'planned' | 'estimated'; head: boolean }
  query?: (qb: FetchQuery) => FetchQuery
}

type ApiResponse = {
  ok: boolean
  data?: Data
  error?: string | null
  count: number | null
  headers: Headers
}

export async function fetchSupabaseData(request: Request, options: FetchOptions): Promise<ApiResponse> {
  const { supabase, headers } = await createClient(request)
  const endpoint = options.table

  // Add security headers
  headers.set('Content-Security-Policy', "default-src 'self'")
  headers.set('X-Content-Type-Options', 'nosniff')

  try {
    // Build base query
    let query = supabase.from(options.table).select(options.select || '*', options.queryOptions)

    // Apply custom query modifications
    if (options.query) {
      query = options.query(query)
    }

    // Execute query
    const { data, error, count } = (await query) as {
      data: Data
      error: PostgrestError | null
      count: number | null
    }

    if (error) throw error

    return { ok: true, data: data || [], error: null, count, headers }
  } catch (error: unknown) {
    if (error instanceof PostgrestError) {
      logError(error, {
        endpoint,
        type: 'database',
        code: error.code,
      })

      return {
        ok: false,
        data: null,
        error: `Database error: Failed to fetch ${options.table}`,
        count: null,
        headers,
      }
    }

    logError(error, { endpoint })

    return {
      ok: false,
      data: null,
      error: 'An unexpected error occurred',
      count: null,
      headers,
    }
  }
}
