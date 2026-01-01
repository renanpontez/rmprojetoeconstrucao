'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { CTAButton } from '@/components/ui/cta-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Sobre nós', href: '#sobre' },
  { name: 'Serviços', href: '#servicos' },
  { name: 'Projetos', href: '#projetos' },
  { name: 'Contato', href: '#contato' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsMobileMenuOpen(false)
      }
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80'
          : 'border-b-transparent bg-transparent'
      )}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 flex items-center gap-2"
            >
              <Image
                src={
                  isScrolled ?
                    "/assets/img/rm-logo.svg" :
                    "/assets/img/rm-logo-white.svg"
                }
                alt="RM Projetos & Construção"
                width={120}
                height={40}
                className="h-8 w-auto transition-all"
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className={cn(!isScrolled && 'text-white hover:bg-white/10 hover:text-white')}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'text-sm font-semibold leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-white/90 hover:text-white'
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              'border-t py-4 lg:hidden',
              isScrolled ? 'border-border bg-background' : 'border-white/20 bg-black/90'
            )}
          >
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'block w-full rounded-md px-3 py-2 text-left text-base font-semibold leading-7',
                    isScrolled
                      ? 'text-foreground hover:bg-muted'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
