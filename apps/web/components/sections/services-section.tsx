import Image from 'next/image'
import { Building2, Home, HardHat, Wrench, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/container'

type Service = {
  icon: typeof Building2
  number: string
  title: string
  description: string
  image: string
}

const services: Service[] = [
  {
    icon: Building2,
    number: '01',
    title: 'Projetos Residenciais',
    description:
      'Casas, sobrados e condomínios projetados sob medida — do anteprojeto à entrega das chaves.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop&q=85',
  },
  {
    icon: Home,
    number: '02',
    title: 'Projetos Comerciais',
    description:
      'Escritórios, lojas e edifícios corporativos com soluções estruturais eficientes e estética cuidada.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop&q=85',
  },
  {
    icon: HardHat,
    number: '03',
    title: 'Obras Industriais',
    description:
      'Galpões, naves industriais e estruturas metálicas com sistemas de proteção e prazos rigorosos.',
    image:
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&h=900&fit=crop&q=85',
  },
  {
    icon: Wrench,
    number: '04',
    title: 'Reformas & Regularizações',
    description:
      'Reformas completas, laudos técnicos e regularização de imóveis com habite-se e ART emitidos.',
    image:
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&h=900&fit=crop&q=85',
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="scroll-mt-16 bg-background py-24 sm:py-32">
      <Container>
        {/* Header */}
        <div className="mb-16 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
              <span className="font-serif text-sm italic text-foreground">02</span>
              <span className="h-px w-8 bg-primary" />
              <span>Serviços</span>
            </div>
            <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Engenharia civil de ponta a ponta —{' '}
              <span className="font-serif font-light italic text-foreground/85">
                do projeto à entrega
              </span>
              .
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Projetos estruturais, laudos técnicos, regularização de obras e acompanhamento
              técnico em Fortaleza e região metropolitana.
            </p>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.number}
                className="group relative overflow-hidden rounded-sm border border-border/60 bg-card transition-colors hover:border-foreground/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
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
