/**
 * The bridge between Nuxt UI theme tokens and the colours the browser actually
 * paints.
 *
 * Both directions are covered:
 *
 * - token → colour: `themeTokenToVar` for the CSS-variable name, `resolveThemeColor`
 *   for the concrete colour the browser computes in the active light/dark theme.
 * - colour → token: `nearestThemeToken` finds the closest token, `colorToThemeVar`
 *   returns the matching `--ui-*` variable.
 *
 * The string mappings (`themeTokenToVar` / `cssVarToThemeToken`) are pure and
 * SSR-safe; everything that touches the DOM is client-only and returns `null`
 * on the server. That split is deliberate — a component can render a
 * `var(--ui-primary)` fallback during SSR and upgrade to a resolved colour on
 * the client without branching.
 */

/** Nuxt UI's semantic accent colours (`--ui-primary`, `--ui-error`, …). */
export const THEME_COLOR_TOKENS = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error',
] as const

/** Nuxt UI's semantic surface colours (`--ui-bg-elevated`, `--ui-text-muted`, …). */
export const THEME_SURFACE_TOKENS = [
  'bg',
  'bg-muted',
  'bg-elevated',
  'bg-accented',
  'bg-inverted',
  'text',
  'text-muted',
  'text-dimmed',
  'text-toned',
  'text-highlighted',
  'text-inverted',
  'border',
  'border-muted',
  'border-accented',
  'border-inverted',
] as const

/** Every token this module can map or resolve. */
export const THEME_TOKENS = [...THEME_COLOR_TOKENS, ...THEME_SURFACE_TOKENS] as const

export type ThemeColorToken = (typeof THEME_COLOR_TOKENS)[number]
export type ThemeSurfaceToken = (typeof THEME_SURFACE_TOKENS)[number]
export type ThemeToken = (typeof THEME_TOKENS)[number]

/** An sRGB channel triple, each channel in `0–255`. */
export type RGB = [number, number, number]

/** An OkLab colour triple used for perceptual comparison. */
export type Oklab = [number, number, number]

const UI_VAR_PREFIX = '--ui-'
const RGB_MAX = 255
const SRGB_KNEE = 0.040_45

const isClient = () => typeof window !== 'undefined' && typeof document !== 'undefined'

/**
 * Resolve a token (or any of its spellings) to the CSS-variable name.
 *
 * Accepts a bare token (`'text-muted'`), a variable (`'--ui-text-muted'`) or a
 * `var()` reference (`'var(--ui-text-muted)'`), and normalises all three to the
 * variable name. Pure and SSR-safe.
 */
export function themeTokenToVar(token: string): string {
  let name = token.trim()
  if (name.startsWith('var(') && name.endsWith(')')) {
    name = name.slice(4, -1).split(',')[0]!.trim()
  }
  return name.startsWith(UI_VAR_PREFIX) ? name : `${UI_VAR_PREFIX}${name}`
}

/**
 * Reverse of {@link themeTokenToVar}: map a CSS-variable name back to its token.
 *
 * Returns `null` for anything that is not one of {@link THEME_TOKENS} — a
 * non-`--ui-*` variable, or a `--ui-*` one that is not a colour
 * (`--ui-radius`, `--ui-color-primary-500`, …). Pure and SSR-safe.
 */
export function cssVarToThemeToken(varName: string): ThemeToken | null {
  const name = themeTokenToVar(varName)
  if (!name.startsWith(UI_VAR_PREFIX)) {
    return null
  }
  const token = name.slice(UI_VAR_PREFIX.length)
  return (THEME_TOKENS as readonly string[]).includes(token) ? (token as ThemeToken) : null
}

/**
 * Normalise whatever a caller hands us as a colour-resolution target to a real
 * `HTMLElement`.
 *
 * `resolve*Color` runs against a subtree so token lookups honour the surrounding
 * cascade, and callers pass it a template ref. A ref placed on a *component*
 * (e.g. `<motion.div ref="containerRef">`) resolves to that component's public
 * instance rather than a DOM node, so `target.appendChild` would throw and take
 * the whole page down. Accept an element, unwrap a component instance via `$el`,
 * and otherwise fall back to the document root.
 */
