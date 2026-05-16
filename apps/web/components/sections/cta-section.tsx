'use client'

import { useState } from 'react'
import { Phone, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'

export function CTASection() {
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'cta_click',
        cta_type: 'phone_form',
        cta_label: 'Phone number submitted',
        section: 'cta-section',
        phone_number: phone,
      })
    }

    const message = encodeURIComponent(
      `Olá! Gostaria de receber mais informações sobre projetos de construção. Meu telefone é: ${phone}`
    )
    window.location.href = `https://wa.me/5585999880988?text=${message}`
  }

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-sm bg-neutral-950 text-white">
          {/* Blueprint texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          {/* Corner accents */}
          <span aria-hidden className="absolute left-0 top-0 h-px w-12 bg-primary" />
          <span aria-hidden className="absolute left-0 top-0 h-12 w-px bg-primary" />
          <span aria-hidden className="absolute bottom-0 right-0 h-px w-12 bg-primary" />
          <span aria-hidden className="absolute bottom-0 right-0 h-12 w-px bg-primary" />

          <div className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-20">
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-white/60">
                <span className="h-px w-8 bg-primary" />
                <span>Sem tempo para ligar?</span>
              </div>
              <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
                Deixe seu telefone — nós{' '}
                <span className="font-serif font-light italic text-white/90">
                  retornamos
                </span>{' '}
                em minutos.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                Atendimento direto via WhatsApp com engenheiro civil. Sem intermediários,
                sem espera longa.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-5 lg:self-end">
              <label
                htmlFor="phone"
                className="mb-3 block text-[11px] font-medium uppercase tracking-[0.28em] text-white/55"
              >
                Telefone com DDD
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Phone className="h-4 w-4 text-white/45" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(85) 99999-9999"
                    className="block w-full rounded-sm border border-white/20 bg-white/[0.04] py-3.5 pl-11 pr-3 text-base text-white placeholder:text-white/30 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando…' : 'Solicitar contato'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-4 text-xs text-white/45">
                Respeitamos sua privacidade. Sem spam, apenas informações relevantes.
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
