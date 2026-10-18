import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'group relative inline-block',
    shine: 'pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300',
    shineBar: 'absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent mix-blend-plus-lighter',
  },
}

export type SmoothButtonTheme = typeof defaultTheme

export type SmoothButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'smoothButton', 'ui'>

export default defaultTheme
