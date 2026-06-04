import { CTASection } from '@/components/sections/cta-section'
import { richHeadlineToReact } from '@/sanity/lib/richHeadline'
import type { CtaFormSectionBlock, SiteSettings } from '@/sanity/types'

export function CtaFormBlock({
  block,
  settings,
}: {
  block: CtaFormSectionBlock
  settings?: SiteSettings | null
}) {
  const whatsappHref =
    block.whatsappHref ||
    settings?.contacts?.whatsappHref ||
    'https://wa.me/5585999880988'

  return (
    <CTASection
      eyebrow={block.eyebrow}
      headline={richHeadlineToReact(block.headline, 'font-serif font-light italic text-white/90')}
      description={block.description}
      inputLabel={block.inputLabel}
      inputPlaceholder={block.inputPlaceholder}
      buttonLabel={block.buttonLabel}
      buttonLoadingLabel={block.buttonLoadingLabel}
      footerNote={block.footerNote}
      whatsappHref={whatsappHref}
      messageTemplate={block.messageTemplate}
    />
  )
}
