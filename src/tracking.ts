import type {Facebook} from './types'
import {
  CustomData,
  EventRequest,
  type EventResponse,
  ServerEvent,
  UserData,
} from 'facebook-nodejs-business-sdk'
import {getIp} from './utils'
import {cookies, headers} from 'next/headers.js'

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
  public async track<T extends Facebook.Event.EventName>({
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
  }: Facebook.Event.EventData<T>): Promise<EventResponse | undefined> {
    if (!this.config.accessToken || !this.config.pixelId) {
      return
    }

    const data = new CustomData(
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.value,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.currency,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.content_name,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.content_category,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.content_ids,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.contents,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.content_type,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.order_id,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.predicted_ltv,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.num_items,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.search_string,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.status,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.item_number,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.delivery_category,
      // @ts-ignore - doesn't really matter if it's undefined from here
      custom_data?.custom_properties,
    )

    const requestData = this.getRequestData()

    const user = new UserData(
      user_data?.email,
      user_data?.phone,
      user_data?.gender,
      user_data?.first_name,
      user_data?.last_name,
      user_data?.date_of_birth,
      user_data?.city,
      user_data?.state,
      user_data?.zip,
      user_data?.country,
      user_data?.external_id,
      user_data?.client_ip_address ?? requestData.user_data.client_ip_address,
      user_data?.client_user_agent ?? requestData.user_data.client_user_agent,
      user_data?.fbp ?? requestData.user_data.fbp,
      user_data?.fbc ?? requestData.user_data.fbc,
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
      event_source_url ?? requestData.event_source_url,
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
    return await event_request.execute()
  }

  /**
   * Retrieves request-related data including user cookies and headers.
   *
   * @returns An object containing user data and event source URL.
   * @property {Object} user_data - Contains user-specific information.
   * @property {string} user_data.fbp - Facebook pixel cookie value.
   * @property {string} user_data.fbc - Facebook click cookie value.
   * @property {string} user_data.client_ip_address - Client's IP address.
   * @property {string} user_data.client_user_agent - Client's user agent string.
   * @property {string} event_source_url - The referring URL.
   */
  public getRequestData(): Facebook.Event.RequestData {
    const cookieStore = cookies()
    const headersList = headers()

    return {
      user_data: {
        fbp: cookieStore.get('_fbp')?.value,
        fbc: cookieStore.get('_fbc')?.value,
        client_ip_address: getIp(),
        client_user_agent: headersList.get('user-agent') ?? undefined,
      },
      event_source_url: headersList.get('referer') ?? undefined,
    }
  }
}
