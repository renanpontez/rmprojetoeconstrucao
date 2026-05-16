import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/90 py-12 text-white">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/assets/img/rm-logo-white.svg"
                alt="RM Projeto & Construção"
                width={150}
                height={50}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm text-muted/70">
              Engenharia civil, reformas e projetos estruturais com mais de 30 anos de experiência em Fortaleza/CE.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Informações Legais</h3>
            <ul className="space-y-2 text-sm text-muted/70">
              <li>CREA-CE: 123456</li>
              <li>CNPJ: 1234567890001-12</li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-primary">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted/70" />
                <a
                  href="https://wa.me/5585999880988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted/70 hover:text-primary"
                >
                  +55 85 99988-0988
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted/70" />
                <a href="mailto:dr.robertofm@gmail.com" className="text-muted/70 hover:text-primary">
                  dr.robertofm@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted/70">
                <MapPin className="h-4 w-4" />
                <span>Fortaleza/CE</span>
              </li>
            </ul>
          </div>
        </div>


        <Separator className="my-8" />

        <div className="text-center text-sm text-muted/70">
          <p>
            © {currentYear} RM Projeto & Construção. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            Engenheiro Civil Roberto Martins - CREA-CE: 123456
          </p>
        </div>
      </Container>
    </footer>
  )
}
