import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
  },
}

export type TextScrambleTheme = typeof defaultTheme

export type TextScrambleConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textScramble', 'ui'>

export default defaultTheme
