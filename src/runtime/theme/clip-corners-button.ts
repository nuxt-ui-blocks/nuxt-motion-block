import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative inline-block',
    corner: 'absolute pointer-events-none z-20',
  },
}

export type ClipCornersButtonTheme = typeof defaultTheme

export type ClipCornersButtonConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'clipCornersButton', 'ui'>

export default defaultTheme
