export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
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
  search: {
    // Load the content search bundle only when the palette opens. The
    // non-FTS path parses the whole ~10MB content database on page load, which
    // blocks the main thread (and freezes scrolling) in dev. FTS uses SQLite
    // FTS5, runs entirely in the browser, and needs no server, so it works on
    // the static Cloudflare Pages deploy the same as Fuse.
    fts: true,
  },
  toc: {
    title: 'On this page',
  },
})
