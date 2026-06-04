import { defineField, defineType } from 'sanity'

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Serviços',
  type: 'object',
  fields: [
    defineField({ name: 'index', title: 'Índice (ex: 02)', type: 'string', initialValue: '02' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Serviços' }),
    defineField({
      name: 'headline',
      title: 'Título principal',
      type: 'richHeadline',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Serviços exibidos (deixe vazio para mostrar todos por ordem)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Serviços' }),
  },
})
