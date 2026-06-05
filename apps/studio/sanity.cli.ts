import { defineCliConfig } from 'sanity/cli'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  ''
const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'

export default defineCliConfig({
  api: { projectId, dataset },
  // Pinned so `sanity deploy` doesn't re-prompt (playbook §16).
  // Standalone Studio is at https://rmprojetoeconstrucao.sanity.studio/
  deployment: { appId: 'tg217sijstrpy6kipw30vfrf' },
})
