import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative overflow-hidden',
    pool: 'pointer-events-none absolute inset-0 select-none',
    image: 'absolute top-0 left-0 rounded-xl object-cover opacity-0 shadow-lg will-change-transform',
  },
}

export type CursorImageTrailTheme = typeof defaultTheme

export type CursorImageTrailConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'cursorImageTrail', 'ui'>

export default defaultTheme
