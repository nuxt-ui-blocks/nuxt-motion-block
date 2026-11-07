import { computed, type ComputedRef } from 'vue'
import { defu } from 'defu'
import { useComponentProps } from '@nuxt/ui/composables/useComponentProps'
import { tv } from '@nuxt/ui/utils/tv'
import { useMotionBlockConfig } from '../utils/use-motion-block-config'

export interface UseMotionBlockUIOptions<Props extends object> {
  /**
   * Component name, used as the `app.config` / Vue-plugin `ui` key (`ui.<name>`).
   */
  name: string
  /**
   * The component's raw props.
   */
  props: Props
  /**
   * The component's `tv` theme (typically imported from `runtime/theme`).
   */
  theme: Record<string, any>
}

export interface UseMotionBlockUIReturn<Props extends object> {
  /**
   * Props resolved through `useComponentProps` (explicit prop > UTheme > config overrides).
   */
  props: Props
  /**
   * The `tv` instance extended with the user's `ui.<name>` overrides.
   */
  ui: ComputedRef<any>
}

/**
 * Resolve a component's `ui` slots by merging its `tv` theme with the
 * consumer-provided `ui.<name>` overrides. Overrides come from
 * `useMotionBlockConfig()` — a `reactive` store seeded by the Nuxt module
 * (from `app.config.ui`) at app start, or by the Vue plugin's `install()`
 * (`app.use(motionBlock, { ui })`). Writes to the reactive store are
 * observed by the resolved `tv` instance.
 */
export function useMotionBlockUI<Props extends object>(
  options: UseMotionBlockUIOptions<Props>,
): UseMotionBlockUIReturn<Props> {
  const { name, props, theme } = options
  const _props = useComponentProps(name, props)
  const motionBlockConfig = useMotionBlockConfig()

  // Calling the `tv` instance yields the per-slot resolver functions; slot-level
  // variant props (e.g. `ui.line({ kind })`) are applied where the slots are used.
  const ui = computed(() =>
    tv({
      extend: theme,
      ...defu({}, motionBlockConfig.ui[name] ?? {}),
    })(),
  )

  return { props: _props, ui }
}

export default useMotionBlockUI
