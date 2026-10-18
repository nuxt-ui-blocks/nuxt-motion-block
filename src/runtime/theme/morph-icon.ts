import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-flex items-center justify-center w-6 h-6',
    icon: 'absolute inset-0 flex items-center justify-center',
    iconIcon: 'w-full h-full',
  },
}

export type MorphIconTheme = typeof defaultTheme

export type MorphIconConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'morphIcon', 'ui'>

export default defaultTheme
