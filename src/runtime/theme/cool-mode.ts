import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block',
    particle: 'pointer-events-none absolute select-none leading-none will-change-transform',
  },
}

export type CoolModeTheme = typeof defaultTheme

export type CoolModeConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'coolMode', 'ui'>

export default defaultTheme
