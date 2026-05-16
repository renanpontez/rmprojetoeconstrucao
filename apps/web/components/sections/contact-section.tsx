import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { CTAButton } from '@/components/ui/cta-button'

const contactMethods = [
  {
    icon: Phone,
    title: 'Telefone & WhatsApp',
    detail: '+55 85 99988-0988',
    href: 'https://wa.me/5585999880988',
  },
  {
    icon: Mail,
    title: 'E-mail',
    detail: 'dr.robertofm@gmail.com',
    href: 'mailto:dr.robertofm@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Atendimento',
    detail: 'Fortaleza/CE & Região Metropolitana',
    href: null,
  },
  {
    icon: Clock,
    title: 'Horário',
    detail: 'Seg. a Sex. · 8h às 18h',
    href: null,
  },
]

export function ContactSection() {
  return (
    <section id="contato" className="scroll-mt-16 bg-background py-24 sm:py-32">
      <Container>
        <SectionHeading
          align="left"
          index="04"
          eyebrow="Contato"
          title={
            <>
              Vamos conversar sobre o seu{' '}
              <span className="font-serif font-light italic text-foreground/85">
                próximo projeto
              </span>
              .
            </>
          }
          subtitle="Atendimento direto com engenheiro civil — respondemos rapidamente em qualquer um dos canais abaixo."
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Contact methods */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {contactMethods.map((method) => {
                const Icon = method.icon
                const Wrapper = method.href ? 'a' : 'div'
                return (
                  <Wrapper
                    key={method.title}
                    {...(method.href
                      ? {
                          href: method.href,
                          target: method.href.startsWith('http')
                            ? '_blank'
                            : undefined,
                          rel: method.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined,
                        }
                      : {})}
                    className="group block bg-background p-6 transition-colors hover:bg-muted/40 sm:p-8"
                  >
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                      {method.title}
                    </div>
                    <div className="mt-2 font-sans text-base font-medium text-foreground transition-colors group-hover:text-primary">
                      {method.detail}
                    </div>
                  </Wrapper>
                )
              })}
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-6 text-xs sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">CREA-CE</dt>
                <dd className="mt-1 font-medium tracking-wide text-foreground">
                  7880/D
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">RNP</dt>
                <dd className="mt-1 font-medium tracking-wide text-foreground">
                  060196010-6
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Responsável</dt>
                <dd className="mt-1 font-medium tracking-wide text-foreground">
                  Eng. Roberto Martins
                </dd>
              </div>
            </dl>
          </div>

          {/* WhatsApp CTA card */}
          <div className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-sm border border-border bg-neutral-950 p-8 text-white sm:p-10">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              <span aria-hidden className="absolute right-0 top-0 h-px w-12 bg-primary" />
              <span aria-hidden className="absolute right-0 top-0 h-12 w-px bg-primary" />

              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <MessageCircle className="h-6 w-6" />
                </div>

                <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-white/55">
                  Resposta em minutos
                </div>
                <h3 className="font-sans text-2xl font-semibold leading-[1.15] tracking-tight text-white sm:text-3xl">
                  Atendimento direto via{' '}
                  <span className="font-serif font-light italic">WhatsApp</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Clique no botão e fale agora com o engenheiro civil responsável.
                  Sem intermediários.
                </p>

                <div className="mt-8">
                  <CTAButton
                    label="Abrir WhatsApp"
                    size="lg"
                    className="w-full sm:w-auto"
                    trackingData={{ section: 'contact', label: 'Abrir WhatsApp' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
