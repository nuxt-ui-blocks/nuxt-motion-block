import { onMounted, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue'
import { useColorMode } from '#imports'
import { colorToRgb, resolveColor, resolveThemeColor, themeTokenToVar, THEME_TOKENS, type RGB } from '../utils/theme-color'

export interface UseThemeColorOptions {
  /**
   * Read the colour scoped to a subtree instead of `document.documentElement`.
   * Accepts a getter so a container ref can be passed directly.
   */
  target?: HTMLElement | (() => HTMLElement | undefined)
  /**
   * Colour to return on the server and when resolution fails. `useThemeColor`
   * defaults to `null`; the `useResolved*` helpers default to the raw input.
   */
  fallback?: string
}

/**
 * Read the `target` option, which may be a plain element or a getter.
 */
function readTarget(options: UseThemeColorOptions): HTMLElement | undefined {
  const { target } = options
  return typeof target === 'function' ? target() : target
}

/**
 * A value is only worth resolving when it references the theme: a bare token,
 * a `--ui-*` variable, or any `var()`. Plain literals are already concrete.
 */
function needsResolution(value: string): boolean {
  const trimmed = value.trim()
  return trimmed.startsWith('var(')
    || trimmed.startsWith('--')
    || (THEME_TOKENS as readonly string[]).includes(trimmed)
}

/**
 * The SSR-safe form of a value. A theme token becomes `var(--ui-*)`, which is
 * valid CSS on its own, so the server and the first client render agree (no
 * hydration mismatch) and the colour paints immediately. Literals pass through.
 */
function cssValue(value: string | undefined | null): string | undefined {
  if (value == null || value === '') {
    return value ?? undefined
  }
  const trimmed = value.trim()
  return (THEME_TOKENS as readonly string[]).includes(trimmed) ? `var(${themeTokenToVar(trimmed)})` : value
}

/**
 * The value rendered on the server and on the first client render, before the
 * client upgrades to the concrete colour in `onMounted`.
 */
function initialValue(value: string | undefined | null, options: UseThemeColorOptions): string | undefined {
  return options.fallback ?? cssValue(value)
}

/**
 * Resolve one value to the concrete colour the browser paints. Falls back to the
 * SSR-safe form so the value is never empty, and returns literals untouched.
 */
function resolveOne(value: string | undefined | null, options: UseThemeColorOptions): string | undefined {
  const fallback = options.fallback ?? cssValue(value)
  if (value == null || value === '') {
    return fallback
  }
  if (!needsResolution(value)) {
    return value
  }
  return resolveColor(value, { target: readTarget(options), fallback }) ?? fallback
}

/**
 * Resolve a Nuxt UI theme token (or `--ui-*` variable) to the colour the browser
 * actually paints, re-resolving on mount and whenever the colour mode changes.
 *
 * Returns a `Ref<string | null>`: `null` (or `fallback`) on the server, the
 * concrete colour during client setup, re-resolved on mount and whenever the
 * colour mode changes. Rendering `null` on the server is safe, but because the
 * client's first render already holds the colour this can cause a hydration
 * mismatch — prefer {@link useResolvedColor} when that matters.
 */
export function useThemeColor(
  token: string,
  options: UseThemeColorOptions = {},
): Ref<string | null> {
  const colorMode = useColorMode()
  const resolve = () => resolveThemeColor(token, { target: readTarget(options), fallback: options.fallback })
  const color = ref<string | null>(resolve())

  const run = () => {
    color.value = resolve()
  }

  onMounted(run)
  watch(() => colorMode.value, run)

  return color
}

/**
 * Resolve a single colour that may be a theme token (`'primary'`), a `--ui-*`
 * variable (`'var(--ui-primary)'`) or any CSS literal (`'#00dc82'`,
 * `'oklch(…)'`) to the concrete colour the browser paints — the uniform entry
 * point every colour prop should use.
 *
 * Re-resolves on mount and whenever the source or the colour mode changes. On
 * the server (and the first client render) it returns a CSS-safe placeholder —
 * `var(--ui-*)` for a token, the literal otherwise — then upgrades to the
 * concrete colour on mount, so hydration never mismatches.
 */
export function useResolvedColor(
  source: MaybeRefOrGetter<string | undefined | null>,
  options: UseThemeColorOptions = {},
): Ref<string | undefined> {
  const colorMode = useColorMode()
  const resolved = ref<string | undefined>(initialValue(toValue(source), options))

  const run = () => {
    resolved.value = resolveOne(toValue(source), options)
  }

  onMounted(run)
  watch([() => toValue(source), () => colorMode.value], run)

  return resolved
}

/**
 * {@link useResolvedColor} for an array of colours.
 */
export function useResolvedColors(
  source: MaybeRefOrGetter<string[] | undefined | null>,
  options: UseThemeColorOptions = {},
): Ref<string[] | undefined> {
  const colorMode = useColorMode()
  const initial = () => {
    const list = toValue(source)
    return list ? list.map(value => initialValue(value, options) ?? value) : undefined
  }
  const run = () => {
    const list = toValue(source)
    resolved.value = list ? list.map(value => resolveOne(value, options) ?? value) : undefined
  }
  const resolved = ref<string[] | undefined>(initial())

  onMounted(run)
  watch([() => toValue(source), () => colorMode.value], run)

  return resolved
}

/**
 * {@link useResolvedColor} as sRGB channels, for canvas and other numeric
 * consumers. `null` until the client resolves it.
 */
export function useResolvedRgb(
  source: MaybeRefOrGetter<string | undefined | null>,
  options: UseThemeColorOptions = {},
): Ref<RGB | null> {
  const color = useResolvedColor(source, options)
  const rgb = ref<RGB | null>(color.value ? colorToRgb(color.value, readTarget(options)) : null)

  watch(color, (value) => {
    rgb.value = value ? colorToRgb(value, readTarget(options)) : null
  })

  return rgb
}

export default useThemeColor
