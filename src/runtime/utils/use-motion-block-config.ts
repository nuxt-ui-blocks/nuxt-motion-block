import { reactive } from 'vue'

export interface MotionBlockConfig {
  /**
   * Per-component `ui` overrides. Keys are the camel-cased component name
   * (e.g. `textShimmer`), values are the same slot maps Nuxt UI accepts in
   * `app.config.ts` under `ui.<name>`. In a Nuxt app these are the live
   * `app.config.ui.<name>` references (seeded by the module plugin); in a
   * plain Vue app they are the consumer's references from `app.use(motion, { ui })`.
   */
  ui: Record<string, Record<string, any>>
}

const config = reactive<MotionBlockConfig>({ ui: {} })

/**
 * Per-component overrides consumed by `useMotionBlockUI`.
 */
export function useMotionBlockConfig(): MotionBlockConfig {
  return config
}

/**
 * Merge consumer-provided overrides into the shared config. Called by the Nuxt module's
 * seed plugin and by the Vue plugin's `install()`.
 *
 * Keeps reference identity where possible (so `app.config.ui.<name> = X` writes in
 * Nuxt apps propagate to components — same shape as Nuxt UI's proxy-reads-live design).
 */
export function setMotionBlockConfig(partial: Partial<MotionBlockConfig> | Record<string, any>): void {
  if (!partial) return
  const incoming = (partial as MotionBlockConfig).ui ?? (partial as Record<string, any>)
  for (const [name, overrides] of Object.entries(incoming)) {
    const existing = config.ui[name]
    if (existing) {
      Object.assign(existing, overrides)
    }
    else {
      // Reactive()'d so consumer writes via useMotionBlockConfig() flow without
      // manual sync — same guarantee Nuxt UI gets from reactive app.config.
      config.ui[name] = reactive(overrides)
    }
  }
}
