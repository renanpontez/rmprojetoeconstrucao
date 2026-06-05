import { groq } from 'next-sanity'

export const CTA_FRAGMENT = groq`{
  label,
  kind,
  href,
  eventName
}`

export const SEO_FRAGMENT = groq`{
  title,
  description,
  image
}`

export const SERVICE_CARD_FRAGMENT = groq`{
  _id,
  title,
  description,
  iconName,
  image,
  order
}`

export const PORTFOLIO_CARD_FRAGMENT = groq`{
  _id,
  title,
  "slug": slug.current,
  "category": category->{ _id, name, "slug": slug.current, order },
  location,
  year,
  image,
  highlights,
  summary,
  order
}`

export const SECTION_FRAGMENT = groq`
  _key,
  _type == "heroSection" => {
    _type, _key,
    eyebrow,
    headline,
    subhead,
    backgroundImage,
    primaryCta ${CTA_FRAGMENT},
    secondaryLinkText,
    secondaryLinkHref,
    locationLabel,
    scrollLabel,
    credentialsCard {
      brandLabel,
      stats[]{ value, label },
      creaLabel,
      rnpLabel,
      serviceAreaLabel
    }
  },
  _type == "aboutSection" => {
    _type, _key,
    index, eyebrow, statement,
    secondaryLinkText, secondaryLinkHref,
    definitions[]{ term, definition },
    stats[]{ value, label },
    image,
    captions[]{ position, text, italic }
  },
  _type == "servicesSection" => {
    _type, _key,
    index, eyebrow, headline, description,
    "items": coalesce(
      items[]->${SERVICE_CARD_FRAGMENT},
      *[_type == "service"] | order(order asc)${SERVICE_CARD_FRAGMENT}
    )
  },
  _type == "ctaFormSection" => {
    _type, _key,
    eyebrow, headline, description,
    inputLabel, inputPlaceholder, buttonLabel, buttonLoadingLabel,
    footerNote, whatsappHref, messageTemplate
  },
  _type == "portfolioSection" => {
    _type, _key,
    index, eyebrow, headline, subtitle,
    "items": coalesce(
      items[]->${PORTFOLIO_CARD_FRAGMENT},
      *[_type == "portfolioItem"] | order(year desc, order asc)${PORTFOLIO_CARD_FRAGMENT}
    )
  },
  _type == "contactSection" => {
    _type, _key,
    index, eyebrow, headline, subtitle,
    methods[]{ iconName, title, detail, href },
    credentials {
      creaLabel, creaValue,
      rnpLabel, rnpValue,
      responsibleLabel, responsibleValue
    },
    whatsappCard {
      label,
      headline,
      description,
      ctaLabel,
      ctaHref
    }
  }
`

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    seo ${SEO_FRAGMENT},
    sections[]{ ${SECTION_FRAGMENT} }
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    legalName,
    logos { dark, light },
    contacts { whatsappLabel, whatsappHref, email, phoneDisplay },
    location { city, state, region },
    legal {
      professionalTitle, responsibleName,
      creaUF, creaNumber, rnp, cnpj
    },
    defaultSeo ${SEO_FRAGMENT},
    primaryCta ${CTA_FRAGMENT}
  }
`

export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"][0]{
    primaryNav[]{ label, href },
    footerNav[]{ label, href },
    headerCta ${CTA_FRAGMENT},
    footerBio,
    footerCopyrightSignature
  }
`

export const PRIVACY_POLICY_QUERY = groq`
  *[_type == "privacyPolicy"][0]{
    title,
    lastUpdated,
    body,
    seo ${SEO_FRAGMENT}
  }
`