function asElement(target: unknown): HTMLElement {
  if (typeof HTMLElement !== 'undefined') {
    if (target instanceof HTMLElement) return target
    const el = (target as { $el?: unknown } | null | undefined)?.$el
    if (el instanceof HTMLElement) return el
  }
  return document.documentElement
}

function computedColorOf(cssColor: string, target: HTMLElement): string | null {
  const probe = document.createElement('span')
  probe.style.color = cssColor
  probe.style.position = 'fixed'
  probe.style.display = 'none'
  target.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  probe.remove()
  return resolved || null
}

/**
 * Split a bare `var(--name[, fallback])` reference into its parts.
 *
 * Tells an undefined variable from a real colour: the probe inherits the
 * surrounding `color` when a variable is missing, which would otherwise look
 * like a successful resolution. Returns `null` for anything else.
 */
function parseVarReference(cssColor: string): { name: string, hasFallback: boolean } | null {
  const value = cssColor.trim()
  if (!value.startsWith('var(') || !value.endsWith(')')) {
    return null
  }
  const inner = value.slice(4, -1)
  const comma = inner.indexOf(',')
  const name = (comma === -1 ? inner : inner.slice(0, comma)).trim()
  return name.startsWith('--') ? { name, hasFallback: comma !== -1 } : null
}

/**
 * Resolve any CSS colour string to the concrete colour the browser paints.
 *
 * Handles `var()` (including through the cascade), `color-mix()`, `oklch()` and
 * plain colours alike. Client-only; returns `fallback` (or `null`) on the server,
 * when a referenced variable is missing, or when the browser cannot compute it.
 * Pass `target` to resolve a colour scoped to a subtree rather than the root.
 */
export function resolveCssColor(
  cssColor: string,
  options: { target?: HTMLElement, fallback?: string } = {},
): string | null {
  const { fallback = null } = options
  if (typeof cssColor !== 'string' || !isClient()) {
    return fallback
  }
  const target = asElement(options.target)
  const reference = parseVarReference(cssColor)

  // A missing variable would let the probe inherit the surrounding text colour
  // and masquerade as a successful resolution, so check for the definition
  // first — unless the reference carries its own inline fallback.
  if (reference && !reference.hasFallback && !getComputedStyle(target).getPropertyValue(reference.name).trim()) {
    return fallback
  }
  return computedColorOf(cssColor, target) ?? fallback
}

/**
 * Resolve a token or `--ui-*` variable to a concrete CSS colour in the current
 * theme (e.g. `rgb(0, 220, 130)`).
 *
 * Client-only; returns `fallback` (or `null`) on the server, when the variable
 * is not defined, or when the browser cannot compute it. Pass `target` to read
 * a colour scoped to a subtree rather than `document.documentElement`.
 */
export function resolveThemeColor(
  tokenOrVar: string,
  options: { target?: HTMLElement, fallback?: string } = {},
): string | null {
  if (!isClient()) {
    return options.fallback ?? null
  }
  return resolveCssColor(`var(${themeTokenToVar(tokenOrVar)})`, options)
}

/**
 * Resolve a value that may be a theme token or any CSS colour to a concrete
 * colour — the one entry point a component needs to accept both.
 *
 * A theme reference (`'primary'`, `'--ui-primary'`, `'var(--ui-primary)'`) goes
 * through {@link resolveThemeColor}; anything else (`'#000'`, `'rgba(…) '`,
 * `'oklch(…)'`, `'var(--color-primary-500)'`) is resolved as a plain CSS colour.
 * So a user can set a theme colour by name *or* a literal colour, and the
 * component paints the same value either way. Client-only; returns `fallback`
 * (or `null`) on the server, mirroring {@link resolveCssColor}.
 */
