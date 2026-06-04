// Objects
import { richHeadline } from './objects/richHeadline'
import { cta } from './objects/cta'
import { seo } from './objects/seo'
import { stat } from './objects/stat'
import { definitionItem } from './objects/definitionItem'
import { contactMethod } from './objects/contactMethod'
import { navLink } from './objects/navLink'
import { credentialsCard } from './objects/credentialsCard'
import { imageCaption } from './objects/imageCaption'

// Documents
import { siteSettings } from './documents/siteSettings'
import { navigation } from './documents/navigation'
import { page } from './documents/page'
import { service } from './documents/service'
import { projectCategory } from './documents/projectCategory'
import { portfolioItem } from './documents/portfolioItem'
import { privacyPolicy } from './documents/privacyPolicy'

// Blocks (referenced by page.sections[])
import { heroSection } from './blocks/heroSection'
import { aboutSection } from './blocks/aboutSection'
import { servicesSection } from './blocks/servicesSection'
import { ctaFormSection } from './blocks/ctaFormSection'
import { portfolioSection } from './blocks/portfolioSection'
import { contactSection } from './blocks/contactSection'

export const schemaTypes = [
  // Objects
  richHeadline,
  cta,
  seo,
  stat,
  definitionItem,
  contactMethod,
  navLink,
  credentialsCard,
  imageCaption,
  // Documents
  siteSettings,
  navigation,
  page,
  service,
  projectCategory,
  portfolioItem,
  privacyPolicy,
  // Blocks
  heroSection,
  aboutSection,
  servicesSection,
  ctaFormSection,
  portfolioSection,
  contactSection,
]
