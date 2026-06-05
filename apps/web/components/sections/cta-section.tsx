'use client'

import { useState, type ReactNode } from 'react'
import { Phone, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'

export type CTASectionProps = {
  eyebrow?: string
  headline: ReactNode
  description?: string
  inputLabel?: string
  inputPlaceholder?: string
  buttonLabel?: string
  buttonLoadingLabel?: string
  footerNote?: string
  whatsappHref: string
  messageTemplate?: string
}

export function CTASection({
  eyebrow,
  headline,
  description,
  inputLabel,
  inputPlaceholder,
  buttonLabel = 'Solicitar contato',
  buttonLoadingLabel = 'Enviando…',
  footerNote,
  whatsappHref,
  messageTemplate,
}: CTASectionProps) {
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

    const baseMessage =
      messageTemplate ??
      `Olá! Gostaria de receber mais informações sobre projetos de construção. Meu telefone é: {phone}`
    const message = encodeURIComponent(baseMessage.replace('{phone}', phone))
    window.location.href = `${whatsappHref}?text=${message}`
  }

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-sm bg-neutral-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <span aria-hidden className="absolute left-0 top-0 h-px w-12 bg-primary" />
          <span aria-hidden className="absolute left-0 top-0 h-12 w-px bg-primary" />
          <span aria-hidden className="absolute bottom-0 right-0 h-px w-12 bg-primary" />
          <span aria-hidden className="absolute bottom-0 right-0 h-12 w-px bg-primary" />

          <div className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-20">
            <div className="lg:col-span-7">
              {eyebrow ? (
                <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-white/60">
                  <span className="h-px w-8 bg-primary" />
                  <span>{eyebrow}</span>
                </div>
              ) : null}
              <h2 className="font-sans text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
                {headline}
              </h2>
              {description ? (
                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                  {description}
                </p>
              ) : null}
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-5 lg:self-end">
              {inputLabel ? (
                <label
                  htmlFor="phone"
                  className="mb-3 block text-[11px] font-medium uppercase tracking-[0.28em] text-white/55"
                >
                  {inputLabel}
                </label>
              ) : null}
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
                    placeholder={inputPlaceholder}
                    className="block w-full rounded-sm border border-white/20 bg-white/[0.04] py-3.5 pl-11 pr-3 text-base text-white placeholder:text-white/30 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? buttonLoadingLabel : buttonLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {footerNote ? (
                <p className="mt-4 text-xs text-white/45">{footerNote}</p>
              ) : null}
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
