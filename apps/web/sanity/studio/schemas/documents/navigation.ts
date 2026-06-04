import { defineField, defineType } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navegação',
  type: 'document',
  fields: [
    defineField({
      name: 'primaryNav',
      title: 'Menu principal (header)',
      type: 'array',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'footerNav',
      title: 'Menu do rodapé',
      type: 'array',
      of: [{ type: 'navLink' }],
    }),
    defineField({
      name: 'headerCta',
      title: 'CTA do header (opcional)',
      type: 'cta',
    }),
    defineField({
      name: 'footerBio',
      title: 'Texto do rodapé (descrição da marca)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'footerCopyrightSignature',
      title: 'Assinatura do copyright (linha final do rodapé)',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navegação' }),
  },
})
