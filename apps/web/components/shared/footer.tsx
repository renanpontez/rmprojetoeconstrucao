import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { resolveIcon } from '@/lib/icon-map'

export type FooterNavItem = { label: string; href: string }

export type FooterContact = {
  iconName?: string
  label: string
  href?: string | null
  external?: boolean
}

export type FooterCredentialEntry = { label: string; value: string }

export type FooterProps = {
  siteName?: string
  logo?: string
  logoAlt?: string
  bio?: string
  credentials?: FooterCredentialEntry[]
  navItems?: FooterNavItem[]
  navHeading?: string
  contacts?: FooterContact[]
  contactsHeading?: string
  copyrightSignature?: string
  copyrightText?: string
}

export function Footer({
  siteName = 'RM Projeto & Construção',
  logo,
  logoAlt = 'RM Projeto & Construção',
  bio,
  credentials = [],
  navItems = [],
  navHeading = 'Navegação',
  contacts = [],
  contactsHeading = 'Contato',
  copyrightSignature,
  copyrightText,
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const copyright =
    copyrightText ?? `© ${currentYear} ${siteName}. Todos os direitos reservados.`

  return (
    <footer className="relative overflow-hidden bg-neutral-950 pt-20 pb-10 text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            {logo ? (
              <Image
                src={logo}
                alt={logoAlt}
                width={180}
                height={60}
                className="h-14 w-auto"
                unoptimized={logo.endsWith('.svg')}
              />
            ) : (
              <span className="font-serif text-xl font-semibold tracking-tight">{siteName}</span>
            )}
            {bio ? (
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{bio}</p>
            ) : null}

            {credentials.length > 0 ? (
              <dl className="mt-8 space-y-2 text-xs">
                {credentials.map((c, i) => (
                  <div key={`${c.label}-${i}`} className="flex items-baseline gap-3">
                    <dt className="w-20 text-white/45">{c.label}</dt>
                    <dd className="font-medium tracking-wide text-white">{c.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {navItems.length > 0 ? (
            <div className="lg:col-span-3">
              <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
                {navHeading}
              </div>
              <ul className="space-y-3 text-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/75 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {contacts.length > 0 ? (
            <div className="lg:col-span-4">
              <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
                {contactsHeading}
              </div>
              <ul className="space-y-4 text-sm">
                {contacts.map((c, i) => {
                  const Icon = resolveIcon(c.iconName)
                  if (c.href) {
                    return (
                      <li key={`${c.label}-${i}`}>
                        <a
                          href={c.href}
                          target={c.external ? '_blank' : undefined}
                          rel={c.external ? 'noopener noreferrer' : undefined}
                          className="group flex items-center gap-3 text-white/75 transition-colors hover:text-white"
                        >
                          <Icon className="h-4 w-4 text-primary" />
                          {c.label}
                        </a>
                      </li>
                    )
                  }
                  return (
                    <li key={`${c.label}-${i}`} className="flex items-center gap-3 text-white/75">
                      <Icon className="h-4 w-4 text-primary" />
                      {c.label}
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>{copyright}</p>
          {copyrightSignature ? (
            <p className="font-serif italic">{copyrightSignature}</p>
          ) : null}
        </div>
      </Container>
    </footer>
  )
}
