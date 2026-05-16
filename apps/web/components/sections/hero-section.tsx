import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { CTAButton } from '@/components/ui/cta-button'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-neutral-950 text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1280&fit=crop&q=85"
          alt="Engenharia e construção civil em Fortaleza"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
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
      <div
        aria-hidden
        className="absolute right-8 top-1/2 z-[2] hidden -translate-y-1/2 rotate-90 origin-center text-[10px] font-medium uppercase tracking-[0.4em] text-white/50 lg:block"
      >
        Ceará · Brasil
      </div>

      {/* Content */}
      <Container className="relative z-10 pb-24 pt-40 sm:pt-44 lg:pb-28 lg:pt-48">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Headline column */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Eyebrow */}
            <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-white/70">
              <span className="h-px w-10 bg-primary" />
              <span>Engenharia Civil · Desde 1992</span>
            </div>

            {/* Headline */}
            <h1 className="font-sans text-[2.125rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
              Construímos com{' '}
              <span className="font-serif font-light italic text-white/95">
                precisão
              </span>
              ,
              <br className="hidden sm:block" /> entregamos com{' '}
              <span className="font-serif font-light italic text-white/95">
                confiança
              </span>
              .
            </h1>

            {/* Subhead */}
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Projetos, obras e reformas residenciais e comerciais em Fortaleza,
              com requinte nos acabamentos, rigor técnico e responsabilidade de
              engenheiro civil com CREA-CE ativo.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <CTAButton
                label="Solicitar Orçamento Grátis"
                size="lg"
                trackingData={{ section: 'hero', label: 'Solicitar Orçamento Grátis' }}
              />
              <a
                href="#projetos"
                className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Ver projetos realizados
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Credential / spec card */}
          <div className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
            <div className="relative max-w-md border border-white/15 bg-white/[0.04] p-6 backdrop-blur-md sm:p-7">
              {/* Tiny crosshair top-right, like an architect's stamp */}
              <span
                aria-hidden
                className="absolute -right-px -top-px h-3 w-3 border-r border-t border-primary"
              />
              <span
                aria-hidden
                className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-primary"
              />

              <div className="mb-5 flex items-center text-[10px] font-medium uppercase tracking-[0.28em] text-white/50">
                <span>RM · Projeto &amp; Construção</span>
              </div>

              <div className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5">
                <div className="px-3 first:pl-0">
                  <div className="font-serif text-3xl font-light text-white sm:text-4xl">
                    +30
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-white/55">
                    Anos
                  </div>
                </div>
                <div className="px-3">
                  <div className="font-serif text-3xl font-light text-white sm:text-4xl">
                    100<span className="text-primary">+</span>
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-white/55">
                    Projetos
                  </div>
                </div>
                <div className="px-3 last:pr-0">
                  <div className="font-serif text-3xl font-light text-white sm:text-4xl">
                    100<span className="text-primary">%</span>
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-white/55">
                    com ART
                  </div>
                </div>
              </div>

              <dl className="mt-5 space-y-2.5 text-xs">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-white/50">Eng. Civil CREA-CE</dt>
                  <dd className="font-medium tracking-wider text-white">
                    7880/D
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-white/50">RNP</dt>
                  <dd className="font-medium tracking-wider text-white">
                    060196010-6
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="flex items-center gap-1.5 text-white/50">
                    <MapPin className="h-3 w-3" />
                    Atendimento
                  </dt>
                  <dd className="font-medium text-white">
                    Fortaleza &amp; RM
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 sm:flex">
        <span>Role para explorar</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute left-0 top-0 block h-4 w-px animate-scrollLine bg-white/80" />
        </span>
      </div>
    </section>
  )
}
