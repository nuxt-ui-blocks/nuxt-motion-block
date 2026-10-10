import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'text-glitch-container relative inline-block select-none',
    main: 'text-glitch-main relative z-10',
    layer: 'text-glitch-layer absolute top-0 left-0 w-full h-full pointer-events-none',
    scanLines: 'absolute inset-0 pointer-events-none',
    scanLine: 'absolute bg-(--ui-bg-inverted)/20 h-px left-0 right-0',
  },
}

export type TextGlitchTheme = typeof defaultTheme
export type TextGlitchConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'textGlitch', 'ui'>
export default defaultTheme
