export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  modules: [
    '@nuxt/fonts',
    '../src/module',
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    zeroRuntime: true
  },

  extends: ['docus'],

  mcp: false,

  site: {
    url: process.env.NUXT_SITE_URL || 'https://nuxt-motion-block.pages.dev',
    name: 'Nuxt Motion Block',
    description: 'A streamlined UI library that extends Nuxt UI with motion capabilities powered by motion-v.',
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500, 600] },
    ],
  },

  motionBlock: {
    prefix: 'M',
  },

  ogImage: {
    enabled: false,
  },
})
