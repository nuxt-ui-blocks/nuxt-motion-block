import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative overflow-hidden',
    content: 'will-change-transform',
    arrow: 'absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-default border-t border-l border-default will-change-transform',
  },
}

export type RichPopoverTheme = typeof defaultTheme

export type RichPopoverConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'richPopover', 'ui'>

export default defaultTheme
