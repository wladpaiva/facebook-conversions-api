'use client'

import {usePathname, useSearchParams} from 'next/navigation.js'
import {useEffect} from 'react'
import {useFacebookPixel} from './pixel-provider'

/**
 * Component that tracks page views using Facebook Pixel whenever the pathname
 * or search params change.
 */
export function FacebookPageView(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixel = useFacebookPixel()

  useEffect(() => {
    pixel?.pageview()
  }, [pathname, searchParams, pixel])

  return null
}
