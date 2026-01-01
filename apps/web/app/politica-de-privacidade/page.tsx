import Link from 'next/link'
import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

export const metadata: Metadata = {
  title: 'Política de Privacidade | RM Projetos & Construção',
  description: 'Política de privacidade da RM Projetos & Construção',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 text-4xl font-bold">Política de Privacidade</h1>

            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </p>

              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">1. Informações Gerais</h2>
                <p>
                  A RM Projetos & Construção respeita a sua privacidade. Este documento descreve
                  como coletamos, usamos e protegemos suas informações pessoais.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">2. Coleta de Dados</h2>
                <p>
                  Atualmente, não coletamos dados pessoais através de formulários em nosso site.
                  Todo contato é realizado através de canais externos (WhatsApp e E-mail).
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">3. Uso de Cookies</h2>
                <p>
                  Nosso site pode utilizar cookies para melhorar sua experiência de navegação e
                  coletar estatísticas de uso através do Google Analytics (quando configurado).
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">4. Compartilhamento de Dados</h2>
                <p>
                  Não compartilhamos, vendemos ou alugamos suas informações pessoais a terceiros.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">5. Contato</h2>
                <p>
                  Para questões sobre privacidade, entre em contato através do e-mail:{' '}
                  <a href="mailto:dr.robertofm@gmail.com" className="text-primary hover:underline">
                    dr.robertofm@gmail.com
                  </a>
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">6. Alterações</h2>
                <p>
                  Esta política pode ser atualizada periodicamente. Recomendamos a revisão regular
                  desta página.
                </p>
              </section>
            </div>

            <div className="mt-12 border-t pt-8">
              <Link
                href="/"
                className="inline-flex items-center text-primary hover:underline"
              >
                ← Voltar para página inicial
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
