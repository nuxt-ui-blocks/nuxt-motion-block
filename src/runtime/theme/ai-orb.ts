import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'block',
  },
  variants: {
    fallback: {
      true: {
        root: 'rounded-full',
      },
    },
  },
}

export type AiOrbTheme = typeof defaultTheme

export type AiOrbConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'aiOrb', 'ui'>

export default defaultTheme
