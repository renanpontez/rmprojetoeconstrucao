'use client'

import { useState } from 'react'
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

const portfolioItems = [
  {
    title: 'Residência Unifamiliar',
    type: 'Residencial',
    location: 'Aldeota · Fortaleza/CE',
    year: 2023,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop&q=85',
    highlights: ['300m² construídos', 'Projeto arquitetônico completo', '3 suítes'],
  },
  {
    title: 'Edifício Comercial',
    type: 'Comercial',
    location: 'Meireles · Fortaleza/CE',
    year: 2022,
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop&q=85',
    highlights: ['8 pavimentos', 'Estrutura em concreto armado', 'AVCB aprovado'],
  },
  {
    title: 'Galpão Industrial',
    type: 'Industrial',
    location: 'Maracanaú/CE',
    year: 2023,
    image:
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&h=900&fit=crop&q=85',
    highlights: ['1200m² de área', 'Estrutura metálica', 'Sistema contra incêndio'],
  },
  {
    title: 'Reforma de Apartamento',
    type: 'Reforma',
    location: 'Cocó · Fortaleza/CE',
    year: 2024,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&q=85',
    highlights: ['Reforma completa', 'Novo layout', 'Acabamento premium'],
  },
  {
    title: 'Condomínio Residencial',
    type: 'Residencial',
    location: 'Eusébio/CE',
    year: 2022,
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop&q=85',
    highlights: ['12 casas', 'Área de lazer completa', 'Infraestrutura planejada'],
  },
  {
    title: 'Regularização Predial',
    type: 'Regularização',
    location: 'Fortaleza/CE',
    year: 2023,
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=900&fit=crop&q=85',
    highlights: ['Documentação completa', 'Habite-se aprovado', 'Registro de imóveis'],
  },
]

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof portfolioItems)[0] | null
  >(null)

  const handleProjectClick = (project: (typeof portfolioItems)[0]) => {
    setSelectedProject(project)

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'portfolio_open',
        item_title: project.title,
      })
    }
  }

  return (
    <section
      id="projetos"
      className="scroll-mt-16 bg-muted/30 py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          align="left"
          index="03"
          eyebrow="Portfólio"
          title={
            <>
              Obras que falam por nós —{' '}
              <span className="font-serif font-light italic text-foreground/85">
                cada projeto, uma assinatura
              </span>
              .
            </>
          }
          subtitle="Uma seleção de empreendimentos residenciais, comerciais e industriais entregues nos últimos anos."
        />

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {portfolioItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleProjectClick(item)}
              className="group flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
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
                <div className="font-serif text-sm italic text-muted-foreground">
                  {item.year}
                </div>
              </div>

              <h3 className="mt-2 font-sans text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
            </button>
          ))}
        </div>
      </Container>

      {/* Project detail dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <div className="relative -m-6 mb-0 aspect-video overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
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
                  Destaques
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((highlight, index) => (
                    <li
                      key={index}
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
