import { defineField, defineType } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Número de destaque',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Valor (ex: +30, 100+, 100%)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      title: 'Rótulo',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
