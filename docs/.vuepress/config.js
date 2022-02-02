module.exports = {
  markdown: {
    lineNumbers: true
  },
  locales: {
    '/': {
      lang: 'es-Es',
      title: 'Marmota',
      description: 'Tabla de datos simple, para vuetify2'
    }
  },
  themeConfig: {
    repoLabel: 'Contribuye!',
    // git repo here... gitlab, github
    repo: '',
    docsDir: 'docs',
    editLinks: true,
    docsBranch: 'main',
    editLinkText: 'Ayúdanos a mejorar nuestro trabajo.',
    search: false,
    locales: {
      '/': {
        label: 'Español',
        selectText: 'Lenguajes',
        lastUpdated: 'Último cambio',
        // service worker is configured but will only register in production
        serviceWorker: {
          updatePopup: {
            message: 'Nuevo Contenido',
            buttonText: 'Refrescar'
          }
        },
        nav: [
          { text: 'Instalación', link: '/guide' },
          { text: 'Ejemplos', link: '/components/' },
          // external link to git repo...again
          {
            text: 'GitHub',
            link: 'https://github.com/brujo-rojas/marmota'
          }
        ],
        sidebar: {
          '/components/': [
            {
              title: 'Ejemplos',
              collapsable: false,
              children: [
                'table-basic',
                'table-example',
              ]
            }
          ]
        }
      }
    }
  }
}
