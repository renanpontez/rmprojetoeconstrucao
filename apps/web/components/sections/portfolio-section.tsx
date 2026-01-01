'use client'

import { useState } from 'react'
import Image from 'next/image'
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
    title: 'Residência Unifamiliar - Aldeota',
    type: 'Residencial',
    location: 'Fortaleza/CE',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80',
    highlights: ['300m² construídos', 'Projeto arquitetônico completo', '3 suítes'],
  },
  {
    title: 'Edifício Comercial - Meireles',
    type: 'Comercial',
    location: 'Fortaleza/CE',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
    highlights: ['8 pavimentos', 'Estrutura em concreto armado', 'AVCB aprovado'],
  },
  {
    title: 'Galpão Industrial - Maracanaú',
    type: 'Industrial',
    location: 'Maracanaú/CE',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop&q=80',
    highlights: ['1200m² de área', 'Estrutura metálica', 'Sistema contra incêndio'],
  },
  {
    title: 'Reforma de Apartamento - Cocó',
    type: 'Reforma',
    location: 'Fortaleza/CE',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
    highlights: ['Reforma completa', 'Novo layout', 'Acabamento premium'],
  },
  {
    title: 'Condomínio Residencial',
    type: 'Residencial',
    location: 'Eusébio/CE',
    year: 2022,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80',
    highlights: ['12 casas', 'Área de lazer completa', 'Infraestrutura planejada'],
  },
  {
    title: 'Regularização Predial',
    type: 'Regularização',
    location: 'Fortaleza/CE',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop&q=80',
    highlights: ['Documentação completa', 'Habite-se aprovado', 'Registro de imóveis'],
  },
]

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioItems)[0] | null>(null)

  const handleProjectClick = (project: (typeof portfolioItems)[0]) => {
    setSelectedProject(project)

    // Track analytics
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'portfolio_open',
        item_title: project.title,
      })
    }
  }

  return (
    <section id="projetos" className="scroll-mt-16 bg-muted/20 py-20">
      <Container>
        <SectionHeading
          title="Projetos Realizados"
          subtitle="Conheça alguns dos projetos que desenvolvemos com excelência"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleProjectClick(item)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-md transition-all hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-90">
                  {item.type}
                </p>
                <h3 className="mt-1 font-bold text-sm sm:text-base line-clamp-2">{item.title}</h3>
                <p className="mt-1 text-xs opacity-75">
                  {item.location} • {item.year}
                </p>
              </div>
            </button>
          ))}
        </div>
      </Container>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedProject.type} • {selectedProject.location} • {selectedProject.year}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Destaques do Projeto:</h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
