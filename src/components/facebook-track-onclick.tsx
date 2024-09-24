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
  TD extends Facebook.BrowserEvent<T>,
>({
  children,
  event,
  action,
  ...rest
}: {
  /**
   * The event to track that will be sent to Facebook when the component is clicked.
   */
  event: TD
  /**
   * The clickable content to render inside the component.
   */
  children: React.ReactNode
  /**
   * A server-side action that will be called after the click handler is called.
   */
  action?: (
    props: Omit<TD, 'event_id'> & {
      event_id: string
    },
  ) => Promise<void>
}): JSX.Element {
  const pixel = useFacebookPixel()
  const {event_id = uuidv7(), ...restEvent} = event
  const e = {
    ...restEvent,
    event_id,
  }

  return (
    <Slot
      {...rest}
      onClick={async () => {
        pixel?.track(e)
        await action?.(e)
      }}
    >
      {children}
    </Slot>
  )
}