export function resolveColor(
  value: string,
  options: { target?: HTMLElement, fallback?: string } = {},
): string | null {
  if (typeof value !== 'string') {
    return options.fallback ?? null
  }
  const trimmed = value.trim()
  if (trimmed.startsWith('var(')) {
    return resolveCssColor(trimmed, options)
  }
  if (trimmed.startsWith('--')) {
    return trimmed.startsWith(UI_VAR_PREFIX)
      ? resolveThemeColor(trimmed, options)
      : resolveCssColor(`var(${trimmed})`, options)
  }
  if ((THEME_TOKENS as readonly string[]).includes(trimmed)) {
    return resolveThemeColor(trimmed, options)
  }
  return resolveCssColor(trimmed, options)
}

/**
 * Parse any CSS colour string to its sRGB channels via a 1×1 canvas.
 *
 * Needed because Chrome hands `oklch(...)` back verbatim from `getComputedStyle`
 * rather than as sRGB — the canvas rasterisation is the only step that cannot
 * lie about the result. Client-only; returns `null` when canvas is unavailable
 * (including in jsdom).
 */
export function colorToRgb(color: string, target?: HTMLElement): RGB | null {
  if (!isClient()) {
    return null
  }
  const resolved = resolveCssColor(color, { target })
  if (!resolved) {
    return null
  }

  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) {
    return null
  }
  ctx.fillStyle = resolved
  ctx.fillRect(0, 0, 1, 1)
  return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3)) as RGB
}

/**
 * Convert sRGB channels to OkLab. Pure, so it is safe to unit-test and to run
 * off the main probe path. The channel constants are kept digit-for-digit
 * against the reference implementation.
 */
export function rgbToOklab([r8, g8, b8]: RGB): Oklab {
  const [r, g, b] = [r8, g8, b8].map((channel) => {
    const u = channel / RGB_MAX
    return u <= SRGB_KNEE ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

/** A token paired with the sRGB colour it resolved to. */
export interface ThemeColorCandidate {
  token: ThemeToken
  rgb: RGB
}

/**
 * Pick the token whose colour is perceptually closest to `target`, comparing in
 * OkLab so the winner matches what the eye sees rather than raw channel maths.
 * Pure — feed it candidates from anywhere.
 */
export function findNearestThemeToken(
  target: RGB,
  candidates: ThemeColorCandidate[],
): ThemeToken | null {
  const targetOklab = rgbToOklab(target)
  let best: ThemeToken | null = null
  let bestDistance = Infinity

  for (const candidate of candidates) {
    const [tL, ta, tb] = targetOklab
    const [cL, ca, cb] = rgbToOklab(candidate.rgb)
    const distance = Math.hypot(tL - cL, ta - ca, tb - cb)
    if (distance < bestDistance) {
      bestDistance = distance
      best = candidate.token
    }
  }
  return best
}

/**
 * Given a colour, find the closest of Nuxt UI's theme colours. Client-only;
 * returns `null` on the server or when the colour or canvas is unavailable.
 */
export function nearestThemeToken(
  color: string,
  options: { target?: HTMLElement } = {},
): ThemeToken | null {
  if (!isClient()) {
    return null
  }
  const targetRgb = colorToRgb(color, options.target)
  if (!targetRgb) {
    return null
  }

  const candidates: ThemeColorCandidate[] = []
  for (const token of THEME_TOKENS) {
    const rgb = colorToRgb(`var(${themeTokenToVar(token)})`, options.target)
    if (rgb) {
      candidates.push({ token, rgb })
    }
  }
  return findNearestThemeToken(targetRgb, candidates)
}

/**
 * Given a colour, return the `--ui-*` variable of the closest theme colour
 * (`'#00dc82'` → `'--ui-primary'`). Thin wrapper over {@link nearestThemeToken};
 * client-only.
 */
export function colorToThemeVar(
  color: string,
  options: { target?: HTMLElement } = {},
): string | null {
  const token = nearestThemeToken(color, options)
  return token ? themeTokenToVar(token) : null
}
