import { defineField, defineType } from 'sanity'

export const definitionItem = defineType({
  name: 'definitionItem',
  title: 'Item de definição',
  type: 'object',
  fields: [
    defineField({
      name: 'term',
      title: 'Termo (ex: Especialidade)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'definition',
      title: 'Definição',
      type: 'text',
      rows: 2,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'term', subtitle: 'definition' },
  },
})
