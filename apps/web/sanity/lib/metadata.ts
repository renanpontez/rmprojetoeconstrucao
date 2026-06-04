import type { Metadata } from 'next'
import { safeImageUrl } from './image'
import type { Seo, SiteSettings } from '../types'

const FALLBACK_TITLE =
  'Engenheiro Civil em Fortaleza/CE | RM Projeto & Construção'
const FALLBACK_DESCRIPTION =
  'Engenharia, reformas e projetos com mais de 30 anos de experiência. Atendimento técnico responsável em Fortaleza/CE. Fale no WhatsApp.'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')

type BuildMetadataArgs = {
  pageSeo?: Seo
  pageTitle?: string
  settings?: SiteSettings | null
  pathname?: string
}

function ogImageUrl(seoImage?: unknown): string | undefined {
  const url = safeImageUrl(seoImage, 1200)
  return url || undefined
}

export function buildMetadata({
  pageSeo,
  pageTitle,
  settings,
  pathname,
}: BuildMetadataArgs): Metadata {
  const siteName = settings?.siteName ?? 'RM Projeto & Construção'

  const description =
    pageSeo?.description ??
    settings?.defaultSeo?.description ??
    FALLBACK_DESCRIPTION

  const baseTitle =
    pageSeo?.title ??
    pageTitle ??
    settings?.defaultSeo?.title ??
    FALLBACK_TITLE

  const title =
    baseTitle === FALLBACK_TITLE ? FALLBACK_TITLE : `${baseTitle} · ${siteName}`

  const image = ogImageUrl(pageSeo?.image) ?? ogImageUrl(settings?.defaultSeo?.image)

  const canonical =
    pathname && SITE_URL ? `${SITE_URL}${pathname}` : pathname

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName,
      url: canonical,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}
