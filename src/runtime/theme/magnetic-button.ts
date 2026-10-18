import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-block',
    magnet: 'inline-block',
    button: '',
  },
}

export type MagneticButtonTheme = typeof defaultTheme

export type MagneticButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'magneticButton', 'ui'>

export default defaultTheme
