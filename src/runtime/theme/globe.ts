import type { ComponentConfig } from '@nuxt/ui'

const defaultTheme = {
  slots: {
    root: 'relative mx-auto aspect-square w-full max-w-150 overflow-hidden',
    canvas: 'size-full cursor-grab touch-none transition-opacity duration-500 contain-[layout_paint_size] active:cursor-grabbing',
    fallback: 'flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center text-sm text-muted',
  },
}

export type GlobeTheme = typeof defaultTheme

export type GlobeConfig = ComponentConfig<typeof defaultTheme, Record<string, any>, 'globe', 'ui'>

export default defaultTheme
