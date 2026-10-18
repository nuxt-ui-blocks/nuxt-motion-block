import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-block tabular-nums',
  },
}

export type AnimatedNumberTheme = typeof defaultTheme

export type AnimatedNumberConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedNumber', 'ui'>

export default defaultTheme
