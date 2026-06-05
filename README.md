# RM Projetos & Construção

> Website institucional com Next.js + Sanity CMS + Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation

```bash
# Install dependencies (workspaces)
npm install

# Start development servers
npm run dev          # Next.js (http://localhost:3000)
npm run dev:studio   # Sanity Studio (http://localhost:3333)
```

## 📁 Monorepo Structure

```
robertofm/
├── apps/
│   ├── web/          # Next.js landing page (App Router)
│   │   ├── app/                 # routes (layout, page, privacy, api, sitemap, robots)
│   │   ├── components/
│   │   │   ├── page-builder/    # PageBuilder switch + 6 block wrappers
│   │   │   ├── sections/        # dumb props-only section components
│   │   │   ├── shared/          # header, footer, skip-to-content
│   │   │   └── ui/              # primitives (container, button, dialog…)
│   │   ├── sanity/              # client, env, queries, types, lib/
│   │   └── scripts/             # migrate-to-sanity, inspect-sanity
│   └── studio/       # Sanity Studio (schemas, structure, deploy)
└── package.json      # npm workspaces
```

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **CMS:** Sanity 5 (PageBuilder pattern — page.sections[] of typed blocks)
- **Styling:** Tailwind CSS + shadcn/ui
- **Hosting:** Vercel

## 📝 Available Scripts

```bash
npm run dev              # Start Next.js app
npm run dev:web          # Same as `dev`
npm run dev:studio       # Start Sanity Studio
npm run build            # Build web app (full Next build — used by CI)
npm run lint
npm run typecheck

# Sanity ops
npm run seed             # Idempotent seed; createIfNotExists per doc
npm run seed:dry         # Preview without writes
npm run seed:force       # createOrReplace (destructive)
npm run inspect:sanity   # Lists every doc grouped by _type
npm run studio:deploy    # Push standalone studio to <appId>.sanity.studio
```

## 🔐 Environment Variables

Copy `apps/web/.env.local.example` to `apps/web/.env.local` and fill in:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_WRITE_TOKEN=<editor token from sanity.io/manage>
SANITY_READ_TOKEN=<optional viewer token>
SANITY_REVALIDATE_SECRET=<openssl rand -hex 32>
NEXT_PUBLIC_GTM_ID=<optional>
```

And `apps/studio/.env`:

```bash
SANITY_STUDIO_PROJECT_ID=<same project id>
SANITY_STUDIO_DATASET=production
```

## 🧰 First-time Sanity setup

These steps are manual and need to be done once before the site renders content.

1. **Create the Sanity project** at https://sanity.io/manage → copy the project ID.
2. **Generate tokens** in the same dashboard (API → Tokens):
   - `SANITY_WRITE_TOKEN` — Editor role, used by the seed script and webhook bypass.
   - `SANITY_READ_TOKEN` — Viewer role (optional; falls back to write token).
   - `SANITY_REVALIDATE_SECRET` — generate locally: `openssl rand -hex 32`.
3. **Fill** `apps/web/.env.local` and `apps/studio/.env` with the values above.
4. **Seed the dataset** (uploads images, creates categories/services/portfolio/singletons + home page):
   ```bash
   npm run seed
   ```
   Re-running is safe; existing docs are skipped unless `--force` is passed.
5. **Deploy the standalone Studio** (interactive — uses your personal Sanity login):
   ```bash
   cd apps/studio && npx sanity deploy
   ```
   After the first deploy, paste the printed `appId` into `apps/studio/sanity.cli.ts`
   so subsequent deploys don't re-prompt.
6. **Register the revalidation webhook** in Sanity dashboard → API → Webhooks:
   - URL: `https://<prod-domain>/api/revalidate`
   - HTTP method: `POST`
   - Trigger on: Create, Update, Delete
   - Filter: `_type in ["page","service","portfolioItem","projectCategory","siteSettings","navigation","privacyPolicy"]`
   - Projection: `{"_type": _type, "slug": slug.current, "operation": delta::operation()}`
   - Headers: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
   - API version: `2024-01-01`
7. **Set the same env vars on Vercel** (Production + Preview if you want previews to render content).

After these steps, edits in Studio → publish → `/` invalidates within ~30s via the webhook.

## 🧪 Verifying locally

```bash
# Full build (catches all type and SSG errors — Vercel runs this exact command)
npm run build
```

If the page returns no sections at build time AND Sanity is configured, the build
fails loud with `[home] PAGE_QUERY for slug "home" returned no page or no sections`.
If Sanity is NOT configured (e.g. preview without secrets), the page returns a clean
404 instead.

## 📖 Architecture notes

- **Schema layout** (`apps/studio/schemaTypes/`): three folders — `objects/` (reusable structures like `cta`, `richHeadline`, `seo`), `documents/` (top-level types like `page`, `siteSettings`, `service`), and `blocks/` (typed section blocks referenced by `page.sections[]`).
- **PageBuilder** (`apps/web/components/page-builder/PageBuilder.tsx`): switch on `section._type` → calls a typed block wrapper that normalizes Sanity data into dumb section props. Section components never see Sanity types.
- **Soft env guards** (`apps/web/sanity/env.ts`): warn but never throw, so Vercel preview deploys without Sanity secrets don't crash the build.
- **ISR strategy**: dev = `no-store` (instant Studio edits); prod = 30s `revalidate` floor + tag/path invalidation from the webhook.

---

**Desenvolvido para RM Projetos & Construção** | Fortaleza/CE
