import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Engenheiro Civil em Fortaleza/CE | RM Projetos & Construção',
  description:
    'Engenharia, reformas e projetos com mais de 30 anos de experiência. Atendimento técnico responsável em Fortaleza/CE. Fale no WhatsApp.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
