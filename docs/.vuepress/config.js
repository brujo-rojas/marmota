module.exports = {
  markdown: {
    lineNumbers: true
  },
  locales: {
    '/': {
      lang: 'es-Es',
      title: 'Marmota [Beta] ',
      description: 'Tabla de datos simple, para vuejs2 y vuetify2'
    }
  },
  themeConfig: {
    repoLabel: 'Contribuye!',
    repo: 'https://github.com/brujo-rojas/marmota',
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
          {
            text: 'GitHub',
            link: 'https://github.com/brujo-rojas/marmota'
          }
        ],
        sidebar: {
          '/components/': [
            {
              title: 'Guía de Inicio',
              collapsable: false,
              children: [
                ['../guide', 'Instalación'],
              ]
            },
            {
              title: 'Ejemplos Prácticos',
              collapsable: false,
              children: [
                'table-basic',
                'table-example',
              ]
            },
            {
              title: 'Documentación Técnica', 
              collapsable: true,
              children: [
                ['../api-config', 'API y Configuración'],
              ]
            }
          ]
        }
      }
    }
  }
}
