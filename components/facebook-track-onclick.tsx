'use client'

import {Slot} from '@radix-ui/react-slot'
import {uuidv7} from 'uuidv7'

import type {Facebook} from '../types'
import {useFacebookPixel} from './pixel-provider'

/**
 * Component to track onClick events using Facebook Pixel.
 *
 * @example
 * // Usage example
 * <FacebookTrackOnClick event={{
 *   event_name: "InitiateCheckout",
 *   custom_data: { content_name: "Test Product" },
 * }} action={facebook.track}>
 *   <button>Click me</button>
 * </FacebookTrackOnClick>
 */
export function FacebookTrackOnClick<
  T extends Facebook.Event.EventName,
  TData extends Facebook.Event.CustomData<T>,
>({
  children,
  event,
  action,
  ...rest
}: {
  /**
   * The event to track that will be sent to Facebook when the component is clicked.
   */
  event: {
    /**
     * The name of the event to track.
     */
    event_name: T
    /**
     * Additional custom data for the event.
     */
    custom_data?: TData
  }
  /**
   * The clickable content to render inside the component.
   */
  children: React.ReactNode
  /**
   * A server-side function to perform the tracking
   */
  action?: (props: {
    /**
     * The name of the event to track.
     */
    event_name: T
    /**
     * The data provided for the event.
     */
    custom_data?: TData
    /**
     * The ID of the event.
     */
    event_id: string
  }) => Promise<void>
}) {
  const pixel = useFacebookPixel()
  const event_id = uuidv7()

  return (
    <Slot
      {...rest}
      onClick={async () => {
        const e = {
          ...event,
          event_id,
        }

        pixel?.track(e)
        await action?.(e)
      }}
    >
      {children}
    </Slot>
  )
}
