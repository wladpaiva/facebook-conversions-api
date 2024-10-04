import {errAsync, ResultAsync} from 'neverthrow'
import type {Facebook} from './types'
import {
  CustomData,
  EventRequest,
  ServerEvent,
  Content,
  UserData,
} from 'facebook-nodejs-business-sdk'
import {getRequestData} from './utils'

/**
 * Configuration options for Facebook tracking.
 */
export type FacebookTrackingConfig = {
  /**
   * The Facebook pixel ID.
   *
   * @default process.env.NEXT_PUBLIC_FACEBOOK_PIXEL
   */
  pixelId?: string

  /**
   * The access token for Facebook Conversions API (optional).
   *
   * @default process.env.FACEBOOK_CONVERSIONS_API_TOKEN
   */
  accessToken?: string

  /**
   * The test code for Facebook Conversions API (optional).
   *
   * @default process.env.FACEBOOK_TEST_EVENT_CODE
   */
  testCode?: string

  /**
   * Enable debug mode.
   *
   * @default false
   */
  debug?: boolean
}

/**
 * A class to handle Facebook Conversion API events.
 */
export class FacebookTracking {
  public config: FacebookTrackingConfig

  constructor(config: FacebookTrackingConfig = {}) {
    const {
      pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL,
      accessToken = process.env.FACEBOOK_CONVERSIONS_API_TOKEN,
      testCode = process.env.FACEBOOK_TEST_EVENT_CODE,
      debug,
    } = config

    this.config = {
      pixelId,
      accessToken,
      testCode,
      debug,
    }
  }

  /**
   * Sends a custom event to Facebook Pixel.
   */
  public async track<T extends Facebook.Event.EventName>(
    {
      event_id,
      event_name,
      custom_data,
      event_time,
      event_source_url,
      user_data,
      opt_out,
      action_source,
      data_processing_options,
      data_processing_options_country,
      data_processing_options_state,
      advanced_measurement_table,
      advertiser_tracking_enabled,
    }: Facebook.Event.EventData<T>,
    {
      clean,
    }: {
      /**
       * Set it to `true` if you want to track a clean event without any
       * information from the request
       * @default false
       */
      clean?: boolean
    } = {},
  ) {
    if (!this.config.accessToken || !this.config.pixelId) {
      if (this.config.debug) {
        console.error(
          '[next-facebook-tracking] Missing access token or pixel ID',
        )
      }

      return errAsync('Missing access token or pixel ID')
    }

    const {
      value,
      currency,
      content_name,
      content_category,
      content_ids,
      contents,
      content_type,
      order_id,
      predicted_ltv,
      num_items,
      search_string,
      status,
      item_number,
      delivery_category,
      ...custom_properties
    } = custom_data || {}

    const data = new CustomData(
      value,
      currency,
      content_name,
      content_category,
      content_ids,
      contents?.map(
        (content: {
          id: string | undefined
          quantity: number | undefined
          item_price: number | undefined
          title: string | undefined
          description: string | undefined
          brand: string | undefined
          category: string | undefined
          delivery_category: string | undefined
        }) =>
          new Content(
            content.id,
            content.quantity,
            content.item_price,
            content.title,
            content.description,
            content.brand,
            content.category,
            content.delivery_category,
          ),
      ),
      content_type,
      order_id,
      predicted_ltv,
      num_items,
      search_string,
      status,
      item_number,
      delivery_category,
      custom_properties,
    )

    const requestData = !clean ? getRequestData() : undefined

    const user = new UserData(
      user_data?.email,
      user_data?.phone,
      user_data?.gender,
      user_data?.first_name,
      user_data?.last_name,
      user_data?.date_of_birth,
      user_data?.city ?? requestData?.user_data.city,
      user_data?.state ?? requestData?.user_data.state,
      user_data?.zip,
      user_data?.country ?? requestData?.user_data.country,
      user_data?.external_id,
      user_data?.client_ip_address ?? requestData?.user_data.client_ip_address,
      user_data?.client_user_agent ?? requestData?.user_data.client_user_agent,
      user_data?.fbp ?? requestData?.user_data.fbp,
      user_data?.fbc ?? requestData?.user_data.fbc,
      user_data?.subscription_id,
      user_data?.fb_login_id,
      user_data?.lead_id,
      user_data?.dobd,
      user_data?.dobm,
      user_data?.doby,
      user_data?.madid,
      user_data?.anon_id,
      user_data?.app_user_id,
    )

    const event = new ServerEvent(
      event_name,
      event_time ?? Math.floor(new Date().getTime() / 1000), // Convert to seconds
      event_source_url ?? requestData?.event_source_url,
      user,
      data,
      undefined, // app_data, NOT SURE IF IT'S NEEDED
      event_id,
      opt_out,
      action_source ?? 'website',
      data_processing_options,
      data_processing_options_country,
      data_processing_options_state,
      advanced_measurement_table,
      advertiser_tracking_enabled,
    )

    const event_request = new EventRequest(
      this.config.accessToken,
      this.config.pixelId,
    ).setEvents([event])

    if (this.config.testCode) {
      event_request.setTestEventCode(this.config.testCode)
    }

    event_request.setDebugMode(this.config.debug ?? false)
    return ResultAsync.fromPromise(event_request.execute(), (e: unknown) => {
      if (this.config.debug) {
        console.error(
          '[next-facebook-tracking] Error tracking event',
          (e as {response: unknown}).response,
        )
      }

      return e
    })
  }
}
