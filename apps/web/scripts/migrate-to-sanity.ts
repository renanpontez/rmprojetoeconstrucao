/**
 * Idempotent seed for the RM Projeto & Construção dataset.
 *
 * Usage:
 *   npm run seed            — phases 1-8, createIfNotExists (preserves edits)
 *   npm run seed:dry        — log everything but don't write
 *   npm run seed:force      — createOrReplace (destructive; resets edits)
 *
 * Required env:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN
 *
 * Phases:
 *   1) Upload image assets (logos + Unsplash photos)
 *   2) projectCategory docs (5)
 *   3) service docs (4) — reference category assets
 *   4) portfolioItem docs (6) — reference categories + image assets
 *   5) siteSettings singleton
 *   6) navigation singleton
 *   7) privacyPolicy singleton
 *   8) page (home) singleton with sections[] composed of all 6 block types
 */

import { config as loadEnv } from 'dotenv'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createClient, type SanityClient } from '@sanity/client'

// Load .env.local first (Next.js convention), then fall back to .env.
loadEnv({ path: resolve(process.cwd(), '.env.local') })
loadEnv({ path: resolve(process.cwd(), '.env') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_WRITE_TOKEN

const args = new Set(process.argv.slice(2))
const DRY_RUN = args.has('--dry-run')
const FORCE = args.has('--force')

if (!projectId) {
  console.error('✖ NEXT_PUBLIC_SANITY_PROJECT_ID is required')
  process.exit(1)
}
if (!token && !DRY_RUN) {
  console.error('✖ SANITY_WRITE_TOKEN is required (run with --dry-run to skip)')
  process.exit(1)
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

type Span = { text: string; italic?: boolean }

function rh(lines: Span[][]) {
  return lines.map((spans, i) => ({
    _type: 'block',
    _key: `b${i + 1}`,
    style: 'normal',
    markDefs: [],
    children: spans.map((s, j) => ({
      _type: 'span',
      _key: `s${i + 1}-${j + 1}`,
      text: s.text,
      marks: s.italic ? ['italicAccent'] : [],
    })),
  }))
}

function imageRef(assetId: string) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

function ref(id: string, key?: string) {
  return key
    ? { _type: 'reference', _ref: id, _key: key }
    : { _type: 'reference', _ref: id }
}

async function createOrSkip(doc: { _id: string; _type: string; [k: string]: unknown }) {
  if (DRY_RUN) {
    console.log(`  · [dry] ${FORCE ? 'createOrReplace' : 'createIfNotExists'} ${doc._id}`)
    return
  }
  if (FORCE) {
    await client.createOrReplace(doc)
    console.log(`  ✓ replaced  ${doc._id}`)
    return
  }
  const existing = await client.getDocument(doc._id)
  if (existing) {
    console.log(`  · skip      ${doc._id} (exists — pass --force to overwrite)`)
    return
  }
  await client.create(doc)
  console.log(`  ✓ created   ${doc._id}`)
}

// ---------------------------------------------------------------------------
// Phase 1 — assets
// ---------------------------------------------------------------------------

type AssetSpec = {
  key: string
  source: { kind: 'url'; url: string } | { kind: 'file'; path: string; contentType: string }
  filename: string
}

const ASSETS: AssetSpec[] = [
  {
    key: 'logoDark',
    source: { kind: 'file', path: 'public/assets/img/rm-logo.svg', contentType: 'image/svg+xml' },
    filename: 'rm-logo.svg',
  },
  {
    key: 'logoLight',
    source: { kind: 'file', path: 'public/assets/img/rm-logo-white.svg', contentType: 'image/svg+xml' },
    filename: 'rm-logo-white.svg',
  },
  {
    key: 'heroBackground',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1280&fit=crop&q=85',
    },
    filename: 'hero-background.jpg',
  },
  {
    key: 'aboutPhoto',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=2000&fit=crop&q=85',
    },
    filename: 'about-canteiro.jpg',
  },
  {
    key: 'serviceResidencial',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'service-residencial.jpg',
  },
  {
    key: 'serviceComercial',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'service-comercial.jpg',
  },
  {
    key: 'serviceIndustrial',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'service-industrial.jpg',
  },
  {
    key: 'serviceReforma',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'service-reforma.jpg',
  },
  {
    key: 'portfolioResidenciaUnifamiliar',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'portfolio-residencia-unifamiliar.jpg',
  },
  {
    key: 'portfolioEdificioComercial',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'portfolio-edificio-comercial.jpg',
  },
  {
    key: 'portfolioGalpaoIndustrial',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'portfolio-galpao-industrial.jpg',
  },
  {
    key: 'portfolioReformaApartamento',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'portfolio-reforma-apartamento.jpg',
  },
  {
    key: 'portfolioCondominioResidencial',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'portfolio-condominio-residencial.jpg',
  },
  {
    key: 'portfolioRegularizacaoPredial',
    source: {
      kind: 'url',
      url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=900&fit=crop&q=85',
    },
    filename: 'portfolio-regularizacao-predial.jpg',
  },
]

async function uploadAssetIfMissing(spec: AssetSpec): Promise<string | null> {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $f][0]{ _id }`,
    { f: spec.filename },
  )
  if (existing?._id) {
    console.log(`  · reuse     ${spec.filename}`)
    return existing._id
  }
  if (DRY_RUN) {
    console.log(`  · [dry] upload ${spec.filename}`)
    return `image-placeholder-${spec.key}`
  }

  let body: Buffer
  let contentType: string
  if (spec.source.kind === 'url') {
    const res = await fetch(spec.source.url)
    if (!res.ok) throw new Error(`fetch ${spec.source.url} → ${res.status}`)
    const buf = await res.arrayBuffer()
    body = Buffer.from(buf)
    contentType = res.headers.get('content-type') || 'image/jpeg'
  } else {
    const filePath = resolve(process.cwd(), spec.source.path)
    body = await readFile(filePath)
    contentType = spec.source.contentType
  }

  const asset = await client.assets.upload('image', body, {
    filename: spec.filename,
    contentType,
  })
  console.log(`  ✓ uploaded  ${spec.filename}`)
  return asset._id
}

async function uploadAllAssets(): Promise<Record<string, string>> {
  const map: Record<string, string> = {}
  for (const spec of ASSETS) {
    const id = await uploadAssetIfMissing(spec)
    if (id) map[spec.key] = id
  }
  return map
}

// ---------------------------------------------------------------------------
// Phase 2-4 — collection docs
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { slug: 'residencial', name: 'Residencial', order: 1 },
  { slug: 'comercial', name: 'Comercial', order: 2 },
  { slug: 'industrial', name: 'Industrial', order: 3 },
  { slug: 'reforma', name: 'Reforma', order: 4 },
  { slug: 'regularizacao', name: 'Regularização', order: 5 },
]

async function seedCategories() {
  console.log('\n→ Phase 2: project categories')
  for (const c of CATEGORIES) {
    await createOrSkip({
      _id: `projectCategory-${c.slug}`,
      _type: 'projectCategory',
      name: c.name,
      slug: { _type: 'slug', current: c.slug },
      order: c.order,
    })
  }
}

type ServiceSeed = {
  slug: string
  title: string
  description: string
  iconName: string
  imageAssetKey: string
  order: number
}

const SERVICES: ServiceSeed[] = [
  {
    slug: 'projetos-residenciais',
    title: 'Projetos Residenciais',
    description:
      'Casas, sobrados e condomínios projetados sob medida — do anteprojeto à entrega das chaves.',
    iconName: 'Building2',
    imageAssetKey: 'serviceResidencial',
    order: 1,
  },
  {
    slug: 'projetos-comerciais',
    title: 'Projetos Comerciais',
    description:
      'Escritórios, lojas e edifícios corporativos com soluções estruturais eficientes e estética cuidada.',
    iconName: 'Home',
    imageAssetKey: 'serviceComercial',
    order: 2,
  },
  {
    slug: 'obras-industriais',
    title: 'Obras Industriais',
    description:
      'Galpões, naves industriais e estruturas metálicas com sistemas de proteção e prazos rigorosos.',
    iconName: 'HardHat',
    imageAssetKey: 'serviceIndustrial',
    order: 3,
  },
  {
    slug: 'reformas-regularizacoes',
    title: 'Reformas & Regularizações',
    description:
      'Reformas completas, laudos técnicos e regularização de imóveis com habite-se e ART emitidos.',
    iconName: 'Wrench',
    imageAssetKey: 'serviceReforma',
    order: 4,
  },
]

async function seedServices(assets: Record<string, string>) {
  console.log('\n→ Phase 3: services')
  for (const s of SERVICES) {
    await createOrSkip({
      _id: `service-${s.slug}`,
      _type: 'service',
      title: s.title,
      description: s.description,
      iconName: s.iconName,
      image: imageRef(assets[s.imageAssetKey]),
      order: s.order,
    })
  }
}

type PortfolioSeed = {
  slug: string
  title: string
  categorySlug: string
  location: string
  year: number
  imageAssetKey: string
  highlights: string[]
  order: number
}

const PORTFOLIO: PortfolioSeed[] = [
  {
    slug: 'residencia-unifamiliar',
    title: 'Residência Unifamiliar',
    categorySlug: 'residencial',
    location: 'Aldeota · Fortaleza/CE',
    year: 2023,
    imageAssetKey: 'portfolioResidenciaUnifamiliar',
    highlights: ['300m² construídos', 'Projeto arquitetônico completo', '3 suítes'],
    order: 1,
  },
  {
    slug: 'edificio-comercial',
    title: 'Edifício Comercial',
    categorySlug: 'comercial',
    location: 'Meireles · Fortaleza/CE',
    year: 2022,
    imageAssetKey: 'portfolioEdificioComercial',
    highlights: ['8 pavimentos', 'Estrutura em concreto armado', 'AVCB aprovado'],
    order: 2,
  },
  {
    slug: 'galpao-industrial',
    title: 'Galpão Industrial',
    categorySlug: 'industrial',
    location: 'Maracanaú/CE',
    year: 2023,
    imageAssetKey: 'portfolioGalpaoIndustrial',
    highlights: ['1200m² de área', 'Estrutura metálica', 'Sistema contra incêndio'],
    order: 3,
  },
  {
    slug: 'reforma-apartamento',
    title: 'Reforma de Apartamento',
    categorySlug: 'reforma',
    location: 'Cocó · Fortaleza/CE',
    year: 2024,
    imageAssetKey: 'portfolioReformaApartamento',
    highlights: ['Reforma completa', 'Novo layout', 'Acabamento premium'],
    order: 4,
  },
  {
    slug: 'condominio-residencial',
    title: 'Condomínio Residencial',
    categorySlug: 'residencial',
    location: 'Eusébio/CE',
    year: 2022,
    imageAssetKey: 'portfolioCondominioResidencial',
    highlights: ['12 casas', 'Área de lazer completa', 'Infraestrutura planejada'],
    order: 5,
  },
  {
    slug: 'regularizacao-predial',
    title: 'Regularização Predial',
    categorySlug: 'regularizacao',
    location: 'Fortaleza/CE',
    year: 2023,
    imageAssetKey: 'portfolioRegularizacaoPredial',
    highlights: ['Documentação completa', 'Habite-se aprovado', 'Registro de imóveis'],
    order: 6,
  },
]

async function seedPortfolio(assets: Record<string, string>) {
  console.log('\n→ Phase 4: portfolio items')
  for (const p of PORTFOLIO) {
    await createOrSkip({
      _id: `portfolioItem-${p.slug}`,
      _type: 'portfolioItem',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      category: ref(`projectCategory-${p.categorySlug}`),
      location: p.location,
      year: p.year,
      image: imageRef(assets[p.imageAssetKey]),
      highlights: p.highlights,
      order: p.order,
    })
  }
}

// ---------------------------------------------------------------------------
// Phase 5-7 — singletons
// ---------------------------------------------------------------------------

async function seedSiteSettings(assets: Record<string, string>) {
  console.log('\n→ Phase 5: siteSettings')
  await createOrSkip({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'RM Projeto & Construção',
    legalName: 'RM Projeto & Construção',
    logos: {
      dark: imageRef(assets.logoDark),
      light: imageRef(assets.logoLight),
    },
    contacts: {
      whatsappLabel: '+55 85 99988-0988',
      whatsappHref: 'https://wa.me/5585999880988',
      email: 'dr.robertofm@gmail.com',
    },
    location: { city: 'Fortaleza', state: 'CE', region: 'Ceará, Brasil' },
    legal: {
      professionalTitle: 'Engenheiro Civil',
      responsibleName: 'Roberto Martins',
      creaUF: 'CE',
      creaNumber: '7880/D',
      rnp: '060196010-6',
      cnpj: '12.345.678/0001-12',
    },
    defaultSeo: {
      title: 'Engenheiro Civil em Fortaleza/CE',
      description:
        'Engenharia, reformas e projetos com mais de 30 anos de experiência. Atendimento técnico responsável em Fortaleza/CE. Fale no WhatsApp.',
    },
    primaryCta: {
      _type: 'cta',
      label: 'Chamar no WhatsApp',
      kind: 'whatsapp',
      href: 'https://wa.me/5585999880988',
      eventName: 'cta_click',
    },
  })
}

async function seedNavigation() {
  console.log('\n→ Phase 6: navigation')
  const nav = (label: string, href: string, suffix: string) => ({
    _key: `nav-${suffix}`,
    _type: 'navLink',
    label,
    href,
  })

  await createOrSkip({
    _id: 'navigation',
    _type: 'navigation',
    primaryNav: [
      nav('Sobre nós', '#sobre', 'sobre'),
      nav('Serviços', '#servicos', 'servicos'),
      nav('Projetos', '#projetos', 'projetos'),
      nav('Contato', '#contato', 'contato'),
    ],
    footerNav: [
      nav('Sobre nós', '#sobre', 'fsobre'),
      nav('Serviços', '#servicos', 'fservicos'),
      nav('Projetos', '#projetos', 'fprojetos'),
      nav('Contato', '#contato', 'fcontato'),
      nav('Política de Privacidade', '/politica-de-privacidade', 'fprivacy'),
    ],
    footerBio:
      'Engenharia civil, reformas e projetos estruturais com mais de 30 anos de experiência em Fortaleza/CE.',
    footerCopyrightSignature: 'Eng. Civil Roberto Martins — CREA-CE 7880/D',
  })
}

async function seedPrivacyPolicy() {
  console.log('\n→ Phase 7: privacyPolicy')

  const heading = (text: string, key: string) => ({
    _type: 'block',
    _key: key,
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }],
  })

  const para = (
    text: string,
    key: string,
    extras: { link?: { text: string; href: string } } = {},
  ) => {
    const children: Array<{
      _type: 'span'
      _key: string
      text: string
      marks: string[]
    }> = []
    const markDefs: Array<{ _type: 'link'; _key: string; href: string }> = []

    if (extras.link) {
      const linkKey = `${key}-mark`
      markDefs.push({ _type: 'link', _key: linkKey, href: extras.link.href })
      children.push({ _type: 'span', _key: `${key}-s1`, text, marks: [] })
      children.push({
        _type: 'span',
        _key: `${key}-s2`,
        text: extras.link.text,
        marks: [linkKey],
      })
    } else {
      children.push({ _type: 'span', _key: `${key}-s1`, text, marks: [] })
    }

    return {
      _type: 'block',
      _key: key,
      style: 'normal',
      markDefs,
      children,
    }
  }

  await createOrSkip({
    _id: 'privacyPolicy',
    _type: 'privacyPolicy',
    title: 'Política de Privacidade',
    lastUpdated: new Date().toISOString(),
    body: [
      heading('1. Informações Gerais', 'h1'),
      para(
        'A RM Projeto & Construção respeita a sua privacidade. Este documento descreve como coletamos, usamos e protegemos suas informações pessoais.',
        'p1',
      ),
      heading('2. Coleta de Dados', 'h2'),
      para(
        'Atualmente, não coletamos dados pessoais através de formulários em nosso site. Todo contato é realizado através de canais externos (WhatsApp e E-mail).',
        'p2',
      ),
      heading('3. Uso de Cookies', 'h3'),
      para(
        'Nosso site pode utilizar cookies para melhorar sua experiência de navegação e coletar estatísticas de uso através do Google Analytics (quando configurado).',
        'p3',
      ),
      heading('4. Compartilhamento de Dados', 'h4'),
      para(
        'Não compartilhamos, vendemos ou alugamos suas informações pessoais a terceiros.',
        'p4',
      ),
      heading('5. Contato', 'h5'),
      para('Para questões sobre privacidade, entre em contato através do e-mail: ', 'p5', {
        link: { text: 'dr.robertofm@gmail.com', href: 'mailto:dr.robertofm@gmail.com' },
      }),
      heading('6. Alterações', 'h6'),
      para(
        'Esta política pode ser atualizada periodicamente. Recomendamos a revisão regular desta página.',
        'p6',
      ),
    ],
  })
}

// ---------------------------------------------------------------------------
// Phase 8 — page(home)
// ---------------------------------------------------------------------------

function buildPageDoc(assets: Record<string, string>) {
  const heroSection = {
    _type: 'heroSection',
    _key: 'sec-hero',
    eyebrow: 'Engenharia Civil · Desde 1992',
    headline: rh([
      [
        { text: 'Construímos com ' },
        { text: 'precisão', italic: true },
        { text: ',' },
      ],
      [
        { text: ' entregamos com ' },
        { text: 'confiança', italic: true },
        { text: '.' },
      ],
    ]),
    subhead:
      'Projetos, obras e reformas residenciais e comerciais em Fortaleza, com requinte nos acabamentos, rigor técnico e responsabilidade de engenheiro civil com CREA-CE ativo.',
    backgroundImage: imageRef(assets.heroBackground),
    primaryCta: {
      _type: 'cta',
      label: 'Solicitar Orçamento Grátis',
      kind: 'whatsapp',
      href: 'https://wa.me/5585999880988',
      eventName: 'cta_click',
    },
    secondaryLinkText: 'Ver projetos realizados',
    secondaryLinkHref: '#projetos',
    locationLabel: 'Ceará · Brasil',
    scrollLabel: 'Role para explorar',
    credentialsCard: {
      brandLabel: 'RM · Projeto & Construção',
      stats: [
        { _key: 'st1', _type: 'stat', value: '+30', label: 'Anos' },
        { _key: 'st2', _type: 'stat', value: '100+', label: 'Projetos' },
        { _key: 'st3', _type: 'stat', value: '100%', label: 'com ART' },
      ],
      creaLabel: 'Eng. Civil CREA-CE',
      rnpLabel: 'RNP',
      serviceAreaLabel: 'Atendimento',
    },
  }

  const aboutSection = {
    _type: 'aboutSection',
    _key: 'sec-about',
    index: '01',
    eyebrow: 'Sobre Nós',
    statement:
      'Transformamos sonhos em realidade, através de projetos arrojados de engenharia, executados com qualidade, segurança e compromisso com os prazos.',
    secondaryLinkText: 'Conhecer nossos projetos',
    secondaryLinkHref: '#projetos',
    definitions: [
      {
        _key: 'd1',
        _type: 'definitionItem',
        term: 'Especialidade',
        definition: 'Engenharia civil, projetos estruturais, reformas e regularizações',
      },
      {
        _key: 'd2',
        _type: 'definitionItem',
        term: 'Atuação',
        definition: 'Fortaleza e Região Metropolitana — Ceará, Brasil',
      },
      {
        _key: 'd3',
        _type: 'definitionItem',
        term: 'Responsável Técnico',
        definition: 'Eng. Roberto Martins — CREA-CE 7880/D',
      },
    ],
    stats: [
      { _key: 'as1', _type: 'stat', value: '100+', label: 'Projetos Concluídos' },
      { _key: 'as2', _type: 'stat', value: '+30', label: 'Anos de Experiência' },
      { _key: 'as3', _type: 'stat', value: '100%', label: 'Obras com ART' },
    ],
    image: imageRef(assets.aboutPhoto),
    captions: [
      {
        _key: 'cap1',
        _type: 'imageCaption',
        position: 'bottomLeft',
        text: 'Canteiro · Fortaleza',
        italic: false,
      },
      {
        _key: 'cap2',
        _type: 'imageCaption',
        position: 'bottomRight',
        text: 'Precisão em cada detalhe',
        italic: true,
      },
    ],
  }

  const servicesSection = {
    _type: 'servicesSection',
    _key: 'sec-services',
    index: '02',
    eyebrow: 'Serviços',
    headline: rh([
      [
        { text: 'Engenharia civil de ponta a ponta — ' },
        { text: 'do projeto à entrega', italic: true },
        { text: '.' },
      ],
    ]),
    description:
      'Projetos estruturais, laudos técnicos, regularização de obras e acompanhamento técnico em Fortaleza e região metropolitana.',
    items: SERVICES.map((s, i) =>
      ref(`service-${s.slug}`, `svc-ref-${i + 1}`),
    ),
  }

  const ctaFormSection = {
    _type: 'ctaFormSection',
    _key: 'sec-cta',
    eyebrow: 'Sem tempo para ligar?',
    headline: rh([
      [
        { text: 'Deixe seu telefone — nós ' },
        { text: 'retornamos', italic: true },
        { text: ' em minutos.' },
      ],
    ]),
    description:
      'Atendimento direto via WhatsApp com engenheiro civil. Sem intermediários, sem espera longa.',
    inputLabel: 'Telefone com DDD',
    inputPlaceholder: '(85) 99999-9999',
    buttonLabel: 'Solicitar contato',
    buttonLoadingLabel: 'Enviando…',
    footerNote: 'Respeitamos sua privacidade. Sem spam, apenas informações relevantes.',
    whatsappHref: 'https://wa.me/5585999880988',
    messageTemplate:
      'Olá! Gostaria de receber mais informações sobre projetos de construção. Meu telefone é: {phone}',
  }

  const portfolioSection = {
    _type: 'portfolioSection',
    _key: 'sec-portfolio',
    index: '03',
    eyebrow: 'Portfólio',
    headline: rh([
      [
        { text: 'Obras que falam por nós — ' },
        { text: 'cada projeto, uma assinatura', italic: true },
        { text: '.' },
      ],
    ]),
    subtitle:
      'Uma seleção de empreendimentos residenciais, comerciais e industriais entregues nos últimos anos.',
    items: PORTFOLIO.map((p, i) =>
      ref(`portfolioItem-${p.slug}`, `pf-ref-${i + 1}`),
    ),
  }

  const contactSection = {
    _type: 'contactSection',
    _key: 'sec-contact',
    index: '04',
    eyebrow: 'Contato',
    headline: rh([
      [
        { text: 'Vamos conversar sobre o seu ' },
        { text: 'próximo projeto', italic: true },
        { text: '.' },
      ],
    ]),
    subtitle:
      'Atendimento direto com engenheiro civil — respondemos rapidamente em qualquer um dos canais abaixo.',
    methods: [
      {
        _key: 'm1',
        _type: 'contactMethod',
        iconName: 'Phone',
        title: 'Telefone & WhatsApp',
        detail: '+55 85 99988-0988',
        href: 'https://wa.me/5585999880988',
      },
      {
        _key: 'm2',
        _type: 'contactMethod',
        iconName: 'Mail',
        title: 'E-mail',
        detail: 'dr.robertofm@gmail.com',
        href: 'mailto:dr.robertofm@gmail.com',
      },
      {
        _key: 'm3',
        _type: 'contactMethod',
        iconName: 'MapPin',
        title: 'Atendimento',
        detail: 'Fortaleza/CE & Região Metropolitana',
      },
      {
        _key: 'm4',
        _type: 'contactMethod',
        iconName: 'Clock',
        title: 'Horário',
        detail: 'Seg. a Sex. · 8h às 18h',
      },
    ],
    credentials: {
      creaLabel: 'CREA-CE',
      creaValue: '7880/D',
      rnpLabel: 'RNP',
      rnpValue: '060196010-6',
      responsibleLabel: 'Responsável',
      responsibleValue: 'Eng. Roberto Martins',
    },
    whatsappCard: {
      label: 'Resposta em minutos',
      headline: rh([
        [
          { text: 'Atendimento direto via ' },
          { text: 'WhatsApp', italic: true },
        ],
      ]),
      description:
        'Clique no botão e fale agora com o engenheiro civil responsável. Sem intermediários.',
      ctaLabel: 'Abrir WhatsApp',
      ctaHref: 'https://wa.me/5585999880988',
    },
  }

  return {
    _id: 'page-home',
    _type: 'page',
    title: 'Home',
    slug: { _type: 'slug', current: 'home' },
    seo: {
      title: 'Engenheiro Civil em Fortaleza/CE',
      description:
        'Engenharia, reformas e projetos com mais de 30 anos de experiência. Atendimento técnico responsável em Fortaleza/CE. Fale no WhatsApp.',
    },
    sections: [
      heroSection,
      aboutSection,
      servicesSection,
      ctaFormSection,
      portfolioSection,
      contactSection,
    ],
  }
}

async function seedHomePage(assets: Record<string, string>) {
  console.log('\n→ Phase 8: page(home)')
  await createOrSkip(buildPageDoc(assets))
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  console.log(
    `\n✦ RM Projeto & Construção seed${DRY_RUN ? ' [DRY RUN]' : ''}${FORCE ? ' [FORCE]' : ''}`,
  )
  console.log(`  projectId: ${projectId}`)
  console.log(`  dataset:   ${dataset}`)
  console.log('')

  console.log('→ Phase 1: assets')
  const assets = await uploadAllAssets()

  await seedCategories()
  await seedServices(assets)
  await seedPortfolio(assets)
  await seedSiteSettings(assets)
  await seedNavigation()
  await seedPrivacyPolicy()
  await seedHomePage(assets)

  console.log('\n✓ done.')
}

main().catch((err) => {
  console.error('\n✖ seed failed:', err)
  process.exit(1)
})
