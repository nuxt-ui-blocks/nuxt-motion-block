import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative isolate',
    svg: 'pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible',
    halo: 'dark:mix-blend-plus-lighter',
  },
}

export type BorderBeamTheme = typeof defaultTheme

export type BorderBeamConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'borderBeam', 'ui'>

export default defaultTheme
