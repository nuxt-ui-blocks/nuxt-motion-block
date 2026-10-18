import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    canvas: '',
  },
}

export type DottedGlowBackgroundTheme = typeof defaultTheme

export type DottedGlowBackgroundConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'dottedGlowBackground', 'ui'>

export default defaultTheme
