import type { App, Plugin } from 'vue'
import { defineAsyncComponent } from 'vue'
import { registry } from './registry.generated'
import { setMotionBlockConfig } from './runtime/utils/use-motion-block-config'

export interface MotionBlockVueOptions {
  /**
   * Component name prefix; default `'M'` (same as the Nuxt module).
   */
  prefix?: string
  /**
   * Per-component `ui` overrides: keys are the camel-cased component name
   * (e.g. `textShimmer`), values are the same slot maps Vue UI's `app.config.ts`
   * uses. Merged shallowly on top of built-in defaults.
   */
  ui?: Record<string, Record<string, any>>
}

/**
 * Vue plugin for plain Vue / Laravel / AdonisJS apps.
 *
 * Registers every `M*` component globally (async, so unused components stay out of the bundle)
 * and optionally seeds the `ui.<name>` overrides `useMotionBlockUI` consumes — the same role
 * Nuxt's `app.config.ts` plays in the Nuxt module.
 *
 * Usage:
 *   import { motionBlock } from 'nuxt-motion-block/vue-plugin'
 *   app.use(motionBlock, { ui: { textShimmer: { root: 'font-mono' } } })
 * or rely on the package's default export:
 *   import motionBlock from 'nuxt-motion-block/vue-plugin'
 *   app.use(motionBlock)
 */
const plugin = {
  install(app: App, options: MotionBlockVueOptions = {}) {
    const prefix = options.prefix ?? 'M'
    for (const { name, component } of registry) {
      const stripped = name.slice(1) // drop the leading 'M'
      if (prefix !== 'M') {
        app.component(`${prefix}${stripped}`, defineAsyncComponent(component as any))
      }
      else {
        app.component(name, defineAsyncComponent(component as any))
      }
    }
    if (options.ui) setMotionBlockConfig({ ui: options.ui })
  },
} satisfies Plugin

export const motionBlock = plugin
export default plugin
