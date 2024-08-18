export namespace Facebook {
  export namespace Event {
    interface ContentCategory {
      /**
       * Category of the page/product.
       * Optional.
       */
      content_category?: string
    }

    interface ContentIds {
      /**
       * Product IDs associated with the event, such as SKUs (e.g. ['ABC123', 'XYZ789']).
       */
      content_ids?: string[] | number[]
    }

    interface ContentName {
      /**
       * Name of the page/product.
       * Optional.
       */
      content_name?: string
    }

    interface ContentType {
      /**
       * Either 'product' or 'product_group' based on the content_ids or contents being passed.
       * If the IDs being passed in content_ids or contents parameter are IDs of products, then the value should be 'product'.
       * If product group IDs are being passed, then the value should be 'product_group'.
       * If no content_type is provided, Meta will match the event to every item that has the same ID, independent of its type.
       */
      content_type?: 'product' | 'product_group'
    }

    interface Contents {
      /**
       * An array of JSON objects that contains the quantity and the International Article Number (EAN) when applicable,
       * or other product or content identifier(s). id and quantity are the required fields.
       * e.g. [{'id': 'ABC123', 'quantity': 2}, {'id': 'XYZ789', 'quantity': 2}].
       */
      contents?: Array<{id: string; quantity: number}>
    }

    interface Currency {
      /**
       * The currency for the value specified.
       */
      currency?: string
    }

    interface NumItems {
      /**
       * Used with InitiateCheckout event. The number of items when checkout was initiated.
       */
      num_items?: number
    }

    interface PredictedLtv {
      /**
       * Predicted lifetime value of a subscriber as defined by the advertiser and expressed as an exact value.
       */
      predicted_ltv?: number
    }

    interface SearchString {
      /**
       * Used with the Search event. The string entered by the user for the search.
       */
      search_string?: string
    }

    interface Status {
      /**
       * Used with the CompleteRegistration event, to show the status of the registration.
       * Optional.
       */
      status?: boolean
    }

    interface Value {
      /**
       * The value of a user performing this event to the business.
       */
      value?: number
    }

    export interface FacebookData {}

    export interface AddPaymentInfo
      extends FacebookData,
        ContentIds,
        Contents,
        Currency,
        Value {}

    export interface AddToCart
      extends FacebookData,
        ContentIds,
        ContentType,
        Contents,
        Currency,
        Value {}

    export interface AddToWishlist
      extends FacebookData,
        ContentIds,
        Contents,
        Currency,
        Value {}

    export interface CompleteRegistration
      extends FacebookData,
        Currency,
        Value,
        Status {}

    export interface Contact extends FacebookData {}

    export interface CustomizeProduct extends FacebookData {}

    export interface Donate extends FacebookData {}

    export interface FindLocation extends FacebookData {}

    export interface InitiateCheckout
      extends FacebookData,
        ContentIds,
        Contents,
        Currency,
        NumItems,
        Value {}

    export interface Lead extends FacebookData, Currency, Value {}

    export interface Purchase
      extends FacebookData,
        ContentIds,
        ContentType,
        Contents,
        Currency,
        NumItems,
        Value {}

    export interface Schedule extends FacebookData {}

    export interface Search
      extends FacebookData,
        ContentIds,
        ContentType,
        Contents,
        Currency,
        SearchString,
        Value {}

    export interface StartTrial
      extends FacebookData,
        Currency,
        PredictedLtv,
        Value {}

    export interface PageView
      extends FacebookData,
        ContentIds,
        ContentType,
        Currency,
        Value {}

    export interface SubmitApplication extends FacebookData {}

    export interface Subscribe
      extends FacebookData,
        Currency,
        PredictedLtv,
        Value {}

    export interface ViewContent
      extends FacebookData,
        ContentIds,
        ContentType,
        Contents,
        Currency,
        Value {}

    /**
     * Represents the possible sources of an action.
     */
    export type ActionSource =
      | 'app'
      | 'chat'
      | 'email'
      | 'other'
      | 'phone_call'
      | 'physical_store'
      | 'system_generated'
      | 'website'
      | 'business_messaging'

    /**
     * Represents the possible event names.
     */
    export type EventName =
      | 'AddPaymentInfo'
      | 'AddToCart'
      | 'AddToWishlist'
      | 'CompleteRegistration'
      | 'Contact'
      | 'CustomizeProduct'
      | 'Donate'
      | 'FindLocation'
      | 'InitiateCheckout'
      | 'Lead'
      | 'PageView'
      | 'Purchase'
      | 'Schedule'
      | 'Search'
      | 'StartTrial'
      | 'SubmitApplication'
      | 'Subscribe'
      | 'ViewContent'
      | (string & {})

    /**
     * Represents the event data for a specific event name.
     * @template T - The event name.
     * @param T - The event name.
     * @returns The event data for the specified event name.
     */
    export type CustomData<T extends EventName> = T extends 'AddPaymentInfo'
      ? AddPaymentInfo
      : T extends 'AddToCart'
      ? AddToCart
      : T extends 'AddToWishlist'
      ? AddToWishlist
      : T extends 'CompleteRegistration'
      ? CompleteRegistration
      : T extends 'InitiateCheckout'
      ? InitiateCheckout
      : T extends 'Lead'
      ? Lead
      : T extends 'Purchase'
      ? Purchase
      : T extends 'Search'
      ? Search
      : T extends 'StartTrial'
      ? StartTrial
      : T extends 'Subscribe'
      ? Subscribe
      : T extends 'ViewContent'
      ? ViewContent
      : T extends 'PageView'
      ? PageView
      : T extends 'Contact'
      ? Contact
      : T extends 'CustomizeProduct'
      ? CustomizeProduct
      : T extends 'Donate'
      ? Donate
      : T extends 'FindLocation'
      ? FindLocation
      : T extends 'Schedule'
      ? Schedule
      : T extends 'SubmitApplication'
      ? SubmitApplication
      : FacebookData

    export interface UserData {
      email?: string
      phone?: string
      gender?: string
      first_name?: string
      last_name?: string
      date_of_birth?: string
      city?: string
      state?: string
      zip?: string
      country?: string
      external_id?: string
      /**
       * @default Try to get the IP address from the request headers using the
       * `x-forwarded-for` or the `x-real-ip` header.
       */
      client_ip_address?: string
      /**
       * @default Try to get the user agent from the request headers using the
       * `user-agent` header.
       */
      client_user_agent?: string
      /**
       * @default Try to get the `_fbp` cookie value.
       */
      fbp?: string
      /**
       * @default Try to get the `_fbc` cookie value.
       */
      fbc?: string
      subscription_id?: string
      fb_login_id?: string
      lead_id?: string
      dobd?: string
      dobm?: string
      doby?: string
      madid?: string
      anon_id?: string
      app_user_id?: string
      ctwa_clid?: string
      page_id?: string
    }

    export type UserRequestData = Pick<
      UserData,
      'fbp' | 'fbc' | 'client_ip_address' | 'client_user_agent'
    >

    export interface RequestData {
      user_data: UserRequestData
      event_source_url?: string
    }

    /**
     * Props that are going to be passed to facebook's tracking function
     */
    export interface EventDataBrowser<T extends EventName> {
      /**
       * The name of the event.
       */
      event_name: T

      /**
       * The custom data associated with the event.
       */
      custom_data?: Facebook.Event.CustomData<T>

      /**
       * The ID of the event.
       */
      event_id?: string
    }

    /**
     * Represents the event data for a specific event name.
     */
    export interface EventData<T extends EventName>
      extends EventDataBrowser<T> {
      /**
       * @default The current timestamp in seconds.
       */
      event_time?: number
      /**
       * @default The current URL.
       */
      event_source_url?: string
      user_data?: UserData
      opt_out?: boolean
      /**
       * @default "website"
       */
      action_source?: string
      data_processing_options?: string[]
      data_processing_options_country?: number
      data_processing_options_state?: number
      advanced_measurement_table?: string
      advertiser_tracking_enabled?: boolean
      messaging_channel?: string
    }
  }
}
