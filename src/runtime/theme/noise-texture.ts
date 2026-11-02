import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'pointer-events-none absolute inset-0 z-0 size-full select-none opacity-50 dark:opacity-75',
    noise: '',
  },
}

export type NoiseTextureTheme = typeof defaultTheme

export type NoiseTextureConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'noiseTexture', 'ui'>

export default defaultTheme
