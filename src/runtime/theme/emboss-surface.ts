import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'text-default',
    filter: 'pointer-events-none absolute h-0 w-0',
  },
}

export type EmbossSurfaceTheme = typeof defaultTheme

export type EmbossSurfaceConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'embossSurface', 'ui'>

export default defaultTheme
