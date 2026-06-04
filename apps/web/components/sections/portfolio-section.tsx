'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export type PortfolioItem = {
  title: string
  type: string
  location: string
  year: number
  image: string
  imageAlt?: string
  highlights: string[]
}

export type PortfolioSectionProps = {
  index?: string
  eyebrow?: string
  headline: ReactNode
  subtitle?: string
  items: PortfolioItem[]
  highlightsLabel?: string
}

export function PortfolioSection({
  index,
  eyebrow,
  headline,
  subtitle,
  items,
  highlightsLabel = 'Destaques',
}: PortfolioSectionProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)

  const handleProjectClick = (project: PortfolioItem) => {
    setSelectedProject(project)
    if (typeof window !== 'undefined') {
      window.dataLayer ??= []
      window.dataLayer.push({
        event: 'portfolio_open',
        item_title: project.title,
      })
    }
  }

  return (
    <section id="projetos" className="scroll-mt-16 bg-muted/30 py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="left"
          index={index}
          eyebrow={eyebrow}
          title={headline}
          subtitle={subtitle}
        />

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {items.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              onClick={() => handleProjectClick(item)}
              className="group flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                  {item.type}
                </div>
                <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Nº {String(index + 1).padStart(2, '0')}
                </div>
                <div className="font-serif text-sm italic text-muted-foreground">{item.year}</div>
              </div>

              <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
            </button>
          ))}
        </div>
      </Container>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <div className="relative -m-6 mb-0 aspect-video overflow-hidden">
                {selectedProject.image ? (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.imageAlt ?? selectedProject.title}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <DialogHeader className="pt-2">
                <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  {selectedProject.type} · {selectedProject.year}
                </div>
                <DialogTitle className="mt-2 font-sans text-2xl font-semibold tracking-tight">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selectedProject.location}
                </DialogDescription>
              </DialogHeader>
              <div>
                <h4 className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {highlightsLabel}
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((highlight, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-3 text-sm text-foreground"
                    >
                      <span className="mt-1.5 h-1 w-4 flex-shrink-0 bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
