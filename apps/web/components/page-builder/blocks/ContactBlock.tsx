import { ContactSection, type ContactCredentialEntry } from '@/components/sections/contact-section'
import { richHeadlineToReact } from '@/sanity/lib/richHeadline'
import type { ContactSectionBlock, SiteSettings } from '@/sanity/types'

export function ContactBlock({
  block,
  settings,
}: {
  block: ContactSectionBlock
  settings?: SiteSettings | null
}) {
  const credEntries: ContactCredentialEntry[] = []
  const credentials = block.credentials
  if (credentials?.creaValue && credentials.creaLabel)
    credEntries.push({ label: credentials.creaLabel, value: credentials.creaValue })
  if (credentials?.rnpValue && credentials.rnpLabel)
    credEntries.push({ label: credentials.rnpLabel, value: credentials.rnpValue })
  if (credentials?.responsibleValue && credentials.responsibleLabel)
    credEntries.push({
      label: credentials.responsibleLabel,
      value: credentials.responsibleValue,
    })

  const whatsappCard = block.whatsappCard
    ? {
        label: block.whatsappCard.label,
        headline: richHeadlineToReact(
          block.whatsappCard.headline,
          'font-serif font-light italic text-white/90',
        ),
        description: block.whatsappCard.description,
        ctaLabel: block.whatsappCard.ctaLabel,
        ctaHref:
          block.whatsappCard.ctaHref || settings?.contacts?.whatsappHref || undefined,
      }
    : undefined

  return (
    <ContactSection
      index={block.index}
      eyebrow={block.eyebrow}
      headline={richHeadlineToReact(block.headline, 'font-serif font-light italic text-foreground/85')}
      subtitle={block.subtitle}
      methods={(block.methods ?? [])
        .filter((m): m is { title: string; detail: string; iconName?: string; href?: string | null } => !!m?.title && !!m?.detail)
        .map((m) => ({
          iconName: m.iconName,
          title: m.title,
          detail: m.detail,
          href: m.href ?? null,
        }))}
      credentialsEntries={credEntries}
      whatsappCard={whatsappCard}
    />
  )
}
