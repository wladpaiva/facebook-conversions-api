export namespace Facebook {
  export namespace Event {
    export interface FacebookData {}

    export interface AddPaymentInfo extends FacebookData {
      content_category?: string
      content_ids?: object[] | object
      contents?: object[]
      currency?: string
      value?: number
    }

    /**
     * content_type required and at least one of content_ids or contents required
     * this version is compatible with dynamic ads
     */
    export interface DynamicAdAddToCart extends FacebookData {
      content_ids?: object[] | object
      content_name?: string
      content_type: string
      contents?: object[]
      currency?: string
      value?: number
    }

    /**
     * this version is not compatible with dynamic ads
     */
    export interface AddToCart extends FacebookData {
      content_ids?: object[] | object
      content_name?: string
      content_type?: string
      contents?: object[]
      currency?: string
      value?: number
    }

    export interface AddToWishlist extends FacebookData {
      content_name?: string
      content_category?: string
      content_ids?: object[] | object
      contents?: object[]
      currency?: string
      value?: number
    }

    export interface CompleteRegistration extends FacebookData {
      content_name?: String
      currency?: string
      status?: string
      value?: number
    }

    export interface InitiateCheckout extends FacebookData {
      content_category?: string
      content_ids?: object[] | object
      contents?: object[]
      currency?: string
      num_items?: number
      value?: number
    }

    export interface Lead extends FacebookData {
      content_category?: string
      content_name?: string
      currency?: string
      value?: number
    }

    /**
     * content_type required and at least one of content_ids or contents required
     * this version is compatible with dynamic ads
     */
    export interface DynamicAdPurchase extends FacebookData {
      content_ids?: object[] | object
      content_name?: string
      content_type: string
      contents?: object[]
      currency: string
      num_items?: number
      value: number
    }

    /**
     * this version is not compatible with dynamic ads
     */
    export interface Purchase extends FacebookData {
      content_ids?: object[] | object
      content_name?: string
      content_type?: string
      contents?: object[]
      currency: string
      num_items?: number
      value: number
    }

    export interface Search extends FacebookData {
      content_category?: string
      content_ids?: object[] | object
      contents?: object[]
      currency?: string
      search_string?: string
      value?: number
    }

    export interface StartTrial extends FacebookData {
      currency?: string
      predicted_ltv?: number
      value: number
    }

    export interface Subscribe extends FacebookData {
      currency?: string
      predicted_ltv?: number
      value: number
    }

    /**
     * content_type required and at least one of content_ids or contents required
     * this version is compatible with dynamic ads
     */
    export interface DynamicAdViewContent extends FacebookData {
      content_ids?: string[] | string
      content_name?: string
      content_type: string
      contents?: object[]
      currency?: string
      value?: number
    }

    /**
     * this version is not compatible with dynamic ads
     */
    export interface ViewContent extends FacebookData {
      content_ids?: string[] | string
      content_name?: string
      content_type?: string
      contents?: object[]
      currency?: string
      value?: number
    }

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
