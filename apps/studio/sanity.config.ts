import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Schemas + sidebar structure are owned by apps/web so both the embedded
// Next.js Studio (/studio) and this standalone one stay in sync from a single
// source of truth.
import { schemaTypes } from '../web/sanity/studio/schemas'
import { deskStructure } from '../web/sanity/studio/structure'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  ''
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

export default defineConfig({
  name: 'rm-projetos-construcao',
  title: 'RM Projeto & Construção',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
