import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    svg: 'absolute inset-0 w-full h-full',
  },
}

export type BackgroundLinesTheme = typeof defaultTheme

export type BackgroundLinesConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'backgroundLines', 'ui'>

export default defaultTheme
