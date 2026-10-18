import { describe, it, expect } from 'vitest'

import {
  cssVarToThemeToken,
  findNearestThemeToken,
  resolveColor,
  resolveCssColor,
  rgbToOklab,
  THEME_TOKENS,
  themeTokenToVar,
  type ThemeColorCandidate,
} from '../src/runtime/utils/theme-color'

// The DOM-dependent paths (`resolveThemeColor`, `colorToRgb`, `nearestThemeToken`)
// need a real canvas, which jsdom does not provide; they are exercised in the
// browser. Here we cover the pure mappings and the OkLab nearest-match maths.

describe('themeTokenToVar', () => {
  it('prefixes a bare token', () => {
    expect(themeTokenToVar('primary')).toBe('--ui-primary')
    expect(themeTokenToVar('text-muted')).toBe('--ui-text-muted')
    expect(themeTokenToVar('bg-elevated')).toBe('--ui-bg-elevated')
  })

  it('passes an already-namespaced variable through', () => {
    expect(themeTokenToVar('--ui-border-inverted')).toBe('--ui-border-inverted')
  })

  it('unwraps a var() reference, dropping any fallback', () => {
    expect(themeTokenToVar('var(--ui-error)')).toBe('--ui-error')
    expect(themeTokenToVar('var(--ui-primary, #6366f1)')).toBe('--ui-primary')
  })

  it('trims surrounding whitespace', () => {
    expect(themeTokenToVar('  secondary  ')).toBe('--ui-secondary')
  })
})

describe('cssVarToThemeToken', () => {
  it('maps a variable back to its token', () => {
    expect(cssVarToThemeToken('--ui-primary')).toBe('primary')
    expect(cssVarToThemeToken('var(--ui-text-muted)')).toBe('text-muted')
    expect(cssVarToThemeToken('border-accented')).toBe('border-accented')
  })

  it('rejects variables that are not theme colours', () => {
    expect(cssVarToThemeToken('--ui-radius')).toBeNull()
    expect(cssVarToThemeToken('--ui-color-primary-500')).toBeNull()
    expect(cssVarToThemeToken('--ui-unknown')).toBeNull()
    expect(cssVarToThemeToken('--color-primary-500')).toBeNull()
  })

  it('round-trips every token', () => {
    for (const token of THEME_TOKENS) {
      expect(cssVarToThemeToken(themeTokenToVar(token))).toBe(token)
    }
  })
})

describe('resolveColor', () => {
  it('falls back instead of throwing on a non-string value', () => {
    // A control seeded from an empty array can hand these an `undefined`; the
    // guard has to hold before any DOM access, so it is safe to assert here.
    const notAString = undefined as unknown as string
    expect(resolveColor(notAString)).toBeNull()
    expect(resolveColor(notAString, { fallback: '#ffffff' })).toBe('#ffffff')
    expect(resolveCssColor(notAString, { fallback: '#ffffff' })).toBe('#ffffff')
  })
})

describe('rgbToOklab', () => {
  it('places white at the top of the lightness axis', () => {
    const [l, a, b] = rgbToOklab([255, 255, 255])
    expect(l).toBeCloseTo(1, 5)
    expect(a).toBeCloseTo(0, 5)
    expect(b).toBeCloseTo(0, 5)
  })

  it('maps black to the origin', () => {
    expect(rgbToOklab([0, 0, 0])).toEqual([0, 0, 0])
  })

  it('matches the reference OkLab for pure red', () => {
    const [l, a, b] = rgbToOklab([255, 0, 0])
    expect(l).toBeCloseTo(0.6279, 3)
    expect(a).toBeCloseTo(0.2249, 3)
    expect(b).toBeCloseTo(0.1258, 3)
  })
})

describe('findNearestThemeToken', () => {
  const candidates: ThemeColorCandidate[] = [
    { token: 'primary', rgb: [0, 220, 130] },
    { token: 'error', rgb: [255, 0, 0] },
    { token: 'bg', rgb: [255, 255, 255] },
  ]

  it('returns the perceptually closest token', () => {
    expect(findNearestThemeToken([0, 215, 128], candidates)).toBe('primary')
    expect(findNearestThemeToken([250, 10, 10], candidates)).toBe('error')
    expect(findNearestThemeToken([250, 250, 248], candidates)).toBe('bg')
  })

  it('matches an exact candidate', () => {
    expect(findNearestThemeToken([255, 0, 0], candidates)).toBe('error')
  })

  it('returns null when there is nothing to match against', () => {
    expect(findNearestThemeToken([0, 0, 0], [])).toBeNull()
  })
})
