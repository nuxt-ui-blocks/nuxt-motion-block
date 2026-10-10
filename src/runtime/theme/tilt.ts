import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
  },
}

export type TiltTheme = typeof defaultTheme

export type TiltConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'tilt', 'ui'>

export default defaultTheme
