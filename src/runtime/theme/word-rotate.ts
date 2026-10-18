import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-block overflow-hidden',
    word: 'inline-block overflow-hidden',
  },
}

export type WordRotateTheme = typeof defaultTheme

export type WordRotateConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'wordRotate', 'ui'>

export default defaultTheme
