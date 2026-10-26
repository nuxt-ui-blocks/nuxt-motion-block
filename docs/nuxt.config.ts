export default defineNuxtConfig({
  extends: ['docus'],

  modules: [
    '@nuxt/fonts',
    '../src/module',
    '@nuxtjs/sitemap',
  ],

  ssr: true,
  site: {
    url:
      process.env.NUXT_SITE_URL ||
      process.env.CF_PAGES_URL ||
      'https://nuxt-motion-block.pages.dev',
    name: 'Nuxt Motion Block',
    description: 'A streamlined UI library that extends Nuxt UI with motion capabilities powered by motion-v.',
  },
    url: process.env.NUXT_SITE_URL || 'https://nuxt-motion-block.pages.dev',
    name: 'Nuxt Motion Block',
    description: 'A streamlined UI library that extends Nuxt UI with motion capabilities powered by motion-v.',
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  nitro: {
    preset: 'cloudflare-pages',
  },
  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500, 600] },
    ],
  },

  // The MCP toolkit needs a running server, so it only produces a warning on
  // `nuxt generate`. The docs are deployed as static files.
  mcp: false,

  motionBlock: {
    prefix: 'M',
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    zeroRuntime: false,
  },
})
