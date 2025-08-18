/* global  Buffer*/

import { logger, logError } from '~/lib/logger'
import type { Database } from '~/types/supabase-custom'
import * as z from 'zod'
import { createClient } from './supabase.server'
import type { MicrogridSchema } from '~/lib/validation/microgrid-schema'
import type { ServiceProviderSchema } from '~/lib/validation/service-provider-schema'
import type { Microgrid, MicrogridValidationErrors } from '~/types/microgrids'
import type { ServiceProvider, ServiceProviderValidationErrors } from '~/types/service-providers'
import { PostgrestError } from '@supabase/supabase-js'

type Data = Microgrid | ServiceProvider

type FileUpload = {
  file: Blob | File
  field: string
  bucket: string
  path?: string
  fileName?: string
}

type SubmitOptions = {
  table: keyof Database['public']['Tables']
  schema: typeof MicrogridSchema | typeof ServiceProviderSchema
  data: Data
  files?: FileUpload[]
  operation?: 'insert' | 'update' | 'upsert'
}

type SubmitResponse = {
  ok: boolean
  errors: MicrogridValidationErrors | ServiceProviderValidationErrors | null
  headers: Headers
}

type UniqueFieldError = {
  code: string
  message: string
}

export async function submitSupabaseData(request: Request, options: SubmitOptions): Promise<SubmitResponse> {
  const { supabase, headers } = await createClient(request)
  const endpoint = options.table

  // Add security headers
  headers.set('Content-Security-Policy', "default-src 'self'")
  headers.set('X-Content-Type-Options', 'nosniff')

  try {
    // Data validation
    const validatedData = options.schema.parse(options.data)
    logger.debug('Data validation successful', { endpoint })

    // Database operation
    let dbResult
    const operation = options.operation || 'insert'
    let insertedId: number | null = null

    // Table operation
    const query = supabase.from(endpoint)

    switch (operation) {
      case 'update':
        dbResult = await query.update(validatedData)
        break
      case 'upsert':
        dbResult = await query.upsert(validatedData)
        break
      default:
        dbResult = await query.insert([validatedData])
        if (dbResult.data) insertedId = (dbResult.data as Data).id || null
    }

    if (dbResult.error) throw dbResult.error

    logger.info(`Successfully submitted to ${endpoint}`, {
      operation,
    })

    // File upload handling
    if (options.files && options.files.length > 0) {
      for (const fileUpload of options.files) {
        const filePath = fileUpload.path ? `${fileUpload.path}/` : ''
        const fileName = fileUpload.fileName || `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
        const fullPath = `${filePath}${fileName}`

        // Convert File → Buffer for Supabase
        const arrayBuffer = await fileUpload.file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { error: uploadError } = await supabase.storage
          .from(fileUpload.bucket)
          .upload(fullPath, buffer, { contentType: fileUpload.file.type })

        if (uploadError) {
          logger.error('File upload failed', {
            endpoint,
            bucket: fileUpload.bucket,
            path: fullPath,
            error: uploadError,
          })

          await query.delete().eq('id', insertedId)
          logger.info(`Successfully removed inserted row to ${endpoint}`, {
            operation: 'delete',
          })

          throw uploadError
        }
      }
    }

    return {
      ok: true,
      errors: null,
      headers,
    }
  } catch (error) {
    const logContext = {
      endpoint,
      operation: options.operation || 'insert',
    }

    // Handle validation errors
    if (error instanceof z.ZodError) {
      const { fieldErrors } = z.flattenError(error)

      logError(error, { ...logContext, type: 'validation' })

      return {
        ok: false,
        errors: { validation: fieldErrors, other: null },
        headers,
      }
    }

    // Handle database errors
    if (error instanceof PostgrestError) {
      logError(error, {
        ...logContext,
        type: 'database',
        code: error.code,
      })

      return {
        ok: false,
        errors: { validation: null, other: `Database error: ${error.message}` },
        headers,
      }
    }

    // Handle unique field error
    if (
      (error as UniqueFieldError).message.includes('duplicate key value') ||
      (error as UniqueFieldError).code === '23505'
    ) {
      logError(error, {
        ...logContext,
        type: 'database',
        code: (error as UniqueFieldError).code,
      })

      let message = 'An unexpected error occurred'

      if (endpoint === 'microgrids') {
        message = 'A microgrid with provided name already exists'
      }

      if (endpoint === 'service_providers') {
        message = 'A service provider with provided name already exists'
      }

      return {
        ok: false,
        errors: { validation: null, other: message },
        headers,
      }
    }

    // Handle file upload errors
    if (error instanceof Error && error.name === 'StorageApiError') {
      logError(error, { ...logContext, type: 'database' })

      let message = 'An unexpected error occurred'

      if (endpoint === 'microgrids') {
        message = 'Logo upload failed and microgrid not submitted, please try again'
      }

      if (endpoint === 'service_providers') {
        message = 'Logo upload failed and service provider application not submitted, please try again'
      }

      return {
        ok: false,
        errors: { validation: null, other: message },
        headers,
      }
    }

    // Handle all other errors
    logError(error, logContext)
    return {
      ok: false,
      errors: { validation: null, other: 'An unexpected error occurred' },
      headers,
    }
  }
}
