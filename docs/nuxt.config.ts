export default defineNuxtConfig({
  extends: ['docus'],

  mcp: false,  // MCP is provided via stdio (bin/mcp-server.mjs) instead of docus's built-in HTTP server

  modules: ['@nuxt/fonts', '../src/module'],

  site: {
    name: 'Nuxt Motion Block',
    url: process.env.NUXT_SITE_URL || 'https://nuxt-motion-block.pages.dev',
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
})
