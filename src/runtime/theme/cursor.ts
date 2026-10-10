import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'pointer-events-none fixed left-0 top-0 z-50',
  },
}

export type CursorTheme = typeof defaultTheme

export type CursorConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'cursor', 'ui'>

export default defaultTheme
