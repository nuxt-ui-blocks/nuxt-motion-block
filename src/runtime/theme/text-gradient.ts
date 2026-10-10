import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'text-gradient bg-clip-text text-transparent font-bold',
    srOnly: 'sr-only',
  },
}

export type TextGradientTheme = typeof defaultTheme
export type TextGradientConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textGradient', 'ui'>
export default defaultTheme
