import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
  },
}

export type InViewTheme = typeof defaultTheme

export type InViewConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'inView', 'ui'>

export default defaultTheme
