'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { CTAButton } from '@/components/ui/cta-button'
import { cn } from '@/lib/utils'

export type HeaderNavItem = { label: string; href: string }

export type HeaderProps = {
  navItems: HeaderNavItem[]
  logoDark?: string
  logoLight?: string
  logoAlt?: string
  cta?: { label: string; href: string } | null
}

export function Header({
  navItems,
  logoDark,
  logoLight,
  logoAlt = 'RM Projeto & Construção',
  cta,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const onNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        setIsMobileMenuOpen(false)
      }
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  const logoSrc = isScrolled ? logoDark : logoLight
  const hasLogo = !!logoSrc

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80'
          : 'border-b-transparent bg-transparent',
      )}
    >
      <Container>
        <nav
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            isScrolled ? 'h-20' : 'h-32',
          )}
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
              {hasLogo ? (
                <Image
                  src={logoSrc!}
                  alt={logoAlt}
                  width={240}
                  height={80}
                  className={cn(
                    'w-auto transition-all duration-300',
                    isScrolled ? 'h-12' : 'h-20',
                  )}
                  priority
                  unoptimized={logoSrc?.endsWith('.svg')}
                />
              ) : (
                <span
                  className={cn(
                    'font-serif text-xl font-semibold tracking-tight transition-colors',
                    isScrolled ? 'text-foreground' : 'text-white',
                  )}
                >
                  {logoAlt}
                </span>
              )}
            </Link>
          </div>

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

          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavClick(item.href)}
                className={cn(
                  'text-sm font-semibold leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-white/90 hover:text-white',
                )}
              >
                {item.label}
              </button>
            ))}
            {cta?.label && cta?.href ? (
              <CTAButton
                label={cta.label}
                href={cta.href}
                size="sm"
                trackingData={{ section: 'header', label: cta.label }}
              />
            ) : null}
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div
            className={cn(
              'border-t py-4 lg:hidden',
              isScrolled ? 'border-border bg-background' : 'border-white/20 bg-black/90',
            )}
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => onNavClick(item.href)}
                  className={cn(
                    'block w-full rounded-md px-3 py-2 text-left text-base font-semibold leading-7',
                    isScrolled
                      ? 'text-foreground hover:bg-muted'
                      : 'text-white hover:bg-white/10',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
