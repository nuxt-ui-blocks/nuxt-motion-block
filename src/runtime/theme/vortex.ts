import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative h-full w-full',
    background: 'absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent',
    canvas: '',
    content: 'relative z-10',
  },
}

export type VortexTheme = typeof defaultTheme

export type VortexConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'vortex', 'ui'>

export default defaultTheme
