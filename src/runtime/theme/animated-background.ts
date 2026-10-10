import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    background: 'absolute top-0 left-0 pointer-events-none transition-all duration-300 ease-out',
  },
}

export type AnimatedBackgroundTheme = typeof defaultTheme

export type AnimatedBackgroundConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedBackground', 'ui'>

export default defaultTheme
