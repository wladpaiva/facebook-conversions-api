import Link from 'next/link'
import {facebook} from './facebook'
import {SomeClientComponent} from './some-client-component'
import {FacebookTrackOnClick} from 'next-facebook-tracking/components'

export default async function Home() {
  await facebook.track({
    event_name: 'PageView',
  })

  return (
    <div className="container mx-auto p-4">
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
            content_name: 'Lettuce',
            content_category: 'Grocery',
            content_ids: ['1234567890'],
            contents: [{id: '1234567890', quantity: 1}],
            content_type: 'product',
            order_id: '1234567890',
            item_number: '12313213',
          },
        }}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Track &quot;AddToCart&quot;
        </button>
      </FacebookTrackOnClick>

      <Link
        href="/page-2"
        className="text-blue-600 hover:text-blue-800 underline mt-4 inline-block ml-6"
      >
        Go to Page 2
      </Link>
    </div>
  )
}
