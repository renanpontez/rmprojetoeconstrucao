import type { Section, SiteSettings } from '@/sanity/types'
import { HeroBlock } from './blocks/HeroBlock'
import { AboutBlock } from './blocks/AboutBlock'
import { ServicesBlock } from './blocks/ServicesBlock'
import { CtaFormBlock } from './blocks/CtaFormBlock'
import { PortfolioBlock } from './blocks/PortfolioBlock'
import { ContactBlock } from './blocks/ContactBlock'

export function PageBuilder({
  sections,
  settings,
}: {
  sections: Section[] | undefined | null
  settings?: SiteSettings | null
}) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section) => {
        const key = section._key
        switch (section._type) {
          case 'heroSection':
            return <HeroBlock key={key} block={section} settings={settings} />
          case 'aboutSection':
            return <AboutBlock key={key} block={section} />
          case 'servicesSection':
            return <ServicesBlock key={key} block={section} />
          case 'ctaFormSection':
            return <CtaFormBlock key={key} block={section} settings={settings} />
          case 'portfolioSection':
            return <PortfolioBlock key={key} block={section} />
          case 'contactSection':
            return <ContactBlock key={key} block={section} settings={settings} />
          default: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const unknown = section as any
            // eslint-disable-next-line no-console
            console.warn(`[PageBuilder] unknown section type: ${unknown?._type}`)
            return null
          }
        }
      })}
    </>
  )
}
