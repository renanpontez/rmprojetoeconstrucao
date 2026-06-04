import Image from 'next/image'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { resolveIcon } from '@/lib/icon-map'

export type ServiceItem = {
  number: string
  title: string
  description: string
  iconName?: string
  image?: string
  imageAlt?: string
}

export type ServicesSectionProps = {
  index?: string
  eyebrow?: string
  headline: ReactNode
  description?: string
  items: ServiceItem[]
}

export function ServicesSection({
  index,
  eyebrow,
  headline,
  description,
  items,
}: ServicesSectionProps) {
  return (
    <section id="servicos" className="scroll-mt-16 bg-background py-24 sm:py-32">
      <Container>
        <div className="mb-16 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {(index || eyebrow) && (
              <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
                {index ? <span className="font-serif text-sm italic text-foreground">{index}</span> : null}
                {index && eyebrow ? <span className="h-px w-8 bg-primary" /> : null}
                {eyebrow ? <span>{eyebrow}</span> : null}
              </div>
            )}
            <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {headline}
            </h2>
          </div>
          {description ? (
            <div className="lg:col-span-5 lg:pl-8">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            </div>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {items.map((service) => {
            const Icon = resolveIcon(service.iconName)
            return (
              <article
                key={service.number}
                className="group relative overflow-hidden rounded-sm border border-border/60 bg-card transition-colors hover:border-foreground/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.imageAlt ?? service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-3 py-1 backdrop-blur-sm">
                    <Icon className="h-3.5 w-3.5 text-white" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
                      {service.number}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-6 sm:p-7">
                  <div>
                    <h3 className="font-sans text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
