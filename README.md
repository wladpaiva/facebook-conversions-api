# next-facebook-tracking

`next-facebook-tracking` is a simple and efficient library for integrating
Facebook Pixel and Conversions API tracking into your Next.js application. It
provides easy-to-use components and hooks to handle various Facebook Pixel
events.

## Installation

Install the package via npm or yarn:

```bash
npx jsr add @wladpaiva/next-facebook-tracking
```

or

```bash
bunx jsr add @wladpaiva/next-facebook-tracking
```

## Usage

### Setup

First, create a Facebook tracking instance:

```ts
// facebook.ts
import {FacebookTracking} from '@wladpaiva/next-facebook-tracking'

export const facebook = new FacebookTracking({
  // pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL,
  // accessToken: process.env.FACEBOOK_CONVERSIONS_API_TOKEN,
  debug: true,
})
```

### Add the Provider to Your Layout

Wrap your application's layout with the `FacebookTrackingProvider` in
`layout.tsx`:

```tsx
// layout.tsx
import {
  FacebookTrackingProvider,
  FacebookPageView,
} from '@wladpaiva/next-facebook-tracking'
import {facebook} from './facebook'

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <FacebookTrackingProvider client={facebook}>
          {children}
          <FacebookPageView />
        </FacebookTrackingProvider>
      </body>
    </html>
  )
}
```

### Track Events on Page Load and Interactions

Use the `facebook` instance to track events on page load and interactions in
`page.tsx`:

```tsx
// page.tsx
import {facebook} from './facebook'
import {
  FacebookTrackOnClick,
  FacebookTrackOnRender,
} from '@wladpaiva/next-facebook-tracking'

export default async function Home() {
  // This will run on the server
  await facebook.track({
    event_name: 'PageView',
  })

  return (
    <>
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
    </>
  )
}
```

## FacebookTracking Class

### Configuration

The `FacebookTracking` class is used to manage Facebook Pixel and Conversions
API tracking.

#### Constructor

```typescript
new FacebookTracking(config: FacebookTrackingConfig)
```

**FacebookTrackingConfig Options:**

- `pixelId` (string): The Facebook pixel ID. Defaults to
  `NEXT_PUBLIC_FACEBOOK_PIXEL` env var.
- `accessToken` (string): The access token for Facebook Conversions API
  (optional). Defaults to `FACEBOOK_CONVERSIONS_API_TOKEN` env var.
- `testCode` (string): The test code for Facebook Conversions API (optional).
  Defaults to `FACEBOOK_TEST_EVENT_CODE` env var.
- `debug` (boolean): Enable or disable debug mode. Defaults to `false`.

### Methods

#### `track`

Tracks custom events.

```typescript
async track<T extends Facebook.Event.EventName>(event: Facebook.Event.EventData<T>)
```

### Custom Hook

#### `useFacebookPixel`

Provides access to the FacebookPixel context.

```typescript
const context = useFacebookPixel()
```

## Components

### `FacebookTrackingProvider`

A context provider for the Facebook tracking instance.

**Props:**

- `client` (FacebookTracking): The Facebook tracking instance.

### `FacebookPageView`

Tracks page views.

### `FacebookTrackOnClick`

Tracks events when a component is clicked.

**Props:**

- `action` (function): The function to execute on click.
- `event` (object): The event details to track.

### `FacebookTrackOnRender`

Tracks events when a component is rendered.

**Props:**

- `event` (object): The event details to track.

## License

MIT License

---

Feel free to customize this README file further to match any additional features
or details specific to your package.
