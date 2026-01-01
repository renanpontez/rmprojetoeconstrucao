import Image from 'next/image'
import { Building2, Home, HardHat, Wrench } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Building2,
    title: 'Projetos Residenciais',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80',
  },
  {
    icon: Home,
    title: 'Projetos Comerciais',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&q=80',
  },
  {
    icon: HardHat,
    title: 'Obras Industriais',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop&q=80',
  },
  {
    icon: Wrench,
    title: 'Reformas e Regularizações',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&h=400&fit=crop&q=80',
  },
]

export function ServicesSection() {
  return (
    <section id="servicos" className="scroll-mt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-start space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Serviços de Engenharia Civil
              </h2>
              <p className="text-lg text-muted-foreground">
                Projetos estruturais, laudos técnicos, regularização de obras e acompanhamento técnico em Fortaleza e região metropolitana.
              </p>
            </div>

            <ul>
              <li>test</li>
              <li>test 2</li>
              <li>test 3</li>
            </ul>

            <Button variant="outline" size="lg" className="w-fit">
              Ver Todos os Serviços
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right Column - Service Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  {/* Background Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                    <div className="mb-2 rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
