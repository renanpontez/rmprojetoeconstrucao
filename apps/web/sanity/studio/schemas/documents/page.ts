import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Página',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Use "home" para a página inicial. As demais viram /<slug>.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Seções da página',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'aboutSection' },
        { type: 'servicesSection' },
        { type: 'ctaFormSection' },
        { type: 'portfolioSection' },
        { type: 'contactSection' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
