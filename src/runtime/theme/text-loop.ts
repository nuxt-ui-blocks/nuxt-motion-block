import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-flex items-center justify-center align-baseline',
    item: '',
    measure: 'invisible absolute block',
    measureItem: 'block',
  },
}

export type TextLoopTheme = typeof defaultTheme
export type TextLoopConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textLoop', 'ui'>
export default defaultTheme
