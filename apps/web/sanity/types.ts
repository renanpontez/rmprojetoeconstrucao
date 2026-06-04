import type { PortableTextBlock } from '@portabletext/react'

export type SanityImage = {
  _type?: 'image'
  asset?: { _ref?: string; _type?: string }
  hotspot?: unknown
  crop?: unknown
}

export type Cta = {
  label?: string
  kind?: 'whatsapp' | 'external' | 'internal' | 'email' | 'anchor'
  href?: string
  eventName?: string
}

export type Seo = {
  title?: string
  description?: string
  image?: SanityImage
}

export type Stat = { value?: string; label?: string }
export type DefinitionItem = { term?: string; definition?: string }
export type NavLink = { label?: string; href?: string }
export type ImageCaption = {
  position?: 'bottomLeft' | 'bottomRight'
  text?: string
  italic?: boolean
}
export type ContactMethod = {
  iconName?: string
  title?: string
  detail?: string
  href?: string | null
}

export type CredentialsCard = {
  brandLabel?: string
  stats?: Stat[]
  creaLabel?: string
  rnpLabel?: string
  serviceAreaLabel?: string
}

export type ProjectCategory = {
  _id?: string
  name?: string
  slug?: string
  order?: number
}

export type ServiceDoc = {
  _id?: string
  title?: string
  description?: string
  iconName?: string
  image?: SanityImage
  order?: number
}

export type PortfolioItemDoc = {
  _id?: string
  title?: string
  slug?: string
  category?: ProjectCategory
  location?: string
  year?: number
  image?: SanityImage
  highlights?: string[]
  summary?: string
  order?: number
}

// --- Section blocks ---------------------------------------------------------

export type RichHeadline = PortableTextBlock[]

export type HeroSectionBlock = {
  _type: 'heroSection'
  _key: string
  eyebrow?: string
  headline?: RichHeadline
  subhead?: string
  backgroundImage?: SanityImage
  primaryCta?: Cta
  secondaryLinkText?: string
  secondaryLinkHref?: string
  locationLabel?: string
  scrollLabel?: string
  credentialsCard?: CredentialsCard
}

export type AboutSectionBlock = {
  _type: 'aboutSection'
  _key: string
  index?: string
  eyebrow?: string
  statement?: string
  secondaryLinkText?: string
  secondaryLinkHref?: string
  definitions?: DefinitionItem[]
  stats?: Stat[]
  image?: SanityImage
  captions?: ImageCaption[]
}

export type ServicesSectionBlock = {
  _type: 'servicesSection'
  _key: string
  index?: string
  eyebrow?: string
  headline?: RichHeadline
  description?: string
  items?: ServiceDoc[]
}

export type CtaFormSectionBlock = {
  _type: 'ctaFormSection'
  _key: string
  eyebrow?: string
  headline?: RichHeadline
  description?: string
  inputLabel?: string
  inputPlaceholder?: string
  buttonLabel?: string
  buttonLoadingLabel?: string
  footerNote?: string
  whatsappHref?: string
  messageTemplate?: string
}

export type PortfolioSectionBlock = {
  _type: 'portfolioSection'
  _key: string
  index?: string
  eyebrow?: string
  headline?: RichHeadline
  subtitle?: string
  items?: PortfolioItemDoc[]
}

export type ContactCredentials = {
  creaLabel?: string
  creaValue?: string
  rnpLabel?: string
  rnpValue?: string
  responsibleLabel?: string
  responsibleValue?: string
}

export type WhatsappCard = {
  label?: string
  headline?: RichHeadline
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export type ContactSectionBlock = {
  _type: 'contactSection'
  _key: string
  index?: string
  eyebrow?: string
  headline?: RichHeadline
  subtitle?: string
  methods?: ContactMethod[]
  credentials?: ContactCredentials
  whatsappCard?: WhatsappCard
}

export type Section =
  | HeroSectionBlock
  | AboutSectionBlock
  | ServicesSectionBlock
  | CtaFormSectionBlock
  | PortfolioSectionBlock
  | ContactSectionBlock

// --- Documents --------------------------------------------------------------

export type SiteSettings = {
  siteName?: string
  legalName?: string
  logos?: { dark?: SanityImage; light?: SanityImage }
  contacts?: {
    whatsappLabel?: string
    whatsappHref?: string
    email?: string
    phoneDisplay?: string
  }
  location?: { city?: string; state?: string; region?: string }
  legal?: {
    professionalTitle?: string
    responsibleName?: string
    creaUF?: string
    creaNumber?: string
    rnp?: string
    cnpj?: string
  }
  defaultSeo?: Seo
  primaryCta?: Cta
}

export type Navigation = {
  primaryNav?: NavLink[]
  footerNav?: NavLink[]
  headerCta?: Cta
  footerBio?: string
  footerCopyrightSignature?: string
}

export type PageDoc = {
  _id?: string
  title?: string
  slug?: string
  seo?: Seo
  sections?: Section[]
}

export type PrivacyPolicyDoc = {
  title?: string
  lastUpdated?: string
  body?: PortableTextBlock[]
  seo?: Seo
}
