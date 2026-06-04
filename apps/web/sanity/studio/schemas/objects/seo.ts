import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (SEO)',
      type: 'string',
      validation: (r) => r.max(70).warning('Mantenha abaixo de 70 caracteres.'),
    }),
    defineField({
      name: 'description',
      title: 'Descrição (SEO)',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(170).warning('Mantenha abaixo de 170 caracteres.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagem para compartilhamento (OG)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
