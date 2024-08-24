'use client'

import {usePathname, useSearchParams} from 'next/navigation.js'
import {useEffect} from 'react'
import {useFacebookPixel} from './pixel-provider'
import type {Facebook} from '../types'
import {uuidv7} from 'uuidv7'
/**
 * Component that tracks page views using Facebook Pixel whenever the pathname
 * or search params change.
 */
export function FacebookPageView({
  event,
  action,
  ...rest
}: {
  /**
   * The event to track that will be sent to Facebook when the component is clicked.
   */
  event?: {
    /**
     * The ID of the event.
     *
     * @default uuidv7()
     */
    event_id?: string
    /**
     * Additional custom data for the event.
     */
    custom_data?: Facebook.Event.PageView
  }
  /**
   * The clickable content to render inside the component.
   */
  /**
   * A server-side action that will be called after the click handler is called.
   */
  action?: (props: {
    /**
     * The ID of the event.
     */
    event_id: string
    /**
     * The name of the event.
     */
    event_name: 'PageView'
    /**
     * Additional custom data for the event.
     */
    custom_data?: Facebook.Event.PageView
  }) => Promise<void>
}): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixel = useFacebookPixel()
  const {event_id = uuidv7(), custom_data} = event ?? {}
  const trackable = {
    event_id,
    event_name: 'PageView' as const,
    custom_data,
  }

  useEffect(() => {
    if (pixel) {
      pixel.track(trackable)
      // Delay the action call by 1 second so pixel have enough time to create
      // the cookies
      const timer = setTimeout(() => {
        action?.(trackable)
      }, 1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [pathname, searchParams, pixel, trackable, action])

  return null
}
