import Link from 'next/link'
import {FacebookTrackOnRender} from 'next-facebook-tracking/components'

export default function NamePage() {
  return (
    <div>
      <h1>Hello Page 2</h1>

      <p className="py-10">Should track on render</p>
      <FacebookTrackOnRender
        event={{
          event_name: 'InitiateCheckout',
          custom_data: {
            value: 30.1,
            currency: 'USD',
            num_items: 3,
          },
        }}
      />

      <Link href="/">Go to Page 1</Link>
    </div>
  )
}
