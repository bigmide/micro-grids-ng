import { createClient } from './supabase/supabase.server'

export async function getMicrogridServiceProviders(request: Request) {
  const { supabase, headers } = await createClient(request)

  const { data, error } = await supabase
    .from('microgrid_service_providers')
    .select('*')

  if (error) {
    console.error(error)
    throw new Error('Microgrid service providers could not be loaded')
  }

  return { data, headers }
}
