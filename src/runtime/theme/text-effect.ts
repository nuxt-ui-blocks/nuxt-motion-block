import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    container: '',
    segmentWrapper: '',
    segment: '',
  },
}

export type TextEffectTheme = typeof defaultTheme
export type TextEffectConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textEffect', 'ui'>
export default defaultTheme
