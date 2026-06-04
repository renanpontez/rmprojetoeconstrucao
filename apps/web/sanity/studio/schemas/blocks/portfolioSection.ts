import { defineField, defineType } from 'sanity'

export const portfolioSection = defineType({
  name: 'portfolioSection',
  title: 'Portfólio',
  type: 'object',
  fields: [
    defineField({ name: 'index', title: 'Índice (ex: 03)', type: 'string', initialValue: '03' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Portfólio' }),
    defineField({
      name: 'headline',
      title: 'Título principal',
      type: 'richHeadline',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Itens exibidos (vazio = todos por ano descendente)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'portfolioItem' }] }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Portfólio' }),
  },
})
