import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero (cabeçalho)',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow (acima do título)', type: 'string' }),
    defineField({
      name: 'headline',
      title: 'Título principal (use itálico de destaque para palavras-chave)',
      type: 'richHeadline',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subhead',
      title: 'Subtítulo',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagem de fundo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'primaryCta',
      title: 'CTA principal',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryLinkText',
      title: 'Texto do link secundário',
      type: 'string',
    }),
    defineField({
      name: 'secondaryLinkHref',
      title: 'Destino do link secundário',
      type: 'string',
    }),
    defineField({
      name: 'locationLabel',
      title: 'Etiqueta de localização (lateral rotacionada)',
      type: 'string',
    }),
    defineField({
      name: 'scrollLabel',
      title: 'Texto do indicador de scroll',
      type: 'string',
      initialValue: 'Role para explorar',
    }),
    defineField({
      name: 'credentialsCard',
      title: 'Card de credenciais',
      type: 'credentialsCard',
    }),
  ],
  preview: {
    select: { title: 'eyebrow', media: 'backgroundImage' },
    prepare: ({ title, media }) => ({
      title: 'Hero',
      subtitle: title ?? '—',
      media,
    }),
  },
})
