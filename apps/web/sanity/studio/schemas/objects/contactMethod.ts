import { defineField, defineType } from 'sanity'

export const contactMethod = defineType({
  name: 'contactMethod',
  title: 'Canal de contato',
  type: 'object',
  fields: [
    defineField({
      name: 'iconName',
      title: 'Ícone (nome do lucide-react)',
      type: 'string',
      description: 'Ex: Phone, Mail, MapPin, Clock, MessageCircle.',
      options: {
        list: [
          { title: 'Phone', value: 'Phone' },
          { title: 'Mail', value: 'Mail' },
          { title: 'MapPin', value: 'MapPin' },
          { title: 'Clock', value: 'Clock' },
          { title: 'MessageCircle', value: 'MessageCircle' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'detail',
      title: 'Detalhe',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link (opcional)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'detail' },
  },
})
