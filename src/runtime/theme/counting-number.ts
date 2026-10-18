import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-block',
  },
}

export type CountingNumberTheme = typeof defaultTheme

export type CountingNumberConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'countingNumber', 'ui'>

export default defaultTheme
