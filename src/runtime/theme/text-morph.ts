import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    char: 'inline-block',
  },
}

export type TextMorphTheme = typeof defaultTheme
export type TextMorphConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textMorph', 'ui'>
export default defaultTheme
