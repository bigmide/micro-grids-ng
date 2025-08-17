/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

// lib/logger.ts
import type { Level, LogDescriptor, Logger as PinoLogger } from 'pino'
import type { ZodError } from 'zod'

// -------------------- Type Definitions --------------------
type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
type Loggable = Record<string, unknown> | Error | ZodError | unknown
type Environment = 'development' | 'production' | 'test'

interface Logger {
  fatal(message: string, obj?: Loggable): void
  error(message: string, obj?: Loggable): void
  warn(message: string, obj?: Loggable): void
  info(message: string, obj?: Loggable): void
  debug(message: string, obj?: Loggable): void
  trace(message: string, obj?: Loggable): void
}

interface LogContext {
  level: LogLevel
  message: string
  timestamp: string
  [key: string]: unknown
}

// -------------------- Environment Detection --------------------
const getEnvironment = (): Environment => {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV) {
    return process.env.NODE_ENV as Environment
  }
  if (typeof globalThis !== 'undefined' && (globalThis as any).ENV) {
    return (globalThis as any).ENV as Environment
  }
  return 'development'
}

const isNodeRuntime = (): boolean => typeof process !== 'undefined' && process.versions?.node !== undefined

// -------------------- Constants --------------------
const ENV = getEnvironment()
const IS_PRODUCTION = ENV === 'production'
const IS_DEVELOPMENT = !IS_PRODUCTION
const IS_NODE = isNodeRuntime()
const DEFAULT_LOG_LEVEL: LogLevel = IS_PRODUCTION ? 'info' : 'debug'

// -------------------- Utility Functions --------------------
const getLogLevel = (): LogLevel => {
  const level = (globalThis as any).LOG_LEVEL || (process.env?.LOG_LEVEL as LogLevel) || DEFAULT_LOG_LEVEL

  const validLevels: LogLevel[] = ['fatal', 'error', 'warn', 'info', 'debug', 'trace']
  return validLevels.includes(level) ? level : DEFAULT_LOG_LEVEL
}

const redactSensitiveData = <T extends Record<string, unknown>>(obj: T): T => {
  const sensitiveKeys = [
    'password',
    'token',
    'access_token',
    'refresh_token',
    'authorization',
    'cookie',
    'apiKey',
    'secret',
  ]

  const redacted = { ...obj }

  for (const key of sensitiveKeys) {
    if (key in redacted) {
      ;(redacted as any)[key] = '**REDACTED**'
    }
    if (redacted.headers && typeof redacted.headers === 'object') {
      const headers = redacted.headers as Record<string, unknown>
      if (key in headers) {
        headers[key] = '**REDACTED**'
      }
    }
  }

  return redacted
}

const formatZodErrors = (error: ZodError): string => {
  return error.issues.map((e) => `• ${e.path.join('.')}: ${e.message}`).join('\n')
}

const isZodError = (error: unknown): error is ZodError => {
  return error instanceof Error && error.constructor.name === 'ZodError'
}

// -------------------- Node.js Logger (Pino-based) --------------------
const createNodeLogger = (): Logger => {
  let pino: typeof import('pino')

  try {
    pino = require('pino')
  } catch (error) {
    throw new Error('Pino not found. Install with: npm install pino')
  }

  const baseLogger = pino({
    level: getLogLevel(),
    base: null, // Remove pid/hostname
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    formatters: {
      level: (label: string) => ({ level: label }),
    },
    redact: {
      paths: ['password', 'token', '*.password', '*.token'],
      censor: '**REDACTED**',
    },
    transport: IS_DEVELOPMENT
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:HH:MM:ss',
            ignore: 'pid,hostname',
            customPrettifiers: {
              error: (err: Error) => `\n${err.stack || err.message}`,
            },
            messageFormat: (log: LogDescriptor) => {
              const context = Object.entries(log)
                .filter(([key]) => !['level', 'time', 'msg'].includes(key))
                .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
                .join(' ')

              return `${log.msg} ${context}`
            },
          },
        }
      : undefined,
  }) as PinoLogger

  const logWithContext = (level: Level, message: string, context?: Loggable) => {
    const loggableContext: Record<string, unknown> = {}

    if (context) {
      if (context instanceof Error) {
        loggableContext.error = {
          name: context.name,
          message: context.message,
          stack: context.stack,
        }
      } else if (isZodError(context)) {
        loggableContext.error = formatZodErrors(context)
      } else if (typeof context === 'object') {
        Object.assign(loggableContext, redactSensitiveData(context as Record<string, unknown>))
      } else {
        loggableContext.value = context
      }
    }

    baseLogger[level](loggableContext, message)
  }

  return {
    fatal: (message, obj) => logWithContext('fatal', message, obj),
    error: (message, obj) => logWithContext('error', message, obj),
    warn: (message, obj) => logWithContext('warn', message, obj),
    info: (message, obj) => logWithContext('info', message, obj),
    debug: (message, obj) => logWithContext('debug', message, obj),
    trace: (message, obj) => logWithContext('trace', message, obj),
  }
}

