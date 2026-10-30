import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    svg: 'pointer-events-none absolute inset-0 h-full w-full overflow-visible',
  },
}

export type AnimatedBeamTheme = typeof defaultTheme

export type AnimatedBeamConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedBeam', 'ui'>

export default defaultTheme
