import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
  },
}

export type AnimatedGroupTheme = typeof defaultTheme

export type AnimatedGroupConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedGroup', 'ui'>

export default defaultTheme
