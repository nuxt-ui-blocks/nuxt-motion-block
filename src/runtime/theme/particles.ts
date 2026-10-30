import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative h-full w-full overflow-hidden',
    canvas: 'pointer-events-none absolute inset-0 h-full w-full',
  },
}

export type ParticlesTheme = typeof defaultTheme

export type ParticlesConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'particles', 'ui'>

export default defaultTheme
