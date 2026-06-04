import { defineType } from 'sanity'

/**
 * Portable-text array with a single `italicAccent` decorator so editors can
 * italicize one or more words inside a headline ("Construímos com *precisão*").
 * Rendered via `richHeadlineToReact` in apps/web/sanity/lib/richHeadline.tsx.
 */
export const richHeadline = defineType({
  name: 'richHeadline',
  title: 'Headline com itálico',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Itálico de destaque', value: 'italicAccent' },
        ],
        annotations: [],
      },
    },
  ],
})
