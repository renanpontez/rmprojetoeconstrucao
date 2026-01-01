# RM Projetos & Construção

> Website institucional com Next.js + Sanity CMS + Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Or start individually
npm run dev:web      # Next.js (http://localhost:3000)
npm run dev:studio   # Sanity Studio (http://localhost:3333)
```

## 📁 Monorepo Structure

```
robertofm/
├── apps/
│   ├── web/          # Next.js landing page
│   └── studio/       # Sanity Studio CMS
└── package.json      # npm workspaces
```

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **CMS:** Sanity v3
- **Styling:** Tailwind CSS + shadcn/ui
- **Language:** TypeScript
- **Hosting:** Vercel

## 📝 Available Scripts

```bash
npm run dev          # Start Next.js app
npm run dev:web      # Start only Next.js
npm run dev:studio   # Start only Sanity Studio
npm run build        # Build web app
npm run build:all    # Build all apps
npm run lint         # Lint all workspaces
npm run format       # Format with Prettier
npm run typecheck    # TypeScript check all workspaces
```

## 🔐 Environment Variables

See documentation in [PROJETO-COMPLETO.md](PROJETO-COMPLETO.md)

## 📖 Documentation

Full project specification: [PROJETO-COMPLETO.md](PROJETO-COMPLETO.md)

---

**Desenvolvido para RM Projetos & Construção** | Fortaleza/CE
