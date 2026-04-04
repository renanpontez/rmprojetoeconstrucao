import { SkipToContent } from '@/components/shared/skip-to-content'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { ServicesSection } from '@/components/sections/services-section'
import { CTASection } from '@/components/sections/cta-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { ContactSection } from '@/components/sections/contact-section'

export default function HomePage() {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CTASection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
