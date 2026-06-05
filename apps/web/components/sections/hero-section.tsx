import Image from 'next/image'
import type { ReactNode } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { CTAButton } from '@/components/ui/cta-button'

export type HeroSectionProps = {
  eyebrow?: string
  headline: ReactNode
  subhead?: string
  backgroundImage?: string
  backgroundImageAlt?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryLinkText?: string
  secondaryLinkHref?: string
  locationLabel?: string
  scrollLabel?: string
  credentials?: {
    brandLabel?: string
    stats?: Array<{ value: string; label: string }>
    creaLabel?: string
    creaValue?: string
    rnpLabel?: string
    rnpValue?: string
    serviceAreaLabel?: string
    serviceAreaValue?: string
  }
}

export function HeroSection({
  eyebrow,
  headline,
  subhead,
  backgroundImage,
  backgroundImageAlt,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryLinkText,
  secondaryLinkHref,
  locationLabel,
  scrollLabel,
  credentials,
}: HeroSectionProps) {
  const stats = credentials?.stats ?? []
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-neutral-950 text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt ?? ''}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        ) : null}
        {/* Cinematic gradient — heavier on left for legibility, fades to a clear right edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
        {/* Subtle warm wash so the photo feels architectural, not flat */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(120,140,180,0.12),transparent_60%)]" />
      </div>

      {/* Blueprint grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.07] mix-blend-screen"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Architectural corner marks */}
      <div aria-hidden className="pointer-events-none absolute inset-6 z-[2] hidden md:block">
        <span className="absolute left-0 top-0 h-px w-12 bg-white/40" />
        <span className="absolute left-0 top-0 h-12 w-px bg-white/40" />
        <span className="absolute right-0 top-0 h-px w-12 bg-white/40" />
        <span className="absolute right-0 top-0 h-12 w-px bg-white/40" />
        <span className="absolute bottom-0 left-0 h-px w-12 bg-white/40" />
        <span className="absolute bottom-0 left-0 h-12 w-px bg-white/40" />
        <span className="absolute bottom-0 right-0 h-px w-12 bg-white/40" />
        <span className="absolute bottom-0 right-0 h-12 w-px bg-white/40" />
      </div>

      {/* Rotated location label */}
      {locationLabel ? (
        <div
          aria-hidden
          className="absolute right-8 top-1/2 z-[2] hidden -translate-y-1/2 rotate-90 origin-center text-[10px] font-medium uppercase tracking-[0.4em] text-white/50 lg:block"
        >
          {locationLabel}
        </div>
      ) : null}

      {/* Content */}
      <Container className="relative z-10 pb-24 pt-40 sm:pt-44 lg:pb-28 lg:pt-48">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Headline column */}
          <div className="lg:col-span-7 xl:col-span-7">
            {eyebrow ? (
              <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-white/70">
                <span className="h-px w-10 bg-primary" />
                <span>{eyebrow}</span>
              </div>
            ) : null}

            <h1 className="font-sans text-[2.125rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
              {headline}
            </h1>

            {subhead ? (
              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {subhead}
              </p>
            ) : null}

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              {primaryCtaLabel ? (
                <CTAButton
                  label={primaryCtaLabel}
                  href={primaryCtaHref}
                  size="lg"
                  trackingData={{ section: 'hero', label: primaryCtaLabel }}
                />
              ) : null}
              {secondaryLinkText && secondaryLinkHref ? (
                <a
                  href={secondaryLinkHref}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {secondaryLinkText}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : null}
            </div>
          </div>

          {/* Credential / spec card */}
          {credentials ? (
            <div className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
              <div className="relative max-w-md border border-white/15 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7">
                <span aria-hidden className="absolute -right-px -top-px h-3 w-3 border-r border-t border-primary" />
                <span aria-hidden className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-primary" />

                {credentials.brandLabel ? (
                  <div className="mb-5 flex items-center text-[10px] font-medium uppercase tracking-[0.28em] text-white/50">
                    <span>{credentials.brandLabel}</span>
                  </div>
                ) : null}

                {stats.length > 0 ? (
                  <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5">
                    {stats.map((s, i) => (
                      <div key={`${s.label}-${i}`} className="px-3 first:pl-0 last:pr-0">
                        <div className="font-serif text-3xl font-light text-white sm:text-4xl">
                          {s.value}
                        </div>
                        <div className="mt-1 text-[11px] uppercase tracking-wider text-white/55">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <dl className="mt-5 space-y-2.5 text-xs">
                  {credentials.creaValue ? (
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-white/50">{credentials.creaLabel ?? 'CREA'}</dt>
                      <dd className="font-medium tracking-wider text-white">{credentials.creaValue}</dd>
                    </div>
                  ) : null}
                  {credentials.rnpValue ? (
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-white/50">{credentials.rnpLabel ?? 'RNP'}</dt>
                      <dd className="font-medium tracking-wider text-white">{credentials.rnpValue}</dd>
                    </div>
                  ) : null}
                  {credentials.serviceAreaValue ? (
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="flex items-center gap-1.5 text-white/50">
                        <MapPin className="h-3 w-3" />
                        {credentials.serviceAreaLabel ?? 'Atendimento'}
                      </dt>
                      <dd className="font-medium text-white">{credentials.serviceAreaValue}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          ) : null}
        </div>
      </Container>

      {/* Scroll indicator */}
      {scrollLabel ? (
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 sm:flex">
          <span>{scrollLabel}</span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/15">
            <span className="absolute left-0 top-0 block h-4 w-px animate-scrollLine bg-white/80" />
          </span>
        </div>
      ) : null}
    </section>
  )
}
