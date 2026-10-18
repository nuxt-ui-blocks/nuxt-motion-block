import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    leading: 'flex h-4 w-4 shrink-0 items-center justify-center',
    dot: 'flex items-center justify-center',
  },
}

export type DotMorphButtonTheme = typeof defaultTheme

export type DotMorphButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'dotMorphButton', 'ui'>

export default defaultTheme
