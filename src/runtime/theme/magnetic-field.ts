import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
  },
}

export type MagneticFieldTheme = typeof defaultTheme

export type MagneticFieldConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'magneticField', 'ui'>

export default defaultTheme
