import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { ScrollHighlightText } from '@/components/ui/scroll-highlight-text'

const stats = [
  { value: '100+', label: 'Projetos Concluídos' },
  { value: '+30', label: 'Anos de Experiência' },
  { value: '100%', label: 'Obras com ART' },
]

export function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-16 bg-background py-24 sm:py-32">
      <Container>
        {/* Eyebrow */}
        <div className="mb-12 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
          <span className="font-serif text-sm italic text-foreground">01</span>
          <span className="h-px w-8 bg-primary" />
          <span>Sobre Nós</span>
        </div>

        {/* Editorial statement */}
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ScrollHighlightText className="font-sans text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[3rem]">
              Transformamos sonhos em realidade, através de projetos arrojados de engenharia, executados com qualidade, segurança e compromisso com os prazos.
            </ScrollHighlightText>

            <div className="mt-10">
              <a
                href="#projetos"
                className="group inline-flex items-center gap-2 border-b border-foreground/20 pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Conhecer nossos projetos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Side definition list */}
          <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-border/60">
            <dl className="space-y-7 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Especialidade
                </dt>
                <dd className="mt-2 font-medium text-foreground">
                  Engenharia civil, projetos estruturais, reformas e regularizações
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Atuação
                </dt>
                <dd className="mt-2 font-medium text-foreground">
                  Fortaleza e Região Metropolitana — Ceará, Brasil
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Responsável Técnico
                </dt>
                <dd className="mt-2 font-medium text-foreground">
                  Eng. Roberto Martins — CREA-CE 7880/D
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Numbers + image */}
        <div className="mt-24 grid items-stretch gap-10 lg:mt-32 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-between lg:col-span-4">
            <div className="space-y-10">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t border-border pt-6">
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

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:col-span-8 lg:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=2000&fit=crop&q=85"
              alt="Engenheiro civil em canteiro de obras"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 text-white">
              <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/70">
                Canteiro · Fortaleza
              </div>
              <div className="font-serif text-sm italic text-white/85">
                Precisão em cada detalhe
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
