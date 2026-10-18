import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'm-radio-group',
    indicator: 'm-radio-indicator',
  },
}

export type RadioGroupTheme = typeof defaultTheme

export type RadioGroupConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'radioGroup', 'ui'>

export default defaultTheme
