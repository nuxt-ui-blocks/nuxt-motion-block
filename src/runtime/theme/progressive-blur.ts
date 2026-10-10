import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    layer: 'pointer-events-none absolute inset-0 rounded-[inherit]',
  },
}

export type ProgressiveBlurTheme = typeof defaultTheme

export type ProgressiveBlurConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'progressiveBlur', 'ui'>

export default defaultTheme
