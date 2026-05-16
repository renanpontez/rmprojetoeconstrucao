import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

export const metadata: Metadata = {
  title: 'Engenheiro Civil em Fortaleza/CE | RM Projeto & Construção',
  description:
    'Engenharia, reformas e projetos com mais de 30 anos de experiência. Atendimento técnico responsável em Fortaleza/CE. Fale no WhatsApp.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
