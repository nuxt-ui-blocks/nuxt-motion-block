import { defineNuxtModule, addPlugin, createResolver, addComponentsDir } from '@nuxt/kit'
import type { NuxtModule } from '@nuxt/schema'

// Module options TypeScript interface definition
export interface ModuleOptions {
  prefix: string
}

/**
 * Annotated rather than left to inference: the inferred type drags `NuxtOptions`
 * in from `@nuxt/schema` by way of the pnpm store path, and the declaration
 * bundler cannot name that, so the build fails on a portable-type error.
 */
const module: NuxtModule<ModuleOptions> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-motion-block',
    configKey: 'motionBlock',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: 'M',
  },
  moduleDependencies: {
    '@nuxt/ui': {
      version: '>=4.11.2',
      optional: false,
    },
    'motion-v': {
      version: '>=2.4.4',
      optional: false,
    },
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add all components from the runtime/components directory
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: options.prefix,
      global: false,
      watch: false,
    })

    // Add plugin
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Add composables
    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolver.resolve('./runtime/composables'))
    })

    nuxt.options.css.push(resolver.resolve('./runtime/tailwind.css'))
  },
})

export default module
