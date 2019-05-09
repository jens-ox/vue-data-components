module.exports = {
  title: 'Vue Data Components',
  description: 'A collection of data visualization components for Vue.',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Components', link: '/components/' },
      { text: 'Helpers', link: '/helpers/' },
      { text: 'Examples', link: '/examples' },
      { text: 'GitHub', link: 'https://github.com/jens-ox/vue-data-components' }
    ],
    sidebar: {
      '/components/': ['', 'group', 'grid', 'axis', 'text', 'shape'],
      '/helpers/': ['', 'curve']
    }
  }
}
