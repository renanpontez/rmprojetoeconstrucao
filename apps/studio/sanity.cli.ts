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
  // TODO: after the first `sanity deploy`, paste the printed appId here so subsequent
  // deploys don't re-prompt (playbook §16).
  // deployment: { appId: 'xxxxxxxxxxxxxxxx' },
})
