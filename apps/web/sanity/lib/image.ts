import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { dataset, projectId } from '../env'
import type { SanityImage } from '../types'

let _builder: ImageUrlBuilder | null = null

function getBuilder(): ImageUrlBuilder | null {
  if (_builder) return _builder
  if (!projectId || !dataset) return null
  _builder = imageUrlBuilder({ projectId, dataset })
  return _builder
}

export function urlFor(source: SanityImage) {
  const builder = getBuilder()
  if (!builder) {
    return {
      width: () => ({ url: () => '' }),
      url: () => '',
    } as unknown as ReturnType<ImageUrlBuilder['image']>
  }
  return builder.image(source as never).auto('format').fit('max')
}

/**
 * Returns a URL string (or '' on failure) for a Sanity image at the requested
 * width. Safe to call with malformed/missing input — never throws.
 */
export function safeImageUrl(
  image: unknown,
  width = 1600,
): string {
  if (!image || typeof image !== 'object') return ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!(image as any).asset) return ''
  try {
    return urlFor(image as SanityImage).width(width).url()
  } catch {
    return ''
  }
}
