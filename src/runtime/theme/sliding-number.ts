import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'flex items-baseline',
    separator: 'mx-0.5',
    digit: 'relative inline-block w-[1ch] overflow-hidden leading-none tabular-nums align-baseline',
    digitTrack: 'absolute inset-0',
    digitGhost: 'opacity-0 block',
    digitGlyph: 'absolute inset-0 flex items-center justify-center',
  },
}

export type SlidingNumberTheme = typeof defaultTheme

export type SlidingNumberConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'slidingNumber', 'ui'>

export default defaultTheme
