import { AboutSection } from '@/components/sections/about-section'
import { safeImageUrl } from '@/sanity/lib/image'
import type { AboutSectionBlock } from '@/sanity/types'

export function AboutBlock({ block }: { block: AboutSectionBlock }) {
  const captions = block.captions ?? []
  const bottomLeft = captions.find((c) => c.position === 'bottomLeft')
  const bottomRight = captions.find((c) => c.position === 'bottomRight')

  return (
    <AboutSection
      index={block.index}
      eyebrow={block.eyebrow}
      statement={block.statement}
      secondaryLinkText={block.secondaryLinkText}
      secondaryLinkHref={block.secondaryLinkHref}
      definitions={(block.definitions ?? [])
        .filter((d): d is { term: string; definition: string } => !!d?.term && !!d?.definition)
        .map((d) => ({ term: d.term, definition: d.definition }))}
      stats={(block.stats ?? [])
        .filter((s): s is { value: string; label: string } => !!s?.value && !!s?.label)
        .map((s) => ({ value: s.value, label: s.label }))}
      image={safeImageUrl(block.image, 1600)}
      bottomLeftCaption={
        bottomLeft?.text ? { text: bottomLeft.text, italic: !!bottomLeft.italic } : undefined
      }
      bottomRightCaption={
        bottomRight?.text ? { text: bottomRight.text, italic: !!bottomRight.italic } : undefined
      }
    />
  )
}
