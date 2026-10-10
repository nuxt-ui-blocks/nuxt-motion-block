import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: '',
  },
}

export type PixelatedCanvasTheme = typeof defaultTheme

export type PixelatedCanvasConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'pixelatedCanvas', 'ui'>

export default defaultTheme
