import { HeroSection } from '@/components/sections/hero-section'
import { safeImageUrl } from '@/sanity/lib/image'
import { richHeadlineToHero } from '@/sanity/lib/richHeadline'
import type {
  HeroSectionBlock,
  SiteSettings,
} from '@/sanity/types'

export function HeroBlock({
  block,
  settings,
}: {
  block: HeroSectionBlock
  settings?: SiteSettings | null
}) {
  const credentials = block.credentialsCard
    ? {
        brandLabel: block.credentialsCard.brandLabel,
        stats: (block.credentialsCard.stats ?? [])
          .filter((s): s is { value: string; label: string } => !!s?.value && !!s?.label)
          .map((s) => ({ value: s.value, label: s.label })),
        creaLabel: block.credentialsCard.creaLabel,
        creaValue:
          settings?.legal?.creaNumber && settings.legal.creaUF
            ? `${settings.legal.creaNumber}`
            : settings?.legal?.creaNumber,
        rnpLabel: block.credentialsCard.rnpLabel,
        rnpValue: settings?.legal?.rnp,
        serviceAreaLabel: block.credentialsCard.serviceAreaLabel,
        serviceAreaValue: [settings?.location?.city, settings?.location?.region]
          .filter(Boolean)
          .join(' & ') || undefined,
      }
    : undefined

  const primaryCta = block.primaryCta
  const primaryHref =
    primaryCta?.kind === 'whatsapp' && !primaryCta.href
      ? settings?.contacts?.whatsappHref
      : primaryCta?.href

  return (
    <HeroSection
      eyebrow={block.eyebrow}
      headline={richHeadlineToHero(block.headline)}
      subhead={block.subhead}
      backgroundImage={safeImageUrl(block.backgroundImage, 2000)}
      backgroundImageAlt={settings?.siteName}
      primaryCtaLabel={primaryCta?.label}
      primaryCtaHref={primaryHref}
      secondaryLinkText={block.secondaryLinkText}
      secondaryLinkHref={block.secondaryLinkHref}
      locationLabel={block.locationLabel}
      scrollLabel={block.scrollLabel}
      credentials={credentials}
    />
  )
}
