import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { ScrollHighlightText } from '@/components/ui/scroll-highlight-text'

export type AboutSectionProps = {
  index?: string
  eyebrow?: string
  statement?: string
  secondaryLinkText?: string
  secondaryLinkHref?: string
  definitions?: Array<{ term: string; definition: string }>
  stats?: Array<{ value: string; label: string }>
  image?: string
  imageAlt?: string
  bottomLeftCaption?: { text: string; italic?: boolean }
  bottomRightCaption?: { text: string; italic?: boolean }
}

export function AboutSection({
  index,
  eyebrow,
  statement,
  secondaryLinkText,
  secondaryLinkHref,
  definitions = [],
  stats = [],
  image,
  imageAlt,
  bottomLeftCaption,
  bottomRightCaption,
}: AboutSectionProps) {
  return (
    <section id="sobre" className="scroll-mt-16 bg-background py-24 sm:py-32">
      <Container>
        {(index || eyebrow) && (
          <div className="mb-12 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
            {index ? <span className="font-serif text-sm italic text-foreground">{index}</span> : null}
            {index && eyebrow ? <span className="h-px w-8 bg-primary" /> : null}
            {eyebrow ? <span>{eyebrow}</span> : null}
          </div>
        )}

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            {statement ? (
              <ScrollHighlightText className="font-sans text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[3rem]">
                {statement}
              </ScrollHighlightText>
            ) : null}

            {secondaryLinkText && secondaryLinkHref ? (
              <div className="mt-10">
                <a
                  href={secondaryLinkHref}
                  className="group inline-flex items-center gap-2 border-b border-foreground/20 pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {secondaryLinkText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ) : null}
          </div>

          {definitions.length > 0 ? (
            <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-border/60">
              <dl className="space-y-7 text-sm">
                {definitions.map((d, i) => (
                  <div key={`${d.term}-${i}`}>
                    <dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{d.term}</dt>
                    <dd className="mt-2 font-medium text-foreground">{d.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>

        {(stats.length > 0 || image) && (
          <div className="mt-24 grid items-stretch gap-10 lg:mt-32 lg:grid-cols-12 lg:gap-16">
            {stats.length > 0 ? (
              <div className="flex flex-col justify-between lg:col-span-4">
                <div className="space-y-10">
                  {stats.map((stat, i) => (
                    <div key={`${stat.label}-${i}`} className="border-t border-border pt-6">
                      <div className="font-serif text-5xl font-light leading-none text-foreground sm:text-6xl">
                        {stat.value}
                      </div>
                      <div className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {image ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:col-span-8 lg:aspect-auto">
                <Image
                  src={image}
                  alt={imageAlt ?? ''}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {(bottomLeftCaption || bottomRightCaption) && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white">
                    {bottomLeftCaption ? (
                      <div
                        className={
                          bottomLeftCaption.italic
                            ? 'font-serif text-sm italic text-white/85'
                            : 'text-[10px] font-medium uppercase tracking-[0.32em] text-white/70'
                        }
                      >
                        {bottomLeftCaption.text}
                      </div>
                    ) : (
                      <span />
                    )}
                    {bottomRightCaption ? (
                      <div
                        className={
                          bottomRightCaption.italic
                            ? 'font-serif text-sm italic text-white/85'
                            : 'text-[10px] font-medium uppercase tracking-[0.32em] text-white/70'
                        }
                      >
                        {bottomRightCaption.text}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}
      </Container>
    </section>
  )
}
