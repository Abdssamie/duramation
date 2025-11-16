import winston from 'winston'
import path from 'path'

// Only log to files in development
const isDev = process.env.NODE_ENV === 'development'

// Reduce log verbosity
const logLevel = process.env.LOG_LEVEL || (isDev ? 'info' : 'warn')

// Create transports array
const transports: winston.transport[] = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }),
]

// Only add file transports in development
if (isDev) {
    transports.push(
        new winston.transports.File({
            filename: path.join(process.cwd(), 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 2,
        }),
        new winston.transports.File({
            filename: path.join(process.cwd(), 'combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 2,
        })
    )
}

export const loggerConfig = {
    level: logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports,
}

// Helper to create logger with custom metadata
export function createLogger(meta?: Record<string, unknown>) {
    return winston.createLogger({
        ...loggerConfig,
        defaultMeta: { ...loggerConfig.defaultMeta, ...meta },
    })
}
