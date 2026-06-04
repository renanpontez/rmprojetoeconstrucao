import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nome do site',
      type: 'string',
      initialValue: 'RM Projeto & Construção',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'legalName',
      title: 'Razão social',
      type: 'string',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'object',
      fields: [
        defineField({ name: 'dark', title: 'Logo escura (sobre fundo claro)', type: 'image' }),
        defineField({ name: 'light', title: 'Logo branca (sobre fundo escuro)', type: 'image' }),
      ],
    }),
    defineField({
      name: 'contacts',
      title: 'Contatos',
      type: 'object',
      fields: [
        defineField({ name: 'whatsappLabel', title: 'Telefone exibido', type: 'string' }),
        defineField({ name: 'whatsappHref', title: 'Link do WhatsApp', type: 'url' }),
        defineField({ name: 'email', title: 'E-mail', type: 'string' }),
        defineField({ name: 'phoneDisplay', title: 'Telefone alternativo (opcional)', type: 'string' }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'object',
      fields: [
        defineField({ name: 'city', title: 'Cidade', type: 'string' }),
        defineField({ name: 'state', title: 'UF', type: 'string' }),
        defineField({ name: 'region', title: 'Região', type: 'string' }),
      ],
    }),
    defineField({
      name: 'legal',
      title: 'Dados legais',
      type: 'object',
      fields: [
        defineField({ name: 'professionalTitle', title: 'Título profissional', type: 'string' }),
        defineField({ name: 'responsibleName', title: 'Nome do responsável técnico', type: 'string' }),
        defineField({ name: 'creaUF', title: 'CREA UF', type: 'string' }),
        defineField({ name: 'creaNumber', title: 'Número CREA', type: 'string' }),
        defineField({ name: 'rnp', title: 'RNP', type: 'string' }),
        defineField({ name: 'cnpj', title: 'CNPJ', type: 'string' }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'SEO padrão',
      type: 'seo',
    }),
    defineField({
      name: 'primaryCta',
      title: 'CTA principal (fallback global)',
      type: 'cta',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare: ({ title }) => ({ title: title ?? 'Configurações do site' }),
  },
})
