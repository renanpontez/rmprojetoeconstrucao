import { createClient, type SanityClient } from '@sanity/client'
import { apiVersion, dataset, projectId, readToken } from './env'

const isDev = process.env.NODE_ENV !== 'production'
const useCdn = !isDev && !readToken
const perspective = 'published' as const
const revalidateSeconds = isDev ? 0 : 30

let _client: SanityClient | null = null

function getClient(): SanityClient | null {
  if (_client) return _client
  if (!projectId || !dataset) return null
  _client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective,
    token: readToken || undefined,
  })
  return _client
}

type SanityFetchArgs = {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: SanityFetchArgs): Promise<T | null> {
  const client = getClient()
  if (!client) return null

  const fetchOptions = isDev
    ? { cache: 'no-store' as const }
    : { next: { tags, revalidate: revalidateSeconds } }

  try {
    return await client.fetch<T>(query, params, {
      ...fetchOptions,
      perspective,
      token: readToken || undefined,
    })
  } catch (err) {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.warn('[sanityFetch] failed:', err)
    }
    return null
  }
}

export { getClient }
