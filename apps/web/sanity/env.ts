/**
 * Soft env guards — warn in dev, never throw in production.
 *
 * Vercel preview deploys often run without Sanity secrets and would crash the
 * build otherwise. The sanityFetch wrapper returns `null` when the client can't
 * be constructed and routes fall back to `notFound()` (playbook §3, gotcha §1).
 */
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === '') {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(errorMessage)
    }
    return '' as unknown as T
  }
  return v
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing env var: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing env var: NEXT_PUBLIC_SANITY_DATASET',
)

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const readToken =
  process.env.SANITY_READ_TOKEN || process.env.SANITY_WRITE_TOKEN || ''

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET || ''
