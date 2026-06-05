import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { revalidateSecret } from '@/sanity/env'

/**
 * Sanity webhook receiver — tag + path invalidation (playbook §12).
 *
 * --- Manual setup (cannot be done by the agent) ---
 * Register a webhook at sanity.io/manage → project → API → Webhooks:
 *   URL:        https://<prod-domain>/api/revalidate
 *   Trigger:    Create, Update, Delete
 *   Filter:     _type in [
 *                 "page","service","portfolioItem","projectCategory",
 *                 "siteSettings","navigation","privacyPolicy"
 *               ]
 *   Projection: {"_type": _type, "slug": slug.current, "operation": delta::operation()}
 *   Secret:     same value as SANITY_REVALIDATE_SECRET on Vercel
 *   HTTP method: POST
 *   API version: 2024-01-01
 *
 * The webhook is authenticated via an `Authorization: Bearer <secret>` header
 * (configured in the "Headers" panel of the webhook). If you prefer Sanity's
 * built-in signature, swap the check below for `parseBody`-style verification.
 */
export async function POST(req: NextRequest) {
  if (!revalidateSecret) {
    return NextResponse.json(
      { ok: false, error: 'SANITY_REVALIDATE_SECRET not configured' },
      { status: 500 },
    )
  }

  const auth = req.headers.get('authorization') ?? ''
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (provided !== revalidateSecret) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body: { _type?: string; slug?: string; operation?: string } = {}
  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid body' }, { status: 400 })
  }

  const tags = new Set<string>()
  const paths = new Set<string>()

  switch (body._type) {
    case 'page': {
      const slug = body.slug ?? ''
      paths.add(slug === 'home' || !slug ? '/' : `/${slug}`)
      break
    }
    case 'siteSettings':
      tags.add('settings')
      paths.add('/')
      paths.add('/politica-de-privacidade')
      break
    case 'navigation':
      tags.add('navigation')
      paths.add('/')
      paths.add('/politica-de-privacidade')
      break
    case 'service':
      tags.add('page:home')
      paths.add('/')
      break
    case 'portfolioItem':
      tags.add('page:home')
      paths.add('/')
      break
    case 'projectCategory':
      tags.add('page:home')
      paths.add('/')
      break
    case 'privacyPolicy':
      tags.add('privacyPolicy')
      paths.add('/politica-de-privacidade')
      break
    default:
      return NextResponse.json(
        { ok: false, error: `unsupported _type: ${body._type ?? '<missing>'}` },
        { status: 400 },
      )
  }

  // Next 16: revalidateTag requires an explicit cacheLife profile.
  tags.forEach((t) => revalidateTag(t, 'max'))
  paths.forEach((p) => revalidatePath(p))

  return NextResponse.json({
    ok: true,
    revalidated: { tags: [...tags], paths: [...paths] },
    received: body,
  })
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: 'POST a Sanity webhook payload to this endpoint.' })
}
