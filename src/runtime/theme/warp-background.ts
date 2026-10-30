import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative size-full overflow-hidden',
    canvas: 'absolute inset-0 size-full',
    content: 'relative z-10 size-full',
  },
}

export type WarpBackgroundTheme = typeof defaultTheme

export type WarpBackgroundConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'warpBackground', 'ui'>

export default defaultTheme
