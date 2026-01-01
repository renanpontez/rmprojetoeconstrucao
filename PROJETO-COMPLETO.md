# RM Projetos & Construção - Especificação Completa do Build

> **Versão:** 0.2.3 | **Fase atual:** BUILD (Gate OPEN) | **Última atualização:** 2025-12-30

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Informações do Negócio](#informações-do-negócio)
3. [Stack Tecnológica](#stack-tecnológica)
4. [Estrutura do Monorepo](#estrutura-do-monorepo)
5. [Design System & UI](#design-system--ui)
6. [Schemas do CMS (Sanity)](#schemas-do-cms-sanity)
7. [Componentes & Seções](#componentes--seções)
8. [SEO & Analytics](#seo--analytics)
9. [Deployment](#deployment)
10. [Checklist de QA & Launch](#checklist-de-qa--launch)
11. [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## 🎯 Visão Geral

### Objetivo
Implementar uma landing page institucional single-page + CMS headless + deploy em produção (Vercel) para a empresa de engenharia civil RM Projetos & Construção, com foco em conversão via WhatsApp.

### Decisões Arquiteturais Principais
- **Framework:** Next.js 14+ (App Router) com TypeScript
- **CMS:** Sanity v3 (hosted Studio recomendado)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Conversão:** WhatsApp-only (sem formulário de contato)
- **Analytics:** Google Tag Manager + GA4 (opcional)

### Metas de Performance
- Lighthouse Performance: **≥ 90**
- Lighthouse Accessibility: **≥ 95**
- Lighthouse SEO: **≥ 90**

---

## 🏢 Informações do Negócio

### Dados da Empresa
```json
{
  "brand_name": "RM Projetos & Construção",
  "description": "Empresa cearense gerida pelo engenheiro civil Roberto Martins.",
  "cnpj": "1234567890001-12",
  "email": "dr.robertofm@gmail.com",
  "whatsapp": "+55 85 99988-0988",
  "whatsapp_link": "https://wa.me/5585999880988",
  "crea": {
    "uf": "CE",
    "number": "123456",
    "display": "CREA-CE: 123456"
  },
  "service_area": {
    "city": "Fortaleza",
    "state": "CE",
    "country": "BR"
  }
}
```

### CTA Principal
- **Canal único:** WhatsApp
- **Label padrão:** "Chamar no WhatsApp"
- **Tracking:** Evento `cta_click` em todos os botões/links WhatsApp

### Assets
- **Imagens reais:** Não disponíveis ainda
- **Placeholders permitidos:** placeholder.co, Pexels, Unsplash
- **Hero:** ~1600w construction-themed
- **Portfolio:** 6-9 imagens com aspect ratio 4:3

---

## 🛠 Stack Tecnológica

### Web App (`apps/web`)
```json
{
  "framework": "Next.js (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS + shadcn/ui",
  "ui_primitives": "shadcn/ui (Radix) extended via local wrappers",
  "forms": "react-hook-form + zod",
  "icons": "lucide-react",
  "images": "next/image",
  "linting": "eslint + prettier"
}
```

### CMS (`apps/studio`)
```json
{
  "provider": "Sanity v3",
  "studio_location": "apps/studio",
  "datasets": ["development", "production"]
}
```

### Deploy
```json
{
  "hosting": "Vercel",
  "cms_hosting": "Sanity hosted Studio (recommended)",
  "env_management": "Vercel environment variables"
}
```

### Analytics (Opcional)
- Google Tag Manager + GA4
- Vercel Analytics
- Vercel Speed Insights

---

## 📁 Estrutura do Monorepo

### Organização npm workspaces
```
robertofm/
├── apps/
│   ├── web/              # Next.js landing page
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (site)/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── politica-de-privacidade/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── sitemap.ts
│   │   │   │   └── robots.ts
│   │   │   ├── components/
│   │   │   │   ├── sections/        # Hero, About, Services, etc.
│   │   │   │   ├── shared/          # Header, Footer, SkipToContent
│   │   │   │   └── ui/              # shadcn generated + wrappers
│   │   │   ├── lib/
│   │   │   │   ├── sanity/
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── queries.ts
│   │   │   │   │   └── image.ts
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── track.ts
│   │   │   │   │   └── events.ts
│   │   │   │   └── seo/
│   │   │   │       ├── jsonld.ts
│   │   │   │       └── metadata.ts
│   │   │   └── styles/
│   │   │       └── globals.css
│   │   ├── public/
│   │   │   ├── og.png
│   │   │   └── favicon.ico
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── studio/           # Sanity Studio
│       ├── sanity.config.ts
│       ├── schemaTypes/
│       │   ├── index.ts
│       │   ├── documents/
│       │   │   ├── siteSettings.ts
│       │   │   ├── landingPage.ts
│       │   │   ├── service.ts
│       │   │   └── portfolioItem.ts
│       │   └── objects/
│       │       ├── cta.ts
│       │       └── ctaBlock.ts
│       └── package.json
│
└── package.json          # npm workspaces config
├── .editorconfig
├── .gitignore
└── README.md
```

---

## 🎨 Design System & UI

### Tailwind Config Overrides (`theme.extend`)

**Decisão:** Usar overrides no `tailwind.config.ts` ao invés de sistema complexo de CSS variables.

#### Colors (semantic mapping)
```ts
// Mapear tokens de experience para cores semânticas Tailwind
colors: {
  primary: { /* azul profissional */ },
  secondary: { /* amarelo/dourado */ },
  accent: { /* verde confiança */ },
  surface: { /* backgrounds */ },
  border: { /* divisórias */ },
  text: { /* hierarquia tipográfica */ }
}
```

#### Outros tokens
```ts
{
  borderRadius: {
    sm: '...',
    md: '...',
    lg: '...'
  },
  boxShadow: {
    sm: '...',
    md: '...'
  },
  fontFamily: {
    sans: ['var(--font-inter)', 'sans-serif']
  }
}
```

### shadcn/ui Components

#### Base Components (via `npx shadcn@latest add`)
- `button`
- `card`
- `badge`
- `input`
- `textarea`
- `dialog`
- `sheet`
- `separator`

#### Custom Wrappers (`src/components/ui/`)
1. **Container**
   - Max-width responsivo
   - Padding lateral consistente

2. **SectionHeading**
   - Title + optional subtitle
   - Spacing consistente

3. **CTAButton**
   - Bind analytics (cta_click event)
   - WhatsApp href binding
   - Variantes (primary/secondary)

4. **NavLink**
   - Anchor scroll suave
   - Focus-visible styles

---

## 📊 Schemas do CMS (Sanity)

### 1. siteSettings (Singleton)

**Campos:**
```ts
{
  siteName: string
  logo: image
  contacts: {
    whatsapp: string
    email: string
  }
  serviceArea: {
    city: string
    state: string
  }
  legal: {
    professionalTitle: string
    creaNumber: string
    creaUF: string
    cnpj: string
    legalName: string
  }
  primaryCTA: cta
  seoDefaults: {
    titleTemplate: string
    defaultDescription: text
    ogImage: image
  }
}
```

**Seed Values (Development):**
```json
{
  "siteName": "RM Projetos & Construção",
  "contacts": {
    "whatsapp": "+55 85 99988-0988",
    "email": "dr.robertofm@gmail.com"
  },
  "serviceArea": {
    "city": "Fortaleza",
    "state": "CE"
  },
  "legal": {
    "professionalTitle": "Engenheiro Civil",
    "creaUF": "CE",
    "creaNumber": "123456",
    "cnpj": "1234567890001-12"
  }
}
```

---

### 2. landingPage (Singleton)

**Campos:**
```ts
{
  hero: {
    headline: string
    subheadline: text
    image: image
    primaryCTAOverride?: cta
  }
  about: {
    title: string
    body: blockContent[]
    founderName: string
    founderRole: string
    portrait: image
    trustItems: string[]
  }
  services: reference[] → service
  portfolio: reference[] → portfolioItem
  ctaBlocks: ctaBlock[]
}
```

---

### 3. service (Document)

**Campos:**
```ts
{
  title: string
  description: text
  icon: string  // lucide-react icon name
  order: number
}
```

---

### 4. portfolioItem (Document)

**Campos:**
```ts
{
  title: string
  summary: text
  type: string  // 'residential' | 'commercial' | 'industrial'
  location: string
  year: number
  images: image[]
  highlights: string[]
}
```

---

### 5. cta (Object)

**Campos:**
```ts
{
  label: string
  type: 'primary' | 'secondary'
  href: url
  eventName: string  // analytics event name
}
```

---

### 6. ctaBlock (Object)

**Campos:**
```ts
{
  headline: string
  supportingText: text
  cta: cta
  secondaryCta?: cta
}
```

---

## 🧩 Componentes & Seções

### Layout Components

#### 1. SkipToContent
```tsx
// Accessibility: skip link para navegação por teclado
<a href="#main-content" className="sr-only focus:not-sr-only">
  Pular para o conteúdo
</a>
```

#### 2. HeaderSticky
```tsx
// Nav com logo, menu desktop, WhatsApp CTA, menu mobile (Sheet)
// Sticky com estilo alterado ao scroll
// Anchors: #sobre #servicos #projetos #contato
```

#### 3. Footer
```tsx
// Contatos, CREA, CNPJ, links legais, copyright
```

---

### Section Components

#### 1. HeroSection
```tsx
// H1 único da página
// Headline + subheadline + hero image (1600w placeholder)
// Primary CTA (WhatsApp)
```

#### 2. AboutSection (`#sobre`)
```tsx
// Título + corpo rich text
// Foto do fundador (portrait)
// Trust items (bullets de credibilidade)
```

#### 3. ServicesGridSection (`#servicos`)
```tsx
// Grid responsivo de Cards
// Cada card: ícone (lucide-react) + título + descrição
// Dados via Sanity (services[])
```

#### 4. PrimaryCTASection
```tsx
// Mid-page conversion block
// Headline + supporting text + CTA grande
// Dados via Sanity (ctaBlocks[0])
```

#### 5. PortfolioGallerySection (`#projetos`)
```tsx
// Grid de projetos (6-9 items)
// Aspect ratio 4:3 consistente
// Click abre Dialog com detalhes
// Placeholders via Unsplash/Pexels
// Lazy-load com next/image
```

#### 6. ContactSection (`#contato`)
```tsx
// Informações de contato
// WhatsApp CTA destacado
// Opcional: mapa embed (Google Maps)
```

---

## 🔍 SEO & Analytics

### SEO Implementation

#### Metadata (Next.js Metadata API)
```ts
// src/lib/seo/metadata.ts
{
  title: "Engenheiro Civil em Fortaleza/CE | RM Projetos & Construção",
  description: "Engenharia, reformas e projetos com mais de 30 anos de experiência. Atendimento técnico responsável em Fortaleza/CE. Fale no WhatsApp.",
  openGraph: {
    images: ['/og.png']
  }
}
```

#### Structured Data (JSON-LD)
```ts
// src/lib/seo/jsonld.ts
// Tipos: ProfessionalService + Person
{
  "@type": "ProfessionalService",
  "name": "RM Projetos & Construção",
  "areaServed": {
    "@type": "City",
    "name": "Fortaleza",
    "containedInPlace": {
      "@type": "State",
      "name": "Ceará"
    }
  },
  "email": "dr.robertofm@gmail.com",
  "telephone": "+55 85 99988-0988",
  "founder": {
    "@type": "Person",
    "name": "Roberto Martins",
    "jobTitle": "Engenheiro Civil",
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "CREA",
      "value": "CREA-CE: 123456"
    }
  }
}
```

#### Sitemap & Robots
```ts
// src/app/sitemap.ts
// Rotas: / e /politica-de-privacidade

// src/app/robots.ts
// Allow: /
```

---

### Analytics (GTM Wrapper)

#### Track Function
```ts
// src/lib/analytics/track.ts
export function track(eventName: string, params?: Record<string, any>) {
  if (!process.env.NEXT_PUBLIC_GTM_ID) return; // noop se GTM não configurado

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params
  });
}
```

#### Event Definitions
```ts
// src/lib/analytics/events.ts
export const EVENTS = {
  CTA_CLICK: 'cta_click',
  PORTFOLIO_OPEN: 'portfolio_open',
  SCROLL_DEPTH: 'scroll_depth'
}

// Parâmetros por evento:
// cta_click: { cta_type, cta_label, section, href }
// portfolio_open: { item_title }
// scroll_depth: { percent }
```

#### Binding
- Header WhatsApp button → `cta_click`
- Hero CTA → `cta_click`
- PrimaryCTA block → `cta_click`
- Contact section WhatsApp → `cta_click`
- Portfolio item open → `portfolio_open`
- Scroll tracking (opcional) → `scroll_depth`

---

## 🚀 Deployment

### Vercel Deployment Steps

1. **Criar Git repo e push do monorepo**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <REPO_URL>
   git push -u origin main
   ```

2. **Criar projeto Vercel para apps/web**
   - Root Directory: `apps/web`
   - Framework Preset: Next.js
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

3. **Configurar variáveis de ambiente** (Preview + Production)
   - Ver seção [Variáveis de Ambiente](#variáveis-de-ambiente)

4. **Conectar domínio + definir NEXT_PUBLIC_SITE_URL**
   - Se domínio personalizado: adicionar DNS records
   - Atualizar `NEXT_PUBLIC_SITE_URL` para production

5. **Deploy preview e rodar QA checklist**
   - Ver [Checklist de QA](#checklist-de-qa--launch)

6. **Publicar conteúdo CMS no dataset production**
   - Sanity Studio: publish `siteSettings` e `landingPage`
   - Criar/publicar ao menos 3 `service` e 6 `portfolioItem`

7. **Deploy production**
   - Merge para branch main
   - Verificar deploy automático
   - Monitorar Vercel logs

---

### Sanity Studio Hosting

**Recomendado:** Sanity hosted Studio

**Alternativa:** Self-host em `yourdomain.com/studio`
- Configurar route em Next.js ou deploy separado

---

## ✅ Checklist de QA & Launch

### Functional Checklist
- [ ] Anchors (#sobre #servicos #projetos #contato) scrollam corretamente
- [ ] Todos os CTAs WhatsApp abrem link correto `wa.me/5585999880988`
- [ ] Header sticky funciona (estilo muda ao scroll)
- [ ] Portfolio grid renderiza 6+ placeholders com aspect ratio 4:3
- [ ] Menu mobile (Sheet) abre e fecha corretamente
- [ ] Skip link funciona via teclado

### SEO Checklist
- [ ] Title inclui "Fortaleza/CE"
- [ ] Meta description presente e correta
- [ ] JSON-LD valida em [Schema.org validator](https://validator.schema.org/)
- [ ] `/sitemap.xml` acessível
- [ ] `/robots.txt` acessível
- [ ] H1 único (hero headline)

### Performance Checklist
- [ ] Hero image não oversized; LCP < 2.5s
- [ ] Sem CLS perceptível ao carregar
- [ ] Scripts de terceiros minimizados (apenas GTM se configurado)
- [ ] Lazy-load em portfolio images

### Accessibility Checklist
- [ ] Um H1 apenas
- [ ] Tab order faz sentido
- [ ] Focus-visible visível em todos os interativos
- [ ] `<nav>` é landmark
- [ ] Sheet (menu mobile) é acessível via teclado
- [ ] Alt text em todas as imagens (incluindo placeholders)

### Launch Steps
- [ ] Conteúdo final publicado no Sanity (dataset production)
- [ ] Lighthouse final run (Performance ≥90, A11y ≥95, SEO ≥90)
- [ ] GTM events verificados em preview mode (se enabled)
- [ ] Monitoramento Vercel logs pós-launch (primeiras 24h)
- [ ] WhatsApp testado em mobile real
- [ ] DNS propagado (se domínio custom)

---

## 🔐 Variáveis de Ambiente

### apps/web (.env.local)

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Production: https://yourdomain.com

# Sanity
SANITY_PROJECT_ID=<your_project_id>
SANITY_DATASET=development  # Production: production
SANITY_API_VERSION=2024-01-01

# Analytics (opcional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### apps/studio (.env.local)

```bash
SANITY_STUDIO_PROJECT_ID=<your_project_id>
SANITY_STUDIO_DATASET=development  # Production: production
SANITY_STUDIO_API_VERSION=2024-01-01
```

### Vercel Environment Variables

**Preview:**
- `NEXT_PUBLIC_SITE_URL` → URL de preview Vercel
- `SANITY_DATASET` → `development`
- `NEXT_PUBLIC_GTM_ID` → (vazio ou GTM de teste)

**Production:**
- `NEXT_PUBLIC_SITE_URL` → Domínio final
- `SANITY_DATASET` → `production`
- `NEXT_PUBLIC_GTM_ID` → GTM production ID

---

## 📝 Notas Adicionais

### Política de Privacidade
- Rota `/politica-de-privacidade` criada como placeholder
- Não é obrigatória para WhatsApp-only (sem coleta de dados via form)
- Pode ser expandida futuramente se adicionar formulários

### Fallback de Conteúdo
- **Dev:** Se CMS vazio, permitir conteúdo seed hardcoded
- **Prod:** Exigir `siteSettings` + `landingPage` publicados; mostrar UI mínima safe se ausente

### Revalidação de Cache
- Fetch de Sanity com `revalidate: 3600` (1 hora)
- Revalidação manual via Sanity webhook (implementação futura opcional)

### Imagens
- **Hero:** ~1600px width, construction-themed (Unsplash/Pexels)
- **Portfolio:** 6-9 imagens, aspect 4:3, construction projects
- **Founder portrait:** Professional headshot placeholder
- **Logo:** Placeholder ou fornecido pelo cliente

---

## 🎯 Resumo Executivo

Este documento especifica **todos** os requisitos, decisões técnicas e entregáveis para o build completo do site RM Projetos & Construção.

**Stack:** Next.js + Sanity + Vercel
**Foco:** Conversão via WhatsApp
**SEO:** Local (Fortaleza/CE) otimizado
**Timeline:** Seguir steps S00-S11 do execution protocol

**Próximo passo:** Confirmar pré-requisitos (Node, npm, Git) e iniciar S01 (bootstrap monorepo).

---

## 🎨 Style Guide & Design Patterns (Updated)

### Hero Section Pattern
**Decision:** Full-viewport background image with transparent header overlay

**Implementation:**
```tsx
// Full-height hero with background image
<section className="relative flex min-h-screen items-center overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image src="..." fill className="object-cover" priority />
    {/* Dark overlay for text readability */}
    <div className="absolute inset-0 bg-black/50" />
  </div>

  {/* Content */}
  <Container className="relative z-10 py-32">
    <div className="max-w-3xl">
      {/* White text on dark background */}
      <h1 className="text-white">...</h1>
      <p className="text-white/90">...</p>
    </div>
  </Container>
</section>
```

**Key Principles:**
- Full viewport height (`min-h-screen`)
- Background image covers entire viewport
- Dark overlay (50% black) for text contrast
- White text with high contrast
- Content max-width constrained (max-w-3xl)
- Image priority loading for hero

### Header Pattern
**Decision:** Fixed transparent header that transitions to solid on scroll

**States:**
1. **Transparent (at top):**
   - No background
   - White text
   - No border
   - Height: 80px (h-20)

2. **Solid (scrolled):**
   - White background with blur
   - Dark text
   - Border bottom
   - Shadow

**Implementation:**
```tsx
// Header changes based on scroll position
const [isScrolled, setIsScrolled] = useState(false)

<header className={cn(
  'fixed top-0 z-50 w-full transition-all duration-300',
  isScrolled
    ? 'border-b bg-background/95 shadow-sm backdrop-blur'
    : 'border-b-transparent bg-transparent'
)}>
  {/* Logo color changes */}
  <Link className={cn(
    'text-xl font-bold transition-colors',
    isScrolled ? 'text-foreground' : 'text-white'
  )}>
    RM Projetos
  </Link>

  {/* Nav links color changes */}
  <button className={cn(
    isScrolled
      ? 'text-foreground hover:text-primary'
      : 'text-white/90 hover:text-white'
  )}>
    Menu Item
  </button>
</header>
```

**Key Principles:**
- Fixed position (not sticky)
- Smooth transition (300ms)
- All text elements change color based on scroll
- CTA button variant changes (default → secondary)
- Mobile menu background also adapts
- No layout shift on scroll (consistent height)

### Container Pattern
**Decision:** Consistent narrower max-width across all sections

**Implementation:**
```tsx
// Container component with max-width constraint
<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

**Key Principles:**
- Max-width: 1152px (max-w-6xl)
- Responsive padding: 16px mobile, 24px tablet, 32px desktop
- Center aligned
- Applied to ALL sections consistently

### Services Section Pattern
**Decision:** Two-column layout with text content + image grid

**Layout:**
- **Left column:** Title, description, CTA button
- **Right column:** 2x2 grid of service cards with background images

**Implementation:**
```tsx
<section>
  <Container>
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Left: Text Content */}
      <div className="flex flex-col justify-center space-y-6">
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">Serviços</h2>
        <p className="text-lg text-muted-foreground">Description...</p>
        <Button variant="outline" size="lg">Learn More</Button>
      </div>

      {/* Right: 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <div className="group relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src={service.image} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <Icon className="h-5 w-5 text-white bg-white/10 backdrop-blur" />
              <h3 className="text-white font-bold">{service.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Container>
</section>
```

**Key Principles:**
- 2-column desktop layout (stacks on mobile)
- Service cards: 4:3 aspect ratio
- Background images with gradient overlay
- Icon in frosted glass container (bg-white/10 + backdrop-blur)
- White text on dark images
- Hover effect: scale image (105%)
- 4 services only (2x2 grid)

### Pattern Summary
✅ **Hero always full-height** with background image
✅ **Header always transparent at top**, solid when scrolled
✅ **High contrast** white text on dark backgrounds
✅ **Smooth transitions** for all state changes
✅ **Mobile-first** responsive behavior
✅ **Consistent max-width** (1152px) across all sections
✅ **Split layouts** for content-heavy sections (text + visual grid)

---

**Documento vivo:** Atualizar conforme mudanças aprovadas durante o build.
