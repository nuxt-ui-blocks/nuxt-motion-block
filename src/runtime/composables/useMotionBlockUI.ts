import { computed, type ComputedRef } from 'vue'
import { defu } from 'defu'
import { useComponentProps } from '@nuxt/ui/composables/useComponentProps'
import { tv } from '@nuxt/ui/utils/tv'
import { useAppConfig } from '#imports'

export interface UseMotionBlockUIOptions<Props extends object> {
  /**
   * Component name, used as the `app.config` key (`ui.<name>`).
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
   * Props resolved through `useComponentProps` (explicit prop > UTheme > app.config).
   */
  props: Props
  /**
   * The `tv` instance extended with the user's `app.config.ui.<name>` overrides.
   */
  ui: ComputedRef<any>
}

/**
 * Resolve a component's `ui` slots by merging its `tv` theme with the
 * user-provided `app.config.ui.<name>` overrides.
 */
export function useMotionBlockUI<Props extends object>(
  options: UseMotionBlockUIOptions<Props>,
): UseMotionBlockUIReturn<Props> {
  const { name, props, theme } = options
  const _props = useComponentProps(name, props)
  const appConfig = useAppConfig()

  const ui = computed(() =>
    tv({
      extend: theme,
      ...defu({}, (appConfig as any).ui?.[name] ?? {}),
    }),
  )

  return { props: _props, ui }
}

export default useMotionBlockUI
