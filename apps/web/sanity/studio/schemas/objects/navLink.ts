import { defineField, defineType } from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: 'Link de navegação',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Rótulo',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'href',
      title: 'Destino',
      type: 'string',
      description: 'Âncora (#sobre), rota (/politica-de-privacidade) ou URL completa.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
