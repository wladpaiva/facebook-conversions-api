import React from 'react'
import type {FacebookTracking} from '../tracking'
import {FacebookPixelProvider} from './pixel-provider'

/**
 * Provides a wrapper component for Facebook tracking.
 */
export function FacebookTrackingProvider({
  client,
  children,
}: {
  /**
   * The Facebook tracking client.
   */
  client: FacebookTracking
  /**
   * The child components to be wrapped.
   */
  children: React.ReactNode
}): JSX.Element {
  return (
    <FacebookPixelProvider
      pixelId={client.config.pixelId}
      debug={client.config.debug}
    >
      {children}
    </FacebookPixelProvider>
  )
}
