import { PortfolioSection, type PortfolioItem } from '@/components/sections/portfolio-section'
import { safeImageUrl } from '@/sanity/lib/image'
import { richHeadlineToReact } from '@/sanity/lib/richHeadline'
import type { PortfolioSectionBlock } from '@/sanity/types'

export function PortfolioBlock({ block }: { block: PortfolioSectionBlock }) {
  const items: PortfolioItem[] = (block.items ?? [])
    .filter((p) => !!p?.title)
    .map((p) => ({
      title: p.title ?? '',
      type: p.category?.name ?? '',
      location: p.location ?? '',
      year: p.year ?? new Date().getFullYear(),
      image: safeImageUrl(p.image, 1200),
      imageAlt: p.title,
      highlights: p.highlights ?? [],
    }))

  return (
    <PortfolioSection
      index={block.index}
      eyebrow={block.eyebrow}
      headline={richHeadlineToReact(block.headline, 'font-serif font-light italic text-foreground/85')}
      subtitle={block.subtitle}
      items={items}
    />
  )
}
