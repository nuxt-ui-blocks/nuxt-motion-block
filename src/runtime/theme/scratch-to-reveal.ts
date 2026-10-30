import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative w-full select-none overflow-hidden rounded-xl',
    content: 'flex size-full items-center justify-center',
    canvas: 'absolute inset-0 size-full cursor-crosshair touch-none transition-opacity duration-500',
  },
}

export type ScratchToRevealTheme = typeof defaultTheme

export type ScratchToRevealConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'scratchToReveal', 'ui'>

export default defaultTheme
