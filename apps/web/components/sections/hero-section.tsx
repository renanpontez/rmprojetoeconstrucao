import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { CTAButton } from '@/components/ui/cta-button'

export function HeroSection() {
  return (
    <section className="relative flex h-auto items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop&q=80"
          alt="Engenharia e construção civil em Fortaleza"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability - gradient from left (darker) to right (lighter) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-32 pt-48">
        <div className="max-w-xl">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
                Engenharia Civil em Fortaleza com mais de 30 anos de experiência
              </h1>
              <p className="text-lg text-white/90 sm:text-lg lg:text-lg">
                Projetando, construindo e reformando empreendimentos residenciais
                e comerciais, com requinte nos acabamentos, inovação tecnológica,
                excelência no atendimento e rigor na execução das obras ajudando
                a realizar projetos de vida, visando a satisfação plena do cliente.
                Atendimento personalizado com engenheiro civil CREA-CE ativo.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <CTAButton
                label="Solicitar Orçamento Grátis"
                size="lg"
                trackingData={{ section: 'hero', label: 'Solicitar Orçamento Grátis' }}
              />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Eng. Civil CREA-CE: <strong>7880/D</strong> - RNP: 060196010-6</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>+30 anos de atuação</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Fortaleza e Região Metropolitana</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
