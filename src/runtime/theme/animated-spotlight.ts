import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'pointer-events-none absolute inset-0 h-full w-full',
    left: 'absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none',
    leftFirst: 'absolute top-0 left-0',
    leftSecond: 'absolute top-0 left-0 origin-top-left',
    leftThird: 'absolute top-0 left-0 origin-top-left',
    right: 'absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none',
    rightFirst: 'absolute top-0 right-0',
    rightSecond: 'absolute top-0 right-0 origin-top-right',
    rightThird: 'absolute top-0 right-0 origin-top-right',
  },
}

export type AnimatedSpotlightTheme = typeof defaultTheme

export type AnimatedSpotlightConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'animatedSpotlight', 'ui'>

export default defaultTheme
