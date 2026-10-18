import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'text-reveal-container inline-block',
    char: 'text-reveal-char relative',
    charInner: 'inline-block',
    srOnly: 'sr-only',
  },
}

export type TextRevealTheme = typeof defaultTheme

export type TextRevealConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textReveal', 'ui'>

export default defaultTheme
