// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/content', 'nuxt-llms', '../src/module'],

  imports: {
    presets: [
      {
        from: '~/utils/og-image-verify-stub',
        imports: ['defineOgImageComponent'],
      },
    ],
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://nuxt-motion-block.pages.dev',
  },

  content: {
    experimental: { nativeSqlite: true },
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
        },
      },
    },
  },

  // Disable source maps for production builds to reduce bundle size
  sourcemap: {
    server: false,
    client: false,
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        // '/',
      ],
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
    // Optimization settings to reduce build size
    minify: true,
    compressPublicAssets: true,
    // Externalize large dependencies to reduce bundle size
    externals: {
      inline: [
        // Add any dependencies that need to be inlined
      ],
    },
    // Only include necessary presets
    // preset: process.env.NITRO_PRESET || 'static',
  },

  vite: {
    build: {
      // Additional optimizations to reduce bundle size
      cssMinify: true,
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  icon: {
    provider: 'iconify',
    serverBundle: 'auto',
    clientBundle: {
      scan: true,
    },
  },

  image: {
    // Optimize image handling to reduce bundle size
    quality: 80,
    format: ['webp', 'avif'],
    // Provider configuration for optimized image delivery
    provider: 'ipx',
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536,
    },
  }, llms: {
    domain: 'https://nuxt-motion-block.pages.dev/',
    title: 'Nuxt Motion Block',
    description: 'A streamlined UI library that extends Nuxt UI with motion capabilities powered by motion-v.',
    full: {
      title: 'Nuxt Motion Block - Full Documentation',
      description: 'This is the full documentation for Nuxt Motion Block, a streamlined UI library that extends Nuxt UI with motion capabilities powered by motion-v.',
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' },
        ],
      },
      {
        title: 'Components',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/components%' },
        ],
      },
      {
        title: 'Composables',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/composables%' },
        ],
      },
      {
        title: 'Blocks',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/blocks%' },
        ],
      },
      {
        title: 'Template',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/template%' },
        ],
      },
    ],
  },

  motionBlock: {
    prefix: 'M',
  },
})
