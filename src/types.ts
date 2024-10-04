export namespace Facebook {
  /**
   * Props that are going to be passed to facebook's tracking function
   */
  export interface Event<T extends Event.EventName> {
    /**
     * The name of the event.
     */
    event_name: T
    /**
     * The custom data associated with the event.
     */
    custom_data?: Event.CustomData<T>
    /**
     * The ID of the event.
     */
    event_id?: string
    /**
     * @default The current timestamp in seconds.
     */
    event_time?: number
    /**
     * @default The current URL.
     */
    event_source_url?: string
    user_data?: Event.UserData
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

  export type BrowserEvent<T extends Event.EventName> = Omit<
    Event<T>,
    | 'event_time'
    | 'event_source_url'
    | 'user_data'
    | 'opt_out'
    | 'action_source'
    | 'data_processing_options'
    | 'data_processing_options_country'
    | 'data_processing_options_state'
    | 'advanced_measurement_table'
    | 'advertiser_tracking_enabled'
    | 'messaging_channel'
  >

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
       * The content IDs associated with the event, such as product SKUs (e.g. ['ABC123', 'XYZ789']) for items in an AddToCart event.
       * If content_type is a product, then your content IDs must be an array with a single string value.
       * Otherwise, this array can contain any number of string values.
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
       * Should be set to product or product_group:
       * Use product if the keys you send represent products. Sent keys could be content_ids or contents.
       * Use product_group if the keys you send in content_ids represent product groups. Product groups are used to distinguish products that are identical but have variations such as color, material, size or pattern.
       *
       * If no content_type is provided, Meta will match the event to every item that has the same ID, independent of its type.
       */
      content_type?: 'product' | 'product_group'
    }

    interface Content {
      /**
       * Product Id of the Item.
       */
      id?: string
      /**
       * Quantity of the Item.
       */
      quantity?: number
      /**
       * Price per unit of the content/product.
       */
      item_price?: number
      /**
       * Title of the listed Item.
       */
      title?: string
      /**
       * Product description used for the item.
       */
      description?: string
      /**
       * Brand of the item.
       */
      brand?: string
      /**
       * Category of the Item.
       */
      category?: string
      /**
       * Type of delivery for a purchase event. Supported values are:
       * in_store — Customer needs to enter the store to get the purchased product.
       * curbside — Customer picks up their order by driving to a store and waiting inside their vehicle.
       * home_delivery — Purchase is delivered to the customer's home.
       */
      delivery_category?: 'in_store' | 'curbside' | 'home_delivery'
    }

    interface Contents {
      /**
       * An array of JSON objects that contains the quantity and the International Article Number (EAN) when applicable,
       * or other product or content identifier(s). id and quantity are the required fields.
       * e.g. [{'id': 'ABC123', 'quantity': 2}, {'id': 'XYZ789', 'quantity': 2}].
       */
      contents?: Content[]
    }

    interface Currency {
      /**
       * The currency for the value specified, if applicable.
       * Currency must be a valid ISO 4217 three-digit currency code.
       */
      currency?: string
    }

    interface NumItems {
      /**
       * The number of items that a user tries to buy during checkout.
       */
      num_items?: number
    }

    interface PredictedLtv {
      /**
       * The predicted lifetime value of a conversion event.
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

    interface OrderId {
      /**
       * The order ID for this transaction as a string.
       */
      order_id?: string
    }

    interface ItemNumber {
      /**
       * Unique identifier to distinguish events within the same order or transaction.
       */
      item_number?: string
    }

    interface DeliveryCategory {
      /**
       * Type of delivery for a purchase event. Supported values are:
       * in_store — Customer needs to enter the store to get the purchased product.
       * curbside — Customer picks up their order by driving to a store and waiting inside their vehicle.
       * home_delivery — Purchase is delivered to the customer's home.
       */
      delivery_category?: 'in_store' | 'curbside' | 'home_delivery'
    }

    export interface FacebookData extends Record<string, any> {}

    export interface AddPaymentInfo
      extends FacebookData,
        ContentIds,
        Contents,
        Currency,
        Value,
        OrderId {}

    export interface AddToCart
      extends FacebookData,
        ContentIds,
        ContentType,
        ContentName,
        ContentCategory,
        Contents,
        Currency,
        Value,
        ItemNumber {}

    export interface AddToWishlist
      extends FacebookData,
        ContentIds,
        ContentName,
        ContentCategory,
        Contents,
        Currency,
        Value,
        ItemNumber {}

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
        Value,
        OrderId {}

    export interface Lead extends FacebookData, Currency, Value {}

    export interface Purchase
      extends FacebookData,
        ContentIds,
        ContentType,
        Contents,
        Currency,
        Value,
        OrderId,
        DeliveryCategory {
      currency: string
      value: number
    }

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
        Value,
        ItemNumber {}

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
      /**
       * The user's city.
       * @default Retrieved from request headers using `x-vercel-ip-city`, `cf-ipcity`, or `x-city`.
       */
      city?: string
      /**
       * The user's state or province.
       * @default Retrieved from request headers using `x-vercel-ip-country-region`, `cf-region`, or `x-region`.
       */
      state?: string
      /**
       * The user's zip or postal code.
       */
      zip?: string
      /**
       * The user's country.
       * @default Retrieved from request headers using `x-vercel-ip-country`, `cf-ipcountry`, or `x-country`.
       */
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
      | 'fbp'
      | 'fbc'
      | 'client_ip_address'
      | 'client_user_agent'
      | 'city'
      | 'country'
      | 'state'
    >

    export interface RequestData {
      user_data: UserRequestData
      event_source_url?: string
    }

    /**
     * Props that are going to be passed to facebook's tracking function
     * @deprecated - Use Facebook.BrowserEvent instead
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
     * @deprecated - Use Facebook.Event instead
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
