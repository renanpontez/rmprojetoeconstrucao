import { ServicesSection, type ServiceItem } from '@/components/sections/services-section'
import { safeImageUrl } from '@/sanity/lib/image'
import { richHeadlineToReact } from '@/sanity/lib/richHeadline'
import type { ServicesSectionBlock } from '@/sanity/types'

export function ServicesBlock({ block }: { block: ServicesSectionBlock }) {
  const items: ServiceItem[] = (block.items ?? [])
    .filter((s) => !!s?.title)
    .map((s, i) => ({
      number: String(i + 1).padStart(2, '0'),
      title: s.title ?? '',
      description: s.description ?? '',
      iconName: s.iconName,
      image: safeImageUrl(s.image, 1200),
      imageAlt: s.title,
    }))

  return (
    <ServicesSection
      index={block.index}
      eyebrow={block.eyebrow}
      headline={richHeadlineToReact(block.headline, 'font-serif font-light italic text-foreground/85')}
      description={block.description}
      items={items}
    />
  )
}
