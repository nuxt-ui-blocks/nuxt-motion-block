import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'mb-line-shadow relative z-0 inline-flex',
  },
}

export type LineShadowTextTheme = typeof defaultTheme

export type LineShadowTextConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'lineShadowText', 'ui'>

export default defaultTheme
