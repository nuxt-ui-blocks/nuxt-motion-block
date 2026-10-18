import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    wrapper: 'relative',
    card: 'h-full',
  },
}

export type WobbleCardTheme = typeof defaultTheme

export type WobbleCardConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'wobbleCard', 'ui'>

export default defaultTheme
