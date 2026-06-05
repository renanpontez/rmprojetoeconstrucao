import { defineField, defineType } from 'sanity'

export const ctaFormSection = defineType({
  name: 'ctaFormSection',
  title: 'CTA com formulário de telefone',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Sem tempo para ligar?' }),
    defineField({
      name: 'headline',
      title: 'Título principal',
      type: 'richHeadline',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'inputLabel', title: 'Rótulo do campo', type: 'string', initialValue: 'Telefone com DDD' }),
    defineField({ name: 'inputPlaceholder', title: 'Placeholder do campo', type: 'string', initialValue: '(85) 99999-9999' }),
    defineField({ name: 'buttonLabel', title: 'Texto do botão', type: 'string', initialValue: 'Solicitar contato' }),
    defineField({ name: 'buttonLoadingLabel', title: 'Texto do botão (enviando)', type: 'string', initialValue: 'Enviando…' }),
    defineField({
      name: 'footerNote',
      title: 'Nota de rodapé (privacidade)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'whatsappHref',
      title: 'Destino WhatsApp (sem o ?text=)',
      type: 'string',
      initialValue: 'https://wa.me/5585999880988',
    }),
    defineField({
      name: 'messageTemplate',
      title: 'Mensagem pré-preenchida (use {phone} como placeholder)',
      type: 'text',
      rows: 3,
      initialValue:
        'Olá! Gostaria de receber mais informações sobre projetos de construção. Meu telefone é: {phone}',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'CTA Formulário' }),
  },
})
