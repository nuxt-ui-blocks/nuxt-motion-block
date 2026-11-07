import { reactive } from 'vue'

export interface MotionBlockConfig {
  /**
   * Per-component `ui` overrides. Keys are the camel-cased component name
   * (e.g. `textShimmer`), values are the same slot maps Nuxt UI accepts in
   * `app.config.ts` under `ui.<name>`. In a Nuxt app these are seeded from
   * `app.config.ui`; in a plain Vue app they come from `app.use(motion, { ui })`.
   */
  ui: Record<string, Record<string, any>>
}

const config = reactive<MotionBlockConfig>({ ui: {} })

/**
 * The shared override set consumed by `useMotionBlockUI`. Internal — not part of the
 * public API surface beyond this module.
 */
export function useMotionBlockConfig(): MotionBlockConfig {
  return config
}

/**
 * Merge user-provided overrides into the shared config. Called by the Nuxt module's
 * seed plugin and by the Vue plugin's `install()`.
 */
export function setMotionBlockConfig(partial: Partial<MotionBlockConfig> | Record<string, any>): void {
  if (!partial) return
  const incoming = (partial as MotionBlockConfig).ui ?? partial as Record<string, any>
  for (const [name, overrides] of Object.entries(incoming)) {
    config.ui[name] = { ...(config.ui[name] ?? {}), ...overrides }
  }
}
