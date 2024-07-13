import {headers} from 'next/headers.js'

/**
 * Retrieves the client IP address from the request headers.
 * If the IP address is not available, it falls back to '0.0.0.0'.
 * @returns The client IP address.
 */
export function getIp(): string {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const forwardedFor = headers().get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
}
