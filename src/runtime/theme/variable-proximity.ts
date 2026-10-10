import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block',
    char: '',
  },
}

export type VariableProximityTheme = typeof defaultTheme

export type VariableProximityConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'variableProximity', 'ui'>

export default defaultTheme
