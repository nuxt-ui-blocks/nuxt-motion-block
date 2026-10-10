import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-grid grid-cols-3',
  },
}

export type GridLoaderTheme = typeof defaultTheme

export type GridLoaderConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'gridLoader', 'ui'>

export default defaultTheme
