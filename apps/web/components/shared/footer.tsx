import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-neutral-950 pt-20 pb-10 text-white">
      {/* Subtle blueprint grid */}
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
          {/* Brand */}
          <div className="lg:col-span-5">
            <Image
              src="/assets/img/rm-logo-white.svg"
              alt="RM Projeto & Construção"
              width={180}
              height={60}
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
              Engenharia civil, reformas e projetos estruturais com mais de 30 anos de
              experiência em Fortaleza/CE.
            </p>

            <dl className="mt-8 space-y-2 text-xs">
              <div className="flex items-baseline gap-3">
                <dt className="w-20 text-white/45">CREA-CE</dt>
                <dd className="font-medium tracking-wide text-white">7880/D</dd>
              </div>
              <div className="flex items-baseline gap-3">
                <dt className="w-20 text-white/45">CNPJ</dt>
                <dd className="font-medium tracking-wide text-white">
                  12.345.678/0001-12
                </dd>
              </div>
            </dl>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
              Navegação
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#sobre" className="text-white/75 transition-colors hover:text-white">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="#servicos" className="text-white/75 transition-colors hover:text-white">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="#projetos" className="text-white/75 transition-colors hover:text-white">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="#contato" className="text-white/75 transition-colors hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <div className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-white/45">
              Contato
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://wa.me/5585999880988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/75 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +55 85 99988-0988
                </a>
              </li>
              <li>
                <a
                  href="mailto:dr.robertofm@gmail.com"
                  className="group flex items-center gap-3 text-white/75 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  dr.robertofm@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/75">
                <MapPin className="h-4 w-4 text-primary" />
                Fortaleza/CE — Ceará, Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {currentYear} RM Projeto & Construção. Todos os direitos reservados.</p>
          <p className="font-serif italic">
            Eng. Civil Roberto Martins — CREA-CE 7880/D
          </p>
        </div>
      </Container>
    </footer>
  )
}
