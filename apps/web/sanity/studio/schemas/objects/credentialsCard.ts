import { defineField, defineType } from 'sanity'

export const credentialsCard = defineType({
  name: 'credentialsCard',
  title: 'Card de credenciais (Hero)',
  type: 'object',
  fields: [
    defineField({
      name: 'brandLabel',
      title: 'Identificação da marca (topo)',
      type: 'string',
      initialValue: 'RM · Projeto & Construção',
    }),
    defineField({
      name: 'stats',
      title: 'Números (3 itens)',
      type: 'array',
      of: [{ type: 'stat' }],
      validation: (r) => r.length(3).warning('A grade do hero foi desenhada para 3 itens.'),
    }),
    defineField({
      name: 'creaLabel',
      title: 'Rótulo CREA',
      type: 'string',
      initialValue: 'Eng. Civil CREA-CE',
    }),
    defineField({
      name: 'rnpLabel',
      title: 'Rótulo RNP',
      type: 'string',
      initialValue: 'RNP',
    }),
    defineField({
      name: 'serviceAreaLabel',
      title: 'Rótulo área de atendimento',
      type: 'string',
      initialValue: 'Atendimento',
    }),
  ],
})
