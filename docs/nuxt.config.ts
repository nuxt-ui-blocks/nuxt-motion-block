export default defineNuxtConfig({
  extends: ['docus'],

  modules: [
    '@nuxt/fonts',
    '../src/module',
    '@nuxtjs/sitemap',
  ],

  site: {
    url:
      process.env.NUXT_SITE_URL ||
      process.env.CF_PAGES_URL ||
      'https://nuxt-motion-block.pages.dev',
    name: 'Nuxt Motion Block',
    description: 'A streamlined UI library that extends Nuxt UI with motion capabilities powered by motion-v.',
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  nitro: {
    // `nuxt generate` normally writes to `.output/public`. The Cloudflare
    // Pages project and the deploy scripts expect `docs/dist`, so keep the
    // static output there.
    output: {
      publicDir: 'dist',
    },
    prerender: {
      routes: ['/sitemap.xml'],
      // Nitro prerenders routes sequentially by default (concurrency: 1).
      // With ~450 docs pages that pushes a full build past Cloudflare Pages'
      // 20 minute build limit, so prerender several pages at once.
      concurrency: 8,
      interval: 0,
    },
  },

  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500, 600] },
    ],
  },

  mcp: false,

  motionBlock: {
    prefix: 'M',
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    zeroRuntime: true,
  },

  hooks: {
    // @nuxt/fonts -> fontless leaves an esbuild service running after the
    // build finishes, which keeps `nuxt generate` alive forever. `close`
    // runs after Nitro has written the prerendered site.
    // See https://github.com/nuxt/nuxt/issues/33987
    close: () => {
      const args = process.argv.slice(2)
      if (args.includes('generate') || args.includes('build')) {
        process.exit(0)
      }
    },
  },
})
