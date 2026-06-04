import { defineField, defineType } from 'sanity'

export const privacyPolicy = defineType({
  name: 'privacyPolicy',
  title: 'Política de Privacidade',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Política de Privacidade',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Última atualização',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Texto', value: 'normal' },
            { title: 'Subtítulo', value: 'h2' },
            { title: 'Sub-subtítulo', value: 'h3' },
          ],
          lists: [
            { title: 'Lista', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'string', title: 'URL' },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title ?? 'Política de Privacidade' }),
  },
})
