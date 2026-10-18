export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'zinc',
    },
  },
  seo: {
    titleTemplate: '%s - Nuxt Motion Block',
    title: 'Nuxt Motion Block',
    description:
      'A streamlined UI library that extends Nuxt UI with motion capabilities powered by motion-v.',
  },
  header: {
    title: 'Nuxt Motion Block',
    to: '/',
  },
  github: {
    url: 'https://github.com/nuxt-ui-blocks/nuxt-motion-block',
    branch: 'master',
    rootDir: 'docs',
  },
  toc: {
    title: 'On this page',
  },
})
