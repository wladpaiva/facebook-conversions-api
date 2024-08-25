export {parseFullName} from 'parse-full-name'
import {cookies, headers} from 'next/headers.js'
import type {Facebook} from './types'

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

function getCity(): string | undefined {
  const headersList = headers()

  return (
    headersList.get('x-vercel-ip-city') ??
    headersList.get('cf-ipcity') ??
    headersList.get('x-city') ??
    undefined
  )
}

function getRegion(): string | undefined {
  const headersList = headers()

  return (
    headersList.get('x-vercel-ip-country-region') ??
    headersList.get('cf-region') ??
    headersList.get('x-region') ??
    undefined
  )
}

function getCountry(): string | undefined {
  const headersList = headers()

  return (
    headersList.get('x-vercel-ip-country') ??
    headersList.get('cf-ipcountry') ??
    headersList.get('x-country') ??
    undefined
  )
}

/**
 * Retrieves request-related data including user cookies and headers.
 *
 * @returns An object containing user data and event source URL.
 * @property {Object} user_data - Contains user-specific information.
 * @property {string} user_data.fbp - Facebook pixel cookie value.
 * @property {string} user_data.fbc - Facebook click cookie value.
 * @property {string} user_data.client_ip_address - Client's IP address.
 * @property {string} user_data.client_user_agent - Client's user agent string.
 * @property {string} event_source_url - The referring URL.
 */

export function getRequestData(): Facebook.Event.RequestData {
  const cookieStore = cookies()
  const headersList = headers()

  return {
    user_data: {
      city: getCity(),
      state: getRegion(),
      country: getCountry(),
      fbp: cookieStore.get('_fbp')?.value,
      fbc: cookieStore.get('_fbc')?.value,
      client_ip_address: getIp(),
      client_user_agent: headersList.get('user-agent') ?? undefined,
    },
    event_source_url: headersList.get('referer') ?? undefined,
  }
}
