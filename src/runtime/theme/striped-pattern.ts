import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative size-full overflow-hidden',
    pattern: 'pointer-events-none absolute inset-0',
  },
}

export type StripedPatternTheme = typeof defaultTheme

export type StripedPatternConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'stripedPattern', 'ui'>

export default defaultTheme
