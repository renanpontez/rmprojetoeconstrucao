import { defineField, defineType } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Botão de ação (CTA)',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Texto',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Link externo', value: 'external' },
          { title: 'Link interno', value: 'internal' },
          { title: 'E-mail', value: 'email' },
          { title: 'Âncora na página', value: 'anchor' },
        ],
        layout: 'radio',
      },
      initialValue: 'whatsapp',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'href',
      title: 'Destino (URL, mailto:, #âncora)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'eventName',
      title: 'Nome do evento de tracking (opcional)',
      type: 'string',
      description: 'GTM dataLayer event name. Padrão: cta_click.',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'kind' },
  },
})
