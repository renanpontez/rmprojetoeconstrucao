import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PageBuilder } from '@/components/page-builder/PageBuilder'
import { fetchPageData } from '@/sanity/lib/fetchPage'
import { buildMetadata } from '@/sanity/lib/metadata'
import { projectId } from '@/sanity/env'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await fetchPageData('home')
  return buildMetadata({
    pageSeo: page?.seo,
    pageTitle: page?.title,
    settings,
    pathname: '/',
  })
}

export default async function HomePage() {
  const sanityConfigured = !!projectId
  const { page, settings } = await fetchPageData('home')

  // Production with Sanity wired but content missing — fail loud at build time
  // (gotcha §9): better than baking a silent empty page.
  if (sanityConfigured && !page?.sections?.length) {
    throw new Error(
      '[home] PAGE_QUERY for slug "home" returned no page or no sections. ' +
        'Run `npm run seed` to populate, or check Sanity dataset.',
    )
  }
  // Preview/dev without secrets: render a clean 404 rather than crashing.
  if (!page?.sections?.length) notFound()

  return <PageBuilder sections={page.sections} settings={settings} />
}
