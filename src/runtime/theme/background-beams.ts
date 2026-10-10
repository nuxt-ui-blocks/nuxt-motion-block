import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]',
    svg: 'pointer-events-none absolute z-0 h-full w-full',
  },
}

export type BackgroundBeamsTheme = typeof defaultTheme

export type BackgroundBeamsConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'backgroundBeams', 'ui'>

export default defaultTheme
