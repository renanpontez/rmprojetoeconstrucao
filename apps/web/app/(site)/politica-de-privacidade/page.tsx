import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Container } from '@/components/ui/container'
import { sanityFetch } from '@/sanity/client'
import { PRIVACY_POLICY_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/queries'
import { buildMetadata } from '@/sanity/lib/metadata'
import { projectId } from '@/sanity/env'
import type { PrivacyPolicyDoc, SiteSettings } from '@/sanity/types'

export const revalidate = 3600

async function getPrivacyData() {
  const [policy, settings] = await Promise.all([
    sanityFetch<PrivacyPolicyDoc | null>({
      query: PRIVACY_POLICY_QUERY,
      tags: ['privacyPolicy'],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ['settings'],
    }),
  ])
  return { policy, settings }
}

export async function generateMetadata(): Promise<Metadata> {
  const { policy, settings } = await getPrivacyData()
  return buildMetadata({
    pageSeo: policy?.seo,
    pageTitle: policy?.title ?? 'Política de Privacidade',
    settings,
    pathname: '/politica-de-privacidade',
  })
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 text-2xl font-bold mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-xl font-semibold mb-3">{children}</h3>
    ),
    normal: ({ children }) => <p className="mt-3 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-3 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-3 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary hover:underline"
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

export default async function PrivacyPolicyPage() {
  const sanityConfigured = !!projectId
  const { policy } = await getPrivacyData()

  if (sanityConfigured && !policy?.body?.length) {
    throw new Error(
      '[politica-de-privacidade] PRIVACY_POLICY_QUERY returned no body. ' +
        'Run `npm run seed` or publish the document in Studio.',
    )
  }
  if (!policy?.body?.length) notFound()

  const lastUpdatedDate = policy.lastUpdated ? new Date(policy.lastUpdated) : null

  return (
    <main className="py-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-4xl font-bold">{policy.title}</h1>

          <div className="prose prose-slate max-w-none">
            {lastUpdatedDate ? (
              <p className="text-muted-foreground">
                Última atualização: {lastUpdatedDate.toLocaleDateString('pt-BR')}
              </p>
            ) : null}

            <div className="mt-6 text-foreground">
              <PortableText value={policy.body} components={portableTextComponents} />
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:underline"
            >
              ← Voltar para página inicial
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
