import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-flex',
  },
}

export type AnimatedToggleTheme = typeof defaultTheme

export type AnimatedToggleConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedToggle', 'ui'>

export default defaultTheme
