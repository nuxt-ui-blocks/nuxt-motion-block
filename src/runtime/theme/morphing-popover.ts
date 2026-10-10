import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
    trigger: 'inline-block will-change-transform',
    content: '',
    contentInner: 'will-change-transform',
  },
}

export type MorphingPopoverTheme = typeof defaultTheme

export type MorphingPopoverConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'morphingPopover', 'ui'>

export default defaultTheme
