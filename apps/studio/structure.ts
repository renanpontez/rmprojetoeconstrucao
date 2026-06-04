import type { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Configurações do site')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Configurações do site'),
        ),
      S.listItem()
        .title('Navegação')
        .id('navigation')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
            .title('Navegação'),
        ),
      S.listItem()
        .title('Política de Privacidade')
        .id('privacyPolicy')
        .child(
          S.document()
            .schemaType('privacyPolicy')
            .documentId('privacyPolicy')
            .title('Política de Privacidade'),
        ),
      S.divider(),
      S.documentTypeListItem('page').title('Páginas'),
      S.divider(),
      S.documentTypeListItem('service').title('Serviços'),
      S.documentTypeListItem('portfolioItem').title('Portfólio'),
      S.documentTypeListItem('projectCategory').title('Categorias de projeto'),
    ])
