export function logDebug(message: string) {
  if (process.env.DEBUG === 'true') {
    console.log(`[DEBUG] ${message}`)
  }
}
