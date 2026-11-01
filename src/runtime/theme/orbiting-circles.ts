import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'absolute inset-0 flex items-center justify-center',
    path: 'pointer-events-none absolute inset-0 h-full w-full',
    pathCircle: 'stroke-black/10 dark:stroke-white/10',
    orbit: 'orbit absolute flex size-full items-center justify-center rounded-full',
  },
}

export type OrbitingCirclesTheme = typeof defaultTheme

export type OrbitingCirclesConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'orbitingCircles', 'ui'>

export default defaultTheme
