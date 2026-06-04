import { defineField, defineType } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'Sobre nós',
  type: 'object',
  fields: [
    defineField({ name: 'index', title: 'Índice (ex: 01)', type: 'string', initialValue: '01' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Sobre Nós' }),
    defineField({
      name: 'statement',
      title: 'Declaração editorial',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'secondaryLinkText',
      title: 'Texto do link secundário',
      type: 'string',
      initialValue: 'Conhecer nossos projetos',
    }),
    defineField({
      name: 'secondaryLinkHref',
      title: 'Destino do link secundário',
      type: 'string',
      initialValue: '#projetos',
    }),
    defineField({
      name: 'definitions',
      title: 'Lista de definições',
      type: 'array',
      of: [{ type: 'definitionItem' }],
    }),
    defineField({
      name: 'stats',
      title: 'Números',
      type: 'array',
      of: [{ type: 'stat' }],
    }),
    defineField({
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'captions',
      title: 'Legendas sobre a imagem',
      type: 'array',
      of: [{ type: 'imageCaption' }],
    }),
  ],
  preview: {
    select: { title: 'eyebrow', subtitle: 'statement', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: 'Sobre',
      subtitle: subtitle ?? title,
      media,
    }),
  },
})
