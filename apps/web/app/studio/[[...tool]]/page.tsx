/**
 * Embedded Sanity Studio at /studio. Mirrors the standalone studio in
 * apps/studio — same schemas, same structure, same plugins. Use whichever you
 * prefer; both write to the same dataset.
 */
import { NextStudio } from 'next-sanity/studio'
import studioConfig from '@/sanity/studio-config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={studioConfig} />
}
