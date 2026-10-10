import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative',
    letter: 'absolute left-1/2 top-1/2 inline-block',
    srLabel: 'sr-only',
  },
}

export type SpinningTextTheme = typeof defaultTheme

export type SpinningTextConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'spinningText', 'ui'>

export default defaultTheme
