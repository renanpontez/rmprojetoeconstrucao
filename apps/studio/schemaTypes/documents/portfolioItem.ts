import { defineField, defineType } from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Item do portfólio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do projeto',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      title: 'Ano',
      type: 'number',
      validation: (r) => r.required().min(1990).max(2100),
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Destaques',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'summary',
      title: 'Resumo (opcional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Ano (recente primeiro)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Ordem manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
    },
  },
})
