'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '../../studio/schemaTypes'
import { deskStructure } from '../../studio/structure'
import { apiVersion, dataset, projectId } from './env'

const studioConfig = defineConfig({
  basePath: '/studio',
  name: 'rm-projetos-construcao',
  title: 'RM Projeto & Construção',
  projectId,
  dataset,
  apiVersion,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
})

export default studioConfig
