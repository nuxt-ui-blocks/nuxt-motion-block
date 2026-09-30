import { defineNuxtConfig as defineNuxtConfigRaw } from 'nuxt/config'
import type { NuxtConfig } from 'nuxt/schema'

// `nuxt/config` types `defineNuxtConfig` as the `DefineNuxtConfig` interface,
// which carries no call signature, even though the runtime is an identity
// function. Re-typing it here keeps the playground typecheck honest about what
// the export actually returns.
const defineNuxtConfig = defineNuxtConfigRaw as (config: NuxtConfig) => NuxtConfig

export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '../src/module',
  ], devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-09-28',
  motionBlock: {
    prefix: 'M',
  },
})
