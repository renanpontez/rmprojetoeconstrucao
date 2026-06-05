/**
 * Lists every doc in the dataset grouped by `_type`. Read-only diagnostic.
 *
 * Usage: npm run inspect:sanity
 */
import { config as loadEnv } from 'dotenv'
import { resolve } from 'node:path'
import { createClient } from '@sanity/client'

loadEnv({ path: resolve(process.cwd(), '.env.local') })
loadEnv({ path: resolve(process.cwd(), '.env') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_READ_TOKEN || process.env.SANITY_WRITE_TOKEN

if (!projectId) {
  console.error('✖ NEXT_PUBLIC_SANITY_PROJECT_ID is required')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

type Row = { _id: string; _type: string; title?: string; name?: string }

async function main() {
  console.log(`\n✦ Inspecting ${projectId}/${dataset}\n`)
  const rows = await client.fetch<Row[]>(
    `*[!(_id in path("drafts.**"))]{ _id, _type, title, name } | order(_type asc, _id asc)`,
  )
  if (!rows.length) {
    console.log('  (empty dataset — run `npm run seed` to populate)')
    return
  }
  const groups = new Map<string, Row[]>()
  for (const r of rows) {
    const key = r._type
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(r)
  }
  for (const [type, items] of [...groups.entries()].sort()) {
    console.log(`${type}  (${items.length})`)
    for (const it of items) {
      const label = it.title || it.name || ''
      console.log(`  · ${it._id}${label ? ` — ${label}` : ''}`)
    }
  }
}

main().catch((err) => {
  console.error('✖ inspect failed:', err)
  process.exit(1)
})