// -------------------- Universal Logger (For non-Node environments) --------------------
const createUniversalLogger = (): Logger => {
  const level: LogLevel = getLogLevel()
  const levelWeights: Record<LogLevel, number> = {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10,
  }

  const currentWeight = levelWeights[level]
  const shouldLog = (logLevel: LogLevel) => levelWeights[logLevel] >= currentWeight

  const colorMap: Record<LogLevel, string> = {
    fatal: '\x1b[41m\x1b[37m', // White on red bg
    error: '\x1b[31m', // Red
    warn: '\x1b[33m', // Yellow
    info: '\x1b[34m', // Blue
    debug: '\x1b[32m', // Green
    trace: '\x1b[90m', // Gray
  }

  const resetColor = '\x1b[0m'

  const formatLog = (level: LogLevel, message: string, obj?: Loggable): string => {
    const timestamp = new Date().toISOString()
    const logContext: LogContext = { level, message, timestamp }

    // Process loggable object
    if (obj) {
      if (obj instanceof Error) {
        logContext.error = {
          name: obj.name,
          message: obj.message,
          stack: obj.stack,
        }
      } else if (isZodError(obj)) {
        logContext.error = formatZodErrors(obj)
      } else if (typeof obj === 'object') {
        Object.assign(logContext, redactSensitiveData(obj as Record<string, unknown>))
      } else {
        logContext.value = obj
      }
    }

    // Production: Structured JSON
    if (IS_PRODUCTION) {
      return JSON.stringify(logContext)
    }

    // Development: Human-readable format
    const levelColor = colorMap[level]
    let output = `${levelColor}[${timestamp}] ${level.toUpperCase()}: ${message}${resetColor}`

    if (obj) {
      const context = Object.entries(logContext)
        .filter(([key]) => !['level', 'message', 'timestamp'].includes(key))
        .map(([key, value]) => {
          if (key === 'error' && typeof value === 'string') {
            return `${levelColor}${value}${resetColor}`
          }
          return `${levelColor}${key}=${JSON.stringify(value, null, 2)}${resetColor}`
        })
        .join('\n')

      if (context) output += `\n${context}`
    }

    return output
  }

  const logToConsole = (level: LogLevel, message: string, obj?: Loggable) => {
    if (!shouldLog(level)) return

    const logOutput = formatLog(level, message, obj)

    switch (level) {
      case 'fatal':
      case 'error':
        console.error(logOutput)
        break
      case 'warn':
        console.warn(logOutput)
        break
      case 'info':
        console.info(logOutput)
        break
      case 'debug':
      case 'trace':
        console.debug(logOutput)
        break
    }
  }

  return {
    fatal: (message, obj) => logToConsole('fatal', message, obj),
    error: (message, obj) => logToConsole('error', message, obj),
    warn: (message, obj) => logToConsole('warn', message, obj),
    info: (message, obj) => logToConsole('info', message, obj),
    debug: (message, obj) => logToConsole('debug', message, obj),
    trace: (message, obj) => logToConsole('trace', message, obj),
  }
}

// -------------------- Error Logger --------------------
export const logError = (error: unknown, context?: Record<string, unknown>): void => {
  const logContext = context ? redactSensitiveData(context) : {}

  if (error instanceof Error) {
    logger.error(error.message, {
      ...logContext,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    })
  } else if (isZodError(error)) {
    logger.error('Validation error', {
      ...logContext,
      error: formatZodErrors(error),
    })
  } else {
    logger.error('Non-Error exception', {
      ...logContext,
      rawError: error,
    })
  }
}

// -------------------- Logger Initialization --------------------
let logger: Logger

if (IS_NODE) {
  try {
    logger = createNodeLogger()
  } catch (error) {
    logger = createUniversalLogger()
    logger.warn('Failed to initialize pino, using universal logger', error)
  }
} else {
  logger = createUniversalLogger()
}

// -------------------- Export --------------------
export { logger }
export default logger
