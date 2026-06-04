import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Serviço',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Ícone (lucide-react)',
      type: 'string',
      options: {
        list: [
          { title: 'Building2 (residencial)', value: 'Building2' },
          { title: 'Home (comercial)', value: 'Home' },
          { title: 'HardHat (industrial)', value: 'HardHat' },
          { title: 'Wrench (reformas)', value: 'Wrench' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem de fundo do card',
      type: 'image',
      options: { hotspot: true },
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
      title: 'Ordem manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'iconName', media: 'image' },
  },
})
