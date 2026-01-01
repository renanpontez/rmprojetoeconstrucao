'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Phone } from 'lucide-react'

export function CTASection() {
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track the form submission
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_click',
        cta_type: 'phone_form',
        cta_label: 'Phone number submitted',
        section: 'cta-section',
        phone_number: phone,
      })
    }

    // Redirect to WhatsApp with the phone number prefilled
    const message = encodeURIComponent(
      `Olá! Gostaria de receber mais informações sobre projetos de construção. Meu telefone é: ${phone}`
    )
    window.location.href = `https://wa.me/5585999880988?text=${message}`
  }

  return (
    <section className="py-20 sm:py-16">
      <Container>
        <div className="mx-auto w-full flex flex-row rounded-2xl border-2 border-border/40 bg-background px-6 py-12 sm:px-12">
          <div className="text-left w-1/2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Quer conversar sobre um projeto de construção mas <b>está sem tempo?</b>
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Deixe seu telefone e entraremos em contato via WhatsApp. 
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 w-1/2">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(85) 99999-9999"
                  className="block w-full rounded-md border border-input bg-background py-3 pl-10 pr-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center sm:text-left">
              Respeitamos sua privacidade. Sem spam, apenas informações relevantes.
            </p>
          </form>
        </div>
      </Container>
    </section>
  )
}
