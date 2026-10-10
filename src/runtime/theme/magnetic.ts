import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
  },
}

export type MagneticTheme = typeof defaultTheme

export type MagneticConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'magnetic', 'ui'>

export default defaultTheme
