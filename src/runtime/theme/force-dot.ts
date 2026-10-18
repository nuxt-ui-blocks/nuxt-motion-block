import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    svg: 'overflow-visible',
    dot: '',
  },
}

export type ForceDotTheme = typeof defaultTheme

export type ForceDotConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'forceDot', 'ui'>

export default defaultTheme
