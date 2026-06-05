import type { Metadata } from 'next'
import '../globals.css'
import { SkipToContent } from '@/components/shared/skip-to-content'
import { Header, type HeaderNavItem } from '@/components/shared/header'
import {
  Footer,
  type FooterContact,
  type FooterCredentialEntry,
  type FooterNavItem,
} from '@/components/shared/footer'
import { fetchGlobalChrome } from '@/sanity/lib/fetchPage'
import { buildMetadata } from '@/sanity/lib/metadata'
import { safeImageUrl } from '@/sanity/lib/image'

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await fetchGlobalChrome()
  return buildMetadata({ settings, pathname: '/' })
}

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { settings, navigation } = await fetchGlobalChrome()

  const navItems: HeaderNavItem[] = (navigation?.primaryNav ?? [])
    .filter((n): n is { label: string; href: string } => !!n?.label && !!n?.href)
    .map((n) => ({ label: n.label, href: n.href }))

  const headerCta =
    navigation?.headerCta?.label && navigation.headerCta.href
      ? { label: navigation.headerCta.label, href: navigation.headerCta.href }
      : null

  const footerNav: FooterNavItem[] = (navigation?.footerNav ?? [])
    .filter((n): n is { label: string; href: string } => !!n?.label && !!n?.href)
    .map((n) => ({ label: n.label, href: n.href }))

  const footerCredentials: FooterCredentialEntry[] = []
  if (settings?.legal?.creaNumber)
    footerCredentials.push({
      label: settings.legal.creaUF
        ? `CREA-${settings.legal.creaUF}`
        : 'CREA',
      value: settings.legal.creaNumber,
    })
  if (settings?.legal?.cnpj)
    footerCredentials.push({ label: 'CNPJ', value: settings.legal.cnpj })

  const footerContacts: FooterContact[] = []
  if (settings?.contacts?.whatsappLabel && settings.contacts.whatsappHref)
    footerContacts.push({
      iconName: 'Phone',
      label: settings.contacts.whatsappLabel,
      href: settings.contacts.whatsappHref,
      external: true,
    })
  if (settings?.contacts?.email)
    footerContacts.push({
      iconName: 'Mail',
      label: settings.contacts.email,
      href: `mailto:${settings.contacts.email}`,
    })
  if (settings?.location?.city) {
    const loc = [
      `${settings.location.city}${settings.location.state ? `/${settings.location.state}` : ''}`,
      settings.location.region,
    ]
      .filter(Boolean)
      .join(' — ')
    footerContacts.push({ iconName: 'MapPin', label: loc })
  }

  const logoDark = safeImageUrl(settings?.logos?.dark, 480)
  const logoLight = safeImageUrl(settings?.logos?.light, 480)

  return (
    <>
      <SkipToContent />
      <Header
        navItems={navItems}
        logoDark={logoDark || undefined}
        logoLight={logoLight || logoDark || undefined}
        logoAlt={settings?.siteName ?? 'RM Projeto & Construção'}
        cta={headerCta}
      />
      <main id="main-content">{children}</main>
      <Footer
        siteName={settings?.siteName}
        logo={logoLight || logoDark || undefined}
        logoAlt={settings?.siteName ?? 'RM Projeto & Construção'}
        bio={navigation?.footerBio}
        credentials={footerCredentials}
        navItems={footerNav}
        contacts={footerContacts}
        copyrightSignature={navigation?.footerCopyrightSignature}
      />
    </>
  )
}
