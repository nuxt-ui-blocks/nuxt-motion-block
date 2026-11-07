export default defineNuxtConfig({
  extends: ['docus'],

  modules: [
    '@nuxt/fonts',
    '../src/module',
    '@nuxtjs/sitemap',
  ],

  site: {
    url:
      process.env.NUXT_SITE_URL
      || process.env.CF_PAGES_URL
      || 'https://nuxt-motion-block.pages.dev',
    name: 'Nuxt Motion Block',
    description: 'A streamlined UI library that extends Nuxt UI with motion capabilities powered by motion-v.',
  },

  colorMode: {
    // Light and dark from day one — follow the OS, can be toggled from the
    // header by the user. Fall back to dark when the OS says nothing.
    preference: 'system',
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

  // The library is type-checked with `noUncheckedIndexedAccess: false` (see
  // the repo's root tsconfig.json). The generated `.nuxt/tsconfig.*.json`
  // would otherwise enable it and report hundreds of pre-existing items that
  // are not actionable here, so override it the supported way — Nuxt merges
  // `typescript.tsConfig` into the generated files on every build.
  typescript: {
    tsConfig: {
      compilerOptions: {
        noUncheckedIndexedAccess: false,
      },
    },
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

  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500, 600] },
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  mcp: true,

  motionBlock: {
    prefix: 'M',
  },

  ogImage: {
    enabled: true,
  },

  sitemap: {
    zeroRuntime: true,
  },
})
