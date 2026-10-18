import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    content: 'will-change-transform',
  },
}

export type AnimatedTooltipTheme = typeof defaultTheme

export type AnimatedTooltipConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedTooltip', 'ui'>

export default defaultTheme
