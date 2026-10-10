import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative overflow-hidden',
    image: 'absolute inset-x-0 w-full object-cover',
  },
}

export type ScrollImageRevealTheme = typeof defaultTheme

export type ScrollImageRevealConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'scrollImageReveal', 'ui'>

export default defaultTheme
