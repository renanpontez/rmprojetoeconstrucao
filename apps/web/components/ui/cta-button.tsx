'use client'

import { Button, ButtonProps } from './button'
import { MessageCircle } from 'lucide-react'

interface CTAButtonProps extends Omit<ButtonProps, 'onClick'> {
  href?: string
  label: string
  icon?: React.ReactNode
  trackingData?: {
    section?: string
    label?: string
  }
}

export function CTAButton({
  href = 'https://wa.me/5585999880988',
  label,
  icon,
  trackingData,
  ...props
}: CTAButtonProps) {
  const handleClick = () => {
    // Track analytics event
    if (typeof window !== 'undefined' && trackingData) {
      window.dataLayer ??= []
      window.dataLayer.push({
        event: 'cta_click',
        cta_type: 'whatsapp',
        cta_label: trackingData.label || label,
        section: trackingData.section || 'unknown',
        href,
      })
    }

    // Open WhatsApp link
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button onClick={handleClick} {...props}>
      {icon || <MessageCircle className="h-4 w-4" />}
      {label}
    </Button>
  )
}
