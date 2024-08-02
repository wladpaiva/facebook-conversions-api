import Link from 'next/link'
import {facebook} from './facebook'
import {SomeClientComponent} from './some-client-component'
import {FacebookTrackOnClick} from 'next-facebook-tracking/components'

export default async function Home() {
  await facebook.track({
    event_name: 'PageView',
  })

  return (
    <div>
      <SomeClientComponent />

      <FacebookTrackOnClick
        action={async event => {
          'use server'
          facebook.track(event)
        }}
        event={{
          event_name: 'AddToCart',
          custom_data: {
            value: 10.1,
            currency: 'USD',
            num_items: 1,
          },
        }}
      >
        <button>Track something</button>
      </FacebookTrackOnClick>

      <Link href="/page-2">Go to Page 2</Link>
    </div>
  )
}
