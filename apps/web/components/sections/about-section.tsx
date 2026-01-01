import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { ScrollHighlightText } from '@/components/ui/scroll-highlight-text'

const stats = [
  { value: '+500', label: 'Projetos Concluídos' },
  { value: '+30', label: 'Anos de Experiência' },
  { value: '100%', label: 'Obras com ART' },
]

function RenewableEnergyIcon() {
  return (
    <div className="flex gap-6 text-muted-foreground/20">
      {/* Solar Panel Icon */}
      <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="30" width="50" height="40" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="70" x2="50" y2="85" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="15" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="50" y1="7" x2="50" y2="3" stroke="currentColor" strokeWidth="2" />
        <line x1="58" y1="15" x2="62" y2="15" stroke="currentColor" strokeWidth="2" />
        <line x1="42" y1="15" x2="38" y2="15" stroke="currentColor" strokeWidth="2" />
      </svg>

      {/* Wind Turbine Icon */}
      <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="50" y1="40" x2="50" y2="85" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="40" r="4" fill="currentColor" />
        <path d="M50 40 L50 20 L45 25 Z" fill="currentColor" />
        <path d="M50 40 L65 50 L60 50 Z" fill="currentColor" />
        <path d="M50 40 L35 50 L40 50 Z" fill="currentColor" />
        <line x1="40" y1="85" x2="60" y2="85" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-16 py-20 sm:py-20">
      <Container>
        {/* Part 1: Icon and Highlighted Text */}
        <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16 items-start mb-32">
          {/* Renewable Energy Icons */}
          <div className="flex justify-center lg:justify-start">
            <RenewableEnergyIcon />
          </div>

          {/* Highlighted Text */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-primary mb-8">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Sobre Nós
            </div>

            <ScrollHighlightText className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Transformamos projetos em realidade com engenharia de qualidade, segurança estrutural e compromisso com prazos em Fortaleza.
            </ScrollHighlightText>

            <div className="pt-6">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                Conhecer Nossos Projetos
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Part 2: Stats and Engineer Image */}
        <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16 items-start mb-32">
          {/* Stats */}
          <div className="space-y-8">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-5xl sm:text-6xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Engineer Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=675&fit=crop&q=80"
              alt="Engineers working on renewable energy project"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
