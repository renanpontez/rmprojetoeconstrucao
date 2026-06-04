import { defineField, defineType } from 'sanity'

export const imageCaption = defineType({
  name: 'imageCaption',
  title: 'Legenda de imagem',
  type: 'object',
  fields: [
    defineField({
      name: 'position',
      title: 'Posição',
      type: 'string',
      options: {
        list: [
          { title: 'Inferior esquerda', value: 'bottomLeft' },
          { title: 'Inferior direita', value: 'bottomRight' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'italic',
      title: 'Em itálico (serifa)?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'position' },
  },
})
