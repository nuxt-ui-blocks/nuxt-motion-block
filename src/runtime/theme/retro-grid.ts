import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'retro-grid pointer-events-none absolute inset-0 h-full w-full overflow-hidden',
    tilt: 'retro-grid-tilt absolute inset-0',
    plane: 'retro-grid-plane absolute',
    fade: 'pointer-events-none absolute inset-0',
  },
}

export type RetroGridTheme = typeof defaultTheme

export type RetroGridConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'retroGrid', 'ui'>

export default defaultTheme
