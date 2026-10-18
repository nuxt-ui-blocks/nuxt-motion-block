import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
  },
}

export type TransitionPanelTheme = typeof defaultTheme

export type TransitionPanelConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'transitionPanel', 'ui'>

export default defaultTheme
