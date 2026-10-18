import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200',
  },
  variants: {
    visible: {
      true: {
        root: 'opacity-100',
      },
      false: {
        root: 'opacity-0',
      },
    },
  },
}

export type SpotlightTheme = typeof defaultTheme

export type SpotlightConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'spotlight', 'ui'>

export default defaultTheme
