import { logDebug } from './logger'

export function handleError(error: unknown): void {
  if (error instanceof Error) {
    console.error('An error occurred:', error.message)
    logDebug(`Error occurred: ${error}`)
  } else {
    console.error('An unknown error occurred')
    logDebug('An unknown error occurred')
  }
} 