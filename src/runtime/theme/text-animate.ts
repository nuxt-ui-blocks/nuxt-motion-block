import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'inline-block',
    segment: 'inline-block whitespace-pre',
    space: 'whitespace-pre',
  },
}

export type TextAnimateTheme = typeof defaultTheme

export type TextAnimateConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textAnimate', 'ui'>

export default defaultTheme
