import { defineField, defineType } from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contato',
  type: 'object',
  fields: [
    defineField({ name: 'index', title: 'Índice (ex: 04)', type: 'string', initialValue: '04' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Contato' }),
    defineField({
      name: 'headline',
      title: 'Título principal',
      type: 'richHeadline',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'methods',
      title: 'Canais de contato',
      type: 'array',
      of: [{ type: 'contactMethod' }],
    }),
    defineField({
      name: 'credentials',
      title: 'Linha de credenciais',
      type: 'object',
      fields: [
        defineField({ name: 'creaLabel', title: 'Rótulo CREA', type: 'string', initialValue: 'CREA-CE' }),
        defineField({ name: 'creaValue', title: 'Valor CREA', type: 'string' }),
        defineField({ name: 'rnpLabel', title: 'Rótulo RNP', type: 'string', initialValue: 'RNP' }),
        defineField({ name: 'rnpValue', title: 'Valor RNP', type: 'string' }),
        defineField({ name: 'responsibleLabel', title: 'Rótulo responsável', type: 'string', initialValue: 'Responsável' }),
        defineField({ name: 'responsibleValue', title: 'Valor responsável', type: 'string' }),
      ],
    }),
    defineField({
      name: 'whatsappCard',
      title: 'Card do WhatsApp',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Eyebrow do card', type: 'string', initialValue: 'Resposta em minutos' }),
        defineField({
          name: 'headline',
          title: 'Título do card',
          type: 'richHeadline',
        }),
        defineField({
          name: 'description',
          title: 'Descrição',
          type: 'text',
          rows: 3,
        }),
        defineField({ name: 'ctaLabel', title: 'Texto do botão', type: 'string', initialValue: 'Abrir WhatsApp' }),
        defineField({ name: 'ctaHref', title: 'Link do botão', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contato' }),
  },
})
