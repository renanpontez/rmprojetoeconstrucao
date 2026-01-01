import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { CTAButton } from '@/components/ui/cta-button'
import { Card, CardContent } from '@/components/ui/card'

const contactMethods = [
  {
    icon: Phone,
    title: 'Telefone/WhatsApp',
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
    title: 'Localização',
    detail: 'Fortaleza/CE',
    href: null,
  },
]

export function ContactSection() {
  return (
    <section id="contato" className="scroll-mt-16 py-20">
      <Container>
        <SectionHeading
          title="Entre em Contato"
          subtitle="Estamos prontos para atender seu projeto"
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-bold">Fale Conosco</h3>
              <p className="text-muted-foreground">
                Entre em contato através de um dos canais abaixo. Respondemos rapidamente para
                tirar suas dúvidas e iniciar seu projeto.
              </p>
            </div>

            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <Card key={index}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {method.title}
                        </p>
                        {method.href ? (
                          <a
                            href={method.href}
                            target={method.href.startsWith('http') ? '_blank' : undefined}
                            rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="font-semibold hover:text-primary"
                          >
                            {method.detail}
                          </a>
                        ) : (
                          <p className="font-semibold">{method.detail}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* CTA Card */}
          <Card className="flex flex-col justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">Atendimento via WhatsApp</h3>
              <p className="mb-6 text-muted-foreground">
                A forma mais rápida de falar conosco. Clique no botão abaixo e inicie uma
                conversa agora mesmo.
              </p>
              <CTAButton
                label="Abrir WhatsApp"
                size="lg"
                className="w-full sm:w-auto"
                trackingData={{ section: 'contact', label: 'Abrir WhatsApp' }}
              />
              <p className="mt-4 text-xs text-muted-foreground">
                Respondemos de segunda a sexta, das 8h às 18h
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
