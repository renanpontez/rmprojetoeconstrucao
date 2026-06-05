import { sanityFetch } from '../client'
import {
  PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  NAVIGATION_QUERY,
} from '../queries'
import type { Navigation, PageDoc, SiteSettings } from '../types'

export async function fetchPageData(slug: string) {
  const [page, settings, navigation] = await Promise.all([
    sanityFetch<PageDoc | null>({
      query: PAGE_QUERY,
      params: { slug },
      tags: [`page:${slug}`],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ['settings'],
    }),
    sanityFetch<Navigation | null>({
      query: NAVIGATION_QUERY,
      tags: ['navigation'],
    }),
  ])
  return { page, settings, navigation }
}

export async function fetchGlobalChrome() {
  const [settings, navigation] = await Promise.all([
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ['settings'],
    }),
    sanityFetch<Navigation | null>({
      query: NAVIGATION_QUERY,
      tags: ['navigation'],
    }),
  ])
  return { settings, navigation }
}
