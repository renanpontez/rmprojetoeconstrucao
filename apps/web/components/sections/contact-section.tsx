import type { ReactNode } from 'react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { CTAButton } from '@/components/ui/cta-button'
import { resolveIcon } from '@/lib/icon-map'

export type ContactMethodItem = {
  iconName?: string
  title: string
  detail: string
  href?: string | null
}

export type ContactCredentialEntry = {
  label: string
  value: string
}

export type ContactSectionProps = {
  index?: string
  eyebrow?: string
  headline: ReactNode
  subtitle?: string
  methods: ContactMethodItem[]
  credentialsEntries?: ContactCredentialEntry[]
  whatsappCard?: {
    label?: string
    headline: ReactNode
    description?: string
    ctaLabel?: string
    ctaHref?: string
  }
}

export function ContactSection({
  index,
  eyebrow,
  headline,
  subtitle,
  methods,
  credentialsEntries = [],
  whatsappCard,
}: ContactSectionProps) {
  return (
    <section id="contato" className="scroll-mt-16 bg-background py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="left"
          index={index}
          eyebrow={eyebrow}
          title={headline}
          subtitle={subtitle}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {methods.map((method, i) => {
                const Icon = resolveIcon(method.iconName)
                const isLink = !!method.href
                const Wrapper = isLink ? 'a' : 'div'
                const isExternal = method.href?.startsWith('http')
                return (
                  <Wrapper
                    key={`${method.title}-${i}`}
                    {...(isLink
                      ? {
                          href: method.href ?? undefined,
                          target: isExternal ? '_blank' : undefined,
                          rel: isExternal ? 'noopener noreferrer' : undefined,
                        }
                      : {})}
                    className="group block bg-background p-6 transition-colors hover:bg-muted/40 sm:p-8"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                      {method.title}
                    </div>
                    <div className="mt-2 font-sans text-base font-medium text-foreground transition-colors group-hover:text-primary">
                      {method.detail}
                    </div>
                  </Wrapper>
                )
              })}
            </div>

            {credentialsEntries.length > 0 ? (
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-6 text-xs sm:grid-cols-3">
                {credentialsEntries.map((entry, i) => (
                  <div key={`${entry.label}-${i}`}>
                    <dt className="text-muted-foreground">{entry.label}</dt>
                    <dd className="mt-1 font-medium tracking-wide text-foreground">{entry.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {whatsappCard ? (
            <div className="lg:col-span-5">
              <div className="relative h-full overflow-hidden rounded-sm border border-border bg-neutral-950 p-8 text-white sm:p-10">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                  }}
                />
                <span aria-hidden className="absolute right-0 top-0 h-px w-12 bg-primary" />
                <span aria-hidden className="absolute right-0 top-0 h-12 w-px bg-primary" />

                <div className="relative flex h-full flex-col">
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                    {(() => {
                      const Icon = resolveIcon('MessageCircle')
                      return <Icon className="h-6 w-6" />
                    })()}
                  </div>

                  {whatsappCard.label ? (
                    <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/55">
                      {whatsappCard.label}
                    </div>
                  ) : null}
                  <h3 className="font-sans text-2xl font-semibold leading-[1.15] tracking-tight text-white sm:text-3xl">
                    {whatsappCard.headline}
                  </h3>
                  {whatsappCard.description ? (
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      {whatsappCard.description}
                    </p>
                  ) : null}

                  {whatsappCard.ctaLabel && whatsappCard.ctaHref ? (
                    <div className="mt-8">
                      <CTAButton
                        label={whatsappCard.ctaLabel}
                        href={whatsappCard.ctaHref}
                        size="lg"
                        className="w-full sm:w-auto"
                        trackingData={{ section: 'contact', label: whatsappCard.ctaLabel }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
