import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block',
    text: 'relative z-10',
    sparkle: 'pointer-events-none absolute z-20 origin-center text-primary',
  },
}

export type SparklesTextTheme = typeof defaultTheme

export type SparklesTextConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'sparklesText', 'ui'>

export default defaultTheme
