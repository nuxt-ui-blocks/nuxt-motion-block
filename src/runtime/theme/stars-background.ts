import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'h-full w-full absolute inset-0',
  },
}

export type StarsBackgroundTheme = typeof defaultTheme
export type StarsBackgroundConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'starsBackground', 'ui'>
export default defaultTheme
