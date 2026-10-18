import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inset-x-0 top-0 h-1 origin-left',
  },
}

export type ScrollProgressTheme = typeof defaultTheme

export type ScrollProgressConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'scrollProgress', 'ui'>

export default defaultTheme
