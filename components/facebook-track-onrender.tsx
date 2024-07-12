'use client'

import {useEffect} from 'react'

import type {Facebook} from '../types'
import {useFacebookPixel} from './pixel-provider'

/**
 * A component for tracking events using Facebook Pixel on the client side
 * after the component has rendered.
 *
 * @example
 * ```tsx
 * <FacebookTrackOnRender event={{
 *  event_name: "InitiateCheckout",
 *  custom_data: { content_name: "Test Product" },
 * }} />
 *  ```
 */
export function FacebookTrackOnRender<T extends Facebook.Event.EventName>({
  event,
}: {
  /**
   * The event to track.
   */
  event: {
    event_name: T
    custom_data?: Facebook.Event.CustomData<T>
    event_id?: string
  }
}) {
  const pixel = useFacebookPixel()

  useEffect(() => {
    pixel?.track(event)
  }, [pixel, event])

  return null
}
